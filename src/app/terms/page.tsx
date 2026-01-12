import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-navy-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-navy-200">Last updated: January 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 prose prose-navy max-w-none">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing or using CMMC Directory (&quot;the Service&quot;), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>

              <h2>Description of Service</h2>
              <p>
                CMMC Directory provides an online platform that connects organizations seeking CMMC-certified defense contractors with verified companies. Our services include:
              </p>
              <ul>
                <li>A searchable directory of CMMC-certified companies</li>
                <li>Company registration and listing services</li>
                <li>Verification of CMMC certification status</li>
              </ul>

              <h2>Subscription and Payment</h2>

              <h3>Subscription Plans</h3>
              <p>
                Access to the CMMC Directory requires a paid subscription. The current subscription rate is $10 per month, billed monthly through our payment processor, Stripe.
              </p>

              <h3>Billing</h3>
              <p>
                By subscribing, you authorize us to charge your payment method on a recurring monthly basis. Subscriptions automatically renew until cancelled.
              </p>

              <h3>Cancellation</h3>
              <p>
                You may cancel your subscription at any time through your account settings. Upon cancellation, you will retain access until the end of your current billing period. No refunds are provided for partial months, except within the first 7 days of initial subscription.
              </p>

              <h2>User Accounts</h2>
              <p>
                When you create an account, you must provide accurate and complete information. You are responsible for:
              </p>
              <ul>
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>

              <h2>Company Listings</h2>

              <h3>Accuracy of Information</h3>
              <p>
                Companies registering in our directory must provide accurate and truthful information. By submitting a listing, you represent and warrant that:
              </p>
              <ul>
                <li>All information provided is accurate and current</li>
                <li>Your company holds a valid CMMC certification at the stated level</li>
                <li>You are authorized to submit information on behalf of the company</li>
              </ul>

              <h3>Verification Process</h3>
              <p>
                All company listings are subject to verification before publication. We reserve the right to:
              </p>
              <ul>
                <li>Request additional documentation to verify certification claims</li>
                <li>Reject listings that cannot be verified</li>
                <li>Remove listings if certification expires or is revoked</li>
                <li>Mark listings as expired pending re-verification</li>
              </ul>

              <h3>Listing Content</h3>
              <p>You agree not to submit content that is:</p>
              <ul>
                <li>False, misleading, or fraudulent</li>
                <li>Defamatory, obscene, or offensive</li>
                <li>Infringing on intellectual property rights</li>
                <li>In violation of any applicable laws or regulations</li>
              </ul>

              <h2>Acceptable Use</h2>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Violate any laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Transmit malware or other harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Scrape, harvest, or collect data without permission</li>
                <li>Resell or redistribute directory information</li>
                <li>Interfere with the proper functioning of the Service</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                The Service, including its design, features, and content (excluding user-submitted company information), is owned by CMMC Directory and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
              </p>
              <p>
                By submitting company information, you grant us a non-exclusive, worldwide license to display that information as part of the directory service.
              </p>

              <h2>Disclaimers</h2>

              <h3>No Warranty</h3>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components.
              </p>

              <h3>Verification Limitations</h3>
              <p>
                While we make reasonable efforts to verify company certifications, we do not guarantee the accuracy of any listing. Users should conduct their own due diligence before engaging with any company in the directory.
              </p>

              <h3>Third-Party Links</h3>
              <p>
                Our Service may contain links to third-party websites. We are not responsible for the content or practices of any linked sites.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CMMC DIRECTORY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES.
              </p>
              <p>
                Our total liability for any claims arising from your use of the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless CMMC Directory, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
              </p>
              <ul>
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Any content you submit to the Service</li>
              </ul>

              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Virginia, without regard to its conflict of law provisions. Any disputes shall be resolved in the state or federal courts located in Arlington County, Virginia.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>

              <h2>Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>

              <h2>Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> legal@cmmcdirectory.com<br />
                <strong>Address:</strong> CMMC Directory, Inc.<br />
                1234 Defense Way, Suite 100<br />
                Arlington, VA 22201
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
