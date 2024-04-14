const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cron = require('node-cron')
const logger = require('./logger')
const { DetailedHealthCheck } = require('./helpers/healthChecker')
const { HealthCheckData } = require('./data/HealthCheckData')

dotenv.config()

// Creating a cron job which runs on every 10 second
// cron.schedule('*/10 * * * * *', async () => {
//     logger.info('checking application health')
//     try {
//         const health = await DetailedHealthCheck(HealthCheckData)
//         logger.info(`apllication health is: ${JSON.stringify(health)}`);
//     } catch (err) {
//         logger.error(`Error occured during health-check ${err}`)
//     }
// })




module.exports = app
