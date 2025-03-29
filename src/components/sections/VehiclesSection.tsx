'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Car, Users, Briefcase, Wifi, Leaf, Coffee, Check, ChevronRight } from 'lucide-react'
import BookingForm from '@/components/forms/BookingForm'

const vehicles = [
  {
    id: 'standard',
    name: 'Standart',
    brand: 'Ford, Honda, Toyota',
    model: 'Focus, Civic, Corolla',
    year: 2022,
    seats: 4,
    description: 'Комфортабельные автомобили класса Standart. Идеальны для поездок небольших групп или пар.',
    price: 'от 250.00 EUR',
    image: '/images/vehicles/standard.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    features: [
      'Кондиционер',
      'Комфортабельные сиденья',
      'Wi-Fi',
      'Зарядные устройства',
      'Бутилированная вода',
      'Удобный багажник'
    ]
  },
  {
    id: 'comfort',
    name: 'Comfort',
    brand: 'Toyota, Mercedes Benz, BMW',
    model: 'Camry, C class, 2 Series Gran Tourer',
    year: 2022,
    seats: 4,
    description: 'Комфортабельные автомобили класса Comfort для поездок по Европе. Просторный салон и большой багажник.',
    price: 'от 250.00 EUR',
    image: '/images/vehicles/comfort.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    features: [
      'Просторный салон',
      'Климат-контроль',
      'Wi-Fi',
      'Зарядные устройства',
      'Бутилированная вода',
      'Большой багажник'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    brand: 'Mercedes Benz, BMW, Audi, Lexus',
    model: 'E class, 5 Series, A6, ES',
    year: 2023,
    seats: 4,
    description: 'Представительский автомобиль бизнес-класса. Идеальный выбор для деловых поездок и VIP-трансферов.',
    price: 'от 350.00 EUR',
    image: '/images/vehicles/business.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1549399542-7e8f2e928464?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    features: [
      'Кожаный салон',
      'Мультизонный климат-контроль',
      'Массаж сидений',
      'Wi-Fi',
      'Мини-бар',
      'Премиальная аудиосистема'
    ]
  },
  {
    id: 'premium',
    name: 'VIP',
    brand: 'Lexus',
    model: '450',
    year: 2023,
    seats: 4,
    description: 'Автомобили премиум класса для самых требовательных клиентов. Максимальный комфорт и роскошь.',
    price: 'от 500.00 EUR',
    image: '/images/vehicles/premium.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    features: [
      'Эксклюзивный кожаный салон',
      'Интеллектуальный климат-контроль',
      'Массаж и вентиляция сидений',
      'Wi-Fi высокоскоростной',
      'Персональный мини-бар',
      'Аудиосистема премиум-класса',
      'Шумоизоляция'
    ]
  },
  {
    id: 'minivan',
    name: 'Minivan',
    brand: 'Mercedes-Benz',
    model: 'V class',
    year: 2022,
    seats: 7,
    description: 'Просторный минивэн для групповых поездок. Идеально подходит для семей или небольших групп.',
    price: 'от 500.00 EUR',
    image: '/images/vehicles/minivan.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    features: [
      'Просторный салон',
      'Комфортабельные сиденья',
      'Климат-контроль',
      'Wi-Fi',
      'Зарядные устройства',
      'Большое багажное отделение',
      'Складные столики'
    ]
  }
]

// Иконки для особенностей автомобилей
const featureIcons: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi className="w-4 h-4" />,
  'Просторный салон': <Users className="w-4 h-4" />,
  'Кожаный салон': <Briefcase className="w-4 h-4" />,
  'Климат-контроль': <Leaf className="w-4 h-4" />,
  'Мультизонный климат-контроль': <Leaf className="w-4 h-4" />,
  'Бутилированная вода': <Coffee className="w-4 h-4" />,
  'Мини-бар': <Coffee className="w-4 h-4" />,
}

export default function VehiclesSection() {
  const [activeVehicle, setActiveVehicle] = useState(vehicles[0].id)

  return (
    <section id="vehicles" className="py-16 md:py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 heading-underline inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Наш автопарк
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Мы предлагаем комфортабельные автомобили разных классов для ваших поездок.
            Выберите подходящий вариант и наслаждайтесь путешествием.
          </motion.p>
        </div>

        <div className="flex flex-col">
          <div className="relative">
            <Tabs defaultValue={vehicles[0].id} onValueChange={setActiveVehicle} className="w-full">
              <div
                className="sticky top-0 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm py-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:py-3"
              >
                <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full max-w-sm mx-auto lg:max-w-none lg:w-auto gap-2 p-2 lg:p-1">
                  {vehicles.map((vehicle) => (
                    <TabsTrigger
                      key={vehicle.id}
                      value={vehicle.id}
                      className="flex items-center justify-center gap-1.5 text-sm py-3 px-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:font-medium vehicles-tab-active"
                    >
                      <Car className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap font-medium">{vehicle.name}</span>
                      {vehicle.id === 'premium' && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">
                          New
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="mt-32 sm:mt-12 md:mt-10">
                {vehicles.map((vehicle) => (
                  <TabsContent
                    key={vehicle.id}
                    value={vehicle.id}
                    className="focus-visible:outline-none focus-visible:ring-0 mt-0 pt-0"
                  >
                    <motion.div
                      className="grid md:grid-cols-2 gap-10 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative rounded-lg overflow-hidden shadow-xl group">
                        <div
                          className="aspect-[16/9] bg-cover bg-center relative transition-all duration-700 transform group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${vehicle.fallbackImage})`,
                            animationDuration: '3s'
                          }}
                        >
                        </div>
                        <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg transform hover:scale-105 transition-transform">
                          {vehicle.price}
                        </div>
                      </div>

                      <div>
                        <div className="mb-6">
                          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white flex items-center">
                            <Car className="w-5 h-5 mr-2 text-primary" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                              {vehicle.name}
                            </span>
                            <span className="mx-1">-</span>
                            <span>{vehicle.brand} {vehicle.model}</span>
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                              {vehicle.year} год
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                              <Users className="w-3 h-3 mr-1" />
                              {vehicle.seats} места
                            </span>
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {vehicle.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {vehicle.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 group hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
                              >
                                <div className="text-primary group-hover:scale-110 transition-transform">
                                  {featureIcons[feature] ?? <Check className="w-4 h-4" />}
                                </div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full sm:w-auto btn-gradient relative group overflow-hidden rounded-full font-medium transition-all px-8 py-6 vehicle-order-button">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                  <span>Заказать трансфер</span>
                                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                              <BookingForm />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
