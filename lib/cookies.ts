/**
 * Utilitários para gerenciar cookies de locale
 * Implementa persistência de preferência de idioma do usuário
 */

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 ano

/**
 * Define o cookie de locale
 */
export function setLocaleCookie(locale: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
  }
}

/**
 * Obtém o locale do cookie
 */
export function getLocaleFromCookie(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';');
  const localeCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${LOCALE_COOKIE_NAME}=`)
  );

  if (localeCookie) {
    return localeCookie.split('=')[1];
  }

  return null;
}

/**
 * Remove o cookie de locale
 */
export function removeLocaleCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
  }
}
