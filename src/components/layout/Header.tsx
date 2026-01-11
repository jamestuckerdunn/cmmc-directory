'use client'

import Link from 'next/link'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/Button'
import { useClerkConfigured } from '@/components/providers/ClerkProviderWrapper'

function AuthenticatedNav() {
  const isClerkConfigured = useClerkConfigured()

  if (!isClerkConfigured) {
    // Show sign-in buttons when Clerk is not configured (for build/dev without credentials)
    return (
      <>
        <Link href="/sign-in">
          <Button variant="outline" size="sm" className="border-white text-white hover:bg-navy-700">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm" className="bg-white text-navy-800 hover:bg-gray-100">
            Get Started
          </Button>
        </Link>
      </>
    )
  }

  return (
    <>
      <SignedIn>
        <Link href="/directory" className="hover:text-navy-200 transition-colors">
          Directory
        </Link>
        <Link href="/companies" className="hover:text-navy-200 transition-colors">
          My Companies
        </Link>
        <Link href="/settings" className="hover:text-navy-200 transition-colors">
          Settings
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button variant="outline" size="sm" className="border-white text-white hover:bg-navy-700">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm" className="bg-white text-navy-800 hover:bg-gray-100">
            Get Started
          </Button>
        </Link>
      </SignedOut>
    </>
  )
}

function MobileAuthNav() {
  const isClerkConfigured = useClerkConfigured()

  if (!isClerkConfigured) {
    return (
      <Link href="/sign-in">
        <Button size="sm" className="bg-white text-navy-800">
          Sign In
        </Button>
      </Link>
    )
  }

  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button size="sm" className="bg-white text-navy-800">
            Sign In
          </Button>
        </Link>
      </SignedOut>
    </>
  )
}

export function Header() {
  return (
    <header className="bg-navy-800 text-white">
      {/* Top bar */}
      <div className="bg-navy-900 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-navy-200">
            An official directory of CMMC certified companies
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              <span className="text-navy-800 font-bold text-lg">CM</span>
            </div>
            <span className="font-bold text-xl">CMMC Directory</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <AuthenticatedNav />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileAuthNav />
          </div>
        </div>
      </div>
    </header>
  )
}
