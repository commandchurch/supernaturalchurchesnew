import React, { useState, useEffect } from 'react';
import { MessageCircle, Monitor, Tablet } from 'lucide-react';
import FontSizeToggle from '../src/components/FontSizeToggle';
import Overview from '../components/dashboard/Overview';
import HelpMeFund from '../components/dashboard/HelpMeFund';
import SoulOutreach from '../components/dashboard/SoulOutreach';
import CommissionCalculator from '../components/dashboard/CommissionCalculator';
import BillingSettings from '../components/dashboard/BillingSettings';
import AccountSettings from '../components/dashboard/AccountSettings'
import Support from '../components/dashboard/Support';
import UserMessagesInbox from '../components/dashboard/UserMessagesInbox';
import MobileApp from '../components/dashboard/MobileApp';
import ChurchStaff from '../components/dashboard/ChurchStaff';

interface Tab {
  key: string;
  label: string;
}

const tabs: Tab[] = [
  { key: 'overview', label: 'OVERVIEW' },
  { key: 'fund', label: 'HELP ME FUND' },
  { key: 'outreach', label: 'SOUL OUTREACH' },
  { key: 'affiliate-rewards', label: 'AFFILIATE REWARDS' },
  { key: 'billing', label: 'BILLING' },
  { key: 'settings', label: 'ACCOUNT SETTINGS' },
  { key: 'mobile-app', label: 'MOBILE APP' },
  { key: 'support', label: 'SUPPORT' },
  { key: 'messages', label: 'MESSAGES' },
  { key: 'church-staff', label: 'CHURCH STAFF' },
];

export default function Dashboard() {
  const [tab, setTab] = useState('overview');
  const [notifications] = useState(0); // Mock notifications count
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isApprovedChurch, setIsApprovedChurch] = useState(false);

  // Check if we're on desktop and load saved preference
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1280; // xl breakpoint
      setIsDesktop(desktop);

      if (desktop) {
        const savedMode = localStorage.getItem('dashboard-compact-mode');
        setIsCompactMode(savedMode === 'true');
      }
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    // Check church approval status
    const checkChurchStatus = () => {
      // Mock church approval check - in real app this would come from API
      // Check if user has church access which indicates approved church
      const churchAccess = localStorage.getItem('churchAccess');
      setIsApprovedChurch(!!churchAccess);
    };

    checkChurchStatus();

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const toggleLayoutMode = () => {
    const newMode = !isCompactMode;
    setIsCompactMode(newMode);
    localStorage.setItem('dashboard-compact-mode', newMode.toString());

    // Add a subtle animation effect
    const dashboard = document.querySelector('[data-dashboard]');
    if (dashboard) {
      dashboard.classList.add('animate-pulse');
      setTimeout(() => {
        dashboard.classList.remove('animate-pulse');
      }, 300);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white ${
      isCompactMode && isDesktop
        ? 'flex items-center justify-center py-8'
        : ''
    }`}>
      <div
        data-dashboard
        className={`${
          isCompactMode && isDesktop
            ? 'w-full max-w-4xl mx-auto bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300'
            : 'w-full'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b border-gray-800 ${
          isCompactMode && isDesktop ? 'bg-gray-800/50' : ''
        }`}>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>

          {/* Desktop Controls */}
          <div className="flex items-center gap-3">
            {/* Font Size Toggle */}
            <FontSizeToggle />

            {/* Layout Toggle - Only show on desktop */}
            {isDesktop && (
              <button
                onClick={toggleLayoutMode}
                className="relative p-3 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors rounded-lg group"
                title={isCompactMode ? 'Switch to Full Screen' : 'Switch to Compact View'}
              >
                {isCompactMode ? (
                  <Monitor className="w-6 h-6 text-white" />
                ) : (
                  <Tablet className="w-6 h-6 text-white" />
                )}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {isCompactMode ? 'Full Screen' : 'Compact View'}
                </div>
              </button>
            )}

            {/* Messages */}
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
        <div className={`w-full mb-8 px-6 pt-6 ${isCompactMode && isDesktop ? 'px-8' : 'px-6'}`}>
          <div className="flex flex-wrap justify-center gap-1 bg-gray-800 p-1 rounded-lg">
            {tabs
              .filter(t => t.key !== 'church-staff' || isApprovedChurch)
              .map(t => (
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
                  ) : t.label === 'MOBILE APP' ? (
                    <>
                      <span className="hidden sm:inline">MOBILE APP</span>
                      <span className="sm:hidden">APP</span>
                    </>
                  ) : t.label === 'CHURCH STAFF' ? (
                    <>
                      <span className="hidden sm:inline">CHURCH STAFF</span>
                      <span className="sm:hidden">STAFF</span>
                    </>
                  ) : (
                    t.label
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* Content */}
        <div className={`pb-8 ${isCompactMode && isDesktop ? 'px-8' : 'px-6'}`}>
          {tab === 'overview' && <Overview />}
          {tab === 'fund' && <HelpMeFund />}
          {tab === 'outreach' && <SoulOutreach />}
          {tab === 'affiliate-rewards' && <CommissionCalculator />}
          {tab === 'billing' && <BillingSettings />}
          {tab === 'settings' && <AccountSettings />}
          {tab === 'mobile-app' && <MobileApp />}
          {tab === 'support' && <Support />}
          {tab === 'messages' && <UserMessagesInbox />}
          {tab === 'church-staff' && isApprovedChurch && <ChurchStaff />}
        </div>
      </div>
    </div>
  );
}

