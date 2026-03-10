const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken, getRefreshExpiry } = require('./tokenService');

const loginUser = async ({ userRepo, refreshTokenRepo, jwt, secret, username, password }) => {
  const user = await userRepo.findByUsername(username);
  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const accessToken = createAccessToken(jwt, secret, user);
  const refreshToken = createRefreshToken();
  const refreshExpiresAt = getRefreshExpiry();

  await refreshTokenRepo.createRefreshToken({
    userId: user.id,
    token: refreshToken,
    expiresAt: refreshExpiresAt,
  });

  return { accessToken, refreshToken };
};

module.exports = { loginUser };
