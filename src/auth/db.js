const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Max connections in the pool
    host: "localhost", // Use lowercase
    user: "root",
    password: "Sql@worst123", // Replace with your actual password
    database: "travel_web", // Replace with your actual database name
    port: 3306 // Ensure this matches your MySQL server configuration
});

// Function to connect and handle errors
const handleConnection = () => {
    // Test the connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                console.error("Database connection was closed. Reconnecting...");
                handleConnection(); // Retry connection
            } else if (err.code === "ER_CON_COUNT_ERROR") {
                console.error("Too many connections to the database.");
            } else if (err.code === "ECONNREFUSED") {
                console.error("Connection to the database was refused. Ensure the database is running.");
            } else {
                console.error("Database error:", err);
            }
        }

        if (connection) {
            console.log("Successfully connected to MySQL database.");
            connection.release(); // Release the connection back to the pool
        }
    });
};

// Handle errors during runtime
pool.on("error", (err) => {
    console.error("Database runtime error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Connection lost. Attempting to reconnect...");
        handleConnection();
    } else {
        throw err; // Handle unexpected errors
    }
});

// Call handleConnection to initialize connection handling
handleConnection();

// Export the pool for use in queries
module.exports = pool;
