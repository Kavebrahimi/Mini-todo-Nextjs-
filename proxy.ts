// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

const authRoutes = ['/login', '/signup'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  const isHomePage = pathname === '/';

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isProtectedRoute = isHomePage;

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
  ],
};
