import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientBody from './ClientBody'
import { ToastProvider } from '@/components/ui/use-toast'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'RoyalTransfer | Комфортные трансферы из Калининграда в города Европы',
  description: 'Индивидуальные трансферы из Калининграда в города Европы - Гданьск, Варшава, Берлин, Вильнюс и другие направления. Комфортабельные автомобили и опытные водители.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <ToastProvider>
        <ClientBody>
          <div className={inter.className}>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </ClientBody>
      </ToastProvider>
    </html>
  )
}
