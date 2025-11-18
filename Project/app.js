//Code below has been tweaked from code samples provided in CS340 activity 2 and Web Application Exploration

/*
    SETUP
*/

//Sample Data
const games = [
    {
        gameID: 1,
        Game: 'Dark Souls 3',
        ReleaseYear: 2016,
        ESRB: 'Mature 17+',
        Developer: 'FromSoftware, Inc.'
    },
    {
        gameID: 2,
        Game: 'Hollow Knight',
        ReleaseYear: 2017,
        ESRB: 'Everyone 10+',
        Developer: 'Team Cherry'
    },
    {
        gameID: 3,
        Game: 'SILENT HILL 2',
        ReleaseYear: 2024,
        ESRB: 'Mature 17+',
        Developer: 'Bloober Team, SA'
    }
];


const ESRB = [
    { id: 1, name: 'E (Everyone)' },
    { id: 2, name: 'T (Teen)' },
    { id: 3, name: 'M (Mature 17+)' },
    { id: 4, name: 'AO (Adults Only 18+)' }
];

const users = [
    { userID: 1, Username: 'GreiratTheThief', Email: 'rooftopsleeper@gmail.com' },
    { userID: 2, Username: 'Eygonnawin', Email: 'eygonofcarim@gmail.com' },
    { userID: 3, Username: 'Tom', Email: 'tom123@hotmail.com' }
];

const lists = [
    { listID: 1, userID: 2, listName: 'Must Plays', isPublic: 1 },
    { listID: 2, userID: 3, listName: 'Top RPGs', isPublic: 1 },
    { listID: 3, userID: 1, listName: 'Buggiest Games', isPublic: 0 }
];

const liststogames = [
    { gamesListID: 1, List: "Top RPGs", User: "Tom", Game: "Dark Souls 3" },
    { gamesListID: 2, List: "Must Plays", User: "Eygonnawin", Game: "SILENT HILL 2" }
];

const reviews = [
    {
        reviewID: 1,
        User: "GreiratTheThief",
        Game: "Dark Souls 3",
        Review: 'This is the best game ever!',
        Rating: 100
    },
    {
        reviewID: 3,
        User: "Eygonnawin",
        Game: "SILENT HILL 2",
        Review: 'Not even scary.',
        Rating: 88
    },
    {
        reviewID: 2,
        User: "Tom",
        Game: "Hollow Knight",
        Review: 'I cannot believe they shipped this game with all these bugs.',
        Rating: 23
    }
];

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
        res.render('games', { games, ESRB });
    } catch (error) {
        console.error('Error rendering /games page:', error);
        res.status(500).send('An error occurred while rendering the games page.');
    }
});

// USERS
app.get('/users', async function (req, res) {
    try {
        res.render('users', { users });
    } catch (error) {
        console.error('Error rendering /users page:', error);
        res.status(500).send('An error occurred while rendering the users page.');
    }
});

// LISTS
app.get('/lists', async function (req, res) {
    try {
        res.render('lists', { lists, users });
    } catch (error) {
        console.error('Error rendering /lists page:', error);
        res.status(500).send('An error occurred while rendering the lists page.');
    }
});

// LISTS TO GAMES
app.get('/liststogames', async function (req, res) {
    try {
        res.render('liststogames', { liststogames, lists, games });
    } catch (error) {
        console.error('Error rendering /liststogames page:', error);
        res.status(500).send('An error occurred while rendering the liststogames page.');
    }
});

// REVIEWS
app.get('/reviews', async function (req, res) {
    try {
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