-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for fitness
CREATE DATABASE IF NOT EXISTS `fitness` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fitness`;

-- Dumping structure for table fitness.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uq_admin_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fitness.admin: ~0 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`admin_id`, `username`, `password_hash`) VALUES
	(1, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table fitness.article
CREATE TABLE IF NOT EXISTS `article` (
  `article_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '0',
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image_url` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fitness.article: ~4 rows (approximately)
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`article_id`, `title`, `description`, `image_url`) VALUES
	(1, 'Wod 2002132', '21-15-9 Burpee over bar, bar mucle-ups', '0'),
	(2, 'What food shoud you eat', 'You should eat as much healty food as you can, and some pizza beside.', '0'),
	(3, 'Novi naslov', 'Jako zanimljiva deskripcija', '0'),
	(19, 'neki titl', 'desdjsadjasdjsajdsaj', '0'),
	(40, 'Novi naslov', 'Jako zanimljiva deskripcija', '0');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

-- Dumping structure for table fitness.photo
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `article_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  KEY `fk_photo_article_id` (`article_id`),
  CONSTRAINT `fk_photo_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fitness.photo: ~3 rows (approximately)
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `image_path`, `article_id`) VALUES
	(7, '2020916-3770233938-john_wick_poster.jpg', 1),
	(8, '2020916-6452288234-rio-french-poster.jpg', 1),
	(9, '2020916-4748744878-rio-french-poster.jpg', 1),
	(10, '2020916-9414763561-rio-french-poster.jpg', 1);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

-- Dumping structure for table fitness.stats
CREATE TABLE IF NOT EXISTS `stats` (
  `stats_id` int unsigned NOT NULL AUTO_INCREMENT,
  `bench_press` int NOT NULL DEFAULT '0',
  `back_squat` int NOT NULL DEFAULT '0',
  `front_squat` int NOT NULL DEFAULT '0',
  `overhead_squat` int NOT NULL DEFAULT '0',
  `deadlift` int NOT NULL DEFAULT '0',
  `push_press` int NOT NULL DEFAULT '0',
  `strict_press` int NOT NULL DEFAULT '0',
  `clean_and_jerk` int NOT NULL DEFAULT '0',
  `snatch` int NOT NULL DEFAULT '0',
  `user_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`stats_id`),
  KEY `fk_user_user_id` (`user_id`),
  CONSTRAINT `fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fitness.stats: ~0 rows (approximately)
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;
INSERT INTO `stats` (`stats_id`, `bench_press`, `back_squat`, `front_squat`, `overhead_squat`, `deadlift`, `push_press`, `strict_press`, `clean_and_jerk`, `snatch`, `user_id`) VALUES
	(1, 100, 150, 130, 80, 200, 80, 60, 110, 90, 1);
/*!40000 ALTER TABLE `stats` ENABLE KEYS */;

-- Dumping structure for table fitness.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `lastname` varchar(50) NOT NULL DEFAULT '0',
  `age` int DEFAULT '0',
  `height` int NOT NULL DEFAULT '0',
  `weight` int NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fitness.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `name`, `lastname`, `age`, `height`, `weight`, `email`, `password_hash`) VALUES
	(1, 'User', 'LastUser', 21, 180, 80, 'user@user.com', 'B14361404C078FFD549C03DB443C3FEDE2F3E534D73F78F77301ED97D4A436A9FD9DB05EE8B325C0AD36438B43FEC8510C204FC1C1EDB21D0941C00E9E2C1CE2'),
	(2, 'Test', '0', 23, 177, 90, 'test2@gmail.com', 'EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF'),
	(3, 'Mathew', 'Fraser', 28, 170, 80, 'matf@user.com', 'B14361404C078FFD549C03DB443C3FEDE2F3E534D73F78F77301ED97D4A436A9FD9DB05EE8B325C0AD36438B43FEC8510C204FC1C1EDB21D0941C00E9E2C1CE2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table fitness.workout
CREATE TABLE IF NOT EXISTS `workout` (
  `workout_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '0',
  `duration` int NOT NULL DEFAULT '0',
  `wod` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `video_link` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`workout_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fitness.workout: ~1 rows (approximately)
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
INSERT INTO `workout` (`workout_id`, `name`, `duration`, `wod`, `video_link`) VALUES
	(1, 'WOD 202102', 20, '21-15-9 strict chest to bar, thrusters, A.E.S 50du', '<iframe width="560" height="315" src="https://www.youtube.com/embed/DUnZ2fsiiFo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
