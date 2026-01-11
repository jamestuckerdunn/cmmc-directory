import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge variant="warning" className="mb-4">CMMC 2.0 Compliant</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find CMMC Certified Defense Contractors
              </h1>
              <p className="text-xl text-navy-200 mb-8">
                Access our comprehensive directory of companies certified under the
                Cybersecurity Maturity Model Certification program. Connect with verified
                partners in the defense industrial base.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-navy-800 hover:bg-gray-100">
                    Get Started - $10/month
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-navy-700">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need to Find CMMC Partners
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our directory provides comprehensive information on CMMC certified companies
                across all certification levels.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
                <p className="text-gray-600">
                  Find companies by CMMC level, location, NAICS codes, and more.
                  Our powerful search makes it easy to find the right partner.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Certifications</h3>
                <p className="text-gray-600">
                  All listed companies have their CMMC certifications verified.
                  Trust that you're connecting with compliant contractors.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Register Your Company</h3>
                <p className="text-gray-600">
                  Add your CMMC certified company to the directory and get discovered
                  by organizations seeking compliant partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CMMC Levels Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Understanding CMMC Levels
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The Cybersecurity Maturity Model Certification has three levels,
                each designed to protect different types of information.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Badge variant="level1" className="mb-4">Level 1</Badge>
                <h3 className="text-xl font-semibold mb-2">Foundational</h3>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>15 security practices</li>
                  <li>Annual self-assessment</li>
                  <li>Protects Federal Contract Information (FCI)</li>
                  <li>Based on FAR 52.204-21</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Badge variant="level2" className="mb-4">Level 2</Badge>
                <h3 className="text-xl font-semibold mb-2">Advanced</h3>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>110 security practices</li>
                  <li>Self or C3PAO assessment</li>
                  <li>Protects Controlled Unclassified Information (CUI)</li>
                  <li>Based on NIST SP 800-171</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <Badge variant="level3" className="mb-4">Level 3</Badge>
                <h3 className="text-xl font-semibold mb-2">Expert</h3>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>110+ security practices</li>
                  <li>DIBCAC assessment</li>
                  <li>Protects CUI from APTs</li>
                  <li>Adds NIST SP 800-172 controls</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Your CMMC Partner?
            </h2>
            <p className="text-xl text-accent-light mb-8 max-w-2xl mx-auto">
              Join our directory today and get access to verified CMMC certified
              companies across the defense industrial base.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
                Start Your Subscription - $10/month
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
