const createRefreshToken = async (pool, { userId, token, expiresAt }) => {
  const result = await pool.query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING *',
    [userId, token, expiresAt]
  );
  return result.rows[0];
};

const findRefreshToken = async (pool, token) => {
  const result = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
  return result.rows[0] || null;
};

const deleteRefreshToken = async (pool, token) => {
  await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
};

const deleteRefreshTokensByUser = async (pool, userId) => {
  await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [userId]);
};

module.exports = {
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteRefreshTokensByUser,
};
