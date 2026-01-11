import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CompanyList } from '@/components/directory/CompanyList'
import { SearchFilters } from '@/components/directory/SearchFilters'
import { SubscriptionGate } from '@/components/SubscriptionGate'

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
  const page = parseInt(params.page || '1')
  const perPage = 12

  const supabase = await createClient()

  // Check subscription status
  const { data: user } = await supabase
    .from('users')
    .select('subscription_status')
    .eq('clerk_id', userId)
    .single()

  if (user?.subscription_status !== 'active') {
    return <SubscriptionGate />
  }

  // Build query
  let query = supabase
    .from('companies')
    .select(`
      *,
      company_naics (
        naics_codes (code, title)
      )
    `, { count: 'exact' })
    .eq('status', 'verified')
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true })

  // Apply filters
  if (params.search) {
    query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`)
  }
  if (params.level) {
    query = query.eq('cmmc_level', parseInt(params.level))
  }
  if (params.state) {
    query = query.eq('state', params.state)
  }

  // Pagination
  const from = (page - 1) * perPage
  const to = from + perPage - 1
  query = query.range(from, to)

  const { data: companies, count } = await query

  // Get NAICS codes for filter
  const { data: naicsCodes } = await supabase
    .from('naics_codes')
    .select('code, title')
    .order('code')

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
