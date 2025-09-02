import React, { Suspense, lazy, useMemo, useState } from 'react';

import { DollarSign, Users, TrendingUp, AlertTriangle, Heart, Send, Network, BookOpen, Calculator, Calendar, MessageSquare, UserCheck, Headphones, Church, Gift, Activity, Shield, Handshake } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const StatCard = lazy(() => import('../components/admin/StatCard'));
const FundAdmin = lazy(() => import('../components/admin/FundAdmin'));
const OutreachAdmin = lazy(() => import('../components/admin/OutreachAdmin'));
const ContentAdmin = lazy(() => import('../components/admin/ContentAdmin'));
const EventsManager = lazy(() => import('../components/admin/EventsManager'));
const StaffManager = lazy(() => import('../components/admin/StaffManager'));
const AdminCostCalculator = lazy(() => import('../components/admin/AdminCostCalculator'));
const TestimoniesAdmin = lazy(() => import('../components/admin/TestimoniesAdmin'));

// New admin components
const OverviewAdmin = lazy(() => import('../components/admin/OverviewAdmin'));
const SupportAdmin = lazy(() => import('../components/admin/SupportAdmin'));
const AffiliateNetworkAdmin = lazy(() => import('../components/admin/AffiliateNetworkAdmin'));
const ChurchesAdmin = lazy(() => import('../components/admin/ChurchesAdmin'));
const SystemStatusAdmin = lazy(() => import('../components/admin/SystemStatusAdmin'));
const BlacklistAdmin = lazy(() => import('../components/admin/BlacklistAdmin'));
const PrayerRequestsAdminNew = lazy(() => import('../components/admin/PrayerRequestsAdminNew'));
const PartnershipApplicationsAdmin = lazy(() => import('../components/admin/PartnershipApplicationsAdmin'));

type TabKey = 'overview' | 'system-status' | 'testimonies' | 'support' | 'affiliate-network' | 'churches' | 'blacklist' | 'content' | 'events' | 'staff' | 'prayer-requests' | 'partnerships';

export default function Admin() {
  const [tab, setTab] = useState<TabKey>('overview');

  // Mock data for dashboard stats since we're now using Encore.dev
  const [dashboardData, setDashboardData] = useState({
    prayerRequests: { requests: [] },
    testimonies: { testimonies: [] },
    profiles: { profiles: [] }
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const dashboardStats = useMemo(() => ({
    urgentTasks: 3,
    totalMessages: 1, // Example data
    totalAffiliates: 3,
    activeChurches: 1,
    pendingTestimonies: 0,
    supportTickets: 1,
    systemHealth: 'Good',
  }), []);

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'overview', label: 'Overview', icon: TrendingUp },
    { key: 'system-status', label: 'System Status', icon: Activity },
    { key: 'testimonies', label: 'Testimony', icon: MessageSquare },
    { key: 'prayer-requests', label: 'Prayer Requests', icon: Heart },
    { key: 'partnerships', label: 'Partnerships', icon: Handshake },
    { key: 'support', label: 'Support', icon: Headphones },
    { key: 'affiliate-network', label: 'Affiliate Network', icon: Users },
    { key: 'churches', label: 'Churches', icon: Church },
    { key: 'blacklist', label: 'Blacklist', icon: Shield },
    { key: 'content', label: 'Training Page', icon: BookOpen },
    { key: 'events', label: 'Events', icon: Calendar },
    { key: 'staff', label: 'Staff', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 md:py-16">
      <div className="mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 heading-font">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-400">
            System administration and management tools.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-3 md:gap-6 mb-6 md:mb-8">
        <Suspense fallback={<div className="bg-gray-800/50 h-24" />}>
          <StatCard icon={<AlertTriangle className="h-5 md:h-6 w-5 md:w-6 text-red-400" />} label="Urgent Tasks" value={`${dashboardStats.urgentTasks}`} />
          <StatCard icon={<Activity className="h-5 md:h-6 w-5 md:w-6 text-green-400" />} label="System Health" value={dashboardStats.systemHealth} />
          <StatCard icon={<Users className="h-5 md:h-6 w-5 md:w-6 text-blue-400" />} label="Total Affiliates" value={`${dashboardStats.totalAffiliates}`} />
          <StatCard icon={<Church className="h-5 md:h-6 w-5 md:w-6 text-green-400" />} label="Active Churches" value={`${dashboardStats.activeChurches}`} />
          <StatCard icon={<MessageSquare className="h-5 md:h-6 w-5 md:w-6 text-purple-400" />} label="Pending Testimonies" value={`${dashboardStats.pendingTestimonies}`} />
          <StatCard icon={<Headphones className="h-5 md:h-6 w-5 md:w-6 text-yellow-400" />} label="Support Tickets" value={`${dashboardStats.supportTickets}`} />
        </Suspense>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-start gap-1 bg-gray-800 p-1 rounded-lg">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`${tab === t.key ? 'bg-white text-black' : 'text-white hover:bg-gray-700'} whitespace-nowrap px-2 sm:px-3 md:px-4 py-2 h-auto sm:h-10 font-semibold text-xs sm:text-sm rounded transition-colors duration-200`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        {tab === 'overview' && <OverviewAdmin />}

        {tab === 'system-status' && <SystemStatusAdmin />}

        {tab === 'testimonies' && <TestimoniesAdmin />}

        {tab === 'prayer-requests' && <PrayerRequestsAdminNew />}

        {tab === 'partnerships' && <PartnershipApplicationsAdmin />}

        {tab === 'support' && <SupportAdmin />}

        {tab === 'affiliate-network' && <AffiliateNetworkAdmin />}

        {tab === 'churches' && <ChurchesAdmin />}

        {tab === 'blacklist' && <BlacklistAdmin />}

        {tab === 'content' && <ContentAdmin />}

        {tab === 'events' && <EventsManager />}

        {tab === 'staff' && <StaffManager />}
      </Suspense>
    </div>
  );
}
