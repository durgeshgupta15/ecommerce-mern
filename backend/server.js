const app = require('./app')
const logger = require('./logger')
const connectDatabase = require('./db/database')
const {
    SimpleHealthCheck,
    DetailedHealthCheck,
} = require('./helpers/healthChecker')
const { HealthCheckData } = require('./data/HealthCheckData')

// handle uncaught error
process.on('uncaughtException', (err) => {
    logger.error(`Shutting down the server error occured: ${err.message}`)
    process.exit(1)
})

// simple-health-check application
app.get('/', (req, res) => {
    res.send(SimpleHealthCheck())
})

//detailed health check application
app.get('/health-check', async (req, res) => {
    const data = await DetailedHealthCheck(HealthCheckData)
    res.send(data)
})

// connecting to DB
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    logger.info(`server is running on port: ${process.env.PORT}`)
})

// handle unhandled promise error
process.on('unhandledRejection', (err) => {
    logger.error(`Shutting down the server error occured: ${err.message}`)

    server.close(() => {
        process.exit(1)
    })
})
