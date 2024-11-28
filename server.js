// ======== Imports - packages and files ======== //
const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();
const cors = require('cors');


// ========== MIDDLEWARE ========== //
app.use(cors());

// ========== DATABASE CONNECTION ========== //
// using pool connection - recommended
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASS, 
    database: process.env.MYSQL_DATABASE, 
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0, 
})


// ========== API ENDPOINTS ============ //

app.get('/', (req, res) => {
    console.log("The / endpoint was hit")

    pool.query(`SELECT * FROM projects`, (err, result) => {
        if (err) {
            // Handle the error
            console.log(err);
            return res.status(500).json({ errorMessage: "An error occurred fetching data", error: err })
        } else {
            // Query was successful, send back the data
            return res.json(result);
        }
    })
})



// ========== PORT =========== //
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
.on("error", (err) => {
    console.log(err)
})