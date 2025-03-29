#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Настройка проекта RoyalTransfer с админ-панелью${NC}"
echo "-------------------------------------------------"

# Проверка наличия .env файла
if [ ! -f .env ]; then
  echo -e "${YELLOW}Файл .env не найден. Копирую из примера...${NC}"
  cp .env.example .env
  echo -e "${GREEN}Файл .env создан! Пожалуйста, отредактируйте его и укажите корректные значения.${NC}"
else
  echo -e "${GREEN}Файл .env уже существует.${NC}"
fi

# Установка зависимостей
echo -e "${YELLOW}Установка зависимостей...${NC}"
bun install

# Генерация Prisma клиента
echo -e "${YELLOW}Генерация Prisma клиента...${NC}"
bunx prisma generate

echo -e "${GREEN}✓ Настройка проекта успешно завершена!${NC}"
echo

# Проверка DATABASE_URL
if grep -q "mysql://user:password@localhost" .env; then
  echo -e "${RED}ВНИМАНИЕ: В файле .env содержатся тестовые значения для DATABASE_URL.${NC}"
  echo -e "${RED}Необходимо заменить их на реальные перед запуском проекта.${NC}"
  echo
fi

echo -e "${YELLOW}Для запуска проекта выполните:${NC}"
echo "bun run dev"
echo
echo -e "${YELLOW}Для доступа к админ-панели перейдите по адресу:${NC}"
echo "http://localhost:3000/admin/login"
echo
echo -e "${YELLOW}По умолчанию используется API-ключ:${NC}"
echo "12345-admin-secret-key"
echo
echo -e "${RED}ВАЖНО: Для реального проекта измените API-ключ в файле src/lib/constants.ts${NC}"
