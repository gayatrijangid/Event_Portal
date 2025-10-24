const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔧 Setting up database...\n');
    
    // Connect without specifying database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'gayu@123',
      multipleStatements: true
    });
    
    console.log('✅ Connected to MySQL server');
    
    // Read SQL file
    const sqlFile = path.join(__dirname, 'database', 'schema.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    console.log('📄 Executing schema.sql...\n');
    
    // Execute SQL
    await connection.query(sql);
    
    console.log('✅ Database setup completed successfully!');
    console.log('\n📊 Database: event_portal');
    console.log('📋 Tables: admin, events, registration');
    console.log('\n🎉 You can now start the server with: npm start');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Access denied. Please check:');
      console.log('1. MySQL is running in XAMPP');
      console.log('2. Your MySQL root password in .env file');
      console.log('3. Try setting DB_PASSWORD in .env if you have one');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Connection refused. Please:');
      console.log('1. Start MySQL in XAMPP Control Panel');
      console.log('2. Verify MySQL is running on port 3306');
    } else {
      console.error('Error code:', error.code);
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
