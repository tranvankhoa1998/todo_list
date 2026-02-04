const { listTodos } = require('../../usecases/todos/listTodos');
const { addTodo } = require('../../usecases/todos/addTodo');
const { updateTodo } = require('../../usecases/todos/updateTodo');
const { deleteTodo } = require('../../usecases/todos/deleteTodo');

const getTodosController = ({ todoRepo }) => async (_req, res) => {
  try {
    const todos = await listTodos({ todoRepo });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load todos' });
  }
};

const addTodoController = ({ todoRepo }) => async (req, res) => {
  const { title, description, priority, assignedTo, status, startDate, endDate, expectedTime, phase } = req.body;
  try {
    const todo = await addTodo({
      todoRepo,
      title,
      description,
      priority,
      assignedTo,
      status,
      startDate,
      endDate,
      expectedTime,
      phase,
      user: req.user,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Failed to add todo' });
  }
};

const updateTodoController = ({ todoRepo }) => async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await updateTodo({ todoRepo, id, updates: req.body, user: req.user });
    res.json(updated);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update todo' });
  }
};

const deleteTodoController = ({ todoRepo }) => async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteTodo({ todoRepo, id, user: req.user });
    res.json(deleted);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete todo' });
  }
};

module.exports = { getTodosController, addTodoController, updateTodoController, deleteTodoController };
