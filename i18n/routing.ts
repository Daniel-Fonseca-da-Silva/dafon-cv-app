import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // Lista de todos os locales que são suportados
  locales: ['en', 'pt', 'es'],
 
  // Usado quando não tem locale
  // No caso, o inglês é o default
  defaultLocale: 'en',
  
  // URLs limpas - só mostra locale quando necessário
  localePrefix: 'as-needed'
});