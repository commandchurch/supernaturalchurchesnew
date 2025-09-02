import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Users, TrendingUp, Crown, Star, Target, Zap, Calculator } from 'lucide-react';

export default function CompensationPlan() {
  const [selectedTier, setSelectedTier] = useState<'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND'>('BRONZE');
  const [referrals, setReferrals] = useState({
    level1: 1,
    level2: 1,
    level3: 1,
    level4: 1,
    level5: 1
  });

  const getCommissionData = (tier: string, level: number) => {
    const membershipPrices = { 'BRONZE': 10, 'SILVER': 20, 'GOLD': 50, 'DIAMOND': 100 };
    // 30% commission for level 1 only, standard rates for other levels
    const rates = level === 1 ? 0.30 : [0, 0.10, 0.05, 0.03, 0.02, 0.01, 0.01][level - 1];
    const price = membershipPrices[tier as keyof typeof membershipPrices];
    return (price * rates).toFixed(2);
  };

  const getMaxLevel = (tier: string) => {
    switch (tier) {
      case 'BRONZE': return 1;
      case 'SILVER': return 2;
      case 'GOLD': return 5;
      case 'DIAMOND': return 7;
      default: return 1;
    }
  };

  const calculateTotalEarnings = () => {
    const maxLevel = getMaxLevel(selectedTier);
    let total = 0;

    for (let level = 1; level <= maxLevel; level++) {
      const referralCount = referrals[`level${level}` as keyof typeof referrals];
      const commissionPerReferral = parseFloat(getCommissionData(selectedTier, level));
      total += referralCount * commissionPerReferral;
    }

    return total.toFixed(2);
  };

  const handleReferralChange = (level: number, value: number) => {
    setReferrals(prev => ({
      ...prev,
      [`level${level}`]: Math.max(0, value)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/dashboard/affiliate-rewards" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Affiliate Rewards
        </Link>

        <h1 className="text-4xl font-black text-white mb-4 heading-font">
          Supernatural Institute Compensation Plan
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Complete guide to our 7-level affiliate commission structure with bootstrap-friendly pricing
        </p>

        {/* Bootstrap Launch Banner */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
              <span className="text-blue-400 text-lg">🚀</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Bootstrap Launch Pricing</h3>
              <p className="text-blue-200 text-sm">Special introductory pricing with fast and reliable payments</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">$10</div>
              <div className="text-xs text-gray-400">Bronze</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">$20</div>
              <div className="text-xs text-gray-400">Silver</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-pink-400">$50</div>
              <div className="text-xs text-gray-400">Gold</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">$100</div>
              <div className="text-xs text-gray-400">Diamond</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Overview */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Bootstrap Launch Strategy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 bg-green-500/20 border border-green-500/40 flex items-center justify-center rounded-full">
                <span className="text-green-400 text-sm">💰</span>
              </div>
              <h3 className="text-green-400 font-semibold">Fast & Reliable Payments</h3>
            </div>
            <p className="text-green-200 text-sm">Get paid quickly and reliably for your referrals.</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
                <span className="text-blue-400 text-sm">📈</span>
              </div>
              <h3 className="text-blue-400 font-semibold">Sustainable Growth</h3>
            </div>
            <p className="text-blue-200 text-sm">Gradual price increases as your business scales.</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center rounded-full">
                <span className="text-purple-400 text-sm">🎯</span>
              </div>
              <h3 className="text-purple-400 font-semibold">Legal Compliance</h3>
            </div>
            <p className="text-purple-200 text-sm">Australian Consumer Law compliant with proper cooling-off periods.</p>
          </div>
        </div>

        <div className="bg-gray-700/30 p-4 rounded-lg">
           <h3 className="text-white font-semibold mb-2">How Commissions Work:</h3>
           <div className="text-gray-300 text-sm space-y-1">
             <p>• <strong>Level 1:</strong> 30% commission on direct referrals for all tiers</p>
             <p>• <strong>Levels 2-7:</strong> Standard rates (10%, 5%, 3%, 2%, 1%, 1%)</p>
             <p>• <strong>Free → Bronze:</strong> Sign up 2 Bronze members to earn Level 1 commissions</p>
             <p>• <strong>Free Members:</strong> Still build your network - you earn from their recruits!</p>
             <p>• <strong>Payout Timing:</strong> Commissions paid quickly and reliably</p>
             <p>• <strong>Point System:</strong> Earn points for bonuses based on recruitment milestones</p>
           </div>
         </div>
      </div>

      {/* Commission Structure */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-6 w-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Commission Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Users className="h-12 w-12 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Recruit Members</h3>
            <p className="text-gray-300 text-sm">Share your referral link and help others join the Supernatural Institute</p>
          </div>

          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Build Your Network</h3>
            <p className="text-gray-300 text-sm">Earn commissions from 7 levels deep as your network grows</p>
          </div>

          <div className="text-center">
            <DollarSign className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Get Paid</h3>
            <p className="text-gray-300 text-sm">Receive monthly payouts for all active members in your network</p>
          </div>
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Membership Tiers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'BRONZE',
              price: '$9.95/month',
              color: 'blue',
              levels: 'Levels 1',
              bonus: '20% Level 1',
              maxEarnings: '$1.99/month'
            },
            {
              name: 'SILVER',
              price: '$19.95/month',
              color: 'purple',
              levels: 'Levels 1-2',
              bonus: '20% Level 1, 10% Level 2',
              maxEarnings: '$3.99/month'
            },
            {
              name: 'GOLD',
              price: '$39.95/month',
              color: 'pink',
              levels: 'Levels 1-5',
              bonus: '20% L1, 10% L2, 5% L3, 3% L4, 2% L5',
              maxEarnings: '$11.98/month'
            },
            {
              name: 'DIAMOND',
              price: '$79.95/month',
              color: 'cyan',
              levels: 'Levels 1-7',
              bonus: '35% L1, 10% L2, 5% L3, 3% L4, 2% L5, 1% L6, 1% L7',
              maxEarnings: '$23.98/month'
            }
          ].map((tier) => (
            <div key={tier.name} className={`bg-${tier.color}-500/10 border border-${tier.color}-500/30 p-4 rounded-lg relative`}>
              {tier.name === 'DIAMOND' && (
                <div className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs px-2 py-1 rounded font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-xl font-bold text-${tier.color}-400 mb-2`}>{tier.name}</h3>
              <p className="text-white font-semibold text-lg mb-1">{tier.price}</p>
              <p className="text-green-400 font-semibold text-sm mb-2">Max: {tier.maxEarnings}</p>
              <p className="text-gray-300 text-sm mb-2">{tier.levels}</p>
              <p className="text-gray-400 text-xs leading-tight">{tier.bonus}</p>

              {/* Fast Payment Badge */}
              <div className="mt-3 bg-green-500/20 border border-green-500/40 rounded px-2 py-1">
                <span className="text-green-400 text-xs font-semibold">⚡ Fast Payments</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Levels */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Commission Levels</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Commission Rates by Level</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                <span className="text-gray-300">Level 1 (Direct)</span>
                <span className="text-green-400 font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Level 2</span>
                <span className="text-green-400 font-semibold">10%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Level 3</span>
                <span className="text-green-400 font-semibold">5%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Levels 4-7</span>
                <span className="text-green-400 font-semibold">3%, 2%, 1%, 1%</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Commission Access by Tier</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                <span className="text-gray-300">All Paid Tiers</span>
                <span className="text-green-400 font-semibold">30% Level 1</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <span className="text-gray-300">Free → Bronze Access</span>
                <span className="text-yellow-400 font-semibold">30% Level 1 Earnings</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Free Tier</span>
                <span className="text-blue-400 font-semibold">Builds Your Network!</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Silver Status</span>
                <span className="text-green-400 font-semibold">Full Commissions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
           <p className="text-blue-400 text-sm">
             💎 <strong>Equal Opportunity:</strong> All members earn 30% commission on all referrals. No special rates - everyone has the same earning potential!
           </p>
         </div>
      </div>

      {/* Commission Structure */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="h-6 w-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Commission Structure</h2>
        </div>

        {/* Tier Selection Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-white font-semibold mr-2">Select Tier:</span>
          {['BRONZE', 'SILVER', 'GOLD', 'DIAMOND'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier as any)}
              className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
                selectedTier === tier
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* All Tiers Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { tier: 'BRONZE', price: '$10', maxEarnings: '$3/month', color: 'blue' },
            { tier: 'SILVER', price: '$20', maxEarnings: '$6/month', color: 'purple' },
            { tier: 'GOLD', price: '$50', maxEarnings: '$15/month', color: 'pink' },
            { tier: 'DIAMOND', price: '$100', maxEarnings: '$30/month', color: 'cyan' }
          ].map(({ tier, price, maxEarnings, color }) => (
            <div key={tier} className={`bg-${color}-500/10 border border-${color}-500/30 p-4 rounded-lg`}>
              <h3 className={`text-xl font-bold text-${color}-400 mb-2`}>{tier}</h3>
              <p className="text-white font-semibold text-lg mb-1">{price}/month</p>
              <p className="text-green-400 font-semibold text-sm mb-2">Max: {maxEarnings}</p>
              <p className="text-gray-400 text-xs">Round Pricing</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-white font-semibold">Level</th>
                <th className="text-center py-3 px-4 text-white font-semibold">Commission Rate</th>
                <th className="text-center py-3 px-4 text-white font-semibold">{selectedTier} (${{ 'BRONZE': 10, 'SILVER': 20, 'GOLD': 50, 'DIAMOND': 100 }[selectedTier]})</th>
              </tr>
            </thead>
            <tbody>
                  {[1, 2, 3, 4, 5, 6, 7].map((level) => {
                    const maxLevel = getMaxLevel(selectedTier);
                    const isLocked = level > maxLevel;
                    const rates = level === 1 ? 0.30 : [0, 0.10, 0.05, 0.03, 0.02, 0.01, 0.01][level - 1];
                    const commission = isLocked ? 'LOCKED' : `$${getCommissionData(selectedTier, level)} AUD`;
   
                    return (
                      <tr key={level} className={level % 2 === 0 ? 'bg-gray-700/30' : ''}>
                        <td className="py-3 px-4 text-white font-semibold">Level {level}</td>
                        <td className="py-3 px-4 text-center text-gray-300">
                          {(rates * 100).toFixed(0)}%
                        </td>
                        <td className={`py-3 px-4 text-center font-semibold ${isLocked ? 'text-gray-500' : 'text-green-400'}`}>
                          {commission}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {/* Selected Tier Summary */}
        <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">{selectedTier} Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-300">Monthly Fee:</span>
              <span className="text-white font-semibold ml-2">
                ${{ 'BRONZE': 10, 'SILVER': 20, 'GOLD': 50, 'DIAMOND': 100 }[selectedTier]} AUD
              </span>
            </div>
            <div>
              <span className="text-gray-300">Active Levels:</span>
              <span className="text-white font-semibold ml-2">1-{getMaxLevel(selectedTier)}</span>
            </div>
            <div>
              <span className="text-gray-300">Max Commission:</span>
              <span className="text-green-400 font-semibold ml-2">
                ${[1, 2, 3, 4, 5, 6, 7].slice(0, getMaxLevel(selectedTier)).reduce((sum, level) =>
                  sum + parseFloat(getCommissionData(selectedTier, level)), 0
                ).toFixed(2)} AUD/month
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Earnings Calculator */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="h-6 w-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Live Earnings Calculator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculator Inputs */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Build Your Network</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Membership Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value as any)}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded"
                >
                  <option value="BRONZE">Bronze - $10/month</option>
                  <option value="SILVER">Silver - $20/month</option>
                  <option value="GOLD">Gold - $50/month</option>
                  <option value="DIAMOND">Diamond - $100/month</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 1 Referrals</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level1}
                    onChange={(e) => handleReferralChange(1, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 2 Referrals</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level2}
                    onChange={(e) => handleReferralChange(2, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 3</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level3}
                    onChange={(e) => handleReferralChange(3, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 4</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level4}
                    onChange={(e) => handleReferralChange(4, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 5</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level5}
                    onChange={(e) => handleReferralChange(5, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Results */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Your Monthly Earnings</h3>

            <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  ${[1, 2, 3, 4, 5].reduce((sum, level) =>
                    sum + parseFloat(getCommissionData(selectedTier, level)), 0
                  ).toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Monthly Commission Potential</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Level 1 (1 referral):</span>
                <span className="text-green-400 font-semibold">${getCommissionData(selectedTier, 1)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Level 2 (1 referral):</span>
                <span className="text-green-400 font-semibold">${getCommissionData(selectedTier, 2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Level 3 (1 referral):</span>
                <span className="text-green-400 font-semibold">${getCommissionData(selectedTier, 3)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Level 4 (1 referral):</span>
                <span className="text-green-400 font-semibold">${getCommissionData(selectedTier, 4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Level 5 (1 referral):</span>
                <span className="text-green-400 font-semibold">${getCommissionData(selectedTier, 5)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
              <p className="text-blue-200 text-sm">
                💡 <strong>Pro Tip:</strong> This calculator shows earnings from just 1 referral per level.
                Real earnings grow exponentially as your network expands!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus System */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Star className="h-6 w-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Bonus System</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Point System</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Bronze Signup</span>
                <span className="text-blue-400 font-semibold">1 Point</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Silver Signup</span>
                <span className="text-purple-400 font-semibold">2 Points</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Gold Signup</span>
                <span className="text-pink-400 font-semibold">5 Points</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Diamond Signup</span>
                <span className="text-cyan-400 font-semibold">10 Points</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Bonus Tiers</h3>
            <div className="space-y-3">
              {[
                { points: 25, bonus: '$50 AUD', description: '25 Bronze signups' },
                { points: 50, bonus: '$125 AUD', description: '50 Silver signups' },
                { points: 100, bonus: '$300 AUD', description: '100 Gold signups' },
                { points: 200, bonus: '$750 AUD', description: '100 Diamond signups' }
              ].map((bonus) => (
                <div key={bonus.points} className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                  <span className="text-gray-300">{bonus.points} Points</span>
                  <span className="text-green-400 font-semibold">{bonus.bonus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
           <p className="text-yellow-400 text-sm">
             💰 <strong>Bonus Calculation:</strong> Bonuses are paid 28 days in arrears after reaching the point threshold. Points accumulate from successful member signups in your network.
           </p>
         </div>

         {/* Tithing Encouragement */}
         <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
           <div className="flex items-center gap-2 mb-2">
             <span className="text-purple-400 text-lg">🙏</span>
             <h4 className="text-purple-400 font-semibold">Cheerful Giving</h4>
           </div>
           <p className="text-purple-200 text-sm mb-2">
             "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
           </p>
           <p className="text-purple-200 text-sm">
             Consider cheerfully giving 10% of your earnings back to God. This is the only time in Scripture where God invites us to test Him with our giving!
           </p>
         </div>
      </div>

      {/* Payment Information */}
      <div className="bg-blue-500/10 border border-blue-500/30 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-6 w-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Payment Information</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">⚡ Fast & Reliable Payments</h3>
            <p className="text-gray-300">Get paid quickly and reliably for your successful referrals. Commissions processed efficiently.</p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Payout Schedule</h3>
            <p className="text-gray-300">Bootstrap Phase: Weekly payouts after refund periods. Scale Phase: Monthly on the 15th.</p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Australian Payments</h3>
            <p className="text-gray-300">
              Direct deposit to Australian bank accounts via BSB/ACC. Fast, secure, and reliable.
            </p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">International Payments</h3>
            <p className="text-gray-300">
              USDT (Tether) via TRX network for international affiliates. Low fees, fast transactions.
            </p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Minimum Payout</h3>
            <p className="text-gray-300">Bootstrap: $5 AUD minimum. Scale Phase: $10 AUD minimum. No maximum limits!</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <h3 className="text-green-400 font-semibold mb-2">💰 Bootstrap Advantage</h3>
            <p className="text-green-200 text-sm">
              Lower minimum payout threshold during launch phase to ensure affiliates get paid quickly and stay motivated!
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-green-500/10 border border-green-500/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-6 w-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Getting Started</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">1️⃣</div>
            <h3 className="text-lg font-semibold text-white mb-2">Join a Membership</h3>
            <p className="text-gray-300 text-sm">Choose Bronze, Silver, Gold, or Diamond membership</p>
          </div>

          <div className="text-center">
            <div className="text-2xl mb-2">2️⃣</div>
            <h3 className="text-lg font-semibold text-white mb-2">Share Your Link</h3>
            <p className="text-gray-300 text-sm">Get your unique referral link from the dashboard</p>
          </div>

          <div className="text-center">
            <div className="text-2xl mb-2">3️⃣</div>
            <h3 className="text-lg font-semibold text-white mb-2">Earn Commissions</h3>
            <p className="text-gray-300 text-sm">Watch your network grow and commissions roll in</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/dashboard/affiliate-rewards"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            <Calculator className="h-5 w-5" />
            Use Live Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}