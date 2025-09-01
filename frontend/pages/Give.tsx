import React, { useMemo, useState } from 'react';
import { Check, Heart, Gift, Calendar } from 'lucide-react';
import { useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../_generated/api';
import SEO from '../components/SEO';
import { siteUrl } from '../config';
import { Link, useNavigate } from 'react-router-dom';

export default function Give() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock membership data
  const membership = null;

  // Get membership plans and funding needs from Convex
  const plansData = useQuery(api.membership.listPlans);
  const needsData = useQuery(api.fund.listNeeds);

  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');

  const handleDonation = async () => {
    setIsProcessing(true);
    try {
      // Mock donation processing
      await Promise.resolve({ success: true });
      alert('Thank you for your gift! Your donation has been recorded.');
      setDonationAmount('');
      setDonorName('');
      setDonorEmail('');
      setDonorMessage('');
    } catch (err: any) {
      alert(`Could not process donation: ${err?.message || 'Unknown error'}`);
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
            onClick={() => navigate('/membership')}
            className="px-6 py-3 font-semibold uppercase tracking-wide text-sm text-gray-400 hover:text-white"
          >
            Monthly Partner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Gift className="h-6 w-6 text-white mr-3" />
              <h2 className="text-2xl font-bold text-white heading-font">Make a Donation</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[25, 50, 100, 250].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount)}
                    className={`p-3 border text-center font-semibold transition-colors ${
                      donationAmount === amount
                        ? 'bg-white text-black border-white'
                        : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Custom Amount (AUD)</label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full bg-black border border-gray-600 text-white px-4 py-3 focus:border-white focus:outline-none"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-black border border-gray-600 text-white px-4 py-3 focus:border-white focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full bg-black border border-gray-600 text-white px-4 py-3 focus:border-white focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Message (Optional)</label>
                <textarea
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-black border border-gray-600 text-white px-4 py-3 focus:border-white focus:outline-none resize-none"
                  placeholder="Share your heart with us..."
                />
              </div>

              <button
                onClick={handleDonation}
                disabled={!donationAmount || isProcessing}
                className="w-full bg-white text-black hover:bg-gray-100 disabled:bg-gray-800 disabled:text-gray-400 font-semibold uppercase tracking-wide px-6 py-4 transition-colors"
              >
                {isProcessing ? 'Processing...' : `Give $${donationAmount || 0} AUD`}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6">
              <h3 className="text-xl font-bold text-white mb-4 heading-font">Impact of Your Gift</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">$25 - Discipleship Materials</p>
                    <p className="text-sm">Provides training materials for one new believer</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">$50 - Ministry Training</p>
                    <p className="text-sm">Sponsors one person through healing ministry training</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">$100 - Outreach Event</p>
                    <p className="text-sm">Funds one supernatural evangelism outreach</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">$250 - Church Plant Support</p>
                    <p className="text-sm">Helps establish one new supernatural church</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6">
              <h3 className="text-xl font-bold text-white mb-4 heading-font">Current Needs</h3>
              <div className="space-y-4">
                {needsData?.needs?.slice(0, 3).map((need: any, index: number) => (
                  <div key={index} className="border-l-4 border-white pl-4">
                    <h4 className="font-semibold text-white">{need.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{need.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-semibold">${need.currentAmount || 0} raised</span>
                      <span className="text-gray-400 text-sm">Goal: ${need.targetAmount}</span>
                    </div>
                  </div>
                )) || [
                  <div key="1" className="border-l-4 border-white pl-4">
                    <h4 className="font-semibold text-white">Global Outreach Fund</h4>
                    <p className="text-gray-400 text-sm mb-2">Supporting evangelism efforts worldwide</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-semibold">$15,750 raised</span>
                      <span className="text-gray-400 text-sm">Goal: $25,000</span>
                    </div>
                  </div>,
                  <div key="2" className="border-l-4 border-white pl-4">
                    <h4 className="font-semibold text-white">Ministry Training Center</h4>
                    <p className="text-gray-400 text-sm mb-2">Equipment for supernatural ministry training</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-semibold">$8,200 raised</span>
                      <span className="text-gray-400 text-sm">Goal: $12,000</span>
                    </div>
                  </div>
                ]}
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
            <p className="text-gray-400">Contact us at <a href="mailto:giving@supernatural.institute" className="text-white hover:underline">giving@supernatural.institute</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}