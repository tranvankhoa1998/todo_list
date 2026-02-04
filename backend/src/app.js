const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./infrastructure/db/pool');
const userRepoBase = require('./infrastructure/repositories/userRepository');
const todoRepoBase = require('./infrastructure/repositories/todoRepository');
const refreshTokenRepoBase = require('./infrastructure/repositories/refreshTokenRepository');
const {
  registerController,
  loginController,
  refreshController,
  logoutController,
} = require('./interfaces/http/authController');
const {
  getTodosController,
  addTodoController,
  updateTodoController,
  deleteTodoController,
} = require('./interfaces/http/todoController');
const { authenticateToken } = require('./interfaces/http/authMiddleware');

const app = express();
app.use(bodyParser.json());

const userRepo = {
  findByUsername: (username) => userRepoBase.findByUsername(pool, username),
  findById: (id) => userRepoBase.findById(pool, id),
  createUser: (data) => userRepoBase.createUser(pool, data),
};

const todoRepo = {
  getAllTodos: () => todoRepoBase.getAllTodos(pool),
  getTodoById: (id) => todoRepoBase.getTodoById(pool, id),
  createTodo: (data) => todoRepoBase.createTodo(pool, data),
  updateTodo: (id, updates) => todoRepoBase.updateTodo(pool, id, updates),
  deleteTodo: (id) => todoRepoBase.deleteTodo(pool, id),
};

const refreshTokenRepo = {
  createRefreshToken: (data) => refreshTokenRepoBase.createRefreshToken(pool, data),
  findRefreshToken: (token) => refreshTokenRepoBase.findRefreshToken(pool, token),
  deleteRefreshToken: (token) => refreshTokenRepoBase.deleteRefreshToken(pool, token),
  deleteRefreshTokensByUser: (userId) => refreshTokenRepoBase.deleteRefreshTokensByUser(pool, userId),
};

app.post('/register', registerController({ userRepo }));
app.post('/login', loginController({ userRepo, refreshTokenRepo }));
app.post('/refresh', refreshController({ userRepo, refreshTokenRepo }));
app.post('/logout', logoutController({ refreshTokenRepo }));

app.get('/todos', authenticateToken, getTodosController({ todoRepo }));
app.post('/todos', authenticateToken, addTodoController({ todoRepo }));
app.put('/todos/:id', authenticateToken, updateTodoController({ todoRepo }));
app.delete('/todos/:id', authenticateToken, deleteTodoController({ todoRepo }));

module.exports = { app };
