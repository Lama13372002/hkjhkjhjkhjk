// Prisma Client для подключения к базе данных
import { PrismaClient } from '@prisma/client'

// Declare global variable to prevent multiple instances
declare global {
  var prismaGlobal: PrismaClient | undefined
}

function createPrismaClient() {
  try {
    console.log('Создание нового экземпляра Prisma Client...')
    const client = new PrismaClient({
      log: ['query', 'error', 'warn'],
    })
    
    // Проверяем подключение
    client.$connect()
      .then(() => console.log('Prisma Client успешно подключен к базе данных'))
      .catch((err) => console.error('Ошибка подключения Prisma Client:', err))
    
    return client
  } catch (error) {
    console.error('Ошибка при создании Prisma Client:', error)
    throw error
  }
}

// Используем глобальный синглтон в режиме разработки для предотвращения
// создания множества соединений при горячей перезагрузке
const prisma = global.prismaGlobal || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma
}

export default prisma
