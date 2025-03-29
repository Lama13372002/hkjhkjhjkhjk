import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/settings - Получение всех настроек сайта
export async function GET() {
  try {
    console.log('Попытка получения настроек через Prisma...')

    // Проверяем соединение с базой данных
    if (!prisma) {
      console.error('Prisma клиент не инициализирован')
      return NextResponse.json({ error: 'Проблема с подключением к базе данных' }, { status: 500 })
    }

    const settings = await prisma.siteSettings.findMany()
    console.log('Настройки успешно получены:', settings.length)

    // Преобразуем массив в объект для удобства использования
    const settingsObject = settings.reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error('Ошибка при получении настроек:', error)
    return NextResponse.json({ error: 'Не удалось получить настройки' }, { status: 500 })
  }
}

// Список разрешенных ключей для обновления (только настройки подвала)
const allowedFooterKeys = [
  'footer_company_address',
  'footer_company_phone',
  'footer_company_email',
  'footer_working_hours',
  'footer_social_instagram',
  'footer_social_telegram',
  'footer_social_whatsapp',
  'footer_company_description'
]

// POST /api/settings - Обновление настроек сайта
export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Получен запрос на обновление настроек:', Object.keys(data))

    // Валидация данных
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Неверный формат данных' }, { status: 400 })
    }

    // Проверяем соединение с базой данных
    if (!prisma) {
      console.error('Prisma клиент не инициализирован')
      return NextResponse.json({ error: 'Проблема с подключением к базе данных' }, { status: 500 })
    }

    // Обновляем только разрешенные ключи
    const updatePromises = Object.entries(data)
      .filter(([key]) => allowedFooterKeys.includes(key))
      .map(async ([key, value]) => {
        // Проверяем, что значение - строка
        if (typeof value !== 'string') {
          throw new Error(`Значение для ключа ${key} должно быть строкой`)
        }

        return prisma.siteSettings.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        })
      })

    const results = await Promise.all(updatePromises)
    console.log('Настройки успешно обновлены:', results.length)

    return NextResponse.json({ success: true, message: 'Настройки успешно обновлены' })
  } catch (error) {
    console.error('Ошибка при обновлении настроек:', error)
    return NextResponse.json({ error: 'Не удалось обновить настройки' }, { status: 500 })
  }
}
