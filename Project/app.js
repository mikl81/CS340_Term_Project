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

app.post('/reset_db', async function (req, res) {
  try {
    let data = req.body;
    const query1 = `CALL sp_load_game_reviewdb()`
    await db.query(query1);
    console.log("DB reset correctly!");
  } catch (error) {
    console.error('Error rendering page:', error);
    res.status(500).send('An error occurred while reseting DB.');
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

app.post('/liststogames/delete', async function (req, res) {
    try{
        let data = req.body;
        const query1 = `CALL sp_delete_ltg(?)`
        await db.query(query1, [data.delete_ltg_id])
        console.log(`DELETE liststogames. ID: ${data.delete_ltg_id}`)
        res.redirect('/liststogames')
    } catch (error) {
    console.error('Error rendering page:', error);
    res.status(500).send('An error occurred while deleting row');
  } 
})

app.post('/liststogames/update', async function (req, res) {
  try{
    let data = req.body;
    const query1 = `UPDATE sp_update_ltg(?,?)`
    await db.query(query1, [data.update_ltg_id])
  } catch (error){

  }
})

// //CREATE LISTS TO GAMES - WIP
// app.post('/liststogames/create'), async function (req, res){
//     try{
//         //Parse frontend form
//         let data = req.body;

//         //Clean data

//         //Create and execute queries

//         //Store ID of last inserted row

//         //Redirect the users to the updated webpage
//     } catch (error){
//                 console.error('Error executing queries:', error);
//         // Send a generic error message to the browser
//         res.status(500).send(
//             'An error occurred while executing the database queries.'
//         );
//     }
// }

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
