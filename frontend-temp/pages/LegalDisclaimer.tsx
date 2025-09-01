import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const LegalDisclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Legal Disclaimer – Supernatural Institute of Ministry"
        description="Legal disclaimers and important notices for Supernatural Institute of Ministry operated by Supernatural Churches Limited."
        canonicalUrl={`${siteUrl}/legal/disclaimer`}
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
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">Legal Disclaimer</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Important Notice */}
          <section className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              IMPORTANT LEGAL NOTICE
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-yellow-100 font-semibold">
                Please read this disclaimer carefully before using any services provided by Supernatural Churches Limited through Supernatural Institute of Ministry.
              </p>
            </div>
          </section>

          {/* Spiritual Teaching Disclaimer */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. Spiritual Teaching and Religious Content</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Supernatural Churches Limited</strong> provides spiritual and religious education through Supernatural Institute of Ministry. All content is presented for educational and spiritual growth purposes only.
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded">
                <h3 className="text-white font-semibold mb-2">Personal Responsibility Acknowledgment:</h3>
                <p>
                  By accessing our content, you acknowledge that all spiritual teachings, biblical interpretations, and supernatural ministry practices are presented for your consideration. Your personal faith decisions, beliefs, and spiritual practices are entirely your own responsibility.
                </p>
              </div>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We present biblical teachings from our theological perspective</li>
                <li>Participants must discern and choose what to accept or reject</li>
                <li>We are not responsible for personal faith decisions or their outcomes</li>
                <li>Supernatural experiences and healing testimonies reflect individual experiences</li>
                <li>Results may vary based on personal faith and circumstances</li>
              </ul>
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">2. Medical and Health Disclaimer</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-red-100 font-semibold">
                CRITICAL MEDICAL DISCLAIMER:
              </p>
              
              <h3 className="text-xl font-semibold text-white">Not Medical Advice</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our teachings on divine healing are spiritual, not medical advice</li>
                <li>We are not licensed medical, psychological, or healthcare professionals</li>
                <li>Prayer ministry is not a substitute for professional medical treatment</li>
                <li>Always consult qualified healthcare providers for medical concerns</li>
                <li>Do not delay or discontinue medical treatment based on our teachings</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Ministry Services</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Prayer and ministry services are offered from compassion and mercy</li>
                <li>Ministry is provided without charge or remuneration</li>
                <li>Healing ministry results are not guaranteed or warranted</li>
                <li>Testimonies represent individual experiences, not universal promises</li>
                <li>We do not diagnose, treat, cure, or prevent any disease</li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded mt-4">
                <p className="text-white font-medium">
                  By receiving prayer or ministry, you acknowledge this is spiritual ministry and waive any claims against Supernatural Churches Limited for medical outcomes.
                </p>
              </div>
            </div>
          </section>

          {/* Educational Content Disclaimer */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">3. Educational Content and Results</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Training and Certification</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Course completion does not guarantee specific ministry results</li>
                <li>Supernatural ministry effectiveness depends on individual faith and calling</li>
                <li>Certification represents course completion, not guaranteed abilities</li>
                <li>Success in ministry depends on multiple factors beyond our training</li>
                <li>We are not responsible for outcomes of your ministry activities</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Historical and Testimonial Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Historical accounts are presented for educational purposes</li>
                <li>Testimonies reflect individual experiences and may not be typical</li>
                <li>Past results do not predict future outcomes</li>
                <li>Supernatural experiences cannot be scientifically verified</li>
                <li>Participants must evaluate and decide what to believe</li>
              </ul>
            </div>
          </section>

          {/* Professional Advice Disclaimer */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">4. Professional Advice Disclaimer</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Supernatural Churches Limited does not provide:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Legal advice or counsel</li>
                <li>Financial or investment advice</li>
                <li>Professional counseling or therapy</li>
                <li>Medical or psychological diagnosis</li>
                <li>Tax or accounting guidance</li>
                <li>Business or career advice</li>
              </ul>
              <p>
                Always consult appropriate licensed professionals for specific advice in these areas.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">No Guarantees</h3>
              <p>
                Supernatural Churches Limited makes no warranties or guarantees regarding:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Spiritual experiences or supernatural encounters</li>
                <li>Healing outcomes or ministry results</li>
                <li>Course effectiveness or life transformation</li>
                <li>Income or success from affiliate programs</li>
                <li>Accuracy of all historical or theological content</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Waiver of Claims</h3>
              <p>
                By using our services, you waive and release Supernatural Churches Limited from any claims related to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Spiritual ministry outcomes</li>
                <li>Prayer results or healing ministry</li>
                <li>Decisions made based on our teachings</li>
                <li>Supernatural experiences during courses or ministry</li>
                <li>Application of biblical principles to personal circumstances</li>
              </ul>
            </div>
          </section>

          {/* Content Usage Restrictions */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Content Usage and Copyright</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Authorized Use Only</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All content remains property of Supernatural Churches Limited</li>
                <li>Personal use only - commercial use requires written permission</li>
                <li>No reproduction, distribution, or modification without authorization</li>
                <li>Teaching our material requires explicit written consent</li>
                <li>Any authorized teaching must present content in its entirety</li>
                <li>Unauthorized use may result in legal action</li>
              </ul>
            </div>
          </section>

          {/* Changes and Updates */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. Changes to Disclaimer</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Supernatural Churches Limited reserves the right to update this disclaimer at any time. Continued use of our services constitutes acceptance of any changes. We encourage regular review of this disclaimer.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Governing Law</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                This disclaimer is governed by Australian law. Any disputes will be resolved in Australian courts. If any provision is found unenforceable, the remainder remains in full effect.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">9. Contact Information</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>Questions about this disclaimer should be directed to:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Supernatural Churches Limited</strong></p>
                <p>Legal Department</p>
                <p>Email: legal@supernatural.institute</p>
                <p>Website: supernatural.institute</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalDisclaimer;
