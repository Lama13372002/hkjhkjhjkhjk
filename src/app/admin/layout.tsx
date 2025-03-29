'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ADMIN_MENU } from '@/lib/constants'
import { Settings, ListEnd, LogOut } from 'lucide-react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

// Разметка для интерфейса админки
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('admin_api_key')
    router.push('/admin/login')
  }

  // Если страница входа, показываем только содержимое без разметки админки
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Получаем иконку по названию
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'settings':
        return <Settings className="w-5 h-5" />
      case 'footer':
        return <ListEnd className="w-5 h-5" />
      default:
        return <Settings className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Боковая панель */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Админ-панель</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {ADMIN_MENU.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center p-2 rounded ${
                    pathname === item.path ? 'bg-blue-700' : 'hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-3">{getIcon(item.icon)}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-2 rounded hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* Основное содержимое */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
