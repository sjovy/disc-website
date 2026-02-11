import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                DISC Assessment
              </h3>
              <p className="text-sm text-gray-600">
                Free, anonymous personality assessment powered by AI
              </p>
            </div>

            {/* Links Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    About DISC Theory
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Legal
              </h3>
              <p className="text-sm text-gray-600">
                &copy; 2026 DISC Assessment
              </p>
              <p className="text-sm text-gray-600 mt-2">
                All rights reserved
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
