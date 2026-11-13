import { LandingFooter } from '@/components/layout/LandingFooter';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import { CtaSection } from '@/features/landing/components/CtaSection';
import { FeaturesSection } from '@/features/landing/components/FeaturesSection';
import { ForCollegesSection } from '@/features/landing/components/ForCollegesSection';
import { ForStudentsSection } from '@/features/landing/components/ForStudentsSection';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { HowItWorksSection } from '@/features/landing/components/HowItWorksSection';
import { StatsSection } from '@/features/landing/components/StatsSection';
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <HeroSection />

      <StatsSection />

      <FeaturesSection />

      <HowItWorksSection />

      <ForStudentsSection />

      <ForCollegesSection />

      <TestimonialsSection />

      <CtaSection />
      <LandingFooter />
    </div>
  );
}
