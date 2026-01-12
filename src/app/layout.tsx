import type { Metadata, Viewport } from 'next'
import { ClerkProviderWrapper } from '@/components/providers/ClerkProviderWrapper'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cmmcdirectory.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CMMC Directory - Find Certified Defense Contractors',
    template: '%s | CMMC Directory',
  },
  description: 'Search and connect with CMMC certified companies in the defense industrial base. Find Level 1, 2, and 3 certified contractors for your cybersecurity needs.',
  keywords: [
    'CMMC',
    'CMMC certification',
    'cybersecurity',
    'defense contractors',
    'DoD certification',
    'CMMC Level 1',
    'CMMC Level 2',
    'CMMC Level 3',
    'defense industrial base',
    'DIB',
    'C3PAO',
    'cybersecurity maturity model certification',
  ],
  authors: [{ name: 'CMMC Directory' }],
  creator: 'CMMC Directory',
  publisher: 'CMMC Directory',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'CMMC Directory',
    title: 'CMMC Directory - Find Certified Defense Contractors',
    description: 'Search and connect with CMMC certified companies in the defense industrial base. Find Level 1, 2, and 3 certified contractors.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CMMC Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMMC Directory - Find Certified Defense Contractors',
    description: 'Search and connect with CMMC certified companies in the defense industrial base.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  themeColor: '#003366',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <ClerkProviderWrapper>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
          >
            Skip to main content
          </a>
          <div id="main-content">
            {children}
          </div>
        </ClerkProviderWrapper>
      </body>
    </html>
  )
}
