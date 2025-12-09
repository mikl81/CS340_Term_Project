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
    SET FOREIGN_KEY_CHECKS = 0;

    DROP TABLE IF EXISTS ListsToGames;
    DROP TABLE IF EXISTS Lists;
    DROP TABLE IF EXISTS Reviews;
    DROP TABLE IF EXISTS Users;
    DROP TABLE IF EXISTS Games;

    SET FOREIGN_KEY_CHECKS = 1;

    -- Create Games Table and Insert Data
    CREATE TABLE Games (
        gameID INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        releaseYear INT NOT NULL,
        ESRB VARCHAR(100) NOT NULL,
        developer VARCHAR(100) NOT NULL
    );

    INSERT INTO Games (title, releaseYear, ESRB, developer) VALUES
        ('Dark Souls 3', 2016, 'Mature 17+', 'FromSoftware, Inc.'),
        ('Hollow Knight', 2017, 'Everyone 10+', 'Team Cherry'),
        ('SILENT HILL 2', 2024, 'Mature 17+', 'Bloober Team, SA');

    -- Create Users Table and Insert Data
    CREATE TABLE Users (
        userID INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        email VARCHAR(254) NOT NULL
    );

    INSERT INTO Users (username, email) VALUES
        ('GreiratTheThief', 'rooftopsleeper@gmail.com'),
        ('Eygonnawin', 'eygonofcarim@gmail.com'),
        ('Tom', 'tom123@hotmail.com');

    -- Create Reviews Table and Insert Data
    -- Uses ON DELETE CASCADE to remove reviews if associated user or game is deleted
    CREATE TABLE Reviews (
        reviewID INT AUTO_INCREMENT PRIMARY KEY,
        userID INT NOT NULL,
        gameID INT NOT NULL,
        review TEXT,
        rating INT NOT NULL,
        CONSTRAINT fk_reviews_user FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
        CONSTRAINT fk_reviews_game FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
        CHECK (rating >= 1 AND rating <= 100)
    );

    INSERT INTO Reviews (userID, gameID, review, rating) VALUES
        (1, 1, 'This is the best game ever!', 100),
        (3, 2, 'I cannot believe they shipped this game with all these bugs.', 23),
        (2, 3, 'Not even scary.', 88);

    -- Create Lists Table and Insert Data
    -- Uses ON DELETE CASCADE to remove lists if associated user is deleted
    CREATE TABLE Lists (
        listID INT AUTO_INCREMENT PRIMARY KEY,
        userID INT NOT NULL,
        listName VARCHAR(250) NOT NULL,
        isPublic BOOLEAN NOT NULL,
        CONSTRAINT fk_lists_user FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
    );

    INSERT INTO Lists (userID, listName, isPublic) VALUES
        (2, 'Must Plays', TRUE),
        (3, 'Top RPGs', TRUE),
        (1, 'Buggiest Games', FALSE);

    -- Create ListsToGames Table and Insert Data
    -- Uses ON DELETE CASCADE to remove entries if associated list or game is deleted
    CREATE TABLE ListsToGames (
        gamesListID INT AUTO_INCREMENT PRIMARY KEY,
        listID INT NOT NULL,
        gameID INT NOT NULL,
        CONSTRAINT fk_ltg_list FOREIGN KEY (listID) REFERENCES Lists(listID) ON DELETE CASCADE,
        CONSTRAINT fk_ltg_game FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE
    );

    INSERT INTO ListsToGames (listID, gameID) VALUES
        (2, 1),
        (1, 3),
        (3, 2);
END //

DELIMITER ;

-- Delete ListToGames Stored Procedure

DROP PROCEDURE IF EXISTS sp_delete_ltg;
DELIMITER //
CREATE PROCEDURE sp_delete_ltg(IN gl_id INT)
BEGIN
    DECLARE ERROR_MESSAGE VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM ListsToGames WHERE gamesListID = gl_id;
        
        IF ROW_COUNT() = 0 THEN
            SET ERROR_MESSAGE = CONCAT('No gamesList found with gamesListID: ', gl_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ERROR_MESSAGE;
        END IF;
    COMMIT;

END //
DELIMITER ;

-- Create ListToGames Stored Procedure

DROP PROCEDURE IF EXISTS sp_create_ltg;
DELIMITER //
CREATE PROCEDURE sp_create_ltg(
    IN list_id INT, 
    IN game_id INT,
    OUT ltg_id INT)
BEGIN
    INSERT INTO ListsToGames (listID, gameID)
    VALUES (list_id, game_id);

    SELECT LAST_INSERT_ID() INTO ltg_id;
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;


-- Update ListToGames Stored Procedure

DROP PROCEDURE IF EXISTS sp_update_ltg;
DELIMITER //
CREATE PROCEDURE sp_update_ltg(
    IN ltg_id INT,
    IN list_id INT, 
    IN game_id INT)

BEGIN
    UPDATE ListsToGames
    SET listID = list_id,
        gameID = game_id
    WHERE id = ltg_id;

END //
DELIMITER ;