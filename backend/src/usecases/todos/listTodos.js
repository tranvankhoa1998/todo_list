const listTodos = async ({ todoRepo }) => {
  return todoRepo.getAllTodos();
};

module.exports = { listTodos };
