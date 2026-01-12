import { Resend } from 'resend'

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null

function getResend(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      // Return a mock instance that logs warnings instead of throwing
      return {
        emails: {
          send: async () => {
            console.warn('RESEND_API_KEY not configured, email not sent')
            return { id: 'mock' }
          }
        }
      } as unknown as Resend
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

export async function sendWelcomeEmail(email: string, name: string) {
  const resend = getResend()
  try {
    await resend.emails.send({
      from: 'CMMC Directory <noreply@yourdomain.com>',
      to: email,
      subject: 'Welcome to CMMC Directory',
      html: `
        <div style="font-family: 'Source Sans 3', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e3a5f; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0;">CMMC Directory</h1>
          </div>
          <div style="padding: 32px; background-color: #f9fafb;">
            <h2 style="color: #1e3a5f;">Welcome, ${name}!</h2>
            <p style="color: #374151; line-height: 1.6;">
              Thank you for joining CMMC Directory. You now have access to our comprehensive database
              of CMMC certified companies in the defense industrial base.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              With your subscription, you can:
            </p>
            <ul style="color: #374151; line-height: 1.8;">
              <li>Search and filter certified companies</li>
              <li>Register your own company to the directory</li>
              <li>View detailed compliance information</li>
            </ul>
            <div style="text-align: center; margin-top: 32px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/directory"
                 style="background-color: #005ea2; color: white; padding: 12px 24px;
                        text-decoration: none; border-radius: 4px; font-weight: 600;">
                Explore the Directory
              </a>
            </div>
          </div>
          <div style="padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CMMC Directory. All rights reserved.
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
  }
}

export async function sendCompanySubmittedEmail(email: string, companyName: string) {
  const resend = getResend()
  try {
    await resend.emails.send({
      from: 'CMMC Directory <noreply@yourdomain.com>',
      to: email,
      subject: `Company Registration Received: ${companyName}`,
      html: `
        <div style="font-family: 'Source Sans 3', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e3a5f; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0;">CMMC Directory</h1>
          </div>
          <div style="padding: 32px; background-color: #f9fafb;">
            <h2 style="color: #1e3a5f;">Registration Received</h2>
            <p style="color: #374151; line-height: 1.6;">
              We've received your registration for <strong>${companyName}</strong>.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Our team will review your submission and verify the CMMC certification
              documentation. This typically takes 1-3 business days.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              You'll receive an email notification once your company listing is approved
              and live in the directory.
            </p>
            <div style="text-align: center; margin-top: 32px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/companies"
                 style="background-color: #005ea2; color: white; padding: 12px 24px;
                        text-decoration: none; border-radius: 4px; font-weight: 600;">
                View My Companies
              </a>
            </div>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send company submitted email:', error)
  }
}

export async function sendCompanyVerifiedEmail(email: string, companyName: string) {
  const resend = getResend()
  try {
    await resend.emails.send({
      from: 'CMMC Directory <noreply@yourdomain.com>',
      to: email,
      subject: `Company Verified: ${companyName} is Now Live!`,
      html: `
        <div style="font-family: 'Source Sans 3', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e3a5f; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0;">CMMC Directory</h1>
          </div>
          <div style="padding: 32px; background-color: #f9fafb;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="font-size: 48px; color: #00a91c;">&#10003;</span>
            </div>
            <h2 style="color: #00a91c; text-align: center;">Company Verified!</h2>
            <p style="color: #374151; line-height: 1.6;">
              Great news! <strong>${companyName}</strong> has been verified and is now
              live in the CMMC Directory.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Your company is now visible to all directory subscribers searching for
              CMMC certified partners.
            </p>
            <div style="text-align: center; margin-top: 32px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/directory"
                 style="background-color: #005ea2; color: white; padding: 12px 24px;
                        text-decoration: none; border-radius: 4px; font-weight: 600;">
                View in Directory
              </a>
            </div>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send company verified email:', error)
  }
}
