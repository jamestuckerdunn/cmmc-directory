import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { SUBSCRIPTION_PRICE, SUPPORT_EMAIL } from '@/constants'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about CMMC Directory, certification requirements, and how to list your company.',
  openGraph: {
    title: 'FAQ - CMMC Directory',
    description: 'Find answers to common questions about CMMC Directory and certification.',
  },
}

// Single source of truth for FAQ data
const faqs = [
  {
    category: 'About CMMC Directory',
    questions: [
      {
        q: 'What is CMMC Directory?',
        a: 'CMMC Directory is a comprehensive online platform that connects organizations seeking CMMC-certified defense contractors with verified, compliant companies. Our directory helps streamline the process of finding trusted partners in the defense industrial base.',
      },
      {
        q: 'Who can use this directory?',
        a: 'Any organization that needs to find CMMC-certified contractors can subscribe to access our directory. This includes prime contractors, government agencies, and organizations within the defense industrial base seeking compliant partners for their supply chain.',
      },
      {
        q: 'How much does a subscription cost?',
        a: `Access to the CMMC Directory is $${SUBSCRIPTION_PRICE} per month. This gives you unlimited access to search, filter, and view detailed information about all verified companies in our directory.`,
      },
    ],
  },
  {
    category: 'For Listed Companies',
    questions: [
      {
        q: 'How do I get my company listed?',
        a: 'Simply create an account, subscribe to our service, and complete the company registration form with your CMMC certification details. Our team will verify your certification before your listing goes live.',
      },
      {
        q: 'What information do I need to provide?',
        a: 'You\'ll need to provide basic company information (name, address, contact details), your CMMC certification level, assessment type, certification dates, and relevant NAICS codes for your services.',
      },
      {
        q: 'How long does verification take?',
        a: 'Most company verifications are completed within 1-3 business days. We\'ll notify you via email once your listing has been verified and is live in the directory.',
      },
      {
        q: 'Can I update my listing after it\'s published?',
        a: 'Yes! You can update your company information at any time through your dashboard. Some changes may require re-verification.',
      },
    ],
  },
  {
    category: 'About CMMC Certification',
    questions: [
      {
        q: 'What is CMMC?',
        a: 'The Cybersecurity Maturity Model Certification (CMMC) is a unified standard for implementing cybersecurity across the Defense Industrial Base (DIB). It was created by the Department of Defense to protect sensitive unclassified information.',
      },
      {
        q: 'What are the CMMC levels?',
        a: 'CMMC 2.0 has three levels: Level 1 (Foundational) covers 15 practices for protecting FCI with annual self-assessment. Level 2 (Advanced) covers 110 practices from NIST SP 800-171 for protecting CUI. Level 3 (Expert) adds additional practices from NIST SP 800-172 for protecting CUI from APTs.',
      },
      {
        q: 'What is a C3PAO?',
        a: 'A CMMC Third-Party Assessment Organization (C3PAO) is an authorized organization that conducts CMMC Level 2 assessments. These organizations are accredited by the Cyber-AB to perform official CMMC certifications.',
      },
    ],
  },
  {
    category: 'Account & Billing',
    questions: [
      {
        q: 'How do I cancel my subscription?',
        a: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express) through our secure payment processor, Stripe.',
      },
      {
        q: 'Can I get a refund?',
        a: 'We offer a pro-rated refund within the first 7 days of your subscription if you\'re not satisfied with our service. Contact our support team for assistance.',
      },
    ],
  },
]

// Generate flattened FAQ for JSON-LD from the single source of truth
const allFaqQuestions = faqs.flatMap(section =>
  section.questions.map(faq => ({ question: faq.q, answer: faq.a }))
)

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd questions={allFaqQuestions} />
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-navy-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-navy-200">
              Find answers to common questions about CMMC Directory and CMMC certification.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {faqs.map((section) => (
                <div key={section.category}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                    {section.category}
                  </h2>
                  <div className="space-y-4">
                    {section.questions.map((faq, index) => (
                      <Card key={index} className="overflow-hidden">
                        <details className="group">
                          <summary className="flex items-center justify-between cursor-pointer list-none p-6 hover:bg-gray-50 transition-colors">
                            <h3 className="font-semibold text-gray-900 pr-4">{faq.q}</h3>
                            <svg
                              className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                            {faq.a}
                          </div>
                        </details>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <Card className="mt-12 bg-accent text-white">
              <div className="text-center py-8 px-6">
                <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                <p className="text-accent-light mb-6">
                  Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center px-6 py-3 bg-white text-accent font-semibold rounded hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </a>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
