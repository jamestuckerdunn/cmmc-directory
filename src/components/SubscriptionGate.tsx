'use client'

import { useSubscription } from '@/hooks/useSubscription'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SUBSCRIPTION_PRICE } from '@/constants'

export function SubscriptionGate() {
  const { createCheckout, isLoading } = useSubscription()

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Card className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-navy-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Subscribe to Access the Directory
          </h2>
          <p className="text-gray-600 mb-6">
            Get unlimited access to our database of CMMC certified companies for just ${SUBSCRIPTION_PRICE}/month.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-4xl font-bold text-navy-800 mb-2">
            ${SUBSCRIPTION_PRICE}<span className="text-lg font-normal text-gray-600">/month</span>
          </div>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Search all verified CMMC companies
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Filter by level, location, and NAICS codes
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              View company compliance details
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Register your own company
            </li>
          </ul>
        </div>

        <Button onClick={createCheckout} isLoading={isLoading} className="w-full">
          Subscribe Now
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          Cancel anytime. No long-term commitment required.
        </p>
      </Card>
    </div>
  )
}
