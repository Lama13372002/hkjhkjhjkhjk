'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BookingForm from '@/components/forms/BookingForm'

// Определяем тип для цен
interface PriceTypes {
  standard: number;
  comfort: number;
  business: number;
  premium: number;
  minivan: number;
}

// Определяем тип для маршрута
interface Route {
  id: number;
  origin: string;
  destination: string;
  distance: number;
  time: string;
  prices: PriceTypes;
  description: string;
  popularityRating: number;
  image: string;
}

const routes: Route[] = [
  {
    id: 1,
    origin: 'Калининград',
    destination: 'Гданьск',
    distance: 150,
    time: '2-3 часа',
    prices: {
      standard: 250,
      comfort: 250,
      business: 350,
      premium: 500,
      minivan: 500,
    },
    description: 'Популярный маршрут из Калининграда в Гданьск. Комфортная поездка через границу с Польшей.',
    popularityRating: 5,
    image: 'https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 2,
    origin: 'Калининград',
    destination: 'Варшава',
    distance: 350,
    time: '5-6 часов',
    prices: {
      standard: 350,
      comfort: 350,
      business: 550,
      premium: 700,
      minivan: 550,
    },
    description: 'Прямой трансфер в столицу Польши. Комфортабельные автомобили и опытные водители.',
    popularityRating: 4,
    image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
  },
  {
    id: 3,
    origin: 'Калининград',
    destination: 'Берлин',
    distance: 600,
    time: '8-9 часов',
    prices: {
      standard: 450,
      comfort: 450,
      business: 750,
      premium: 900,
      minivan: 750,
    },
    description: 'Дальний маршрут в столицу Германии. Включает несколько остановок для отдыха.',
    popularityRating: 3,
    image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 4,
    origin: 'Калининград',
    destination: 'Вильнюс',
    distance: 280,
    time: '4-5 часов',
    prices: {
      standard: 300,
      comfort: 300,
      business: 500,
      premium: 650,
      minivan: 500,
    },
    description: 'Поездка в столицу Литвы через живописные места и исторические города.',
    popularityRating: 4,
    image: 'https://images.unsplash.com/photo-1610019086642-b56d8ac29a0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 5,
    origin: 'Калининград',
    destination: 'Каунас',
    distance: 330,
    time: '5-6 часов',
    prices: {
      standard: 320,
      comfort: 320,
      business: 520,
      premium: 670,
      minivan: 520,
    },
    description: 'Трансфер в второй по величине город Литвы. Проезд через красивые ландшафты.',
    popularityRating: 3,
    image: 'https://images.unsplash.com/photo-1610645043067-6c4edb04611c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 6,
    origin: 'Калининград',
    destination: 'Рига',
    distance: 450,
    time: '7-8 часов',
    prices: {
      standard: 400,
      comfort: 400,
      business: 650,
      premium: 800,
      minivan: 650,
    },
    description: 'Дальний маршрут в столицу Латвии. Включает пересечение нескольких границ.',
    popularityRating: 3,
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
]

// Названия классов автомобилей для отображения
const vehicleClassLabels: Record<keyof PriceTypes, string> = {
  standard: 'Standart',
  comfort: 'Comfort',
  business: 'Business',
  premium: 'VIP',
  minivan: 'Minivan'
}

export default function RoutesSection() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<keyof PriceTypes>('standard')

  return (
    <section id="routes" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 heading-underline inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Наши популярные маршруты
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Выбирайте направление и наслаждайтесь комфортной поездкой. Мы предлагаем трансферы
            по наиболее востребованным маршрутам из Калининграда в города Европы.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full card-hover">
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${route.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="text-white w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-bold">{route.destination}</h3>
                        </div>
                        <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                          {route.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{route.description}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Расстояние:</span>
                      <span className="ml-2">{route.distance} км</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="mb-4">
                      <p className="text-sm font-medium text-center">Выберите класс автомобиля</p>
                    </div>

                    <Tabs defaultValue="standard" onValueChange={(value) => setActiveTab(value as keyof PriceTypes)} className="w-full">
                      <div className="flex flex-col gap-2">
                        <TabsList className="grid grid-cols-3 w-full h-auto">
                          <TabsTrigger value="standard" className="text-xs h-auto py-1.5">Standart</TabsTrigger>
                          <TabsTrigger value="comfort" className="text-xs h-auto py-1.5">Comfort</TabsTrigger>
                          <TabsTrigger value="business" className="text-xs h-auto py-1.5">Business</TabsTrigger>
                        </TabsList>

                        <TabsList className="grid grid-cols-2 w-full h-auto">
                          <TabsTrigger value="premium" className="text-xs h-auto py-1.5">VIP</TabsTrigger>
                          <TabsTrigger value="minivan" className="text-xs h-auto py-1.5">Minivan</TabsTrigger>
                        </TabsList>
                      </div>

                      {/* Контент для всех типов автомобилей */}
                      {(Object.keys(vehicleClassLabels) as Array<keyof PriceTypes>).map((key) => (
                        <TabsContent key={key} value={key} className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{vehicleClassLabels[key]}</p>
                              <p className="font-bold text-primary text-lg">от {route.prices[key]} EUR</p>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full btn-gradient gap-1 items-center mt-4">
                          Заказать трансфер
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                        <BookingForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
