import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getUserByClerkId, getCompanyById, getCompanyNaicsCodes } from '@/lib/db'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SubscriptionGate } from '@/components/SubscriptionGate'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface DirectoryCompanyPageProps {
  params: Promise<{ id: string }>
}

export default async function DirectoryCompanyPage({ params }: DirectoryCompanyPageProps) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { id } = await params

  const user = await getUserByClerkId(userId)

  if (user?.subscription_status !== 'active') {
    return <SubscriptionGate />
  }

  const company = await getCompanyById(id)

  if (!company || company.status !== 'verified') {
    notFound()
  }

  const naicsCodes = await getCompanyNaicsCodes(id)

  const levelMap: Record<number, 'level1' | 'level2' | 'level3'> = {
    1: 'level1',
    2: 'level2',
    3: 'level3',
  }
  const levelVariant = levelMap[company.cmmc_level as number] || 'level1'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/directory" className="hover:text-accent transition-colors">
          Directory
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">{company.name}</span>
      </nav>

      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start space-x-4">
            {company.logo_url ? (
              <Image
                src={company.logo_url}
                alt={company.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-navy-600 to-navy-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-3xl">
                  {company.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-2">
                {company.is_featured && (
                  <Badge variant="warning">Featured</Badge>
                )}
                <Badge variant={levelVariant}>CMMC Level {company.cmmc_level}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-gray-600 mt-1">
                {company.city}, {company.state}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {company.website && (
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full sm:w-auto">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </Button>
              </a>
            )}
            {company.email && (
              <a href={`mailto:${company.email}`}>
                <Button className="w-full sm:w-auto">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </Button>
              </a>
            )}
          </div>
        </div>

        {company.description && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">{company.description}</p>
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
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
                  <dd>
                    <a href={`tel:${company.phone}`} className="text-accent hover:underline">
                      {company.phone}
                    </a>
                  </dd>
                </div>
              )}
              {company.website && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {company.website.replace(/^https?:\/\//, '')}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <address className="not-italic text-gray-900 leading-relaxed">
              {company.address_line1}<br />
              {company.address_line2 && <>{company.address_line2}<br /></>}
              {company.city}, {company.state} {company.zip_code}<br />
              {company.country}
            </address>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${company.address_line1}, ${company.city}, ${company.state} ${company.zip_code}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-accent hover:underline mt-4"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on Google Maps
            </a>
          </CardContent>
        </Card>

        {/* CMMC Certification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              CMMC Certification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Certification Level</dt>
                <dd className="flex items-center mt-1">
                  <Badge variant={levelVariant} className="mr-2">Level {company.cmmc_level}</Badge>
                  <span className="text-sm text-gray-600">
                    {company.cmmc_level === 1 && 'Foundational'}
                    {company.cmmc_level === 2 && 'Advanced'}
                    {company.cmmc_level === 3 && 'Expert'}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Assessment Type</dt>
                <dd className="text-gray-900 capitalize">{company.assessment_type?.replace('_', ' ') || 'Not specified'}</dd>
              </div>
              {company.certification_date && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Certification Date</dt>
                  <dd className="text-gray-900">{formatDate(company.certification_date)}</dd>
                </div>
              )}
              {company.certification_expiry && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Expiration Date</dt>
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

        {/* NAICS Codes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Industry Sectors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {naicsCodes && naicsCodes.length > 0 ? (
              <ul className="space-y-3">
                {naicsCodes.map((code) => (
                  <li key={code.code} className="flex items-start">
                    <Badge variant="default" className="mr-2 mt-0.5 flex-shrink-0">{code.code}</Badge>
                    <span className="text-sm text-gray-700">{code.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No NAICS codes specified.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Back to Directory */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <Link href="/directory">
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </Button>
        </Link>
      </div>
    </div>
  )
}
