import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserByClerkId, getNaicsCodes } from '@/lib/db'
import { CompanyForm } from '@/components/forms/CompanyForm'
import { SubscriptionGate } from '@/components/SubscriptionGate'

export const metadata: Metadata = {
  title: 'Register Company',
  description: 'Register your CMMC certified company to be listed in the directory.',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function NewCompanyPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await getUserByClerkId(userId)

  if (user?.subscription_status !== 'active') {
    return <SubscriptionGate />
  }

  const naicsCodes = await getNaicsCodes()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Register Your Company</h1>
        <p className="mt-2 text-gray-600">
          Add your CMMC certified company to the directory. Your listing will be reviewed before going live.
        </p>
      </div>

      <CompanyForm naicsCodes={naicsCodes || []} />
    </div>
  )
}
