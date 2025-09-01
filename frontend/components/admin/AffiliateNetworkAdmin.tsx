import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Calendar, Download, Search, Filter, Eye, Mail } from 'lucide-react';

export default function AffiliateNetworkAdmin() {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [minEarnings, setMinEarnings] = useState('');
  const [maxEarnings, setMaxEarnings] = useState('');

  // Mock affiliate data with enhanced filtering fields
  const affiliateStats = {
    totalAffiliates: 2847,
    activeAffiliates: 2156,
    newThisMonth: 234,
    totalRevenue: 456780,
    averageCommission: 127.50,
    topPerformer: 'Sarah Johnson'
  };

  const affiliateData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      joinDate: '2024-01-15',
      status: 'active',
      totalReferrals: 45,
      activeReferrals: 32,
      totalEarnings: 4250.00,
      monthlyEarnings: 650.00,
      lastActivity: '2024-08-29',
      tier: 'Gold',
      location: 'Texas, USA',
      church: 'Grace Community Church',
      rank: 'Master Affiliate'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      joinDate: '2024-02-20',
      status: 'active',
      totalReferrals: 28,
      activeReferrals: 22,
      totalEarnings: 3120.00,
      monthlyEarnings: 420.00,
      lastActivity: '2024-08-28',
      tier: 'Silver',
      location: 'California, USA',
      church: 'Victory Chapel',
      rank: 'Senior Affiliate'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma@example.com',
      joinDate: '2024-03-10',
      status: 'inactive',
      totalReferrals: 12,
      activeReferrals: 8,
      totalEarnings: 980.00,
      monthlyEarnings: 0.00,
      lastActivity: '2024-08-15',
      tier: 'Bronze',
      location: 'Florida, USA',
      church: 'New Life Church',
      rank: 'Associate Affiliate'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david@example.com',
      joinDate: '2024-01-05',
      status: 'active',
      totalReferrals: 67,
      activeReferrals: 54,
      totalEarnings: 8950.00,
      monthlyEarnings: 1200.00,
      lastActivity: '2024-08-29',
      tier: 'Platinum',
      location: 'New York, USA',
      church: 'Harvest Church',
      rank: 'Elite Affiliate'
    }
  ];

  const recentActivity = [
    { type: 'signup', name: 'John Smith', date: '2024-08-29 10:30 AM', amount: null },
    { type: 'commission', name: 'Sarah Johnson', date: '2024-08-29 09:15 AM', amount: 150.00 },
    { type: 'referral', name: 'Michael Chen', date: '2024-08-28 04:45 PM', amount: null },
    { type: 'payout', name: 'Emma Rodriguez', date: '2024-08-28 02:30 PM', amount: 980.00 }
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-cyan-400';
      case 'Gold': return 'text-yellow-400';
      case 'Silver': return 'text-gray-400';
      case 'Bronze': return 'text-orange-600';
      default: return 'text-gray-400';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Elite Affiliate': return 'text-purple-400';
      case 'Master Affiliate': return 'text-blue-400';
      case 'Senior Affiliate': return 'text-green-400';
      case 'Associate Affiliate': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  // Enhanced filtering logic
  const filteredAffiliates = affiliateData.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.church.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = selectedTier === 'all' || affiliate.tier === selectedTier;
    const matchesStatus = selectedStatus === 'all' || affiliate.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || affiliate.location.includes(selectedLocation);
    
    const earnings = affiliate.totalEarnings;
    const matchesMinEarnings = !minEarnings || earnings >= parseFloat(minEarnings);
    const matchesMaxEarnings = !maxEarnings || earnings <= parseFloat(maxEarnings);
    
    return matchesSearch && matchesTier && matchesStatus && matchesLocation && matchesMinEarnings && matchesMaxEarnings;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Affiliate Network</h2>
          </div>
        </div>

        {/* Report Type Selection */}
        <div className="bg-gray-800/50 border border-gray-700 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-gray-300 text-sm">Report Type:</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="px-3 py-1 bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="overview">Overview</option>
                <option value="performance">Performance</option>
                <option value="financial">Financial</option>
                <option value="activity">Activity Log</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-gray-300 text-sm">Date Range:</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-1 bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm flex items-center space-x-2 border border-blue-500">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Enhanced Filtering Section */}
        <div className="bg-gray-800/50 border border-gray-700 p-4 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, church, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Tier Filter */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Tiers</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="Texas">Texas</option>
              <option value="California">California</option>
              <option value="Florida">Florida</option>
              <option value="New York">New York</option>
              <option value="International">International</option>
            </select>
          </div>

          {/* Earnings Range Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Minimum Earnings ($)</label>
              <input
                type="number"
                placeholder="0"
                value={minEarnings}
                onChange={(e) => setMinEarnings(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Maximum Earnings ($)</label>
              <input
                type="number"
                placeholder="No limit"
                value={maxEarnings}
                onChange={(e) => setMaxEarnings(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Showing {filteredAffiliates.length} of {affiliateData.length} affiliates
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTier('all');
                setSelectedStatus('all');
                setSelectedLocation('all');
                setMinEarnings('');
                setMaxEarnings('');
              }}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-600 p-6 text-white border border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Affiliates</p>
                <p className="text-3xl font-bold">{affiliateStats.totalAffiliates.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
            <p className="text-green-100 text-sm mt-2">+{affiliateStats.newThisMonth} new this month</p>
          </div>

          <div className="bg-blue-600 p-6 text-white border border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Active Affiliates</p>
                <p className="text-3xl font-bold">{affiliateStats.activeAffiliates.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
            <p className="text-blue-100 text-sm mt-2">{Math.round((affiliateStats.activeAffiliates / affiliateStats.totalAffiliates) * 100)}% active rate</p>
          </div>

          <div className="bg-purple-600 p-6 text-white border border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold">${affiliateStats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </div>
            <p className="text-purple-100 text-sm mt-2">Avg: ${affiliateStats.averageCommission}</p>
          </div>

          <div className="bg-yellow-600 p-6 text-white border border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Top Performer</p>
                <p className="text-lg font-bold">{affiliateStats.topPerformer}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-200" />
            </div>
            <p className="text-yellow-100 text-sm mt-2">This month</p>
          </div>
        </div>

        {/* Affiliate Directory */}
        <div className="bg-gray-800/50 border border-gray-700 mb-6">
          <div className="p-6 border-b border-gray-600">
            <h3 className="text-lg font-semibold text-white">Affiliate Directory</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-4 text-gray-300 font-medium">Affiliate</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Rank</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Location</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Church</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Referrals</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Earnings</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Tier</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAffiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="p-4">
                      <div className="text-white font-medium">{affiliate.name}</div>
                      <div className="text-gray-500 text-xs">{affiliate.email}</div>
                      <div className="text-gray-500 text-xs">Joined: {affiliate.joinDate}</div>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${getRankColor(affiliate.rank)}`}>
                        {affiliate.rank}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(affiliate.status)}`}>
                        {affiliate.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">
                      {affiliate.location}
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="text-white text-xs">{affiliate.church}</div>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div>{affiliate.totalReferrals} total</div>
                      <div className="text-gray-500 text-xs">{affiliate.activeReferrals} active</div>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="font-medium text-green-400">${affiliate.totalEarnings.toFixed(2)}</div>
                      <div className="text-gray-500 text-xs">Monthly: ${affiliate.monthlyEarnings.toFixed(2)}</div>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${getTierColor(affiliate.tier)}`}>
                        {affiliate.tier}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{affiliate.lastActivity}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>Contact</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 ${
                    activity.type === 'signup' ? 'bg-green-400' :
                    activity.type === 'commission' ? 'bg-blue-400' :
                    activity.type === 'referral' ? 'bg-purple-400' : 'bg-yellow-400'
                  }`}></div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      {activity.type === 'signup' && `New affiliate: ${activity.name}`}
                      {activity.type === 'commission' && `Commission earned by ${activity.name}`}
                      {activity.type === 'referral' && `New referral by ${activity.name}`}
                      {activity.type === 'payout' && `Payout processed for ${activity.name}`}
                    </p>
                    <p className="text-gray-500 text-xs">{activity.date}</p>
                  </div>
                </div>
                {activity.amount && (
                  <span className="text-green-400 font-medium">${activity.amount}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
