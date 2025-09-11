'use client';

import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/features/hero-section';
import { BenefitsSection } from '@/components/features/benefits-section';
import { DemoSection } from '@/components/features/demo-section';
import { SocialProofSection } from '@/components/features/social-proof-section';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <DemoSection />
      <SocialProofSection />
      <Footer />
    </main>
  );
}
