-- Jonathan Ektefaie
-- Michael Fitzgibbon
-- Group 84

-- Citation for the following code:
-- Date: 11/13/2025
-- Created by Michael Fitzgibbon and Jonathan Ektefaie
-- Based on instructions provided in explorations from OSU course CS340 - Introduction To Databases.
-- If AI tools were used: No AI was used in the creation of this file.

-- Game Reviews Database
DROP PROCEDURE IF EXISTS sp_load_game_reviewdb;
DELIMITER //
CREATE PROCEDURE sp_load_game_reviewdb()
BEGIN

    SET FOREIGN_KEY_CHECKS=0;
    SET AUTOCOMMIT=0;

    =================================================
    -- Table `Games`
    =================================================
    DROP TABLE IF EXISTS `Games`;

    CREATE TABLE IF NOT EXISTS `Games` (
    `gameID` INT AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `releaseYear` INT NOT NULL,
    `ESRB` VARCHAR(100) NOT NULL,
    `developer` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`gameID`)
    UNIQUE INDEX `gameID_UNIQUE` (`gameID` ASC) VISIBLE
    ) ENGINE=InnoDB;

    -- Insert Sample Data into Games
    INSERT INTO Games (title, releaseYear, ESRB, developer)
    VALUES
        ('Dark Souls 3', 2016, 'Mature 17+', 'FromSoftware, Inc.'),
        ('Hollow Knight', 2017, 'Everyone 10+', 'Team Cherry'),
        ('SILENT HILL 2', 2024, 'Mature 17+', 'Bloober Team, SA');

    =================================================
    -- Create Table for Users
    =================================================
    DROP TABLE IF EXISTS `Users`;

    CREATE TABLE IF NOT EXISTS `Users` (
    `userID` INT AUTO_INCREMENT NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    PRIMARY KEY (`userID`)
    UNIQUE INDEX `userID_UNIQUE` (`userID` ASC) VISIBLE
    ) ENGINE=InnoDB;

    -- Insert Sample Data into Users
    INSERT INTO Users (username, email)
    VALUES
        ('GreiratTheThief', 'rooftopsleeper@gmail.com'),
        ('Eygonnawin', 'eygonofcarim@gmail.com'),
        ('Tom', 'tom123@hotmail.com');

    =================================================
    -- Create Table for Reviews
    =================================================
    DROP TABLE IF EXISTS `Reviews`;

    CREATE TABLE IF NOT EXISTS `Reviews` (
    `reviewID` INT AUTO_INCREMENT NOT NULL,
    `userID` INT NOT NULL,
    `gameID` INT NOT NULL,
    `review` TEXT,
    `rating` INT NOT NULL,
    PRIMARY KEY (`reviewID`),
    UNIQUE INDEX `reviewID_UNIQUE` (`reviewID` ASC) VISIBLE,
    CONSTRAINT `fk_userID`
        FOREIGN KEY (`userID`)
        REFERENCES `Users` (`userID`)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_gameID`
        FOREIGN KEY (`gameID`)
        REFERENCES `Games` (`gameID`)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT `review_limit` CHECK (`rating` >= 1 AND `rating` <= 100)
    ) ENGINE=InnoDB;

    -- Insert Sample Data into Reviews
    INSERT INTO Reviews (userID, gameID, review, rating)
    VALUES
        (1, 1, 'This is the best game ever!', 100),
        (3, 2, 'I cannot believe they shipped this game with all these bugs.', 23),
        (2, 3, 'Not even scary.', 88);

    =================================================
    -- Create Table for Lists
    =================================================
    DROP TABLE IF EXISTS `Lists`;

    CREATE TABLE IF NOT EXISTS `Lists` (
    `listID` INT AUTO_INCREMENT NOT NULL,
    `userID` INT NOT NULL,
    `listName` VARCHAR(250) NOT NULL,
    `isPublic` BOOLEAN NOT NULL,
    PRIMARY KEY (`listID`),
    UNIQUE INDEX `listID_UNIQUE` (`listID` ASC) VISIBLE,
    CONSTRAINT `fk_userID`
        FOREIGN KEY (`userID`)
        REFERENCES `Users` (`userID`)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
    ) ENGINE=InnoDB;

    -- Insert Sample Data into Lists
    INSERT INTO Lists (userID, listName, isPublic)
    VALUES
        (2, 'Must Plays', TRUE),
        (3, 'Top RPGs', TRUE),
        (1, 'Buggiest Games', FALSE);

    =================================================
    -- Create Table for Lists to Games relationship
    =================================================
    DROP TABLE IF EXISTS `ListsToGames`;

    CREATE TABLE IF NOT EXISTS `ListsToGames` (
    `gamesListID` INT AUTO_INCREMENT NOT NULL,
    `listID` INT NOT NULL,
    `gameID` INT NOT NULL,
    PRIMARY KEY (`gamesListID`),
    UNIQUE INDEX `gamesListID_UNIQUE` (`gamesListID` ASC) VISIBLE,
    CONSTRAINT `fk_listID`
        FOREIGN KEY (`listID`)
        REFERENCES `Lists` (`listID`)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_gameID`
        FOREIGN KEY (`gameID`)
        REFERENCES `Games` (`gameID`)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
    ) ENGINE=InnoDB;

    -- Insert Sample Data into ListsToGames
    INSERT INTO ListsToGames (listID,gameID)
    VALUES
        (2, 1),
        (1, 3),
        (3, 2);

    SET FOREIGN_KEY_CHECKS=1;
    COMMIT;
END //

DELIMITER ;