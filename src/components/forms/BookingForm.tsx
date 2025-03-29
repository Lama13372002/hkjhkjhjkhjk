'use client'

// Объявление типов для Google Maps API в глобальном пространстве
declare global {
  interface Window {
    google?: any;
    initGoogleMaps?: () => void;
  }
}

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon, Car, X, Map } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapView } from '@/components/ui/map-view'

// Список доступных городов для выбора
const cities = [
  { value: 'kaliningrad', label: 'Калининград' },
  { value: 'gdansk', label: 'Гданьск' },
  { value: 'warsaw', label: 'Варшава' },
  { value: 'berlin', label: 'Берлин' },
  { value: 'vilnius', label: 'Вильнюс' },
  { value: 'kaunas', label: 'Каунас' },
  { value: 'riga', label: 'Рига' },
  { value: 'custom', label: 'Другой город...' }
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Имя должно содержать не менее 2 символов',
  }),
  phone: z.string().min(10, {
    message: 'Укажите корректный номер телефона',
  }),
  vehicleClass: z.enum(['standard', 'comfort', 'business', 'premium', 'minivan'], {
    required_error: 'Выберите класс автомобиля',
  }),
  date: z.date({
    required_error: 'Укажите дату поездки',
  }),
  time: z.string().min(1, {
    message: 'Укажите время поездки',
  }),
  originCity: z.string({
    required_error: 'Выберите город отправления',
  }),
  customOriginCity: z.string().optional(),
  originAddress: z.string().min(2, {
    message: 'Укажите адрес отправления',
  }),
  destinationCity: z.string({
    required_error: 'Выберите город прибытия',
  }),
  customDestinationCity: z.string().optional(),
  tellDriver: z.boolean().default(false),
  destinationAddress: z.string().optional(),
  paymentMethod: z.enum(['cash', 'card', 'online'], {
    required_error: 'Выберите способ оплаты',
  }),
  returnTransfer: z.enum(['no', 'yes'], {
    required_error: 'Укажите, нужен ли обратный трансфер',
  }),
  returnDate: z.date().optional(),
  returnTime: z.string().optional(),
  comments: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
})
.refine((data) => {
  // Если выбран обратный трансфер, проверяем наличие даты и времени возвращения
  if (data.returnTransfer === 'yes') {
    return data.returnDate !== undefined && data.returnTime !== undefined && data.returnTime.length > 0;
  }
  return true;
}, {
  message: "Укажите дату и время обратного трансфера",
  path: ["returnDate"], // Показываем ошибку рядом с полем даты возвращения
})
.refine((data) => {
  // Проверка кастомного города отправления, если выбран "Другой город..."
  if (data.originCity === 'custom') {
    return data.customOriginCity !== undefined && data.customOriginCity.length >= 2;
  }
  return true;
}, {
  message: "Введите название города",
  path: ["customOriginCity"]
})
.refine((data) => {
  // Проверка кастомного города прибытия, если выбран "Другой город..."
  if (data.destinationCity === 'custom') {
    return data.customDestinationCity !== undefined && data.customDestinationCity.length >= 2;
  }
  return true;
}, {
  message: "Введите название города",
  path: ["customDestinationCity"]
})
.refine((data) => {
  // Проверка адреса прибытия, если не выбран чекбокс "Скажу водителю"
  if (!data.tellDriver) {
    return data.destinationAddress !== undefined && data.destinationAddress.length >= 2;
  }
  return true;
}, {
  message: "Укажите адрес прибытия или выберите 'Скажу водителю'",
  path: ["destinationAddress"]
});

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      vehicleClass: 'standard',
      date: null,
      time: '',
      originCity: 'kaliningrad',
      customOriginCity: '',
      originAddress: '',
      destinationCity: '',
      customDestinationCity: '',
      tellDriver: false,
      destinationAddress: '',
      paymentMethod: 'cash',
      returnTransfer: 'no',
      returnTime: '',
      comments: '',
      agreement: false,
    },
  })

  // Загрузка Google Maps API при монтировании компонента
  useEffect(() => {
    // Функция для загрузки Google Maps API
    const loadGoogleMapsApi = async () => {
      // Проверка, загружен ли уже API
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
        if (!apiKey) {
          console.error('Google Maps API key is not defined');
          return;
        }

        // Создаем функцию обратного вызова для инициализации
        window.initGoogleMaps = () => {
          setMapLoaded(true);
          console.log('Google Maps API loaded successfully');
        };

        // Добавляем скрипт Google Maps на страницу
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Google Maps API:', error);
      }
    };

    // Объявление типа для window с Google Maps API
    if (typeof window !== 'undefined') {
      window.initGoogleMaps = window.initGoogleMaps || (() => {});
      loadGoogleMapsApi();
    }
  }, []);

  // Наблюдаем за изменениями полей формы, влияющих на карту
  const originCity = form.watch('originCity');
  const destinationCity = form.watch('destinationCity');

  // Отображаем карту, когда выбраны оба города
  useEffect(() => {
    if (originCity && destinationCity && mapLoaded) {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [originCity, destinationCity, mapLoaded]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // В реальном приложении здесь будет отправка данных на сервер
    console.log(values);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      form.reset();
    }, 1500);
  }

  const vehicleOptions = [
    {
      value: 'standard',
      label: 'Standart',
      price: 'от 250.00 EUR',
      image: '/images/vehicles/standard.jpg',
      desc: 'Ford Focus, Honda Civic, Toyota Corolla и похожие'
    },
    {
      value: 'comfort',
      label: 'Comfort',
      price: 'от 250.00 EUR',
      image: '/images/vehicles/comfort.jpg',
      desc: 'Toyota Camry, Mercedes Benz C class, BMW 2 Series Gran Tourer и похожие'
    },
    {
      value: 'business',
      label: 'Business',
      price: 'от 350.00 EUR',
      image: '/images/vehicles/business.jpg',
      desc: 'Mercedes Benz E class, BMW 5 Series, Audi A6, Lexus ES'
    },
    {
      value: 'premium',
      label: 'VIP',
      price: 'от 500.00 EUR',
      image: '/images/vehicles/premium.jpg',
      desc: 'Lexus 450'
    },
    {
      value: 'minivan',
      label: 'Minivan',
      price: 'от 500.00 EUR',
      image: '/images/vehicles/minivan.jpg',
      desc: 'Mercedes Benz V class'
    },
  ]

  return (
    <div className="relative max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-950 z-10 p-4 flex items-center justify-between border-b">
        <h2 className="text-xl font-bold">Заказать трансфер</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => document.querySelector('[role="dialog"]')?.closest('div[data-state="open"]')?.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}))}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Закрыть</span>
        </Button>
      </div>

      <div className="p-6">
        <p className="text-muted-foreground mb-6">
          Заполните форму ниже, и мы свяжемся с вами для подтверждения заказа
        </p>

        {/* Компонент мини-карты */}
        <div className="map-container">
          <MapView
            originCity={form.watch('originCity')}
            destinationCity={form.watch('destinationCity')}
            customOriginCity={form.watch('customOriginCity')}
            customDestinationCity={form.watch('customDestinationCity')}
            isVisible={showMap}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите ваше имя" {...field} className="form-input-focus" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер телефона</FormLabel>
                    <FormControl>
                      <Input placeholder="+7 (___) ___-__-__" {...field} className="form-input-focus" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <FormField
              control={form.control}
              name="vehicleClass"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>Класс автомобиля</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                    >
                      {vehicleOptions.map((option) => (
                        <Card key={option.value} className={cn("cursor-pointer transition-all border-2 h-full",
                          field.value === option.value ? "border-primary" : "hover:border-gray-300")}>
                          <label
                            htmlFor={`vehicle-${option.value}`}
                            className="cursor-pointer block h-full"
                          >
                            <CardContent className="p-0 h-full flex flex-col">
                              <div className="relative aspect-video w-full overflow-hidden">
                                <div
                                  className="absolute inset-0 bg-cover bg-center"
                                  style={{ backgroundImage: `url(${option.image})` }}
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                  <Car className="h-12 w-12 text-white/80" />
                                </div>
                                <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
                                  {option.price}
                                </div>
                              </div>
                              <div className="p-4 flex-grow">
                                <div className="flex flex-col h-full">
                                  <div>
                                    <h3 className="font-medium text-sm md:text-base">{option.label}</h3>
                                    <p className="text-xs text-muted-foreground">{option.desc}</p>
                                  </div>
                                  <RadioGroupItem
                                    value={option.value}
                                    id={`vehicle-${option.value}`}
                                    className="sr-only"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </label>
                        </Card>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Дата</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal form-input-focus",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ru })
                            ) : (
                              <span>Выберите дату</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Время</FormLabel>
                    <FormControl>
                      <Input type="time" placeholder="Выберите время" {...field} className="form-input-focus" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="originCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Город отправления</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="form-input-focus">
                            <SelectValue placeholder="Выберите город отправления" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Показать поле для ввода своего города, если выбран "Другой город..." */}
                {form.watch("originCity") === "custom" && (
                  <FormField
                    control={form.control}
                    name="customOriginCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Введите название города</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Например: Клайпеда"
                            {...field}
                            className="form-input-focus"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="originAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Адрес отправления</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Улица, дом, отель, аэропорт..."
                          {...field}
                          className="form-input-focus"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="destinationCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Город прибытия</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="form-input-focus">
                            <SelectValue placeholder="Выберите город прибытия" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Показать поле для ввода своего города, если выбран "Другой город..." */}
                {form.watch("destinationCity") === "custom" && (
                  <FormField
                    control={form.control}
                    name="customDestinationCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Введите название города</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Например: Щецин"
                            {...field}
                            className="form-input-focus"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="tellDriver"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          Скажу водителю точный адрес при встрече
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {!form.watch("tellDriver") && (
                  <FormField
                    control={form.control}
                    name="destinationAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Адрес прибытия</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Улица, дом, отель, аэропорт..."
                            {...field}
                            className="form-input-focus"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Способ оплаты</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash" id="payment-cash" />
                          <FormLabel className="font-normal cursor-pointer" htmlFor="payment-cash">Наличными</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="payment-card" />
                          <FormLabel className="font-normal cursor-pointer" htmlFor="payment-card">Банковской картой</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="payment-online" />
                          <FormLabel className="font-normal cursor-pointer" htmlFor="payment-online">Онлайн оплата</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnTransfer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Обратный трансфер</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="return-no" />
                          <FormLabel className="font-normal cursor-pointer" htmlFor="return-no">Не нужен</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="return-yes" />
                          <FormLabel className="font-normal cursor-pointer" htmlFor="return-yes">Нужен</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Поля для обратного трансфера (появляются только при выборе "Нужен") */}
            {form.watch('returnTransfer') === 'yes' && (
              <div className="grid gap-6 sm:grid-cols-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Дата обратного трансфера</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal form-input-focus",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ru })
                              ) : (
                                <span>Выберите дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Время обратного трансфера</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="Выберите время" {...field} className="form-input-focus" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Укажите детали заказа, адрес, количество пассажиров и т.д."
                      className="min-h-[80px] form-input-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      Я согласен на обработку персональных данных
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full btn-gradient"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Заказать трансфер'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
