import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function PartnershipThankYou() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Application Submitted - Supernatural Churches Limited"
        description="Thank you for your partnership application. Our team will review your application within 24-48 hours."
      />

      {/* Header */}
      <section className="bg-black py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 heading-font">
              Thank You for Applying!
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
              Your partnership application has been successfully submitted. Our team will review your application within 24–48 hours.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-800/50 border border-gray-700 p-6 lg:p-8 mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 heading-font">
              What Happens Next?
            </h2>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-white">Application Review</h3>
                  <p className="text-gray-300 text-sm">Our team reviews your application for doctrinal alignment and ministry compatibility.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-white">Approval & Next Steps</h3>
                  <p className="text-gray-300 text-sm">If approved, you'll receive an email with the $99 activation payment link and onboarding instructions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-white">Leadership Training</h3>
                  <p className="text-gray-300 text-sm">Complete our comprehensive leadership course and receive official ordination.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-0.5">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-white">Full Partnership Activation</h3>
                  <p className="text-gray-300 text-sm">Access all partnership benefits, training resources, and apostolic oversight.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800/30 border border-gray-700 p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Questions?</h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about your application or the partnership process, please don't hesitate to send us a message.
            </p>
            <div className="flex justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold uppercase tracking-wide transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 font-semibold uppercase tracking-wide transition-colors"
            >
              Return Home
            </Link>
            <Link
              to="/find-church"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold uppercase tracking-wide transition-colors"
            >
              Find Churches <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
