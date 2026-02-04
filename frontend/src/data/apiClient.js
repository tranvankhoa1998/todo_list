import { API_BASE } from '../core/config';

const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem('todo_token');
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

export { apiFetch };
