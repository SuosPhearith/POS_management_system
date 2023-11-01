-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2023 at 12:29 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int(5) DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `description`, `sort_order`, `image`, `created_date`, `updated_date`) VALUES
(4, 'Energy drink', NULL, 'About energy drink.', 4, '', '2023-08-24 00:00:00', '2023-09-08 00:00:00'),
(16, 'ចាន', NULL, 'about jan', 2, NULL, '2023-09-04 00:00:00', '2023-09-08 00:00:00'),
(24, 'ចានថ្ម', NULL, 'about jan thor', 6, NULL, '2023-09-04 00:00:00', '2023-09-08 00:00:00'),
(31, 'បារី', NULL, 'about cegarrat', 3, NULL, '2023-09-04 00:00:00', '2023-09-08 00:00:00'),
(42, 'Cup', NULL, 'About Cup', 5, NULL, '2023-09-06 00:00:00', '2023-09-08 00:00:00'),
(44, 'Beer', NULL, 'About beer', 1, NULL, '2023-09-08 00:00:00', '2023-10-09 13:55:49'),
(46, 'Drink', NULL, 'hello', 1, '1695117985408-Adjustment 01.jpg', '2023-09-17 00:00:00', '2023-10-09 13:55:19'),
(47, 'Brother', NULL, NULL, 9, '1695634640587-Blur01.jpg', '2023-09-25 00:00:00', '2023-09-25 00:00:00'),
(48, 'Thida', NULL, NULL, 10, '1695635373627-Action01.JPG', '2023-09-25 00:00:00', '2023-09-25 00:00:00'),
(49, 'Rice', NULL, '', 12, NULL, '2023-09-27 00:00:00', '2023-09-27 00:00:00'),
(50, 'Car', NULL, '', 11, NULL, '2023-09-27 00:00:00', '2023-09-27 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `contact`, `address`, `image`) VALUES
(1, 'Phearith', '069265958', 'Sr', NULL),
(3, 'អតិថិជនទូទៅ', '09876564', 'PP', NULL),
(4, 'Channa', '123456789', 'KP', '1695799436977-Blur01.jpg'),
(8, 'Thida', '0989795675', 'PP', '1695635487665-Action01.JPG'),
(9, 'ភារិទ្ធិ', '069265958', 'SR', NULL),
(10, 'Dara', '09867856', '', NULL),
(11, 'Somnang', '07765343', 'SR', '1695830782334-Blur01.jpg'),
(12, 'Nita', '093945034', 'PP', NULL),
(13, 'Nitaa1', '093945034', 'PP', NULL),
(14, 'Nitaa2', '093945034', 'PP', NULL),
(15, 'Nitaa3', '093945034', 'PP', NULL),
(16, 'Nitaa4', '093945034', 'PP', NULL),
(17, 'Nitaa5', '093945034', 'PP', NULL),
(18, 'Nitaa6', '093945034', 'PP', NULL),
(19, 'Nitaa7', '093945034', 'PP', NULL),
(20, 'Nitaa8', '093945034', 'PP', NULL),
(21, 'Nitaa9', '093945034', 'PP', NULL),
(22, 'Nitaa10', '093945034', 'PP', NULL),
(23, 'Nitaa11', '093945034', 'PP', NULL),
(24, 'Nitaa12', '093945034', 'PP', NULL),
(25, 'Nitaa13', '093945034', 'PP', NULL),
(26, 'Nitaa14', '093945034', 'PP', NULL),
(27, 'Nitaa15', '093945034', 'PP', NULL),
(28, 'Khemara', '09938954', '', NULL),
(29, 'Bora', '097878678', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exchangerate`
--

CREATE TABLE `exchangerate` (
  `id` int(11) NOT NULL,
  `dollar` int(10) NOT NULL,
  `riel` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exchangerate`
--

INSERT INTO `exchangerate` (`id`, `dollar`, `riel`) VALUES
(1, 1, 4100);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `saleType` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_type_id` int(11) DEFAULT NULL,
  `products_khmer_currency` int(15) NOT NULL,
  `products_USD_currency` float NOT NULL,
  `total_amount_USD` float DEFAULT NULL,
  `total_amount_khmer` int(20) NOT NULL,
  `debt` float DEFAULT NULL,
  `deposit` float DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Thank you!'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `customer_id`, `saleType`, `payment_type_id`, `products_khmer_currency`, `products_USD_currency`, `total_amount_USD`, `total_amount_khmer`, `debt`, `deposit`, `created_date`, `updated_date`, `user_id`, `description`) VALUES
(360, 3, 'product', 1, 110000, 223, 250.5, 1002000, 0, 250.5, '2023-10-03 00:39:00', '2023-10-03 00:39:00', 11, ''),
(361, 3, 'unit', 1, 0, 2, 2, 8000, 0, 2, '2023-10-03 00:39:23', '2023-10-03 00:39:23', 11, ''),
(362, 3, 'product', 1, 70063, 384.4, 401.916, 1607663, 0, 401.916, '2023-10-03 00:39:56', '2023-10-03 00:39:56', 11, ''),
(363, 3, 'unit', 1, 0, 3.5, 3.5, 14000, 0, 3.5, '2023-10-03 16:14:54', '2023-10-03 16:14:54', 1, ''),
(364, 3, 'unit', 1, 0, 1.5, 1.5, 6000, 0, 1.5, '2023-10-03 16:34:47', '2023-10-03 16:34:47', 1, ''),
(365, 3, 'unit', 1, 0, 1, 1, 4000, 0, 1, '2023-10-03 16:35:03', '2023-10-03 16:35:03', 1, ''),
(366, 3, 'product', 1, 0, 18, 18, 72000, 0, 18, '2023-10-03 16:35:37', '2023-10-03 16:35:37', 1, ''),
(367, 3, 'product', 1, 0, 6, 6, 24000, 0, 6, '2023-10-03 16:35:54', '2023-10-03 16:35:54', 1, ''),
(368, 3, 'unit', 1, 0, 0.5, 0.5, 2000, 0, 0.5, '2023-10-03 16:36:09', '2023-10-03 16:36:09', 1, ''),
(369, 3, 'unit', 1, 0, 10.5, 10.5, 42000, 0, 10.5, '2023-10-03 16:36:45', '2023-10-03 16:36:45', 1, ''),
(370, 3, 'unit', 1, 0, 3, 3, 12000, 0, 3, '2023-10-03 16:38:22', '2023-10-03 16:38:22', 1, ''),
(371, 3, 'unit', 1, 0, 1, 1, 4000, 0, 1, '2023-10-03 16:38:46', '2023-10-03 16:38:46', 1, ''),
(372, 3, 'unit', 1, 10072, 180, 182.518, 730072, 0, 182.518, '2023-10-03 16:39:55', '2023-10-03 16:39:55', 1, ''),
(373, 3, 'unit', 1, 0, 10, 10, 40000, 0, 10, '2023-10-03 16:40:19', '2023-10-03 16:40:19', 1, ''),
(374, 3, 'unit', 1, 0, 4, 4, 16000, 0, 4, '2023-10-03 16:41:12', '2023-10-03 16:41:12', 1, ''),
(375, 3, 'unit', 1, 0, 16, 16, 64000, 0, 16, '2023-10-03 16:41:42', '2023-10-03 16:41:42', 1, ''),
(376, 3, 'unit', 1, 0, 1, 1, 4000, 0, 1, '2023-10-03 16:45:08', '2023-10-03 16:45:08', 1, ''),
(377, 3, 'unit', 1, 0, 6, 6, 24000, 6, 0, '2023-10-03 16:51:28', '2023-10-03 16:51:28', 1, ''),
(378, 3, 'unit', 1, 0, 0.5, 0.5, 2000, 0, 0.5, '2023-10-03 16:55:07', '2023-10-03 16:55:07', 1, ''),
(379, 3, 'unit', 1, 36, 50.5, 50.509, 202036, 0, 50.509, '2023-10-03 16:56:16', '2023-10-03 16:56:16', 1, ''),
(380, 3, 'unit', 1, 0, 5.5, 5.5, 22000, 0, 5.5, '2023-10-03 17:51:04', '2023-10-03 17:51:04', 1, ''),
(381, 3, 'unit', 1, 0, 7, 7, 28000, 0, 7, '2023-10-03 17:51:15', '2023-10-03 17:51:15', 1, ''),
(382, 3, 'product', 1, 18, 165.7, 165.704, 662818, 0, 165.704, '2023-10-03 17:51:44', '2023-10-03 17:51:44', 1, ''),
(383, 3, 'specail', 1, 36000, 154.4, 163.4, 653600, 163.4, 0, '2023-10-03 17:52:13', '2023-10-03 17:52:13', 1, ''),
(384, 3, 'product', 1, 0, 37.5, 37.5, 150000, 0, 37.5, '2023-10-09 13:58:27', '2023-10-09 13:58:27', 1, ''),
(385, 3, 'unit', 1, 0, 4, 4, 16000, 0, 4, '2023-10-09 13:59:51', '2023-10-09 13:59:51', 1, ''),
(386, 3, 'unit', 1, 15000, 1, 4.65854, 19100, 0, 4.65854, '2023-10-09 15:16:25', '2023-10-09 15:16:25', 1, ''),
(387, 3, 'unit', 1, 27, 3, 3.00659, 12327, 0, 3.00659, '2023-10-09 16:36:33', '2023-10-09 16:36:33', 1, ''),
(388, 3, 'unit', 1, 3000, 12, 12.7317, 52200, 0, 12.7317, '2023-10-18 09:09:54', '2023-10-18 09:09:54', 1, ''),
(389, 3, 'unit', 1, 28000, 0, 6.82927, 28000, 0, 6.82927, '2023-11-01 11:00:55', '2023-11-01 11:00:55', 1, ''),
(390, 3, 'unit', 1, 6000, 0, 1.46341, 6000, 0, 1.46341, '2023-11-01 11:09:54', '2023-11-01 11:09:54', 1, ''),
(391, 3, 'unit', 1, 490000, 0, 119.512, 490000, 119.512, 0, '2023-11-01 17:01:46', '2023-11-01 17:01:46', 1, ''),
(392, 3, 'product', 1, 240000, 0, 58.5366, 240000, 0, 58.5366, '2023-11-01 17:02:08', '2023-11-01 17:02:08', 1, ''),
(393, 3, 'product', 1, 60000, 0, 14.6341, 60000, 0, 14.6341, '2023-11-01 17:04:24', '2023-11-01 17:04:24', 1, ''),
(394, 3, 'product', 1, 300000, 0, 73.1707, 300000, 0, 73.1707, '2023-11-01 17:09:44', '2023-11-01 17:09:44', 1, ''),
(395, 3, 'product', 1, 300000, 0, 73.1707, 300000, 0, 73.1707, '2023-11-01 17:10:34', '2023-11-01 17:10:34', 1, ''),
(396, 3, 'product', 1, 300000, 0, 73.1707, 300000, 0, 73.1707, '2023-11-01 17:12:27', '2023-11-01 17:12:27', 1, ''),
(397, 3, 'product', 1, 5280000, 0, 1287.8, 5280000, 0, 1287.8, '2023-11-01 17:12:48', '2023-11-01 17:12:48', 1, ''),
(398, 3, 'product', 1, 5478000, 0, 1336.1, 5478000, 0, 1336.1, '2023-11-01 17:14:18', '2023-11-01 17:14:18', 1, ''),
(399, 3, 'product', 1, 170000, 0, 41.4634, 170000, 0, 41.4634, '2023-11-01 17:16:06', '2023-11-01 17:16:06', 1, ''),
(400, 3, 'product', 1, 3312000, 459.5, 1267.3, 5195950, 0, 1267.3, '2023-11-01 17:17:40', '2023-11-01 17:17:40', 1, ''),
(401, 3, 'product', 1, 0, 24, 24, 98400, 0, 24, '2023-11-01 17:26:18', '2023-11-01 17:26:18', 1, ''),
(402, 3, 'product', 1, 50000, 81.2, 93.3951, 382920, 0, 93.3951, '2023-11-01 17:26:37', '2023-11-01 17:26:37', 1, ''),
(403, 3, 'product', 1, 18, 13, 13.0044, 53318, 0, 13.0044, '2023-11-01 17:27:51', '2023-11-01 17:27:51', 1, ''),
(404, 3, 'product', 1, 0, 69.6, 69.6, 285360, 0, 69.6, '2023-11-01 17:35:26', '2023-11-01 17:35:26', 1, ''),
(405, 3, 'product', 1, 0, 44.5, 44.5, 182450, 0, 44.5, '2023-11-01 17:37:16', '2023-11-01 17:37:16', 1, ''),
(406, 3, 'product', 1, 18, 22.6, 22.6044, 92678, 0, 22.6044, '2023-11-01 17:42:09', '2023-11-01 17:42:09', 1, ''),
(407, 3, 'product', 1, 320000, 56.5, 134.549, 551650, 0, 134.549, '2023-11-01 17:44:07', '2023-11-01 17:44:07', 1, ''),
(408, 3, 'product', 1, 220000, 33, 86.6585, 355300, 0, 86.6585, '2023-11-01 18:13:44', '2023-11-01 18:13:44', 1, ''),
(409, 3, 'unit', 1, 275000, 0, 67.0732, 275000, 0, 67.0732, '2023-11-01 18:16:40', '2023-11-01 18:16:40', 1, ''),
(410, 3, 'unit', 1, 60000, 0, 14.6341, 60000, 0, 14.6341, '2023-11-01 18:24:40', '2023-11-01 18:24:40', 1, ''),
(411, 3, 'product', 1, 260000, 0, 63.4146, 260000, 0, 63.4146, '2023-11-01 18:26:53', '2023-11-01 18:26:53', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `paymenttypes`
--

CREATE TABLE `paymenttypes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `paymenttypes`
--

INSERT INTO `paymenttypes` (`id`, `name`, `description`) VALUES
(1, 'ABA', NULL),
(2, 'ACELEDA', 'About ACELEDA'),
(3, 'CASH', 'About CASH');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `box_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_quantity` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `unit_quantity` int(11) NOT NULL,
  `cashType` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_price` float NOT NULL,
  `product_price` float NOT NULL,
  `unit_price` float NOT NULL,
  `special_price` float NOT NULL,
  `discount_per` float DEFAULT NULL,
  `reorder_level` float DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `box_code`, `unit_code`, `name`, `order_quantity`, `quantity`, `category_id`, `unit_quantity`, `cashType`, `purchase_price`, `product_price`, `unit_price`, `special_price`, `discount_per`, `reorder_level`, `description`, `image`, `created_date`, `updated_date`, `user_id`) VALUES
(1, '123456789', '123456789', 'Sting', 131, -524, 4, 24, 'dollar', 5, 6, 0.5, 5.5, 0, NULL, 'This is Sting', '1696010231703-Sting.png', '2023-08-25 00:00:00', '2023-10-03 17:11:13', 1),
(18, '123456788', '123456788', 'Prime', 30, -1467, 4, 24, 'dollar', 5, 6.5, 0.5, 5.5, 0, NULL, 'This is prime', '1696010240693-592852_Prime_Glow_Berry_bottle_Front.jpg', '2023-08-26 00:00:00', '2023-10-03 17:11:32', 1),
(19, '742984252', '1931749242', 'Mountan', 20, -1037, 4, 24, 'dollar', 5, 6.5, 0.5, 5.5, 0, NULL, 'This is prime', '1696010250319-Diet_mountain_dew.jpg', '2023-08-26 00:00:00', '2023-10-03 13:50:43', 1),
(20, '849483975', '09585945', 'Vital', 20, -2438, 4, 24, 'dollar', 5, 6, 0.5, 5.5, 0, NULL, 'This is Sting', '1696010260915-phpfw8pbp-1644314723.png', '2023-09-06 00:00:00', '2023-10-03 13:50:56', 1),
(21, '193847924', '085390489', 'Dutch milk', 28, -234, 42, 24, 'dollar', 5, 6, 1, 5.5, 3, NULL, 'about hhh', '1695618606432-Blur01.jpg', '2023-09-06 00:00:00', '2023-10-03 13:51:12', 1),
(23, '759392795', '74968849', 'Apple', 25, 172, 31, 24, 'riel', 9, 9, 9, 9, 9, NULL, 'I love you', '1696010274858-Ex2.2.jpg', '2023-09-06 00:00:00', '2023-10-03 13:51:26', 1),
(25, '989375934', '892759725', 'ថង់ដៃ', 10, -395, 24, 6, 'dollar', 5.5, 2.3, 5.6, 5.6, 20, NULL, '', NULL, '2023-09-06 00:00:00', '2023-10-03 13:51:44', 1),
(29, '3785937592', '875947583', 'ចង្កឹស', 10, -1563, 44, 24, 'dollar', 10, 12, 1, 11, 0, NULL, '', '1696010301193-YellowCup-Nov2019-010.jfif', '2023-09-11 00:00:00', '2023-10-03 13:51:59', 1),
(30, '9589375928', '124537854', 'ខ្សែ', 11, -486, 16, 11, 'dollar', 1, 11, 11, 11, 11, NULL, '', '1694408881193-Blur01.jpg', '2023-09-11 00:00:00', '2023-10-03 13:52:16', 1),
(32, '759385294', '583859832', 'Milk', 1, -918, 42, 11, 'riel', 1, 10000, 1000, 9000, 0, NULL, '', NULL, '2023-09-11 00:00:00', '2023-10-03 13:52:30', 1),
(33, '792849759', '759358938', 'ស្រោមដៃ', 12, -140, 44, 11, 'dollar', 11, 11, 11, 11, 0, NULL, '', NULL, '2023-09-11 00:00:00', '2023-10-03 13:52:40', 1),
(34, '759384924', '7593897325', 'នំដំឡូង', 1, -45, 42, 1, 'dollar', 1, 1, 1, 1, 0, NULL, '', NULL, '2023-09-11 00:00:00', '2023-10-03 13:52:51', 1),
(36, '867496741', '058759395', 'កែវថ្ម', 5, -90, 42, 5, 'riel', 20000, 25000, 5000, 4500, 0, NULL, '', '1696010315594-YellowCup-Nov2019-010.jfif', '2023-09-21 00:00:00', '2023-10-03 13:53:05', 1),
(38, '9247977592', '7592759375', 'Cocacola', 20, -1184, 4, 24, 'dollar', 5, 6, 0.5, 5.5, 0, NULL, 'This is Sting', '1696010325023-coca-cola-glass-bottle-025cl.jpg', '2023-08-25 00:00:00', '2023-10-03 13:53:17', 1),
(40, '8846002481698', '8846002481698', 'Vital1', 2000, 36583, 42, 20, 'riel', 2000, 2000, 1000, 900, 0, NULL, '', NULL, '2023-11-01 10:58:24', '2023-11-01 18:20:28', 1),
(41, '8846002481704', '111', 'vital2', 2, 39, 47, 22, 'riel', 200, 4000, 4000, 200, 0, NULL, '', NULL, '2023-11-01 10:59:11', '2023-11-01 10:59:11', 1),
(42, '8851717030185', '8851717030185', 'Milk2', 2, -7610, 46, 24, 'riel', 50000, 60000, 5000, 4000, 0, NULL, '', NULL, '2023-11-01 17:00:29', '2023-11-01 17:00:29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `receiveproducts`
--

CREATE TABLE `receiveproducts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `purchase_price` float DEFAULT NULL,
  `unit_price` float DEFAULT NULL,
  `product_price` float DEFAULT NULL,
  `special_price` float DEFAULT NULL,
  `sub_total` float DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `updated_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `receiveproducts`
--

INSERT INTO `receiveproducts` (`id`, `product_id`, `quantity`, `purchase_price`, `unit_price`, `product_price`, `special_price`, `sub_total`, `supplier_id`, `user_id`, `created_date`, `updated_date`) VALUES
(2, 38, 12, 5, 0.5, 6, 5.5, 120, 1, 11, '2023-08-25 00:00:00', '2023-08-26 00:00:00'),
(4, NULL, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-08-25 00:00:00', '2023-08-25 00:00:00'),
(15, NULL, 5, 5, 0.5, 6.5, 5.5, 25, 1, 11, '2023-08-25 00:00:00', '2023-08-25 00:00:00'),
(16, NULL, 5, 5, 0.5, 6.5, 5.5, 25, 1, 11, '2023-08-25 00:00:00', '2023-08-25 00:00:00'),
(19, 18, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(20, 38, 12, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(21, 38, 12, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(22, 38, 12, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(23, 38, 12, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(24, 38, 11, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(25, 38, 11, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(26, 38, 11, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(27, 38, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(28, 38, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(29, 38, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(30, 38, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(31, 38, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(32, 38, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(33, 38, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(34, 38, 12, 5, 0.5, 6, 5.5, 60, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(35, 38, 21, 5, 0.5, 6, 5.5, 105, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(36, 19, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-08-26 00:00:00', '2023-08-26 00:00:00'),
(38, 20, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-09-06 00:00:00', '2023-09-06 00:00:00'),
(39, 21, 20, 5, 1, 6, 5.5, 100, 1, 1, '2023-09-06 00:00:00', '2023-09-06 00:00:00'),
(41, 23, 20, 6, 1.1, 7.7, 7.5, 120, 1, 1, '2023-09-06 00:00:00', '2023-09-06 00:00:00'),
(43, 25, 10, 5.5, 5.6, 2.3, 5.6, 55, 1, 1, '2023-09-06 00:00:00', '2023-09-06 00:00:00'),
(52, 29, 10, 10, 1, 12, 11, 100, 18, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(54, 1, 5, 5, 0.5, 6, 5.5, 25, 18, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(55, 1, 5, 5, 0.5, 6, 5.5, 25, 18, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(57, 1, 10, 5, 0.5, 6, 5.5, 50, 18, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(58, 32, 1, 1, 1, 11, 1, 1, 18, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(59, 33, 11, 11, 11, 11, 11, 121, 1, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(60, 34, 1, 1, 1, 1, 1, 1, 1, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(61, NULL, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(62, 33, 1, 11, 11, 11, 11, 11, 1, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(63, 23, 5, 9, 9, 9, 9, 45, 18, 1, '2023-09-11 00:00:00', '2023-09-11 00:00:00'),
(64, 18, 10, 5, 0.5, 6.5, 5.5, 50, 1, 1, '2023-09-19 00:00:00', '2023-09-19 00:00:00'),
(65, 36, 5, 20000, 5000, 25000, 4500, 100000, 1, 1, '2023-09-21 00:00:00', '2023-09-21 00:00:00'),
(66, 21, 8, 5, 1, 6, 5.5, 40, 18, 1, '2023-09-25 00:00:00', '2023-09-25 00:00:00'),
(67, 1, 5, 5, 0.5, 6, 5.5, 25, 1, 1, '2023-09-27 00:00:00', '2023-09-27 00:00:00'),
(68, 1, 5, 5, 0.5, 6, 5.5, 25, 18, 1, '2023-09-27 00:00:00', '2023-09-27 00:00:00'),
(69, NULL, 5, 7, 1, 10, 9, 35, 18, 1, '2023-09-27 00:00:00', '2023-09-27 00:00:00'),
(70, 1, 100, 5, 0.5, 6, 5.5, 500, 18, 1, '2023-09-27 23:11:29', '2023-09-27 23:11:29'),
(71, 1, 1, 5, 0.5, 6, 5.5, 5, 18, 1, '2023-09-27 23:11:59', '2023-09-27 23:11:59'),
(72, NULL, 32, 5, 0.5, 6.5, 5.5, 160, 19, 1, '2023-09-30 00:03:39', '2023-09-30 00:03:39'),
(73, NULL, 100, 5, 0.5, 6.5, 5.5, 500, 19, 1, '2023-09-30 00:04:31', '2023-09-30 00:04:31'),
(74, 40, 2000, 2000, 1000, 2000, 900, 4000000, 18, 1, '2023-11-01 10:58:24', '2023-11-01 10:58:24'),
(75, 41, 2, 200, 4000, 4000, 200, 400, 1, 1, '2023-11-01 10:59:11', '2023-11-01 10:59:11'),
(76, 42, 2, 50000, 5000, 60000, 4000, 100000, 18, 1, '2023-11-01 17:00:29', '2023-11-01 17:00:29');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'admin', 'Can manage all functions in the system.'),
(2, 'seller', 'Can only be sold in the system.'),
(3, 'manager', 'Can do like admin except user controller.');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `cashType` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` float NOT NULL,
  `sub_total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `invoice_id`, `product_id`, `cashType`, `quantity`, `unit_price`, `sub_total`) VALUES
(1203, 360, 1, '', 5, 6, 30),
(1204, 360, 19, '', 5, 6.5, 32.5),
(1205, 360, 25, '', 5, 2.3, 11.5),
(1206, 360, 29, '', 6, 12, 72),
(1207, 360, 30, '', 7, 11, 77),
(1208, 360, 32, '', 11, 10000, 110000),
(1209, 361, 1, '', 4, 0.5, 2),
(1210, 362, 1, '', 4, 6, 24),
(1211, 362, 18, '', 6, 6.5, 39),
(1212, 362, 19, '', 8, 6.5, 52),
(1213, 362, 20, '', 6, 6, 36),
(1214, 362, 21, '', 8, 6, 48),
(1215, 362, 23, '', 7, 9, 63),
(1216, 362, 25, '', 8, 2.3, 18.4),
(1217, 362, 29, '', 6, 12, 72),
(1218, 362, 32, '', 7, 10000, 70000),
(1219, 362, 33, '', 8, 11, 88),
(1220, 362, 34, '', 7, 1, 7),
(1221, 363, 1, '', 1, 0.5, 0.5),
(1222, 363, 21, '', 3, 1, 3),
(1223, 364, 1, '', 1, 0.5, 0.5),
(1224, 364, NULL, '', 1, 1, 1),
(1225, 365, NULL, '', 1, 1, 1),
(1226, 366, 21, '', 3, 6, 18),
(1227, 367, 1, '', 1, 6, 6),
(1228, 368, 1, '', 1, 0.5, 0.5),
(1229, 369, 1, '', 4, 0.5, 2),
(1230, 369, 18, '', 15, 0.5, 7.5),
(1231, 369, 21, '', 1, 1, 1),
(1232, 370, 1, '', 4, 0.5, 2),
(1233, 370, NULL, '', 1, 1, 1),
(1234, 371, NULL, '', 1, 1, 1),
(1235, 372, 18, '', 8, 0.5, 4),
(1236, 372, 23, '', 8, 9, 72),
(1237, 372, 30, '', 8, 11, 88),
(1238, 372, 32, '', 10, 1000, 10000),
(1239, 372, 33, '', 8, 11, 88),
(1240, 373, 1, '', 4, 0.5, 2),
(1241, 373, 18, '', 4, 0.5, 2),
(1242, 373, 19, '', 5, 0.5, 2.5),
(1243, 373, 20, '', 3, 0.5, 1.5),
(1244, 373, 21, '', 2, 1, 2),
(1245, 374, 18, '', 2, 0.5, 1),
(1246, 374, 21, '', 2, 1, 2),
(1247, 374, NULL, '', 1, 1, 1),
(1248, 375, NULL, '', 16, 1, 16),
(1249, 376, 21, '', 1, 1, 1),
(1250, 377, 19, '', 12, 0.5, 6),
(1251, 378, 1, '', 1, 0.5, 0.5),
(1252, 379, 1, '', 8, 0.5, 4),
(1253, 379, 18, '', 5, 0.5, 2.5),
(1254, 379, 23, '', 4, 9, 36),
(1255, 379, 30, '', 4, 11, 44),
(1256, 380, 1, '', 2, 0.5, 1),
(1257, 380, 18, '', 3, 0.5, 1.5),
(1258, 380, 21, '', 3, 1, 3),
(1259, 381, 1, '', 4, 0.5, 2),
(1260, 381, 21, '', 5, 1, 5),
(1261, 382, 18, '', 19, 6.5, 123.5),
(1262, 382, 23, '', 2, 9, 18),
(1263, 382, 25, '', 4, 2.3, 9.2),
(1264, 382, 30, '', 3, 11, 33),
(1265, 383, 1, '', 3, 5.5, 16.5),
(1266, 383, 18, '', 4, 5.5, 22),
(1267, 383, 21, '', 5, 5.5, 27.5),
(1268, 383, 25, '', 4, 5.6, 22.4),
(1269, 383, 33, '', 6, 11, 66),
(1270, 383, 32, '', 4, 9000, 36000),
(1271, 384, 1, '', 3, 6, 18),
(1272, 384, 19, '', 3, 6.5, 19.5),
(1273, 385, 19, '', 4, 0.5, 2),
(1274, 385, 18, '', 4, 0.5, 2),
(1275, 386, 1, '', 2, 0.5, 1),
(1276, 386, 36, '', 3, 5000, 15000),
(1277, 387, 1, '', 1, 0.5, 0.5),
(1278, 387, 18, '', 1, 0.5, 0.5),
(1279, 387, 19, '', 1, 0.5, 0.5),
(1280, 387, 20, '', 1, 0.5, 0.5),
(1281, 387, 21, '', 1, 1, 1),
(1282, 387, 23, '', 3, 9, 27),
(1283, 388, 1, '', 4, 0.5, 2),
(1284, 388, 20, '', 2, 0.5, 1),
(1285, 388, 21, '', 9, 1, 9),
(1286, 388, 32, '', 3, 1000, 3000),
(1287, 389, 40, '', 6, 2000, 12000),
(1288, 389, 41, '', 4, 4000, 16000),
(1289, 390, 41, '', 1, 4000, 4000),
(1290, 390, 40, '', 1, 2000, 2000),
(1291, 391, 40, '', 5, 2000, 10000),
(1292, 391, 42, '', 8, 60000, 480000),
(1293, 392, 42, '', 4, 60000, 240000),
(1294, 393, 42, '', 1, 60000, 60000),
(1295, 394, 42, '', 5, 60000, 300000),
(1296, 395, 42, '', 5, 60000, 300000),
(1297, 396, 42, '', 5, 60000, 300000),
(1298, 397, 42, '', 88, 60000, 5280000),
(1299, 398, 42, '', 88, 60000, 5280000),
(1300, 398, 40, '', 99, 2000, 198000),
(1301, 399, 42, '', 1, 60000, 60000),
(1302, 399, 40, '', 55, 2000, 110000),
(1303, 400, 1, '', 3, 6, 18),
(1304, 400, 18, '', 3, 6.5, 19.5),
(1305, 400, 19, '', 4, 6.5, 26),
(1306, 400, 20, '', 66, 6, 396),
(1307, 400, 42, '', 55, 60000, 3300000),
(1308, 400, 40, '', 6, 2000, 12000),
(1309, 401, 1, '', 4, 6, 24),
(1310, 402, 1, '', 3, 6, 18),
(1311, 402, 20, '', 3, 6, 18),
(1312, 402, 25, '', 4, 2.3, 9.2),
(1313, 402, 29, '', 3, 12, 36),
(1314, 402, 32, '', 5, 10000, 50000),
(1315, 403, 18, '', 2, 6.5, 13),
(1316, 403, 23, '', 2, 9, 18),
(1317, 404, 18, '', 7, 6.5, 45.5),
(1318, 404, 19, '', 3, 6.5, 19.5),
(1319, 404, 25, '', 2, 2.3, 4.6),
(1320, 405, 1, '', 2, 6, 12),
(1321, 405, 18, '', 3, 6.5, 19.5),
(1322, 405, 19, '', 2, 6.5, 13),
(1323, 406, 1, 'dollar', 3, 6, 18),
(1324, 406, 23, 'riel', 2, 9, 18),
(1325, 406, 25, 'dollar', 2, 2.3, 4.6),
(1326, 407, 1, 'dollar', 2, 6, 12),
(1327, 407, 18, 'dollar', 3, 6.5, 19.5),
(1328, 407, 19, 'dollar', 2, 6.5, 13),
(1329, 407, 20, 'dollar', 2, 6, 12),
(1330, 407, 32, 'riel', 2, 10000, 20000),
(1331, 407, 42, 'riel', 5, 60000, 300000),
(1332, 408, 42, 'riel', 55, 4000, 220000),
(1333, 408, 18, 'dollar', 3, 5.5, 16.5),
(1334, 408, 19, 'dollar', 3, 5.5, 16.5),
(1335, 409, 42, 'riel', 55, 5000, 275000),
(1336, 410, 40, 'riel', 5, 1000, 5000),
(1337, 410, 42, 'riel', 11, 5000, 55000),
(1338, 411, 42, 'riel', 4, 60000, 240000),
(1339, 411, 40, 'riel', 10, 2000, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `code`, `name`, `contact`, `address`, `email`, `image`, `created_date`, `updated_date`) VALUES
(1, '12345abc', 'Veasna', '098579452', 'Phnom Penh', 'veasna@gmail.com', '1694192834202-photo_2021-12-18_15-29-58.jpg', '2023-08-25 00:00:00', '2023-09-08 00:00:00'),
(18, '123456cba', 'Phearith', '069265958', 'Siem Reap', 'phearith@gmail.com', '1694192647039-Blur01.jpg', '2023-09-04 00:00:00', '2023-09-08 00:00:00'),
(19, '12345jhgf', 'Thida', '09568690', 'PP', 'thida@gmail.com', '1695831718078-Action01.JPG', '2023-09-27 23:21:58', '2023-09-27 23:21:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `contact`, `role_id`, `image`, `created_date`, `updated_date`, `is_active`) VALUES
(1, 'phearith@gmail.com', '$2b$10$nHeQX6Es9sGexQsTDfOouOWDyTkCV/agfYR.SyGgds980lHC5Z8bG', 'Phearith', '069265958', 1, '1693569705039-after.png', '2023-08-24 00:00:00', '2023-10-09 14:02:33', 1),
(11, 'dara@gmail.com', '$2b$10$YHZsE8lq4V5aCCSwiZit9.zPO.z0E0Uo4CBHVyEvZPF4LVST.9LOy', 'Dara', '069265958', 3, '1693582006047-after.png', '2023-08-24 00:00:00', '2023-09-30 13:48:30', 0),
(12, 'channa@gmail.com', '$2b$10$pg.l1K164raK/nL3OtU3v.JZwhXkzKm/D.KtgCJ1km3kXJFF2S9bO', 'Channa', '069265958', 2, '1693582211568-after.png', '2023-08-24 00:00:00', '2023-09-30 13:48:39', 0),
(13, 'heng@gmail.com', '$2b$10$t.s3C6BUhx0CIqjQ31Jm0e6ZAhnN1PxzGvBC8bdVqH//GWa5kEiw2', 'Heng', '097734523', 1, NULL, '2023-08-24 00:00:00', '2023-10-04 16:16:18', 0),
(14, 'thida@gmail.com', '$2b$10$WsbZFkxH2CSa6dW90HfxluTSggZEtnvqS/4.ZEXooALZZkgRkb07i', 'Thida', '09999999', 3, '1693582339299-Action01.JPG', '2023-08-24 00:00:00', '2023-09-01 00:00:00', 0),
(15, 'layla@gmail.com', '$2b$10$Rrb/Ykc2xWhFBZN6EpvyheexNVGYvc/hb/5KVp4hFnmzWPPAyNEm6', 'Layla', '069265958', 2, '', '2023-08-26 00:00:00', '2023-08-26 00:00:00', 0),
(16, 'miya@gmail.com', '$2b$10$TNycCuPYqF1htok2juWYTezTus/5Z06/4Wo.ZoYN3ZRi2czMHP.vK', 'Miya', '069265958', 3, '', '2023-08-30 00:00:00', '2023-08-30 00:00:00', 0),
(17, 'alucar@gmail.com', '$2b$10$gstzu4rPLB44/yDKTgJD2u2lygXkbZu8oCjLwcWyvH9mLmKNb0qF.', 'Alucard', '069265958', 3, '', '2023-08-30 00:00:00', '2023-08-30 00:00:00', 0),
(18, 'aldous@gmail.com', '$2b$10$i6kz0524ZX8C8pGaxDGEKOMbTw/ocdqxK1.U82F59Fyp3gkPO56d.', 'Aldous', '069265958', 3, '1693583013641-for teacher 1.jpg', '2023-08-30 00:00:00', '2023-09-01 00:00:00', 0),
(114, 'nana@gmail.com', '$2b$10$oqg7IjjmMybFCwSkX57rmusiUqBWN3EngmNtTDJpuwbUcVeqEYEkW', 'Nana', '09283944', 2, '1694187586536-Action01.JPG', '2023-09-08 00:00:00', '2023-09-27 00:00:00', 0),
(116, 'edura@gmail.com', '$2b$10$eSdE5R6d.TfcKS0T9iHf1uOl6wqX7yqRZsoyUZE9hq9Qk4tJS/Lb2', 'Edura', '096968599', 3, '1695799328599-photo_2021-12-18_15-29-58.jpg', '2023-09-27 00:00:00', '2023-09-29 01:51:32', 0),
(117, 'dsfdfdsf', '$2b$10$wuJeWKLoLyi7sXgZSU41Xelz/oyZByYsVzPTdfnraOhOvOwcN5UTO', 'dsfdsfdsf', 'dsfdsfsg', 2, NULL, '2023-09-29 00:29:12', '2023-09-29 01:51:27', 0),
(118, 'dgfdgfdg', '$2b$10$sceN6ZoDWsGUq5VxexsG1.2hdho.WWeuigTebThvIRMeuz0jSSLpW', 'fgdgfdg', 'fdgfdgk', 2, NULL, '2023-09-29 01:35:32', '2023-09-29 01:51:14', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exchangerate`
--
ALTER TABLE `exchangerate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `payment_type_id` (`payment_type_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `paymenttypes`
--
ALTER TABLE `paymenttypes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `box_code` (`box_code`),
  ADD UNIQUE KEY `unit_code` (`unit_code`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `receiveproducts`
--
ALTER TABLE `receiveproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`invoice_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `exchangerate`
--
ALTER TABLE `exchangerate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=412;

--
-- AUTO_INCREMENT for table `paymenttypes`
--
ALTER TABLE `paymenttypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `receiveproducts`
--
ALTER TABLE `receiveproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1340;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`payment_type_id`) REFERENCES `paymenttypes` (`id`),
  ADD CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `receiveproducts`
--
ALTER TABLE `receiveproducts`
  ADD CONSTRAINT `receiveproducts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `receiveproducts_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `receiveproducts_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_3` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
