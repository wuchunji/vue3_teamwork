/*
 Navicat Premium Data Transfer

 Source Server         : blog
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : teamwork

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 27/03/2022 16:24:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for histroyTable
-- ----------------------------
DROP TABLE IF EXISTS `histroyTable`;
CREATE TABLE `histroyTable` (
  `id` varchar(255) DEFAULT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `container` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for paperTable
-- ----------------------------
DROP TABLE IF EXISTS `paperTable`;
CREATE TABLE `paperTable` (
  `paperid` int NOT NULL,
  `members` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `brief` varchar(255) DEFAULT NULL,
  `words` varchar(255) DEFAULT NULL,
  `milepost` varchar(255) DEFAULT NULL,
  `histroy` varchar(255) DEFAULT NULL,
  `container` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for userTable
-- ----------------------------
DROP TABLE IF EXISTS `userTable`;
CREATE TABLE `userTable` (
  `userid` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `paperids` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
