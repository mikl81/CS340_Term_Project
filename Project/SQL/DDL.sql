-- Jonathan Ektefaie
-- Michael Fitzgibbon
-- Group 84

-- Citation for the following code:
-- Date: 11/13/2025
-- Created by Michael Fitzgibbon and Jonathan Ektefaie
-- Based on instructions provided in explorations from OSU course CS340 - Introduction To Databases.
-- If AI tools were used: No AI was used in the creation of this file.

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

-- Create Table for Games
CREATE TABLE Games(
	gameID int AUTO_INCREMENT NOT NULL,
    title varchar(100) NOT NULL,
    releaseYear int NOT NULL,
    ESRB varchar(100) NOT NULL,
    developer varchar(100) NOT NULL,
    PRIMARY KEY (gameId)
);
-- Create Table for Users
CREATE TABLE Users(
	userID int AUTO_INCREMENT NOT NULL,
    username varchar(20) NOT NULL,
    email varchar(254) NOT NULL,
    PRIMARY KEY (userID)
);
-- Create Table for Reviews
CREATE TABLE Reviews(
	reviewID int AUTO_INCREMENT NOT NULL,
    userID int NOT NULL,
    gameID int NOT NULL,
    review text,
    rating int NOT NULL,
    PRIMARY KEY (reviewID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
    CONSTRAINT review_limit CHECK (rating >=1 AND rating <=100)
);
-- Create Table for Lists
CREATE TABLE Lists(
	listID int AUTO_INCREMENT NOT NULL,
    userID int NOT NULL,
    listName varchar(250) NOT NULL,
    isPublic BOOLEAN NOT NULL,
    PRIMARY KEY (listID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);
-- Create Table for Lists to Games relationship
CREATE TABLE ListsToGames(
	gamesListID int AUTO_INCREMENT NOT NULL,
    listID int NOT NULL,
    gameID int NOT NULL,
    PRIMARY KEY (gamesListID),
    FOREIGN KEY (listID) REFERENCES Lists(listID) ON DELETE CASCADE,
    FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE
);
-- Insert Sample Data into Users
INSERT INTO Users (
    username,
    email
)
VALUES
    (
        'GreiratTheThief',
        'rooftopsleeper@gmail.com'
    ),
    (
        'Eygonnawin',
        'eygonofcarim@gmail.com'
    ),
    (
        'Tom',
        'tom123@hotmail.com'
    );
-- Insert Sample Data into Games
INSERT INTO Games (
    title,
    releaseYear,
    ESRB,
    developer
)
VALUES
    (
        'Dark Souls 3', 
        2016, 
        'Mature 17+', 
        'FromSoftware, Inc.'
    ),
    (
        'Hollow Knight', 
        2017, 
        'Everyone 10+', 
        'Team Cherry'
    ),
    (
        'SILENT HILL 2', 
        2024, 
        'Mature 17+', 
        'Bloober Team, SA'
    );
-- Insert Sample Data into Lists
INSERT INTO Lists (
    userID,
    listName,
    isPublic
)
VALUES
    (
        2,
        'Must Plays',
        TRUE
    ),
    (
        3,
        'Top RPGs',
        TRUE
    ),
    (
        1,
        'Buggiest Games',
        FALSE
    );
-- Insert Sample Data into ListsToGames
INSERT INTO ListsToGames (
    listID,
    gameID
)
VALUES
    (
        2,
        1
    ),
    (
        1,
        3
    ),
    (
        3,
        2
    );
-- Insert Sample Data into Reviews
INSERT INTO Reviews (
    userID,
    gameID,
    review,
    rating
)
VALUES
    (
        1,
        1,
        'This is the best game ever!',
        100
    ),
    (
        3,
        2,
        'I cannot believe they shipped this game with all these bugs.',
        23
    ),
    (
        2,
        3,
        'Not even scary.',
        88
    );

SET FOREIGN_KEY_CHECKS=1;
COMMIT;