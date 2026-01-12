'use client'

import { useUser } from '@clerk/nextjs'
import { useSubscription } from '@/hooks/useSubscription'
import { useClerkConfigured } from '@/components/providers/ClerkProviderWrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

function SettingsContent() {
  const { user, isLoaded } = useUser()
  const { isSubscribed, openPortal, isLoading } = useSubscription()

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account and subscription settings.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center">
                  <span className="text-navy-800 font-bold text-2xl">
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-500">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                To update your profile information, use the Clerk user button in the header.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">CMMC Directory Access</p>
                  <p className="text-gray-500">$10/month</p>
                </div>
                <Badge variant={isSubscribed ? 'success' : 'error'}>
                  {isSubscribed ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              {isSubscribed ? (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage your subscription, update payment methods, or cancel through the Stripe customer portal.
                  </p>
                  <Button onClick={openPortal} isLoading={isLoading}>
                    Manage Subscription
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    You don&apos;t have an active subscription. Subscribe to access the full directory.
                  </p>
                  <Button onClick={() => window.location.href = '/dashboard'}>
                    Subscribe Now
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Your account security is managed through Clerk. Use the user button in the header
              to manage your password, two-factor authentication, and connected accounts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UnconfiguredPlaceholder() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-gray-600">
          Authentication not configured. Please set up Clerk credentials.
        </p>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const isClerkConfigured = useClerkConfigured()

  if (!isClerkConfigured) {
    return <UnconfiguredPlaceholder />
  }

  return <SettingsContent />
}
