import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getUserByClerkId, updateUser } from '@/lib/db'

export async function POST() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stripe = getStripe()
    const dbUser = await getUserByClerkId(userId)
    let customerId = dbUser?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || undefined,
        metadata: { clerk_id: userId },
      })
      customerId = customer.id
      await updateUser(userId, { stripeCustomerId: customerId })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      metadata: { clerk_id: userId },
    })

    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
