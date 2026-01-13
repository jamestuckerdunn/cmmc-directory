'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function CompaniesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Companies error:', error.message)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Card>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-blue-600"
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

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Companies
          </h2>
          <p className="text-gray-600 mb-6">
            There was a problem loading your companies. Please try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset}>
              Retry
            </Button>
            <Link href="/dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
