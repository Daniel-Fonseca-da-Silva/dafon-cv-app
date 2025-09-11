import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // - … se eles começam com `/api`, `/trpc`, `/_next` ou `/_vercel`
  // - … os que contêm um ponto (ex: `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
