const { listTodos } = require('../../usecases/todos/listTodos');
const { addTodo } = require('../../usecases/todos/addTodo');

const getTodosController = ({ todoRepo }) => async (_req, res) => {
  try {
    const todos = await listTodos({ todoRepo });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load todos' });
  }
};

const addTodoController = ({ todoRepo }) => async (req, res) => {
  const { title } = req.body;
  try {
    await addTodo({ todoRepo, title, user: req.user });
    res.status(201).send('Todo added');
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Failed to add todo' });
  }
};

module.exports = { getTodosController, addTodoController };
