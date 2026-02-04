const loginForm = document.getElementById('login-form');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const logEl = document.getElementById('log');
const authCard = document.getElementById('auth-card');
const todosCard = document.getElementById('todos-card');
const logoutBtn = document.getElementById('logout-btn');

const API_BASE = '/api';

const setLog = (message) => {
  const now = new Date().toISOString();
  logEl.textContent = `[${now}] ${message}\n` + logEl.textContent;
};

const setAuthState = (isAuthed) => {
  authCard.style.display = isAuthed ? 'none' : 'grid';
  todosCard.style.display = isAuthed ? 'grid' : 'none';
};

const getToken = () => localStorage.getItem('todo_token');
const setToken = (token) => {
  if (token) {
    localStorage.setItem('todo_token', token);
  } else {
    localStorage.removeItem('todo_token');
  }
};

const apiFetch = async (path, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const error = body.error || `Request failed (${res.status})`;
    throw new Error(error);
  }
  return res.json().catch(() => ({}));
};

const renderTodos = (items) => {
  todoList.innerHTML = '';
  if (!Array.isArray(items) || items.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No todos yet.';
    todoList.appendChild(li);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.title || JSON.stringify(item);
    todoList.appendChild(li);
  });
};

const loadTodos = async () => {
  try {
    const data = await apiFetch('/todos');
    renderTodos(data);
    setLog('Loaded todos successfully.');
  } catch (err) {
    setLog(`Failed to load todos: ${err.message}`);
  }
};

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const data = await apiFetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (!data.token) {
      throw new Error('Token missing in response');
    }
    setToken(data.token);
    setAuthState(true);
    setLog('Login success.');
    await loadTodos();
  } catch (err) {
    setLog(`Login failed: ${err.message}`);
  }
});

todoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const titleInput = document.getElementById('todo-title');
  const title = titleInput.value.trim();
  if (!title) return;

  try {
    await apiFetch('/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    titleInput.value = '';
    setLog('Todo created.');
    await loadTodos();
  } catch (err) {
    setLog(`Failed to create todo: ${err.message}`);
  }
});

logoutBtn.addEventListener('click', () => {
  setToken(null);
  setAuthState(false);
  setLog('Logged out.');
});

if (getToken()) {
  setAuthState(true);
  loadTodos();
} else {
  setAuthState(false);
}
