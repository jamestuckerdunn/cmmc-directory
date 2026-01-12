import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

const LEVEL_1_ITEMS = ['15 security practices', 'Annual self-assessment', 'Protects FCI', 'Based on FAR 52.204-21']
const LEVEL_2_ITEMS = ['110 security practices', 'C3PAO or self-assessment', 'Protects CUI', 'Based on NIST SP 800-171']
const LEVEL_3_ITEMS = ['110+ security practices', 'DIBCAC assessment', 'Protects CUI from APTs', 'Adds NIST SP 800-172']

function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function CMMCLevelsSection() {
  return (
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
                {LEVEL_1_ITEMS.map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <CheckIcon className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
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
                {LEVEL_2_ITEMS.map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <CheckIcon className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
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
                {LEVEL_3_ITEMS.map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <CheckIcon className="w-5 h-5 text-navy-600 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
