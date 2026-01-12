/**
 * Environment variable validation
 * Validates required environment variables at build/runtime
 */

function getEnvVar(name: string, required: boolean = true): string {
  const value = process.env[name]
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value || ''
}

// Server-side environment variables (not exposed to client)
export const serverEnv = {
  // Database
  POSTGRES_URL: () => getEnvVar('POSTGRES_URL'),

  // Stripe
  STRIPE_SECRET_KEY: () => getEnvVar('STRIPE_SECRET_KEY'),
  STRIPE_WEBHOOK_SECRET: () => getEnvVar('STRIPE_WEBHOOK_SECRET'),
  STRIPE_PRICE_ID: () => getEnvVar('STRIPE_PRICE_ID'),

  // Clerk
  CLERK_SECRET_KEY: () => getEnvVar('CLERK_SECRET_KEY'),
  CLERK_WEBHOOK_SECRET: () => getEnvVar('CLERK_WEBHOOK_SECRET'),

  // Resend (optional)
  RESEND_API_KEY: () => getEnvVar('RESEND_API_KEY', false),
}

// Client-side environment variables (exposed to browser)
export const clientEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
}

// Validate critical environment variables
export function validateEnv(): void {
  const errors: string[] = []

  const requiredServerVars = [
    'POSTGRES_URL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRICE_ID',
  ]

  for (const varName of requiredServerVars) {
    if (!process.env[varName]) {
      errors.push(varName)
    }
  }

  if (errors.length > 0 && process.env.NODE_ENV === 'production') {
    console.error(`Missing required environment variables: ${errors.join(', ')}`)
  }
}
