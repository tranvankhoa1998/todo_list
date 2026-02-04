const findByUsernameAndPassword = async (pool, username, password) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password]
  );
  return result.rows[0] || null;
};

module.exports = { findByUsernameAndPassword };
