import { apiFetch } from './apiClient';

const fetchTodos = async () => {
  return apiFetch('/todos');
};

const createTodo = async (title) => {
  return apiFetch('/todos', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
};

export { fetchTodos, createTodo };
