import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface LevelInfo {
  level: number
  name: string
  description: string
  features: string[]
  variant: 'level1' | 'level2' | 'level3'
  color: string
  bgColor: string
  textColor: string
  featured?: boolean
}

const LEVELS: LevelInfo[] = [
  {
    level: 1,
    name: 'Foundational',
    description: 'Basic cyber hygiene for protecting Federal Contract Information (FCI)',
    features: ['17 security practices', 'Annual self-assessment', 'Protects FCI', 'Based on FAR 52.204-21'],
    variant: 'level1',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-500',
  },
  {
    level: 2,
    name: 'Advanced',
    description: 'Advanced cyber hygiene for protecting Controlled Unclassified Information (CUI)',
    features: ['110 security practices', 'C3PAO or self-assessment', 'Protects CUI', 'Based on NIST SP 800-171'],
    variant: 'level2',
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-500',
    featured: true,
  },
  {
    level: 3,
    name: 'Expert',
    description: 'Expert-level protection against advanced persistent threats (APTs)',
    features: ['134+ security practices', 'DIBCAC assessment', 'Protects CUI from APTs', 'Adds NIST SP 800-172'],
    variant: 'level3',
    color: 'navy',
    bgColor: 'bg-navy-100',
    textColor: 'text-navy-600',
  },
]

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
          {LEVELS.map((level) => (
            <Card
              key={level.level}
              className={`p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300 ${
                level.featured ? 'border-2 border-purple-200' : ''
              }`}
            >
              {level.featured && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge variant="warning" className="text-xs">Most Common</Badge>
                </div>
              )}
              <div className={`absolute top-0 right-0 w-32 h-32 ${level.bgColor} rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`} aria-hidden="true" />
              <div className="relative">
                <Badge variant={level.variant} className="mb-4 text-base px-4 py-1">Level {level.level}</Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.name}</h3>
                <p className="text-gray-600 mb-6">{level.description}</p>
                <ul className="space-y-3">
                  {level.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <CheckIcon className={level.textColor} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}
