'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { createContext, useContext } from 'react'

interface ClerkProviderWrapperProps {
  children: React.ReactNode
}

// Context to check if Clerk is configured
const ClerkConfigContext = createContext<boolean>(false)

export function useClerkConfigured() {
  return useContext(ClerkConfigContext)
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const isConfigured = !!(publishableKey && !publishableKey.includes('placeholder'))

  // Skip Clerk if using placeholder key (for build without real credentials)
  if (!isConfigured) {
    return (
      <ClerkConfigContext.Provider value={false}>
        {children}
      </ClerkConfigContext.Provider>
    )
  }

  return (
    <ClerkConfigContext.Provider value={true}>
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </ClerkConfigContext.Provider>
  )
}
