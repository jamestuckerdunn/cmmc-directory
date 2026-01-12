import type { Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your CMMC Directory account to list your company and find verified CMMC certified contractors.',
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-navy-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">CMMC Directory</h1>
          <p className="mt-2 text-navy-200">Create your account</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-white shadow-xl',
              headerTitle: 'text-navy-800',
              headerSubtitle: 'text-gray-600',
              socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
              formButtonPrimary: 'bg-accent hover:bg-accent-dark',
            }
          }}
        />
      </div>
    </div>
  )
}
