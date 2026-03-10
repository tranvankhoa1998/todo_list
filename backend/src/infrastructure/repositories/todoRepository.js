const getAllTodos = async (pool) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  return result.rows;
};

const getTodoById = async (pool, id) => {
  const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const createTodo = async (pool, todo) => {
  const result = await pool.query(
    `INSERT INTO todos (title, description, priority, assigned_to, status, start_date, end_date, expected_time, phase)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [
      todo.title,
      todo.description || null,
      todo.priority || null,
      todo.assignedTo || null,
      todo.status || 'todo',
      todo.startDate || null,
      todo.endDate || null,
      todo.expectedTime || null,
      todo.phase || null,
    ]
  );
  return result.rows[0];
};

const updateTodo = async (pool, id, updates) => {
  const fields = [
    'title',
    'description',
    'priority',
    'assigned_to',
    'status',
    'start_date',
    'end_date',
    'expected_time',
    'phase',
  ];

  const setClauses = [];
  const values = [];
  let idx = 1;

  fields.forEach((field) => {
    const key = field.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    if (updates[key] !== undefined) {
      setClauses.push(`${field} = $${idx++}`);
      values.push(updates[key]);
    }
  });

  if (setClauses.length === 0) {
    return getTodoById(pool, id);
  }

  values.push(id);
  const result = await pool.query(
    `UPDATE todos SET ${setClauses.join(', ')}, updated_at = NOW() WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

const deleteTodo = async (pool, id) => {
  const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
