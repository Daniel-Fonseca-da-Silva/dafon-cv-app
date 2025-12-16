'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacyPolicy');

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
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {t('section1.content')}
                </p>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  <strong>{t('section1.compliance')}</strong> {t('section1.complianceContent')}
                </p>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  <strong>{t('section1.serviceOverview')}</strong> {t('section1.serviceOverviewContent')}
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section2.title')}
                </h1>
                <div className="space-y-2 text-sm sm:text-base text-white/80">
                  <p><strong>{t('section2.dataController')}:</strong> {t('section2.dataControllerValue')}</p>
                  <p><strong>{t('section2.privacyInquiries')}:</strong> {t('section2.privacyInquiriesValue')}</p>
                  <p><strong>{t('section2.customerSupport')}:</strong> {t('section2.customerSupportValue')}</p>
                </div>
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
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section3.subsection1.accountInfo')}</li>
                      <li>{t('section3.subsection1.paymentInfo')}</li>
                      <li>{t('section3.subsection1.communicationData')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section3.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section3.subsection2.usageData')}</li>
                      <li>{t('section3.subsection2.technicalInfo')}</li>
                      <li>{t('section3.subsection2.botInteraction')}</li>
                      <li>{t('section3.subsection2.sessionInfo')}</li>
                      <li>{t('section3.subsection2.profileData')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section3.subsection3.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section3.subsection3.siteAnalysis')}</li>
                      <li>{t('section3.subsection3.marketingAttribution')}</li>
                      <li>{t('section3.subsection3.cookieData')}</li>
                    </ul>
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
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section4.subsection1.consent')}</li>
                      <li>{t('section4.subsection1.contract')}</li>
                      <li>{t('section4.subsection1.legitimateInterest')}</li>
                      <li>{t('section4.subsection1.legalCompliance')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section4.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section4.subsection2.consent')}</li>
                      <li>{t('section4.subsection2.contract')}</li>
                      <li>{t('section4.subsection2.legitimateInterests')}</li>
                      <li>{t('section4.subsection2.legalObligation')}</li>
                      <li>{t('section4.subsection2.sensitiveData')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section4.subsection3.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section4.subsection3.serviceDelivery')}</li>
                      <li>{t('section4.subsection3.aiProcessing')}</li>
                      <li>{t('section4.subsection3.paymentProcessing')}</li>
                      <li>{t('section4.subsection3.customerSupport')}</li>
                      <li>{t('section4.subsection3.serviceImprovement')}</li>
                      <li>{t('section4.subsection3.marketingAnalysis')}</li>
                      <li>{t('section4.subsection3.legalCompliance')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section5.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section5.subsection1.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section5.subsection1.contentAnalysis')}</li>
                      <li>{t('section5.subsection1.jobScoring')}</li>
                      <li>{t('section5.subsection1.contextExpansion')}</li>
                      <li>{t('section5.subsection1.recommendationGeneration')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section5.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section5.subsection2.humanReview')}</li>
                      <li>{t('section5.subsection2.understandLogic')}</li>
                      <li>{t('section5.subsection2.optOut')}</li>
                      <li>{t('section5.subsection2.accessInfo')}</li>
                    </ul>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {t('section5.transparency')}
                  </p>
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
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section6.subsection4.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section6.subsection4.googleAnalytics')}</li>
                      <li>{t('section6.subsection4.facebookPixel')}</li>
                      <li>{t('section6.subsection4.yahooAnalytics')}</li>
                    </ul>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-semibold">
                    {t('section6.noDataSale')}
                  </p>
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
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section7.subsection1.usa')}</li>
                      <li>{t('section7.subsection1.eu')}</li>
                      <li>{t('section7.subsection1.other')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section7.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section7.subsection2.sccs')}</li>
                      <li>{t('section7.subsection2.dataProcessing')}</li>
                      <li>{t('section7.subsection2.privacyShield')}</li>
                      <li>{t('section7.subsection2.adequateProtection')}</li>
                    </ul>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {t('section7.userRights')}
                  </p>
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
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section8.subsection1.accountData')}</li>
                      <li>{t('section8.subsection1.paymentInfo')}</li>
                      <li>{t('section8.subsection1.usageAnalysis')}</li>
                      <li>{t('section8.subsection1.marketingData')}</li>
                      <li>{t('section8.subsection1.legalCompliance')}</li>
                    </ul>
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
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section9.subsection1.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section9.subsection1.informed')}</li>
                      <li>{t('section9.subsection1.access')}</li>
                      <li>{t('section9.subsection1.rectification')}</li>
                      <li>{t('section9.subsection1.deletion')}</li>
                      <li>{t('section9.subsection1.portability')}</li>
                      <li>{t('section9.subsection1.opposition')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section9.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section9.subsection2.confirmation')}</li>
                      <li>{t('section9.subsection2.information')}</li>
                      <li>{t('section9.subsection2.anonymization')}</li>
                      <li>{t('section9.subsection2.withdrawConsent')}</li>
                      <li>{t('section9.subsection2.explanation')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section9.subsection3.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section9.subsection3.know')}</li>
                      <li>{t('section9.subsection3.delete')}</li>
                      <li>{t('section9.subsection3.optOut')}</li>
                      <li>{t('section9.subsection3.nonDiscrimination')}</li>
                      <li>{t('section9.subsection3.correct')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section9.subsection4.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section9.subsection4.access')}</li>
                      <li>{t('section9.subsection4.contest')}</li>
                      <li>{t('section9.subsection4.withdrawConsent')}</li>
                      <li>{t('section9.subsection4.complain')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 10 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section10.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section10.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      {t('section10.subsection1.content')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section10.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section10.subsection2.responseTime')}</li>
                      <li>{t('section10.subsection2.identityVerification')}</li>
                      <li>{t('section10.subsection2.noFee')}</li>
                      <li>{t('section10.subsection2.statusUpdates')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section10.subsection3.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section10.subsection3.dataAccess')}</li>
                      <li>{t('section10.subsection3.dataDeletion')}</li>
                      <li>{t('section10.subsection3.dataPortability')}</li>
                      <li>{t('section10.subsection3.consentWithdrawal')}</li>
                    </ul>
                  </div>
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
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section11.subsection1.essential')}</li>
                      <li>{t('section11.subsection1.analytics')}</li>
                      <li>{t('section11.subsection1.marketing')}</li>
                      <li>{t('section11.subsection1.preference')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section11.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section11.subsection2.granularControl')}</li>
                      <li>{t('section11.subsection2.consentManagement')}</li>
                      <li>{t('section11.subsection2.withdrawalRights')}</li>
                      <li>{t('section11.subsection2.equalProminence')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section11.subsection3.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section11.subsection3.gpc')}</li>
                      <li>{t('section11.subsection3.cookieSettings')}</li>
                      <li>{t('section11.subsection3.marketingOptOut')}</li>
                      <li>{t('section11.subsection3.analyticsOptOut')}</li>
                    </ul>
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
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section12.subsection1.encryption')}</li>
                      <li>{t('section12.subsection1.accessControls')}</li>
                      <li>{t('section12.subsection1.regularAudits')}</li>
                      <li>{t('section12.subsection1.employeeTraining')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section12.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section12.subsection2.detection')}</li>
                      <li>{t('section12.subsection2.assessment')}</li>
                      <li>{t('section12.subsection2.notification')}</li>
                      <li>{t('section12.subsection2.userCommunication')}</li>
                      <li>{t('section12.subsection2.remediation')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section12.subsection3.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section12.subsection3.privacyByDesign')}</li>
                      <li>{t('section12.subsection3.dataMinimization')}</li>
                      <li>{t('section12.subsection3.regularDeletion')}</li>
                      <li>{t('section12.subsection3.vendorSecurity')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 13 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section13.title')}
                </h1>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {t('section13.content')}
                </p>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {t('section13.parentsCan')}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed ml-4">
                  <li>{t('section13.requestAccess')}</li>
                  <li>{t('section13.requestDeletion')}</li>
                  <li>{t('section13.refuseCollection')}</li>
                </ul>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {t('section13.enhancedProtections')}
                </p>
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
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section14.subsection1.explicitConsent')}</li>
                      <li>{t('section14.subsection1.serviceRelationship')}</li>
                      <li>{t('section14.subsection1.legitimateInterest')}</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section14.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section14.subsection2.subscriptionManagement')}</li>
                      <li>{t('section14.subsection2.granularPreferences')}</li>
                      <li>{t('section14.subsection2.immediateEffect')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 15 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section15.title')}
                </h1>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                  <li>{t('section15.siteNotice')}</li>
                  <li>{t('section15.emailNotification')}</li>
                  <li>{t('section15.serviceNotification')}</li>
                </ul>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {t('section15.reviewPeriod')}
                </p>
              </section>

              {/* Section 16 */}
              <section className="space-y-3 sm:space-y-4">
                <h1 className="text-lg sm:text-xl font-semibold text-white">
                  {t('section16.title')}
                </h1>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section16.subsection1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      <strong>{t('section16.subsection1.email')}:</strong> {t('section16.subsection1.emailValue')}
                    </p>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      <strong>{t('section16.subsection1.responseTime')}:</strong> {t('section16.subsection1.responseTimeValue')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90">
                      {t('section16.subsection2.title')}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
                      <li>{t('section16.subsection2.brazil')}</li>
                      <li>{t('section16.subsection2.eu')}</li>
                      <li>{t('section16.subsection2.california')}</li>
                      <li>{t('section16.subsection2.canada')}</li>
                    </ul>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {t('section16.commitment')}
                  </p>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {t('section16.compliance')}
                  </p>
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

