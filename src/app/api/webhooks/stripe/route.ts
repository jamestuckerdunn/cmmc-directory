import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { getUserByStripeCustomerId, updateUserById, upsertSubscription } from '@/lib/db'
import { sendWelcomeEmail } from '@/lib/resend'

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
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const handleSubscriptionChange = async (subscriptionData: Record<string, unknown>) => {
    const subscription = subscriptionData as {
      id: string
      customer: string
      status: string
      items: { data: Array<{ price: { id: string } }> }
      current_period_start: number
      current_period_end: number
      cancel_at_period_end: boolean
      canceled_at: number | null
    }

    const customerId = subscription.customer

    // Find user by Stripe customer ID
    const user = await getUserByStripeCustomerId(customerId)

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // Update user subscription status
    const status = subscription.status === 'active' ? 'active' :
                   subscription.status === 'past_due' ? 'past_due' :
                   subscription.status === 'canceled' ? 'canceled' : 'inactive'

    await updateUserById(user.id, {
      subscriptionStatus: status,
      subscriptionEndDate: new Date(subscription.current_period_end * 1000).toISOString(),
    })

    // Upsert subscription record
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

  switch (event.type) {
    case 'customer.subscription.created':
      const newSubscription = event.data.object as unknown as Record<string, unknown>
      const newCustomerId = newSubscription.customer as string

      // Get customer email and send welcome
      try {
        const customer = await stripe.customers.retrieve(newCustomerId)
        if (customer && !customer.deleted && customer.email) {
          await sendWelcomeEmail(
            customer.email,
            customer.name || 'there'
          )
        }
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError)
      }

      await handleSubscriptionChange(newSubscription)
      break

    case 'customer.subscription.updated':
      await handleSubscriptionChange(event.data.object as unknown as Record<string, unknown>)
      break

    case 'customer.subscription.deleted':
      const subscription = event.data.object as unknown as Record<string, unknown>
      const customerId = subscription.customer as string

      const user = await getUserByStripeCustomerId(customerId)

      if (user) {
        await updateUserById(user.id, {
          subscriptionStatus: 'canceled',
        })
      }
      break
  }

  return NextResponse.json({ received: true })
}
