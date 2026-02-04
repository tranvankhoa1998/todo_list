import { login } from '../data/authRepository';

const loginUseCase = async (username, password) => {
  const data = await login(username, password);
  if (!data.token) {
    throw new Error('Token missing in response');
  }
  localStorage.setItem('todo_token', data.token);
  return data.token;
};

export { loginUseCase };
