const bcrypt = require('bcryptjs');
const { pool } = require('../src/infrastructure/db/pool');

const seed = async () => {
  const adminUsername = process.env.SEED_ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';
  const adminRole = 'admin';

  const existing = await pool.query('SELECT id FROM users WHERE username = $1', [adminUsername]);
  if (existing.rows.length > 0) {
    console.log('Admin user already exists.');
    await pool.end();
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await pool.query(
    'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)',
    [adminUsername, passwordHash, adminRole]
  );

  console.log('Seed complete. Admin user created.');
  await pool.end();
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
