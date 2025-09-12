import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {cookies} from 'next/headers';
import {LOCALE_COOKIE_NAME} from '../lib/cookies';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Tenta obter o locale do cookie primeiro
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  
  // Se existe cookie e é um locale válido, usa ele
  if (cookieLocale && hasLocale(routing.locales, cookieLocale)) {
    return {
      locale: cookieLocale,
      messages: (await import(`../messages/${cookieLocale}.json`)).default
    };
  }
  
  // Caso contrário, usa o locale da requisição ou o padrão
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});