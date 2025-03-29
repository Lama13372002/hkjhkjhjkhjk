// Скрипт для вывода информации о переменных окружения Railway
console.log('Информация о переменных окружения Railway:');
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Задана (значение скрыто)' : 'Не задана');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Объявляем Railway, что сервер запущен
console.log('Railway: Сервер запущен на порту', process.env.PORT || 3000);
