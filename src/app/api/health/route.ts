import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  checks: {
    database: {
      status: 'up' | 'down'
      latency?: number
      error?: string
    }
    environment: {
      status: 'configured' | 'misconfigured'
      missing?: string[]
    }
  }
}

export async function GET() {
  const startTime = Date.now()
  const result: HealthCheckResult = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    checks: {
      database: { status: 'up' },
      environment: { status: 'configured' },
    },
  }

  // Check database connectivity
  try {
    const dbStart = Date.now()
    await sql`SELECT 1`
    result.checks.database.latency = Date.now() - dbStart
  } catch (error) {
    result.checks.database.status = 'down'
    result.checks.database.error = error instanceof Error ? error.message : 'Unknown database error'
    result.status = 'unhealthy'
  }

  // Check required environment variables
  const requiredEnvVars = [
    'POSTGRES_URL',
    'NEXT_PUBLIC_APP_URL',
  ]

  const optionalEnvVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRICE_ID',
    'RESEND_API_KEY',
  ]

  const missingRequired = requiredEnvVars.filter(v => !process.env[v])
  const missingOptional = optionalEnvVars.filter(v => !process.env[v])

  if (missingRequired.length > 0) {
    result.checks.environment.status = 'misconfigured'
    result.checks.environment.missing = missingRequired
    result.status = 'unhealthy'
  } else if (missingOptional.length > 0) {
    // Still functional but degraded
    if (result.status === 'healthy') {
      result.status = 'degraded'
    }
    result.checks.environment.missing = missingOptional
  }

  const statusCode = result.status === 'healthy' ? 200 : result.status === 'degraded' ? 200 : 503

  return NextResponse.json(result, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
