-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 20, 2025 at 10:38 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `max_participants` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `description`, `max_participants`) VALUES
(2, 'daaa', 'tttt', 2);

-- --------------------------------------------------------

--
-- Table structure for table `class_bookings`
--

DROP TABLE IF EXISTS `class_bookings`;
CREATE TABLE IF NOT EXISTS `class_bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `booking_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `class_id` (`class_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `class_bookings`
--

INSERT INTO `class_bookings` (`id`, `user_id`, `class_id`, `booking_date`) VALUES
(1, 1, 2, '2025-06-15'),
(2, 2, 1, '2025-06-16'),
(3, 3, 4, '2025-06-17'),
(4, 4, 5, '2025-06-18'),
(5, 5, 3, '2025-06-19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `role` enum('member','trainer','admin') DEFAULT 'member',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `full_name`, `role`) VALUES
(1, 'johndoe', 'hash1', 'john@example.com', 'John Doe', 'member'),
(2, 'jane_smith', 'hashedpass456', 'jane@example.com', 'Jane Smith', 'trainer'),
(3, 'admin_user', 'adminhashed', 'admin@example.com', 'Site Admin', 'admin'),
(4, 'michael_b', 'mikepass', 'mikeb@example.com', 'Michael Brown', 'member'),
(5, 'sara_k', 'sarapass', 'sara@example.com', 'Sara Khalil', 'member'),
(6, 'sss', 'QAZwsx1', 'eliasthedab17@gmail.com', 'eliasdabbagh', 'member'),
(7, 'ses', 'QAZwsx2', 'eliasthedab17@gmail.com', 'eliasdabbagh', 'trainer'),
(8, 'asd', 'QAZwsx3', 'eliasthedab17@gmail.com', 'sdasdasd', 'member'),
(9, 'dfd', 'QAZwsx1', 'eliasthedab17@gmail.com', 'dfd1', 'member');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
