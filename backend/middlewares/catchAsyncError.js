const logger = require('../logger/index')

module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch((error) => {
        // Log the error
        logger.error(`An error occurred: ${error.stack}`)

        // Pass the error to the error handling middleware
        next(error)
    })
}
