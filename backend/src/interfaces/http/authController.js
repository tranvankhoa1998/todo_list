const jwt = require('jsonwebtoken');
const { registerUser } = require('../../usecases/auth/register');
const { loginUser } = require('../../usecases/auth/login');
const { refreshSession } = require('../../usecases/auth/refresh');
const { logoutUser } = require('../../usecases/auth/logout');
const { config } = require('../../config/env');

const registerController = ({ userRepo }) => async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const result = await registerUser({ userRepo, username, password, role });
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Register failed' });
  }
};

const loginController = ({ userRepo, refreshTokenRepo }) => async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await loginUser({
      userRepo,
      refreshTokenRepo,
      jwt,
      secret: config.jwtSecret,
      username,
      password,
    });
    res.json({ token: result.accessToken, ...result });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Login failed' });
  }
};

const refreshController = ({ userRepo, refreshTokenRepo }) => async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const result = await refreshSession({
      userRepo,
      refreshTokenRepo,
      jwt,
      secret: config.jwtSecret,
      refreshToken,
    });
    res.json({ token: result.accessToken, ...result });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Refresh failed' });
  }
};

const logoutController = ({ refreshTokenRepo }) => async (req, res) => {
  const { refreshToken } = req.body;
  try {
    await logoutUser({ refreshTokenRepo, refreshToken });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

module.exports = {
  registerController,
  loginController,
  refreshController,
  logoutController,
};
