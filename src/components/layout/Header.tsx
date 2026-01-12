'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/Button'
import { useClerkConfigured } from '@/components/providers/ClerkProviderWrapper'

function AuthenticatedNav() {
  const isClerkConfigured = useClerkConfigured()

  if (!isClerkConfigured) {
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
        <Link href="/dashboard" className="hover:text-navy-200 transition-colors">
          Dashboard
        </Link>
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

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const isClerkConfigured = useClerkConfigured()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="fixed right-0 top-0 h-full w-72 bg-navy-800 shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-navy-700">
          <span className="font-bold text-lg text-white">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-navy-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {isClerkConfigured ? (
            <>
              <SignedIn>
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-navy-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <Link
                  href="/directory"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-navy-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Directory
                </Link>
                <Link
                  href="/companies"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-navy-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  My Companies
                </Link>
                <Link
                  href="/settings"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-navy-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
                <div className="pt-4 mt-4 border-t border-navy-700">
                  <div className="px-4 py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-navy-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={onClose}
                  className="block mt-4"
                >
                  <Button className="w-full bg-white text-navy-800 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-navy-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={onClose}
                className="block mt-4"
              >
                <Button className="w-full bg-white text-navy-800 hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Footer links */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-navy-700">
          <div className="flex flex-wrap gap-4 text-sm text-navy-300">
            <Link href="/faq" onClick={onClose} className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" onClick={onClose} className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" onClick={onClose} className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-navy-800 text-white sticky top-0 z-40">
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
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-navy-800 font-bold text-lg">CM</span>
              </div>
              <span className="font-bold text-xl">CMMC Directory</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <AuthenticatedNav />
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-navy-700 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
