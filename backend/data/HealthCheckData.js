const { appConstants } = require('../constants/appConstants')

const HealthCheckData = {
    name: 'ecommerce',
    version: '1.0.0',
    integrations: [
        {
            type: appConstants.HealthType.Redis,
            name: appConstants.HealthCheckIntegration.HealthRedis,
            host: process.env.REDIS_HOST,
        },
        {
            type: appConstants.HealthType.Memcache,
            name: appConstants.HealthCheckIntegration.HealthMemcache,
            host: process.env.MEMECACHE_HOST,
        },
        {
            type: appConstants.HealthType.Web,
            name: appConstants.HealthCheckIntegration.HealthWeb,
            host: process.env.WEB_HOST,
        },
        {
            type: appConstants.HealthType.Database,
            name: appConstants.HealthCheckIntegration.HealthDatabase,
            DB_URI: process.env.DB_URI,
        },
        {
            type: appConstants.HealthType.Custom,
            name: appConstants.HealthCheckIntegration.HealthCustom,
            host: process.env.CUSTOM_HOST,
        },
    ],
}

module.exports = { HealthCheckData }
