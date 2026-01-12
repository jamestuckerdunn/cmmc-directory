import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, updateUser, deleteUser } from '@/lib/db'

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error('CLERK_WEBHOOK_SECRET environment variable is required')
  }

  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  let event: WebhookEvent
  try {
    event = new Webhook(webhookSecret).verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch {
    return new Response('Verification failed', { status: 400 })
  }

  const { type, data } = event

  try {
    switch (type) {
      case 'user.created': {
        const { id, email_addresses, first_name, last_name } = data
        await createUser({
          clerkId: id,
          email: email_addresses[0]?.email_address,
          firstName: first_name,
          lastName: last_name,
        })
        break
      }

      case 'user.updated': {
        const { id, email_addresses, first_name, last_name } = data
        await updateUser(id, {
          email: email_addresses[0]?.email_address,
          firstName: first_name,
          lastName: last_name,
        })
        break
      }

      case 'user.deleted': {
        if (data.id) {
          await deleteUser(data.id)
        }
        break
      }
    }
  } catch {
    return new Response('Failed to process webhook', { status: 500 })
  }

  return new Response('Webhook processed', { status: 200 })
}
