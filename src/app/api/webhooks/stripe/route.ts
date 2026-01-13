import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { getUserByStripeCustomerId, updateUserById, upsertSubscription } from '@/lib/db'
import { sendWelcomeEmail } from '@/lib/resend'

// Helper to get customer ID from subscription (handles string or expanded object)
function getCustomerId(customer: string | Stripe.Customer | Stripe.DeletedCustomer): string {
  return typeof customer === 'string' ? customer : customer.id
}

// Helper to map Stripe status to our internal status
function mapSubscriptionStatus(status: Stripe.Subscription.Status): string {
  switch (status) {
    case 'active':
      return 'active'
    case 'past_due':
      return 'past_due'
    case 'canceled':
      return 'canceled'
    default:
      return 'inactive'
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = getCustomerId(subscription.customer)
  const user = await getUserByStripeCustomerId(customerId)

  if (!user) {
    return
  }

  const status = mapSubscriptionStatus(subscription.status)
  const firstItem = subscription.items.data[0]

  // Get period from subscription item (Stripe SDK v20+)
  const periodEnd = firstItem?.current_period_end ?? subscription.billing_cycle_anchor
  const periodStart = firstItem?.current_period_start ?? subscription.billing_cycle_anchor

  await updateUserById(user.id, {
    subscriptionStatus: status,
    subscriptionEndDate: new Date(periodEnd * 1000).toISOString(),
  })

  await upsertSubscription({
    userId: user.id,
    stripeSubscriptionId: subscription.id,
    stripePriceId: firstItem?.price.id ?? '',
    status: subscription.status,
    currentPeriodStart: new Date(periodStart * 1000).toISOString(),
    currentPeriodEnd: new Date(periodEnd * 1000).toISOString(),
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

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('[Stripe Webhook] Signature verification failed:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = getCustomerId(subscription.customer)

      try {
        const customer = await stripe.customers.retrieve(customerId)
        if (customer && !customer.deleted && customer.email) {
          await sendWelcomeEmail(customer.email, customer.name || 'there')
        }
      } catch (error) {
        console.error('[Stripe Webhook] Failed to send welcome email:', error instanceof Error ? error.message : 'Unknown error')
        // Email sending failed - subscription still proceeds
      }

      await handleSubscriptionChange(subscription)
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      await handleSubscriptionChange(subscription)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = getCustomerId(subscription.customer)
      const user = await getUserByStripeCustomerId(customerId)

      if (user) {
        await updateUserById(user.id, {
          subscriptionStatus: 'canceled',
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
