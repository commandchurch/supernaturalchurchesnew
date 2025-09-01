import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MessageCircle, Settings } from 'lucide-react';
import Overview from '../components/dashboard/Overview';
import HelpMeFund from '../components/dashboard/HelpMeFund';
import SoulOutreach from '../components/dashboard/SoulOutreach';
import PrayerRequests from '../components/dashboard/PrayerRequests';
import BillingSettings from '../components/dashboard/BillingSettings';
import Support from '../components/dashboard/Support';
import TestimonySubmission from '../components/dashboard/TestimonySubmission';
import PartnershipApplication from '../components/dashboard/PartnershipApplication';
import AffiliateRewards from '../components/dashboard/AffiliateRewards';
import Messages from '../components/dashboard/Messages';
import EnhancedMessages from '../components/EnhancedMessages';

type TabKey = 'overview' | 'fund' | 'outreach' | 'prayer' | 'testimony' | 'billing' | 'support' | 'affiliate-rewards' | 'messages' | 'partnership';

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = (searchParams.get('tab') as TabKey) || 'overview';
  const [notifications] = useState(3); // Mock notification count

  const setTab = (newTab: TabKey) => {
    setSearchParams({ tab: newTab });
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'fund', label: 'Help Me Fund' },
    { key: 'outreach', label: 'Outreach' },
    { key: 'affiliate-rewards', label: 'AFFILIATE REWARDS' },
    { key: 'prayer', label: 'Prayer Request' },
    { key: 'testimony', label: 'Testimony' },
    { key: 'partnership', label: 'Partnership' },
    { key: 'billing', label: 'Billing' },
    { key: 'support', label: 'Support' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 heading-font">
            Your Dashboard
          </h1>
          <p className="text-lg text-gray-400">
            Manage your account, track progress, and access exclusive content.
          </p>
        </div>
        
        {/* Messages */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab('messages')}
            className="relative p-3 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="w-full mb-8">
        <div className="flex flex-wrap justify-center gap-1 bg-gray-800 p-1 rounded-lg">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`${tab === t.key ? 'bg-white text-black' : 'text-white'} px-2 sm:px-4 py-2 sm:h-10 font-semibold uppercase tracking-wide text-xs sm:text-sm rounded transition-all duration-200 hover:bg-gray-600 min-w-0 flex-shrink whitespace-nowrap`}
            >
              {t.label === 'AFFILIATE REWARDS' ? (
                <>
                  <span className="hidden sm:inline">AFFILIATE REWARDS</span>
                  <span className="sm:hidden">REWARDS</span>
                </>
              ) : t.label === 'Prayer Request' ? (
                <>
                  <span className="hidden sm:inline">Prayer Request</span>
                  <span className="sm:hidden">Prayer</span>
                </>
              ) : t.label === 'Help Me Fund' ? (
                <>
                  <span className="hidden sm:inline">Help Me Fund</span>
                  <span className="sm:hidden">Fund</span>
                </>
              ) : (
                t.label
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        {tab === 'overview' && <Overview />}
        {tab === 'fund' && <HelpMeFund />}
        {tab === 'outreach' && <SoulOutreach />}
        {tab === 'affiliate-rewards' && <AffiliateRewards />}
        {tab === 'prayer' && <PrayerRequests />}
        {tab === 'testimony' && <TestimonySubmission />}
        {tab === 'partnership' && <PartnershipApplication />}
        {tab === 'billing' && <BillingSettings />}
        {tab === 'support' && <Support />}
        {tab === 'messages' && <div className="bg-gray-900 text-white min-h-[400px] p-6">
          <div className="max-w-4xl mx-auto">
            {/* Simple header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-7 h-7 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Messages</h1>
                  <p className="text-gray-400 text-sm">Stay updated with your notifications</p>
                </div>
              </div>
              
              {/* Simple toggle */}
              <div className="flex items-center gap-2">
                <button 
                  className="px-4 py-2 bg-gray-800 text-white border border-gray-600 text-sm font-medium hover:bg-gray-700 transition-colors"
                  onClick={() => {/* Toggle between active/actioned */}}
                >
                  View Actioned
                </button>
              </div>
            </div>

            {/* Simple message list */}
            <div className="space-y-4">
              {/* New Message */}
              <div className="bg-gray-800 border border-gray-700 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 uppercase tracking-wide">
                        NEW
                      </span>
                      <h3 className="text-white font-semibold">Welcome to Supernatural Institute</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      Welcome to our community! Your account has been successfully created. You can now access all training materials and community features.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">Today at 2:30 PM</span>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
                          MARK ACTIONED
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                          REPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Another New Message */}
              <div className="bg-gray-800 border border-gray-700 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 uppercase tracking-wide">
                        NEW
                      </span>
                      <h3 className="text-white font-semibold">Payment Confirmation - Gold Membership</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      Your payment for Gold membership has been successfully processed. Thank you for upgrading! You now have access to all premium features.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">2 hours ago</span>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
                          MARK ACTIONED
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                          REPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example of Actioned Message */}
              <div className="bg-gray-800/50 border border-gray-600/50 p-5 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 uppercase tracking-wide">
                        ACTIONED
                      </span>
                      <h3 className="text-gray-300 font-semibold">Course Completion Certificate Available</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                      Congratulations! Your certificate for "Supernatural Ministry Foundations" is now ready for download.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">Yesterday at 4:15 PM • Actioned</span>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-gray-600 text-gray-300 text-sm font-semibold cursor-not-allowed" disabled>
                          ACTIONED
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple empty state when no messages */}
            <div className="text-center py-12 hidden">
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-gray-400 text-lg font-semibold mb-2">No messages yet</h3>
              <p className="text-gray-500 text-sm">When you receive notifications, they'll appear here</p>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}
