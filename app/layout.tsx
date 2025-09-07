import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Dafon CV - Crie seu Currículo Perfeito com IA",
  description: "Transforme sua experiência profissional em currículos únicos e personalizados. Nossa IA adapta seu currículo para cada vaga, maximizando suas chances de sucesso.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="pt">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
