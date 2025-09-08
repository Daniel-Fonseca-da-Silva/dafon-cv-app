import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Estatico por enquanto, vamos mudar isso mais tarde
  const locale = 'en';
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});