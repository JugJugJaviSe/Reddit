CREATE DATABASE IF NOT EXISTS reddit_clone;

USE reddit_clone;

-- Kreiranje tabele za korisnike
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    korisnickoIme VARCHAR(50) NOT NULL UNIQUE,
    lozinka VARCHAR(500) NOT NULL
);

CREATE TABLE Community (
    CommunityId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) UNIQUE NOT NULL,
    Description TEXT,
    Rules TEXT,
    Type ENUM('Public', 'Restricted', 'Private', 'Mature') NOT NULL,
    Icon VARCHAR(255),
    MemberCount INT DEFAULT 0
);

CREATE TABLE Topics (
    TopicId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) UNIQUE NOT NULL,
    CategoryId INT NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES TopicCategory(CategoryId) ON DELETE CASCADE
);

CREATE TABLE TopicCategory (
    CategoryId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO TopicCategory (Name) VALUES
('Technology & Science'),   -- 1
('Entertainment'),          -- 2
('Sports & Fitness'),       -- 3
('Lifestyle'),              -- 4
('Education & Learning'),   -- 5
('Gaming'),                 -- 6
('Memes & Fun'),            -- 7
('Health & Wellness'),      -- 8
('Finance & Business'),     -- 9
('Love & Relationships');   -- 10

INSERT INTO Topics (Name, CategoryId) VALUES
('Technology', 1),
('Gaming', 6),
('Movies', 2),
('TV Shows', 2),
('Music', 2),
('Books', 5),
('Science', 1),
('Fitness', 3),
('Food', 4),
('Travel', 4),
('Programming', 1),
('Art', 2),
('Photography', 2),
('Sports', 3),
('Finance', 9),
('Education', 5),
('Anime', 6),
('Memes', 7),
('Politics', 2),
('Health', 8),
('Love', 10);




CREATE TABLE CommunityTopic (
    CommunityId INT NOT NULL,
    TopicId INT NOT NULL,
    PRIMARY KEY (CommunityId, TopicId),
    FOREIGN KEY (CommunityId) REFERENCES Community(CommunityId) ON DELETE CASCADE,
    FOREIGN KEY (TopicId) REFERENCES Topics(TopicId) ON DELETE CASCADE
);

