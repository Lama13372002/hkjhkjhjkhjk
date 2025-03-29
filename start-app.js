// Скрипт для запуска Next.js приложения
const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Функция для проверки подключения к базе данных
async function checkDatabaseConnection() {
  return new Promise((resolve) => {
    console.log('Проверка подключения к базе данных...');

    const testProcess = spawn('node', ['prisma-test.js'], {
      stdio: 'inherit',
      shell: true
    });

    testProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Подключение к базе данных успешно проверено!');
        resolve(true);
      } else {
        console.error(`Ошибка подключения к базе данных, код выхода: ${code}`);
        resolve(false);
      }
    });
  });
}

// Функция для запуска сервера Next.js
async function startNextApp() {
  // Выводим диагностическую информацию
  require('./railway.js');

  // Получение порта из переменных окружения или использование 3000 по умолчанию
  const PORT = process.env.PORT || 3000;

  console.log(`Запуск Next.js на порту ${PORT}...`);

  // Пути к директориям Next.js
  const nextBinPath = path.join(process.cwd(), 'node_modules', '.bin', 'next');

  // Запуск Next.js
  const nextProcess = spawn(nextBinPath, ['start', '-p', PORT], {
    stdio: 'inherit',
    shell: true
  });

  nextProcess.on('close', (code) => {
    console.log(`Next.js процесс завершился с кодом ${code}`);
    process.exit(code);
  });

  // Обработка сигналов завершения
  process.on('SIGINT', () => {
    nextProcess.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    nextProcess.kill('SIGTERM');
  });
}

// Основная функция запуска приложения
async function main() {
  // Сначала проверяем подключение к базе данных
  await checkDatabaseConnection();

  // Запускаем приложение
  await startNextApp();
}

// Запуск основной функции
main().catch(error => {
  console.error('Ошибка при запуске приложения:', error);
  process.exit(1);
});
