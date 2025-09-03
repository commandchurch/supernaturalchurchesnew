import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Terms of Service – Supernatural Institute of Ministry"
        description="Terms and conditions for using Supernatural Institute of Ministry platform and services provided by Supernatural Churches Limited."
        canonicalUrl={`${siteUrl}/legal/terms-of-service`}
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
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">Terms of Service</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. Introduction</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Welcome to Supernatural Institute of Ministry, operated by <strong className="text-white">Supernatural Churches Limited</strong> (ABN: [ABN Number]). These Terms of Service ("Terms") govern your use of our platform, courses, and services available through our website and applications.
              </p>
              <p>
                By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these terms, you may not access our services.
              </p>
            </div>
          </section>

          {/* Spiritual Teaching Acknowledgment */}
          <section className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              2. Spiritual Teaching Acknowledgment
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-blue-100 font-semibold">
                IMPORTANT: By registering for an account and accessing our services, you acknowledge and agree:
              </p>
              <div className="bg-white/5 border border-white/10 p-4 rounded">
                <p className="text-white font-medium">
                  "I acknowledge this is spiritual teaching. Everything taught and related to God's word, and everything I choose to believe, practice, or apply is my own personal choice. I take full responsibility for my spiritual journey and any decisions I make based on the teachings provided."
                </p>
              </div>
              <p>
                All content provided by Supernatural Institute of Ministry is for educational and spiritual growth purposes. We present biblical teachings and supernatural ministry principles, but each participant must discern and choose what to accept and apply in their personal faith journey.
              </p>
            </div>
          </section>

          {/* Use of Services */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">3. Use of Services</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Eligibility</h3>
              <p>
                Our services are currently available to residents of Australia only. You must be at least 18 years old or have parental consent to use our services.
              </p>
              
              <h3 className="text-xl font-semibold text-white">Account Requirements</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must create an account to access premium content and services</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must provide accurate and complete information during registration</li>
                <li>You agree to notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
          </section>

          {/* Content and Intellectual Property */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">4. Content and Intellectual Property</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Our Content</h3>
              <p>
                All content, including but not limited to courses, videos, audio recordings, written materials, and supernatural ministry teachings, is owned by Supernatural Churches Limited and protected by Australian and international copyright laws.
              </p>
              
              <h3 className="text-xl font-semibold text-white">Usage Restrictions</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Content is for personal use only and may not be redistributed or resold</li>
                <li>Recording, copying, or sharing of course materials is strictly prohibited</li>
                <li>Any teaching of our material to others requires written permission from Supernatural Churches Limited</li>
                <li>If authorized to teach our content, it must be presented in its entirety without modification</li>
              </ul>
            </div>
          </section>

          {/* Ministry and Healing Disclaimer */}
          <section className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Ministry and Healing Disclaimer</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-orange-100 font-semibold">
                IMPORTANT MEDICAL DISCLAIMER:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our teachings on divine healing are spiritual in nature and not medical advice</li>
                <li>We are not licensed medical professionals</li>
                <li>Our ministry services are offered from a position of compassion and mercy</li>
                <li>Healing ministry is not a substitute for professional medical treatment</li>
                <li>You should always consult qualified medical professionals for health concerns</li>
                <li>By receiving prayer or ministry, you acknowledge this is spiritual ministry, not medical treatment</li>
              </ul>
            </div>
          </section>

          {/* Payment and Memberships */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Payment and Memberships</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                All prices are in Australian Dollars (AUD). Payment is required for premium memberships and services. Membership benefits are outlined in your chosen plan and may be updated from time to time.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Monthly memberships renew automatically unless cancelled</li>
                <li>Annual memberships provide a 10% discount</li>
                <li>Refunds are governed by our Refund Policy</li>
                <li>Supernatural Churches Limited reserves the right to modify pricing with 30 days notice</li>
              </ul>
            </div>
          </section>

          {/* Activity Recommendations */}
          <section className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. Activity Recommendations</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-green-100 font-semibold">
                OPTIONAL MINISTRY ENCOURAGEMENT:
              </p>
              <div className="bg-white/5 border border-white/10 p-4 rounded">
                <p className="text-white font-medium">
                  We encourage members to actively participate in gospel outreach by sharing their experience with others. This is completely optional and recommended for the best experience.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sharing is encouraged but never required for any membership level</li>
                <li>No account suspensions or limitations for not sharing</li>
                <li>Optional activities enhance the Kingdom advancement experience</li>
                <li>Free tier members may optionally upgrade to Bronze at any time</li>
                <li>All membership benefits remain available regardless of sharing activity</li>
                <li>Community focus is maintained through voluntary participation</li>
              </ul>
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded mt-4">
                <p className="text-blue-200 font-medium">
                  <strong>Australian Consumer Law Compliance:</strong> No mandatory recruitment or activity requirements exist. All participation is voluntary.
                </p>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Prohibited Activities</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Share, distribute, or resell our proprietary content</li>
                <li>Use our services for any commercial purpose without written permission</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Use our name or trademarks without permission</li>
                <li>Teach or present our material without proper authorization</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                To the fullest extent permitted by Australian law, Supernatural Churches Limited and its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
              </p>
              <p>
                By participating in our spiritual teachings and ministry, you waive any legal recourse against Supernatural Churches Limited for matters related to spiritual ministry, prayer, or supernatural encounters.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">10. Termination</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We reserve the right to terminate or suspend your account immediately, without prior notice, if you violate these Terms or engage in activities that compromise the integrity of our ministry or platform.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">11. Governing Law</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                These Terms are governed by the laws of Australia. Any disputes will be resolved in the appropriate courts of Australia.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">12. Contact Us</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>If you have questions about these Terms of Service, please contact us:</p>
              <p className="mt-4">
                <strong className="text-white">Supernatural Churches Limited</strong><br />
                Email: legal@supernatural.institute<br />
                Website: supernatural.institute
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
