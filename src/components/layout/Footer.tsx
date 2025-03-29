'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { useEffect, useState } from 'react'

// Типы для настроек футера
interface FooterSettings {
  footer_company_address: string
  footer_company_phone: string
  footer_company_email: string
  footer_working_hours: string
  footer_social_instagram: string
  footer_social_telegram: string
  footer_social_whatsapp: string
  footer_company_description: string
}

// Значения по умолчанию (на случай ошибки загрузки)
const defaultSettings: FooterSettings = {
  footer_company_address: 'г. Калининград, ул. Примерная, д. 123',
  footer_company_phone: '+7 (900) 000-00-00',
  footer_company_email: 'info@royaltransfer.ru',
  footer_working_hours: 'Пн-Вс: 24/7\nРаботаем без выходных',
  footer_social_instagram: '#',
  footer_social_telegram: '#',
  footer_social_whatsapp: '#',
  footer_company_description: 'Комфортные трансферы из Калининграда в города Европы. Безопасность, комфорт и пунктуальность.'
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [settings, setSettings] = useState<FooterSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)

  // Загружаем настройки при монтировании компонента
  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch('/api/settings')

        if (response.ok) {
          const data = await response.json()
          setSettings({
            ...defaultSettings, // Используем дефолтные значения как основу
            ...data // Перезаписываем данными из API
          })
        }
      } catch (error) {
        console.error('Ошибка загрузки настроек футера:', error)
        // Если ошибка, используем дефолтные значения
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  // Преобразование текста с переносами строк в JSX с тегами <br>
  const formatWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              <h3 className="text-xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  Royal<span className="text-primary">Transfer</span>
                </span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              {settings.footer_company_description}
            </p>
            <div className="flex space-x-4 mt-6">
              {settings.footer_social_instagram && (
                <a
                  href={settings.footer_social_instagram}
                  className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
              {settings.footer_social_telegram && (
                <a
                  href={settings.footer_social_telegram}
                  className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors"
                  aria-label="Telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className="w-5 h-5" />
                </a>
              )}
              {settings.footer_social_whatsapp && (
                <a
                  href={settings.footer_social_whatsapp}
                  className="bg-green-500 hover:bg-green-600 p-2 rounded-full transition-colors"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in delay-100">
            <h3 className="text-lg font-semibold mb-4 heading-underline">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">Главная</Link>
              </li>
              <li>
                <Link href="/#routes" className="text-gray-400 hover:text-primary transition-colors">Маршруты</Link>
              </li>
              <li>
                <Link href="/#vehicles" className="text-gray-400 hover:text-primary transition-colors">Автомобили</Link>
              </li>
              <li>
                <Link href="/#benefits" className="text-gray-400 hover:text-primary transition-colors">Преимущества</Link>
              </li>
              <li>
                <Link href="/#reviews" className="text-gray-400 hover:text-primary transition-colors">Отзывы</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">Блог</Link>
              </li>
              <li>
                <Link href="/#contacts" className="text-gray-400 hover:text-primary transition-colors">Контакты</Link>
              </li>
            </ul>
          </div>

          {/* Popular Routes */}
          <div className="animate-fade-in delay-200">
            <h3 className="text-lg font-semibold mb-4 heading-underline">Популярные маршруты</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#routes" className="text-gray-400 hover:text-primary transition-colors">
                  Калининград – Гданьск
                </Link>
              </li>
              <li>
                <Link href="/#routes" className="text-gray-400 hover:text-primary transition-colors">
                  Калининград – Варшава
                </Link>
              </li>
              <li>
                <Link href="/#routes" className="text-gray-400 hover:text-primary transition-colors">
                  Калининград – Берлин
                </Link>
              </li>
              <li>
                <Link href="/#routes" className="text-gray-400 hover:text-primary transition-colors">
                  Калининград – Вильнюс
                </Link>
              </li>
              <li>
                <Link href="/#routes" className="text-gray-400 hover:text-primary transition-colors">
                  Калининград – Каунас
                </Link>
              </li>
              <li>
                <Link href="/#routes" className="text-gray-400 hover:text-primary transition-colors">
                  Калининград – Рига
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in delay-300">
            <h3 className="text-lg font-semibold mb-4 heading-underline">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <span className="text-gray-400">{settings.footer_company_address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <a href={`tel:${settings.footer_company_phone.replace(/\D/g, '')}`} className="text-gray-400 hover:text-primary transition-colors">
                  {settings.footer_company_phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <a href={`mailto:${settings.footer_company_email}`} className="text-gray-400 hover:text-primary transition-colors">
                  {settings.footer_company_email}
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <span className="text-gray-400">
                  {formatWithLineBreaks(settings.footer_working_hours)}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} RoyalTransfer. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
