const crypto = require('crypto');

const createAccessToken = (jwt, secret, user) => {
  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '15m' });
};

const createRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

const getRefreshExpiry = () => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  return expires;
};

module.exports = { createAccessToken, createRefreshToken, getRefreshExpiry };
