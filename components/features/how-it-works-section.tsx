'use client';

import { useTranslations } from 'next-intl';
import { FiFileText, FiSearch, FiBarChart, FiCheckCircle } from 'react-icons/fi';

const steps = [
  { icon: FiFileText, key: 'step1' },
  { icon: FiSearch, key: 'step2' },
  { icon: FiBarChart, key: 'step3' },
  { icon: FiCheckCircle, key: 'step4' },
];

export function HowItWorksSection() {
  const t = useTranslations('HomePage.howItWorks');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-800 to-purple-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const stepData = t.raw(step.key) as any;
            
            return (
              <div
                key={index}
                className="group relative text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stepData.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {stepData.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
