const bcrypt = require('bcryptjs');

const registerUser = async ({ userRepo, username, password, role = 'user' }) => {
  const existing = await userRepo.findByUsername(username);
  if (existing) {
    const error = new Error('Username already exists');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepo.createUser({ username, passwordHash, role });
  return { id: user.id, username: user.username, role: user.role };
};

module.exports = { registerUser };
