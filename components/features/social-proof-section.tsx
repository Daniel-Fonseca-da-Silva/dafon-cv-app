'use client';

import { useTranslations } from 'next-intl';
import { SocialProofStat } from '@/types/translations';

export function SocialProofSection() {
  const t = useTranslations('HomePage.socialProof');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-blue-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {(t.raw('stats') as SocialProofStat[]).map((stat: SocialProofStat, index: number) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              {/* Number */}
              <div className={`text-4xl sm:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              
              {/* Label */}
              <div className="text-white/90 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
