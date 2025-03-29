'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { MapPin, Clock, Check } from 'lucide-react'
import BookingForm from '@/components/forms/BookingForm'

export default function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // Function to scroll to routes section
  const scrollToRoutes = () => {
    const routesSection = document.getElementById('routes')
    if (routesSection) {
      routesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Трансфер"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-10">
        <motion.div
          className="max-w-3xl text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Комфортные трансферы из Калининграда в Европу
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200"
            variants={itemVariants}
          >
            Безопасные и удобные поездки в города Польши, Германии, Литвы и других стран Европы
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            variants={itemVariants}
          >
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="btn-gradient text-white text-lg font-medium animate-pulse">
                  Заказать трансфер
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                <BookingForm />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 transition-colors text-lg font-medium" onClick={scrollToRoutes}>
              Посмотреть маршруты
            </Button>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-3 gap-6 text-center sm:text-left"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center sm:items-start">
              <div className="bg-primary/20 p-3 rounded-full mb-4 animate-float">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Любые направления</h3>
              <p className="text-gray-300 text-sm">Поездки в основные города Европы по фиксированным ценам</p>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="bg-primary/20 p-3 rounded-full mb-4 animate-float" style={{ animationDelay: '0.2s' }}>
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Круглосуточно</h3>
              <p className="text-gray-300 text-sm">Работаем 24/7, включая праздники и выходные дни</p>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="bg-primary/20 p-3 rounded-full mb-4 animate-float" style={{ animationDelay: '0.4s' }}>
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-300 text-sm">Комфортные автомобили и опытные водители</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated car silhouette */}
        <motion.div
          className="hidden lg:block absolute right-0 bottom-0 w-[600px] h-[300px]"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
        >
          <Image
            src="/images/car-silhouette.png"
            alt="Car"
            width={600}
            height={300}
            className="object-contain"
            onError={(e) => {
              // Fallback if image is not available
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="bg-white w-1 h-3 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
