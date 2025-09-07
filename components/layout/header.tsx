'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

export function Header() {
  const t = useTranslations('HomePage.navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Dafon CV</h1>
              <p className="text-white/70 text-xs">Powered by Dafon</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
          </nav>

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
            <nav className="px-2 pt-2 pb-3 space-y-1">
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
