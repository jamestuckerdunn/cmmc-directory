import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getUserByClerkId, updateUser } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limiting - strict for checkout to prevent abuse
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const rateLimitResult = await rateLimit(`checkout:${userId}:${ip}`, 'strict')
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

    // Get or create Stripe customer
    const dbUser = await getUserByClerkId(userId)

    let customerId = dbUser?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || undefined,
        metadata: {
          clerk_id: userId,
        },
      })

      customerId = customer.id

      await updateUser(userId, { stripeCustomerId: customerId })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      metadata: {
        clerk_id: userId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
