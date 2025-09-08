'use client';

import { useTranslations } from "next-intl";
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FiHome, FiArrowLeft, FiSearch, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* 404 Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Error Code */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
              <span className="text-6xl font-bold text-white">{t('errorCode')}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl text-white/90 mb-6 font-medium">
            {t('subtitle')}
          </h2>

          {/* Description */}
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FiHome className="w-5 h-5 mr-2" />
                {t('goHome')} →
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.history.back()}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              {t('goBack')}
            </Button>
          </div>

        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl" />
      </section>

      <Footer />
    </main>
  );
}
