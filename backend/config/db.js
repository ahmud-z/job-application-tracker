const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
    } catch (error) {
        console.log("DB Connection Failed")
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnection