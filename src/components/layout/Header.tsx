'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import BookingForm from '@/components/forms/BookingForm'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation links
  const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Маршруты', href: '/#routes' },
    { name: 'Автомобили', href: '/#vehicles' },
    { name: 'Преимущества', href: '/#benefits' },
    { name: 'Отзывы', href: '/#reviews' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/#contacts' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary flex items-center space-x-2 group"
        >
          <span className="flex items-center animate-pulse">
            <MapPin className="w-6 h-6 mr-1" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              Royal<span className="text-primary">Transfer</span>
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact & Book Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="tel:+79000000000"
            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 mr-2 animate-pulse" />
            <span>+7 (900) 000-00-00</span>
          </a>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-gradient text-white font-medium">
                Заказать трансфер
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
              <DialogTitle className="sr-only">Заказать трансфер</DialogTitle>
              <BookingForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary border-b border-gray-100 dark:border-gray-800 animate-slide-in-left`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+79000000000"
              className="flex items-center py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary animate-slide-in-left"
              style={{ animationDelay: `${navLinks.length * 50}ms` }}
            >
              <Phone className="w-4 h-4 mr-2" />
              <span>+7 (900) 000-00-00</span>
            </a>

            <div className="pt-4 animate-slide-in-left" style={{ animationDelay: `${(navLinks.length + 1) * 50}ms` }}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-gradient w-full text-white font-medium">
                    Заказать трансфер
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden">
                  <DialogTitle className="sr-only">Заказать трансфер</DialogTitle>
                  <BookingForm />
                </DialogContent>
              </Dialog>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
