import { fetchTodos } from '../data/todoRepository';

const listTodosUseCase = async () => {
  return fetchTodos();
};

export { listTodosUseCase };
