const logEl = document.getElementById('log');
const authCard = document.getElementById('auth-card');
const todosCard = document.getElementById('todos-card');
const homeCard = document.getElementById('home-card');
const todoList = document.getElementById('todo-list');
const logoutBtn = document.getElementById('logout-btn');

const setLog = (message) => {
  const now = new Date().toISOString();
  logEl.textContent = `[${now}] ${message}\n` + logEl.textContent;
};

const setAuthState = (isAuthed) => {
  authCard.style.display = isAuthed ? 'none' : 'grid';
  homeCard.style.display = isAuthed ? 'grid' : 'none';
  todosCard.style.display = isAuthed ? 'grid' : 'none';
  logoutBtn.style.display = isAuthed ? 'inline-flex' : 'none';
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

export { setLog, setAuthState, renderTodos };
