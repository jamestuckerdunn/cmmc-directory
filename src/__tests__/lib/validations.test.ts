import { companySchema, emailSchema, idSchema, formatZodErrors, searchFiltersSchema } from '@/lib/validations'

describe('companySchema', () => {
  it('should validate a valid company', () => {
    const validCompany = {
      name: 'Test Company',
      cmmc_level: 2,
      email: 'test@example.com',
      website: 'https://example.com',
    }

    const result = companySchema.safeParse(validCompany)
    expect(result.success).toBe(true)
  })

  it('should reject an empty company name', () => {
    const invalidCompany = {
      name: '',
      cmmc_level: 2,
    }

    const result = companySchema.safeParse(invalidCompany)
    expect(result.success).toBe(false)
  })

  it('should reject invalid CMMC level', () => {
    const invalidCompany = {
      name: 'Test Company',
      cmmc_level: 5,
    }

    const result = companySchema.safeParse(invalidCompany)
    expect(result.success).toBe(false)
  })

  it('should accept CMMC levels 1, 2, and 3', () => {
    for (const level of [1, 2, 3]) {
      const company = {
        name: 'Test Company',
        cmmc_level: level,
      }
      const result = companySchema.safeParse(company)
      expect(result.success).toBe(true)
    }
  })

  it('should validate email format', () => {
    const invalidCompany = {
      name: 'Test Company',
      cmmc_level: 2,
      email: 'invalid-email',
    }

    const result = companySchema.safeParse(invalidCompany)
    expect(result.success).toBe(false)
  })

  it('should validate website URL format', () => {
    const invalidCompany = {
      name: 'Test Company',
      cmmc_level: 2,
      website: 'not-a-url',
    }

    const result = companySchema.safeParse(invalidCompany)
    expect(result.success).toBe(false)
  })

  it('should validate ZIP code format', () => {
    const validZips = ['12345', '12345-6789']
    const invalidZips = ['123', '1234567890', 'abcde']

    for (const zip of validZips) {
      const company = {
        name: 'Test Company',
        cmmc_level: 2,
        zip_code: zip,
      }
      const result = companySchema.safeParse(company)
      expect(result.success).toBe(true)
    }

    for (const zip of invalidZips) {
      const company = {
        name: 'Test Company',
        cmmc_level: 2,
        zip_code: zip,
      }
      const result = companySchema.safeParse(company)
      expect(result.success).toBe(false)
    }
  })
})

describe('emailSchema', () => {
  it('should validate valid emails', () => {
    const validEmails = ['test@example.com', 'user.name@domain.org', 'name+tag@company.co']

    for (const email of validEmails) {
      const result = emailSchema.safeParse(email)
      expect(result.success).toBe(true)
    }
  })

  it('should reject invalid emails', () => {
    const invalidEmails = ['notanemail', '@missing.com', 'missing@', 'spaces in@email.com']

    for (const email of invalidEmails) {
      const result = emailSchema.safeParse(email)
      expect(result.success).toBe(false)
    }
  })
})

describe('idSchema', () => {
  it('should validate valid IDs', () => {
    const validIds = ['1', 'abc123', 'uuid-like-string-here']

    for (const id of validIds) {
      const result = idSchema.safeParse(id)
      expect(result.success).toBe(true)
    }
  })

  it('should reject empty IDs', () => {
    const result = idSchema.safeParse('')
    expect(result.success).toBe(false)
  })
})

describe('searchFiltersSchema', () => {
  it('should validate valid search filters', () => {
    const validFilters = {
      search: 'test company',
      level: '2',
      state: 'CA',
      page: 1,
    }

    const result = searchFiltersSchema.safeParse(validFilters)
    expect(result.success).toBe(true)
  })

  it('should default page to 1', () => {
    const filters = {
      search: 'test',
    }

    const result = searchFiltersSchema.safeParse(filters)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(1)
    }
  })

  it('should reject invalid level values', () => {
    const invalidFilters = {
      level: '5',
    }

    const result = searchFiltersSchema.safeParse(invalidFilters)
    expect(result.success).toBe(false)
  })
})

describe('formatZodErrors', () => {
  it('should format errors correctly', () => {
    const result = companySchema.safeParse({ name: '', cmmc_level: 5 })

    if (!result.success) {
      const formatted = formatZodErrors(result.error)
      expect(formatted).toHaveProperty('name')
      expect(formatted).toHaveProperty('cmmc_level')
    }
  })
})
