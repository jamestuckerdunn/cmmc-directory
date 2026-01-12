'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState, useCallback } from 'react'
import { useClerkConfigured } from '@/components/providers/ClerkProviderWrapper'

interface SubscriptionState {
  isSubscribed: boolean
  isLoading: boolean
  createCheckout: () => Promise<void>
  openPortal: () => Promise<void>
}

export function useSubscription(): SubscriptionState {
  const isClerkConfigured = useClerkConfigured()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // This is safe because when Clerk is not configured,
  // ClerkProvider isn't mounted and useUser won't be called
  // in a component that requires it
  let user = null
  let isLoaded = true

  if (isClerkConfigured) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const clerkData = useUser()
    user = clerkData.user
    isLoaded = clerkData.isLoaded
  }

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
      try {
        const response = await fetch('/api/subscription/status')
        const data = await response.json()
        setIsSubscribed(data?.subscriptionStatus === 'active')
      } catch (error) {
        console.error('Error checking subscription:', error)
        setIsSubscribed(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSubscription()
  }, [user, isLoaded, isClerkConfigured])

  const createCheckout = useCallback(async () => {
    if (!isClerkConfigured) {
      console.warn('Clerk not configured, cannot create checkout')
      return
    }
    try {
      const response = await fetch('/api/subscription/checkout', {
        method: 'POST',
      })
      const { url, error } = await response.json()
      if (error) {
        console.error('Checkout error:', error)
        return
      }
      window.location.href = url
    } catch (error) {
      console.error('Failed to create checkout:', error)
    }
  }, [isClerkConfigured])

  const openPortal = useCallback(async () => {
    if (!isClerkConfigured) {
      console.warn('Clerk not configured, cannot open portal')
      return
    }
    try {
      const response = await fetch('/api/subscription/portal', {
        method: 'POST',
      })
      const { url, error } = await response.json()
      if (error) {
        console.error('Portal error:', error)
        return
      }
      window.location.href = url
    } catch (error) {
      console.error('Failed to open portal:', error)
    }
  }, [isClerkConfigured])

  return {
    isSubscribed,
    isLoading,
    createCheckout,
    openPortal,
  }
}
