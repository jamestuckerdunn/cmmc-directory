// ============================================================================
// UI Types
// ============================================================================

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'level1' | 'level2' | 'level3'

export type SelectOption = {
  value: string
  label: string
}

// ============================================================================
// User Types
// ============================================================================

export type SubscriptionStatus = 'active' | 'inactive' | 'past_due' | 'canceled'

export type User = {
  id: string
  clerk_id: string
  email: string
  first_name: string | null
  last_name: string | null
  stripe_customer_id: string | null
  subscription_status: SubscriptionStatus
  subscription_end_date: string | null
  created_at: string
  updated_at: string
}

// ============================================================================
// Company Types
// ============================================================================

export type CMMCLevel = 1 | 2 | 3

export type CompanyStatus = 'pending' | 'verified' | 'rejected' | 'expired'

export type AssessmentType = 'self' | 'c3pao' | 'dibcac'

export type Company = {
  id: string
  user_id: string | null
  name: string
  description: string | null
  website: string | null
  email: string | null
  phone: string | null
  address_line1: string | null
  address_line2: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  country: string
  cmmc_level: CMMCLevel
  certification_date: string | null
  certification_expiry: string | null
  assessment_type: AssessmentType | null
  c3pao_name: string | null
  status: CompanyStatus
  verified_at: string | null
  verified_by: string | null
  logo_url: string | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

export type CompanyWithNAICS = Company & {
  naics_codes: NAICSCode[]
}

// ============================================================================
// NAICS Types
// ============================================================================

export type NAICSCode = {
  code: string
  title: string
  description: string | null
  sector: string | null
}

// ============================================================================
// Document Types
// ============================================================================

export type DocumentType = 'certificate' | 'assessment_report' | 'ssp' | 'poam' | 'other'

export type ComplianceEvidence = {
  id: string
  company_id: string
  document_type: DocumentType
  file_name: string
  file_url: string
  file_size: number | null
  mime_type: string | null
  description: string | null
  uploaded_by: string | null
  uploaded_at: string
}

// ============================================================================
// Subscription Types
// ============================================================================

export type Subscription = {
  id: string
  user_id: string
  stripe_subscription_id: string
  stripe_price_id: string
  status: string
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  canceled_at: string | null
  created_at: string
  updated_at: string
}

// ============================================================================
// API Types
// ============================================================================

export type ApiResponse<T> = {
  data?: T
  error?: string
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ============================================================================
// Filter Types
// ============================================================================

export type CompanyFilters = {
  search?: string
  level?: string
  state?: string
  naics?: string
}
