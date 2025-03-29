import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_API_KEY } from './lib/constants'

// Этот middleware будет запускаться для всех запросов к /admin и /api/admin
export function middleware(request: NextRequest) {
  // Получаем путь запроса
  const path = request.nextUrl.pathname

  // Проверяем, обращается ли запрос к админ-панели или её API
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    // Проверяем наличие куки с API-ключом
    const apiKey = request.cookies.get('admin_api_key')?.value

    // Если API-ключ отсутствует или некорректен, перенаправляем на страницу входа
    if (!apiKey || apiKey !== ADMIN_API_KEY) {
      // Если это API-запрос, возвращаем ошибку авторизации
      if (path.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      // Если запрос идет не от страницы входа, перенаправляем на неё
      if (path !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }

    // Если запрос уже на странице входа, но пользователь авторизован,
    // перенаправляем его на главную страницу админки
    if (path === '/admin/login' && apiKey === ADMIN_API_KEY) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

// Указываем, для каких путей должен срабатывать middleware
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
