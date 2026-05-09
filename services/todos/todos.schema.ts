import z from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(3, 'Title must be at least 4 characters long'),
});
export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 4 characters long')
    .optional(),
  isCompleted: z.boolean().optional(),
});
export const updateTodoIsCompleteSchema = z.object({
  isCompleted: z.boolean(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type UpdateTodoIsCompleteInput = z.infer<typeof updateTodoIsCompleteSchema>;
