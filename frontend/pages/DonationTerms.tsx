import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const DonationTerms: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Donation Terms – Supernatural Institute of Ministry"
        description="Terms and conditions for donations and financial gifts to Supernatural Churches Limited through Supernatural Institute of Ministry."
        canonicalUrl={`${siteUrl}/legal/donation-terms`}
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
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">Donation Terms</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. Introduction</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Thank you for your heart to support the ministry of <strong className="text-white">Supernatural Churches Limited</strong> through Supernatural Institute of Ministry. These donation terms govern all financial gifts, donations, and contributions made to our ministry.
              </p>
              <p>
                All donations are processed in Australian Dollars (AUD) and are subject to Australian tax laws and regulations.
              </p>
            </div>
          </section>

          {/* Heart-Led Giving Philosophy */}
          <section className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <Heart className="w-6 h-6 text-green-400" />
              2. Our Heart-Led Giving Philosophy
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-green-100 font-semibold text-lg">
                "God loves a cheerful giver" - 2 Corinthians 9:7
              </p>
              
              <div className="bg-white/10 border border-white/20 p-6 rounded-lg">
                <h3 className="text-white font-semibold mb-3">Our Giving Principles:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Heart-Led Giving:</strong> We believe in giving from the heart, motivated by love for God and His Kingdom</li>
                  <li><strong>No Tax Deductions:</strong> We don't believe in claiming tax deductions for donations. When you claim a 1-for-1 gift back, you may not receive your 30, 60, or 100-fold return</li>
                  <li><strong>Genuine Generosity:</strong> Give from your heart or don't give at all. God looks at the heart's motive, not the amount</li>
                  <li><strong>Kingdom Investment:</strong> Your gifts support supernatural ministry training and global soul-winning efforts</li>
                  <li><strong>Faithful Stewardship:</strong> We commit to using every donation wisely for advancing God's Kingdom</li>
                </ul>
              </div>
              
              <p className="text-white font-medium">
                We want you to be blessed in your giving. When you give with the right heart, expecting God's supernatural return rather than tax benefits, you position yourself for Kingdom abundance.
              </p>
            </div>
          </section>

          {/* Types of Donations */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">3. Types of Donations</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  General Ministry Support
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>One-time gifts to support overall ministry operations</li>
                  <li>Monthly partnership donations for ongoing support</li>
                  <li>Special project funding for ministry expansion</li>
                  <li>Technology and platform development support</li>
                </ul>
                <p className="mt-3 text-blue-100 font-medium">
                  These donations directly support supernatural ministry training and global outreach efforts.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Help Me Fund Contributions</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Support for specific approved emergency needs</li>
                  <li>Assistance for ministry students facing financial hardship</li>
                  <li>Crisis support for ministry families</li>
                  <li>Urgent ministry-related expenses</li>
                </ul>
                <p className="mt-3 text-orange-100 font-medium">
                  All Help Me Fund needs are reviewed and approved by our ministry team before being made available for support.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Ministry Partnership</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Regular monthly giving partnerships</li>
                  <li>Annual giving commitments</li>
                  <li>Church partnership support</li>
                  <li>Missionary and ministry worker support</li>
                </ul>
                <p className="mt-3 text-purple-100 font-medium">
                  Partners receive priority ministry support and special recognition for their Kingdom investment.
                </p>
              </div>
            </div>
          </section>

          {/* Donation Processing */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">4. Donation Processing</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
              <p>We accept donations through:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Credit and debit cards (Visa, Mastercard, AMEX)</li>
                <li>PayPal payments</li>
                <li>Bank transfers (for larger donations)</li>
                <li>BPAY (Australian bank accounts)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Processing and Fees</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All donations are processed securely through trusted payment providers</li>
                <li>Small processing fees may apply (typically 1.5-3%)</li>
                <li>These fees are absorbed by the ministry when possible</li>
                <li>100% of your intended donation goes to ministry purposes</li>
                <li>Monthly recurring donations are processed automatically</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Currency</h3>
              <p>
                All donations are processed in Australian Dollars (AUD). International donors will see conversion rates applied by their payment provider.
              </p>
            </div>
          </section>

          {/* Tax Implications */}
          <section className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Tax Deductions and Our Position</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Our Ministry Stance</h3>
              <p className="text-yellow-100 font-semibold">
                Supernatural Churches Limited believes in Kingdom giving that expects supernatural returns, not tax benefits.
              </p>
              
              <div className="bg-white/10 border border-white/20 p-4 rounded">
                <h4 className="text-white font-medium mb-2">Why We Don't Emphasize Tax Deductions:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Biblical giving expects supernatural returns (30, 60, 100-fold)</li>
                  <li>Tax deductions create a "1-for-1" expectation that may limit God's ability to bless</li>
                  <li>Heart motivation is more important than tax benefits</li>
                  <li>We want cheerful givers, not tax-motivated givers</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white">Legal Requirements</h3>
              <p>
                While Supernatural Churches Limited may be eligible for DGR (Deductible Gift Recipient) status in the future, we currently:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Issue donation receipts for record-keeping purposes</li>
                <li>Maintain proper financial documentation</li>
                <li>Comply with all Australian tax reporting requirements</li>
                <li>Advise donors to consult their tax advisors regarding deductibility</li>
              </ul>
            </div>
          </section>

          {/* Donor Rights and Responsibilities */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Donor Rights and Responsibilities</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Your Rights as a Donor</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Receive timely acknowledgment of your donations</li>
                <li>Know how your donations are being used</li>
                <li>Request information about ministry financial stewardship</li>
                <li>Modify or cancel recurring donations at any time</li>
                <li>Receive prompt response to donation-related inquiries</li>
                <li>Privacy protection for all donation information</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Donor Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ensure donations are made with a cheerful heart</li>
                <li>Verify payment information accuracy</li>
                <li>Notify us of any payment disputes immediately</li>
                <li>Understand that donations are generally non-refundable</li>
                <li>Consult tax advisors for personal tax implications</li>
              </ul>
            </div>
          </section>

          {/* Use of Donations */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. How Donations Are Used</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Your generous donations support:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Ministry Operations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Supernatural ministry training development</li>
                    <li>Course creation and content production</li>
                    <li>Platform technology and maintenance</li>
                    <li>Ministry team salaries and support</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Global Outreach</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Evangelism and soul-winning efforts</li>
                    <li>Church planting and support</li>
                    <li>Missionary training and deployment</li>
                    <li>International ministry partnerships</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Student Support</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Help Me Fund emergency assistance</li>
                    <li>Scholarship and financial aid</li>
                    <li>Ministry mentorship programs</li>
                    <li>Prayer and pastoral care services</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Ministry Expansion</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>New course development</li>
                    <li>Technology improvements</li>
                    <li>Additional ministry resources</li>
                    <li>Global platform expansion</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Donation Policies */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Donation Policies</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Non-Refundable Nature</h3>
              <p>
                Donations are generally non-refundable as they are gifts freely given to support ministry work. However, we will consider refunds for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Duplicate or accidental donations (within 48 hours)</li>
                <li>Technical errors in processing</li>
                <li>Fraudulent activity or unauthorized charges</li>
                <li>Exceptional circumstances at ministry discretion</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Recurring Donations</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Can be modified or cancelled at any time through your account</li>
                <li>Changes take effect on the next billing cycle</li>
                <li>No penalties for cancellation</li>
                <li>Reactivation available anytime</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">Large Donations</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Donations over $10,000 AUD require ministry consultation</li>
                <li>Additional verification may be required</li>
                <li>Special stewardship arrangements may be discussed</li>
                <li>Public recognition available if desired</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">9. Donation Support</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>For donation questions, receipt requests, or financial support:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Supernatural Churches Limited</strong></p>
                <p>Finance Department</p>
                <p>Email: donations@supernatural.institute</p>
                <p>Phone: [Phone Number]</p>
                <p>Response Time: Within 24 hours</p>
              </div>
              <p className="mt-4 text-sm">
                Thank you for your generous heart to support supernatural ministry training and global soul-winning efforts. Your Kingdom investment makes eternal impact possible.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DonationTerms;
