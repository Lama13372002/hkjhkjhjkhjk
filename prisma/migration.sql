-- CreateTable
CREATE TABLE IF NOT EXISTS `SiteSettings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(255) NOT NULL UNIQUE,
  `value` TEXT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial footer settings
INSERT INTO `SiteSettings` (`key`, `value`) VALUES
('footer_company_address', 'г. Калининград, ул. Примерная, д. 123'),
('footer_company_phone', '+7 (900) 000-00-00'),
('footer_company_email', 'info@royaltransfer.ru'),
('footer_working_hours', 'Пн-Вс: 24/7\nРаботаем без выходных'),
('footer_social_instagram', '#'),
('footer_social_telegram', '#'),
('footer_social_whatsapp', '#'),
('footer_company_description', 'Комфортные трансферы из Калининграда в города Европы. Безопасность, комфорт и пунктуальность.');
