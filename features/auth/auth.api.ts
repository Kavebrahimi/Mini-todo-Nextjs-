import { ApiResponse } from '@/types/api-response';
import {
  AuthUser,
  LoginInput,
  SignupInput,
  SignupResult,
} from '@/types/auth.types';

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong');
  }

  return data;
}

export async function login(input: LoginInput) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const res = await parseResponse<AuthUser>(response);
  return res.data;
}

export async function signup(input: SignupInput) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const res = await parseResponse<SignupResult>(response);
  return res.data;
}

export async function getMe() {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    cache: 'no-store',
  });

  const res = await parseResponse<{ user: AuthUser }>(response);
  return res.data.user;
}

export async function logout() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  const result = await parseResponse<null>(response);
  return result.data;
}
