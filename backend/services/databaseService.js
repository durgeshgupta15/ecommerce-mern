const mongoose = require('mongoose')

const checkDatabaseClient = (config) => {
    return new Promise(async (resolve) => {
        const db = await mongoose.createConnection(config.DB_URI, {
            useNewUrlParser: true,
        })

        db.on('error', (error) => {
            db.close() // Close the Mongoose connection
            reject({
                status: false,
                error: error,
            }) // Reject the promise with the error
        })

        db.once('open', () => {
            const status = db.readyState // Get the connection status
            db.close() // Close the Mongoose connection
            resolve({
                status: status,
                error:
                    status !== null ? 'no error found' : 'some error occured',
                port: db.port,
                hostname: db.host,
                dbname: db.name,
            }) // Resolve the promise with the connection status
        })
    })
}

module.exports = { checkDatabaseClient }
