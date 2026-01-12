import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/sign-in', '/sign-up', '/api/webhooks', '/faq', '/privacy', '/terms']

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Check if Clerk is configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    // Clerk not configured - allow all requests through
    return NextResponse.next()
  }

  // Dynamically import and use Clerk middleware
  try {
    const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')

    const isPublicClerkRoute = createRouteMatcher([
      '/',
      '/sign-in(.*)',
      '/sign-up(.*)',
      '/api/webhooks(.*)',
      '/faq',
      '/privacy',
      '/terms',
    ])

    const handler = clerkMiddleware(async (auth, request) => {
      if (!isPublicClerkRoute(request)) {
        await auth.protect()
      }
    })

    return handler(req, {} as never)
  } catch (error) {
    console.error('Clerk middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
