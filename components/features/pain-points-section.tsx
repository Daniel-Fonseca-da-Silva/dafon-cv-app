'use client';

import { useTranslations } from 'next-intl';
import { FiClock, FiXCircle, FiSearch, FiTrendingDown } from 'react-icons/fi';

const iconMap = {
  time: FiClock,
  rejection: FiXCircle,
  search: FiSearch,
  lowRate: FiTrendingDown,
};

export function PainPointsSection() {
  const t = useTranslations('HomePage.painPoints');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-800 to-purple-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(t.raw('points') as any[]).map((point: any, index: number) => {
            const IconComponent = iconMap[point.icon as keyof typeof iconMap];
            
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
