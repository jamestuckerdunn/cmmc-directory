import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getUserByClerkId, getCompanies } from '@/lib/db'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SubscriptionGate } from '@/components/SubscriptionGate'

export const metadata: Metadata = {
  title: 'My Companies',
  description: 'Manage your registered CMMC certified companies and their verification status.',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function MyCompaniesPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await getUserByClerkId(userId)

  if (user?.subscription_status !== 'active') {
    return <SubscriptionGate />
  }

  const companies = await getCompanies({ userId: user.id })

  function renderStatusBadge(status: string) {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
      verified: 'success',
      pending: 'warning',
      rejected: 'error',
      expired: 'error',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Companies</h1>
          <p className="mt-2 text-gray-600">
            Manage your registered companies
          </p>
        </div>
        <Link href="/companies/new">
          <Button>Register New Company</Button>
        </Link>
      </div>

      {companies && companies.length > 0 ? (
        <div className="space-y-4">
          {companies.map((company) => (
            <Card key={company.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-navy-100 rounded flex items-center justify-center">
                  <span className="text-navy-800 font-bold text-lg">
                    {company.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-500">
                    CMMC Level {company.cmmc_level} | {company.city}, {company.state}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {renderStatusBadge(company.status)}
                <Link href={`/companies/${company.id}`}>
                  <Button variant="outline" size="sm">Manage</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-gray-500 mb-4">You haven&apos;t registered any companies yet.</p>
          <Link href="/companies/new">
            <Button>Register Your First Company</Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
