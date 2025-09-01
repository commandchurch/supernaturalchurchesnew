import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Cookie Policy – Supernatural Institute of Ministry"
        description="Cookie policy and tracking technologies used by Supernatural Institute of Ministry operated by Supernatural Churches Limited."
        canonicalUrl={`${siteUrl}/legal/cookie-policy`}
      />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/legal" 
            className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-blue-400" />
          </Link>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">Cookie Policy</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. What Are Cookies?</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Cookies are small text files stored on your device when you visit our website. <strong className="text-white">Supernatural Churches Limited</strong> uses cookies and similar tracking technologies to enhance your experience on Supernatural Institute of Ministry.
              </p>
              <p>
                This Cookie Policy explains what cookies we use, why we use them, and how you can control them in accordance with Australian privacy laws.
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">2. Types of Cookies We Use</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  Essential Cookies
                </h3>
                <p className="mb-3">These cookies are necessary for the website to function properly:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Session management and user authentication</li>
                  <li>Shopping cart and payment processing</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing and website performance</li>
                </ul>
                <p className="mt-3 text-blue-100 font-medium">
                  These cookies cannot be disabled as they are essential for website functionality.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Functional Cookies</h3>
                <p className="mb-3">These cookies enhance your website experience:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remembering your login preferences</li>
                  <li>Storing your course progress</li>
                  <li>Language and region settings</li>
                  <li>Prayer request form data (temporarily)</li>
                  <li>Membership tier display preferences</li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Analytics Cookies</h3>
                <p className="mb-3">These cookies help us understand how visitors use our website:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Website traffic and usage patterns</li>
                  <li>Popular courses and content</li>
                  <li>User journey and navigation paths</li>
                  <li>Website performance and loading times</li>
                  <li>Error tracking and technical issues</li>
                </ul>
                <p className="mt-3 text-purple-100 font-medium">
                  All analytics data is aggregated and anonymous.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Marketing Cookies</h3>
                <p className="mb-3">These cookies support our ministry outreach:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Tracking affiliate program referrals</li>
                  <li>Measuring advertising effectiveness</li>
                  <li>Personalizing content recommendations</li>
                  <li>Social media integration</li>
                </ul>
                <p className="mt-3 text-orange-100 font-medium">
                  You can opt-out of marketing cookies without affecting website functionality.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">3. Third-Party Services</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We use trusted third-party services that may place cookies on your device:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Payment Processing</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Stripe (secure payment processing)</li>
                    <li>PayPal (alternative payment method)</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Analytics & Performance</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Google Analytics (website analytics)</li>
                    <li>Vercel Analytics (hosting performance)</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">User Authentication</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Clerk (secure user authentication)</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Social Media</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Facebook (social sharing)</li>
                    <li>YouTube (video embedding)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cookie Management */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">4. Managing Your Cookie Preferences</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Browser Settings</h3>
              <p>
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Cookie Preferences</h3>
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                <p className="mb-4">You can customize your cookie preferences:</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Essential Cookies</span>
                    <span className="text-gray-400">Always Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Functional Cookies</span>
                    <button className="bg-green-500 text-white px-3 py-1 text-sm rounded">Enabled</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Analytics Cookies</span>
                    <button className="bg-green-500 text-white px-3 py-1 text-sm rounded">Enabled</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Marketing Cookies</span>
                    <button className="bg-gray-600 text-white px-3 py-1 text-sm rounded">Disabled</button>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Note: This is a preview. Actual cookie controls are managed through your browser settings.
                </p>
              </div>
            </div>
          </section>

          {/* Mobile Apps */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Mobile Applications</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Our mobile applications may use similar technologies to cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Local storage for app preferences</li>
                <li>Session tokens for authentication</li>
                <li>Cache for improved performance</li>
                <li>Analytics for app improvement</li>
              </ul>
              <p>
                You can manage these through your device's app settings and permissions.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Cookie Duration and Retention</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Session Cookies</h3>
                  <p className="text-sm">Deleted when you close your browser</p>
                  <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                    <li>User authentication</li>
                    <li>Shopping cart contents</li>
                    <li>Form data</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Persistent Cookies</h3>
                  <p className="text-sm">Stored for specified time periods</p>
                  <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                    <li>Login preferences (30 days)</li>
                    <li>Analytics data (2 years)</li>
                    <li>Marketing preferences (1 year)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Updates to Policy */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. Changes to This Policy</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of significant changes through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email notification to registered users</li>
                <li>Prominent notice on our website</li>
                <li>Updated "Last modified" date at the top of this policy</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Contact Us</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>If you have questions about our use of cookies:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Supernatural Churches Limited</strong></p>
                <p>Privacy Officer</p>
                <p>Email: privacy@supernatural.institute</p>
                <p>Website: supernatural.institute</p>
              </div>
              <p className="mt-4 text-sm">
                For general privacy concerns, you may also contact the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
