-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 14, 2021 at 12:26 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `compound_id` varchar(255) NOT NULL,
  `provider_type` varchar(255) NOT NULL,
  `provider_id` varchar(255) NOT NULL,
  `provider_account_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `access_token_expires` timestamp(6) NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `compound_id`, `provider_type`, `provider_id`, `provider_account_id`, `user_id`, `refresh_token`, `access_token`, `access_token_expires`, `created_at`, `updated_at`) VALUES
(1, 'ad604aab9bc2c81be39f7a79013ad22f601877e3bca766e31e60bc33a5d67445', 'oauth', 'facebook', '4520310414664462', 28, NULL, 'EAAPrlRQbkdgBAGrkrcEPsW4DXvaZBtDvtgNok9hU0ec4sbrsHHKuMZA24TETCZCP8f4aOIwzx8RztYZC5JzHSNpWsrabeht9Xuo6ZAS5HP6P3abV42qYIIbOgnopiIbPZABfMNZAFY5KaYHt5tPP37RI1bonDlcTekiG5TM4dugFwZDZD', NULL, '2021-04-18 16:35:42.664533', '2021-04-18 16:35:42.664533');

-- --------------------------------------------------------

--
-- Table structure for table `Albums`
--

CREATE TABLE `Albums` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Filters`
--

CREATE TABLE `Filters` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `conditions` varchar(255) DEFAULT NULL,
  `model_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Filters`
--

INSERT INTO `Filters` (`id`, `title`, `conditions`, `model_name`, `status`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Published', '{\"status\":\"P\"}', 'ProductBase', 'A', 1, '2021-08-07 22:56:54', '2021-08-07 22:56:54');

-- --------------------------------------------------------

--
-- Table structure for table `Images`
--

CREATE TABLE `Images` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `productBaseId` int(11) DEFAULT NULL,
  `productBaseImageId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `MetaFields`
--

CREATE TABLE `MetaFields` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `visible` tinyint(1) DEFAULT NULL,
  `entityId` int(11) DEFAULT NULL,
  `entityType` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `MetaValues`
--

CREATE TABLE `MetaValues` (
  `id` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `fieldId` int(11) DEFAULT NULL,
  `entityId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `visible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Permissions`
--

CREATE TABLE `Permissions` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `featureName` varchar(255) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `refId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Permissions`
--

INSERT INTO `Permissions` (`id`, `type`, `featureName`, `code`, `status`, `refId`, `createdAt`, `updatedAt`) VALUES
(1, 'groups', 'Users', 10, 'A', 1, '2021-06-04 16:40:31', '2021-06-04 16:40:31'),
(2, 'groups', 'Product Base', 10, 'A', 1, '2021-06-04 16:40:31', '2021-06-04 16:40:31'),
(3, 'groups', 'Settings', 10, 'A', 1, '2021-06-04 16:40:31', '2021-06-04 16:40:31');

-- --------------------------------------------------------

--
-- Table structure for table `ProductBaseImages`
--

CREATE TABLE `ProductBaseImages` (
  `id` int(11) NOT NULL,
  `productBaseId` int(11) DEFAULT NULL,
  `imageId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ProductBaseMeta`
--

CREATE TABLE `ProductBaseMeta` (
  `id` int(11) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `data` varchar(255) DEFAULT NULL,
  `productBaseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ProductBaseMeta`
--

INSERT INTO `ProductBaseMeta` (`id`, `key`, `value`, `type`, `data`, `productBaseId`, `createdAt`, `updatedAt`) VALUES
(1, 'name', '1', 'string', NULL, 1, '2021-05-12 15:06:29', '2021-05-12 15:06:29'),
(2, 'front', '2', 'string', NULL, 1, '2021-05-12 15:06:29', '2021-05-12 15:06:29'),
(3, 'width', '3', 'string', NULL, 1, '2021-05-12 15:06:29', '2021-05-12 15:06:29'),
(4, 'height', '4', 'string', NULL, 1, '2021-05-12 15:06:29', '2021-05-12 15:06:29'),
(5, 'name', 'x', 'string', 'x', 1, '2021-05-12 15:30:22', '2021-05-12 15:30:22'),
(6, 'front', 'y', 'string', 'y', 1, '2021-05-12 15:30:22', '2021-05-12 15:30:22'),
(7, 'width', '1', 'string', '1', 1, '2021-05-12 15:30:22', '2021-05-12 15:30:22'),
(8, 'height', '2', 'string', '2', 1, '2021-05-12 15:30:22', '2021-05-12 15:30:22'),
(9, 'name', 'a', 'string', 'a', 1, '2021-05-13 07:11:51', '2021-05-13 07:11:51'),
(10, 'front', 'b', 'string', 'b', 1, '2021-05-13 07:11:51', '2021-05-13 07:11:51'),
(11, 'width', '1', 'string', '1', 1, '2021-05-13 07:11:51', '2021-05-13 07:11:51'),
(12, 'height', '2', 'string', '2', 1, '2021-05-13 07:11:51', '2021-05-13 07:11:51');

-- --------------------------------------------------------

--
-- Table structure for table `ProductBases`
--

CREATE TABLE `ProductBases` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `primaryImageUrl` varchar(255) DEFAULT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `providerId` varchar(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ProductBases`
--

INSERT INTO `ProductBases` (`id`, `title`, `description`, `status`, `primaryImageUrl`, `visibility`, `publishDate`, `categoryId`, `providerId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Product base 1kkl', 'Product base 1Product base 1Product base 1Product base 1', 'F', NULL, 'I', '2021-06-09 13:19:04', NULL, 'P', 1, '2021-05-01 22:32:12', '2021-06-12 14:32:58'),
(5, 'faf', 'fds', 'A', NULL, NULL, NULL, NULL, NULL, 1, '2021-06-04 16:50:56', '2021-06-04 16:50:56'),
(6, 'abc', '1239', 'A', NULL, NULL, NULL, NULL, NULL, 1, '2021-06-05 04:50:11', '2021-06-06 10:19:37'),
(7, 'faf', 'dsds', 'A', NULL, NULL, NULL, NULL, NULL, 1, '2021-06-05 09:15:01', '2021-06-05 09:15:01'),
(8, 'abc', '123', 'A', NULL, NULL, NULL, NULL, NULL, 1, '2021-06-06 09:41:36', '2021-06-06 09:41:36'),
(9, 'abc', '1234', 'A', NULL, NULL, NULL, NULL, NULL, 1, '2021-06-06 09:59:08', '2021-06-06 09:59:08'),
(10, 'Product base 1', 'abc', 'A', NULL, 'I', NULL, NULL, 'F', 1, '2021-08-05 14:56:41', '2021-08-05 14:56:41');

-- --------------------------------------------------------

--
-- Table structure for table `ProductBaseTags`
--

CREATE TABLE `ProductBaseTags` (
  `id` int(11) NOT NULL,
  `productBaseId` int(11) DEFAULT NULL,
  `tagId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ProductBaseTerms`
--

CREATE TABLE `ProductBaseTerms` (
  `id` int(11) NOT NULL,
  `term_taxonomy_id` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `ref_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ProductBaseTerms`
--

INSERT INTO `ProductBaseTerms` (`id`, `term_taxonomy_id`, `order`, `ref_id`) VALUES
(1, 10, NULL, 4),
(2, 14, NULL, 4),
(3, 10, NULL, 5),
(4, 14, NULL, 5),
(5, 11, NULL, 6),
(6, 14, NULL, 6),
(7, NULL, NULL, 7),
(8, NULL, NULL, 7),
(9, NULL, NULL, 8),
(10, NULL, NULL, 8),
(11, NULL, NULL, 9),
(12, NULL, NULL, 9),
(13, NULL, NULL, 6),
(14, NULL, NULL, 6),
(15, NULL, NULL, 6),
(16, NULL, NULL, 6),
(17, NULL, NULL, 1),
(18, NULL, NULL, 1),
(19, NULL, NULL, 1),
(20, NULL, NULL, 1),
(21, NULL, NULL, 1),
(22, NULL, NULL, 1),
(23, NULL, NULL, 1),
(24, NULL, NULL, 1),
(25, NULL, NULL, 1),
(26, NULL, NULL, 1),
(27, NULL, NULL, 1),
(28, NULL, NULL, 1),
(29, NULL, NULL, 1),
(30, NULL, NULL, 1),
(31, 10, NULL, 1),
(32, 15, NULL, 1),
(33, 11, NULL, 1),
(34, 15, NULL, 1),
(35, 11, NULL, 1),
(36, 15, NULL, 1),
(37, 11, NULL, 1),
(38, 15, NULL, 1),
(39, 11, NULL, 1),
(40, 15, NULL, 1),
(41, 11, NULL, 1),
(42, 15, NULL, 1),
(43, 11, NULL, 1),
(44, 15, NULL, 1),
(45, 11, NULL, 1),
(46, 15, NULL, 1),
(47, 11, NULL, 1),
(48, 15, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Providers`
--

CREATE TABLE `Providers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'System Admin', '2021-04-16 09:35:10', '2021-04-16 09:35:10'),
(2, 'HelpDesk', '2021-04-16 09:35:10', '2021-04-16 09:35:10'),
(3, 'Leader', '2021-04-16 09:35:10', '2021-04-16 09:35:10'),
(4, 'Employee', '2021-04-16 09:35:10', '2021-04-16 09:35:10'),
(5, 'Customer', '2021-04-16 09:35:10', '2021-04-16 09:35:10');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expires` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `session_token` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Tags`
--

CREATE TABLE `Tags` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `productBaseId` int(11) DEFAULT NULL,
  `productBaseTagId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `TermMeta`
--

CREATE TABLE `TermMeta` (
  `id` int(11) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `type` varchar(500) NOT NULL,
  `data` varchar(500) NOT NULL,
  `term_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TermMeta`
--

INSERT INTO `TermMeta` (`id`, `key`, `value`, `type`, `data`, `term_id`) VALUES
(1, 'front', 'n', 'string', 'n', 37),
(2, 'width', '1', 'string', '1', 37),
(3, 'height', '1', 'string', '1', 37),
(4, 'front', '1', 'string', '1', 38),
(5, 'width', '1', 'string', '1', 38),
(6, 'height', '1', 'string', '1', 38),
(7, 'front', 'front', 'string', 'front', 39),
(8, 'width', '1', 'string', '1', 39),
(9, 'height', '2', 'string', '2', 39),
(10, 'front', 'back', 'string', 'back', 40),
(11, 'width', '1', 'string', '1', 40),
(12, 'height', '2', 'string', '2', 40),
(13, 'front', 'abc', 'string', 'abc', 41),
(14, 'width', '10', 'string', '10', 41),
(15, 'height', '10', 'string', '10', 41),
(16, 'front', 'abc', 'string', 'abc', 42),
(17, 'width', '10', 'string', '10', 42),
(18, 'height', '11', 'string', '11', 42),
(19, 'front', 'zx', 'string', 'zx', 43),
(20, 'width', '1', 'string', '1', 43),
(21, 'height', '1', 'string', '1', 43),
(22, 'front', '1', 'string', '1', 44),
(23, 'width', '1', 'string', '1', 44),
(24, 'height', '1', 'string', '1', 44),
(25, 'background', 'x', 'string', 'x', 45),
(26, 'width', '1', 'string', '1', 45),
(27, 'height', '1', 'string', '1', 45),
(28, 'background', 'ab', 'string', 'ab', 46),
(29, 'width', '1', 'string', '1', 46),
(30, 'height', '1', 'string', '1', 46),
(31, 'background', 'bg', 'string', 'bg', 47),
(32, 'width', '1', 'string', '1', 47),
(33, 'height', '1', 'string', '1', 47),
(34, 'background', 'bg', 'string', 'bg', 48),
(35, 'width', '1', 'string', '1', 48),
(36, 'height', '1', 'string', '1', 48),
(37, 'image', '-nUihsTlm-121011377_1335631823435112_2145493511905808248_o.jpg', 'string', '-nUihsTlm-121011377_1335631823435112_2145493511905808248_o.jpg', 48),
(38, 'width', '1', 'string', '1', 49),
(39, 'height', '1', 'string', '1', 49),
(40, 'width', '1', 'string', '1', 50),
(41, 'height', '1', 'string', '1', 50),
(42, 'width', '1', 'string', '1', 51),
(43, 'height', '1', 'string', '1', 51);

-- --------------------------------------------------------

--
-- Table structure for table `TermRelationships`
--

CREATE TABLE `TermRelationships` (
  `id` int(11) NOT NULL,
  `entityId` int(11) DEFAULT NULL,
  `entityType` varchar(255) DEFAULT NULL,
  `taxonomyId` int(11) DEFAULT NULL,
  `orderBy` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TermRelationships`
--

INSERT INTO `TermRelationships` (`id`, `entityId`, `entityType`, `taxonomyId`, `orderBy`) VALUES
(1, 1, 'ProductBase', 11, 1),
(2, 1, 'ProductBase', 15, 1),
(3, 1, 'ProductBase', 12, 1),
(4, 1, 'ProductBase', 14, 1),
(5, 1, 'ProductBase', 16, 1),
(6, 1, 'ProductBase', 17, 1),
(7, 1, 'ProductBase', 18, 1),
(8, 10, 'ProductBase', 10, 1),
(9, 10, 'ProductBase', 14, 1),
(10, 10, 'ProductBase', 19, 1),
(11, 10, 'ProductBase', 20, 1),
(12, 10, 'ProductBase', 21, 1),
(13, 10, 'ProductBase', 22, 1),
(14, 10, 'ProductBase', 23, 1),
(15, 10, 'ProductBase', 24, 1),
(16, 10, 'ProductBase', 25, 1),
(17, 10, 'ProductBase', 26, 1),
(18, 10, 'ProductBase', 27, 1),
(19, 10, 'ProductBase', 28, 1),
(20, 10, 'ProductBase', 29, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Terms`
--

CREATE TABLE `Terms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `term_group` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Terms`
--

INSERT INTO `Terms` (`id`, `name`, `slug`, `term_group`, `status`) VALUES
(30, 'T shirt', 't-shirt', NULL, NULL),
(31, 'Fashion', 'fashion', NULL, NULL),
(32, 'Jewelry', 'jewelry', NULL, NULL),
(33, 'Books', 'books', NULL, NULL),
(34, 'Man', 'man', NULL, NULL),
(35, 'Woman', 'woman', NULL, NULL),
(36, 'n', NULL, NULL, NULL),
(37, 'n', NULL, NULL, NULL),
(38, '1', NULL, NULL, NULL),
(39, 'nghiem', NULL, NULL, NULL),
(40, 'manh', NULL, NULL, NULL),
(41, 'front', NULL, NULL, NULL),
(42, 'back', NULL, NULL, NULL),
(43, 'middle', NULL, NULL, NULL),
(44, 'x2', NULL, NULL, NULL),
(45, 'x', NULL, NULL, NULL),
(46, 'bao anh', NULL, NULL, NULL),
(47, 'abc', NULL, NULL, NULL),
(48, 'mk3', NULL, NULL, NULL),
(49, 'abc', NULL, NULL, NULL),
(50, 'xyz', NULL, NULL, NULL),
(51, 'ab1', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `TermTaxonomies`
--

CREATE TABLE `TermTaxonomies` (
  `id` int(11) NOT NULL,
  `taxonomy` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `term_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TermTaxonomies`
--

INSERT INTO `TermTaxonomies` (`id`, `taxonomy`, `description`, `slug`, `parent`, `order`, `count`, `term_id`) VALUES
(10, 'productbase_category', '...', 'productbase_category', NULL, 1, 1, 30),
(11, 'productbase_category', '...', 'productbase_category', NULL, 1, 1, 31),
(12, 'productbase_category', '...', 'productbase_category', NULL, 1, 1, 32),
(13, 'productbase_category', '...', 'productbase_category', NULL, 1, 1, 33),
(14, 'productbase_tag', '...', 'productbase_tag', NULL, 1, 1, 34),
(15, 'productbase_tag', '...', 'productbase_tag', NULL, 1, 1, 35),
(16, 'ProductBase_PrintArea', NULL, 'ProductBase_PrintArea', NULL, 1, NULL, 38),
(17, 'ProductBase_PrintArea', NULL, 'ProductBase_PrintArea', NULL, 1, NULL, 39),
(18, 'ProductBase_PrintArea', NULL, 'ProductBase_PrintArea', NULL, 1, NULL, 40),
(19, 'ProductBase_PrintArea', NULL, 'ProductBase_PrintArea', NULL, 1, NULL, 41),
(20, 'ProductBase_PrintArea', NULL, 'ProductBase_PrintArea', NULL, 1, NULL, 42),
(21, 'ProductBase_PrintArea', NULL, 'ProductBase_PrintArea', NULL, 1, NULL, 43),
(22, 'ProductBase_PrintArea', NULL, 'ProductBase_PrintArea', NULL, 1, NULL, 44),
(23, 'ProductBase_Mockup', NULL, 'ProductBase_Mockup', NULL, 1, NULL, 45),
(24, 'ProductBase_Mockup', NULL, 'ProductBase_Mockup', NULL, 1, NULL, 46),
(25, 'ProductBase_Mockup', NULL, 'ProductBase_Mockup', NULL, 1, NULL, 47),
(26, 'ProductBase_Mockup', NULL, 'ProductBase_Mockup', NULL, 1, NULL, 48),
(27, 'ProductBase_CombinePrintArea', NULL, 'ProductBase_CombinePrintArea', NULL, 1, NULL, 49),
(28, 'ProductBase_CombinePrintArea', NULL, 'ProductBase_CombinePrintArea', NULL, 1, NULL, 50),
(29, 'ProductBase_CombinePrintArea', NULL, 'ProductBase_CombinePrintArea', NULL, 1, NULL, 51);

-- --------------------------------------------------------

--
-- Table structure for table `UserMeta`
--

CREATE TABLE `UserMeta` (
  `id` int(11) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `data` text NOT NULL,
  `type` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `UserMeta`
--

INSERT INTO `UserMeta` (`id`, `key`, `value`, `status`, `user_id`, `data`, `type`, `createdAt`, `updatedAt`) VALUES
(12, 'address', 'abc', NULL, 32, '', '', '2021-04-19 15:02:08', '2021-04-19 15:02:08'),
(13, 'phone', '123', NULL, 32, '', '', '2021-04-19 15:02:08', '2021-04-19 15:02:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'A',
  `role_id` int(11) DEFAULT NULL,
  `email_verified` timestamp(6) NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `image`, `status`, `role_id`, `email_verified`, `created_at`, `updated_at`) VALUES
(1, 'Nghiem Tran', '$2b$10$QRdi.FleYan/H/X5aSnhrupIYJ0EpjtYQAg84EA7SyzgXMbtu8DFO', 'wooowebsite@gmail.com', NULL, 'A', 1, NULL, '2021-04-18 16:35:42.114135', '2021-04-18 16:35:42.144888'),
(2, 'Quan', '$2b$10$QRdi.FleYan/H/X5aSnhrupIYJ0EpjtYQAg84EA7SyzgXMbtu8DFO', 'quanretoucher@gmail.com', NULL, 'A', 5, NULL, '2021-04-18 16:35:42.114135', '2021-04-18 16:35:42.144888'),
(32, 'kh2', NULL, 'kh1@gmail.com', NULL, 'A', 5, NULL, '2021-04-19 15:02:08.900241', '2021-04-19 15:02:08.900241'),
(33, 'Hùng 2', NULL, 'hung@gmail.com', NULL, 'A', 3, NULL, '2021-04-19 15:07:12.295931', '2021-04-19 15:07:12.295931'),
(34, 'Nghiem Tran', NULL, 'chieudong4712@gmail.com', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=4520310414664462&height=50&width=50&ext=1621437363&hash=AeRKH4nZIXJLUKu3ZUc', 'A', 4, NULL, '2021-04-19 15:16:04.290505', '2021-04-19 15:16:04.290505'),
(35, 'Thành ', NULL, 'thanh@gmail.com', NULL, 'A', 3, NULL, '2021-04-19 15:18:31.682622', '2021-04-19 15:18:31.682622');

-- --------------------------------------------------------

--
-- Table structure for table `UserTerms`
--

CREATE TABLE `UserTerms` (
  `id` int(11) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `latestVersion` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `term_taxonomy_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `verification_requests`
--

CREATE TABLE `verification_requests` (
  `id` int(11) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_95843cea26fc65b1a9d9b6e1d2` (`compound_id`),
  ADD KEY `userId` (`user_id`),
  ADD KEY `providerId` (`provider_id`),
  ADD KEY `providerAccountId` (`provider_account_id`);

--
-- Indexes for table `Albums`
--
ALTER TABLE `Albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Filters`
--
ALTER TABLE `Filters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Images`
--
ALTER TABLE `Images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Images_productBaseId_productBaseImageId_unique` (`productBaseId`,`productBaseImageId`),
  ADD KEY `productBaseImageId` (`productBaseImageId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `MetaFields`
--
ALTER TABLE `MetaFields`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MetaValues`
--
ALTER TABLE `MetaValues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Permissions`
--
ALTER TABLE `Permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `refId` (`refId`);

--
-- Indexes for table `ProductBaseImages`
--
ALTER TABLE `ProductBaseImages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ProductBaseMeta`
--
ALTER TABLE `ProductBaseMeta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productBaseId` (`productBaseId`);

--
-- Indexes for table `ProductBases`
--
ALTER TABLE `ProductBases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `ProductBaseTags`
--
ALTER TABLE `ProductBaseTags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ProductBaseTerms`
--
ALTER TABLE `ProductBaseTerms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Providers`
--
ALTER TABLE `Providers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_f10db2949bbea55b44f31108e1` (`session_token`),
  ADD UNIQUE KEY `IDX_b02a7acc05fe8194bed8433cf2` (`access_token`);

--
-- Indexes for table `Tags`
--
ALTER TABLE `Tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Tags_productBaseId_productBaseTagId_unique` (`productBaseId`,`productBaseTagId`),
  ADD KEY `productBaseTagId` (`productBaseTagId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `TermMeta`
--
ALTER TABLE `TermMeta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `term_id` (`term_id`);

--
-- Indexes for table `TermRelationships`
--
ALTER TABLE `TermRelationships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Terms`
--
ALTER TABLE `Terms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `TermTaxonomies`
--
ALTER TABLE `TermTaxonomies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `term_id` (`term_id`);

--
-- Indexes for table `UserMeta`
--
ALTER TABLE `UserMeta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- Indexes for table `UserTerms`
--
ALTER TABLE `UserTerms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `term_taxonomy_id` (`term_taxonomy_id`);

--
-- Indexes for table `verification_requests`
--
ALTER TABLE `verification_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_77287cef70a4627091ae6d19c4` (`token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Albums`
--
ALTER TABLE `Albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Filters`
--
ALTER TABLE `Filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Images`
--
ALTER TABLE `Images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MetaFields`
--
ALTER TABLE `MetaFields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MetaValues`
--
ALTER TABLE `MetaValues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Permissions`
--
ALTER TABLE `Permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ProductBaseImages`
--
ALTER TABLE `ProductBaseImages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProductBaseMeta`
--
ALTER TABLE `ProductBaseMeta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ProductBases`
--
ALTER TABLE `ProductBases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ProductBaseTags`
--
ALTER TABLE `ProductBaseTags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ProductBaseTerms`
--
ALTER TABLE `ProductBaseTerms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `Providers`
--
ALTER TABLE `Providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Tags`
--
ALTER TABLE `Tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TermMeta`
--
ALTER TABLE `TermMeta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `TermRelationships`
--
ALTER TABLE `TermRelationships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Terms`
--
ALTER TABLE `Terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `TermTaxonomies`
--
ALTER TABLE `TermTaxonomies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `UserMeta`
--
ALTER TABLE `UserMeta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `UserTerms`
--
ALTER TABLE `UserTerms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `verification_requests`
--
ALTER TABLE `verification_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Albums`
--
ALTER TABLE `Albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Categories`
--
ALTER TABLE `Categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Filters`
--
ALTER TABLE `Filters`
  ADD CONSTRAINT `filters_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Images`
--
ALTER TABLE `Images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productBaseId`) REFERENCES `ProductBases` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_2` FOREIGN KEY (`productBaseImageId`) REFERENCES `ProductBaseImages` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Permissions`
--
ALTER TABLE `Permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`refId`) REFERENCES `Roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `ProductBaseMeta`
--
ALTER TABLE `ProductBaseMeta`
  ADD CONSTRAINT `productbasemeta_ibfk_1` FOREIGN KEY (`productBaseId`) REFERENCES `ProductBases` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `ProductBases`
--
ALTER TABLE `ProductBases`
  ADD CONSTRAINT `productbases_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productbases_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Tags`
--
ALTER TABLE `Tags`
  ADD CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`productBaseId`) REFERENCES `ProductBases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tags_ibfk_2` FOREIGN KEY (`productBaseTagId`) REFERENCES `ProductBaseTags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tags_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `TermMeta`
--
ALTER TABLE `TermMeta`
  ADD CONSTRAINT `termmeta_ibfk_1` FOREIGN KEY (`term_id`) REFERENCES `Terms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `TermTaxonomies`
--
ALTER TABLE `TermTaxonomies`
  ADD CONSTRAINT `termtaxonomies_ibfk_1` FOREIGN KEY (`term_id`) REFERENCES `Terms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `UserMeta`
--
ALTER TABLE `UserMeta`
  ADD CONSTRAINT `usermeta_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `UserTerms`
--
ALTER TABLE `UserTerms`
  ADD CONSTRAINT `userterms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `userterms_ibfk_2` FOREIGN KEY (`term_taxonomy_id`) REFERENCES `TermTaxonomies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
