const fs = require('fs');
const path = require('path');
const { pool } = require('../src/infrastructure/db/pool');

const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    if (sql.trim().length === 0) continue;

    console.log(`Running migration: ${file}`);
    await pool.query(sql);
  }

  console.log('Migrations complete.');
  await pool.end();
};

runMigrations().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
