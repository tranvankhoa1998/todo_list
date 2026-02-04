const getAllTodos = async (pool) => {
  const result = await pool.query('SELECT * FROM todos');
  return result.rows;
};

const createTodo = async (pool, title) => {
  await pool.query('INSERT INTO todos (title) VALUES ($1)', [title]);
};

module.exports = { getAllTodos, createTodo };
