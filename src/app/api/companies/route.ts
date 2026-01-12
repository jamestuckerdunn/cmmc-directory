import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserByClerkId, createCompany, updateCompany, setCompanyNaicsCodes } from '@/lib/db'
import { sendCompanySubmittedEmail } from '@/lib/resend'

interface CompanyRequestBody {
  name: string
  description?: string
  website?: string
  email?: string
  phone?: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  zip_code: string
  cmmc_level: number
  certification_date?: string
  certification_expiry?: string
  assessment_type?: string
  c3pao_name?: string
  naics_codes?: string[]
}

function mapCompanyData(data: Omit<CompanyRequestBody, 'naics_codes'>) {
  return {
    name: data.name,
    description: data.description,
    website: data.website,
    email: data.email,
    phone: data.phone,
    addressLine1: data.address_line1,
    addressLine2: data.address_line2,
    city: data.city,
    state: data.state,
    zipCode: data.zip_code,
    cmmcLevel: data.cmmc_level,
    certificationDate: data.certification_date,
    certificationExpiry: data.certification_expiry,
    assessmentType: data.assessment_type,
    c3paoName: data.c3pao_name,
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await getUserByClerkId(userId)
    if (!dbUser || dbUser.subscription_status !== 'active') {
      return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
    }

    const body: CompanyRequestBody = await req.json()
    const { naics_codes, ...companyData } = body

    const company = await createCompany({
      userId: dbUser.id,
      ...mapCompanyData(companyData),
    })

    if (!company) {
      return NextResponse.json({ error: 'Failed to create company' }, { status: 500 })
    }

    if (naics_codes?.length) {
      await setCompanyNaicsCodes(company.id, naics_codes)
    }

    try {
      await sendCompanySubmittedEmail(dbUser.email, company.name)
    } catch {
      // Email is non-critical
    }

    return NextResponse.json({ id: company.id })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await getUserByClerkId(userId)
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body: CompanyRequestBody & { id: string } = await req.json()
    const { id, naics_codes, ...companyData } = body

    const updated = await updateCompany(id, dbUser.id, mapCompanyData(companyData))
    if (!updated) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    if (naics_codes) {
      await setCompanyNaicsCodes(id, naics_codes)
    }

    return NextResponse.json({ id })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
