'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function TermsOfUsePage() {
  const t = useTranslations('termsOfUse');

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="relative p-4 pt-24 pb-16 min-h-screen">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800" />
        
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg shadow-2xl p-4 sm:p-6 lg:p-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="border-b border-white/20 pb-4 sm:pb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-white">
                  {t('title')}
                </h1>
                <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-white/80">
                  <p>
                    <strong>{t('effectiveDate')}:</strong> {t('effectiveDateValue')}
                  </p>
                  <p>
                    <strong>{t('lastUpdate')}:</strong> {t('lastUpdateValue')}
                  </p>
                </div>
              </div>

              {/* Section 1 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section1.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section1.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section1.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section1.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section1.subsection2.content')}
                    </p>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed mt-2">
                      {t('section1.subsection2.aiDisclosure')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section2.title')}
                </h1>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {t('section2.content')}
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section3.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section3.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section3.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section3.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section3.subsection2.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section4.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section4.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section4.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section4.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section4.subsection2.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section5.title')}
                </h1>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-3 sm:mb-4">
                  {t('section5.intro')}
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section5.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section5.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section5.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section5.subsection2.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section5.subsection3.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section5.subsection3.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section6.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section6.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section6.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section6.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section6.subsection2.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section6.subsection3.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section6.subsection3.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section7.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section7.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section7.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section7.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section7.subsection2.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section8.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section8.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section8.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section8.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section8.subsection2.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section9.title')}
                </h1>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {t('section9.content')}
                </p>
              </section>

              {/* Section 10 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section10.title')}
                </h1>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                    {t('section10.subsection1.title')}
                  </h2>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {t('section10.subsection1.content')}
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section11.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section11.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section11.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section11.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section11.subsection2.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section11.subsection3.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section11.subsection3.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section11.subsection4.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section11.subsection4.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 12 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section12.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section12.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section12.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section12.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section12.subsection2.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 13 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section13.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section13.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section13.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section13.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section13.subsection2.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 14 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section14.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section14.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section14.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section14.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section14.subsection2.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section14.subsection3.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section14.subsection3.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section14.subsection4.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section14.subsection4.content')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 15 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section15.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section15.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section15.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section15.subsection2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section15.subsection2.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section15.subsection3.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section15.subsection3.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section15.subsection4.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section15.subsection4.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section15.subsection5.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section15.subsection5.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section15.subsection6.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section15.subsection6.content')}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

