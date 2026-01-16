import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // List of all locales that are supported
  locales: ['en', 'pt', 'es', 'fr'],

  // Used when there is no locale
  // In this case, English is the default
  defaultLocale: 'en',
  
  // URLs clean - only show locale when necessary
  localePrefix: 'as-needed'
});