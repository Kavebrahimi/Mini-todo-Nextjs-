'use client';
import ButtonHover1 from '@/components/ButtonHover1';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodoComplete,
} from '@/features/todos/todos.hooks';
import { cn } from '@/lib/utils';
import {
  CreateTodoInput,
  createTodoSchema,
} from '@/services/todos/todos.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Todos() {
  const { data: todos, isPending, isError, error } = useGetTodos();
  const [openCreateTodo, setOpenCreateTodo] = useState(false);
  const createTodoMutation = useCreateTodo();
  const updateTodoIsCompleteMutation = useUpdateTodoComplete();
  const deleteTodoMutation = useDeleteTodo();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateTodoInput>({
    defaultValues: {
      title: '',
    },
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit = (values: CreateTodoInput) => {
    createTodoMutation.mutate(values, {
      onSuccess: () => {
        reset();
        setOpenCreateTodo(false);
      },
    });
  };

  return (
    <section className='container relative h-full min-h-screen px-4 pb-4 mt-30 mx-auto'>
      <div>
        <div className='flex items-center justify-between p-4 bg-neutral-300 rounded-t-2xl'>
          <p>Todos list</p>
          <ButtonHover1 onClick={() => setOpenCreateTodo(true)}>
            Create Todo
          </ButtonHover1>
        </div>
        <ul
          className={`border-x border-b rounded-b-2xl ${todos?.length !== 0 && 'p-4'}`}
        >
          {isPending && <Spinner className='size-10 absolute-center' />}
          {isError && (
            <p className='absolute-center text-rose-500'>{error.message}</p>
          )}
          {todos?.length === 0 && (
            <p className='absolute-center'>There is nothing to do</p>
          )}
          {todos?.map((todo) => (
            <li
              key={todo.id}
              className={cn(
                'flex items-center justify-between shadow-xl p-4 rounded-sm my-5 border hover:scale-105 transition hover:backdrop-blur-sm',
                todo.isCompleted && 'bg-emerald-600 text-white',
              )}
            >
              <p className=''>{todo.title}</p>
              <div className='flex items-center gap-2'>
                <Button
                  className={cn(
                    'rounded-sm border-emerald-600 text-emerald-600 hover:text-white hover:bg-emerald-600',
                    todo.isCompleted &&
                      'bg-orange-500 text-white border-orange-500 hover:bg-orange-700',
                  )}
                  variant='outline'
                  onClick={() =>
                    updateTodoIsCompleteMutation.mutate({
                      todoId: todo.id,
                      input: {
                        isCompleted: !(todo.isCompleted ?? false),
                      },
                    })
                  }
                  disabled={updateTodoIsCompleteMutation.isPending}
                >
                  {todo.isCompleted ? 'Undone' : 'Done'}
                </Button>
                <Button
                  onClick={() => {
                    deleteTodoMutation.mutate({ todoId: todo.id });
                  }}
                  className='rounded-sm bg-rose-500 p-3'
                >
                  <Trash />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Dialog
        open={openCreateTodo}
        onOpenChange={(open) => {
          setOpenCreateTodo(open);
          if (!open) reset();
        }}
      >
        <DialogContent
          showCloseButton
          className='rounded-sm'
          title='Create Todo'
          aria-describedby='Create Todo'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className='font-sans'>Create new Todo</DialogTitle>
              <DialogDescription>
                Add a title for your new todo item.
              </DialogDescription>
            </DialogHeader>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <Input placeholder="Todo's Title" {...register('title')} />
                  {errors.title && (
                    <small className='text-rose-500'>
                      {errors?.title.message}
                    </small>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <DialogFooter className='mt-5 text-center space-y-2'>
              <ButtonHover1
                type='submit'
                className='w-full before:bg-blue-500 hover:bg-white hover:text-black hover:ring ring-black/10'
                disabled={createTodoMutation.isPending}
              >
                {createTodoMutation.isPending ? <Spinner /> : 'Create'}
              </ButtonHover1>
              {createTodoMutation.isError && (
                <p className='text-xs text-rose-500'>{createTodoMutation.error.message}</p>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
