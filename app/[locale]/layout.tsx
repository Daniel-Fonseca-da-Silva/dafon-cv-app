import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, getLocale } from 'next-intl/server';
import { SpeedInsights } from "@vercel/speed-insights/next"

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  
  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/logos/logo-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/logos/logo-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/logos/logo-64x64.png', sizes: '64x64', type: 'image/png' },
        { url: '/logos/logo-128x128.png', sizes: '128x128', type: 'image/png' },
      ],
      apple: [
        { url: '/logos/logo-192x192.png', sizes: '192x192', type: 'image/png' },
      ],
      other: [
        { rel: 'icon', url: '/logos/logo-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
  };
}

export default async function RootLayout({children}: Props) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
