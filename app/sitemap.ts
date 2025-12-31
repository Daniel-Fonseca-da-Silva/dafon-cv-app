import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  // Páginas estáticas principais (Home)
  // Definimos explicitamente as páginas principais com maior prioridade
  const staticPages: MetadataRoute.Sitemap = routing.locales.map(locale => {
    // Lógica para 'localePrefix: as-needed':
    // Se for o idioma padrão (en), a URL raiz não leva prefixo (ex: https://site.com)
    // Se for outro idioma (pt), leva prefixo (ex: https://site.com/pt)
    const isDefault = locale === routing.defaultLocale;
    const path = isDefault ? '' : `/${locale}`;
    
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    };
  });

  // Outras rotas públicas
  const routes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/contact',
    '/privacy-policy',
    '/terms-of-use'
  ];

  const dynamicPages: MetadataRoute.Sitemap = [];

  routes.forEach(route => {
    routing.locales.forEach(locale => {
      // Mesma lógica de prefixo para rotas internas
      const isDefault = locale === routing.defaultLocale;
      const localePrefix = isDefault ? '' : `/${locale}`;
      
      dynamicPages.push({
        url: `${baseUrl}${localePrefix}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return [...staticPages, ...dynamicPages];
}
