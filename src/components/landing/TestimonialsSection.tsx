import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

const TESTIMONIALS = [
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
] as const

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('')
}

export function TestimonialsSection() {
  return (
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
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.author} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-navy-800">{getInitials(testimonial.author)}</span>
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
  )
}
