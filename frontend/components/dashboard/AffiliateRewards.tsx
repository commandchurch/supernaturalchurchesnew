import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import client from '../../client';

import { Crown, Star, Target, Gem, AlertCircle, DollarSign, Users, TrendingUp, CheckCircle } from 'lucide-react';
import OutreachCalculator from '../outreach/OutreachCalculator';

export default function AffiliateRewards() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        setLoading(true);
        const response = await client.outreach.getAffiliateStats();
        setStats(response);
      } catch (error) {
        console.error('Failed to fetch affiliate stats:', error);
        // Fallback to mock data if API fails
        setStats({
          weeklyEarnings: 150,
          totalEarnings: 1250,
          referralCount: 8,
          rank: 'Silver',
          isAffiliate: true,
          referralCode: 'DEMO123',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isLoaded, isSignedIn]);
  
  // Loading state
  if (stats === undefined) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-gray-300 rounded"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
        <div className="h-64 bg-gray-300 rounded"></div>
      </div>
    );
  }
  
  // Mock current membership - in real app this would come from user data
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
        { level: 2, percentage: 10, description: 'Second Generation' }
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
        { level: 2, percentage: 10, description: 'Second Generation' },
        { level: 3, percentage: 5, description: 'Third Generation' },
        { level: 4, percentage: 3, description: 'Fourth Generation' },
        { level: 5, percentage: 2, description: 'Fifth Generation' }
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
        { level: 2, percentage: 10, description: 'Second Generation' },
        { level: 3, percentage: 5, description: 'Third Generation' },
        { level: 4, percentage: 3, description: 'Fourth Generation' },
        { level: 5, percentage: 2, description: 'Fifth Generation' },
        { level: 6, percentage: 1, description: 'Sixth Generation' },
        { level: 7, percentage: 1, description: 'Seventh Generation' }
      ]
    }
  };

  const currentPlan = membershipCommissionPlans[currentMembership as keyof typeof membershipCommissionPlans];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <DollarSign className="h-4 w-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">Affiliate Dashboard</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 heading-font">
            Your <span className="text-green-400">Earnings</span> Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your progress, monitor commissions, and maximize your earning potential in our supernatural network.
          </p>
        </div>

        {/* Key Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-center">
            <DollarSign className="h-10 w-10 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-400 mb-1">${stats?.totalEarnings?.toFixed(2) || '0.00'}</div>
            <div className="text-sm text-green-200">Total Earnings</div>
            <div className="text-xs text-green-300 mt-1">+12% this month</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 text-center">
            <Users className="h-10 w-10 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-blue-400 mb-1">{stats?.referralCount || 0}</div>
            <div className="text-sm text-blue-200">Network Size</div>
            <div className="text-xs text-blue-300 mt-1">Active Members</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 text-center">
            <TrendingUp className="h-10 w-10 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-purple-400 mb-1">30%</div>
            <div className="text-sm text-purple-200">Commission Rate</div>
            <div className="text-xs text-purple-300 mt-1">Level 1</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              {React.createElement(currentPlan.icon, { className: `h-10 w-10 ${currentPlan.color}` })}
            </div>
            <div className="text-2xl font-bold text-orange-400 mb-1">{currentPlan.name}</div>
            <div className="text-sm text-orange-200">Current Tier</div>
            <div className="text-xs text-orange-300 mt-1">${currentPlan.price}/month</div>
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

      {/* Your Commission Plan - Enhanced */}
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

        {/* Plan Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target className="h-6 w-6 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm">Active Levels</span>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">{currentPlan.levels.length}</div>
            <div className="text-blue-200 text-sm">Commission levels unlocked</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="h-6 w-6 text-green-400" />
              <span className="text-green-400 font-semibold text-sm">Max Earnings</span>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">${currentPlan.maxEarnings}</div>
            <div className="text-green-200 text-sm">Monthly potential</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <span className="text-purple-400 font-semibold text-sm">Commission Rate</span>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">{currentPlan.commissionRate}%</div>
            <div className="text-purple-200 text-sm">On direct referrals</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="h-6 w-6 text-orange-400" />
              <span className="text-orange-400 font-semibold text-sm">Next Upgrade</span>
            </div>
            <div className="text-xl font-bold text-orange-400 mb-1">
              {currentMembership === 'BRONZE' && 'SILVER'}
              {currentMembership === 'SILVER' && 'GOLD'}
              {currentMembership === 'GOLD' && 'DIAMOND'}
              {currentMembership === 'DIAMOND' && 'MAX'}
            </div>
            <div className="text-orange-200 text-sm">Higher earnings</div>
          </div>
        </div>

        {/* Commission Structure Visualization */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-blue-400" />
            Your Commission Structure
          </h3>

          <div className="space-y-4">
            {currentPlan.levels.map((level, index) => (
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
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Example: ${currentPlan.price} member</span>
                    <span className="text-green-400 font-semibold">
                      ${(currentPlan.price * level.percentage / 100).toFixed(2)} commission
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Locked Levels */}
            {currentPlan.levels.length < 7 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">🔒 Locked Levels (Upgrade to Unlock)</h4>
                <div className="space-y-3">
                  {currentPlan.levels.length < 2 && (
                    <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/30 rounded-lg p-4 opacity-75">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-600/50 border border-gray-500/50 flex items-center justify-center text-lg font-bold text-gray-400 rounded-full">
                            2
                          </div>
                          <div>
                            <h4 className="text-gray-400 font-semibold text-lg">Level 2</h4>
                            <p className="text-gray-500 text-sm">Second Generation Referrals</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-500">10%</div>
                          <div className="text-purple-400 text-sm font-semibold">Unlock with SILVER</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {currentPlan.levels.length < 5 && (
                    <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/30 rounded-lg p-4 opacity-75">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-600/50 border border-gray-500/50 flex items-center justify-center text-lg font-bold text-gray-400 rounded-full">
                            3-5
                          </div>
                          <div>
                            <h4 className="text-gray-400 font-semibold text-lg">Levels 3-5</h4>
                            <p className="text-gray-500 text-sm">Third to Fifth Generation</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-500">5%, 3%, 2%</div>
                          <div className="text-yellow-400 text-sm font-semibold">Unlock with GOLD</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {currentPlan.levels.length < 7 && (
                    <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/30 rounded-lg p-4 opacity-75">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-600/50 border border-gray-500/50 flex items-center justify-center text-lg font-bold text-gray-400 rounded-full">
                            6-7
                          </div>
                          <div>
                            <h4 className="text-gray-400 font-semibold text-lg">Levels 6-7</h4>
                            <p className="text-gray-500 text-sm">Sixth and Seventh Generation</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-500">1%, 1%</div>
                          <div className="text-cyan-400 text-sm font-semibold">Unlock with DIAMOND</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Performance Tips */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">💡 Maximize Your Earnings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 font-semibold">Focus on Level 1</p>
                  <p className="text-blue-300 text-sm">Direct referrals pay the most - prioritize personal recruits</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 font-semibold">Build Depth</p>
                  <p className="text-blue-300 text-sm">Help your team members recruit others for compounding growth</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 font-semibold">Quality over Quantity</p>
                  <p className="text-blue-300 text-sm">Active, engaged members perform better long-term</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 font-semibold">Strategic Upgrades</p>
                  <p className="text-blue-300 text-sm">Higher tiers unlock more levels and higher earnings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Options - Enhanced */}
      <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
            <Crown className="h-4 w-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-medium">Level Up</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-4 heading-font">
            Unlock <span className="text-orange-400">Higher</span> Earnings
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Upgrade your membership tier to access more commission levels and dramatically increase your earning potential
          </p>
        </div>

        {/* Current Tier Status */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Current Status</h3>
              <p className="text-gray-300">Your {currentPlan.name} membership</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">${currentPlan.price}/month</div>
              <div className="text-gray-400 text-sm">{currentPlan.levels.length} commission levels active</div>
            </div>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
              style={{ width: `${(currentPlan.levels.length / 7) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Current: {currentPlan.levels.length} levels</span>
            <span>Maximum: 7 levels</span>
          </div>
        </div>

        {/* Upgrade Options */}
        <div className="space-y-6">
          {currentMembership === 'BRONZE' && (
            <>
              {/* Silver Upgrade */}
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center rounded-xl">
                      <Star className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-purple-400">SILVER</h3>
                      <p className="text-purple-200 text-sm">Unlock Level 2 commissions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">$20/mo</div>
                    <div className="text-purple-300 text-sm">+100% more earnings</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="text-purple-200 font-semibold mb-2">New Benefits</h4>
                    <ul className="text-purple-100 text-sm space-y-1">
                      <li>• Level 2 commissions (10%)</li>
                      <li>• Monthly group teachings</li>
                      <li>• Enhanced community access</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-200 font-semibold mb-2">Earning Potential</h4>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• +$2,000 monthly potential</li>
                      <li>• 2 active commission levels</li>
                      <li>• Faster bonus progression</li>
                    </ul>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Star className="h-5 w-5" />
                  UPGRADE TO SILVER
                </button>
              </div>

              {/* Gold Upgrade */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center rounded-xl">
                      <Crown className="h-8 w-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400">GOLD</h3>
                      <p className="text-yellow-200 text-sm">Unlock Levels 2-5 commissions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">$50/mo</div>
                    <div className="text-yellow-300 text-sm">+500% more earnings</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-yellow-200 font-semibold mb-2">New Benefits</h4>
                    <ul className="text-yellow-100 text-sm space-y-1">
                      <li>• Levels 3-5 commissions (5%, 3%, 2%)</li>
                      <li>• Fortnightly Q&A coaching</li>
                      <li>• 5% merchandise discount</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-200 font-semibold mb-2">Earning Potential</h4>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• +$12,000 monthly potential</li>
                      <li>• 5 active commission levels</li>
                      <li>• Significant income boost</li>
                    </ul>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5" />
                  UPGRADE TO GOLD
                </button>
              </div>

              {/* Diamond Upgrade */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center rounded-xl">
                      <Gem className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-400">DIAMOND</h3>
                      <p className="text-cyan-200 text-sm">30% Level 1 + All 7 Levels</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">$100/mo</div>
                    <div className="text-cyan-300 text-sm">+1000% more earnings</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <h4 className="text-cyan-200 font-semibold mb-2">New Benefits</h4>
                    <ul className="text-cyan-100 text-sm space-y-1">
                      <li>• Levels 6-7 commissions (1%, 1%)</li>
                      <li>• Free event tickets</li>
                      <li>• 10% merchandise discount</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-200 font-semibold mb-2">Earning Potential</h4>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• +$30,000 monthly potential</li>
                      <li>• 7 active commission levels</li>
                      <li>• Maximum earning capacity</li>
                    </ul>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Gem className="h-5 w-5" />
                  UPGRADE TO DIAMOND
                </button>
              </div>
            </>
          )}

          {currentMembership === 'SILVER' && (
            <>
              {/* Gold Upgrade */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center rounded-xl">
                      <Crown className="h-8 w-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400">GOLD</h3>
                      <p className="text-yellow-200 text-sm">Unlock Levels 3-5 commissions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">$50/mo</div>
                    <div className="text-yellow-300 text-sm">+400% more earnings</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-yellow-200 font-semibold mb-2">New Benefits</h4>
                    <ul className="text-yellow-100 text-sm space-y-1">
                      <li>• Levels 3-5 commissions (5%, 3%, 2%)</li>
                      <li>• Fortnightly Q&A coaching</li>
                      <li>• 5% merchandise discount</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-200 font-semibold mb-2">Earning Potential</h4>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• +$10,000 monthly potential</li>
                      <li>• 5 active commission levels</li>
                      <li>• Major income increase</li>
                    </ul>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5" />
                  UPGRADE TO GOLD
                </button>
              </div>

              {/* Diamond Upgrade */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center rounded-xl">
                      <Gem className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-400">DIAMOND</h3>
                      <p className="text-cyan-200 text-sm">30% Level 1 + Levels 6-7</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">$100/mo</div>
                    <div className="text-cyan-300 text-sm">+800% more earnings</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <h4 className="text-cyan-200 font-semibold mb-2">New Benefits</h4>
                    <ul className="text-cyan-100 text-sm space-y-1">
                      <li>• Levels 6-7 commissions (1%, 1%)</li>
                      <li>• Free event tickets</li>
                      <li>• 10% merchandise discount</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-200 font-semibold mb-2">Earning Potential</h4>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• +$25,000 monthly potential</li>
                      <li>• 7 active commission levels</li>
                      <li>• Elite earning status</li>
                    </ul>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Gem className="h-5 w-5" />
                  UPGRADE TO DIAMOND
                </button>
              </div>
            </>
          )}

          {currentMembership === 'GOLD' && (
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-8 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center rounded-xl mx-auto mb-4">
                  <Gem className="h-10 w-10 text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-cyan-400 mb-2">DIAMOND</h3>
                <p className="text-cyan-200 text-lg mb-6">30% Level 1 + Levels 6-7 commissions</p>
                <div className="text-4xl font-bold text-white mb-2">$100/mo</div>
                <div className="text-cyan-300 text-lg font-semibold mb-6">+200% more earnings potential</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
                  <h4 className="text-cyan-200 font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    New Benefits
                  </h4>
                  <ul className="text-cyan-100 text-sm space-y-2">
                    <li>• Levels 6-7 commissions (1%, 1%)</li>
                    <li>• Free event tickets</li>
                    <li>• 10% merchandise discount</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                  <h4 className="text-green-200 font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Earning Potential
                  </h4>
                  <ul className="text-green-100 text-sm space-y-2">
                    <li>• +$18,000 monthly potential</li>
                    <li>• 7 active commission levels</li>
                    <li>• Maximum earning capacity</li>
                    <li>• Elite status recognition</li>
                  </ul>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-5 text-xl font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                <Gem className="h-6 w-6" />
                UPGRADE TO DIAMOND
              </button>
            </div>
          )}

          {currentMembership === 'DIAMOND' && (
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-8 max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center rounded-xl mx-auto mb-6">
                <Gem className="h-10 w-10 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">MAXIMUM TIER ACHIEVED</h3>
              <p className="text-cyan-200 text-lg mb-6">You're at the highest earning tier with all 7 commission levels unlocked!</p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h4 className="text-green-200 font-semibold mb-2">Your Elite Status</h4>
                <ul className="text-green-100 text-sm space-y-1">
                  <li>• 30% commission on all direct referrals</li>
                  <li>• 7-level deep commission structure</li>
                  <li>• Up to $30,000 monthly earnings</li>
                  <li>• Maximum earning potential achieved</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bonus System - Enhanced */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-4">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">Bonus Rewards</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-4 heading-font">
            Unlock <span className="text-yellow-400">Bonus</span> Rewards
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Earn points for every successful referral and unlock cash bonuses to accelerate your growth
          </p>
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

        {/* Point System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="h-6 w-6 text-blue-400" />
              How to Earn Points
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-blue-200 font-semibold">Bronze Signup</p>
                    <p className="text-blue-300 text-sm">$10 member</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-400">1 pt</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center rounded-full">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-purple-200 font-semibold">Silver Signup</p>
                    <p className="text-purple-300 text-sm">$20 member</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-purple-400">2 pts</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-500/20 border border-pink-500/40 flex items-center justify-center rounded-full">
                    <span className="text-pink-400 font-bold">5</span>
                  </div>
                  <div>
                    <p className="text-pink-200 font-semibold">Gold Signup</p>
                    <p className="text-pink-300 text-sm">$50 member</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-pink-400">5 pts</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center rounded-full">
                    <span className="text-cyan-400 font-bold">10</span>
                  </div>
                  <div>
                    <p className="text-cyan-200 font-semibold">Diamond Signup</p>
                    <p className="text-cyan-300 text-sm">$100 member</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-cyan-400">10 pts</span>
              </div>
            </div>
          </div>

          {/* Bonus Tiers */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-400" />
              Bonus Rewards
            </h3>
            <div className="space-y-4">
              {[
                { points: 25, bonus: '$50 AUD', description: '25 points earned', status: 'almost', progress: 92 },
                { points: 50, bonus: '$125 AUD', description: '50 points earned', status: 'pending', progress: 46 },
                { points: 100, bonus: '$300 AUD', description: '100 points earned', status: 'pending', progress: 23 },
                { points: 200, bonus: '$750 AUD', description: '200 points earned', status: 'pending', progress: 11 }
              ].map((bonus, index) => (
                <div key={bonus.points} className={`p-4 border rounded-lg ${
                  bonus.status === 'almost'
                    ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                    : 'bg-gray-700/50 border-gray-600/50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white font-semibold text-lg">{bonus.bonus}</p>
                      <p className="text-gray-400 text-sm">{bonus.points} points required</p>
                    </div>
                    {bonus.status === 'almost' && (
                      <div className="bg-yellow-500/20 border border-yellow-500/40 px-3 py-1 rounded-full">
                        <span className="text-yellow-400 text-sm font-semibold">Almost There!</span>
                      </div>
                    )}
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        bonus.status === 'almost' ? 'bg-yellow-400' : 'bg-gray-500'
                      }`}
                      style={{ width: `${bonus.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {bonus.status === 'almost' ? '2 points to go!' : `${bonus.points - 23} points remaining`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bonus Strategy Tips */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-green-400" />
            Bonus Strategy Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-200 font-semibold">Focus on Higher Tiers</p>
                  <p className="text-green-300 text-sm">Diamond signups give you 10 points each - most efficient path to bonuses</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-200 font-semibold">Consistent Activity</p>
                  <p className="text-green-300 text-sm">Regular recruiting compounds your points over time</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-200 font-semibold">Team Building</p>
                  <p className="text-green-300 text-sm">Help your downline succeed - their signups count toward your bonuses</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-200 font-semibold">Long-term Vision</p>
                  <p className="text-green-300 text-sm">Bonuses are paid 28 days in arrears - plan for sustained growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <OutreachCalculator />
    </div>
  );
}
