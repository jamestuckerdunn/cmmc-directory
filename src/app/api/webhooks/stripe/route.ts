import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'
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
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single()

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // Update user subscription status
    const status = subscription.status === 'active' ? 'active' :
                   subscription.status === 'past_due' ? 'past_due' :
                   subscription.status === 'canceled' ? 'canceled' : 'inactive'

    await supabaseAdmin
      .from('users')
      .update({
        subscription_status: status,
        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .eq('id', user.id)

    // Upsert subscription record
    await supabaseAdmin.from('subscriptions').upsert({
      user_id: user.id,
      stripe_subscription_id: subscription.id,
      stripe_price_id: subscription.items.data[0].price.id,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000).toISOString()
        : null,
    }, {
      onConflict: 'stripe_subscription_id',
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

      const { data: user } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (user) {
        await supabaseAdmin
          .from('users')
          .update({
            subscription_status: 'canceled',
          })
          .eq('id', user.id)
      }
      break
  }

  return NextResponse.json({ received: true })
}
