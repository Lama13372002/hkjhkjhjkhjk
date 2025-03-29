'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const reviews = [
  {
    id: 1,
    name: 'Александр С.',
    rating: 5,
    comment: 'Отличный сервис! Водитель был вовремя, автомобиль чистый и комфортный. Доехали быстро и без проблем. Рекомендую!',
    image: '/images/reviews/avatar1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    date: '15.02.2023',
    route: 'Калининград - Гданьск'
  },
  {
    id: 2,
    name: 'Елена Т.',
    rating: 5,
    comment: 'Заказывали трансфер из Калининграда в Варшаву. Все прошло гладко, несмотря на долгую дорогу. Водитель профессионал, машина комфортная. Спасибо!',
    image: '/images/reviews/avatar2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80',
    date: '03.03.2023',
    route: 'Калининград - Варшава'
  },
  {
    id: 3,
    name: 'Дмитрий П.',
    rating: 4,
    comment: 'Хороший сервис, удобно что можно заказать обратный трансфер сразу. Единственное - немного задержался водитель, но в целом все отлично.',
    image: '/images/reviews/avatar3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
    date: '18.04.2023',
    route: 'Калининград - Вильнюс'
  },
  {
    id: 4,
    name: 'Мария К.',
    rating: 5,
    comment: 'Прекрасный сервис! Заказывали трансфер для всей семьи с двумя детьми. Водитель был очень вежливый и терпеливый. Машина чистая, с детскими креслами, как мы и просили. Определенно будем пользоваться услугами RosTransfer снова!',
    image: '/images/reviews/avatar4.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80',
    date: '02.05.2023',
    route: 'Калининград - Рига'
  },
  {
    id: 5,
    name: 'Иван С.',
    rating: 5,
    comment: 'Отличная поездка! Заказывал бизнес-класс для деловой поездки. Водитель помог с багажом, в машине была питьевая вода и Wi-Fi. Очень доволен и приятно удивлен уровнем сервиса.',
    image: '/images/reviews/avatar5.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
    date: '20.05.2023',
    route: 'Калининград - Берлин'
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 h-full review-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center mr-4"
            style={{ backgroundImage: `url(${review.fallbackImage})` }}
          />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{review.name}</h3>
            <div className="flex items-center space-x-2">
              <StarRating rating={review.rating} />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {review.date}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Маршрут: {review.route}
        </div>

        <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4 relative z-10">
          {review.comment}
        </p>

        <div className="text-right">
          <Quote className="w-5 h-5 text-primary inline-block" />
        </div>
      </div>
    </motion.div>
  )
}

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState<typeof reviews>([]);
  const reviewsPerPage = 3;

  // Update visible reviews when active index changes
  useEffect(() => {
    const startIndex = activeIndex * reviewsPerPage;
    const endIndex = Math.min(startIndex + reviewsPerPage, reviews.length);
    setVisibleReviews(reviews.slice(startIndex, endIndex));
  }, [activeIndex]);

  // Total pages calculation
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const nextPage = () => {
    setActiveIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="reviews" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline inline-block">
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Мы ценим каждого клиента и постоянно работаем над улучшением нашего сервиса.
            Вот что говорят о нас те, кто уже воспользовался нашими услугами.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className="rounded-full"
              aria-label="Предыдущая страница"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index
                      ? 'bg-primary w-4'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Страница ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full"
              aria-label="Следующая страница"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
