const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./infrastructure/db/pool');
const userRepo = require('./infrastructure/repositories/userRepository');
const todoRepo = require('./infrastructure/repositories/todoRepository');
const { loginController } = require('./interfaces/http/authController');
const { getTodosController, addTodoController } = require('./interfaces/http/todoController');
const { authenticateToken } = require('./interfaces/http/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.post('/login', loginController({
  userRepo: {
    findByUsernameAndPassword: (username, password) =>
      userRepo.findByUsernameAndPassword(pool, username, password),
  },
}));

app.get('/todos', authenticateToken, getTodosController({
  todoRepo: {
    getAllTodos: () => todoRepo.getAllTodos(pool),
  },
}));

app.post('/todos', authenticateToken, addTodoController({
  todoRepo: {
    createTodo: (title) => todoRepo.createTodo(pool, title),
  },
}));

module.exports = { app };
