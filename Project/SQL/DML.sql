-- Jonathan Ektefaie
-- Michael Fitzgibbon
-- Group 84

-- Citation for the following code:
-- Date: 11/13/2025
-- Created by Michael Fitzgibbon and Jonathan Ektefaie
-- Based on instructions provided in explorations from OSU course CS340 - Introduction To Databases.
-- If AI tools were used: No AI was used in the creation of this file.

=================================================
-- Games Queries
=================================================
-- Get all games and their average ratings for the Games page.
SELECT
    Games.gameID,
    Games.title as Game,
    Games.developer as Developer,
    Games.ESRB,
    Games.releaseYear as ReleaseYear
FROM Games;

-- Get all Game IDs and titles for Game dropdown.
SELECT 
    gameID, title 
FROM 
    Games
ORDER BY
    title;

=================================================
-- Users Queries
=================================================
-- Get all users for the Users page.
SELECT * FROM Users;

=================================================
-- Reviews Queries
=================================================
-- Get all reviews for the Reviews page.
SELECT
    Reviews.reviewID,
    Users.username as User,
    Games.title as Game,
    Reviews.review as Review,
    Reviews.rating as Rating
FROM Users
INNER JOIN Reviews ON Users.userID = Reviews.userID
INNER JOIN Games ON Reviews.gameID = Games.gameID
ORDER BY Reviews.rating DESC;

=================================================
-- Lists Queries
=================================================
-- Get all lists for the Lists page.
SELECT * FROM Lists;

-- Get all List IDs and names for List dropdown.
SELECT 
    listID, listName 
FROM 
    Lists
ORDER BY 
    listName;

=================================================
-- ListsToGames Queries
=================================================
-- Get all public lists for the ListsToGames page.
SELECT
    ListsToGames.gamesListID,
    Lists.listName as List,
    Users.username as User,
    Games.title as Game
FROM ListsToGames
JOIN Lists ON ListsToGames.listID = Lists.listID
JOIN Users ON Lists.userID = Users.userID
JOIN Games ON ListsToGames.gameID = Games.gameID
WHERE Lists.isPublic = TRUE
ORDER BY Users.username;

-- Create a new entry in ListsToGames.
INSERT INTO ListsToGames (listID, gameID)
VALUES (@listIDFromDropDown, @gameIDFromDropDown);

-- Update an entry in ListsToGames.
UPDATE ListsToGames
SET gameID = @gameIDFromDropDown
WHERE listID = @listIDFromDropDown AND gameID = @previousGameID;

-- Delete an entry from ListsToGames.
DELETE FROM ListsToGames
WHERE listID = @listIDFromDropDown AND gameID = @gameIDFromDropDown;
