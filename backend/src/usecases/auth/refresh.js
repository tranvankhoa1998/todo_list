const { createAccessToken, createRefreshToken, getRefreshExpiry } = require('./tokenService');

const refreshSession = async ({ userRepo, refreshTokenRepo, jwt, secret, refreshToken }) => {
  const stored = await refreshTokenRepo.findRefreshToken(refreshToken);
  if (!stored) {
    const error = new Error('Invalid refresh token');
    error.statusCode = 401;
    throw error;
  }

  if (new Date(stored.expires_at) < new Date()) {
    await refreshTokenRepo.deleteRefreshToken(refreshToken);
    const error = new Error('Refresh token expired');
    error.statusCode = 401;
    throw error;
  }

  const user = await userRepo.findById(stored.user_id);
  if (!user) {
    await refreshTokenRepo.deleteRefreshToken(refreshToken);
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const newAccessToken = createAccessToken(jwt, secret, user);
  const newRefreshToken = createRefreshToken();
  const newExpiresAt = getRefreshExpiry();

  await refreshTokenRepo.deleteRefreshToken(refreshToken);
  await refreshTokenRepo.createRefreshToken({
    userId: user.id,
    token: newRefreshToken,
    expiresAt: newExpiresAt,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

module.exports = { refreshSession };
