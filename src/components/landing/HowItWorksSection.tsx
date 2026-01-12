import { Badge } from '@/components/ui/Badge'

const STEPS = [
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
] as const

export function HowItWorksSection() {
  return (
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
          {STEPS.map((item, i) => (
            <div key={item.step} className="relative">
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
  )
}
