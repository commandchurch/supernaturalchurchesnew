import React, { useState } from 'react';
import { Crown, Star, Target, Gem, DollarSign, Users, TrendingUp, BarChart3, Calculator, Settings, LayoutDashboard } from 'lucide-react';
import NetworkCalculator from './NetworkCalculator';

// Reorganized Affiliate Rewards Dashboard with Tab Navigation
const AffiliateRewards = React.memo(function AffiliateRewards() {
  const [activeTab, setActiveTab] = useState('overview');

  // Define tabs for better organization
  const tabs = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard, description: 'Dashboard & Key Metrics' },
    { id: 'commission', name: 'Commission Plan', icon: DollarSign, description: 'Detailed Commission Structure' },
    { id: 'calculator', name: 'Network Calculator', icon: Calculator, description: 'Calculate Potential Earnings' },
    { id: 'analytics', name: 'Network Analytics', icon: BarChart3, description: 'Performance & Analytics' },
    { id: 'settings', name: 'Settings & Help', icon: Settings, description: 'Help & Support' }
  ];

  // Mock data for demonstration - updated to match compensation plan
  const mockStats = {
    weeklyEarnings: 247.50,
    totalEarnings: 1250.00,
    referralCount: 15,
    rank: 'SILVER', // Updated to show current tier
    isAffiliate: true,
    referralCode: 'DEMO123',
    points: 47, // Current points for bonus progress
  };

  const currentMembership = 'SILVER' as 'SILVER' | 'GOLD' | 'DIAMOND'; // Updated to match compensation plan tiers

  // Updated commission plans to match compensation plan structure
  const membershipCommissionPlans = {
    SILVER: {
      name: 'SILVER',
      icon: Star,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600',
      commissionRate: 30,
      maxEarnings: 330, // $33 * 10 max referrals roughly
      price: 33,
      levels: [
        { level: 1, percentage: 30, description: 'Direct Referrals (Level 1)' },
        { level: 2, percentage: 10, description: 'Second Generation (Level 2)' }
      ]
    },
    GOLD: {
      name: 'GOLD',
      icon: Crown,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-600',
      commissionRate: 30,
      maxEarnings: 1490, // $149 * 10 max referrals roughly
      price: 149,
      levels: [
        { level: 1, percentage: 30, description: 'Direct Referrals (Level 1)' },
        { level: 2, percentage: 10, description: 'Second Generation (Level 2)' },
        { level: 3, percentage: 5, description: 'Third Generation (Level 3)' },
        { level: 4, percentage: 4, description: 'Fourth Generation (Level 4)' },
        { level: 5, percentage: 3, description: 'Fifth Generation (Level 5)' }
      ]
    },
    DIAMOND: {
      name: 'DIAMOND',
      icon: Gem,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-600',
      commissionRate: 30,
      maxEarnings: 4990, // $499 * 10 max referrals roughly
      price: 499,
      levels: [
        { level: 1, percentage: 30, description: 'Direct Referrals (Level 1)' },
        { level: 2, percentage: 10, description: 'Second Generation (Level 2)' },
        { level: 3, percentage: 5, description: 'Third Generation (Level 3)' },
        { level: 4, percentage: 4, description: 'Fourth Generation (Level 4)' },
        { level: 5, percentage: 3, description: 'Fifth Generation (Level 5)' },
        { level: 6, percentage: 2, description: 'Sixth Generation (Level 6)' },
        { level: 7, percentage: 1, description: 'Seventh Generation (Level 7)' }
      ]
    }
  };

  const currentPlan = membershipCommissionPlans[currentMembership];

  return (
    <div className="space-y-8">
      {/* Hero Section with Tab Navigation */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-4 py-2">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">Affiliate Dashboard</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 heading-font">
            Your <span className="text-green-400">Earnings</span> Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your progress, monitor commissions, and maximize your earning potential in our supernatural network.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 border border-white/10 p-1 flex flex-wrap gap-1 w-full max-w-6xl rounded-xl" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all duration-300 flex-1 min-w-0 touch-manipulation rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/5'
                  }`}
                  aria-label={`Navigate to ${tab.name} section`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-center leading-tight truncate">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Overview Content */}
            <div className="space-y-8">
              {/* Key Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <DollarSign className="h-10 w-10 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-400 mb-1">${mockStats.totalEarnings.toFixed(2)}</div>
                  <div className="text-sm text-green-200">Total Earnings</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <Users className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-400 mb-1">{mockStats.referralCount}</div>
                  <div className="text-sm text-blue-200">Network Size</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 text-center">
                  <TrendingUp className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-400 mb-1">30%</div>
                  <div className="text-sm text-purple-200">Commission Rate</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {React.createElement(currentPlan.icon, { className: `h-10 w-10 ${currentPlan.color}` })}
                  </div>
                  <div className="text-2xl font-bold text-orange-400 mb-1">{currentPlan.name}</div>
                  <div className="text-sm text-orange-200">Current Tier</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Invite Members
                </button>
                <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  View Calculator
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Upgrade Tier
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'commission' && (
          <>
            {/* Commission Plan Content */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                {React.createElement(currentPlan.icon, { className: `h-8 w-8 ${currentPlan.color}` })}
                <div>
                  <h2 className="text-3xl font-black text-white heading-font">
                    Your {currentPlan.name} Commission Plan
                  </h2>
                  <p className="text-gray-300 text-lg">Track your earnings and unlock higher commission levels</p>
                </div>
              </div>

                          {/* Commission Structure */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-400" />
                Your Commission Structure
              </h3>

              <div className="mb-6">
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold text-lg">{currentPlan.name} Membership</h4>
                      <p className="text-gray-300 text-sm">${currentPlan.price}/month • {currentPlan.levels.length} Levels Deep</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">${currentPlan.price}</div>
                      <div className="text-green-200 text-sm">Monthly Fee</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {currentPlan.levels.map((level: any, index: number) => (
                  <div key={level.level} className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r from-${currentPlan.color.split('-')[1]}-500/20 to-${currentPlan.color.split('-')[1]}-600/20 border border-${currentPlan.color.split('-')[1]}-500/30 flex items-center justify-center text-lg font-bold ${currentPlan.color} rounded-full`}>
                          {level.level}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">Level {level.level}</h4>
                          <p className="text-gray-400 text-sm">{level.description}</p>
                          <p className="text-gray-500 text-xs">${(currentPlan.price * level.percentage / 100).toFixed(2)} per referral</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{level.percentage}%</div>
                        <div className="text-green-200 text-sm">Commission Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                <div className="text-center">
                  <h4 className="text-white font-semibold text-lg mb-2">Maximum Monthly Earnings</h4>
                  <div className="text-3xl font-bold text-green-400">${currentPlan.maxEarnings.toFixed(0)}</div>
                  <p className="text-gray-400 text-sm mt-1">Based on 10 referrals per level</p>
                </div>
              </div>
            </div>
            </div>
          </>
        )}

        {activeTab === 'calculator' && (
          <>
            {/* Calculator Content */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Calculator className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white heading-font mb-4">
                  Network <span className="text-blue-400">Calculator</span>
                </h2>
                <p className="text-gray-300 text-lg">Calculate your potential earnings with different network scenarios</p>
              </div>

              <NetworkCalculator />
            </div>
          </>
        )}

        {/* Bonus Progress Section - Part of Overview */}
        {activeTab === 'overview' && (
          <>
            {/* Bonus Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* $500 Bonus */}
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-xl font-bold text-purple-400">$500 Bonus</div>
                  <div className="text-sm text-gray-400">{Math.max(0, 100 - mockStats.points)} more points needed</div>
                </div>
                <div className="mb-3">
                  <div className="text-2xl font-bold text-white">{mockStats.points}/100 points</div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((mockStats.points / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">{Math.min(Math.round((mockStats.points / 100) * 100), 100)}% complete</div>
              </div>

              {/* $750 Bonus */}
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-xl font-bold text-orange-400">$750 Bonus</div>
                  <div className="text-sm text-gray-400">{Math.max(0, 200 - mockStats.points)} more points needed</div>
                </div>
                <div className="mb-3">
                  <div className="text-2xl font-bold text-white">{mockStats.points}/200 points</div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((mockStats.points / 200) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">{Math.min(Math.round((mockStats.points / 200) * 100), 100)}% complete</div>
              </div>

              {/* $1500 Bonus */}
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-xl font-bold text-red-400">$1,500 Bonus</div>
                  <div className="text-sm text-gray-400">{Math.max(0, 500 - mockStats.points)} more points needed</div>
                </div>
                <div className="mb-3">
                  <div className="text-2xl font-bold text-white">{mockStats.points}/500 points</div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((mockStats.points / 500) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">{Math.min(Math.round((mockStats.points / 500) * 100), 100)}% complete</div>
              </div>

              {/* $3000 Bonus */}
              <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-xl font-bold text-pink-400">$3,000 Bonus</div>
                  <div className="text-sm text-gray-400">{Math.max(0, 1000 - mockStats.points)} more points needed</div>
                </div>
                <div className="mb-3">
                  <div className="text-2xl font-bold text-white">{mockStats.points}/1000 points</div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((mockStats.points / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">{Math.min(Math.round((mockStats.points / 1000) * 100), 100)}% complete</div>
              </div>
            </div>

            {/* Affiliate Rewards Info */}
            <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/30 rounded-lg p-6 mb-8">
              <div className="text-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">💰 Affiliate Rewards Program</h3>
                <p className="text-gray-300 text-sm lg:text-base">Earn commissions by sharing Supernatural Institute courses</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">🌍</div>
                    <div>
                      <h4 className="font-semibold text-white">International Payouts</h4>
                      <p className="text-sm text-gray-400">All commissions for international members are paid in USDT via TRX network.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">🇦🇺</div>
                    <div>
                      <h4 className="font-semibold text-white">Australian Payments</h4>
                      <p className="text-sm text-gray-400">All payments are done via BSB/ACC to an Australian bank account only.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 md:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💵</div>
                    <div>
                      <h4 className="font-semibold text-white">Minimum Payout</h4>
                      <p className="text-sm text-gray-400">Minimum payout threshold is $10 AUD equivalent per month.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 'analytics' && (
          <>
            {/* Network Analytics Content */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
              <div className="text-center mb-8">
                <BarChart3 className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white heading-font mb-4">
                  Network <span className="text-purple-400">Analytics</span>
                </h2>
                <p className="text-gray-300 text-lg">Detailed performance metrics and network insights</p>
              </div>

              {/* Performance Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-4">Monthly Earnings Trend</h4>
                  <div className="space-y-3">
                    {[
                      { month: 'Oct', earnings: 1200, goal: 3000 },
                      { month: 'Nov', earnings: 1800, goal: 3000 },
                      { month: 'Dec', earnings: 2400, goal: 3000 }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 text-sm text-gray-400">{data.month}</div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(data.earnings / data.goal) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-4">Goal Progress</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Monthly Target</span>
                        <span className="text-green-400">$2,400 / $3,000</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <>
            {/* Settings & Help Content */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white heading-font mb-4">
                  Settings & <span className="text-blue-400">Help</span>
                </h2>
                <p className="text-gray-300 text-lg">Get help and manage your affiliate preferences</p>
              </div>

              {/* Help Section */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">🎯 How the Compensation Plan Works</h3>
                <p className="text-blue-200 text-sm">
                  This is your affiliate rewards dashboard with our 7-level commission structure. When people join using your referral link, you earn tiered commissions (30%/10%/5%/4%/3%/2%/1%) on their membership fees based on your membership tier.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-green-400 mb-2">💰 Commission Structure</h3>
                <div className="text-green-200 text-sm space-y-2">
                  <p><strong>Tiered Rates:</strong> Level 1: 30%, Level 2: 10%, Level 3: 5%, Level 4: 4%, Level 5: 3%, Level 6: 2%, Level 7: 1%</p>
                  <p><strong>Membership Tiers:</strong> SILVER ($33/2 levels), GOLD ($149/5 levels), DIAMOND ($499/7 levels)</p>
                  <p><strong>28-Day Protection:</strong> Commissions paid monthly after refund protection period</p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">🏆 Membership Tiers</h3>
                <div className="text-purple-200 text-sm space-y-2">
                  <p><strong>SILVER ($33/month):</strong> 30%/10% commission rates, 2 levels deep</p>
                  <p><strong>GOLD ($149/month):</strong> 30%/10%/5%/4%/3% commission rates, 5 levels deep</p>
                  <p><strong>DIAMOND ($499/month):</strong> 30%/10%/5%/4%/3%/2%/1% commission rates, 7 levels deep</p>
                </div>
              </div>

            </div>
          </>
        )}

        {/* 7-Level Network Calculator - Always Visible */}
        <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center">
              <span className="text-blue-400 text-sm">📊</span>
            </div>
            <h2 className="text-2xl font-bold text-white heading-font">7-Level Network Calculator</h2>
          </div>

          {/* Quick Scenarios */}
          <div className="bg-gray-700/30 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Scenarios:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 px-4 py-3 rounded-lg transition-colors">
                <div className="text-sm font-semibold">Growing Church</div>
                <div className="text-xs text-blue-200">3 churches, 12 members</div>
              </button>
              <button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-300 px-4 py-3 rounded-lg transition-colors">
                <div className="text-sm font-semibold">Established Ministry</div>
                <div className="text-xs text-green-200">8 churches, 26 members</div>
              </button>
              <button className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 px-4 py-3 rounded-lg transition-colors">
                <div className="text-sm font-semibold">Kingdom Builder</div>
                <div className="text-xs text-purple-200">15 churches, 42 members</div>
              </button>
            </div>
          </div>

          {/* Customize Your Network */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Customize Your Network:</h3>

            {/* Level 1 */}
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-semibold">Level 1 (30% rate)</span>
                  <span className="text-green-400 font-bold">$308.40/month</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Churches</label>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Silver ($33)</label>
                  <input
                    type="number"
                    defaultValue="4"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Gold ($149)</label>
                  <input
                    type="number"
                    defaultValue="2"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Diamond ($499)</label>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Level 2 */}
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-semibold">Level 2 (10% rate)</span>
                  <span className="text-blue-400 font-bold">$121.00/month</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Churches</label>
                  <input
                    type="number"
                    defaultValue="0"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Silver ($33)</label>
                  <input
                    type="number"
                    defaultValue="8"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Gold ($149)</label>
                  <input
                    type="number"
                    defaultValue="3"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Diamond ($499)</label>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Level 3 */}
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-purple-400 font-semibold">Level 3 (5% rate)</span>
                  <span className="text-purple-400 font-bold">$106.95/month</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Churches</label>
                  <input
                    type="number"
                    defaultValue="0"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Silver ($33)</label>
                  <input
                    type="number"
                    defaultValue="12"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Gold ($149)</label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Diamond ($499)</label>
                  <input
                    type="number"
                    defaultValue="2"
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Levels 4-7 */}
            {[4, 5, 6, 7].map((level) => {
              const rates = { 4: '4%', 5: '3%', 6: '2%', 7: '1%' };
              const colors = { 4: 'yellow', 5: 'cyan', 6: 'pink', 7: 'orange' };
              const amounts = { 4: '$127.36', 5: '$122.40', 6: '$98.86', 7: '$60.54' };
              const defaultValues = {
                4: { churches: 0, silver: 15, gold: 8, diamond: 3 },
                5: { churches: 0, silver: 18, gold: 10, diamond: 4 },
                6: { churches: 0, silver: 20, gold: 12, diamond: 5 },
                7: { churches: 0, silver: 25, gold: 15, diamond: 6 }
              };

              return (
                <div key={level} className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-${colors[level as keyof typeof colors]}-400 font-semibold`}>Level {level} ({rates[level as keyof typeof rates]} rate)</span>
                      <span className={`text-${colors[level as keyof typeof colors]}-400 font-bold`}>{amounts[level as keyof typeof amounts]}/month</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Churches</label>
                      <input
                        type="number"
                        defaultValue={defaultValues[level as keyof typeof defaultValues].churches}
                        className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Silver ($33)</label>
                      <input
                        type="number"
                        defaultValue={defaultValues[level as keyof typeof defaultValues].silver}
                        className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Gold ($149)</label>
                      <input
                        type="number"
                        defaultValue={defaultValues[level as keyof typeof defaultValues].gold}
                        className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Diamond ($499)</label>
                      <input
                        type="number"
                        defaultValue={defaultValues[level as keyof typeof defaultValues].diamond}
                        className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Monthly Commission */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 p-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$945.51</div>
              <div className="text-lg text-green-300 mb-4">Total Monthly Commission</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Level 1:</span>
                  <span className="text-green-400 font-semibold">$308.40</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Level 2:</span>
                  <span className="text-green-400 font-semibold">$121.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Level 3:</span>
                  <span className="text-green-400 font-semibold">$106.95</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Level 4:</span>
                  <span className="text-green-400 font-semibold">$127.36</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Level 5:</span>
                  <span className="text-green-400 font-semibold">$122.40</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Level 6:</span>
                  <span className="text-green-400 font-semibold">$98.86</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Level 7:</span>
                  <span className="text-green-400 font-semibold">$60.54</span>
                </div>
              </div>
            </div>

            {/* Commission Structure */}
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-3">Commission Structure:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300"><strong>• Level 1:</strong> 30% (Direct referrals)</p>
                  <p className="text-gray-300"><strong>• Level 2:</strong> 10% (Network level 2)</p>
                  <p className="text-gray-300"><strong>• Level 3:</strong> 5% (Network level 3)</p>
                  <p className="text-gray-300"><strong>• Level 4:</strong> 4% (Network level 4)</p>
                </div>
                <div>
                  <p className="text-gray-300"><strong>• Level 5:</strong> 3% (Network level 5)</p>
                  <p className="text-gray-300"><strong>• Level 6:</strong> 2% (Network level 6)</p>
                  <p className="text-gray-300"><strong>• Level 7:</strong> 1% (Network level 7)</p>
                </div>
              </div>
              <p className="text-yellow-400 text-sm mt-3">
                <strong>Monthly payouts after 28-day protection period • Unlimited width per level</strong>
              </p>
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-300 text-sm">
                Customize & Calculate: Adjust the numbers for each level to see your potential earnings. This demonstrates the true power of the 7-level commission structure. Full commission tracking available in your partner dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AffiliateRewards;
