import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserByClerkId, createCompany, updateCompany, setCompanyNaicsCodes, sql } from '@/lib/db'
import { sendCompanySubmittedEmail } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get database user
    const dbUser = await getUserByClerkId(userId)

    if (!dbUser || dbUser.subscription_status !== 'active') {
      return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
    }

    const body = await req.json()
    const { naics_codes, ...companyData } = body

    // Insert company
    const company = await createCompany({
      userId: dbUser.id,
      name: companyData.name,
      description: companyData.description,
      website: companyData.website,
      email: companyData.email,
      phone: companyData.phone,
      addressLine1: companyData.address_line1,
      addressLine2: companyData.address_line2,
      city: companyData.city,
      state: companyData.state,
      zipCode: companyData.zip_code,
      cmmcLevel: companyData.cmmc_level,
      certificationDate: companyData.certification_date,
      certificationExpiry: companyData.certification_expiry,
      assessmentType: companyData.assessment_type,
      c3paoName: companyData.c3pao_name,
    })

    if (!company) {
      return NextResponse.json({ error: 'Failed to create company' }, { status: 500 })
    }

    // Insert NAICS codes
    if (naics_codes && naics_codes.length > 0) {
      await setCompanyNaicsCodes(company.id, naics_codes)
    }

    // Send confirmation email
    try {
      await sendCompanySubmittedEmail(dbUser.email, company.name)
    } catch (emailError) {
      console.error('Failed to send company submitted email:', emailError)
    }

    return NextResponse.json({ id: company.id })
  } catch (error) {
    console.error('Company creation error:', error)
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

    const body = await req.json()
    const { id, naics_codes, ...companyData } = body

    // Update company (updateCompany verifies ownership)
    const updated = await updateCompany(id, dbUser.id, {
      name: companyData.name,
      description: companyData.description,
      website: companyData.website,
      email: companyData.email,
      phone: companyData.phone,
      addressLine1: companyData.address_line1,
      addressLine2: companyData.address_line2,
      city: companyData.city,
      state: companyData.state,
      zipCode: companyData.zip_code,
      cmmcLevel: companyData.cmmc_level,
      certificationDate: companyData.certification_date,
      certificationExpiry: companyData.certification_expiry,
      assessmentType: companyData.assessment_type,
      c3paoName: companyData.c3pao_name,
    })

    if (!updated) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Update NAICS codes
    if (naics_codes) {
      await setCompanyNaicsCodes(id, naics_codes)
    }

    return NextResponse.json({ id })
  } catch (error) {
    console.error('Company update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
