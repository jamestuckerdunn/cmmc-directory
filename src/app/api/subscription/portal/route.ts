import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getUserByClerkId } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limiting - standard for portal access
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const rateLimitResult = await rateLimit(`portal:${userId}:${ip}`, 'standard')
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
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
    if (!user?.stripe_customer_id) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 400 })
    }

    const stripe = getStripe()
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
  }
}
