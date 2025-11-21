//Code below has been tweaked from code samples provided in CS340 activity 2 and Web Application Exploration

/*
    SETUP
*/

//Select Querys

//Create select query
const select_games = `SELECT
Games.gameID,
Games.title as Game,
Games.developer as Developer,
Games.ESRB,
Games.releaseYear as ReleaseYear
FROM Games;`

const select_users = `SELECT 
    Users.userID,
    Users.username as Username,
    Users.email as Email
 FROM Users;`

const select_reviews = `SELECT
    Reviews.reviewID,
    Users.username as User,
    Games.title as Game,
    Reviews.review as Review,
    Reviews.rating as Rating
FROM Users
INNER JOIN Reviews ON Users.userID = Reviews.userID
INNER JOIN Games ON Reviews.gameID = Games.gameID
ORDER BY Reviews.rating DESC;`

const select_lists = `SELECT
    Lists.listID,
    Users.username as User,
    Lists.listName as Name,
    Lists.isPublic as Public 
FROM Lists
INNER JOIN Users ON Lists.userID = Users.userID;`

const select_lists_to_games = `SELECT
    ListsToGames.gamesListID,
    Lists.listName as List,
    Users.username as User,
    Games.title as Game
FROM ListsToGames
JOIN Lists ON ListsToGames.listID = Lists.listID
JOIN Users ON Lists.userID = Users.userID
JOIN Games ON ListsToGames.gameID = Games.gameID
WHERE Lists.isPublic = TRUE
ORDER BY Users.username;`

const lists = [
  { listID: 1, userID: 2, listName: 'Must Plays', isPublic: 1 },
  { listID: 2, userID: 3, listName: 'Top RPGs', isPublic: 1 },
  { listID: 3, userID: 1, listName: 'Buggiest Games', isPublic: 0 }
]

const liststogames = [
  { gamesListID: 1, List: 'Top RPGs', User: 'Tom', Game: 'Dark Souls 3' },
  {
    gamesListID: 2,
    List: 'Must Plays',
    User: 'Eygonnawin',
    Game: 'SILENT HILL 2'
  }
]

const reviews = [
  {
    reviewID: 1,
    User: 'GreiratTheThief',
    Game: 'Dark Souls 3',
    Review: 'This is the best game ever!',
    Rating: 100
  },
  {
    reviewID: 3,
    User: 'Eygonnawin',
    Game: 'SILENT HILL 2',
    Review: 'Not even scary.',
    Rating: 88
  },
  {
    reviewID: 2,
    User: 'Tom',
    Game: 'Hollow Knight',
    Review: 'I cannot believe they shipped this game with all these bugs.',
    Rating: 23
  }
]

// Express
const express = require('express') // We are using the express library for the web server
const app = express() // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 6051 // Set a port number

// Database
const db = require('./database/db-connector')

//Handlebars
const { engine } = require('express-handlebars')
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

/*
    ROUTES
*/

// HOME
app.get('/', async function (req, res) {
  try {
    res.render('home')
  } catch (error) {
    console.error('Error rendering page:', error)
    res.status(500).send('An error occurred while rendering the page.')
  }
})

// GAMES
app.get('/games', async function (req, res) {
  try {
    const [games] = await db.query(select_games)
    res.render('games', { games })
  } catch (error) {
    console.error('Error rendering /games page:', error)
    res.status(500).send('An error occurred while rendering the games page.')
  }
})

// USERS
app.get('/users', async function (req, res) {
  try {
    const [users] = await db.query(select_users)
    res.render('users', { users })
  } catch (error) {
    console.error('Error rendering /users page:', error)
    res.status(500).send('An error occurred while rendering the users page.')
  }
})

// LISTS
app.get('/lists', async function (req, res) {
  try {
    const [lists] = await db.query(select_lists)
    res.render('lists', { lists })
  } catch (error) {
    console.error('Error rendering /lists page:', error)
    res.status(500).send('An error occurred while rendering the lists page.')
  }
})

// LISTS TO GAMES
app.get('/liststogames', async function (req, res) {
  try {
    const [liststogames] = await db.query(select_lists_to_games)
    const [lists] = await db.query(select_lists)
    const [games] = await db.query(select_games)
    res.render('liststogames', { liststogames, lists, games })
  } catch (error) {
    console.error('Error rendering /liststogames page:', error)
    res
      .status(500)
      .send('An error occurred while rendering the liststogames page.')
  }
})

// REVIEWS
app.get('/reviews', async function (req, res) {
  try {
    const [reviews] = await db.query(select_reviews)
    res.render('reviews', { reviews })
  } catch (error) {
    console.error('Error rendering /reviews page:', error)
    res.status(500).send('An error occurred while rendering the reviews page.')
  }
})
/*
    LISTENER
*/

app.listen(PORT, () => {
  console.log(
    'Express started on http://localhost:' +
      PORT +
      '; press Ctrl-C to terminate.'
  )
})
