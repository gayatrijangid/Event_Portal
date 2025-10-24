const db = require('./config/db');

async function addCreatedAtColumn() {
  try {
    // Check if column exists
    const [columns] = await db.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'event_portal' 
      AND TABLE_NAME = 'events' 
      AND COLUMN_NAME = 'created_at'
    `);

    if (columns.length === 0) {
      console.log('Adding created_at column to events table...');
      await db.query(`
        ALTER TABLE events 
        ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      `);
      console.log('✅ created_at column added successfully!');
    } else {
      console.log('✅ created_at column already exists!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addCreatedAtColumn();
