import { getCurrentUser } from '@/services/auth/auth.service';
import { updateTodoIsCompleteSchema, updateTodoSchema } from '@/services/todos/todos.schema';
import {
  deleteTodo,
  updateTodo,
  updateTodoIsComplete,
} from '@/services/todos/todos.service';
import {
  sendBadRequest,
  sendInternalServer,
  sendNotFound,
  sendSuccess,
  sendUnauthorized,
} from '@/utils/api-responses';
import { parseBody } from '@/utils/parse-body';
import { NextRequest } from 'next/server';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) return sendBadRequest('id is required');

    const parsed = await parseBody({ req, schema: updateTodoSchema });
    if (!parsed.success)
      return sendBadRequest(parsed.error.flatten().fieldErrors);

    const user = await getCurrentUser();
    if (!user) return sendUnauthorized();

    const todo = await updateTodo({
      data: parsed.data,
      todoId: Number(id),
      userId: user.id,
    });
    if (!todo) return sendNotFound();

    return sendSuccess({ data: todo, message: 'Todo updated successfully' });
  } catch (error) {
    console.log(error);
    return sendInternalServer();
  }
};

export const DELETE = async (_req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) return sendBadRequest('id is required');

    const user = await getCurrentUser();
    if (!user) return sendUnauthorized();

    const todo = await deleteTodo({ todoId: Number(id), userId: user.id });
    if (!todo) return sendNotFound('Todo not found');

    return sendSuccess({ data: todo, message: 'Todo deleted successfully' });
  } catch (error) {
    console.log(error);
    return sendInternalServer();
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    if (!id) return sendBadRequest('id is required');

    const user = await getCurrentUser();
    if (!user) return sendUnauthorized();

    const parsed = await parseBody({ req, schema: updateTodoIsCompleteSchema });
    if (!parsed.success)
      return sendBadRequest(parsed.error.flatten().fieldErrors);

    const todo = await updateTodoIsComplete({
      userId: user.id,
      todoId: Number(id),
      isCompleted: parsed.data.isCompleted,
    });
    if (!todo) return sendNotFound('Todo not found');

    return sendSuccess({ data: todo, message: 'Todo updated' });
  } catch (error) {
    console.log(error);
    return sendInternalServer();
  }
};
