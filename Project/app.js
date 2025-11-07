//Code below has been tweaked from code samples provided in CS340 activity 2 and Web Application Exploration

/*
    SETUP
*/

// Express
const express = require('express');  // We are using the express library for the web server
const app = express(); // We need to instantiate an express object to interact with the server in our code

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 6051;     // Set a port number

// Database 
const db = require('./database/db-connector');

//Handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

/*
    ROUTES
*/

// HOME
app.get('/', async function (req, res) {
    try {
        res.render('home');
    } catch (error) {
        console.error('Error rendering page:', error);
        res.status(500).send('An error occurred while rendering the page.');
    }
});

// GAMES
app.get('/games', async function (req, res) {
    try {
        const games = [
            {
                gameID: 1,
                title: 'Dark Souls 3',
                releaseYear: 2016,
                ESRB: 'Mature 17+',
                developer: 'FromSoftware, Inc.'
            },
            {
                gameID: 2,
                title: 'Hollow Knight',
                releaseYear: 2017,
                ESRB: 'Everyone 10+',
                developer: 'Team Cherry'
            },
            {
                gameID: 3,
                title: 'SILENT HILL 2',
                releaseYear: 2024,
                ESRB: 'Mature 17+',
                developer: 'Bloober Team, SA'
            }
        ];

        const ESRB = [
            { id: 1, name: 'E (Everyone)' },
            { id: 2, name: 'T (Teen)' },
            { id: 3, name: 'M (Mature 17+)' },
            { id: 4, name: 'AO (Adults Only 18+)' }
        ];

        res.render('games', { games, ESRB });
    } catch (error) {
        console.error('Error rendering /games page:', error);
        res.status(500).send('An error occurred while rendering the games page.');
    }
});

// USERS
app.get('/users', async function (req, res) {
    try {
        const users = [
            { userID: 1, username: 'Greirat', email: 'rooftopsleeper@gmail.com' },
            { userID: 2, username: 'Eygonnawin', email: 'eygonofcarim@gmail.com' },
            { userID: 3, username: 'Tom', email: 'tom123@hotmail.com' }
        ];
        res.render('users', { users });
    } catch (error) {
        console.error('Error rendering /users page:', error);
        res.status(500).send('An error occurred while rendering the users page.');
    }
});

// LISTS
app.get('/lists', async function (req, res) {
    try {
        const lists = [
            { listID: 1, userID: 2, listName: 'Must Plays', isPublic: true },
            { listID: 2, userID: 3, listName: 'Top RPGs', isPublic: true },
            { listID: 3, userID: 1, listName: 'Buggiest Games', isPublic: false }
        ];

        const users = [
            { userID: 1, username: 'Greirat' },
            { userID: 2, username: 'Eygonnawin' },
            { userID: 3, username: 'Tom' }
        ];

        res.render('lists', { lists, users });
    } catch (error) {
        console.error('Error rendering /lists page:', error);
        res.status(500).send('An error occurred while rendering the lists page.');
    }
});

// LISTS TO GAMES
app.get('/liststogames', async function (req, res) {
    try {
        const liststogames = [
            { gamesListID: 1, listID: 2, gameID: 1 },
            { gamesListID: 2, listID: 1, gameID: 3 },
            { gamesListID: 3, listID: 3, gameID: 2 }
        ];

        const lists = [
            { listID: 1, listName: 'Must Plays' },
            { listID: 2, listName: 'Top RPGs' },
            { listID: 3, listName: 'Buggiest Games' }
        ];

        const games = [
            { gameID: 1, title: 'Dark Souls 3' },
            { gameID: 2, title: 'Hollow Knight' },
            { gameID: 3, title: 'SILENT HILL 2' }
        ];

        res.render('liststogames', { liststogames, lists, games });
    } catch (error) {
        console.error('Error rendering /liststogames page:', error);
        res.status(500).send('An error occurred while rendering the liststogames page.');
    }
});

// REVIEWS
app.get('/reviews', async function (req, res) {
    try {
        const reviews = [
            {
                reviewID: 1,
                userID: 1,
                gameID: 1,
                review: 'This is the best game ever!',
                rating: 100
            },
            {
                reviewID: 2,
                userID: 3,
                gameID: 2,
                review: 'I cannot believe they shipped this game with all these bugs.',
                rating: 23
            },
            {
                reviewID: 3,
                userID: 2,
                gameID: 3,
                review: 'Not even scary.',
                rating: 88
            }
        ];

        const users = [
            { userID: 1, username: 'Greirat' },
            { userID: 2, username: 'Eygonnawin' },
            { userID: 3, username: 'Tom' }
        ];

        const games = [
            { gameID: 1, title: 'Dark Souls 3' },
            { gameID: 2, title: 'Hollow Knight' },
            { gameID: 3, title: 'SILENT HILL 2' }
        ];

        res.render('reviews', { reviews, users, games });
    } catch (error) {
        console.error('Error rendering /reviews page:', error);
        res.status(500).send('An error occurred while rendering the reviews page.');
    }
});
/*
    LISTENER
*/

app.listen(PORT, () => {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});