import Link from 'next/link'

const linkClasses = "hover:text-white transition-colors focus:outline-none focus:underline focus:text-white"

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CMMC Directory</h3>
            <p className="text-navy-200 text-sm">
              Find and connect with CMMC certified companies in the defense industrial base.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Directory</h4>
            <ul className="space-y-2 text-navy-200 text-sm" role="list">
              <li><Link href="/directory" className={linkClasses}>Search Companies</Link></li>
              <li><Link href="/companies/new" className={linkClasses}>Register Company</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-navy-200 text-sm" role="list">
              <li>
                <a
                  href="https://dodcio.defense.gov/cmmc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  About CMMC
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
              <li><Link href="/faq" className={linkClasses}>FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-navy-200 text-sm" role="list">
              <li><Link href="/privacy" className={linkClasses}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={linkClasses}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-8 pt-8 text-center text-navy-300 text-sm">
          <p>&copy; {new Date().getFullYear()} CMMC Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
