-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 17, 2025 at 09:04 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

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
-- Table structure for table `Professor`
--

CREATE TABLE `Professor` (
  `Prof_ID` int(11) NOT NULL,
  `Professor_Name` varchar(100) NOT NULL,
  `Professor_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ProfessorInfo`
--

CREATE TABLE `ProfessorInfo` (
  `Request_ID` int(11) NOT NULL,
  `Prof_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Request`
--

CREATE TABLE `Request` (
  `Request_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Status_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Review`
--

CREATE TABLE `Review` (
  `Review_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Prof_ID` int(11) NOT NULL,
  `Subject_ID` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Status_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Status`
--

CREATE TABLE `Status` (
  `Status_ID` int(11) NOT NULL,
  `Status_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Status`
--

INSERT INTO `Status` (`Status_ID`, `Status_Name`) VALUES
(1, 'Pending'),
(2, 'Approved'),
(3, 'Rejected');

-- --------------------------------------------------------

--
-- Table structure for table `Subject`
--

CREATE TABLE `Subject` (
  `Subject_ID` int(11) NOT NULL,
  `Subject_Code` varchar(20) NOT NULL,
  `Subject_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SubjectInfo`
--

CREATE TABLE `SubjectInfo` (
  `Request_ID` int(11) NOT NULL,
  `Subject_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `User_ID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL UNIQUE,
  `Password` varchar(255) NOT NULL,
  `isModerator` tinyint(1) DEFAULT 0,
  `isAdmin` tinyint(1) DEFAULT 0,
  `Status_ID` int(11) DEFAULT NULL,
  `Username` varchar(30) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Professor`
--
ALTER TABLE `Professor`
  ADD PRIMARY KEY (`Prof_ID`);

--
-- Indexes for table `ProfessorInfo`
--
ALTER TABLE `ProfessorInfo`
  ADD PRIMARY KEY (`Request_ID`,`Prof_ID`),
  ADD KEY `Prof_ID` (`Prof_ID`);

--
-- Indexes for table `Request`
--
ALTER TABLE `Request`
  ADD PRIMARY KEY (`Request_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Status_ID` (`Status_ID`);

--
-- Indexes for table `Review`
--
ALTER TABLE `Review`
  ADD PRIMARY KEY (`Review_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Prof_ID` (`Prof_ID`),
  ADD KEY `Subject_ID` (`Subject_ID`),
  ADD KEY `Status_ID` (`Status_ID`);

--
-- Indexes for table `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`Status_ID`);

--
-- Indexes for table `Subject`
--
ALTER TABLE `Subject`
  ADD PRIMARY KEY (`Subject_ID`);

--
-- Indexes for table `SubjectInfo`
--
ALTER TABLE `SubjectInfo`
  ADD PRIMARY KEY (`Request_ID`,`Subject_ID`),
  ADD KEY `Subject_ID` (`Subject_ID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Status_ID` (`Status_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Professor`
--
ALTER TABLE `Professor`
  MODIFY `Prof_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Request`
--
ALTER TABLE `Request`
  MODIFY `Request_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Review`
--
ALTER TABLE `Review`
  MODIFY `Review_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Status`
--
ALTER TABLE `Status`
  MODIFY `Status_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Subject`
--
ALTER TABLE `Subject`
  MODIFY `Subject_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ProfessorInfo`
--
ALTER TABLE `ProfessorInfo`
  ADD CONSTRAINT `professorinfo_ibfk_1` FOREIGN KEY (`Request_ID`) REFERENCES `Request` (`Request_ID`),
  ADD CONSTRAINT `professorinfo_ibfk_2` FOREIGN KEY (`Prof_ID`) REFERENCES `Professor` (`Prof_ID`);

--
-- Constraints for table `Request`
--
ALTER TABLE `Request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`User_ID`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`Status_ID`) REFERENCES `Status` (`Status_ID`);

--
-- Constraints for table `Review`
--
ALTER TABLE `Review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`User_ID`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`Prof_ID`) REFERENCES `Professor` (`Prof_ID`),
  ADD CONSTRAINT `review_ibfk_3` FOREIGN KEY (`Subject_ID`) REFERENCES `Subject` (`Subject_ID`),
  ADD CONSTRAINT `review_ibfk_4` FOREIGN KEY (`Status_ID`) REFERENCES `Status` (`Status_ID`);

--
-- Constraints for table `SubjectInfo`
--
ALTER TABLE `SubjectInfo`
  ADD CONSTRAINT `subjectinfo_ibfk_1` FOREIGN KEY (`Request_ID`) REFERENCES `Request` (`Request_ID`),
  ADD CONSTRAINT `subjectinfo_ibfk_2` FOREIGN KEY (`Subject_ID`) REFERENCES `Subject` (`Subject_ID`);

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Status_ID`) REFERENCES `Status` (`Status_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--heres the whole thing btw to make the db