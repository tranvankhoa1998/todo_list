const loginUser = async ({ userRepo, jwt, secret, username, password }) => {
  const user = await userRepo.findByUsernameAndPassword(username, password);
  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
  return { token };
};

module.exports = { loginUser };
