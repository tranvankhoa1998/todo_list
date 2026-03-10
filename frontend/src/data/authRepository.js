import { apiFetch } from './apiClient';

const login = async (username, password) => {
  return apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

export { login };
