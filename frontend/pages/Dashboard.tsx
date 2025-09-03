import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Overview from '../components/dashboard/Overview';
import HelpMeFund from '../components/dashboard/HelpMeFund';
import SoulOutreach from '../components/dashboard/SoulOutreach';
import CommissionCalculator from '../components/dashboard/CommissionCalculator';
import PrayerRequests from '../components/dashboard/PrayerRequests';
import TestimonySubmission from '../components/dashboard/TestimonySubmission';
import PartnershipApplication from '../components/dashboard/PartnershipApplication';
import BillingSettings from '../components/dashboard/BillingSettings';
import Support from '../components/dashboard/Support';
import UserMessagesInbox from '../components/dashboard/UserMessagesInbox';

interface Tab {
  key: string;
  label: string;
}

const tabs: Tab[] = [
  { key: 'overview', label: 'OVERVIEW' },
  { key: 'fund', label: 'HELP ME FUND' },
  { key: 'outreach', label: 'SOUL OUTREACH' },
  { key: 'affiliate-rewards', label: 'AFFILIATE REWARDS' },
  { key: 'prayer', label: 'PRAYER REQUEST' },
  { key: 'testimony', label: 'TESTIMONY' },
  { key: 'partnership', label: 'PARTNERSHIP' },
  { key: 'billing', label: 'BILLING' },
  { key: 'support', label: 'SUPPORT' },
  { key: 'messages', label: 'MESSAGES' },
];

export default function Dashboard() {
  const [tab, setTab] = useState('overview');
  const [notifications] = useState(0); // Mock notifications count

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>

        {/* Messages */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab('messages')}
            className="relative p-3 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors rounded-lg"
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

      {/* Tab Navigation */}
      <div className="w-full mb-8 px-6">
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
              ) : t.label === 'PRAYER REQUEST' ? (
                <>
                  <span className="hidden sm:inline">PRAYER REQUEST</span>
                  <span className="sm:hidden">PRAYER</span>
                </>
              ) : t.label === 'HELP ME FUND' ? (
                <>
                  <span className="hidden sm:inline">HELP ME FUND</span>
                  <span className="sm:hidden">FUND</span>
                </>
              ) : (
                t.label
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
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
