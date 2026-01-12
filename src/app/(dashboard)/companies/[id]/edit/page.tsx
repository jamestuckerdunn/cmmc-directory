import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getUserByClerkId, getCompanyById, getCompanyNaicsCodes, getNaicsCodes } from '@/lib/db'
import { CompanyForm } from '@/components/forms/CompanyForm'
import { SubscriptionGate } from '@/components/SubscriptionGate'

export const dynamic = 'force-dynamic'

interface EditCompanyPageProps {
  params: Promise<{ id: string }>
}

export default async function EditCompanyPage({ params }: EditCompanyPageProps) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { id } = await params

  // Check subscription
  const user = await getUserByClerkId(userId)

  if (user?.subscription_status !== 'active') {
    return <SubscriptionGate />
  }

  // Get company and verify ownership
  const company = await getCompanyById(id)

  if (!company || company.user_id !== user.id) {
    notFound()
  }

  // Get NAICS codes
  const naicsCodes = await getNaicsCodes()
  const companyNaicsCodes = await getCompanyNaicsCodes(id)

  // Format dates for form inputs
  const formatDateForInput = (date: Date | string | null) => {
    if (!date) return undefined
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  }

  const initialData = {
    id: company.id,
    name: company.name,
    description: company.description || undefined,
    website: company.website || undefined,
    email: company.email || undefined,
    phone: company.phone || undefined,
    address_line1: company.address_line1,
    address_line2: company.address_line2 || undefined,
    city: company.city,
    state: company.state,
    zip_code: company.zip_code,
    cmmc_level: company.cmmc_level,
    assessment_type: company.assessment_type || undefined,
    certification_date: formatDateForInput(company.certification_date),
    certification_expiry: formatDateForInput(company.certification_expiry),
    c3pao_name: company.c3pao_name || undefined,
    naics_codes: companyNaicsCodes?.map(n => n.code) || [],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href={`/companies/${id}`} className="text-accent hover:underline mb-4 inline-block">
          &larr; Back to Company Details
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Company</h1>
        <p className="mt-2 text-gray-600">
          Update your company information. Changes may require re-verification.
        </p>
      </div>

      <CompanyForm naicsCodes={naicsCodes || []} initialData={initialData} />
    </div>
  )
}
