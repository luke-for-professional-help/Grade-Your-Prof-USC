CREATE TABLE Status (
  Status_ID INT AUTO_INCREMENT PRIMARY KEY,
  Status_Name VARCHAR(50) NOT NULL
);

CREATE TABLE User (
  User_ID INT AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  isModerator BOOLEAN DEFAULT FALSE,
  isAdmin BOOLEAN DEFAULT FALSE,
  Status_ID INT,
  FOREIGN KEY (Status_ID) REFERENCES Status(Status_ID)
);

CREATE TABLE Professor (
  Prof_ID INT AUTO_INCREMENT PRIMARY KEY,
  Professor_Name VARCHAR(100) NOT NULL,
  Professor_img VARCHAR(255)
);

CREATE TABLE Subject (
  Subject_ID INT AUTO_INCREMENT PRIMARY KEY,
  Subject_Code VARCHAR(20) NOT NULL,
  Subject_Name VARCHAR(100) NOT NULL
);

CREATE TABLE Request (
  Request_ID INT AUTO_INCREMENT PRIMARY KEY,
  User_ID INT NOT NULL,
  Status_ID INT NOT NULL,
  FOREIGN KEY (User_ID) REFERENCES User(User_ID),
  FOREIGN KEY (Status_ID) REFERENCES Status(Status_ID)
);

CREATE TABLE ProfessorInfo (
  Request_ID INT NOT NULL,
  Prof_ID INT NOT NULL,
  PRIMARY KEY (Request_ID, Prof_ID),
  FOREIGN KEY (Request_ID) REFERENCES Request(Request_ID),
  FOREIGN KEY (Prof_ID) REFERENCES Professor(Prof_ID)
);

CREATE TABLE SubjectInfo (
  Request_ID INT NOT NULL,
  Subject_ID INT NOT NULL,
  PRIMARY KEY (Request_ID, Subject_ID),
  FOREIGN KEY (Request_ID) REFERENCES Request(Request_ID),
  FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID)
);

CREATE TABLE Review (
  Review_ID INT AUTO_INCREMENT PRIMARY KEY,
  User_ID INT NOT NULL,
  Prof_ID INT NOT NULL,
  Subject_ID INT NOT NULL,
  Date DATE,
  Description TEXT,
  Status_ID INT,
  FOREIGN KEY (User_ID) REFERENCES User(User_ID),
  FOREIGN KEY (Prof_ID) REFERENCES Professor(Prof_ID),
  FOREIGN KEY (Subject_ID) REFERENCES Subject(Subject_ID),
  FOREIGN KEY (Status_ID) REFERENCES Status(Status_ID)
);

--heres the whole thing btw to make the db