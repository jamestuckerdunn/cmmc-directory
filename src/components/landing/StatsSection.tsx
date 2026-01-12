const STATS = [
  { number: '500+', label: 'Verified Companies', icon: '🏢' },
  { number: '3', label: 'CMMC Levels', icon: '🛡️' },
  { number: '21', label: 'Industry Sectors', icon: '📊' },
  { number: '24/7', label: 'Directory Access', icon: '🔓' },
] as const

export function StatsSection() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold text-navy-800">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
