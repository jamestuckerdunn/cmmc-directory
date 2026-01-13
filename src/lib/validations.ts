import { z } from 'zod'

// Company validation schema
export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(255, 'Company name too long'),
  description: z.string().max(2000, 'Description too long').optional().nullable(),
  website: z.string().url('Invalid website URL').optional().nullable().or(z.literal('')),
  email: z.string().email('Invalid email address').optional().nullable().or(z.literal('')),
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)\.]+$/, 'Invalid phone number format')
    .max(20, 'Phone number too long')
    .optional()
    .nullable()
    .or(z.literal('')),
  address_line1: z.string().max(255, 'Address too long').optional().nullable(),
  address_line2: z.string().max(255, 'Address too long').optional().nullable(),
  city: z.string().max(100, 'City name too long').optional().nullable(),
  state: z.string().length(2, 'State must be 2-letter code').optional().nullable().or(z.literal('')),
  zip_code: z.string()
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format (use 12345 or 12345-6789)')
    .optional()
    .nullable()
    .or(z.literal('')),
  cmmc_level: z.number().int().min(1, 'CMMC level must be 1-3').max(3, 'CMMC level must be 1-3'),
  certification_date: z.string()
    .refine((date) => {
      if (!date) return true
      const d = new Date(date)
      return d <= new Date()
    }, 'Certification date cannot be in the future')
    .optional()
    .nullable(),
  certification_expiry: z.string().optional().nullable(),
  assessment_type: z.enum(['self', 'c3pao', 'dibcac', '']).optional().nullable(),
  c3pao_name: z.string().max(255, 'C3PAO name too long').optional().nullable(),
  naics_codes: z.array(z.string()).optional(),
})

// Validate expiry date is after certification date
export const companySchemaWithDateValidation = companySchema.refine(
  (data) => {
    if (!data.certification_date || !data.certification_expiry) return true
    return new Date(data.certification_expiry) > new Date(data.certification_date)
  },
  {
    message: 'Certification expiry must be after certification date',
    path: ['certification_expiry'],
  }
)

export type CompanyInput = z.infer<typeof companySchema>

// Search/filter validation
export const searchFiltersSchema = z.object({
  search: z.string().max(200).optional(),
  level: z.string().regex(/^[123]?$/).optional(),
  state: z.string().length(2).optional().or(z.literal('')),
  naics: z.string().max(10).optional(),
  page: z.coerce.number().int().min(1).max(1000).optional().default(1),
})

// Pagination validation
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
})

// Email validation for forms
export const emailSchema = z.string().email('Invalid email address')

// URL validation
export const urlSchema = z.string().url('Invalid URL')

// ID validation (UUID format or numeric)
export const idSchema = z.string().min(1).max(100)

// Webhook payload validation
export const clerkWebhookSchema = z.object({
  type: z.string(),
  data: z.record(z.string(), z.unknown()),
})

export const stripeWebhookSchema = z.object({
  type: z.string(),
  data: z.object({
    object: z.record(z.string(), z.unknown()),
  }),
})

// Helper function to safely parse with error handling
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, error: result.error }
}

// Format zod errors for API responses
export function formatZodErrors(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const path = issue.path.join('.')
    if (!errors[path]) {
      errors[path] = []
    }
    errors[path].push(issue.message)
  }
  return errors
}
