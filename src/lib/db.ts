import { sql } from '@vercel/postgres'

export { sql }

type QueryValue = string | number | boolean | null | undefined

interface UserUpdateData {
  email?: string
  firstName?: string | null
  lastName?: string | null
  stripeCustomerId?: string | null
  subscriptionStatus?: string
  subscriptionEndDate?: string | null
}

interface CompanyFilters {
  status?: string
  cmmcLevel?: number
  state?: string
  search?: string
  userId?: string
  limit?: number
  offset?: number
}

interface CompanyData {
  userId: string
  name: string
  description?: string | null
  website?: string | null
  email?: string | null
  phone?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  cmmcLevel: number
  certificationDate?: string | null
  certificationExpiry?: string | null
  assessmentType?: string | null
  c3paoName?: string | null
}

interface SubscriptionData {
  userId: string
  stripeSubscriptionId: string
  stripePriceId: string
  status: string
  currentPeriodStart?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean
  canceledAt?: string | null
}

interface NAICSCode {
  code: string
  title: string
}

export async function getUserByClerkId(clerkId: string) {
  const { rows } = await sql`SELECT * FROM users WHERE clerk_id = ${clerkId} LIMIT 1`
  return rows[0] || null
}

export async function getUserByStripeCustomerId(stripeCustomerId: string) {
  const { rows } = await sql`SELECT * FROM users WHERE stripe_customer_id = ${stripeCustomerId} LIMIT 1`
  return rows[0] || null
}

export async function createUser(data: {
  clerkId: string
  email: string
  firstName?: string | null
  lastName?: string | null
}) {
  const { rows } = await sql`
    INSERT INTO users (clerk_id, email, first_name, last_name)
    VALUES (${data.clerkId}, ${data.email}, ${data.firstName}, ${data.lastName})
    RETURNING *
  `
  return rows[0]
}

export async function updateUser(clerkId: string, data: UserUpdateData) {
  const updates: string[] = []
  const values: QueryValue[] = []
  let paramIndex = 1

  const fieldMappings: Array<[keyof UserUpdateData, string]> = [
    ['email', 'email'],
    ['firstName', 'first_name'],
    ['lastName', 'last_name'],
    ['stripeCustomerId', 'stripe_customer_id'],
    ['subscriptionStatus', 'subscription_status'],
    ['subscriptionEndDate', 'subscription_end_date'],
  ]

  for (const [key, column] of fieldMappings) {
    if (data[key] !== undefined) {
      updates.push(`${column} = $${paramIndex++}`)
      values.push(data[key])
    }
  }

  if (updates.length === 0) return null

  updates.push(`updated_at = NOW()`)
  values.push(clerkId)

  const query = `UPDATE users SET ${updates.join(', ')} WHERE clerk_id = $${paramIndex} RETURNING *`
  const { rows } = await sql.query(query, values)
  return rows[0]
}

export async function deleteUser(clerkId: string) {
  await sql`DELETE FROM users WHERE clerk_id = ${clerkId}`
}

export async function getCompanies(options: CompanyFilters) {
  const conditions: string[] = []
  const values: QueryValue[] = []
  let paramIndex = 1

  if (options.status) {
    conditions.push(`status = $${paramIndex++}`)
    values.push(options.status)
  }
  if (options.cmmcLevel) {
    conditions.push(`cmmc_level = $${paramIndex++}`)
    values.push(options.cmmcLevel)
  }
  if (options.state) {
    conditions.push(`state = $${paramIndex++}`)
    values.push(options.state)
  }
  if (options.userId) {
    conditions.push(`user_id = $${paramIndex++}`)
    values.push(options.userId)
  }
  if (options.search) {
    conditions.push(`(name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`)
    values.push(`%${options.search}%`)
    paramIndex++
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  const limitClause = options.limit ? `LIMIT $${paramIndex++}` : ''
  const offsetClause = options.offset ? `OFFSET $${paramIndex++}` : ''

  if (options.limit) values.push(options.limit)
  if (options.offset) values.push(options.offset)

  const query = `SELECT * FROM companies ${whereClause} ORDER BY is_featured DESC, name ASC ${limitClause} ${offsetClause}`
  const { rows } = await sql.query(query, values)
  return rows
}

export async function countCompanies(options: Omit<CompanyFilters, 'userId' | 'limit' | 'offset'>) {
  const conditions: string[] = []
  const values: QueryValue[] = []
  let paramIndex = 1

  if (options.status) {
    conditions.push(`status = $${paramIndex++}`)
    values.push(options.status)
  }
  if (options.cmmcLevel) {
    conditions.push(`cmmc_level = $${paramIndex++}`)
    values.push(options.cmmcLevel)
  }
  if (options.state) {
    conditions.push(`state = $${paramIndex++}`)
    values.push(options.state)
  }
  if (options.search) {
    conditions.push(`(name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`)
    values.push(`%${options.search}%`)
    paramIndex++
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  const query = `SELECT COUNT(*) as count FROM companies ${whereClause}`
  const { rows } = await sql.query(query, values)
  return parseInt(rows[0].count)
}

export async function getCompanyById(id: string) {
  const { rows } = await sql`SELECT * FROM companies WHERE id = ${id} LIMIT 1`
  return rows[0] || null
}

export async function createCompany(data: CompanyData) {
  const { rows } = await sql`
    INSERT INTO companies (
      user_id, name, description, website, email, phone,
      address_line1, address_line2, city, state, zip_code,
      cmmc_level, certification_date, certification_expiry,
      assessment_type, c3pao_name, status
    ) VALUES (
      ${data.userId}, ${data.name}, ${data.description}, ${data.website},
      ${data.email}, ${data.phone}, ${data.addressLine1}, ${data.addressLine2},
      ${data.city}, ${data.state}, ${data.zipCode}, ${data.cmmcLevel},
      ${data.certificationDate}, ${data.certificationExpiry},
      ${data.assessmentType}, ${data.c3paoName}, 'pending'
    )
    RETURNING *
  `
  return rows[0]
}

export async function updateCompany(id: string, userId: string, data: Partial<Omit<CompanyData, 'userId'>>) {
  const existing = await sql`SELECT user_id FROM companies WHERE id = ${id}`
  if (existing.rows.length === 0 || existing.rows[0].user_id !== userId) {
    return null
  }

  const { rows } = await sql`
    UPDATE companies SET
      name = COALESCE(${data.name}, name),
      description = COALESCE(${data.description}, description),
      website = COALESCE(${data.website}, website),
      email = COALESCE(${data.email}, email),
      phone = COALESCE(${data.phone}, phone),
      address_line1 = COALESCE(${data.addressLine1}, address_line1),
      address_line2 = COALESCE(${data.addressLine2}, address_line2),
      city = COALESCE(${data.city}, city),
      state = COALESCE(${data.state}, state),
      zip_code = COALESCE(${data.zipCode}, zip_code),
      cmmc_level = COALESCE(${data.cmmcLevel}, cmmc_level),
      certification_date = COALESCE(${data.certificationDate}, certification_date),
      certification_expiry = COALESCE(${data.certificationExpiry}, certification_expiry),
      assessment_type = COALESCE(${data.assessmentType}, assessment_type),
      c3pao_name = COALESCE(${data.c3paoName}, c3pao_name),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0]
}

export async function getNaicsCodes(): Promise<NAICSCode[]> {
  const { rows } = await sql`SELECT code, title FROM naics_codes ORDER BY code`
  return rows as NAICSCode[]
}

export async function getCompanyNaicsCodes(companyId: string): Promise<NAICSCode[]> {
  const { rows } = await sql`
    SELECT nc.code, nc.title FROM naics_codes nc
    JOIN company_naics cn ON nc.code = cn.naics_code
    WHERE cn.company_id = ${companyId}
  `
  return rows as NAICSCode[]
}

export async function setCompanyNaicsCodes(companyId: string, naicsCodes: string[]) {
  await sql`DELETE FROM company_naics WHERE company_id = ${companyId}`
  for (const code of naicsCodes) {
    await sql`INSERT INTO company_naics (company_id, naics_code) VALUES (${companyId}, ${code})`
  }
}

export async function upsertSubscription(data: SubscriptionData) {
  const { rows } = await sql`
    INSERT INTO subscriptions (
      user_id, stripe_subscription_id, stripe_price_id, status,
      current_period_start, current_period_end, cancel_at_period_end, canceled_at
    ) VALUES (
      ${data.userId}, ${data.stripeSubscriptionId}, ${data.stripePriceId},
      ${data.status}, ${data.currentPeriodStart}, ${data.currentPeriodEnd},
      ${data.cancelAtPeriodEnd || false}, ${data.canceledAt}
    )
    ON CONFLICT (stripe_subscription_id) DO UPDATE SET
      status = ${data.status},
      current_period_start = ${data.currentPeriodStart},
      current_period_end = ${data.currentPeriodEnd},
      cancel_at_period_end = ${data.cancelAtPeriodEnd || false},
      canceled_at = ${data.canceledAt},
      updated_at = NOW()
    RETURNING *
  `
  return rows[0]
}

export async function updateUserById(id: string, data: {
  subscriptionStatus?: string
  subscriptionEndDate?: string | null
}) {
  const updates: string[] = []
  const values: QueryValue[] = []
  let paramIndex = 1

  if (data.subscriptionStatus !== undefined) {
    updates.push(`subscription_status = $${paramIndex++}`)
    values.push(data.subscriptionStatus)
  }
  if (data.subscriptionEndDate !== undefined) {
    updates.push(`subscription_end_date = $${paramIndex++}`)
    values.push(data.subscriptionEndDate)
  }

  if (updates.length === 0) return null

  updates.push(`updated_at = NOW()`)
  values.push(id)

  const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`
  const { rows } = await sql.query(query, values)
  return rows[0]
}
