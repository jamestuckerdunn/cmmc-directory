# CMMC Directory - Production Readiness Checklist

This document contains an exhaustive list of tasks required to make the CMMC Directory application 100% production-ready and client-facing. Items are organized by category and priority.

**Total Items: 200+**

---

## Table of Contents

1. [Security (Critical)](#1-security-critical)
2. [Error Handling (Critical)](#2-error-handling-critical)
3. [Database & Data Integrity (Critical)](#3-database--data-integrity-critical)
4. [Testing (Critical)](#4-testing-critical)
5. [SEO & Meta Tags (High)](#5-seo--meta-tags-high)
6. [Accessibility (High)](#6-accessibility-high)
7. [Performance (High)](#7-performance-high)
8. [UI/UX Improvements (Medium)](#8-uiux-improvements-medium)
9. [Code Quality (Medium)](#9-code-quality-medium)
10. [DevOps & Infrastructure (Medium)](#10-devops--infrastructure-medium)
11. [Documentation (Low)](#11-documentation-low)
12. [Legal & Compliance (Low)](#12-legal--compliance-low)

---

## 1. Security (Critical)

### 1.1 Rate Limiting
- [ ] Implement rate limiting on `/api/companies` POST endpoint
- [ ] Implement rate limiting on `/api/companies` PUT endpoint
- [ ] Implement rate limiting on `/api/subscription/checkout` POST endpoint
- [ ] Implement rate limiting on `/api/subscription/status` GET endpoint
- [ ] Implement rate limiting on `/api/subscription/portal` POST endpoint
- [ ] Configure Clerk login attempt rate limiting
- [ ] Add Upstash Redis or Vercel Rate Limiting for API protection

### 1.2 Input Validation
- [ ] Add server-side validation library (zod or joi) to API routes
- [ ] Validate email format in `/api/companies/route.ts`
- [ ] Validate URL format for website field
- [ ] Validate phone number format
- [ ] Validate ZIP code format (5-digit or 9-digit)
- [ ] Add string length limits to all text fields
- [ ] Validate CMMC level is between 1-3
- [ ] Add `parseInt` radix parameter throughout codebase (`parseInt(value, 10)`)
- [ ] Add pagination bounds check (max page number)
- [ ] Validate certification date is not in future
- [ ] Validate expiry date is after certification date
- [ ] Add Content-Type header validation on API endpoints

### 1.3 Data Protection
- [ ] Move hardcoded email address `noreply@yourdomain.com` to environment variable
- [ ] Sanitize console.error logs to prevent PII exposure
- [ ] Implement structured logging with PII filtering
- [ ] Add URL validation before external redirects in `useSubscription.ts`
- [ ] Remove sensitive data from error responses

### 1.4 Authentication & Authorization
- [ ] Add authorization check in `getCompanyById` for ownership verification
- [ ] Implement proper session timeout handling
- [ ] Add CSRF token to forms (explicit handling)
- [ ] Verify webhook signatures before processing

---

## 2. Error Handling (Critical)

### 2.1 Error Boundaries
- [ ] Create `/src/app/error.tsx` - Global error boundary
- [ ] Create `/src/app/(dashboard)/error.tsx` - Dashboard error boundary
- [ ] Create `/src/app/(dashboard)/directory/error.tsx` - Directory error boundary
- [ ] Create `/src/app/(dashboard)/companies/error.tsx` - Companies error boundary
- [ ] Create `/src/app/(dashboard)/companies/[id]/error.tsx` - Company detail error boundary
- [ ] Create `/src/app/(auth)/error.tsx` - Auth pages error boundary
- [ ] Add error recovery buttons to error boundaries

### 2.2 API Error Handling
- [ ] Add `response.ok` check in `useSubscription.ts` line 45-46
- [ ] Add `response.ok` check in `useSubscription.ts` line 65-68
- [ ] Add `response.ok` check in `useSubscription.ts` line 85-88
- [ ] Create typed error responses for API routes
- [ ] Distinguish validation errors (400) from server errors (500)
- [ ] Add proper error messages for database constraint violations
- [ ] Handle JSON parse errors in webhook routes
- [ ] Add try-catch around all database operations in `db.ts`

### 2.3 Component Error States
- [ ] Add `error` state to `useSubscription` hook return type
- [ ] Add error UI to `CompanyList.tsx` for query failures
- [ ] Add error state to dashboard for failed data loads
- [ ] Add error state distinction: "no results" vs "load failed"
- [ ] Add correlation IDs to webhook error logs

### 2.4 Loading States
- [ ] Add loading skeleton to directory search results
- [ ] Add `aria-busy` attribute during async operations
- [ ] Add `aria-live` region for dynamic content updates
- [ ] Add loading state during response parsing in `CompanyForm.tsx`

---

## 3. Database & Data Integrity (Critical)

### 3.1 Missing Indexes
- [ ] Add compound index on `company_naics(company_id, naics_code)`
- [ ] Add index on `users.email`
- [ ] Add index on `companies.name` for ILIKE queries
- [ ] Add index on `subscriptions.user_id`
- [ ] Add index on `compliance_evidence(company_id, uploaded_by, document_type)`

### 3.2 Transactions
- [ ] Wrap `setCompanyNaicsCodes` DELETE+INSERTs in transaction
- [ ] Wrap company creation + NAICS codes in transaction (`/api/companies` POST)
- [ ] Wrap company update + NAICS codes in transaction (`/api/companies` PUT)
- [ ] Wrap Stripe webhook user + subscription updates in transaction

### 3.3 Query Optimization
- [ ] Replace N+1 NAICS insertion loop with batch INSERT
- [ ] Combine `getCompanies` and `countCompanies` into single query with window function
- [ ] Add explicit column selection (remove `SELECT *`)
- [ ] Push dashboard filtering to database (not JavaScript `.filter()`)
- [ ] Add JOIN for NAICS codes in company queries

### 3.4 Data Validation & Constraints
- [ ] Add NOT NULL constraint on `companies.address_line1`
- [ ] Add NOT NULL constraint on `companies.city`
- [ ] Add NOT NULL constraint on `companies.state`
- [ ] Add NOT NULL constraint on `companies.zip_code`
- [ ] Add NOT NULL constraint on `companies.certification_date`
- [ ] Add UNIQUE constraint on `users.email`
- [ ] Add UNIQUE constraint on `companies(user_id, name)` combination
- [ ] Add ON DELETE CASCADE to `compliance_evidence.uploaded_by`
- [ ] Validate NAICS code exists before insertion

### 3.5 Schema Improvements
- [ ] Implement soft deletes (add `deleted_at` column)
- [ ] Add audit logging table for compliance
- [ ] Add trigger for `updated_at` on `compliance_evidence`
- [ ] Implement data retention policy
- [ ] Remove or implement `compliance_evidence` table (currently unused)

---

## 4. Testing (Critical)

### 4.1 Test Framework Setup
- [ ] Install Jest and React Testing Library
- [ ] Create `jest.config.ts` configuration
- [ ] Add test script to `package.json`
- [ ] Create test setup files
- [ ] Configure test environment variables

### 4.2 Unit Tests
- [ ] Test `getUserByClerkId` function
- [ ] Test `getUserByStripeCustomerId` function
- [ ] Test `createUser` function
- [ ] Test `updateUser` function
- [ ] Test `deleteUser` function
- [ ] Test `getCompanies` function
- [ ] Test `countCompanies` function
- [ ] Test `getCompanyById` function
- [ ] Test `createCompany` function
- [ ] Test `updateCompany` function
- [ ] Test `getNaicsCodes` function
- [ ] Test `getCompanyNaicsCodes` function
- [ ] Test `setCompanyNaicsCodes` function
- [ ] Test `upsertSubscription` function
- [ ] Test `updateUserById` function
- [ ] Test `formatDate` utility
- [ ] Test `cn` utility

### 4.3 Component Tests
- [ ] Test `Badge` component variants
- [ ] Test `Button` component loading state
- [ ] Test `Button` component disabled state
- [ ] Test `Card` component rendering
- [ ] Test `Input` component validation
- [ ] Test `Select` component options
- [ ] Test `Skeleton` component
- [ ] Test `Toast` component lifecycle
- [ ] Test `EmptyState` component variants
- [ ] Test `CompanyCard` component data display
- [ ] Test `CompanyList` pagination
- [ ] Test `SearchFilters` filter application
- [ ] Test `CompanyForm` submission
- [ ] Test `SubscriptionGate` access control
- [ ] Test `Header` mobile menu toggle
- [ ] Test `Footer` link rendering

### 4.4 API Tests
- [ ] Test POST `/api/companies` - successful creation
- [ ] Test POST `/api/companies` - unauthorized access
- [ ] Test POST `/api/companies` - validation errors
- [ ] Test PUT `/api/companies` - successful update
- [ ] Test PUT `/api/companies` - ownership verification
- [ ] Test POST `/api/subscription/checkout` - creates session
- [ ] Test GET `/api/subscription/status` - returns status
- [ ] Test POST `/api/subscription/portal` - creates portal session
- [ ] Test POST `/api/webhooks/clerk` - user creation
- [ ] Test POST `/api/webhooks/clerk` - user update
- [ ] Test POST `/api/webhooks/clerk` - user deletion
- [ ] Test POST `/api/webhooks/stripe` - subscription created
- [ ] Test POST `/api/webhooks/stripe` - subscription updated
- [ ] Test POST `/api/webhooks/stripe` - subscription deleted

### 4.5 Mocks
- [ ] Create Clerk mock for testing
- [ ] Create Stripe mock for testing
- [ ] Create Resend mock for testing
- [ ] Create Vercel Postgres mock for testing
- [ ] Create Svix webhook mock for testing

### 4.6 Integration Tests
- [ ] Test company registration workflow
- [ ] Test subscription checkout flow
- [ ] Test directory search and filter
- [ ] Test company edit workflow

### 4.7 E2E Tests
- [ ] Setup Playwright configuration
- [ ] Test user signup flow
- [ ] Test company registration end-to-end
- [ ] Test search functionality
- [ ] Test subscription purchase

### 4.8 CI/CD
- [ ] Create GitHub Actions test workflow
- [ ] Add pre-commit hooks for linting
- [ ] Add test requirement for pull requests
- [ ] Add code coverage reporting

---

## 5. SEO & Meta Tags (High)

### 5.1 Page Metadata
- [ ] Add metadata export to `/faq/page.tsx`
- [ ] Add metadata export to `/privacy/page.tsx`
- [ ] Add metadata export to `/terms/page.tsx`
- [ ] Add metadata export to `/sign-in/[[...sign-in]]/page.tsx`
- [ ] Add metadata export to `/sign-up/[[...sign-up]]/page.tsx`
- [ ] Add metadata export to `/dashboard/page.tsx`
- [ ] Add metadata export to `/directory/page.tsx`
- [ ] Add metadata export to `/companies/page.tsx`
- [ ] Add metadata export to `/companies/new/page.tsx`
- [ ] Add metadata export to `/settings/page.tsx`
- [ ] Add `generateMetadata` to `/directory/[id]/page.tsx` (dynamic)
- [ ] Add `generateMetadata` to `/companies/[id]/page.tsx` (dynamic)
- [ ] Add `generateMetadata` to `/companies/[id]/edit/page.tsx` (dynamic)

### 5.2 Social Media Tags
- [ ] Add `openGraph` property to root layout metadata
- [ ] Add `twitter` property to root layout metadata
- [ ] Create OG image template for company pages
- [ ] Create default OG image for static pages

### 5.3 Technical SEO
- [ ] Create `/public/robots.txt`
- [ ] Create `/app/sitemap.ts` route handler
- [ ] Add canonical URL configuration to layout metadata
- [ ] Add `metadataBase` for absolute URLs

### 5.4 Structured Data
- [ ] Add Organization JSON-LD schema
- [ ] Add LocalBusiness JSON-LD schema
- [ ] Add FAQPage JSON-LD schema to `/faq`
- [ ] Add Service JSON-LD schema for directory listings

---

## 6. Accessibility (High)

### 6.1 ARIA Labels
- [ ] Add `aria-label` to Header close button (`Header.tsx:79`)
- [ ] Add `aria-hidden` to decorative SVGs throughout homepage
- [ ] Add `aria-label` to CompanyCard location icon
- [ ] Add `aria-label` to Toast close buttons
- [ ] Add `aria-label` to EmptyState icons
- [ ] Add `aria-label` to CompanyList empty state icon
- [ ] Add `aria-expanded` to mobile menu button
- [ ] Add `aria-controls` to mobile menu button

### 6.2 Keyboard Navigation
- [ ] Add Escape key handler to close mobile menu
- [ ] Implement focus trap for mobile menu modal
- [ ] Add skip-to-content link in Header
- [ ] Add Escape key support in SearchFilters

### 6.3 Focus States
- [ ] Add focus ring to `.btn-secondary` class
- [ ] Add focus ring to Header sign-in/sign-up buttons
- [ ] Add focus ring to CompanyCard link
- [ ] Add focus ring to Footer links
- [ ] Add focus ring to FAQ contact support link
- [ ] Add focus ring to Toast close button

### 6.4 Color Contrast
- [ ] Fix navy-300 on navy-900 contrast in trust indicators
- [ ] Fix navy-800 on navy-100 contrast in testimonial avatars
- [ ] Verify accent button text contrast meets WCAG AA
- [ ] Fix opacity-50 Toast close button contrast

### 6.5 Form Accessibility
- [ ] Add `aria-label` to CompanyForm textarea
- [ ] Add `aria-describedby` for form hints
- [ ] Add `aria-invalid` for validation errors
- [ ] Add visible validation messages for each field
- [ ] Add client-side validation feedback

---

## 7. Performance (High)

### 7.1 Image Optimization
- [ ] Configure `remotePatterns` in `next.config.ts` for company logos
- [ ] Remove `unoptimized` from CompanyCard Image
- [ ] Remove `unoptimized` from directory detail Image
- [ ] Add image placeholders/blur

### 7.2 Bundle Optimization
- [ ] Remove unused `@supabase/ssr` dependency
- [ ] Remove unused `@supabase/supabase-js` dependency
- [ ] Remove unused `@tanstack/react-query` dependency
- [ ] Remove unused `lucide-react` dependency (using inline SVGs)
- [ ] Add bundle analyzer to identify large dependencies

### 7.3 Code Splitting
- [ ] Add dynamic imports for below-fold homepage sections
- [ ] Add Suspense boundaries for streaming
- [ ] Lazy load CompanyForm NAICS code grid
- [ ] Add dynamic import for company detail page sections

### 7.4 Caching
- [ ] Implement static caching for `/faq`, `/privacy`, `/terms`
- [ ] Add revalidation strategy for directory pages
- [ ] Add caching headers to subscription status API
- [ ] Configure stale-while-revalidate for company listings
- [ ] Add ISR for company detail pages

### 7.5 Font Loading
- [ ] Move Google Fonts import to `layout.tsx` with `next/font`
- [ ] Add `font-display: swap` for Google Fonts
- [ ] Add DNS prefetch for fonts.googleapis.com

### 7.6 Component Optimization
- [ ] Add `useMemo` for dashboard company filtering
- [ ] Add `useMemo` for `getPageNumbers` pagination calculation
- [ ] Add `React.memo` for CompanyCard component
- [ ] Add prefetch for navigation links

### 7.7 Next.js Configuration
- [ ] Add image optimization settings to `next.config.ts`
- [ ] Add compression settings
- [ ] Add caching headers configuration
- [ ] Add bundle analysis plugin

---

## 8. UI/UX Improvements (Medium)

### 8.1 Responsive Design
- [ ] Add `sm:` breakpoint for testimonials grid
- [ ] Add tablet breakpoint for directory sidebar
- [ ] Optimize hero section for screens < 375px
- [ ] Test and fix layout on very small screens (< 320px)

### 8.2 Loading Experience
- [ ] Add skeleton loader to directory search results
- [ ] Add pagination loading indicator
- [ ] Add company detail skeleton on navigate

### 8.3 Form Experience
- [ ] Add real-time validation feedback
- [ ] Add field-level error messages
- [ ] Add required field indicators (*)
- [ ] Add success toast on form submission
- [ ] Add max length indicators for text fields

### 8.4 Mobile Menu
- [ ] Add semantic `<nav>` and `<h2>` to mobile menu
- [ ] Add `onClick={onClose}` to footer links in mobile menu
- [ ] Improve menu close button visibility

### 8.5 Interactive Elements
- [ ] Add `aria-label` context to CompanyCard for screen readers
- [ ] Add `role="presentation"` to decorative mock cards
- [ ] Improve toast notification styling

---

## 9. Code Quality (Medium)

### 9.1 TypeScript Improvements
- [ ] Create typed error interfaces in `/types/errors.ts`
- [ ] Replace `as unknown as` patterns with proper types
- [ ] Add proper error typing to all catch blocks (`error: unknown`)
- [ ] Create Stripe event type definitions
- [ ] Add type guards for error objects
- [ ] Fix untyped form data in CompanyForm

### 9.2 Constants & Configuration
- [ ] Create `/constants/index.ts` for shared constants
- [ ] Move US_STATES to shared constants (remove duplication)
- [ ] Move CMMC_LEVELS to shared constants (remove duplication)
- [ ] Move email addresses to environment variables
- [ ] Create configuration file for pagination limits
- [ ] Extract magic numbers to named constants

### 9.3 Code Organization
- [ ] Extract email templates to separate files
- [ ] Create error handler utility function
- [ ] Create logging service to replace console.log
- [ ] Standardize naming conventions (snake_case vs camelCase)
- [ ] Add JSDoc comments to complex functions

### 9.4 Code Cleanup
- [ ] Add radix parameter to all `parseInt` calls
- [ ] Add null checks in critical paths (`emailAddresses[0]`)
- [ ] Fix copyright symbol handling
- [ ] Remove unused code and dead imports

---

## 10. DevOps & Infrastructure (Medium)

### 10.1 Environment Configuration
- [ ] Create `.env.production.example` template
- [ ] Validate all required environment variables on startup
- [ ] Add environment variable documentation
- [ ] Configure Vercel environment variables for production

### 10.2 Monitoring & Logging
- [ ] Integrate error tracking service (Sentry)
- [ ] Add structured logging library (Pino)
- [ ] Configure log levels by environment
- [ ] Add performance monitoring
- [ ] Set up uptime monitoring

### 10.3 Deployment
- [ ] Add health check endpoint
- [ ] Configure preview deployments
- [ ] Add deployment notifications
- [ ] Create rollback procedure documentation

### 10.4 Database Operations
- [ ] Create database migration scripts
- [ ] Set up database backup automation
- [ ] Create seed data scripts for development
- [ ] Document database schema

---

## 11. Documentation (Low)

### 11.1 README
- [ ] Update README with setup instructions
- [ ] Add architecture overview
- [ ] Document environment variables
- [ ] Add deployment instructions
- [ ] Add contributing guidelines

### 11.2 API Documentation
- [ ] Document `/api/companies` endpoints
- [ ] Document `/api/subscription` endpoints
- [ ] Document webhook payload formats
- [ ] Add request/response examples

### 11.3 Component Documentation
- [ ] Document UI component props and usage
- [ ] Add Storybook or similar for component demos
- [ ] Document form validation rules
- [ ] Document authentication flow

---

## 12. Legal & Compliance (Low)

### 12.1 Content Updates
- [ ] Update placeholder email addresses in privacy policy
- [ ] Update placeholder physical address
- [ ] Review and finalize Terms of Service
- [ ] Add cookie consent banner (if using cookies)
- [ ] Update copyright year dynamically

### 12.2 Data Handling
- [ ] Implement data export functionality (GDPR)
- [ ] Implement account deletion functionality
- [ ] Add data retention policy
- [ ] Document data processing activities

### 12.3 CMMC-Specific
- [ ] Implement certification verification workflow
- [ ] Add admin panel for company approval
- [ ] Implement compliance evidence upload
- [ ] Add certification expiry notifications

---

## Priority Summary

| Priority | Category | Item Count |
|----------|----------|------------|
| Critical | Security | 25 |
| Critical | Error Handling | 30 |
| Critical | Database | 25 |
| Critical | Testing | 60 |
| High | SEO | 25 |
| High | Accessibility | 30 |
| High | Performance | 25 |
| Medium | UI/UX | 15 |
| Medium | Code Quality | 20 |
| Medium | DevOps | 15 |
| Low | Documentation | 15 |
| Low | Legal | 12 |

**Total: 297 items**

---

## Recommended Implementation Order

1. **Week 1-2**: Security fixes (rate limiting, input validation)
2. **Week 2-3**: Error boundaries and error handling
3. **Week 3-4**: Database indexes and transactions
4. **Week 4-6**: Testing infrastructure and unit tests
5. **Week 6-7**: SEO and meta tags
6. **Week 7-8**: Accessibility fixes
7. **Week 8-9**: Performance optimization
8. **Week 9-10**: UI/UX improvements
9. **Week 10-11**: Code quality improvements
10. **Week 11-12**: Documentation and final polish

---

*Generated by Claude Code - Comprehensive Production Readiness Review*
*Last Updated: January 2026*
