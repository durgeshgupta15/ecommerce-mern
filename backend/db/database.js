const mongoose = require('mongoose')
const logger = require('../logger')

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URI, {
            useNewUrlParser: true,
        })
        .then(() => {
            logger.info(
                `Mongodb connected with server: ${mongoose.connection.host}`
            )
        })
        .catch((err) => {
            logger.error(`Error connecting to MongoDB: ${err}`)
        })
}

module.exports = connectDatabase
