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
import CommissionCalculator from '../components/dashboard/CommissionCalculator';
import Messages from '../components/dashboard/Messages';
import EnhancedMessages from '../components/EnhancedMessages';
import UserMessagesInbox from '../components/dashboard/UserMessagesInbox';

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
        {tab === 'affiliate-rewards' && <CommissionCalculator />}
        {tab === 'prayer' && <PrayerRequests />}
        {tab === 'testimony' && <TestimonySubmission />}
        {tab === 'partnership' && <PartnershipApplication />}
        {tab === 'billing' && <BillingSettings />}
        {tab === 'support' && <Support />}
        {tab === 'messages' && <UserMessagesInbox />}
      </div>
    </div>
  );
}
