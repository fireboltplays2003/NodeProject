//dbSingleton.js 
const mysql = require('mysql2');

let connection; // Variable for storing a single connection

const dbSingleton = {
    getConnection: () => {
        if (!connection) {
            // Create a connection only once
            connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'gym'
            });

            // Connect to the database
            connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to database:', err);
                    throw err;
                }
                console.log('Connected to MySQL!');
            });

            // Handle connection errors
            connection.on('error', (err) => {
                console.error('Database connection error:', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    connection = null; // Update the connection state
                }
            });
        }

        return connection; // Return the current connection
    },
};

module.exports = dbSingleton;