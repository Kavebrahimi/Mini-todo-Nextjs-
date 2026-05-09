export const todosKeys = {
  all: ['todos'] as const,
  mine: () => [...todosKeys.all, 'mine'] as const,
};
