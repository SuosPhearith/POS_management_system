-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2023 at 08:24 AM
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
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `updated_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `description`, `sort_order`, `image`, `created_date`, `updated_date`) VALUES
(4, 'Energy drink', NULL, 'About energy drink.', 4, '', '2023-08-24', '2023-09-08'),
(16, 'ចាន', NULL, 'about jan', 2, NULL, '2023-09-04', '2023-09-08'),
(24, 'ចានថ្ម', NULL, 'about jan thor', 6, NULL, '2023-09-04', '2023-09-08'),
(31, 'បារី', NULL, 'about cegarrat', 3, NULL, '2023-09-04', '2023-09-08'),
(42, 'Cup', NULL, 'About Cup', 5, NULL, '2023-09-06', '2023-09-08'),
(44, 'Beer', NULL, 'About beer', 7, NULL, '2023-09-08', '2023-09-11'),
(46, 'Drink', NULL, '', 8, NULL, '2023-09-17', '2023-09-17');

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
(1, 'Phearith', NULL, NULL, NULL),
(3, 'general', NULL, NULL, NULL);

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
(1, 1, 4000);

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
  `created_date` date DEFAULT NULL,
  `updated_date` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Thank you!'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `customer_id`, `saleType`, `payment_type_id`, `products_khmer_currency`, `products_USD_currency`, `total_amount_USD`, `total_amount_khmer`, `debt`, `deposit`, `created_date`, `updated_date`, `user_id`, `description`) VALUES
(11, 3, 'unit', 2, 33300, 5, 13.122, 53800, 0, 13.122, '2023-09-07', '2023-09-18', 1, 'Thank you!'),
(12, 1, 'unit', 1, 33300, 5, 13.122, 53800, 0, 13.122, '2023-09-08', '2023-09-18', 1, 'Thank you!'),
(13, 1, 'unit', 3, 33300, 5, 13.122, 53800, 0, 13.122, '2023-09-17', '2023-09-18', 1, 'Thank you my man!'),
(14, 1, 'unit', 1, 33300, 5, 13.325, 53300, 0, 13.325, '2023-09-18', '2023-09-18', 1, 'Thank you so much!'),
(15, 3, 'unit', 1, 133200, 5, 38.3, 153200, 35.3, 3, '2023-09-18', '2023-09-18', 1, 'Thank you so much!'),
(16, 3, 'unit', 1, 133200, 5, 38.3, 153200, 0, 38.3, '2023-09-18', '2023-09-18', 1, 'Thank you so much!'),
(17, 3, 'unit', 1, 166500, 5, 46.625, 186500, 0, 46.625, '2023-09-18', '2023-09-18', 1, 'Thank you so much!'),
(18, 3, 'unit', 1, 166500, 5, 46.625, 186500, 39.625, 7, '2023-09-18', '2023-09-18', 1, 'Thank you so much!');

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
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `updated_date` date NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `box_code`, `unit_code`, `name`, `order_quantity`, `quantity`, `category_id`, `unit_quantity`, `cashType`, `purchase_price`, `product_price`, `unit_price`, `special_price`, `discount_per`, `reorder_level`, `description`, `image`, `created_date`, `updated_date`, `user_id`) VALUES
(1, '1234', '123', 'Sting', 20, 500, 4, 24, 'dollar', 5, 6, 0.5, 5.5, 0, NULL, 'This is Sting', '', '2023-08-25', '2023-09-11', 1),
(2, '1234', '123', 'Cocacola', 20, 480, 4, 24, 'dollar', 5, 6, 0.5, 5.5, 0, NULL, 'This is Sting', '', '2023-08-25', '2023-09-11', 1),
(4, '1234', '123', 'Barkas', 30, 720, 4, 24, 'dollar', 5, 6.5, 0.5, 5.5, 0, NULL, 'This is Sting', '', '2023-08-25', '2023-09-11', 1),
(18, '1234', '123', 'Prime', 20, 480, 4, 24, 'dollar', 5, 6.5, 0.5, 5.5, 0, NULL, 'This is prime', '', '2023-08-26', '2023-09-11', 1),
(19, '1234', '123', 'Mountan', 20, 480, 4, 24, 'dollar', 5, 6.5, 0.5, 5.5, 0, NULL, 'This is prime', '', '2023-08-26', '2023-09-11', 1),
(20, '1234', '123', 'test rollback!4', 20, 480, 4, 24, '0', 5, 6, 0.5, 5.5, 0, 0, 'This is Sting', NULL, '2023-09-06', '2023-09-06', 11),
(21, 'hhhh', 'hhhh', 'hhhh', 20, 480, 42, 24, 'dollar', 5, 6, 1, 5.5, 3, NULL, 'about hhh', '1693986228575-Action01.JPG', '2023-09-06', '2023-09-11', 1),
(23, '1234', '1234', 'Apple', 25, 600, 31, 24, 'riel', 9, 9, 9, 9, 9, NULL, 'I love you', '1694013343265-Action01.JPG', '2023-09-06', '2023-09-11', 1),
(25, '123456', '123456', 'Boy', 10, 60, 24, 6, 'dollar', 5.5, 2.3, 5.6, 5.6, 20, NULL, '', NULL, '2023-09-06', '2023-09-11', 1),
(29, '123', '123', 'Drink', 10, 240, 44, 24, 'dollar', 10, 12, 1, 11, 0, NULL, '', '1694408765460-Action01.JPG', '2023-09-11', '2023-09-11', 1),
(30, '', '', 'hello', 11, 121, 16, 11, 'dollar', 1, 11, 11, 11, 11, NULL, '', '1694408881193-Blur01.jpg', '2023-09-11', '2023-09-11', 1),
(32, '123', '123', 'Milk', 1, 11, 42, 11, 'riel', 1, 11, 1, 1, 0, NULL, '', NULL, '2023-09-11', '2023-09-11', 1),
(33, '', '', 'test', 12, 132, 44, 11, 'dollar', 11, 11, 11, 11, 0, NULL, '', NULL, '2023-09-11', '2023-09-11', 1),
(34, '', '', '11', 1, 1, 42, 1, 'dollar', 1, 1, 1, 1, 0, NULL, '', NULL, '2023-09-11', '2023-09-11', 1),
(35, '1234', '123', 'test rollback!9', 20, 480, 4, 24, 'riel', 5, 6, 0.5, 5.5, 0, 0, 'This is Sting', NULL, '2023-09-11', '2023-09-11', 11);

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
  `created_date` date DEFAULT current_timestamp(),
  `updated_date` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `receiveproducts`
--

INSERT INTO `receiveproducts` (`id`, `product_id`, `quantity`, `purchase_price`, `unit_price`, `product_price`, `special_price`, `sub_total`, `supplier_id`, `user_id`, `created_date`, `updated_date`) VALUES
(2, 2, 12, 5, 0.5, 6, 5.5, 120, 1, 11, '2023-08-25', '2023-08-26'),
(4, 4, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-08-25', '2023-08-25'),
(15, 4, 5, 5, 0.5, 6.5, 5.5, 25, 1, 11, '2023-08-25', '2023-08-25'),
(16, 4, 5, 5, 0.5, 6.5, 5.5, 25, 1, 11, '2023-08-25', '2023-08-25'),
(19, 18, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-08-26', '2023-08-26'),
(20, 2, 12, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(21, 2, 12, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(22, 2, 12, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(23, 2, 12, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(24, 2, 11, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(25, 2, 11, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(26, 2, 11, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(27, 2, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(28, 2, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(29, 2, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(30, 2, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(31, 2, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(32, 2, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(33, 2, 21, 5, 0.5, 6, 5.5, NULL, 1, 11, '2023-08-26', '2023-08-26'),
(34, 2, 12, 5, 0.5, 6, 5.5, 60, 1, 11, '2023-08-26', '2023-08-26'),
(35, 2, 21, 5, 0.5, 6, 5.5, 105, 1, 11, '2023-08-26', '2023-08-26'),
(36, 19, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-08-26', '2023-08-26'),
(38, 20, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-09-06', '2023-09-06'),
(39, 21, 20, 5, 1, 6, 5.5, 100, 1, 1, '2023-09-06', '2023-09-06'),
(41, 23, 20, 6, 1.1, 7.7, 7.5, 120, 1, 1, '2023-09-06', '2023-09-06'),
(43, 25, 10, 5.5, 5.6, 2.3, 5.6, 55, 1, 1, '2023-09-06', '2023-09-06'),
(52, 29, 10, 10, 1, 12, 11, 100, 18, 1, '2023-09-11', '2023-09-11'),
(54, 1, 5, 5, 0.5, 6, 5.5, 25, 18, 1, '2023-09-11', '2023-09-11'),
(55, 1, 5, 5, 0.5, 6, 5.5, 25, 18, 1, '2023-09-11', '2023-09-11'),
(57, 1, 10, 5, 0.5, 6, 5.5, 50, 18, 1, '2023-09-11', '2023-09-11'),
(58, 32, 1, 1, 1, 11, 1, 1, 18, 1, '2023-09-11', '2023-09-11'),
(59, 33, 11, 11, 11, 11, 11, 121, 1, 1, '2023-09-11', '2023-09-11'),
(60, 34, 1, 1, 1, 1, 1, 1, 1, 1, '2023-09-11', '2023-09-11'),
(61, 35, 20, 5, 0.5, 6, 5.5, 100, 1, 11, '2023-09-11', '2023-09-11'),
(62, 33, 1, 11, 11, 11, 11, 11, 1, 1, '2023-09-11', '2023-09-11'),
(63, 23, 5, 9, 9, 9, 9, 45, 18, 1, '2023-09-11', '2023-09-11');

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
(2, 'saler', 'Can only be sold in the system.'),
(3, 'manager', 'Can do like admin except user controller.');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` float NOT NULL,
  `sub_total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `invoice_id`, `product_id`, `quantity`, `unit_price`, `sub_total`) VALUES
(22, 11, 2, 1, 1, 1),
(23, 11, 4, 2, 2, 4),
(24, 11, 1, 1, 33300, 33300),
(25, 12, 2, 1, 1, 1),
(26, 12, 4, 2, 2, 4),
(27, 12, 1, 1, 33300, 33300),
(28, 13, 2, 1, 1, 1),
(29, 13, 4, 2, 2, 4),
(30, 13, 1, 1, 33300, 33300),
(31, 14, 2, 1, 1, 1),
(32, 14, 4, 2, 2, 4),
(33, 14, 1, 1, 33300, 33300),
(34, 15, 2, 1, 1, 1),
(35, 15, 4, 2, 2, 4),
(36, 15, 1, 1, 33300, 33300),
(37, 15, 25, 1, 33300, 33300),
(38, 15, 29, 1, 33300, 33300),
(39, 15, 30, 1, 33300, 33300),
(40, 16, 2, 1, 1, 1),
(41, 16, 4, 2, 2, 4),
(42, 16, 1, 1, 33300, 33300),
(43, 16, 25, 1, 33300, 33300),
(44, 16, 29, 1, 33300, 33300),
(45, 16, 30, 1, 33300, 33300),
(46, 17, 2, 1, 1, 1),
(47, 17, 4, 2, 2, 4),
(48, 17, 1, 1, 33300, 33300),
(49, 17, 25, 1, 33300, 33300),
(50, 17, 29, 1, 33300, 33300),
(51, 17, 30, 1, 33300, 33300),
(52, 17, 34, 1, 33300, 33300),
(53, 18, 2, 1, 1, 1),
(54, 18, 4, 2, 2, 4),
(55, 18, 1, 1, 33300, 33300),
(56, 18, 25, 1, 33300, 33300),
(57, 18, 29, 1, 33300, 33300),
(58, 18, 30, 1, 33300, 33300),
(59, 18, 32, 1, 33300, 33300);

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
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `updated_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `code`, `name`, `contact`, `address`, `email`, `image`, `created_date`, `updated_date`) VALUES
(1, '12345abc', 'Veasna', '098579452', 'Phnom Penh', 'veasna@gmail.com', '1694192834202-photo_2021-12-18_15-29-58.jpg', '2023-08-25', '2023-09-08'),
(18, '123456cba', 'Phearith', '069265958', 'Siem Reap', 'phearith@gmail.com', '1694192647039-Blur01.jpg', '2023-09-04', '2023-09-08');

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
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `updated_date` date NOT NULL DEFAULT current_timestamp(),
  `is_active` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `contact`, `role_id`, `image`, `created_date`, `updated_date`, `is_active`) VALUES
(1, 'phearith@gmail.com', '$2b$10$nHeQX6Es9sGexQsTDfOouOWDyTkCV/agfYR.SyGgds980lHC5Z8bG', 'Phearith', '069265958', 1, '1693569705039-after.png', '2023-08-24', '2023-09-08', 1),
(11, 'dara@gmail.com', '$2b$10$bW5mbCC..xT/w3WqZH1o4u9.Fj0Ay/YWteWCappmm7eCLDs3IS23a', 'Dara', '069265958', 3, '1693582006047-after.png', '2023-08-24', '2023-09-02', 0),
(12, 'channa@gmail.com', '$2b$10$JujFco9GGhm9QtRjkqNUm.o/uJSp1r.IpSEivFhqM/7RQyZiwG2e6', 'Channa', '069265958', 1, '1693582211568-after.png', '2023-08-24', '2023-09-03', 0),
(13, 'heng@gmail.com', '$2b$10$IORBaAyAxTFFxeR3Db.yAOMShScZ0/CmWHX/aTvH5xI5ItFIJUtPO', 'Heng', '097734523', 3, NULL, '2023-08-24', '2023-09-01', 0),
(14, 'thida@gmail.com', '$2b$10$WsbZFkxH2CSa6dW90HfxluTSggZEtnvqS/4.ZEXooALZZkgRkb07i', 'Thida', '09999999', 3, '1693582339299-Action01.JPG', '2023-08-24', '2023-09-01', 0),
(15, 'layla@gmail.com', '$2b$10$Rrb/Ykc2xWhFBZN6EpvyheexNVGYvc/hb/5KVp4hFnmzWPPAyNEm6', 'Layla', '069265958', 2, '', '2023-08-26', '2023-08-26', 0),
(16, 'miya@gmail.com', '$2b$10$TNycCuPYqF1htok2juWYTezTus/5Z06/4Wo.ZoYN3ZRi2czMHP.vK', 'Miya', '069265958', 3, '', '2023-08-30', '2023-08-30', 0),
(17, 'alucar@gmail.com', '$2b$10$gstzu4rPLB44/yDKTgJD2u2lygXkbZu8oCjLwcWyvH9mLmKNb0qF.', 'Alucard', '069265958', 3, '', '2023-08-30', '2023-08-30', 0),
(18, 'aldous@gmail.com', '$2b$10$i6kz0524ZX8C8pGaxDGEKOMbTw/ocdqxK1.U82F59Fyp3gkPO56d.', 'Aldous', '069265958', 3, '1693583013641-for teacher 1.jpg', '2023-08-30', '2023-09-01', 0),
(114, 'love1@gmail.com', '$2b$10$oqg7IjjmMybFCwSkX57rmusiUqBWN3EngmNtTDJpuwbUcVeqEYEkW', 'Love', '09283944', 1, '1694187586536-Action01.JPG', '2023-09-08', '2023-09-08', 0),
(115, '069265958', '$2b$10$cqVVnIom.FML2flFKOrr9eEW7sXEWvyqkTo49SjlrMMUaK1cTbKGm', 'Neak', '098765', 1, NULL, '2023-09-11', '2023-09-11', 0);

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
  ADD KEY `product_id` (`product_id`),
  ADD KEY `invoice_id` (`invoice_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `exchangerate`
--
ALTER TABLE `exchangerate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `paymenttypes`
--
ALTER TABLE `paymenttypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `receiveproducts`
--
ALTER TABLE `receiveproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

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
  ADD CONSTRAINT `receiveproducts_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `sales_ibfk_3` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
