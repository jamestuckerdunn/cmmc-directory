import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  CMMCLevelsSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
} from '@/components/landing'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CMMCLevelsSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
