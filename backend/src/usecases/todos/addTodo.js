const addTodo = async ({ todoRepo, title, description, priority, assignedTo, status, startDate, endDate, expectedTime, phase, user }) => {
  if (user.role !== 'admin') {
    const error = new Error('Permission denied');
    error.statusCode = 403;
    throw error;
  }

  if (!title) {
    const error = new Error('Title is required');
    error.statusCode = 400;
    throw error;
  }

  return todoRepo.createTodo({
    title,
    description,
    priority,
    assignedTo,
    status,
    startDate,
    endDate,
    expectedTime,
    phase,
  });
};

module.exports = { addTodo };
