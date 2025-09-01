import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Privacy Policy – Supernatural Institute of Ministry"
        description="Privacy policy and data protection practices for Supernatural Institute of Ministry operated by Supernatural Churches Limited."
        canonicalUrl={`${siteUrl}/legal/privacy-policy`}
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
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. Introduction</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Supernatural Churches Limited</strong> (ABN: [ABN Number]) operates Supernatural Institute of Ministry. We are committed to protecting your privacy and handling your personal information in accordance with the Australian Privacy Principles under the Privacy Act 1988 (Cth).
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website, services, and applications.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">2. Information We Collect</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and contact details (email, phone, address)</li>
                <li>Account registration information</li>
                <li>Payment and billing information</li>
                <li>Course progress and completion data</li>
                <li>Prayer requests and ministry-related communications</li>
                <li>Affiliate program participation data</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Device information and IP address</li>
                <li>Browser type and version</li>
                <li>Usage data and website interactions</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">3. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>We use your personal information for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing and improving our educational services</li>
                <li>Processing memberships and payments</li>
                <li>Delivering course content and tracking progress</li>
                <li>Responding to prayer requests and providing pastoral care</li>
                <li>Managing affiliate program participation</li>
                <li>Sending important updates about our services</li>
                <li>Complying with legal obligations</li>
                <li>Protecting against fraud and ensuring platform security</li>
              </ul>
            </div>
          </section>

          {/* Prayer Request Privacy */}
          <section className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              4. Prayer Request Privacy
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-blue-100 font-semibold">
                Special Protection for Spiritual Communications:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Prayer requests are treated with the highest confidentiality</li>
                <li>Only authorized ministry team members access prayer requests</li>
                <li>We do not share prayer requests with third parties</li>
                <li>Personal spiritual information is protected under pastoral privilege</li>
                <li>You may request deletion of prayer requests at any time</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Information Sharing and Disclosure</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">We Do Not Sell Your Information</h3>
              <p>
                Supernatural Churches Limited does not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
              
              <h3 className="text-xl font-semibold text-white">Limited Sharing</h3>
              <p>We may share your information only in these circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To service providers who assist with our operations (under strict confidentiality agreements)</li>
                <li>When required by Australian law or legal process</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>In connection with a business merger or acquisition (with notice to users)</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Data Security</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure payment processing through trusted providers</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Staff training on privacy and data protection</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. Your Rights Under Australian Privacy Law</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>Under the Privacy Act 1988, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information we hold</li>
                <li>Correct inaccurate or outdated information</li>
                <li>Request deletion of your personal information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Make a complaint about how we handle your information</li>
                <li>Request information about how we handle your data</li>
              </ul>
              <p>
                To exercise these rights, contact us at privacy@supernatural.institute
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Data Retention</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We retain personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Maintain records for tax and accounting purposes</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>
              <p>
                Account information is typically retained for 7 years after account closure, in accordance with Australian business record-keeping requirements.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">9. Cookies and Tracking Technologies</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze website usage and performance</li>
                <li>Provide personalized content</li>
              </ul>
              <p>
                You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">10. Changes to This Policy</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. Significant changes will be notified through email or prominent notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">11. Contact Us</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>For privacy-related questions or concerns, contact us:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Supernatural Churches Limited</strong></p>
                <p>Privacy Officer</p>
                <p>Email: privacy@supernatural.institute</p>
                <p>Website: supernatural.institute</p>
              </div>
              <p className="mt-4">
                If you are not satisfied with our response to your privacy concern, you may contact the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
