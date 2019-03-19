#!/usr/bin/env node

/**
 * Module dependencies.
 */


import debugFactory from 'debug';
import http from 'http';
import app from '../main';

const debug = debugFactory('movie-api:server');

/**
 * Get port from environment and store in Express.
 */
process.title = 'movie-api';
const appPort = normalizePort(process.env.PORT || '3000');
app.set('port', appPort);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(appPort);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof appPort === 'string'
        ? `Pipe ${appPort}`
        : `Port ${appPort}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
