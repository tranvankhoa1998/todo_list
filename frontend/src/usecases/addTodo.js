import { createTodo } from '../data/todoRepository';

const addTodoUseCase = async (title) => {
  return createTodo(title);
};

export { addTodoUseCase };
