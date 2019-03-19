import mongoose from 'mongoose';
import appConfig from './config';

// Build the connection string
const dbURI = appConfig.database.connection.connectString;

// Create the database connection
mongoose.connect(dbURI, {
    useCreateIndex: true,
    poolSize: appConfig.database.connection.poolSize,
    useNewUrlParser: true,
    autoReconnect: appConfig.database.connection.autoReconnect,
    socketTimeoutMS: appConfig.database.connection.socketTimeoutMS,
    connectTimeoutMS: appConfig.database.connection.connectTimeoutMS,
});

// connection events

mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

export default mongoose.connection;
