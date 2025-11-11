// Import required packages
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.getConnection()
  .then(() => console.log('✅ Connected to MySQL database'))
  .catch(err => console.error('❌ Error connecting to MySQL:', err.message));
// Export the connection pool
module.exports = db;
