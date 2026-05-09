import { getCurrentUser } from '@/services/auth/auth.service';
import {
  createTodoSchema,
} from '@/services/todos/todos.schema';
import {
  createTodo,
  findUserTodos,
} from '@/services/todos/todos.service';
import {
  sendBadRequest,
  sendCreated,
  sendInternalServer,
  sendSuccess,
  sendUnauthorized,
} from '@/utils/api-responses';
import { parseBody } from '@/utils/parse-body';
import { NextRequest } from 'next/server';



export const GET = async () => {
  const userTodos = await findUserTodos();

  if (!userTodos) return sendUnauthorized();

  return sendSuccess({
    message: 'Todos fetched successfully',
    data: userTodos,
  });
};

export const POST = async (req: NextRequest) => {
  try {
    const parsed = await parseBody({ req, schema: createTodoSchema });
    if (!parsed.success)
      return sendBadRequest(parsed.error.flatten().fieldErrors);

    const user = await getCurrentUser();
    if (!user) return sendUnauthorized();

    const todo = await createTodo({ data: parsed.data, userId: user.id });

    return sendCreated({ message: 'Todo created successfully', data: todo });
  } catch (error) {
    console.log(error);
    return sendInternalServer();
  }
};


