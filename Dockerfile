FROM oven/bun:1 as base
WORKDIR /app

# Копируем сначала только файлы, необходимые для зависимостей
COPY package.json bun.lock ./
COPY prisma ./prisma

# Устанавливаем зависимости
RUN bun install

# Копируем остальные файлы приложения
COPY . .

# Генерируем Prisma клиент (на всякий случай)
RUN bunx prisma generate

# Сборка проекта
RUN bun run build

# Создаем скрипт запуска приложения с предварительным запуском миграций
RUN echo '#!/bin/sh\n\
if [ -z "$DATABASE_URL" ]; then\n\
  echo "ПРЕДУПРЕЖДЕНИЕ: DATABASE_URL не установлен. Миграции не будут выполнены."\n\
else\n\
  echo "Запуск миграций базы данных..."\n\
  node migrate.js || echo "Миграции не удались, но приложение всё равно будет запущено"\n\
fi\n\
echo "Запуск приложения..."\n\
node start-app.js\n\
' > /app/start.sh && chmod +x /app/start.sh

# Запуск приложения
EXPOSE 3000
CMD ["/app/start.sh"]
