const mysql = require('mysql2');
require('dotenv').config();

console.log('Testing database connection...');
console.log('Configuration:');
console.log('Host:', process.env.DB_HOST || 'localhost');
console.log('User:', process.env.DB_USER || 'root');
console.log('Password:', process.env.DB_PASSWORD === '' ? '(empty string)' : process.env.DB_PASSWORD || '(undefined)');
console.log('Database:', process.env.DB_NAME || 'event_portal');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'event_portal'
});

connection.connect((err) => {
  if (err) {
    console.error('\n❌ Connection failed:', err.message);
    console.error('Error code:', err.code);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check if MySQL is running in XAMPP Control Panel');
    console.log('2. Verify your MySQL root password');
    console.log('3. If you have a password, update DB_PASSWORD in .env file');
    console.log('4. Ensure event_portal database exists');
    process.exit(1);
  }
  
  console.log('\n✅ Database connected successfully!');
  
  // Test query
  connection.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Error querying tables:', err.message);
    } else {
      console.log('\nTables in database:');
      console.log(results);
    }
    connection.end();
  });
});
