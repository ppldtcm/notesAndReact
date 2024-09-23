-- Adminer 4.8.1 MySQL 10.4.32-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `notes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `notes`;

DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `id_note` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_note`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `note` (`id_note`, `title`, `body`, `created_at`, `id_user`) VALUES
(76,	'новая заметка',	'новая новая заметка',	'2024-09-20 08:23:39',	1),
(77,	'новая заметка',	'новая новая заметка',	'2024-09-20 08:23:40',	1),
(78,	'новая заметка',	'новая новая заметка',	'2024-09-20 08:23:43',	1),
(79,	'новая заметка',	'новая новая заметка',	'2024-09-20 08:23:44',	1),
(80,	'новая заметка',	'новая новая заметка',	'2024-09-20 08:23:44',	1),
(84,	'новая заметка',	'новая новая заметка',	'2024-09-20 08:40:24',	1),
(85,	'новая заметка',	'новая новая заметка',	'2024-09-20 08:40:28',	2),
(87,	'новая заметка',	'новая новая заметка',	'2024-09-20 08:40:29',	2),
(88,	'новая заметка',	'новая новая заметка',	'2024-09-20 11:43:11',	1),
(89,	'новая заметка',	'новая новая заметка',	'2024-09-20 11:43:13',	1),
(90,	'новая заметка',	'новая новая заметка',	'2024-09-20 11:44:12',	1),
(91,	'новая заметка',	'новая новая заметка',	'2024-09-20 11:44:26',	1),
(92,	'новая заметка',	'новая новая заметка админа',	'2024-09-20 13:20:56',	1),
(93,	'новая заметка',	'новая новая заметка',	'2024-09-20 11:44:33',	2),
(94,	'новая заметка2',	'новая новая заметка',	'2024-09-20 11:44:39',	2),
(95,	'новая заметка2',	'новая новая заметка',	'2024-09-20 11:44:40',	2),
(96,	'новая заметка',	'новая новая заметка',	'2024-09-20 13:16:12',	2),
(97,	'новая заметка',	'новая новая заметка',	'2024-09-20 13:16:12',	2),
(98,	'новая заметка',	'новая новая заметка',	'2024-09-20 13:16:13',	2),
(99,	'новая заметка',	'новая новая заметка пользователя',	'2024-09-20 13:20:43',	2),
(101,	'новая заметка',	'новая новая заметка',	'2024-09-20 13:49:56',	0);

DROP TABLE IF EXISTS `userNote`;
CREATE TABLE `userNote` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `userNote` (`id_user`, `name`, `password`) VALUES
(1,	'admin',	'admin'),
(2,	'user',	'user'),
(102,	'user1',	'user1');

-- 2024-09-23 07:23:55
