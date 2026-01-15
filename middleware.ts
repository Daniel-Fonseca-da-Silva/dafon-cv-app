import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { AUTH_CONFIG } from '@/lib/auth-config';

// routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/generate-cv', '/plans'];

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // verify if it is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  
  if (isProtectedRoute) {
    // verify if there is a session token
    const sessionToken = request.cookies.get(AUTH_CONFIG.SESSION_COOKIE_NAME);
    
    if (!sessionToken) {
      // redirect to login if there is no session token
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Note: The token expiration check is done in the /api/auth/session endpoint
    // The middleware only checks the existence of the cookie, not its validity
  }
  
  // apply internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
