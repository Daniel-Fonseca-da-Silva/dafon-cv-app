'use client';

import { useTranslations } from 'next-intl';
import { FiZap, FiCpu, FiTarget, FiShield } from 'react-icons/fi';
import { BenefitItem } from '@/types/translations';

const iconMap = {
  zap: FiZap,
  brain: FiCpu,
  target: FiTarget,
  shield: FiShield,
};

export function BenefitsSection() {
  const t = useTranslations('HomePage.benefits');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-800 to-purple-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(t.raw('items') as BenefitItem[]).map((item: BenefitItem, index: number) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {item.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
