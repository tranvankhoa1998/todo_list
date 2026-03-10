const updateTodo = async ({ todoRepo, id, updates, user }) => {
  if (user.role !== 'admin') {
    const error = new Error('Permission denied');
    error.statusCode = 403;
    throw error;
  }

  const updated = await todoRepo.updateTodo(id, updates);
  if (!updated) {
    const error = new Error('Todo not found');
    error.statusCode = 404;
    throw error;
  }
  return updated;
};

module.exports = { updateTodo };
