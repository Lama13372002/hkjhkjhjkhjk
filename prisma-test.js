// Скрипт для проверки подключения к базе данных MySQL
const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('Тестирование подключения к базе данных...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Установлен (скрыт)' : 'Не установлен');

    // Пробуем выполнить простой запрос
    const settings = await prisma.siteSettings.findMany();
    console.log('Подключение успешно! Найдено настроек:', settings.length);
    console.log('Пример настроек:', settings.slice(0, 2));

    return true;
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection()
  .then(success => {
    console.log(success ? 'Тест завершился успешно!' : 'Тест завершился с ошибками!');
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Непредвиденная ошибка:', error);
    process.exit(1);
  });
