'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ADMIN_MENU } from '@/lib/constants'
import Link from 'next/link'
import { Settings, ListEnd } from 'lucide-react'

export default function AdminDashboard() {
  // Получаем иконку по названию
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'settings':
        return <Settings className="w-6 h-6" />
      case 'footer':
        return <ListEnd className="w-6 h-6" />
      default:
        return <Settings className="w-6 h-6" />
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Панель управления</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ADMIN_MENU.map((item) => (
          <Link href={item.path} key={item.path}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>
                    Управление настройками {item.name.toLowerCase()}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {item.icon === 'footer'
                    ? 'Редактирование контактной информации и ссылок в подвале сайта.'
                    : 'Основные настройки сайта.'}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
