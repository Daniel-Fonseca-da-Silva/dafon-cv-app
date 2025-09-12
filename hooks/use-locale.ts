'use client';

import { useLocale as useNextIntlLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { setLocaleCookie } from '@/lib/cookies';

/**
 * Hook personalizado para gerenciar locale com persistência em cookie
 */
export function useLocale() {
  const currentLocale = useNextIntlLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: string) => {
    // Salva a preferência em cookie
    setLocaleCookie(newLocale);
    // Navega para a nova página com o locale selecionado
    router.push(pathname, { locale: newLocale });
  };

  return {
    locale: currentLocale,
    changeLocale
  };
}
