import { db } from '@/db';
import { todos } from '@/db/schema';
import { getCurrentUser } from '../auth/auth.service';
import { and, desc, eq } from 'drizzle-orm';
import { CreateTodoInput, UpdateTodoInput } from './todos.schema';

export const findUserTodos = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const userTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, user.id))
    .orderBy(desc(todos.createdAt));

  return userTodos;
};

export const createTodo = async ({
  data,
  userId,
}: {
  data: CreateTodoInput;
  userId: number;
}) => {
  const [createdTodo] = await db
    .insert(todos)
    .values({
      userId,
      title: data.title,
    })
    .returning({
      id: todos.id,
      userId: todos.userId,
      title: todos.title,
      isCompleted: todos.isCompleted,
      createdAt: todos.createdAt,
    });
  return createdTodo;
};

export const updateTodo = async ({
  data,
  userId,
  todoId,
}: {
  data: UpdateTodoInput;
  userId: number;
  todoId: number;
}) => {
  const updatedTodo = await db
    .update(todos)
    .set({
      userId,
      title: data.title,
      isCompleted: data.isCompleted,
      updatedAt: new Date(),
    })
    .where(and(eq(todos.id, todoId), eq(todos.userId, userId)))
    .returning({
      id: todos.id,
      userId: todos.userId,
      title: todos.title,
      isCompleted: todos.isCompleted,
      updatedAt: todos.updatedAt,
    });
  return updatedTodo;
};

export const deleteTodo = async ({
  todoId,
  userId,
}: {
  todoId: number;
  userId: number;
}) => {
  const [todo] = await db
    .delete(todos)
    .where(and(eq(todos.userId, userId), eq(todos.id, todoId)))
    .returning({
      id: todos.id,
      userId: todos.userId,
      title: todos.title,
      isCompleted: todos.isCompleted,
      createdAt: todos.createdAt,
      updatedAt: todos.updatedAt,
    });

  return todo;
};

export const updateTodoIsComplete = async ({
  todoId,
  userId,
  isCompleted,
}: {
  todoId: number;
  userId: number;
  isCompleted: boolean;
}) => {
  const [todo] = await db
    .update(todos)
    .set({
      isCompleted,
      updatedAt: new Date(),
    })
    .where(and(eq(todos.userId, userId), eq(todos.id, todoId)))
    .returning();
  return todo;
};
