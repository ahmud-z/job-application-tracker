const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const PORT = 3000;

const app = express();


// Middlewares
app.use(cors());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'job_application_tracker_db'
})

connection.connect()

app.get("/", (req, res) => {
    connection.query('SELECT * FROM job_applications', (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})

app.listen(PORT, "localhost", (err) => {
    if (!err) {
        console.log("Server Running At: http://localhost:3000")
    }
})