'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard error:', error.message)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Card>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an error while loading your dashboard. This might be a temporary issue.
          </p>

          {error.digest && (
            <p className="text-xs text-gray-400 mb-4 font-mono">
              Reference: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset}>
              Retry
            </Button>
            <Link href="/">
              <Button variant="outline">
                Go to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
