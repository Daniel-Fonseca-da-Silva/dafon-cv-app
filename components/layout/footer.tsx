'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('HomePage.footer');

  return (
    <footer className="bg-gradient-to-b from-blue-800 to-purple-900 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h3 className="text-white font-bold text-xl">Dafon CV</h3>
            </div>
            <p className="text-white/80 max-w-md leading-relaxed">
              Transforme sua experiência profissional em currículos únicos e personalizados com o poder da IA.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  {t('about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  {t('contact')}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  {t('terms')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-white/80">
              <p>dafondeveloper@gmail.com</p>
              <p>+351 913-619-053</p>
              <p>{t('location')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © {new Date().getFullYear()} {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
