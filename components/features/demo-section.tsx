'use client';

import { useTranslations } from 'next-intl';
import { FiPlay, FiArrowRight, FiCheck } from 'react-icons/fi';
import { DemoFeature, DemoStat } from '@/types/translations';
import { Link } from '@/i18n/navigation';

export function DemoSection() {
  const t = useTranslations('HomePage.demo');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-800 to-purple-900">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Conteúdo de Demonstração */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo - Demo Video/Image */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 overflow-hidden">
              {/* Mockup da Tela */}
              <div className="bg-white rounded-lg shadow-2xl">
                <div className="bg-gray-100 h-8 rounded-t-lg flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  {/* Mock CV Interface */}
                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
              
              {/* Botão de Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group">
                  <FiPlay className="w-6 h-6 text-white ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Lado Direito - Lista de Features */}
          <div className="space-y-8">
            <div className="space-y-6">
              {(t.raw('features') as DemoFeature[]).map((feature: DemoFeature, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão CTA */}
            <div className="pt-4">
              <Link href="/auth/register">
                <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <span>{t('cta')}</span>
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Estatísticas Inferiores */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {(t.raw('stats') as DemoStat[]).map((stat: DemoStat, index: number) => (
            <div key={index} className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-white/90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
