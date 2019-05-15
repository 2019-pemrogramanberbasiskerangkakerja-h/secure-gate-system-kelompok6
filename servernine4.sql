-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 15, 2019 at 04:36 PM
-- Server version: 8.0.16
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servernine4`
--

-- --------------------------------------------------------

--
-- Table structure for table `gate`
--

CREATE TABLE `gate` (
  `G_ID` int(11) NOT NULL,
  `G_GATENAME` varchar(50) DEFAULT NULL,
  `G_OPEN` time DEFAULT NULL,
  `G_CLOSE` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gate`
--

INSERT INTO `gate` (`G_ID`, `G_GATENAME`, `G_OPEN`, `G_CLOSE`) VALUES
(6, 'PB1', '07:00:00', '10:00:00'),
(7, 'PL1', '12:00:00', '15:00:00'),
(8, 'PL2', '08:00:00', '21:00:00'),
(9, 'PB2', '13:00:00', '11:00:00'),
(10, 'PIKTI', '08:59:00', '22:00:00'),
(11, 'Ok', '17:06:00', '20:09:00');

-- --------------------------------------------------------

--
-- Table structure for table `grup`
--

CREATE TABLE `grup` (
  `GR_ID` char(1) NOT NULL,
  `GR_ROLE` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grup`
--

INSERT INTO `grup` (`GR_ID`, `GR_ROLE`) VALUES
('1', 'Dosen'),
('2', 'Mahasiswa'),
('3', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `hak_akses`
--

CREATE TABLE `hak_akses` (
  `GR_ID` char(1) NOT NULL,
  `G_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hak_akses`
--

INSERT INTO `hak_akses` (`GR_ID`, `G_ID`) VALUES
('1', 6),
('2', 6),
('2', 8),
('1', 10);

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `L_ID` int(11) NOT NULL,
  `ID` char(14) DEFAULT NULL,
  `G_ID` int(11) DEFAULT NULL,
  `L_TIME` time DEFAULT NULL,
  `L_STATUS` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`L_ID`, `ID`, `G_ID`, `L_TIME`, `L_STATUS`) VALUES
(1, '036', 6, '09:08:48', 0),
(2, '036', 6, '09:09:47', 0),
(3, 'mantap', 11, '06:02:52', 0),
(4, 'mantap', 8, '06:03:02', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` char(14) NOT NULL,
  `GR_ID` char(1) DEFAULT NULL,
  `USERNAME` varchar(50) DEFAULT NULL,
  `PASSWORD` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `GR_ID`, `USERNAME`, `PASSWORD`) VALUES
('010', '1', 'far', '$2a$10$s.pLfXh5NaSpKhp/k54JzOAx3IjdYt8EQyxrom1/T2aMXgJDNJZ3q'),
('031', '2', 'Mod', '$2a$10$L8PAzUgpubOfV4nioviMgOrMf6.8TugXJJpsb1dAizTzNKyhxbIpa'),
('034', '2', 'Nila', '$2a$10$bJXiiICOJLfyNWR8OxBXgeOc65qKusggHtJYNK1Yz2uJ9hHKVP4Qi'),
('035', '2', 'ai', '$2a$10$.laFQCUyCEE.vOlerTnY0umENGQyTOGTEqxFgin4mhj50.HfZXNRa'),
('036', '3', 'Rifka', '$2a$10$02QgQY8bv9I7pAyYp0OIcOQxRtJyFhjDo4GwIrBoe22SkuzKx8kea'),
('037', '2', 'opi', '$2a$10$2Sj6nuaXe1Tnk1kUikPi2uZtTFEvtn0zPXDBGaj8AiGF9bZoptB0W'),
('039', '2', 'aa', '$2a$10$YpW7wVED349/pY/3d/ZiEODa9w8SWeatTN7mxvTUyQ9JZk9kMgsDy'),
('704', '2', 'ulfa', '$2a$10$7wnJl2ObT.9xUYkqdmnBHurOtakQ6tSEQ0zuPZ9iP8B3BM11fdtlO'),
('mantap', '2', 'mantap', '$2a$10$ZC/LOD3BgTzuCRcqlaqrTuoW6eIOmvix6C5BW706bKGXPU9EagP5y');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gate`
--
ALTER TABLE `gate`
  ADD PRIMARY KEY (`G_ID`);

--
-- Indexes for table `grup`
--
ALTER TABLE `grup`
  ADD PRIMARY KEY (`GR_ID`);

--
-- Indexes for table `hak_akses`
--
ALTER TABLE `hak_akses`
  ADD PRIMARY KEY (`GR_ID`,`G_ID`),
  ADD KEY `FK_TERGANTUNG` (`G_ID`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`L_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_MEMILIKI` (`GR_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gate`
--
ALTER TABLE `gate`
  MODIFY `G_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `L_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hak_akses`
--
ALTER TABLE `hak_akses`
  ADD CONSTRAINT `FK_TERDAFTAR` FOREIGN KEY (`GR_ID`) REFERENCES `grup` (`GR_ID`),
  ADD CONSTRAINT `FK_TERGANTUNG` FOREIGN KEY (`G_ID`) REFERENCES `gate` (`G_ID`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_MEMILIKI` FOREIGN KEY (`GR_ID`) REFERENCES `grup` (`GR_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
