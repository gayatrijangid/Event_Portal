const mysql = require('mysql2/promise');

const db = mysql.createPool(process.env.DATABASE_URL);

module.exports = db;












// const mysql = require('mysql2/promise');

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// });

// // Test the connection
// (async () => {
//   try {
//     const connection = await db.getConnection();
//     console.log('✅ Connected to MySQL database');
//     connection.release(); // release back to pool
//   } catch (err) {
//     console.error('❌ Error connecting to MySQL:', err.message);
//   }
// })();

// module.exports = db;
