import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-navy-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-navy-200">Last updated: January 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 prose prose-navy max-w-none">
              <h2>Introduction</h2>
              <p>
                CMMC Directory ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>

              <h2>Information We Collect</h2>

              <h3>Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Register for an account</li>
                <li>Subscribe to our services</li>
                <li>Register a company in our directory</li>
                <li>Contact us with inquiries</li>
              </ul>
              <p>This information may include:</p>
              <ul>
                <li>Name and email address</li>
                <li>Company information (name, address, phone, website)</li>
                <li>CMMC certification details</li>
                <li>Payment information (processed securely by Stripe)</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <p>
                When you access our website, we may automatically collect certain information about your device and usage, including:
              </p>
              <ul>
                <li>IP address and browser type</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website addresses</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, operate, and maintain our services</li>
                <li>Process subscriptions and payments</li>
                <li>Verify company CMMC certifications</li>
                <li>Display company listings in our directory</li>
                <li>Send administrative information and updates</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Prevent fraudulent activity</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>We may share your information in the following situations:</p>
              <ul>
                <li><strong>Directory Listings:</strong> Company information you submit for listing will be visible to other subscribers of our directory. This is the core function of our service.</li>
                <li><strong>Service Providers:</strong> We may share information with third-party vendors who perform services for us (payment processing, email delivery, hosting).</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests.</li>
                <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets.</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
              <p>
                Payment information is processed by Stripe, a PCI-DSS compliant payment processor. We do not store your full credit card details on our servers.
              </p>

              <h2>Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as needed to provide you services. We may retain certain information as required by law or for legitimate business purposes.
              </p>

              <h2>Your Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Opt-out:</strong> Opt out of certain data processing activities</li>
              </ul>
              <p>
                To exercise these rights, please contact us at privacy@cmmcdirectory.com.
              </p>

              <h2>Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings, though this may limit certain functionality.
              </p>

              <h2>Third-Party Services</h2>
              <p>Our website may contain links to third-party websites or integrate with third-party services including:</p>
              <ul>
                <li><strong>Clerk:</strong> For authentication and user management</li>
                <li><strong>Stripe:</strong> For payment processing</li>
                <li><strong>Vercel:</strong> For hosting and analytics</li>
              </ul>
              <p>
                These third parties have their own privacy policies, and we encourage you to review them.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions or concerns about this privacy policy or our data practices, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> privacy@cmmcdirectory.com<br />
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
