const jwt = require('jsonwebtoken');
const { loginUser } = require('../../usecases/auth/login');
const { config } = require('../../config/env');

const loginController = ({ userRepo }) => async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await loginUser({
      userRepo,
      jwt,
      secret: config.jwtSecret,
      username,
      password,
    });
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Login failed' });
  }
};

module.exports = { loginController };
