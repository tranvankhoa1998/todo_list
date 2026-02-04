import './style.css';
import { loginUseCase } from './usecases/login';
import { listTodosUseCase } from './usecases/listTodos';
import { addTodoUseCase } from './usecases/addTodo';
import { setLog, setAuthState, renderTodos } from './ui/state';

const loginForm = document.getElementById('login-form');
const todoForm = document.getElementById('todo-form');
const logoutBtn = document.getElementById('logout-btn');

const getToken = () => localStorage.getItem('todo_token');
const clearToken = () => localStorage.removeItem('todo_token');

const loadTodos = async () => {
  try {
    const data = await listTodosUseCase();
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
    await loginUseCase(username, password);
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
    await addTodoUseCase(title);
    titleInput.value = '';
    setLog('Todo created.');
    await loadTodos();
  } catch (err) {
    setLog(`Failed to create todo: ${err.message}`);
  }
});

logoutBtn.addEventListener('click', () => {
  clearToken();
  setAuthState(false);
  setLog('Logged out.');
});

if (getToken()) {
  setAuthState(true);
  loadTodos();
} else {
  setAuthState(false);
}
