//Below code sample copied over from CS340 activity 2 module

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials - uncomment before submission
// const pool = mysql.createPool({
//     waitForConnections: true,
//     connectionLimit   : 10,
//     host              : 'classmysql.engr.oregonstate.edu',
//     user              : 'cs340_fitzgibm',
//     password          : '0454',
//     database          : 'cs340_fitzgibm'
// }).promise(); // This makes it so we can use async / await rather than callbacks

// For testing on local mysql server - comment before submission
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'localhost',
    user              : 'root',
    password          : 'Spacepiracy1!',
    database          : 'term_project_test_db'
}).promise();

// Export it for use in our application
module.exports = pool;