'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function CompanyDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Company detail error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Company Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          We couldn&apos;t load this company&apos;s information. The company may have been removed or there was a temporary issue.
        </p>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-800 focus:ring-offset-2"
          >
            Try Again
          </button>

          <Link
            href="/companies"
            className="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-800 focus:ring-offset-2"
          >
            Back to My Companies
          </Link>

          <Link
            href="/directory"
            className="block w-full px-4 py-2 text-navy-800 hover:text-navy-600 transition-colors focus:outline-none focus:underline"
          >
            Browse Directory
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-gray-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
