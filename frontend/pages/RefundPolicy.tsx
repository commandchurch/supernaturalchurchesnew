import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Refund Policy – Supernatural Institute of Ministry"
        description="Refund policy for memberships and services provided by Supernatural Churches Limited through Supernatural Institute of Ministry."
        canonicalUrl={`${siteUrl}/legal/refund-policy`}
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
            <h1 className="text-3xl sm:text-4xl font-black text-white heading-font">Refund Policy</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">1. Introduction</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                This Refund Policy governs the refund procedures for services provided by <strong className="text-white">Supernatural Churches Limited</strong> through Supernatural Institute of Ministry. All transactions are processed in Australian Dollars (AUD) and are subject to Australian Consumer Law.
              </p>
            </div>
          </section>

          {/* Membership Refunds */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">2. Membership Refunds</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Monthly Memberships</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Monthly memberships may be cancelled at any time</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No partial refunds are provided for unused portions of the month</li>
                <li>Access to premium content continues until the end of the paid period</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white">Annual Memberships</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Annual memberships may be refunded within 30 days of purchase</li>
                <li>Refund requests after 30 days will be considered on a case-by-case basis</li>
                <li>Pro-rata refunds may be provided for unused months at our discretion</li>
                <li>Substantial use of course content may affect refund eligibility</li>
              </ul>
            </div>
          </section>

          {/* 7-Day Free Trial */}
          <section className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-green-400" />
              3. 7-Day Free Trial Policy
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-green-100 font-semibold">
                Risk-Free Trial Period:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>New users can try our Bronze membership for 7 days free</li>
                <li>Cancel anytime during the trial period with no charges</li>
                <li>Automatic billing begins after the trial unless cancelled</li>
                <li>Only one free trial per user</li>
                <li>Credit card required to start trial for identity verification</li>
              </ul>
            </div>
          </section>

          {/* Donation Refunds */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">4. Donation Refunds</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">General Donations</h3>
              <p>
                Donations to Supernatural Churches Limited are voluntary gifts and are generally non-refundable. However, we understand that mistakes can occur:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Duplicate or accidental donations may be refunded within 48 hours</li>
                <li>Refund requests must be made in writing with explanation</li>
                <li>Donations made in error due to technical issues will be refunded</li>
                <li>Refunds for other reasons will be considered on a case-by-case basis</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white">Help Me Fund Contributions</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contributions to specific needs are generally non-refundable</li>
                <li>If a need is cancelled or closed, contributors will be notified</li>
                <li>Unused funds may be redirected to similar approved needs</li>
                <li>Refunds will be provided if misrepresentation is proven</li>
              </ul>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">5. Refund Request Process</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">How to Request a Refund</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact us at refunds@supernatural.institute</li>
                <li>Include your account email and order/transaction details</li>
                <li>Provide reason for refund request</li>
                <li>Allow 3-5 business days for initial response</li>
                <li>Approved refunds will be processed within 7-14 business days</li>
              </ol>
              
              <h3 className="text-xl font-semibold text-white">Required Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name and account email address</li>
                <li>Transaction ID or order number</li>
                <li>Date of purchase/donation</li>
                <li>Amount paid</li>
                <li>Detailed reason for refund request</li>
              </ul>
            </div>
          </section>

          {/* Payment Method Returns */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">6. Payment Method Returns</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Refunds will be processed to the original payment method used for the transaction:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Credit/Debit Cards: 3-10 business days (depending on bank)</li>
                <li>PayPal: 1-3 business days</li>
                <li>Bank Transfer: 2-5 business days</li>
                <li>Other payment methods: As per provider's standard timeframe</li>
              </ul>
              <p>
                Processing times may vary based on your financial institution's policies.
              </p>
            </div>
          </section>

          {/* Exceptions and Limitations */}
          <section className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">7. Exceptions and Limitations</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white">Non-Refundable Items</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Digital downloads after completion</li>
                <li>Completed courses or certifications</li>
                <li>Personal coaching or ministry sessions</li>
                <li>Event tickets (unless event is cancelled)</li>
                <li>Affiliate commissions earned</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white">Circumstances Affecting Refunds</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of Terms of Service may void refund eligibility</li>
                <li>Fraudulent activity will result in account suspension</li>
                <li>Excessive refund requests may be flagged for review</li>
                <li>Chargeback disputes must go through official channels</li>
              </ul>
            </div>
          </section>

          {/* Australian Consumer Law */}
          <section>
            <h2 className="text-2xl font-black text-white mb-4 heading-font">8. Australian Consumer Law Rights</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                This refund policy does not limit your rights under Australian Consumer Law. You have guaranteed consumer rights for services that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fail to meet consumer guarantees</li>
                <li>Are not fit for purpose</li>
                <li>Are not delivered with acceptable quality</li>
                <li>Do not match their description</li>
              </ul>
              <p>
                For more information about your consumer rights, visit www.accc.gov.au
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-black text-white mb-4 heading-font">9. Contact Us</h2>
            <div className="text-gray-300 leading-relaxed">
              <p>For refund requests or questions about this policy:</p>
              <div className="mt-4 space-y-2">
                <p><strong className="text-white">Supernatural Churches Limited</strong></p>
                <p>Refund Department</p>
                <p>Email: refunds@supernatural.institute</p>
                <p>Website: supernatural.institute</p>
                <p>Response Time: 3-5 business days</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
