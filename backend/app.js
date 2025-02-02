const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg'); // Đổi sang 'mysql' nếu dùng MySQL

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'todo',
  password: process.env.DB_PASS || 'password',
  port: process.env.DB_PORT || 5432,
});

const SECRET_KEY = process.env.SECRET_KEY || 'mysecret';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
  if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
  
  const user = result.rows[0];
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/todos', authenticateToken, async (req, res) => {
  const result = await pool.query('SELECT * FROM todos');
  res.json(result.rows);
});

app.post('/todos', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Permission denied' });
  
  const { title } = req.body;
  await pool.query('INSERT INTO todos (title) VALUES ($1)', [title]);
  res.status(201).send('Todo added');
});

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;