const deleteTodo = async ({ todoRepo, id, user }) => {
  if (user.role !== 'admin') {
    const error = new Error('Permission denied');
    error.statusCode = 403;
    throw error;
  }

  const deleted = await todoRepo.deleteTodo(id);
  if (!deleted) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};

module.exports = { deleteTodo };
