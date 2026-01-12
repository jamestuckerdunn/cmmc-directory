import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getUserByClerkId } from '@/lib/db'

export async function POST() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
