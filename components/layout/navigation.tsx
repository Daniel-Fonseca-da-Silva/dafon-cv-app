'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

export function Navigation() {
  const t = useTranslations('HomePage.navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              {t('home')}
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              {t('contact')}
            </a>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-white hover:text-white/80 transition-colors">
                <span>{t('language')}</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              {t('login')}
            </a>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0">
              {t('startNow')} →
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 transition-colors"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-white hover:text-white/80 transition-colors">
                {t('home')}
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:text-white/80 transition-colors">
                {t('contact')}
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:text-white/80 transition-colors">
                {t('language')}
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:text-white/80 transition-colors">
                {t('login')}
              </a>
              <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0">
                {t('startNow')} →
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
