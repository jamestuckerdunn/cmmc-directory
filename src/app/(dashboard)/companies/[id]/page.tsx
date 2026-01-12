import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getUserByClerkId, getCompanyById, getCompanyNaicsCodes, sql } from '@/lib/db'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface CompanyDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { id } = await params

  const user = await getUserByClerkId(userId)
  if (!user) redirect('/sign-in')

  const company = await getCompanyById(id)

  if (!company || company.user_id !== user.id) {
    notFound()
  }

  const naicsCodes = await getCompanyNaicsCodes(id)

  const statusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
      verified: 'success',
      pending: 'warning',
      rejected: 'error',
      expired: 'error',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const levelMap: Record<number, 'level1' | 'level2' | 'level3'> = {
    1: 'level1',
    2: 'level2',
    3: 'level3',
  }
  const levelVariant = levelMap[company.cmmc_level as number] || 'level1'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/companies" className="text-accent hover:underline mb-4 inline-block">
          &larr; Back to My Companies
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-navy-100 rounded flex items-center justify-center">
              <span className="text-navy-800 font-bold text-2xl">
                {company.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                {statusBadge(company.status)}
                <Badge variant={levelVariant}>CMMC Level {company.cmmc_level}</Badge>
              </div>
            </div>
          </div>
          <Link href={`/companies/${id}/edit`}>
            <Button variant="outline">Edit Company</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              {company.description && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="text-gray-900">{company.description}</dd>
                </div>
              )}
              {company.website && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {company.website}
                    </a>
                  </dd>
                </div>
              )}
              {company.email && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd>
                    <a href={`mailto:${company.email}`} className="text-accent hover:underline">
                      {company.email}
                    </a>
                  </dd>
                </div>
              )}
              {company.phone && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-gray-900">{company.phone}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <address className="not-italic text-gray-900">
              {company.address_line1}<br />
              {company.address_line2 && <>{company.address_line2}<br /></>}
              {company.city}, {company.state} {company.zip_code}<br />
              {company.country}
            </address>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CMMC Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Certification Level</dt>
                <dd className="text-gray-900">Level {company.cmmc_level}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Assessment Type</dt>
                <dd className="text-gray-900 capitalize">{company.assessment_type?.replace('_', ' ')}</dd>
              </div>
              {company.certification_date && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Certification Date</dt>
                  <dd className="text-gray-900">{formatDate(company.certification_date)}</dd>
                </div>
              )}
              {company.certification_expiry && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                  <dd className="text-gray-900">{formatDate(company.certification_expiry)}</dd>
                </div>
              )}
              {company.c3pao_name && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">C3PAO</dt>
                  <dd className="text-gray-900">{company.c3pao_name}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>NAICS Codes</CardTitle>
          </CardHeader>
          <CardContent>
            {naicsCodes && naicsCodes.length > 0 ? (
              <ul className="space-y-2">
                {naicsCodes.map((naicsCode) => (
                  <li key={naicsCode.code} className="text-sm">
                    <span className="font-medium">{naicsCode.code}</span> - {naicsCode.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No NAICS codes selected.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {company.status === 'pending' && (
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="py-4">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-warning mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-800">Pending Review</h3>
                <p className="text-sm text-yellow-700">
                  Your company listing is currently under review. We'll verify your CMMC certification
                  and notify you once approved. This typically takes 1-3 business days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
