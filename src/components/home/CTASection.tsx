import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent to-accent-dark relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Find Your CMMC Partner?
        </h2>
        <p className="text-xl text-accent-light mb-8 max-w-2xl mx-auto">
          Join defense contractors using CMMC Directory to find verified,
          compliant partners in the defense industrial base.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100 shadow-lg">
              Get Started Today
              <ArrowRightIcon />
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
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}
