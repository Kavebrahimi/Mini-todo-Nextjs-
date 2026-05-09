'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authKeys } from './auth.keys';
import { getMe, login, logout, signup } from './auth.api';
import { LoginInput, SignupInput } from '@/types/auth.types';

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getMe,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me(), user);
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SignupInput) => signup(input),
    onSuccess: (result) => {
      queryClient.setQueryData(authKeys.me(), result.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
}
