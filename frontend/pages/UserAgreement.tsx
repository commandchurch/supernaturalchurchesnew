import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const UserAgreement: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="User Agreement – Supernatural Institute of Ministry"
        description="User agreement for platform participation and spiritual teaching acknowledgment at Supernatural Institute of Ministry."
        canonicalUrl={`${siteUrl}/legal/user-agreement`}
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
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">User Agreement</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Critical Acknowledgment */}
          <section className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              REQUIRED ACKNOWLEDGMENT
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-blue-100 font-semibold text-lg">
                By creating an account with Supernatural Institute of Ministry, you must acknowledge and agree to the following:
              </p>
              
              <div className="bg-white/10 border border-white/20 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" disabled checked className="mt-1" />
                    <p className="text-white font-medium">
                      <strong>"I acknowledge this is spiritual teaching. Everything taught and related to God's word, and everything I choose to believe, practice, or apply is my own personal choice and responsibility."</strong>
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input type="checkbox" disabled checked className="mt-1" />
                    <p className="text-white font-medium">
                      I understand that Supernatural Churches Limited presents biblical teachings from their theological perspective, and I am responsible for discerning what to accept or reject.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input type="checkbox" disabled checked className="mt-1" />
                    <p className="text-white font-medium">
                      I waive any legal claims against Supernatural Churches Limited for outcomes related to spiritual teachings, ministry, prayer, or supernatural experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Agreement Terms */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. Platform Participation Agreement</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                This User Agreement governs your participation in the <strong className="text-white">Supernatural Institute of Ministry</strong> platform operated by <strong className="text-white">Supernatural Churches Limited</strong>.
              </p>
              
              <h3 className="text-xl font-semibold text-white">Account Creation Requirements</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must be 18 years or older, or have parental consent</li>
                <li>You must be a resident of Australia (current service area)</li>
                <li>You must provide accurate and truthful information</li>
                <li>You must acknowledge our spiritual teaching disclaimer</li>
                <li>You agree to receive important communications about your account</li>
              </ul>
            </div>
          </section>

          {/* Spiritual Content Participation */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">2. Spiritual Content and Ministry Participation</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Educational Purpose</h3>
              <p>
                All content is provided for educational and spiritual growth purposes. By participating, you acknowledge:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Teachings are based on our interpretation of biblical principles</li>
                <li>Supernatural ministry training reflects our theological perspective</li>
                <li>Individual results may vary based on personal faith and circumstances</li>
                <li>You are responsible for evaluating and applying teachings</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Prayer and Ministry Services</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Prayer requests are submitted voluntarily</li>
                <li>Ministry is offered from compassion, not as medical treatment</li>
                <li>Healing outcomes are not guaranteed or warranted</li>
                <li>You waive claims related to prayer or ministry outcomes</li>
              </ul>
            </div>
          </section>

          {/* Content Usage Rights */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">3. Content Usage and Restrictions</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">What You Can Do</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access content for personal spiritual growth</li>
                <li>Participate in courses you've purchased</li>
                <li>Submit prayer requests for ministry support</li>
                <li>Engage with community features respectfully</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">What You Cannot Do</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Share, copy, or distribute proprietary content</li>
                <li>Record or screenshot course materials</li>
                <li>Teach our content without written permission</li>
                <li>Use our content for commercial purposes</li>
                <li>Modify or adapt our teachings</li>
                <li>Claim affiliation without authorization</li>
              </ul>
            </div>
          </section>

          {/* Authorized Teaching Requirements */}
          <section className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">4. Requirements for Authorized Teaching</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-orange-100 font-semibold">
                If you receive written permission to teach our material:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Content must be presented in its entirety without changes</li>
                <li>No additions, omissions, or modifications permitted</li>
                <li>Must contact us in writing before any presentation</li>
                <li>Provide audio/video recording of presentations to us</li>
                <li>Cease teaching if instructed to do so</li>
                <li>Cannot claim independent ownership of the material</li>
              </ul>
            </div>
          </section>

          {/* Community Standards */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Community Standards</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Expected Behavior</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Treat all community members with respect and kindness</li>
                <li>Maintain appropriate language and conduct</li>
                <li>Respect diverse perspectives within biblical boundaries</li>
                <li>Support and encourage fellow believers</li>
                <li>Report any inappropriate behavior to administrators</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Prohibited Behavior</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Harassment, bullying, or abusive language</li>
                <li>Promoting non-biblical teachings or practices</li>
                <li>Spam, commercial promotion, or solicitation</li>
                <li>Sharing personal information of other users</li>
                <li>Attempting to disrupt platform operations</li>
              </ul>
            </div>
          </section>

          {/* Account Termination */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Account Termination</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Your account may be suspended or terminated for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of this User Agreement</li>
                <li>Inappropriate community behavior</li>
                <li>Misuse of content or teaching materials</li>
                <li>Fraudulent activity or payment disputes</li>
                <li>Any conduct detrimental to our ministry</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. Questions or Concerns</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>If you have questions about this User Agreement:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Supernatural Churches Limited</strong></p>
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

export default UserAgreement;
