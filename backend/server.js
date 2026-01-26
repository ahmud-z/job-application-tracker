const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const PORT = 3000;

const app = express();

// set middlewares
app.use(cors());
app.use(express.json())

//  created db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'job_application_tracker_db'
})

connection.connect()


// send job applications list 
app.get("/", (req, res) => {
    connection.query('SELECT * FROM job_applications', (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
})

// create new job application post
app.post("/api/create", (req, res) => {
    const {
        company_name,
        position,
        applied_date,
        salary_range,
        location,
        notes,
        status,
    } = req.body;

    const sql = 'INSERT INTO job_applications (company_name,position,application_status,application_date,salary_range,location,notes) VALUES (?,?,?,?,?,?,?)';

    connection.query(sql, [company_name, position, status, applied_date, salary_range, location, notes], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database Error" })
        }
        res.status(201).json({ message: "Data Received", result })
    })
})



// delete job application
app.delete("/api/applications/:id", (req, res) => {
    const { id } = req.params;

    console.log("Post ID: ", id)
    const sql = `DELETE from job_applications WHERE id = ?`;

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database Error" })
        }

        if (result.affectedRows === 0) {
            res.status(400).json()
        }
        res.status(200).json({ message: "Job Application Deleted Succesfully", result })
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});