import { createAccessToken } from '@/features/auth/auth-token';
import { cookies } from 'next/headers';

type AuthCookieInput = {
  userId: string | number;
  email: string;
};

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

export const setAuthCookie = async ({ userId, email }: AuthCookieInput) => {
  const accessToken = await createAccessToken({ email, userId });
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  return accessToken;
};
