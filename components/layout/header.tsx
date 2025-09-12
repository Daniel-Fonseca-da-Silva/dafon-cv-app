'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocale } from '@/hooks/use-locale';

export function Header() {
  const t = useTranslations('HomePage.navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, changeLocale } = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    changeLocale(newLocale);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              {t('home')}
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              {t('contact')}
            </a>
            <Select value={locale} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-fit bg-transparent border-white/20 text-white hover:text-white/80 focus:ring-white/50">
                <SelectValue placeholder={t('language')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" className="text-white hover:text-white/80 transition-colors">
              {t('login')}
            </Link>
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
              <div className="px-3 py-2">
                <Select value={locale} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full bg-transparent border-white/20 text-white hover:text-white/80 focus:ring-white/50">
                    <SelectValue placeholder={t('language')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Link href="/auth/login" className="block px-3 py-2 text-white hover:text-white/80 transition-colors">
                {t('login')}
              </Link>
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
