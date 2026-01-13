import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserByClerkId, getCompanies, countCompanies, getNaicsCodes } from '@/lib/db'
import { CompanyList } from '@/components/directory/CompanyList'
import { SearchFilters } from '@/components/directory/SearchFilters'
import { SubscriptionGate } from '@/components/SubscriptionGate'

export const metadata: Metadata = {
  title: 'Company Directory',
  description: 'Browse and search CMMC certified defense contractors. Filter by certification level, location, and NAICS codes.',
}

export const dynamic = 'force-dynamic'

interface DirectoryPageProps {
  searchParams: Promise<{
    search?: string
    level?: string
    state?: string
    naics?: string
    page?: string
  }>
}

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const perPage = 12

  const user = await getUserByClerkId(userId)

  if (user?.subscription_status !== 'active') {
    return <SubscriptionGate />
  }

  const companies = await getCompanies({
    status: 'verified',
    cmmcLevel: params.level ? parseInt(params.level, 10) : undefined,
    state: params.state,
    search: params.search,
    limit: perPage,
    offset: (page - 1) * perPage,
  })

  const count = await countCompanies({
    status: 'verified',
    cmmcLevel: params.level ? parseInt(params.level, 10) : undefined,
    state: params.state,
    search: params.search,
  })

  const naicsCodes = await getNaicsCodes()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">CMMC Directory</h1>
        <p className="mt-2 text-gray-600">
          Search {count || 0} verified CMMC certified companies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SearchFilters
            naicsCodes={naicsCodes || []}
            currentFilters={params}
          />
        </aside>

        <main className="lg:col-span-3">
          <CompanyList
            companies={companies || []}
            totalCount={count || 0}
            currentPage={page}
            perPage={perPage}
          />
        </main>
      </div>
    </div>
  )
}
