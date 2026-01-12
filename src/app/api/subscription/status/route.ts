import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/lib/db'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getUserByClerkId(userId)
    return NextResponse.json({
      subscriptionStatus: user?.subscription_status || 'inactive',
    })
  } catch {
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 })
  }
}
