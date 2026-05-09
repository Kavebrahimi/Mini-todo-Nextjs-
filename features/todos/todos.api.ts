import {
  CreateTodoInput,
  UpdateTodoIsCompleteInput,
} from '@/services/todos/todos.schema';
import { ApiResponse } from '@/types/api-response';
import { Todo } from '@/types/todos.types';

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong');
  }

  return data;
}

export const getTodos = async () => {
  const response = await fetch('/api/todos', {
    method: 'GET',
    cache: 'no-store',
  });
  const res = await parseResponse<Todo[]>(response);
  return res.data;
};

export const createTodo = async (input: CreateTodoInput) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const res = await parseResponse(response);
  return res.data;
};

export const updateTodoCompleted = async ({
  input,
  todoId,
}: {
  input: UpdateTodoIsCompleteInput;
  todoId: number;
}) => {
  const response = await fetch(`/api/todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const res = await parseResponse(response);
  return res.data;
};

export const deleteTodo = async ({todoId} : {todoId: number})=> {
  const response = await fetch(`/api/todos/${todoId}`, {
    method: 'DELETE',
  })
  const res = await parseResponse(response);
  return res.data;
}
