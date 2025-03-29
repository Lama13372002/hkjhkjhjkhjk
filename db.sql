-- Create the database
CREATE DATABASE IF NOT EXISTS rostransfer;
USE rostransfer;

-- Routes table
CREATE TABLE IF NOT EXISTS `Route` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `originCity` VARCHAR(255) NOT NULL,
  `destinationCity` VARCHAR(255) NOT NULL,
  `distance` FLOAT NOT NULL,
  `estimatedTime` VARCHAR(255) NOT NULL,
  `priceComfort` FLOAT NOT NULL,
  `priceBusiness` FLOAT NOT NULL,
  `priceMinivan` FLOAT NOT NULL,
  `description` TEXT,
  `popularityRating` INT DEFAULT 1,
  `isActive` BOOLEAN DEFAULT TRUE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS `Vehicle` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `class` VARCHAR(50) NOT NULL,
  `brand` VARCHAR(255) NOT NULL,
  `model` VARCHAR(255) NOT NULL,
  `year` INT NOT NULL,
  `seats` INT NOT NULL,
  `description` TEXT,
  `imageUrl` VARCHAR(255),
  `amenities` TEXT,
  `isActive` BOOLEAN DEFAULT TRUE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Transfers table
CREATE TABLE IF NOT EXISTS `Transfer` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `routeId` INT NOT NULL,
  `vehicleId` INT,
  `vehicleClass` VARCHAR(50) NOT NULL,
  `customerName` VARCHAR(255) NOT NULL,
  `customerPhone` VARCHAR(50) NOT NULL,
  `date` DATE NOT NULL,
  `time` VARCHAR(50) NOT NULL,
  `origin` VARCHAR(255) NOT NULL,
  `destination` VARCHAR(255) NOT NULL,
  `paymentMethod` VARCHAR(50) NOT NULL,
  `returnTransfer` BOOLEAN DEFAULT FALSE,
  `comments` TEXT,
  `status` VARCHAR(50) DEFAULT 'pending',
  `price` FLOAT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`),
  FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS `Review` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customerName` VARCHAR(255) NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NOT NULL,
  `imageUrl` VARCHAR(255),
  `isPublished` BOOLEAN DEFAULT TRUE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS `BlogPost` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `content` TEXT NOT NULL,
  `imageUrl` VARCHAR(255),
  `excerpt` TEXT,
  `isPublished` BOOLEAN DEFAULT TRUE,
  `publishedAt` DATETIME,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contacts form submissions
CREATE TABLE IF NOT EXISTS `Contact` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `email` VARCHAR(255),
  `phone` VARCHAR(50),
  `message` TEXT NOT NULL,
  `isRead` BOOLEAN DEFAULT FALSE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample routes
INSERT INTO `Route` (`originCity`, `destinationCity`, `distance`, `estimatedTime`, `priceComfort`, `priceBusiness`, `priceMinivan`, `description`, `popularityRating`) VALUES
('Калининград', 'Гданьск', 150, '2-3 часа', 250, 450, 450, 'Популярный маршрут из Калининграда в Гданьск. Комфортная поездка через границу с Польшей.', 5),
('Калининград', 'Варшава', 350, '5-6 часов', 350, 550, 550, 'Прямой трансфер в столицу Польши. Комфортабельные автомобили и опытные водители.', 4),
('Калининград', 'Берлин', 600, '8-9 часов', 450, 750, 750, 'Дальний маршрут в столицу Германии. Включает несколько остановок для отдыха.', 3),
('Калининград', 'Вильнюс', 280, '4-5 часов', 300, 500, 500, 'Поездка в столицу Литвы через живописные места и исторические города.', 4),
('Калининград', 'Каунас', 330, '5-6 часов', 320, 520, 520, 'Трансфер в второй по величине город Литвы. Проезд через красивые ландшафты.', 3),
('Калининград', 'Рига', 450, '7-8 часов', 400, 650, 650, 'Дальний маршрут в столицу Латвии. Включает пересечение нескольких границ.', 3);

-- Insert sample vehicles
INSERT INTO `Vehicle` (`class`, `brand`, `model`, `year`, `seats`, `description`, `imageUrl`, `amenities`) VALUES
('comfort', 'Volkswagen', 'Passat', 2022, 4, 'Комфортабельный седан бизнес-класса для поездок по Европе. Просторный салон и большой багажник.', '/images/vehicles/passat.jpg', 'Кондиционер, Wi-Fi, зарядные устройства, минеральная вода'),
('business', 'Mercedes-Benz', 'E-Class', 2023, 4, 'Представительский автомобиль премиум-класса. Идеальный выбор для бизнес-поездок и VIP-трансферов.', '/images/vehicles/mercedes.jpg', 'Кожаный салон, климат-контроль, Wi-Fi, мини-бар, зарядные устройства'),
('minivan', 'Volkswagen', 'Multivan', 2022, 7, 'Просторный минивэн для групповых поездок. Идеально подходит для семей или небольших групп.', '/images/vehicles/multivan.jpg', 'Кондиционер, Wi-Fi, мультимедийная система, большое багажное отделение');

-- Insert sample reviews
INSERT INTO `Review` (`customerName`, `rating`, `comment`, `imageUrl`) VALUES
('Александр С.', 5, 'Отличный сервис! Водитель был вовремя, автомобиль чистый и комфортный. Доехали быстро и без проблем. Рекомендую!', '/images/reviews/avatar1.jpg'),
('Елена Т.', 5, 'Заказывали трансфер из Калининграда в Варшаву. Все прошло гладко, несмотря на долгую дорогу. Водитель профессионал, машина комфортная. Спасибо!', '/images/reviews/avatar2.jpg'),
('Дмитрий П.', 4, 'Хороший сервис, удобно что можно заказать обратный трансфер сразу. Единственное - немного задержался водитель, но в целом все отлично.', '/images/reviews/avatar3.jpg');

-- Insert sample blog posts
INSERT INTO `BlogPost` (`title`, `slug`, `content`, `imageUrl`, `excerpt`, `isPublished`, `publishedAt`) VALUES
('Как подготовиться к путешествию в Европу на автомобиле', 'travel-to-europe-tips', 'Путешествие в Европу на автомобиле - это отличный способ увидеть множество стран и городов за одну поездку. В этой статье мы расскажем, как правильно подготовиться к такому путешествию, что нужно знать о пересечении границ, какие документы подготовить и что взять с собой в дорогу...', '/images/blog/europe-travel.jpg', 'Полезные советы для тех, кто планирует автомобильное путешествие по Европе', TRUE, NOW()),
('Топ-5 достопримечательностей Гданьска', 'gdansk-top-attractions', 'Гданьск - один из красивейших городов Польши с богатой историей и архитектурой. В этой статье мы расскажем о пяти главных достопримечательностях, которые обязательно стоит посетить во время вашего пребывания в Гданьске...', '/images/blog/gdansk.jpg', 'Путеводитель по самым интересным местам Гданьска', TRUE, NOW()),
('Особенности пересечения границы между Россией и Польшей', 'russia-poland-border', 'Пересечение границы между Калининградской областью и Польшей имеет свои особенности. В этой статье мы подробно расскажем о процедуре пересечения, необходимых документах, возможных сложностях и как их избежать...', '/images/blog/border.jpg', 'Все, что нужно знать о пересечении границы между Россией и Польшей', TRUE, NOW());
