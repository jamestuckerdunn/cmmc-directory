'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function DirectoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Directory error:', error.message)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Card>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Directory Search Failed
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t load the company directory. Please try again or adjust your search filters.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset}>
              Try Again
            </Button>
            <Link href="/directory">
              <Button variant="outline">
                Clear Filters
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
