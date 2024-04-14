const winston = require('winston')
const { combine, timestamp, printf, colorize, align } = winston.format
const { DailyRotateFile } = require('winston-daily-rotate-file')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

// Load environment variables
const envPath = process.argv.mode ? '.env.production' : '.env.development'
dotenv.config({ path: envPath })

// Ensure the logs folder exists
const logFolderPath = process.env.LOG_PATH
if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath, { recursive: true })
}

// Define transports for logging
const transportArr = [
    new winston.transports.DailyRotateFile({
        filename: path.join(logFolderPath, 'tn-backend-info-log'),
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d',
        prepend: true,
        level: 'info',
    }),
    new winston.transports.DailyRotateFile({
        filename: path.join(logFolderPath, 'tn-backend-error-log'),
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d',
        prepend: true,
        level: 'error',
    }),
]

// Add debug log transport if DEBUG_LOG is true
if (process.env.DEBUG_LOG === 'true') {
    transportArr.push(
        new winston.transports.DailyRotateFile({
            filename: path.join(logFolderPath, 'tn-backend-debug-log'),
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d',
            prepend: true,
            level: 'debug',
        })
    )
}

// Define console options
const consoleOptions = {
    level: 'debug',
    handleException: true,
    json: true,
    colorize: true,
}

// Create logger
const logger = winston.createLogger({
    transports: transportArr.concat(
        new winston.transports.Console(consoleOptions)
    ),
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: 'tn-backend' },
})

module.exports = logger
