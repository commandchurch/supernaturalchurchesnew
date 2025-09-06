// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { Check, Heart, Gift, Calendar } from 'lucide-react';

import SEO from '../components/SEO';
import { siteUrl } from '../config/index';
import { Link, useNavigate } from 'react-router-dom';
import client from '../client';

export default function Give() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock membership data
  const membership = null;

  // Mock membership plans and funding needs - UPDATED WITH CORRECT PRICING
  const plansData = {
    plans: [
      { id: 'bronze', name: 'Bronze Membership', price: 20, description: 'Basic membership' },
      { id: 'silver', name: 'Silver Membership', price: 35, description: 'Standard membership' },
      { id: 'gold', name: 'Gold Membership', price: 150, description: 'Premium membership' },
      { id: 'diamond', name: 'Diamond Membership', price: 500, description: 'Elite membership' }
    ]
  };

  const needsData = {
    needs: [
      { id: '1', title: 'Church Building Fund', description: 'Help build a new sanctuary', amount: 50000, raised: 25000 },
      { id: '2', title: 'Mission Trip Support', description: 'Support our mission work', amount: 10000, raised: 7500 },
      { id: '3', title: 'Food Ministry', description: 'Feed the hungry in our community', amount: 20000, raised: 12000 }
    ]
  };

  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');

  const handleDonation = async () => {
    setIsProcessing(true);
    try {
      await client.fund.createDonation({
        amount: donationAmount as number,
        name: donorName || undefined,
        email: donorEmail || undefined,
        message: donorMessage || undefined,
      });
      // Use console.log instead of alert for now
      console.log('Thank you for your gift! Your donation has been recorded.');
      setDonationAmount('');
      setDonorName('');
      setDonorEmail('');
      setDonorMessage('');
    } catch (err: any) {
      console.error(`Could not process donation: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };



  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Give", item: `${siteUrl}/give` }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="Give - Support Supernatural Ministry & Kingdom Advancement"
        description="Partner with us in advancing God's Kingdom through supernatural ministry. Your giving supports global outreach, training, and supernatural church planting worldwide."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 heading-font">
          Partner With Us
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
          Join us in advancing God's Kingdom through supernatural ministry training, global outreach, and church planting. Your partnership enables us to equip believers worldwide with signs, wonders, and miracles.
        </p>
      </div>

      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="flex bg-black border border-gray-700 p-1">
          <button
            className="px-6 py-3 font-semibold uppercase tracking-wide text-sm bg-white text-black"
          >
            One-Time Gift
          </button>
          <button
            onClick={() => navigate('/partner')}
            className="px-6 py-3 font-semibold uppercase tracking-wide text-sm text-gray-400 hover:text-white"
          >
            Church partner
          </button>
        </div>
      </div>

      {/* One-Time Donation Form */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 rounded-xl">
          <div className="text-center mb-6">
            <Gift className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 heading-font">Make a One-Time Gift</h2>
            <p className="text-gray-400">Your generous donation helps us advance God's Kingdom through supernatural ministry worldwide.</p>
          </div>

          <div className="space-y-4">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Donation Amount (AUD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 pl-8 pr-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 px-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 px-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={donorMessage}
                onChange={(e) => setDonorMessage(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 px-3 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-24 resize-none"
                placeholder="Share why you're giving or any prayer requests..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleDonation}
                disabled={isProcessing || !donationAmount}
                className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:bg-gray-600 disabled:hover:bg-gray-700 text-white py-4 px-6 font-bold uppercase tracking-wide text-sm shadow-lg hover:shadow-orange-500/25 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : `Give $${donationAmount || '0'} AUD`}
              </button>
            </div>

            {/* Tax Deduction Notice */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 leading-relaxed">
                Tax-deductible status is not yet available. We believe that if you give only to claim a tax deduction, the return is usually one for one or even less from the Australian Tax Office. When you give cheerfully from your heart, you can expect a 30, 60 or 100-fold return from God. We are currently working on arranging tax-deductible status.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 text-center">
          <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 heading-font">Every Gift Makes a Difference</h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your partnership enables us to train ministers worldwide, plant supernatural churches, and demonstrate God's power through signs, wonders, and miracles. Together, we're advancing His Kingdom on earth as it is in heaven.
          </p>
          <div className="mt-6">
            <p className="text-white font-semibold">Questions about giving?</p>
            <p className="text-gray-400">Contact us at <a href="mailto:giving@supernaturalchurches.org" className="text-white hover:underline">giving@supernaturalchurches.org</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
