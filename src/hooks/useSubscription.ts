'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useClerkConfigured } from '@/components/providers/ClerkProviderWrapper'

export function useSubscription() {
  const isClerkConfigured = useClerkConfigured()

  // Only call useUser when Clerk is configured
  const clerkUser = isClerkConfigured ? useUser() : { user: null, isLoaded: true }
  const { user, isLoaded } = clerkUser

  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isClerkConfigured || !isLoaded || !user) {
      setIsLoading(false)
      return
    }

    const checkSubscription = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('users')
          .select('subscription_status')
          .eq('clerk_id', user.id)
          .single()

        setIsSubscribed(data?.subscription_status === 'active')
      } catch (error) {
        console.error('Error checking subscription:', error)
        setIsSubscribed(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSubscription()
  }, [user, isLoaded, isClerkConfigured])

  const createCheckout = async () => {
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
  }

  const openPortal = async () => {
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
  }

  return {
    isSubscribed,
    isLoading,
    createCheckout,
    openPortal,
  }
}
