import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Different rate limit configurations
export const rateLimitConfigs = {
  // Strict limit for sensitive operations (login, checkout)
  strict: { requests: 5, window: '60 s' as const },
  // Standard limit for API calls
  standard: { requests: 20, window: '60 s' as const },
  // Relaxed limit for read operations
  relaxed: { requests: 100, window: '60 s' as const },
} as const

export type RateLimitConfig = keyof typeof rateLimitConfigs

// Rate limiter instances (lazy initialization, one per config)
const rateLimiters: Partial<Record<RateLimitConfig, Ratelimit>> = {}
let redisClient: Redis | null = null
let redisConfigured: boolean | null = null

function getRedisClient(): Redis | null {
  if (redisClient) return redisClient

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!redisUrl || !redisToken) {
    if (redisConfigured === null) {
      console.warn('Rate limiting disabled: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not configured')
      redisConfigured = false
    }
    return null
  }

  redisClient = new Redis({
    url: redisUrl,
    token: redisToken,
  })
  redisConfigured = true

  return redisClient
}

function getRateLimiter(config: RateLimitConfig): Ratelimit | null {
  // Return cached limiter if exists
  if (rateLimiters[config]) return rateLimiters[config]!

  const redis = getRedisClient()
  if (!redis) return null

  const { requests, window } = rateLimitConfigs[config]

  rateLimiters[config] = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
    prefix: `cmmc-directory:${config}`,
  })

  return rateLimiters[config]!
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = 'standard'
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  const limiter = getRateLimiter(config)

  if (!limiter) {
    // Rate limiting disabled (no Redis configured), allow all requests
    return { success: true }
  }

  try {
    const { success, limit, remaining, reset } = await limiter.limit(identifier)

    return { success, limit, remaining, reset }
  } catch (error) {
    // Log the error for monitoring but allow the request
    // This prevents Redis outages from breaking the entire application
    console.error('Rate limiting error (allowing request):', error instanceof Error ? error.message : 'Unknown error')
    return { success: true }
  }
}

// Get client identifier from request
export async function getClientIdentifier(): Promise<string> {
  const headersList = await headers()

  // Try to get real IP from various headers
  const forwardedFor = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')
  const cfConnectingIp = headersList.get('cf-connecting-ip')

  // Use the most reliable IP available
  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0]?.trim() || 'anonymous'

  return ip
}

// Rate limit response helper
export function rateLimitExceededResponse(
  reset?: number,
  limit?: number,
  remaining?: number
) {
  const retryAfter = reset ? Math.ceil((reset - Date.now()) / 1000) : 60

  return NextResponse.json(
    {
      error: 'Too many requests',
      message: 'Please slow down and try again later',
      retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(limit ?? 'unknown'),
        'X-RateLimit-Remaining': String(remaining ?? 0),
      },
    }
  )
}

// Middleware helper for rate limiting API routes
export async function withRateLimit(
  handler: () => Promise<NextResponse>,
  config: RateLimitConfig = 'standard'
): Promise<NextResponse> {
  const identifier = await getClientIdentifier()
  const { success, reset, limit, remaining } = await rateLimit(identifier, config)

  if (!success) {
    return rateLimitExceededResponse(reset, limit, remaining)
  }

  return handler()
}
