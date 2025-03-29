'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Clock,
  Truck,
  CreditCard,
  ThumbsUp,
  Headphones
} from 'lucide-react'

const benefits = [
  {
    icon: <Shield className="w-10 h-10" />,
    title: 'Безопасность',
    description: 'Все наши водители имеют большой опыт вождения и проходят регулярные проверки. Автомобили оснащены современными системами безопасности.'
  },
  {
    icon: <Clock className="w-10 h-10" />,
    title: 'Пунктуальность',
    description: 'Мы ценим ваше время и гарантируем, что водитель прибудет вовремя. Постоянный мониторинг дорожной ситуации позволяет избегать задержек.'
  },
  {
    icon: <Truck className="w-10 h-10" />,
    title: 'Комфорт',
    description: 'Современные автомобили с кондиционером, Wi-Fi и другими удобствами сделают вашу поездку максимально комфортной независимо от расстояния.'
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: 'Удобная оплата',
    description: 'Различные способы оплаты: наличными, банковской картой или онлайн. Выберите наиболее удобный для вас вариант.'
  },
  {
    icon: <ThumbsUp className="w-10 h-10" />,
    title: 'Опытные водители',
    description: 'Наши водители говорят на русском и английском языках, знают дороги и особенности пересечения границ, помогут с багажом.'
  },
  {
    icon: <Headphones className="w-10 h-10" />,
    title: '24/7 поддержка',
    description: 'Служба поддержки доступна круглосуточно. Мы готовы ответить на ваши вопросы и решить любые проблемы в любое время.'
  }
]

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline inline-block">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Мы делаем все возможное, чтобы ваше путешествие было комфортным, безопасным и приятным.
            Доверьте свою поездку профессионалам.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 card-hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-primary bg-primary/10 p-4 rounded-full animate-float">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Статистика */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 bg-primary/5 p-8 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-bold text-primary mb-2"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                type: 'spring',
                stiffness: 100
              }}
            >
              5000+
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300">Довольных клиентов</p>
          </div>

          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-bold text-primary mb-2"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                type: 'spring',
                stiffness: 100
              }}
            >
              15+
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300">Направлений</p>
          </div>

          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-bold text-primary mb-2"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                type: 'spring',
                stiffness: 100
              }}
            >
              10+
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300">Лет опыта</p>
          </div>

          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-bold text-primary mb-2"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.7,
                type: 'spring',
                stiffness: 100
              }}
            >
              24/7
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300">Поддержка</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
