/**
 * Environment variable validation and configuration
 * This module provides type-safe access to environment variables
 */

interface EnvironmentConfig {
  // Database
  POSTGRES_URL: string

  // App
  NEXT_PUBLIC_APP_URL: string
  NODE_ENV: 'development' | 'production' | 'test'

  // Authentication (Clerk) - Optional
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string
  CLERK_SECRET_KEY?: string
  CLERK_WEBHOOK_SECRET?: string

  // Payments (Stripe) - Optional
  STRIPE_SECRET_KEY?: string
  STRIPE_WEBHOOK_SECRET?: string
  STRIPE_PRICE_ID?: string

  // Email (Resend) - Optional
  RESEND_API_KEY?: string
  EMAIL_FROM?: string

  // Analytics - Optional
  GOOGLE_SITE_VERIFICATION?: string

  // Rate Limiting (Upstash) - Optional
  UPSTASH_REDIS_REST_URL?: string
  UPSTASH_REDIS_REST_TOKEN?: string
}

class EnvironmentError extends Error {
  constructor(message: string, public missing: string[]) {
    super(message)
    this.name = 'EnvironmentError'
  }
}

/**
 * Validates that required environment variables are set
 * Call this early in your application startup
 */
export function validateEnvironment(): void {
  const required = ['POSTGRES_URL', 'NEXT_PUBLIC_APP_URL']
  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new EnvironmentError(
      `Missing required environment variables: ${missing.join(', ')}`,
      missing
    )
  }
}

/**
 * Get environment configuration with type safety
 * Returns undefined for optional variables that are not set
 */
export function getEnv(): EnvironmentConfig {
  return {
    // Required
    POSTGRES_URL: process.env.POSTGRES_URL!,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
    NODE_ENV: (process.env.NODE_ENV as EnvironmentConfig['NODE_ENV']) || 'development',

    // Optional - Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,

    // Optional - Payments
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,

    // Optional - Email
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM || 'CMMC Directory <noreply@cmmcdirectory.com>',

    // Optional - Analytics
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,

    // Optional - Rate Limiting
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  }
}

/**
 * Check if specific services are configured
 */
export const serviceStatus = {
  isClerkConfigured: () =>
    Boolean(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
    ),

  isStripeConfigured: () =>
    Boolean(
      process.env.STRIPE_SECRET_KEY &&
        process.env.STRIPE_WEBHOOK_SECRET &&
        process.env.STRIPE_PRICE_ID
    ),

  isResendConfigured: () => Boolean(process.env.RESEND_API_KEY),

  isRateLimitConfigured: () =>
    Boolean(
      process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ),
}

/**
 * Get a summary of which services are available
 */
export function getServiceStatus(): Record<string, boolean> {
  return {
    clerk: serviceStatus.isClerkConfigured(),
    stripe: serviceStatus.isStripeConfigured(),
    resend: serviceStatus.isResendConfigured(),
    rateLimit: serviceStatus.isRateLimitConfigured(),
  }
}
