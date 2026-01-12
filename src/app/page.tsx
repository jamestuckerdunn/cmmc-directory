import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WebSiteJsonLd, OrganizationJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd'
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CMMCLevelsSection,
  PricingSection,
  CTASection,
} from '@/components/home'
import { SITE_URL, SUPPORT_EMAIL } from '@/constants'

export default function HomePage() {
  return (
    <>
      <WebSiteJsonLd
        name="CMMC Directory"
        url={SITE_URL}
        description="The comprehensive directory of verified CMMC certified defense contractors"
        potentialAction={{
          target: `${SITE_URL}/directory?search={search_term_string}`,
          queryInput: 'required name=search_term_string',
        }}
      />
      <OrganizationJsonLd
        name="CMMC Directory"
        url={SITE_URL}
        description="CMMC Directory connects organizations with verified CMMC certified defense contractors."
        contactPoint={{
          type: 'customer support',
          email: SUPPORT_EMAIL,
        }}
      />
      <ServiceJsonLd
        name="CMMC Contractor Directory"
        description="Search and connect with CMMC certified companies in the defense industrial base."
        provider="CMMC Directory"
        areaServed="United States"
        serviceType="Business Directory"
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CMMCLevelsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
