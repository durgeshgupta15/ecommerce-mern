// const { createClient } = require('redis');

// const CheckRedisClient = (config) => {
//     return new Promise(async (resolve) => {
//         const client = await createClient({
//             host: config.host,
//             db: config.db || 0,
//             password: config.auth?.password,
//             connect_timeout: config.timeout || Defaults.RedisTimeout,
//             port: config.port || 6379,
//         });

//         client.on('error', (error) => {
//             client.quit(); // Close the Redis connection
//             resolve({
//                 status: false,
//                 error
//             })
//         });

//         client.ping(status => {
//             client.end();
//             resolve({
//                 status: status,
//                 error: status == !null ? status : undefined
//             })
//         })
//     });
// };

// module.exports = { CheckRedisClient };
