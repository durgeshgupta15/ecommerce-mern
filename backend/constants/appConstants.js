const appConstants = {
    HealthType: {
        Redis: 'redis',
        Memcache: 'memcache',
        Web: 'web',
        Database: 'database',
        Custom: 'custom',
    },
    HealthCheckIntegration: {
        HealthRedis: 'redis integrated',
        HealthMemcache: 'Memcache integrated',
        HealthWeb: 'Web integrated API',
        HealthDatabase: 'Database integrated',
        HealthCustom: 'Custom integration',
    },
    DefaultPorts: {
        RedisPort: 4000,
        MemcachePort: 5000,
        WebPort: 8000,
        DatabasePort: 27017,
        CustomPort: 9099,
    },
}

module.exports = { appConstants }
