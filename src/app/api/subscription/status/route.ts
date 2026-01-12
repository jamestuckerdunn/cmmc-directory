import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limiting - relaxed for status checks (frequent polling)
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const rateLimitResult = await rateLimit(`status:${userId}:${ip}`, 'relaxed')
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(rateLimitResult.limit || 0),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining || 0),
            'X-RateLimit-Reset': String(rateLimitResult.reset || 0),
          }
        }
      )
    }

    const user = await getUserByClerkId(userId)

    return NextResponse.json({
      subscriptionStatus: user?.subscription_status || 'inactive',
    })
  } catch (error) {
    console.error('Status error:', error)
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 })
  }
}
