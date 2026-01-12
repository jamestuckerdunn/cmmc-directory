import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-navy-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-6xl font-bold text-navy-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
              The page may have been moved or deleted.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button size="lg" className="w-full">
                Go to Homepage
              </Button>
            </Link>
            <Link href="/directory" className="block">
              <Button variant="outline" size="lg" className="w-full">
                Browse Directory
              </Button>
            </Link>
            <Link href="/faq" className="block">
              <Button variant="ghost" size="lg" className="w-full">
                View FAQ
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Need help? Contact our support team.
            </p>
            <a
              href="mailto:support@cmmcdirectory.com"
              className="text-accent hover:text-accent-dark transition-colors focus:outline-none focus:underline"
            >
              support@cmmcdirectory.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
