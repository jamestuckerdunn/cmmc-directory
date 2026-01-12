import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Rate limiter instance (lazy initialization)
let ratelimit: Ratelimit | null = null

function getRateLimiter(): Ratelimit | null {
  if (ratelimit) return ratelimit

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!redisUrl || !redisToken) {
    console.warn('Rate limiting disabled: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not configured')
    return null
  }

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  })

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
    analytics: true,
    prefix: 'cmmc-directory',
  })

  return ratelimit
}

// Different rate limit configurations
export const rateLimitConfigs = {
  // Strict limit for sensitive operations
  strict: { requests: 5, window: '60 s' },
  // Standard limit for API calls
  standard: { requests: 20, window: '60 s' },
  // Relaxed limit for read operations
  relaxed: { requests: 100, window: '60 s' },
} as const

export type RateLimitConfig = keyof typeof rateLimitConfigs

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = 'standard'
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  const limiter = getRateLimiter()

  if (!limiter) {
    // Rate limiting disabled, allow all requests
    return { success: true }
  }

  try {
    const { success, limit, remaining, reset } = await limiter.limit(
      `${config}:${identifier}`
    )

    return { success, limit, remaining, reset }
  } catch (error) {
    console.error('Rate limit error:', error)
    // On error, allow the request but log the issue
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
export function rateLimitExceededResponse(reset?: number) {
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
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': '0',
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
  const { success, reset } = await rateLimit(identifier, config)

  if (!success) {
    return rateLimitExceededResponse(reset)
  }

  return handler()
}
