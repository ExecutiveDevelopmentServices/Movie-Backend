const env = process.env.NODE_ENV || 'development';
const configurations = require('./config.json');

console.log('Current environment : ', env);
process.env.PORT = configurations[env].server.port;

module.exports = configurations[env];
