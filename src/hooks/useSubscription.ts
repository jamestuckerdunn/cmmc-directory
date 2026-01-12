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

function useClerkUser() {
  const isClerkConfigured = useClerkConfigured()
  const clerkData = useUser()

  if (!isClerkConfigured) {
    return { user: null, isLoaded: true }
  }
  return clerkData
}

export function useSubscription(): SubscriptionState {
  const isClerkConfigured = useClerkConfigured()
  const { user, isLoaded } = useClerkUser()

  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isClerkConfigured || !isLoaded || !user) {
      setIsLoading(false)
      return
    }

    async function fetchSubscriptionStatus() {
      try {
        const response = await fetch('/api/subscription/status')
        const data = await response.json()
        setIsSubscribed(data?.subscriptionStatus === 'active')
      } catch {
        setIsSubscribed(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptionStatus()
  }, [user, isLoaded, isClerkConfigured])

  const createCheckout = useCallback(async () => {
    try {
      const response = await fetch('/api/subscription/checkout', { method: 'POST' })
      const { url, error } = await response.json()
      if (!error && url) {
        window.location.href = url
      }
    } catch {
      // Checkout failed silently
    }
  }, [])

  const openPortal = useCallback(async () => {
    try {
      const response = await fetch('/api/subscription/portal', { method: 'POST' })
      const { url, error } = await response.json()
      if (!error && url) {
        window.location.href = url
      }
    } catch {
      // Portal failed silently
    }
  }, [])

  return { isSubscribed, isLoading, createCheckout, openPortal }
}
