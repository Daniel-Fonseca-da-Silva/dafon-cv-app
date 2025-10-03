import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { AUTH_CONFIG } from '@/lib/auth-config';

// Rotas que requerem autenticação
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/generate-cv', '/plans'];

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  
  if (isProtectedRoute) {
    // Verificar se há token de sessão
    const sessionToken = request.cookies.get(AUTH_CONFIG.SESSION_COOKIE_NAME);
    
    if (!sessionToken) {
      // Redirecionar para login se não houver token
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Nota: A verificação de expiração do token é feita no endpoint /api/auth/session
    // O middleware só verifica a existência do cookie, não sua validade
  }
  
  // Aplicar middleware de internacionalização
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
