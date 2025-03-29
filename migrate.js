// Скрипт для запуска миграций при деплое
const { exec } = require('child_process');
const { PrismaClient } = require('@prisma/client');

console.log('Подготовка к запуску миграций базы данных...');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Установлен (значение скрыто)' : 'Не установлен');

// Функция для проверки соединения с базой данных
async function testDatabaseConnection() {
  const prisma = new PrismaClient();
  try {
    console.log('Тестирование подключения к базе данных...');
    await prisma.$connect();
    console.log('Подключение к базе данных успешно установлено!');
    return true;
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Сначала проверяем соединение с БД, затем запускаем миграции
async function runMigrations() {
  const connectionSuccessful = await testDatabaseConnection();

  if (!connectionSuccessful) {
    console.error('Миграции не будут запущены из-за проблем с подключением к базе данных');
    return;
  }

  console.log('Запуск миграций базы данных...');

  exec('bunx prisma migrate deploy', (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка выполнения миграций: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Предупреждение: ${stderr}`);
    }

    console.log(`Миграции успешно выполнены: ${stdout}`);

    // Генерация клиента Prisma после миграций
    exec('bunx prisma generate', (genError, genStdout, genStderr) => {
      if (genError) {
        console.error(`Ошибка генерации Prisma клиента: ${genError.message}`);
        return;
      }

      console.log(`Prisma клиент успешно сгенерирован: ${genStdout}`);
    });
  });
}

runMigrations();
