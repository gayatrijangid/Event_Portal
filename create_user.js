const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'mysql.railway.internal',
    user: 'root',
    password: 'LICuYnIrEjDxcdSmhqjSAoOzOMjaLxLy',
    database: 'event_portal',
    port: 3306
  });

  await connection.query(
    "CREATE USER IF NOT EXISTS 'backend_user'@'%' IDENTIFIED BY 'StrongPass123!'"
  );
  await connection.query(
    "GRANT ALL PRIVILEGES ON event_portal.* TO 'backend_user'@'%'"
  );
  await connection.query("FLUSH PRIVILEGES");

  console.log("✅ User created successfully!");
  await connection.end();
}

main().catch(console.error);

