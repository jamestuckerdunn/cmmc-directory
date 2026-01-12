// US States list for forms and filters
export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'Washington D.C.' },
] as const

// CMMC Levels
export const CMMC_LEVELS = [
  { value: '1', label: 'Level 1 - Foundational' },
  { value: '2', label: 'Level 2 - Advanced' },
  { value: '3', label: 'Level 3 - Expert' },
] as const

export const CMMC_LEVEL_DETAILS = {
  1: {
    name: 'Level 1 - Foundational',
    description: 'Basic cyber hygiene practices for protecting Federal Contract Information (FCI)',
    practices: 17,
    assessment: 'Self-assessment',
    color: 'blue',
  },
  2: {
    name: 'Level 2 - Advanced',
    description: 'Advanced practices for protecting Controlled Unclassified Information (CUI)',
    practices: 110,
    assessment: 'Third-party assessment (C3PAO)',
    color: 'purple',
  },
  3: {
    name: 'Level 3 - Expert',
    description: 'Expert practices for enhanced protection of CUI against advanced threats',
    practices: 134,
    assessment: 'Government-led assessment',
    color: 'navy',
  },
} as const

// Assessment Types
export const ASSESSMENT_TYPES = [
  { value: 'self', label: 'Self-Assessment' },
  { value: 'c3pao', label: 'C3PAO Assessment' },
] as const

// Pagination
export const DEFAULT_PAGE_SIZE = 12
export const MAX_PAGE_SIZE = 100
export const MAX_PAGE_NUMBER = 1000

// Rate Limiting
export const RATE_LIMIT_REQUESTS = 10
export const RATE_LIMIT_WINDOW_SECONDS = 10

// Validation Limits
export const MAX_COMPANY_NAME_LENGTH = 255
export const MAX_DESCRIPTION_LENGTH = 2000
export const MAX_ADDRESS_LENGTH = 255
export const MAX_PHONE_LENGTH = 20

// Email Configuration
export const SUPPORT_EMAIL = 'support@cmmcdirectory.com'
export const NOREPLY_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@cmmcdirectory.com'

// URLs
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://cmmcdirectory.com'

// Subscription
export const SUBSCRIPTION_PRICE = 10 // USD per month
export const SUBSCRIPTION_PRICE_ID = process.env.STRIPE_PRICE_ID
