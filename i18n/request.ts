import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {cookies} from 'next/headers';
import {LOCALE_COOKIE_NAME} from '../lib/cookies';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Try to get the locale from the cookie first
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  
  // If there is a cookie and it is a valid locale, use it
  if (cookieLocale && hasLocale(routing.locales, cookieLocale)) {
    return {
      locale: cookieLocale,
      messages: (await import(`../messages/${cookieLocale}.json`)).default
    };
  }
  
  // Otherwise, use the locale from the request or the default
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});