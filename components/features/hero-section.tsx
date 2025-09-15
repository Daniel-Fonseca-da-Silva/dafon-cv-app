'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FiZap, FiSmile } from 'react-icons/fi';
import { Link } from '@/i18n/navigation';

export function HeroSection() {
  const t = useTranslations('HomePage.hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800" />
      
      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white text-sm font-medium">{t('badge')}</span>
        </div>

        {/* Título */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {t('headline').split(' ').map((word, index) => {
            const highlightWord = t('highlightWord');
            if (word === highlightWord) {
              return (
                <span key={index} className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  {word}{' '}
                </span>
              );
            }
            return word + ' ';
          })}
        </h1>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('subheadline')}
        </p>

        {/* Botões CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/register">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FiZap className="w-5 h-5 mr-2" />
              {t('ctaPrimary')} →
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold"
          >
            <FiSmile className="w-5 h-5 mr-2" />
            {t('ctaSecondary')}
          </Button>
        </div>
      </div>

      {/* Elementos Decorativos */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
    </section>
  );
}
