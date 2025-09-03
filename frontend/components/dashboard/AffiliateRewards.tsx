import React, { useState } from 'react';
import { Crown, Star, Target, Gem, DollarSign, Users, TrendingUp, BarChart3, Calculator, Gift, Settings, LayoutDashboard } from 'lucide-react';
import OutreachCalculator from '../outreach/OutreachCalculator';

// Reorganized Affiliate Rewards Dashboard with Tab Navigation
const AffiliateRewards = React.memo(function AffiliateRewards() {
  const [activeTab, setActiveTab] = useState('overview');

  // Define tabs for better organization
  const tabs = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard, description: 'Dashboard & Key Metrics' },
    { id: 'commission', name: 'Commission Plan', icon: DollarSign, description: 'Detailed Commission Structure' },
    { id: 'calculator', name: 'Earnings Calculator', icon: Calculator, description: 'Calculate Potential Earnings' },
    { id: 'bonus', name: 'Bonus Progress', icon: Gift, description: 'Bonus System & Progress' },
    { id: 'analytics', name: 'Network Analytics', icon: BarChart3, description: 'Performance & Analytics' },
    { id: 'settings', name: 'Settings & Help', icon: Settings, description: 'Help & Support' }
  ];

  // Mock data for demonstration
  const mockStats = {
    weeklyEarnings: 247.50,
    totalEarnings: 1250.00,
    referralCount: 15,
    rank: 'BRONZE',
    isAffiliate: true,
    referralCode: 'DEMO123',
  };

  const currentMembership = 'BRONZE' as 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';

  const membershipCommissionPlans = {
    BRONZE: {
      name: 'BRONZE',
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600',
      commissionRate: 30,
      maxEarnings: 3000,
      price: 10,
      levels: [
        { level: 1, percentage: 30, description: 'Direct Referrals' }
      ]
    },
    SILVER: {
      name: 'SILVER',
      icon: Star,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600',
      commissionRate: 30,
      maxEarnings: 6000,
      price: 20,
      levels: [
        { level: 1, percentage: 30, description: 'Direct Referrals' },
        { level: 2, percentage: 30, description: 'Second Generation' }
      ]
    },
    GOLD: {
      name: 'GOLD',
      icon: Crown,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-600',
      commissionRate: 30,
      maxEarnings: 15000,
      price: 50,
      levels: [
        { level: 1, percentage: 30, description: 'Direct Referrals' },
        { level: 2, percentage: 30, description: 'Second Generation' },
        { level: 3, percentage: 30, description: 'Third Generation' },
        { level: 4, percentage: 30, description: 'Fourth Generation' },
        { level: 5, percentage: 30, description: 'Fifth Generation' }
      ]
    },
    DIAMOND: {
      name: 'DIAMOND',
      icon: Gem,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-600',
      commissionRate: 30,
      maxEarnings: 30000,
      price: 100,
      levels: [
        { level: 1, percentage: 30, description: 'Direct Referrals' },
        { level: 2, percentage: 30, description: 'Second Generation' },
        { level: 3, percentage: 30, description: 'Third Generation' },
        { level: 4, percentage: 30, description: 'Fourth Generation' },
        { level: 5, percentage: 30, description: 'Fifth Generation' },
        { level: 6, percentage: 30, description: 'Sixth Generation' },
        { level: 7, percentage: 30, description: 'Seventh Generation' }
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
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Target className="h-6 w-6 text-blue-400" />
                  Your Commission Structure
                </h3>

                <div className="space-y-4">
                  {currentPlan.levels.map((level: any, index: number) => (
                    <div key={level.level} className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-lg font-bold text-blue-400 rounded-full">
                            {level.level}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-lg">Level {level.level}</h4>
                            <p className="text-gray-400 text-sm">{level.description}</p>
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
                  Earnings <span className="text-blue-400">Calculator</span>
                </h2>
                <p className="text-gray-300 text-lg">Calculate your potential earnings with different network scenarios</p>
              </div>

              <OutreachCalculator />
            </div>
          </>
        )}

        {activeTab === 'bonus' && (
          <>
            {/* Bonus Progress Content */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Gift className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white heading-font mb-4">
                  Bonus <span className="text-yellow-400">Progress</span>
                </h2>
                <p className="text-gray-300 text-lg">Track your progress toward cash bonuses</p>
              </div>

              {/* Current Progress */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Your Bonus Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">23</div>
                    <div className="text-blue-200 text-sm mb-4">Current Points</div>
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-300 mb-1">Next Bonus: $50 AUD</div>
                      <div className="text-xs text-gray-400">2 more points needed</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">$0</div>
                    <div className="text-green-200 text-sm mb-4">Bonuses Earned</div>
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-300 mb-1">Next Payout</div>
                      <div className="text-xs text-gray-400">28 days after threshold</div>
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
                <h3 className="text-lg font-semibold text-blue-400 mb-2">🎯 How the Affiliate System Works</h3>
                <p className="text-blue-200 text-sm">
                  This is your commission dashboard where you can track earnings from your referral network. When people join using your referral link, you earn 30% commission on their membership fees.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-green-400 mb-2">💰 Commission Details</h3>
                <div className="text-green-200 text-sm space-y-2">
                  <p><strong>30% Commission Rate:</strong> You earn 30% of every membership fee from people in your network</p>
                  <p><strong>7-Level Structure:</strong> Earn from direct referrals (Level 1) through their network (Level 2-7)</p>
                  <p><strong>Monthly Payouts:</strong> Commissions paid monthly after 28-day protection period</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default AffiliateRewards;
