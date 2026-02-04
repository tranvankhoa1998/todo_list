const logoutUser = async ({ refreshTokenRepo, refreshToken }) => {
  await refreshTokenRepo.deleteRefreshToken(refreshToken);
};

module.exports = { logoutUser };
