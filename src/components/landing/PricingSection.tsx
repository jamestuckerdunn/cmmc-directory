import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const PRICING_FEATURES = [
  'Unlimited directory searches',
  'Access all verified company profiles',
  'Advanced filtering by level, state, NAICS',
  'Register your own companies',
  'Direct contact information',
  'Priority support',
] as const

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-success mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}

export function PricingSection() {
  return (
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
              {PRICING_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckIcon />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/sign-up" className="block">
              <Button size="lg" className="w-full">
                Start Your Subscription
                <ArrowIcon />
              </Button>
            </Link>

            <p className="text-center text-sm text-gray-500 mt-4">
              7-day money-back guarantee
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
