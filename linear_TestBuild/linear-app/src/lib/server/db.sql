-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 20, 2025 at 02:09 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gradeyourprof`
--

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--

CREATE TABLE `professor` (
  `Prof_ID` int(11) NOT NULL,
  `Professor_Name` varchar(100) NOT NULL,
  `Professor_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`Prof_ID`, `Professor_Name`, `Professor_img`) VALUES
(1, 'Christine Peña', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `professorinfo`
--

CREATE TABLE `professorinfo` (
  `Request_ID` int(11) NOT NULL,
  `Prof_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `professorinfo`
--

INSERT INTO `professorinfo` (`Request_ID`, `Prof_ID`) VALUES
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `Request_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Status_ID` int(11) NOT NULL,
  `Study_Load` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`Request_ID`, `User_ID`, `Status_ID`, `Study_Load`) VALUES
(1, 1, 2, NULL),
(2, 1, 2, NULL),
(3, 1, 2, '/docus/StudentStudyLoad.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `Review_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Prof_ID` int(11) NOT NULL,
  `Subject_ID` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Rating` float DEFAULT NULL,
  `Study_Load` varchar(255) DEFAULT NULL,
  `Status_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`Review_ID`, `User_ID`, `Prof_ID`, `Subject_ID`, `Date`, `Description`, `Rating`, `Study_Load`, `Status_ID`) VALUES
(1, 1, 1, 1, '2025-01-01', 'Test lorem ipsum', 3.5, '/docus/StudentStudyLoad.pdf', 1),
(2, 1, 1, 1, '2025-12-19', 'test', 5, '/docus/StudentStudyLoad.pdf', 1),
(6, 1, 1, 1, '2025-12-20', 'test', 4.5, '/docus/1_1766192945769_StudentStudyLoad.pdf', 1);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `Status_ID` int(11) NOT NULL,
  `Status_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`Status_ID`, `Status_Name`) VALUES
(1, 'Pending'),
(2, 'Approved'),
(3, 'Rejected');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `Subject_ID` int(11) NOT NULL,
  `Subject_Code` varchar(20) NOT NULL,
  `Subject_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`Subject_ID`, `Subject_Code`, `Subject_Name`) VALUES
(1, 'CIS 1101', 'Programming 1');

-- --------------------------------------------------------

--
-- Table structure for table `subjectinfo`
--

CREATE TABLE `subjectinfo` (
  `Request_ID` int(11) NOT NULL,
  `Subject_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjectinfo`
--

INSERT INTO `subjectinfo` (`Request_ID`, `Subject_ID`) VALUES
(1, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `User_ID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `isModerator` tinyint(1) DEFAULT 0,
  `isAdmin` tinyint(1) DEFAULT 0,
  `Status_ID` int(11) DEFAULT NULL,
  `Username` varchar(30) NOT NULL,
  `Ban_Time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `Email`, `Password`, `isModerator`, `isAdmin`, `Status_ID`, `Username`, `Ban_Time`) VALUES
(1, 'admin123@example.com', '$2b$10$P70PbX/qfEw0vkd1X1Ss2OS24dIVfHX9kp70c/Wf0fW6G12nyfzq6', 1, 1, 2, 'Admin', NULL),
(4, 'admin2@example.com', '$2b$10$P70PbX/qfEw0vkd1X1Ss2OS24dIVfHX9kp70c/Wf0fW6G12nyfzq6', 0, 0, 2, 'admin2', NULL),
(12, 'admin3@example.com', '$2b$10$TZjcvHdhuXLCV7WhkCCiMObm7bxWMRVGuE8iYPgudGCdsB7RbDyoS', 0, 0, 3, 'admin3', '2025-12-20 20:16:49'),
(13, 'admin4@example.com', '$2b$10$mbl/WoLUDUpEYtTqcI/sUuogj68kQplo4OFCBxsIAk5CRWJwGWN4u', 0, 0, 1, 'admin4', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`Prof_ID`);

--
-- Indexes for table `professorinfo`
--
ALTER TABLE `professorinfo`
  ADD PRIMARY KEY (`Request_ID`,`Prof_ID`),
  ADD KEY `Prof_ID` (`Prof_ID`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`Request_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Status_ID` (`Status_ID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`Review_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Prof_ID` (`Prof_ID`),
  ADD KEY `Subject_ID` (`Subject_ID`),
  ADD KEY `Status_ID` (`Status_ID`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`Status_ID`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`Subject_ID`);

--
-- Indexes for table `subjectinfo`
--
ALTER TABLE `subjectinfo`
  ADD PRIMARY KEY (`Request_ID`,`Subject_ID`),
  ADD KEY `Subject_ID` (`Subject_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Status_ID` (`Status_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `professor`
--
ALTER TABLE `professor`
  MODIFY `Prof_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `Request_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `Review_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `Status_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `Subject_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `professorinfo`
--
ALTER TABLE `professorinfo`
  ADD CONSTRAINT `professorinfo_ibfk_1` FOREIGN KEY (`Request_ID`) REFERENCES `request` (`Request_ID`),
  ADD CONSTRAINT `professorinfo_ibfk_2` FOREIGN KEY (`Prof_ID`) REFERENCES `professor` (`Prof_ID`);

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`Status_ID`) REFERENCES `status` (`Status_ID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`Prof_ID`) REFERENCES `professor` (`Prof_ID`),
  ADD CONSTRAINT `review_ibfk_3` FOREIGN KEY (`Subject_ID`) REFERENCES `subject` (`Subject_ID`),
  ADD CONSTRAINT `review_ibfk_4` FOREIGN KEY (`Status_ID`) REFERENCES `status` (`Status_ID`);

--
-- Constraints for table `subjectinfo`
--
ALTER TABLE `subjectinfo`
  ADD CONSTRAINT `subjectinfo_ibfk_1` FOREIGN KEY (`Request_ID`) REFERENCES `request` (`Request_ID`),
  ADD CONSTRAINT `subjectinfo_ibfk_2` FOREIGN KEY (`Subject_ID`) REFERENCES `subject` (`Subject_ID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Status_ID`) REFERENCES `status` (`Status_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
