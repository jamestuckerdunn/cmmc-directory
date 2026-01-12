import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-accent-dark text-white py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="warning" className="mb-6">
            CMMC 2.0 Compliant Directory
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Trusted
            <span className="block text-accent-light">CMMC Certified</span>
            Defense Contractors
          </h1>
          <p className="text-xl text-navy-200 mb-8 leading-relaxed max-w-2xl mx-auto">
            The comprehensive directory of verified CMMC certified companies.
            Connect with compliant partners in the defense industrial base.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-navy-800 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all">
                Get Started
                <ArrowRightIcon />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}
