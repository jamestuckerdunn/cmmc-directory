import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section - Modern gradient with animated elements */}
        <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-accent-dark text-white py-24 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="warning" className="mb-6 animate-fade-in">
                  CMMC 2.0 Compliant Directory
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Find Trusted
                  <span className="block text-accent-light">CMMC Certified</span>
                  Defense Contractors
                </h1>
                <p className="text-xl text-navy-200 mb-8 leading-relaxed">
                  Access the most comprehensive directory of verified CMMC certified companies.
                  Connect with compliant partners in the defense industrial base with confidence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/sign-up">
                    <Button size="lg" className="bg-white text-navy-800 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all">
                      Get Started Free
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                      Learn More
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-10 pt-10 border-t border-white/10">
                  <p className="text-sm text-navy-300 mb-4">Trusted by defense contractors nationwide</p>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-3xl font-bold">500+</p>
                      <p className="text-sm text-navy-300">Verified Companies</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">50</p>
                      <p className="text-sm text-navy-300">States Covered</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">99%</p>
                      <p className="text-sm text-navy-300">Verification Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero illustration */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-2xl" />
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="space-y-4">
                      {/* Mock company cards */}
                      {[
                        { name: 'Secure Defense Corp', level: 3, location: 'Virginia' },
                        { name: 'CyberShield Systems', level: 2, location: 'Maryland' },
                        { name: 'DataGuard Solutions', level: 2, location: 'California' },
                      ].map((company, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/10 hover:bg-white/20 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-navy-600 rounded-lg flex items-center justify-center">
                                <span className="font-bold">{company.name.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-semibold">{company.name}</p>
                                <p className="text-sm text-navy-300">{company.location}</p>
                              </div>
                            </div>
                            <Badge variant={company.level === 3 ? 'level3' : 'level2'} className="bg-white/20">
                              Level {company.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Verified Companies', icon: '🏢' },
                { number: '3', label: 'CMMC Levels', icon: '🛡️' },
                { number: '21', label: 'Industry Sectors', icon: '📊' },
                { number: '24/7', label: 'Directory Access', icon: '🔓' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <p className="text-3xl font-bold text-navy-800">{stat.number}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Redesigned */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Find CMMC Partners
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our comprehensive directory provides all the tools you need to find and connect with verified CMMC certified contractors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  title: 'Advanced Search',
                  description: 'Filter by CMMC level, location, NAICS codes, and more. Find exactly the partner you need with our powerful search.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Verified Certifications',
                  description: 'Every company in our directory has their CMMC certification verified. Trust that you\'re connecting with compliant contractors.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  title: 'Register Your Company',
                  description: 'Add your CMMC certified company to the directory and get discovered by organizations seeking compliant partners.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: 'Detailed Profiles',
                  description: 'Access comprehensive company profiles including certifications, contact info, services, and NAICS codes.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: 'Secure Platform',
                  description: 'Your data is protected with enterprise-grade security. We take compliance and security seriously.',
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Real-Time Updates',
                  description: 'Our directory is continuously updated as new companies are verified and certifications are renewed.',
                },
              ].map((feature, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-transparent hover:border-accent/20">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 text-accent">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">How It Works</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Started in Minutes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Finding verified CMMC contractors has never been easier.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Create Your Account',
                  description: 'Sign up for a subscription to access our full directory of verified CMMC certified companies.',
                },
                {
                  step: '02',
                  title: 'Search & Filter',
                  description: 'Use our powerful search tools to find companies by certification level, location, and industry.',
                },
                {
                  step: '03',
                  title: 'Connect & Collaborate',
                  description: 'View detailed profiles and contact verified contractors directly to start your partnership.',
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200" />
                  )}
                  <div className="relative bg-white z-10">
                    <div className="w-24 h-24 bg-navy-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl font-bold text-white">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{item.title}</h3>
                    <p className="text-gray-600 text-center">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CMMC Levels Section - Enhanced */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">Certification Levels</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Understanding CMMC 2.0 Levels
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The Cybersecurity Maturity Model Certification has three levels, each designed to protect different types of information.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                <div className="relative">
                  <Badge variant="level1" className="mb-4 text-base px-4 py-1">Level 1</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Foundational</h3>
                  <p className="text-gray-600 mb-6">Basic cyber hygiene for protecting Federal Contract Information (FCI)</p>
                  <ul className="space-y-3">
                    {['15 security practices', 'Annual self-assessment', 'Protects FCI', 'Based on FAR 52.204-21'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card className="p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 border-purple-200">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge variant="warning" className="text-xs">Most Common</Badge>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                <div className="relative">
                  <Badge variant="level2" className="mb-4 text-base px-4 py-1">Level 2</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced</h3>
                  <p className="text-gray-600 mb-6">Advanced cyber hygiene for protecting Controlled Unclassified Information (CUI)</p>
                  <ul className="space-y-3">
                    {['110 security practices', 'C3PAO or self-assessment', 'Protects CUI', 'Based on NIST SP 800-171'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card className="p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-navy-100 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                <div className="relative">
                  <Badge variant="level3" className="mb-4 text-base px-4 py-1">Level 3</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Expert</h3>
                  <p className="text-gray-600 mb-6">Expert-level protection against advanced persistent threats (APTs)</p>
                  <ul className="space-y-3">
                    {['110+ security practices', 'DIBCAC assessment', 'Protects CUI from APTs', 'Adds NIST SP 800-172'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-navy-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Defense Contractors
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See what our members say about finding partners through CMMC Directory.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "CMMC Directory helped us find a Level 2 certified subcontractor in just two days. The verification process gave us confidence in their compliance status.",
                  author: "Sarah Chen",
                  role: "Director of Procurement",
                  company: "Apex Defense Systems",
                },
                {
                  quote: "As a small business, getting listed in the directory significantly increased our visibility. We've connected with three new prime contractors since joining.",
                  author: "Michael Torres",
                  role: "CEO",
                  company: "SecureNet Solutions",
                },
                {
                  quote: "The search filters make it incredibly easy to find contractors by NAICS code and certification level. It's become an essential tool for our supply chain management.",
                  author: "Jennifer Walsh",
                  role: "Supply Chain Manager",
                  company: "Meridian Defense Corp",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold text-navy-800">{testimonial.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">Pricing</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                One plan, full access. No hidden fees or complicated tiers.
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <Card className="p-8 border-2 border-accent shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Best Value
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-5xl font-bold text-navy-800">$10</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mt-2">Cancel anytime</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'Unlimited directory searches',
                    'Access all verified company profiles',
                    'Advanced filtering by level, state, NAICS',
                    'Register your own companies',
                    'Direct contact information',
                    'Priority support',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-success mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up" className="block">
                  <Button size="lg" className="w-full">
                    Start Your Subscription
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>

                <p className="text-center text-sm text-gray-500 mt-4">
                  7-day money-back guarantee
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-20 bg-gradient-to-br from-accent to-accent-dark relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your CMMC Partner?
            </h2>
            <p className="text-xl text-accent-light mb-8 max-w-2xl mx-auto">
              Join hundreds of defense contractors using CMMC Directory to find verified,
              compliant partners in the defense industrial base.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-accent hover:bg-gray-100 shadow-lg">
                  Get Started Today
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  View FAQ
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
