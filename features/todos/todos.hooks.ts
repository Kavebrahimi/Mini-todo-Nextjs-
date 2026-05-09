import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { todosKeys } from './todos.keys';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodoCompleted,
} from './todos.api';
import { toast } from 'sonner';

export function useGetTodos() {
  return useQuery({
    queryKey: todosKeys.mine(),
    queryFn: getTodos,
    retry: 1,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: todosKeys.mine(),
      });
      toast.success('Item created');
    },
    onError: () => {
      toast.error('Failed creating item');
    },
  });
}

export function useUpdateTodoComplete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodoCompleted,
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: todosKeys.mine(),
      });
      toast.success('Item updated')
    },
    onError: () => {
      toast.error('Failed updating item');
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: todosKeys.mine(),
      });
      toast.success('Item deleted');
    },
    onError: () => {
      toast.error('Failed deleting item');
    },
  });
}
