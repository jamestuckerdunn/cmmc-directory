'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSafeUser } from '@/components/providers/ClerkProviderWrapper'

interface SubscriptionState {
  isSubscribed: boolean
  isLoading: boolean
  error: string | null
  createCheckout: () => Promise<void>
  openPortal: () => Promise<void>
  retry: () => void
}

// Helper to validate URL is from allowed domains
function isValidRedirectUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    const allowedDomains = [
      'checkout.stripe.com',
      'billing.stripe.com',
      process.env.NEXT_PUBLIC_APP_URL ? new URL(process.env.NEXT_PUBLIC_APP_URL).hostname : null,
    ].filter(Boolean)
    return allowedDomains.some(domain => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

export function useSubscription(): SubscriptionState {
  // Use the safe hook that works whether Clerk is configured or not
  const { isConfigured: isClerkConfigured, user, isLoaded } = useSafeUser()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!isClerkConfigured) {
      setIsLoading(false)
      return
    }

    if (!isLoaded || !user) {
      setIsLoading(false)
      return
    }

    const checkSubscription = async () => {
      setError(null)
      try {
        const response = await fetch('/api/subscription/status')

        if (!response.ok) {
          if (response.status === 429) {
            setError('Too many requests. Please wait a moment.')
          } else if (response.status === 401) {
            setError('Please sign in to check subscription status.')
          } else {
            setError('Failed to check subscription status.')
          }
          setIsSubscribed(false)
          return
        }

        const data = await response.json()
        setIsSubscribed(data?.subscriptionStatus === 'active')
      } catch {
        setError('Network error. Please check your connection.')
        setIsSubscribed(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSubscription()
  }, [user, isLoaded, isClerkConfigured, retryCount])

  const retry = useCallback(() => {
    setIsLoading(true)
    setRetryCount(c => c + 1)
  }, [])

  const createCheckout = useCallback(async () => {
    if (!isClerkConfigured) {
      setError('Authentication not configured')
      return
    }
    setError(null)
    try {
      const response = await fetch('/api/subscription/checkout', {
        method: 'POST',
      })

      if (!response.ok) {
        if (response.status === 429) {
          setError('Too many requests. Please wait a moment before trying again.')
        } else if (response.status === 401) {
          setError('Please sign in to subscribe.')
        } else {
          setError('Failed to create checkout session.')
        }
        return
      }

      const { url, error: apiError } = await response.json()
      if (apiError) {
        setError(apiError)
        return
      }

      // Validate URL before redirect
      if (!url || !isValidRedirectUrl(url)) {
        setError('Invalid checkout URL received.')
        return
      }

      window.location.href = url
    } catch {
      setError('Network error. Please check your connection.')
    }
  }, [isClerkConfigured])

  const openPortal = useCallback(async () => {
    if (!isClerkConfigured) {
      setError('Authentication not configured')
      return
    }
    setError(null)
    try {
      const response = await fetch('/api/subscription/portal', {
        method: 'POST',
      })

      if (!response.ok) {
        if (response.status === 429) {
          setError('Too many requests. Please wait a moment before trying again.')
        } else if (response.status === 401) {
          setError('Please sign in to manage your subscription.')
        } else if (response.status === 400) {
          setError('No active subscription found.')
        } else {
          setError('Failed to open billing portal.')
        }
        return
      }

      const { url, error: apiError } = await response.json()
      if (apiError) {
        setError(apiError)
        return
      }

      // Validate URL before redirect
      if (!url || !isValidRedirectUrl(url)) {
        setError('Invalid portal URL received.')
        return
      }

      window.location.href = url
    } catch {
      setError('Network error. Please check your connection.')
    }
  }, [isClerkConfigured])

  return {
    isSubscribed,
    isLoading,
    error,
    createCheckout,
    openPortal,
    retry,
  }
}
