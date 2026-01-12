import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { getUserByStripeCustomerId, updateUserById, upsertSubscription } from '@/lib/db'
import { sendWelcomeEmail } from '@/lib/resend'

interface StripeSubscription {
  id: string
  customer: string
  status: string
  items: { data: Array<{ price: { id: string } }> }
  current_period_start: number
  current_period_end: number
  cancel_at_period_end: boolean
  canceled_at: number | null
}

function mapSubscriptionStatus(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'active',
    past_due: 'past_due',
    canceled: 'canceled',
  }
  return statusMap[status] || 'inactive'
}

async function handleSubscriptionChange(subscription: StripeSubscription) {
  const user = await getUserByStripeCustomerId(subscription.customer)
  if (!user) return

  await updateUserById(user.id, {
    subscriptionStatus: mapSubscriptionStatus(subscription.status),
    subscriptionEndDate: new Date(subscription.current_period_end * 1000).toISOString(),
  })

  await upsertSubscription({
    userId: user.id,
    stripeSubscriptionId: subscription.id,
    stripePriceId: subscription.items.data[0].price.id,
    status: subscription.status,
    currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    canceledAt: subscription.canceled_at
      ? new Date(subscription.canceled_at * 1000).toISOString()
      : null,
  })
}

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  const stripe = getStripe()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'customer.subscription.created': {
      const subscriptionData = event.data.object as unknown as StripeSubscription
      try {
        const customer = await stripe.customers.retrieve(subscriptionData.customer)
        if (customer && !customer.deleted && customer.email) {
          await sendWelcomeEmail(customer.email, customer.name || 'there')
        }
      } catch {
        // Email sending is non-critical
      }
      await handleSubscriptionChange(subscriptionData)
      break
    }

    case 'customer.subscription.updated':
      await handleSubscriptionChange(event.data.object as unknown as StripeSubscription)
      break

    case 'customer.subscription.deleted': {
      const subscriptionData = event.data.object as unknown as StripeSubscription
      const user = await getUserByStripeCustomerId(subscriptionData.customer)
      if (user) {
        await updateUserById(user.id, { subscriptionStatus: 'canceled' })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
