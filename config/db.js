// Import required packages
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'gayu@123', // Leave empty if no password
  database: process.env.DB_NAME || 'event_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert to promise-based pool (for async/await)
const db = pool.promise();

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err.message);
  } else {
    console.log('✅ Connected to MySQL Database successfully!');
    connection.release();
  }
});

// Export the connection pool
module.exports = db;
