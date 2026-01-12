import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const HERO_COMPANIES = [
  { name: 'Secure Defense Corp', level: 3, location: 'Virginia' },
  { name: 'CyberShield Systems', level: 2, location: 'Maryland' },
  { name: 'DataGuard Solutions', level: 2, location: 'California' },
] as const

const TRUST_STATS = [
  { value: '500+', label: 'Verified Companies' },
  { value: '50', label: 'States Covered' },
  { value: '99%', label: 'Verification Rate' },
] as const

export function HeroSection() {
  return (
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
                {TRUST_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-navy-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  {HERO_COMPANIES.map((company) => (
                    <div key={company.name} className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/10 hover:bg-white/20 transition-colors">
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
  )
}
