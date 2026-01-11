import type { Metadata } from 'next'
import { ClerkProviderWrapper } from '@/components/providers/ClerkProviderWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'CMMC Directory - Find Certified Defense Contractors',
  description: 'Search and connect with CMMC certified companies in the defense industrial base. Find Level 1, 2, and 3 certified contractors.',
  keywords: ['CMMC', 'cybersecurity', 'defense contractors', 'certification', 'DoD'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <ClerkProviderWrapper>
          {children}
        </ClerkProviderWrapper>
      </body>
    </html>
  )
}
