require('dotenv').config()

const express = require('express')
const cors = require('cors')

const dbConnection = require('./config/db')

const userRoutes = require('./routes/user.routes')
const applicationRoutes = require('./routes/application.routes')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("Hola User!")
})

app.use('/', userRoutes)
app.use('/', applicationRoutes)

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`)
    await dbConnection()
})