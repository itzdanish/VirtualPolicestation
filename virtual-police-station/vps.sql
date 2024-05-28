-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2021 at 11:16 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vps`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  `permission` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cctns`
--

CREATE TABLE `cctns` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cctns`
--

INSERT INTO `cctns` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2b$10$TRxTdVkrZ4OG64yfY30Ov.Rh3T6vRw9sdCf8ojCrAa1ufxxLs/dlG');

-- --------------------------------------------------------

--
-- Table structure for table `cctns_first_information_report`
--

CREATE TABLE `cctns_first_information_report` (
  `id` int(11) NOT NULL,
  `fir_number` varchar(20) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 1,
  `police_station_number` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `place_of_crime` varchar(150) NOT NULL,
  `time_of_crime` datetime NOT NULL,
  `description` varchar(150) NOT NULL,
  `is_signed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `first_information_report`
--

CREATE TABLE `first_information_report` (
  `id` int(11) NOT NULL,
  `fir_number` varchar(20) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 1,
  `police_station_number` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `place_of_crime` varchar(150) NOT NULL,
  `time_of_crime` datetime NOT NULL,
  `description` varchar(150) NOT NULL,
  `is_signed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `first_information_report`
--

INSERT INTO `first_information_report` (`id`, `fir_number`, `status_id`, `police_station_number`, `user_id`, `place_of_crime`, `time_of_crime`, `description`, `is_signed`) VALUES
(25, '1619794025407', 1, '12345', 15, 'Sion', '2021-05-03 14:30:00', 'This is my complaint', 1),
(27, '1620147626789', 1, '12345', 34, 'Sion', '0000-00-00 00:00:00', 'THis isidwiuh', 1),
(34, '1620148233924', 1, '12345', 34, 'Sion', '2021-05-03 03:30:00', 'ewgthj', 0);

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `fir_number` varchar(20) NOT NULL,
  `note` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id`, `fir_number`, `note`) VALUES
(17, '18102C2046', 'Wo found the suspect'),
(18, '18102C2046', 'Intakhab'),
(19, '18102C2046', 'Intakhab'),
(20, '18102C2046', 'We found suspect'),
(21, '18102C2046', 'Inydey'),
(22, '18102C2046', 'We found suspect'),
(23, '18102C2046', 'We found suspect'),
(24, '18102C2046', 'We found suspect'),
(25, '18102C2046', 'We found suspect'),
(26, '18102C2046', 'Intakhab'),
(27, '18102C2046', 'ewfrd');

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `phone_number` bigint(12) NOT NULL,
  `otp` varchar(20) NOT NULL,
  `create_at` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `phone_number`, `otp`, `create_at`) VALUES
(497, 9699056689, '137154', '22:18:39'),
(498, 9865231452, '283210', '22:19:54'),
(499, 9865231452, '111867', '22:26:33');

-- --------------------------------------------------------

--
-- Table structure for table `police_station`
--

CREATE TABLE `police_station` (
  `id` int(11) NOT NULL,
  `police_station_number` varchar(20) NOT NULL,
  `station_house_officer_id` int(11) NOT NULL,
  `police_station_name` varchar(20) NOT NULL,
  `phone_number` bigint(12) NOT NULL,
  `police_station_address` varchar(150) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `police_station`
--

INSERT INTO `police_station` (`id`, `police_station_number`, `station_house_officer_id`, `police_station_name`, `phone_number`, `police_station_address`, `latitude`, `longitude`) VALUES
(6, '12345', 1, 'Sion', 7854123775, 'Sion', 19.0436, 72.8537),
(16, '12346', 5, 'Sewri', 7854123725, 'Sewri West', 18.9935, 72.8556),
(7, '12347', 7, 'Goregaon', 7854123778, 'Goregaon east', 19.1548, 72.8756),
(8, '12348', 4, 'Sandhurst Road', 9653215478, 'Sandhurst Road east', 18.9609, 72.8393),
(9, '12349', 6, 'Wadala truck termina', 9865123778, 'Wadala Truck East', 19.0332, 72.8755);

-- --------------------------------------------------------

--
-- Table structure for table `repository`
--

CREATE TABLE `repository` (
  `id` int(11) NOT NULL,
  `fir_number` varchar(20) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `station_house_officer`
--

CREATE TABLE `station_house_officer` (
  `id` int(11) NOT NULL,
  `sho_name` varchar(20) NOT NULL,
  `aadhaar_number` varchar(12) NOT NULL,
  `phone_number` bigint(12) NOT NULL,
  `date_of_birth` varchar(10) NOT NULL,
  `address` varchar(150) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `station_house_officer`
--

INSERT INTO `station_house_officer` (`id`, `sho_name`, `aadhaar_number`, `phone_number`, `date_of_birth`, `address`, `gender`, `password`) VALUES
(1, 'Tukaram', '245059875412', 9865321245, '10-10-1980', 'byculla', 'm', '$2b$10$yjigxbGrBbMtyN4Ni62rzOBhcqxKP8rP6BiIUV/CGKGx19t9L1Anu'),
(4, 'Jethalal', '192173377333', 4348748376, '10-07-1980', 'Wadala', 'm', '$2b$10$234ZinEh4ui4wAeP49j3peNC28uw52Y5CSEA9ylU5hnFlov.DuNty'),
(5, 'Ayyar', '297623736647', 8959757474, '11-08-1985', 'Byculla', 'm', '$2b$10$PQe0.zZdOZK2Qp4Yon42pejlDKQ2IEiwTgDs5gPHF./dkIm3xnSPi'),
(6, 'Bhide', '098398347474', 4883478744, '12-09-1990', 'Andheri', 'm', '$2b$10$uPyf7S7MgHCt26q55DXMpu57cT8oeKemuUK1DALitMM.Luyguclxu'),
(7, 'Hathibhai', '238748764874', 4894843744, '13-10-1995', 'Goregaon', 'm', '$2b$10$TUPqDBpHOpd7kxE3GJXucOBHkxVpfTmvxeCuYGaP6ogd4hdYnd2.6');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status_name`) VALUES
(1, 'Submitted'),
(2, 'Opened'),
(3, 'Progress'),
(4, 'Closed');

-- --------------------------------------------------------

--
-- Table structure for table `suspect`
--

CREATE TABLE `suspect` (
  `id` int(11) NOT NULL,
  `fir_number` varchar(20) NOT NULL,
  `suspect_name` varchar(20) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `height` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `aadhaar_number` varchar(12) DEFAULT NULL,
  `phone_number` bigint(12) NOT NULL,
  `date_of_birth` varchar(10) NOT NULL,
  `address` varchar(150) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_name`, `aadhaar_number`, `phone_number`, `date_of_birth`, `address`, `gender`, `password`) VALUES
(2, 'Neha Bhosale', '458235965847', 9867884751, '01-01-1997', 'Goregaon', 'f', '12345frdgtfhytgrfsdffbg'),
(15, 'Intakhab', '486468468464', 9699056689, '04-04-1999', 'sion', 'm', '$2b$10$59wvIYYi6sQXRODWw9yt0eWroLeeV7eKv4lMbjhmkGARLfEw/6a/G'),
(17, 'Manish', '204251457895', 7845123658, '10-02-1995', 'Wadala', 'm', 'ejmuyhgqedyiuhohuygtfwgdsij'),
(18, 'Danish', '512541457895', 9999923658, '04-01-1996', 'Kurla', 'm', 'iuhiuwskjfwehsfdhiuhefihhhwfish'),
(19, 'Minal', '782723647265', 9947876488, '03-10-1999', 'Wadala', 'f', 'oqeiuhiuh3eyd8732iewuhiuwe'),
(20, 'Jinal', '328782364377', 7834534668, '04-12-1991', 'Wadala', 'f', 'epoijoiajd892woeji2uwep9;oie'),
(21, 'Saad', '293894297439', 7845345548, '11-11-1970', 'Wadala', 'm', '654949382e98fws98ef4esfdciuh'),
(32, 'Intakhab', '11111', 9865321457, '1999/04/04', 'Sion', 'M', ''),
(33, 'Intakhab Sheikh', '102589631444', 0, '05/13/1999', 'dharavi', 'm', ''),
(34, 'Shahid', '254785654785', 9865231452, '04/04/2020', 'Karachi', 'm', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cctns`
--
ALTER TABLE `cctns`
  ADD PRIMARY KEY (`id`,`username`);

--
-- Indexes for table `cctns_first_information_report`
--
ALTER TABLE `cctns_first_information_report`
  ADD PRIMARY KEY (`fir_number`) USING BTREE,
  ADD UNIQUE KEY `Unique` (`id`),
  ADD KEY `fk_fir_status` (`status_id`),
  ADD KEY `fk_fir_police_station` (`police_station_number`),
  ADD KEY `fk_fir_user` (`user_id`);

--
-- Indexes for table `first_information_report`
--
ALTER TABLE `first_information_report`
  ADD PRIMARY KEY (`fir_number`) USING BTREE,
  ADD UNIQUE KEY `Unique` (`id`),
  ADD KEY `fk_fir_status` (`status_id`),
  ADD KEY `fk_fir_police_station` (`police_station_number`),
  ADD KEY `fk_fir_user` (`user_id`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notes_fir` (`fir_number`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_otp_aadhaar_info` (`phone_number`);

--
-- Indexes for table `police_station`
--
ALTER TABLE `police_station`
  ADD PRIMARY KEY (`police_station_number`,`station_house_officer_id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `station_house_officer` (`station_house_officer_id`);

--
-- Indexes for table `repository`
--
ALTER TABLE `repository`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_repository_fir` (`fir_number`);

--
-- Indexes for table `station_house_officer`
--
ALTER TABLE `station_house_officer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suspect`
--
ALTER TABLE `suspect`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_status_fir` (`fir_number`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `aadhaar_number` (`aadhaar_number`,`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cctns`
--
ALTER TABLE `cctns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cctns_first_information_report`
--
ALTER TABLE `cctns_first_information_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `first_information_report`
--
ALTER TABLE `first_information_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=500;

--
-- AUTO_INCREMENT for table `police_station`
--
ALTER TABLE `police_station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `repository`
--
ALTER TABLE `repository`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `station_house_officer`
--
ALTER TABLE `station_house_officer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `suspect`
--
ALTER TABLE `suspect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `first_information_report`
--
ALTER TABLE `first_information_report`
  ADD CONSTRAINT `fk_fir_police_station` FOREIGN KEY (`police_station_number`) REFERENCES `police_station` (`police_station_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fir_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fir_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `police_station`
--
ALTER TABLE `police_station`
  ADD CONSTRAINT `fk_police_station-station_house_officer` FOREIGN KEY (`station_house_officer_id`) REFERENCES `station_house_officer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
