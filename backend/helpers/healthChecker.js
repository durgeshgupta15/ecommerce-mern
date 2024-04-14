const { appConstants } = require('../constants/appConstants')
const { checkDatabaseClient } = require('../services/databaseService')
const { CheckRedisClient } = require('../services/redisService')

const SimpleHealthCheck = () => {
    return {
        status: 'full functional',
    }
}

const DetailedHealthCheck = async (config) => {
    const promiseList = []
    const start = new Date().getTime()

    config &&
        config.integrations &&
        config.integrations.forEach((item) => {
            switch (item.type) {
                // case appConstants.HealthType.Redis:
                //     return promiseList.push(checkHealthRedis(item));
                // case appConstants.HealthType.Memcache:
                //     return promiseList.push(checkHealthMemcache(item));
                // case appConstants.HealthType.Web:
                //     return promiseList.push(checkHealthWeb(item));
                case appConstants.HealthType.Database:
                    return promiseList.push(checkHealthDatabase(item))
                // case appConstants.HealthType.Custom:
                //     return promiseList.push(checkHealthCustom(item))
            }
        })

    const results = await Promise.all(promiseList)
    const integrations = results && results.map((item) => item)
    return {
        name: config.name,
        version: config.version || '1.0.0',
        date: new Date(),
        duration: getDeltaTime(start),
        integrations,
    }
}

const checkHealthRedis = async (config) => {
    const start = new Date().getTime()
    // const result = await CheckRedisClient(config);
    // return {
    //     name: appConstants.HealthCheckIntegration.HealthRedis,
    //     status: result.status,
    //     response_time: getDeltaTime(start),
    //     port: config.port || appConstants.DefaultPorts.RedisPort,
    //     error: result.error
    // }
}

const checkHealthMemcache = async (config) => {
    // const start = new Date().getTime();
    // const result = await checkMemcacheClient(config);
    // return {
    //     name: appConstants.HealthCheckIntegration.HealthMemcache,
    //     status: result.status,
    //     response_time: getDeltaTime(start),
    //     port: config.port || appConstants.DefaultPorts.MemcachePort,
    //     error: result.error
    // }
}

const checkHealthWeb = (config) => {}

const checkHealthDatabase = async (config) => {
    const start = new Date().getTime()
    const result = await checkDatabaseClient(config)
    return {
        name: config.name,
        status: result.status,
        response_time: getDeltaTime(start),
        port: result.port || appConstants.DefaultPorts.DatabasePort,
        error: result.error,
    }
}

const checkHealthCustom = async (config) => {}

const getDeltaTime = (time) => {
    return (new Date().getTime - time) / 1000
}

module.exports = {
    SimpleHealthCheck,
    DetailedHealthCheck,
}
