import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserByClerkId, createCompany, updateCompany, setCompanyNaicsCodes } from '@/lib/db'
import { sendCompanySubmittedEmail } from '@/lib/resend'
import { companySchemaWithDateValidation, formatZodErrors, idSchema } from '@/lib/validations'
import { rateLimit, getClientIdentifier, rateLimitExceededResponse } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    // Rate limiting
    const clientId = await getClientIdentifier()
    const { success: rateLimitSuccess, reset } = await rateLimit(clientId, 'standard')
    if (!rateLimitSuccess) {
      return rateLimitExceededResponse(reset)
    }

    // Content-Type validation
    const contentType = req.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      )
    }

    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get database user
    const dbUser = await getUserByClerkId(userId)

    if (!dbUser || dbUser.subscription_status !== 'active') {
      return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    // Validate input
    const validationResult = companySchemaWithDateValidation.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: formatZodErrors(validationResult.error) },
        { status: 400 }
      )
    }

    const { naics_codes, ...companyData } = validationResult.data

    // Insert company
    const company = await createCompany({
      userId: dbUser.id,
      name: companyData.name,
      description: companyData.description,
      website: companyData.website || null,
      email: companyData.email || null,
      phone: companyData.phone || null,
      addressLine1: companyData.address_line1,
      addressLine2: companyData.address_line2,
      city: companyData.city,
      state: companyData.state || null,
      zipCode: companyData.zip_code || null,
      cmmcLevel: companyData.cmmc_level,
      certificationDate: companyData.certification_date,
      certificationExpiry: companyData.certification_expiry,
      assessmentType: companyData.assessment_type || null,
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
    } catch (emailError: unknown) {
      // Log error without exposing sensitive details
      console.error('Failed to send company submitted email:',
        emailError instanceof Error ? emailError.message : 'Unknown error')
    }

    return NextResponse.json({ id: company.id }, { status: 201 })
  } catch (error: unknown) {
    console.error('Company creation error:',
      error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    // Rate limiting
    const clientId = await getClientIdentifier()
    const { success: rateLimitSuccess, reset } = await rateLimit(clientId, 'standard')
    if (!rateLimitSuccess) {
      return rateLimitExceededResponse(reset)
    }

    // Content-Type validation
    const contentType = req.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      )
    }

    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await getUserByClerkId(userId)

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    // Validate ID separately
    const bodyObj = body as Record<string, unknown>
    const idValidation = idSchema.safeParse(bodyObj.id)
    if (!idValidation.success) {
      return NextResponse.json({ error: 'Invalid company ID' }, { status: 400 })
    }

    // Validate company data
    const validationResult = companySchemaWithDateValidation.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: formatZodErrors(validationResult.error) },
        { status: 400 }
      )
    }

    const { naics_codes, ...companyData } = validationResult.data
    const id = idValidation.data

    // Update company (updateCompany verifies ownership)
    const updated = await updateCompany(id, dbUser.id, {
      name: companyData.name,
      description: companyData.description,
      website: companyData.website || null,
      email: companyData.email || null,
      phone: companyData.phone || null,
      addressLine1: companyData.address_line1,
      addressLine2: companyData.address_line2,
      city: companyData.city,
      state: companyData.state || null,
      zipCode: companyData.zip_code || null,
      cmmcLevel: companyData.cmmc_level,
      certificationDate: companyData.certification_date,
      certificationExpiry: companyData.certification_expiry,
      assessmentType: companyData.assessment_type || null,
      c3paoName: companyData.c3pao_name,
    })

    if (!updated) {
      return NextResponse.json({ error: 'Company not found or access denied' }, { status: 404 })
    }

    // Update NAICS codes
    if (naics_codes) {
      await setCompanyNaicsCodes(id, naics_codes)
    }

    return NextResponse.json({ id })
  } catch (error: unknown) {
    console.error('Company update error:',
      error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
