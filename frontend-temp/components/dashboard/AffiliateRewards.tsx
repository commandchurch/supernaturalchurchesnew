import React, { useState } from 'react';

import { Crown, Star, Target, Gem, AlertCircle, DollarSign, Users, TrendingUp, CheckCircle } from 'lucide-react';
import OutreachCalculator from '../outreach/OutreachCalculator';

export default function AffiliateRewards() {
  // Mock outreach stats
  const stats = {
    weeklyEarnings: 150,
    totalEarnings: 1250,
    referralCount: 8,
    rank: 'Silver'
  };
  
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
  const currentMembership = 'BRONZE'; // BRONZE, SILVER, GOLD, DIAMOND

  const membershipCommissionPlans = {
    BRONZE: {
      name: 'BRONZE',
      icon: Target,
      color: 'text-bronze-400',
      bgColor: 'bg-gray-600',
      commissionRate: 20,
      maxEarnings: 1000,
      price: 19,
      levels: [
        { level: 1, percentage: 20, description: 'Direct Referrals' }
      ]
    },
    SILVER: {
      name: 'SILVER',
      icon: Star,
      color: 'text-gray-300',
      bgColor: 'bg-gray-400',
      commissionRate: 20,
      maxEarnings: 3000,
      price: 33,
      levels: [
        { level: 1, percentage: 20, description: 'Direct Referrals' },
        { level: 2, percentage: 10, description: 'Second Generation' }
      ]
    },
    GOLD: {
      name: 'GOLD',
      icon: Crown,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-600',
      commissionRate: 20,
      maxEarnings: 5000,
      price: 149,
      levels: [
        { level: 1, percentage: 20, description: 'Direct Referrals' },
        { level: 2, percentage: 10, description: 'Second Generation' },
        { level: 3, percentage: 5, description: 'Third Generation' },
        { level: 4, percentage: 3, description: 'Fourth Generation' },
        { level: 5, percentage: 2, description: 'Fifth Generation' }
      ]
    },
    DIAMOND: {
      name: 'DIAMOND',
      icon: Gem,
      color: 'text-purple-400',
      bgColor: 'bg-purple-600',
      commissionRate: 20,
      maxEarnings: 10000,
      price: 499,
      levels: [
        { level: 1, percentage: 20, description: 'Direct Referrals' },
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-white">${stats?.totalEarnings?.toFixed(2) || '0.00'}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Direct Referrals</p>
              <p className="text-2xl font-bold text-white">{stats?.referralCount || 0}</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{currentPlan.name} Membership</p>
              <p className="text-2xl font-bold text-white">{currentPlan.commissionRate}%</p>
              <p className="text-xs text-gray-500">Max: ${currentPlan.maxEarnings}/month</p>
            </div>
            <div className="flex items-center gap-2">
              {React.createElement(currentPlan.icon, { className: `h-8 w-8 ${currentPlan.color}` })}
            </div>
          </div>
        </div>
      </div>

      {/* Your Current Plan */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          {React.createElement(currentPlan.icon, { className: `h-6 w-6 ${currentPlan.color}` })}
          <h2 className="text-2xl font-black text-white heading-font">
            Your {currentPlan.name} Commission Plan
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Current Plan Benefits</span>
              </div>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• {currentPlan.levels.length} commission level{currentPlan.levels.length > 1 ? 's' : ''}</li>
                <li>• Up to ${currentPlan.maxEarnings} AUD monthly earnings</li>
                <li>• {currentPlan.commissionRate}% commission on direct referrals</li>
                <li>• Real-time tracking and reporting</li>
              </ul>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                <span className="text-white font-semibold">Upgrade Benefits</span>
              </div>
              <p className="text-orange-100 text-sm">
                Upgrade your membership to unlock additional commission levels and higher monthly earning caps.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Your Commission Structure</h3>
            <div className="space-y-3">
              {currentPlan.levels.map((level, index) => (
                <div key={level.level} className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
                      {level.level}
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm">Level {level.level}</span>
                      <p className="text-gray-400 text-xs">{level.description}</p>
                    </div>
                  </div>
                  <span className="text-white font-bold">{level.percentage}%</span>
                </div>
              ))}
              
              {/* Show locked levels for upgrade motivation */}
              {currentPlan.levels.length < 7 && (
                <>
                  {currentPlan.levels.length < 2 && (
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 border border-gray-600 opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-600 border border-gray-500 flex items-center justify-center text-sm font-bold text-gray-400">
                          🔒
                        </div>
                        <div>
                          <span className="text-gray-400 font-semibold text-sm">Level 2</span>
                          <p className="text-gray-500 text-xs">Unlock with SILVER</p>
                        </div>
                      </div>
                      <span className="text-gray-400 font-bold">10%</span>
                    </div>
                  )}
                  {currentPlan.levels.length < 5 && (
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 border border-gray-600 opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-600 border border-gray-500 flex items-center justify-center text-sm font-bold text-gray-400">
                          🔒
                        </div>
                        <div>
                          <span className="text-gray-400 font-semibold text-sm">Levels 3-5</span>
                          <p className="text-gray-500 text-xs">Unlock with GOLD</p>
                        </div>
                      </div>
                      <span className="text-gray-400 font-bold">5%, 3%, 2%</span>
                    </div>
                  )}
                  {currentPlan.levels.length < 7 && (
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 border border-gray-600 opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-600 border border-gray-500 flex items-center justify-center text-sm font-bold text-gray-400">
                          🔒
                        </div>
                        <div>
                          <span className="text-gray-400 font-semibold text-sm">Levels 6-7</span>
                          <p className="text-gray-500 text-xs">Unlock with DIAMOND</p>
                        </div>
                      </div>
                      <span className="text-gray-400 font-bold">1%, 1%</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* All Membership Plans Comparison */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6">
        <h2 className="text-xl font-black text-white mb-6 heading-font">
          Commission Plans by Membership
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(membershipCommissionPlans).map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = plan.name === currentMembership;
            
            return (
              <div key={plan.name} className={`bg-white/5 border border-white/10 p-4 flex flex-col h-full ${isCurrentPlan ? 'ring-2 ring-orange-500' : ''}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 ${plan.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 text-white`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{plan.name}</h3>
                    {isCurrentPlan && (
                      <span className="text-xs text-orange-400">Current Plan</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 flex-grow">
                  <div className="text-xs text-gray-400">Commission Levels:</div>
                  {plan.levels.map((level) => (
                    <div key={level.level} className="flex justify-between text-xs">
                      <span className="text-gray-300">Level {level.level}</span>
                      <span className="text-white font-semibold">{level.percentage}%</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-lg font-black text-white">${plan.price}</div>
                  <div className="text-xs text-gray-400 mb-2">per 28 days</div>
                  <div className="text-sm font-semibold text-green-400">${plan.maxEarnings}</div>
                  <div className="text-xs text-gray-400">monthly cap</div>
                </div>
                
                <div className="mt-auto">
                  {!isCurrentPlan ? (
                    <button className="w-full bg-orange-500 text-white hover:bg-orange-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide">
                      UPGRADE
                    </button>
                  ) : (
                    <div className="w-full bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-center">
                      CURRENT PLAN
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calculator Section */}
      <OutreachCalculator />
    </div>
  );
}
