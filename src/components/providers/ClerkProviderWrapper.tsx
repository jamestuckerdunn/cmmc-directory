'use client'

import { ClerkProvider, useUser as useClerkUser } from '@clerk/nextjs'
import { createContext, useContext, type ReactNode } from 'react'
import type { UserResource } from '@clerk/types'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

interface ClerkContextValue {
  isConfigured: boolean
  user: UserResource | null | undefined
  isLoaded: boolean
}

// Context to check if Clerk is configured and provide user data safely
const ClerkConfigContext = createContext<ClerkContextValue>({
  isConfigured: false,
  user: null,
  isLoaded: true,
})

export function useClerkConfigured() {
  return useContext(ClerkConfigContext).isConfigured
}

// Safe hook to get user data - works whether Clerk is configured or not
export function useSafeUser() {
  const { isConfigured, user, isLoaded } = useContext(ClerkConfigContext)
  return { isConfigured, user, isLoaded }
}

// Inner component that can safely use Clerk hooks (runs inside ClerkProvider)
function ClerkUserProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useClerkUser()

  return (
    <ClerkConfigContext.Provider value={{ isConfigured: true, user, isLoaded }}>
      {children}
    </ClerkConfigContext.Provider>
  )
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const isConfigured = !!(publishableKey && !publishableKey.includes('placeholder'))

  // Skip Clerk if using placeholder key (for build without real credentials)
  if (!isConfigured) {
    return (
      <ClerkConfigContext.Provider value={{ isConfigured: false, user: null, isLoaded: true }}>
        {children}
      </ClerkConfigContext.Provider>
    )
  }

  return (
    <ClerkProvider>
      <ClerkUserProvider>
        {children}
      </ClerkUserProvider>
    </ClerkProvider>
  )
}
