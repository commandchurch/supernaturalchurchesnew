import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Users, DollarSign, Crown, Trophy, Target, Zap, ChevronRight, Star, Lock, ArrowUp, Eye, EyeOff, Share2, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CalculatorInputs {
  membershipTier: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
  directReferrals: number;
  level2Referrals: number;
  level3Referrals: number;
  level4Referrals: number;
  level5Referrals: number;
  level6Referrals: number;
  level7Referrals: number;
}

interface CalculatorResults {
  directCommission: number;
  level2Commission: number;
  level3Commission: number;
  level4Commission: number;
  level5Commission: number;
  level6Commission: number;
  level7Commission: number;
  totalCommission: number;
  totalPoints: number;
  nextBonus: string;
  potentialEarnings: {
    silverUpgrade: number;
    goldUpgrade: number;
    diamondUpgrade: number;
  };
}

export default function CommissionCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    membershipTier: 'BRONZE',
    directReferrals: 1,
    level2Referrals: 1,
    level3Referrals: 1,
    level4Referrals: 1,
    level5Referrals: 1,
    level6Referrals: 1,
    level7Referrals: 1,
  });

  // Mock current earnings data (in real app, this would come from API)
  const [currentEarnings, setCurrentEarnings] = useState({
    thisMonth: 247.50,
    totalPoints: 23,
    nextBonus: { amount: 200, pointsNeeded: 2, currentPoints: 23 },
    nextPayout: 'Dec 15, 2024',
    totalMembers: 15,
    achievements: ['First Referral', '5 Referrals']
  });

  // Social sharing state
  const [shareModal, setShareModal] = useState<{name: string, icon: string, description: string} | null>(null);

  // Commission rates for each level (1-7): 20%, 10%, 5%, 3%, 2%, 1%, 1%
  const commissionRates = [0.20, 0.10, 0.05, 0.03, 0.02, 0.01, 0.01];

  // Membership prices
  const membershipPrices = {
    'BRONZE': 20,
    'SILVER': 35,
    'GOLD': 150,
    'DIAMOND': 500
  };

  // Points per signup for each tier
  const tierPoints = {
    'BRONZE': 1,
    'SILVER': 2,
    'GOLD': 5,
    'DIAMOND': 10
  };

  // Get maximum level accessible for current tier
  const getMaxLevelForTier = (tier: string) => {
    switch (tier) {
      case 'BRONZE': return 1;
      case 'SILVER': return 2;
      case 'GOLD': return 5;
      case 'DIAMOND': return 7;
      default: return 1;
    }
  };

  const calculateResults = (): CalculatorResults => {
    const pointsPerSignup = tierPoints[inputs.membershipTier];
    const membershipPrice = membershipPrices[inputs.membershipTier];

    // Diamond gets 35% on level 1, others get 20%
    const level1Rate = inputs.membershipTier === 'DIAMOND' ? 0.35 : 0.20;

    const directCommission = inputs.directReferrals * membershipPrice * level1Rate;
    const level2Commission = inputs.level2Referrals * membershipPrice * commissionRates[0];
    const level3Commission = inputs.level3Referrals * membershipPrice * commissionRates[1];
    const level4Commission = inputs.level4Referrals * membershipPrice * commissionRates[2];
    const level5Commission = inputs.level5Referrals * membershipPrice * commissionRates[3];
    const level6Commission = inputs.level6Referrals * membershipPrice * commissionRates[4];
    const level7Commission = inputs.level7Referrals * membershipPrice * commissionRates[5];

    const totalCommission = directCommission + level2Commission + level3Commission +
                           level4Commission + level5Commission + level6Commission + level7Commission;

    const totalPoints = (inputs.directReferrals + inputs.level2Referrals + inputs.level3Referrals +
                        inputs.level4Referrals + inputs.level5Referrals + inputs.level6Referrals +
                        inputs.level7Referrals) * pointsPerSignup;

    let nextBonus = '';
    if (totalPoints >= 200) {
      nextBonus = '$5,000 bonus (200 points)';
    } else if (totalPoints >= 100) {
      nextBonus = '$2,500 bonus (100 points)';
    } else if (totalPoints >= 50) {
      nextBonus = '$500 bonus (50 points)';
    } else if (totalPoints >= 25) {
      nextBonus = '$200 bonus (25 points)';
    } else {
      nextBonus = '$200 bonus (25 points needed)';
    }

    // Calculate potential earnings with upgrades
    const calculateUpgradeEarnings = (upgradeTier: keyof typeof membershipPrices) => {
      const upgradePrice = membershipPrices[upgradeTier];
      const upgradeMaxLevel = getMaxLevelForTier(upgradeTier);
      const upgradeLevel1Rate = upgradeTier === 'DIAMOND' ? 0.35 : 0.20;

      // Only calculate for levels accessible in the upgrade tier
      const upgradeDirectCommission = inputs.directReferrals * upgradePrice * upgradeLevel1Rate;
      const upgradeLevel2Commission = upgradeMaxLevel >= 2 ? inputs.level2Referrals * upgradePrice * commissionRates[0] : 0;
      const upgradeLevel3Commission = upgradeMaxLevel >= 3 ? inputs.level3Referrals * upgradePrice * commissionRates[1] : 0;
      const upgradeLevel4Commission = upgradeMaxLevel >= 4 ? inputs.level4Referrals * upgradePrice * commissionRates[2] : 0;
      const upgradeLevel5Commission = upgradeMaxLevel >= 5 ? inputs.level5Referrals * upgradePrice * commissionRates[3] : 0;
      const upgradeLevel6Commission = upgradeMaxLevel >= 6 ? inputs.level6Referrals * upgradePrice * commissionRates[4] : 0;
      const upgradeLevel7Commission = upgradeMaxLevel >= 7 ? inputs.level7Referrals * upgradePrice * commissionRates[5] : 0;

      return upgradeDirectCommission + upgradeLevel2Commission + upgradeLevel3Commission +
             upgradeLevel4Commission + upgradeLevel5Commission + upgradeLevel6Commission + upgradeLevel7Commission;
    };

    const potentialEarnings = {
      silverUpgrade: inputs.membershipTier === 'BRONZE' ? calculateUpgradeEarnings('SILVER') : 0,
      goldUpgrade: inputs.membershipTier === 'BRONZE' || inputs.membershipTier === 'SILVER' ? calculateUpgradeEarnings('GOLD') : 0,
      diamondUpgrade: inputs.membershipTier !== 'DIAMOND' ? calculateUpgradeEarnings('DIAMOND') : 0
    };

    return {
      directCommission,
      level2Commission,
      level3Commission,
      level4Commission,
      level5Commission,
      level6Commission,
      level7Commission,
      totalCommission,
      totalPoints,
      nextBonus,
      potentialEarnings
    };
  };

  const results = calculateResults();
  const maxLevel = getMaxLevelForTier(inputs.membershipTier);

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseInt(value) || 0 : value
    }));
  };

  // Social sharing functions
  const shareAchievement = (achievement: {name: string, icon: string, description: string}) => {
    setShareModal(achievement);
  };

  const shareToSocial = (platform: 'facebook' | 'twitter', achievement: {name: string, icon: string, description: string}) => {
    const baseUrl = window.location.origin;
    const referralLink = `${baseUrl}/register?ref=user123`; // Replace with actual referral link
    const message = `🎉 I just earned the "${achievement.name}" achievement in the Supernatural Institute Affiliate Program! ${achievement.description} Join me: ${referralLink}`;

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(message)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
    }

    setShareModal(null);
  };

  return (
    <div className="space-y-6">
      {/* CURRENT MONTH EARNINGS - TOP SECTION */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold text-white heading-font">Your Earnings Dashboard</h2>
              <p className="text-gray-400 text-sm">Current month performance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Next Payout</p>
            <p className="text-lg font-bold text-green-400">{currentEarnings.nextPayout}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="text-white font-semibold">This Month</span>
            </div>
            <p className="text-3xl font-bold text-green-400">${currentEarnings.thisMonth.toFixed(2)}</p>
          </div>

          <div className="bg-gray-800/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-400" />
              <span className="text-white font-semibold">Total Points</span>
            </div>
            <p className="text-3xl font-bold text-blue-400">{currentEarnings.totalPoints}</p>
          </div>

          <div className="bg-gray-800/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-purple-400" />
              <span className="text-white font-semibold">Team Members</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">{currentEarnings.totalMembers}</p>
          </div>

          <div className="bg-gray-800/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-semibold">Current Rank</span>
            </div>
            <p className="text-3xl font-bold text-yellow-400">{inputs.membershipTier}</p>
            <p className="text-xs text-gray-400">Level {getMaxLevelForTier(inputs.membershipTier)} Access</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            to="/legal/compensation-plan"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
          >
            📋 Read Full Compensation Plan
          </Link>
        </div>
      </div>

      {/* COMPREHENSIVE COMMISSION STRUCTURE - 4 TIER VIEW */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-yellow-400" />
          <div>
            <h3 className="text-xl font-bold text-white heading-font">Commission Structure by Tier</h3>
            <p className="text-gray-400 text-sm">Compare earnings across all membership tiers</p>
          </div>
        </div>

        {/* Tier Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { tier: 'BRONZE', color: 'blue', price: 20 },
            { tier: 'SILVER', color: 'purple', price: 35 },
            { tier: 'GOLD', color: 'pink', price: 150 },
            { tier: 'DIAMOND', color: 'cyan', price: 500 }
          ].map(({ tier, color, price }) => (
            <button
              key={tier}
              onClick={() => handleInputChange('membershipTier', tier)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                inputs.membershipTier === tier
                  ? `bg-${color}-600 text-white`
                  : `bg-${color}-500/20 text-${color}-400 border border-${color}-500/30 hover:bg-${color}-500/30`
              }`}
            >
              {tier} (${price}/mo)
            </button>
          ))}
        </div>

        {/* 4-Tier Commission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[
            {
              tier: 'BRONZE',
              price: 20,
              color: 'blue',
              bgColor: 'bg-blue-500/10',
              borderColor: 'border-blue-500/30',
              textColor: 'text-blue-400',
              levels: [
                { level: 1, rate: 0.20, earnings: '$4.00' },
                { level: 2, rate: 0.10, earnings: '$2.00' },
                { level: 3, rate: 0.05, earnings: '$1.00' },
                { level: 4, rate: 0.03, earnings: '$0.60' },
                { level: 5, rate: 0.02, earnings: '$0.40' },
                { level: 6, rate: 0.01, earnings: '$0.20' },
                { level: 7, rate: 0.01, earnings: '$0.20' }
              ]
            },
            {
              tier: 'SILVER',
              price: 35,
              color: 'purple',
              bgColor: 'bg-purple-500/10',
              borderColor: 'border-purple-500/30',
              textColor: 'text-purple-400',
              levels: [
                { level: 1, rate: 0.20, earnings: '$7.00' },
                { level: 2, rate: 0.10, earnings: '$3.50' },
                { level: 3, rate: 0.05, earnings: '$1.75' },
                { level: 4, rate: 0.03, earnings: '$1.05' },
                { level: 5, rate: 0.02, earnings: '$0.70' },
                { level: 6, rate: 0.01, earnings: '$0.35' },
                { level: 7, rate: 0.01, earnings: '$0.35' }
              ]
            },
            {
              tier: 'GOLD',
              price: 150,
              color: 'pink',
              bgColor: 'bg-pink-500/10',
              borderColor: 'border-pink-500/30',
              textColor: 'text-pink-400',
              levels: [
                { level: 1, rate: 0.20, earnings: '$30.00' },
                { level: 2, rate: 0.10, earnings: '$15.00' },
                { level: 3, rate: 0.05, earnings: '$7.50' },
                { level: 4, rate: 0.03, earnings: '$4.50' },
                { level: 5, rate: 0.02, earnings: '$3.00' },
                { level: 6, rate: 0.01, earnings: '$1.50' },
                { level: 7, rate: 0.01, earnings: '$1.50' }
              ]
            },
            {
              tier: 'DIAMOND',
              price: 500,
              color: 'cyan',
              bgColor: 'bg-cyan-500/10',
              borderColor: 'border-cyan-500/30',
              textColor: 'text-cyan-400',
              levels: [
                { level: 1, rate: 0.35, earnings: '$175.00' },
                { level: 2, rate: 0.10, earnings: '$50.00' },
                { level: 3, rate: 0.05, earnings: '$25.00' },
                { level: 4, rate: 0.03, earnings: '$15.00' },
                { level: 5, rate: 0.02, earnings: '$10.00' },
                { level: 6, rate: 0.01, earnings: '$5.00' },
                { level: 7, rate: 0.01, earnings: '$5.00' }
              ]
            }
          ].map(({ tier, price, color, bgColor, borderColor, textColor, levels }) => (
            <div key={tier} className={`${bgColor} ${borderColor} border p-4 rounded-lg`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-bold text-lg ${textColor}`}>{tier}</h4>
                <span className="text-white font-semibold">${price}/mo</span>
              </div>

              <div className="space-y-2">
                {levels.map(({ level, rate, earnings }) => (
                  <div key={level} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">
                      Level {level}: {(rate * 100).toFixed(0)}% of ${price}
                    </span>
                    <span className="text-green-400 font-semibold">{earnings}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total (1 per level):</span>
                  <span className="text-green-400 font-bold text-lg">
                    ${levels.reduce((sum, level) => sum + parseFloat(level.earnings.replace('$', '')), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Tier Highlight */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-green-400 font-semibold mb-1">
                🎯 Your Current Tier: {inputs.membershipTier} (${membershipPrices[inputs.membershipTier]}/mo)
              </h4>
              <p className="text-gray-300 text-sm">
                You earn from Levels 1-{maxLevel} with this tier
              </p>
            </div>
            {inputs.membershipTier !== 'DIAMOND' && (
              <Link
                to="/membership"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <ArrowUp className="h-4 w-4" />
                Upgrade for More
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* BONUS PROGRESS - EXPANDED */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold text-white heading-font">Bonus Progress</h3>
              <p className="text-gray-400 text-sm">Your journey to all rewards</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Points</p>
            <p className="text-2xl font-bold text-yellow-400">{currentEarnings.totalPoints}</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { name: '$200 Bonus', points: 25, color: 'from-green-500 to-blue-500', earned: currentEarnings.totalPoints >= 25 },
            { name: '$500 Bonus', points: 50, color: 'from-purple-500 to-pink-500', earned: currentEarnings.totalPoints >= 50 },
            { name: '$2,500 Bonus', points: 100, color: 'from-orange-500 to-red-500', earned: currentEarnings.totalPoints >= 100 },
            { name: '$5,000 Bonus', points: 200, color: 'from-cyan-500 to-blue-500', earned: currentEarnings.totalPoints >= 200 },
            { name: '$10,000 Bonus', points: 500, color: 'from-yellow-500 to-orange-500', earned: currentEarnings.totalPoints >= 500 },
            { name: '$25,000 Bonus', points: 1000, color: 'from-pink-500 to-purple-500', earned: currentEarnings.totalPoints >= 1000 }
          ].map((bonus) => (
            <div key={bonus.name} className={`p-3 border rounded-lg ${bonus.earned ? 'border-green-500/50 bg-green-500/10' : 'border-gray-600 bg-gray-700/30'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`font-semibold ${bonus.earned ? 'text-green-400' : 'text-white'}`}>{bonus.name}</span>
                <span className="text-gray-400 text-sm">
                  {Math.min(currentEarnings.totalPoints, bonus.points)}/{bonus.points} points
                  {bonus.earned && <span className="text-green-400 ml-2">✓ Earned!</span>}
                </span>
              </div>
              <div className="w-full bg-gray-700 h-3">
                <div
                  className={`h-3 transition-all duration-500 ${bonus.earned ? 'bg-gradient-to-r from-green-500 to-blue-500' : `bg-gradient-to-r ${bonus.color}`}`}
                  style={{ width: `${Math.min((currentEarnings.totalPoints / bonus.points) * 100, 100)}%` }}
                ></div>
              </div>
              {!bonus.earned && (
                <p className="text-xs text-gray-500 mt-1">
                  {bonus.points - currentEarnings.totalPoints} more points needed
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-400 text-sm">
            💰 <strong>International Payouts:</strong> All commissions for international members are paid in USDT via TRX network.
          </p>
        </div>

        <div className="mt-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-400 text-sm">
            🇦🇺 <strong>Australian Payments:</strong> All payments are done via BSB/ACC to an Australian bank account only.
          </p>
        </div>

        <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-400 text-sm">
            💵 <strong>Minimum Payout:</strong> Minimum payout threshold is $10 AUD equivalent per month.
          </p>
        </div>
      </div>

      {/* UPGRADE OPPORTUNITIES - Show what they're missing */}
      {inputs.membershipTier !== 'DIAMOND' && (
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-6 w-6 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold text-white heading-font">Upgrade Opportunities</h3>
              <p className="text-gray-400 text-sm">See what you're missing out on with higher tiers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inputs.membershipTier === 'BRONZE' && (
              <>
                <div className="bg-gray-700/50 p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Silver Upgrade</h4>
                  <p className="text-gray-300 text-sm mb-2">Unlock Levels 2-7</p>
                  <p className="text-green-400 font-bold text-lg">${results.potentialEarnings.silverUpgrade.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs">vs ${results.totalCommission.toFixed(2)} now</p>
                  <p className="text-green-400 text-sm font-semibold">+${(results.potentialEarnings.silverUpgrade - results.totalCommission).toFixed(2)} more!</p>
                </div>
                <div className="bg-gray-700/50 p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Gold Upgrade</h4>
                  <p className="text-gray-300 text-sm mb-2">Unlock Levels 3-7 + Coaching</p>
                  <p className="text-green-400 font-bold text-lg">${results.potentialEarnings.goldUpgrade.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs">vs ${results.totalCommission.toFixed(2)} now</p>
                  <p className="text-green-400 text-sm font-semibold">+${(results.potentialEarnings.goldUpgrade - results.totalCommission).toFixed(2)} more!</p>
                </div>
                <div className="bg-gray-700/50 p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Diamond Upgrade</h4>
                  <p className="text-gray-300 text-sm mb-2">35% Level 1 + All Levels</p>
                  <p className="text-green-400 font-bold text-lg">${results.potentialEarnings.diamondUpgrade.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs">vs ${results.totalCommission.toFixed(2)} now</p>
                  <p className="text-green-400 text-sm font-semibold">+${(results.potentialEarnings.diamondUpgrade - results.totalCommission).toFixed(2)} more!</p>
                </div>
              </>
            )}

            {inputs.membershipTier === 'SILVER' && (
              <>
                <div className="bg-gray-700/50 p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Gold Upgrade</h4>
                  <p className="text-gray-300 text-sm mb-2">Unlock Levels 3-7 + Coaching</p>
                  <p className="text-green-400 font-bold text-lg">${results.potentialEarnings.goldUpgrade.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs">vs ${results.totalCommission.toFixed(2)} now</p>
                  <p className="text-green-400 text-sm font-semibold">+${(results.potentialEarnings.goldUpgrade - results.totalCommission).toFixed(2)} more!</p>
                </div>
                <div className="bg-gray-700/50 p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Diamond Upgrade</h4>
                  <p className="text-gray-300 text-sm mb-2">35% Level 1 + All Levels</p>
                  <p className="text-green-400 font-bold text-lg">${results.potentialEarnings.diamondUpgrade.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs">vs ${results.totalCommission.toFixed(2)} now</p>
                  <p className="text-green-400 text-sm font-semibold">+${(results.potentialEarnings.diamondUpgrade - results.totalCommission).toFixed(2)} more!</p>
                </div>
                <div className="bg-gray-700/50 p-4 border border-gray-600 text-center">
                  <h4 className="text-white font-semibold mb-2">Current Earnings</h4>
                  <p className="text-blue-400 font-bold text-lg">${results.totalCommission.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">Your current potential</p>
                </div>
              </>
            )}

            {inputs.membershipTier === 'GOLD' && (
              <>
                <div className="bg-gray-700/50 p-4 border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Diamond Upgrade</h4>
                  <p className="text-gray-300 text-sm mb-2">35% Level 1 + All Levels</p>
                  <p className="text-green-400 font-bold text-lg">${results.potentialEarnings.diamondUpgrade.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs">vs ${results.totalCommission.toFixed(2)} now</p>
                  <p className="text-green-400 text-sm font-semibold">+${(results.potentialEarnings.diamondUpgrade - results.totalCommission).toFixed(2)} more!</p>
                </div>
                <div className="bg-gray-700/50 p-4 border border-gray-600 text-center">
                  <h4 className="text-white font-semibold mb-2">Current Earnings</h4>
                  <p className="text-blue-400 font-bold text-lg">${results.totalCommission.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">Your current potential</p>
                </div>
                <div className="bg-gray-700/50 p-4 border border-gray-600 text-center">
                  <Link to="/membership" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors inline-block">
                    Upgrade to Diamond
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}


      {/* LIVE EARNINGS CALCULATOR */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="h-6 w-6 text-green-400" />
          <div>
            <h3 className="text-xl font-bold text-white heading-font">Live Earnings Calculator</h3>
            <p className="text-gray-400 text-sm">Calculate your potential earnings with your current downline</p>
          </div>
        </div>

        {/* Tier Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-white font-semibold mr-2">Filter by Tier:</span>
          {['BRONZE', 'SILVER', 'GOLD', 'DIAMOND'].map((tier) => (
            <button
              key={tier}
              onClick={() => handleInputChange('membershipTier', tier)}
              className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                inputs.membershipTier === tier
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Calculator Inputs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Level 1 Referrals', field: 'directReferrals', unlocked: true },
            { label: 'Level 2 Referrals', field: 'level2Referrals', unlocked: maxLevel >= 2 },
            { label: 'Level 3 Referrals', field: 'level3Referrals', unlocked: maxLevel >= 3 },
            { label: 'Level 4 Referrals', field: 'level4Referrals', unlocked: maxLevel >= 4 },
            { label: 'Level 5 Referrals', field: 'level5Referrals', unlocked: maxLevel >= 5 },
            { label: 'Level 6 Referrals', field: 'level6Referrals', unlocked: maxLevel >= 6 },
            { label: 'Level 7 Referrals', field: 'level7Referrals', unlocked: maxLevel >= 7 }
          ].slice(0, 4).map(({ label, field, unlocked }) => (
            <div key={field}>
              <label className={`block text-sm mb-1 ${unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                {label}
                {!unlocked && <Lock className="inline h-3 w-3 ml-1" />}
              </label>
              <input
                type="number"
                min="0"
                value={inputs[field as keyof CalculatorInputs] as number}
                onChange={(e) => handleInputChange(field as keyof CalculatorInputs, e.target.value)}
                disabled={!unlocked}
                className={`w-full px-3 py-2 text-sm ${
                  unlocked
                    ? 'bg-gray-700 border border-gray-600 text-white'
                    : 'bg-gray-800/50 border border-gray-600/30 text-gray-600 cursor-not-allowed'
                }`}
                placeholder={unlocked ? "0" : "Locked"}
              />
            </div>
          ))}
        </div>

        {/* Live Calculation Results */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h4 className="text-white font-semibold mb-4">Your Live Earnings ({inputs.membershipTier})</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level Breakdown */}
            <div>
              <h5 className="text-gray-300 font-semibold mb-3">Commission Breakdown:</h5>
              <div className="space-y-2 text-sm">
                {[
                  { level: 1, rate: inputs.membershipTier === 'DIAMOND' ? 0.35 : 0.20, referrals: inputs.directReferrals },
                  { level: 2, rate: 0.10, referrals: inputs.level2Referrals, unlocked: maxLevel >= 2 },
                  { level: 3, rate: 0.05, referrals: inputs.level3Referrals, unlocked: maxLevel >= 3 },
                  { level: 4, rate: 0.03, referrals: inputs.level4Referrals, unlocked: maxLevel >= 4 },
                  { level: 5, rate: 0.02, referrals: inputs.level5Referrals, unlocked: maxLevel >= 5 },
                  { level: 6, rate: 0.01, referrals: inputs.level6Referrals, unlocked: maxLevel >= 6 },
                  { level: 7, rate: 0.01, referrals: inputs.level7Referrals, unlocked: maxLevel >= 7 }
                ].map(({ level, rate, referrals, unlocked = true }) => (
                  <div key={level} className={`flex justify-between ${!unlocked ? 'text-gray-600' : ''}`}>
                    <span>
                      Level {level}: {unlocked ? referrals : 0} × ${(membershipPrices[inputs.membershipTier] * rate).toFixed(2)} ({(rate * 100).toFixed(0)}%)
                      {!unlocked && ' (LOCKED)'}
                    </span>
                    <span className="text-green-400 font-semibold">
                      ${unlocked ? (referrals * membershipPrices[inputs.membershipTier] * rate).toFixed(2) : '0.00'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <h5 className="text-gray-300 font-semibold mb-3">Earnings Summary:</h5>
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-white font-semibold">Total Monthly Commission:</span>
                  <span className="text-green-400 font-bold">${results.totalCommission.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Total Points Earned:</span>
                  <span className="text-blue-400 font-semibold">{results.totalPoints}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Annual Earnings:</span>
                  <span className="text-green-400 font-semibold">${(results.totalCommission * 12).toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Next Bonus:</span>
                  <span className="text-yellow-400 font-semibold text-sm">{results.nextBonus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg mt-4">
          <h4 className="text-green-400 font-semibold mb-2">💡 Pro Tips for Maximum Earnings:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <ul className="space-y-1">
              <li>• <strong>Focus on Level 1:</strong> Direct referrals pay the most</li>
              <li>• <strong>Build depth:</strong> Help team members recruit others</li>
              <li>• <strong>Quality over quantity:</strong> Active members perform better</li>
            </ul>
            <ul className="space-y-1">
              <li>• <strong>Upgrade strategically:</strong> Higher tiers = more earnings</li>
              <li>• <strong>Consistent effort:</strong> Regular activity compounds</li>
              <li>• <strong>Train your team:</strong> Success creates more success</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS WITH SOCIAL SHARING */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Star className="h-6 w-6 text-yellow-400" />
          <div>
            <h3 className="text-xl font-bold text-white heading-font">Your Achievements</h3>
            <p className="text-gray-400 text-sm">Celebrate your milestones and share your success</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'First Referral', earned: true, icon: '🎯', description: 'Welcome to the team!' },
            { name: '5 Referrals', earned: true, icon: '⭐', description: 'Building momentum!' },
            { name: '25 Referrals', earned: false, icon: '🏆', description: 'Team leader!' },
            { name: '100 Referrals', earned: false, icon: '👑', description: 'Network champion!' },
            { name: '$200 Bonus', earned: currentEarnings.totalPoints >= 25, icon: '💰', description: 'First bonus unlocked!' },
            { name: '$500 Bonus', earned: currentEarnings.totalPoints >= 50, icon: '💎', description: 'Growing your wealth!' },
            { name: '$2,500 Bonus', earned: currentEarnings.totalPoints >= 100, icon: '🚀', description: 'Serious earner!' },
            { name: '$5,000 Bonus', earned: currentEarnings.totalPoints >= 200, icon: '👑', description: 'Elite achiever!' }
          ].map((achievement) => (
            <div key={achievement.name} className={`p-4 text-center border rounded-lg transition-all duration-300 ${
              achievement.earned
                ? 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20'
                : 'border-gray-600 bg-gray-700/30'
            }`}>
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className={`text-sm font-semibold mb-1 ${achievement.earned ? 'text-green-400' : 'text-gray-400'}`}>
                {achievement.name}
              </div>
              <p className="text-xs text-gray-400 mb-2">{achievement.description}</p>

              {achievement.earned ? (
                <div className="space-y-2">
                  <div className="text-xs text-green-300">✓ Earned!</div>
                  <button
                    onClick={() => shareAchievement(achievement)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <Share2 className="h-3 w-3" />
                    Share
                  </button>
                </div>
              ) : (
                <div className="text-xs text-gray-500">Not yet earned</div>
              )}
            </div>
          ))}
        </div>

        {/* Social Share Modal */}
        {shareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-white font-semibold mb-4">Share Your Achievement!</h3>
              <p className="text-gray-300 text-sm mb-4">
                🎉 I just earned the "{shareModal.name}" achievement in the Supernatural Institute Affiliate Program!
              </p>
              <p className="text-gray-400 text-xs mb-4">
                Join me and start earning too: [Your Referral Link]
              </p>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => shareToSocial('facebook', shareModal)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </button>
                <button
                  onClick={() => shareToSocial('twitter', shareModal)}
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </button>
              </div>

              <button
                onClick={() => setShareModal(null)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}