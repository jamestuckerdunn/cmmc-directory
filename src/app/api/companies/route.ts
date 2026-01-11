import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendCompanySubmittedEmail } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get database user
    const { data: dbUser } = await supabaseAdmin
      .from('users')
      .select('id, email, subscription_status')
      .eq('clerk_id', userId)
      .single()

    if (!dbUser || dbUser.subscription_status !== 'active') {
      return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
    }

    const body = await req.json()
    const { naics_codes, ...companyData } = body

    // Insert company
    const { data: company, error: companyError } = await supabaseAdmin
      .from('companies')
      .insert({
        ...companyData,
        user_id: dbUser.id,
        status: 'pending',
      })
      .select()
      .single()

    if (companyError) {
      console.error('Company insert error:', companyError)
      return NextResponse.json({ error: 'Failed to create company' }, { status: 500 })
    }

    // Insert NAICS codes
    if (naics_codes && naics_codes.length > 0) {
      const naicsInserts = naics_codes.map((code: string) => ({
        company_id: company.id,
        naics_code: code,
      }))

      await supabaseAdmin.from('company_naics').insert(naicsInserts)
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

    const { data: dbUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await req.json()
    const { id, naics_codes, ...companyData } = body

    // Verify ownership
    const { data: existingCompany } = await supabaseAdmin
      .from('companies')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!existingCompany || existingCompany.user_id !== dbUser.id) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Update company
    const { error: updateError } = await supabaseAdmin
      .from('companies')
      .update(companyData)
      .eq('id', id)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update company' }, { status: 500 })
    }

    // Update NAICS codes
    await supabaseAdmin.from('company_naics').delete().eq('company_id', id)

    if (naics_codes && naics_codes.length > 0) {
      const naicsInserts = naics_codes.map((code: string) => ({
        company_id: id,
        naics_code: code,
      }))
      await supabaseAdmin.from('company_naics').insert(naicsInserts)
    }

    return NextResponse.json({ id })
  } catch (error) {
    console.error('Company update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
