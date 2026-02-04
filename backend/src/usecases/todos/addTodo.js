const addTodo = async ({ todoRepo, title, user }) => {
  if (user.role !== 'admin') {
    const error = new Error('Permission denied');
    error.statusCode = 403;
    throw error;
  }

  await todoRepo.createTodo(title);
};

module.exports = { addTodo };
