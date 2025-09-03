import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Users, TrendingUp, Crown, Star, Target, Zap, Calculator, HelpCircle, X } from 'lucide-react';

export default function CompensationPlan() {
  const [selectedTier, setSelectedTier] = useState<'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND'>('BRONZE');
  const [referrals, setReferrals] = useState({
    level1: 1,
    level2: 1,
    level3: 1,
    level4: 1,
    level5: 1
  });
  const [showHelp, setShowHelp] = useState(false);
  const [showCalculatorHelp, setShowCalculatorHelp] = useState(false);

  const getCommissionData = (tier: string, level: number) => {
    const membershipPrices = { 'BRONZE': 10, 'SILVER': 20, 'GOLD': 50, 'DIAMOND': 100 };
    // 30% commission for ALL levels - equal opportunity for everyone
    const rate = 0.30;
    const price = membershipPrices[tier as keyof typeof membershipPrices];
    return (price * rate).toFixed(2);
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
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/dashboard/affiliate-rewards" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Affiliate Rewards
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white heading-font">
            Supernatural Institute Compensation Plan
          </h1>
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-400 hover:text-blue-300 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 touch-manipulation"
          >
            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-semibold text-sm sm:text-base">HELP</span>
          </button>
        </div>
        <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">
          Complete guide to our 7-level affiliate commission structure with generous 30% commissions
        </p>

        {/* Bootstrap Launch Banner */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
              <span className="text-blue-400 text-lg">🚀</span>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Bootstrap Launch Pricing</h3>
              <p className="text-blue-200 text-sm">Special introductory pricing with fast and reliable payments</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-lg">
              <div className="text-base sm:text-lg font-bold text-blue-400">$10</div>
              <div className="text-xs text-gray-400">Bronze</div>
              <div className="text-xs text-blue-300">Max: $3/month</div>
            </div>
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-lg">
              <div className="text-base sm:text-lg font-bold text-purple-400">$20</div>
              <div className="text-xs text-gray-400">Silver</div>
              <div className="text-xs text-purple-300">Max: $6/month</div>
            </div>
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-lg">
              <div className="text-base sm:text-lg font-bold text-pink-400">$50</div>
              <div className="text-xs text-gray-400">Gold</div>
              <div className="text-xs text-pink-300">Max: $15/month</div>
            </div>
            <div className="bg-gray-800/50 p-2 sm:p-3 rounded-lg">
              <div className="text-base sm:text-lg font-bold text-cyan-400">$100</div>
              <div className="text-xs text-gray-400">Diamond</div>
              <div className="text-xs text-cyan-300">Max: $30/month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Overview */}
      <div className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white heading-font">Bootstrap Launch Strategy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
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

        <div className="bg-gray-700/30 p-4">
           <h3 className="text-white font-semibold mb-2">How Commissions Work:</h3>
           <div className="text-gray-300 text-sm space-y-1">
             <p>• <strong>All Levels:</strong> 30% commission on successful referrals (equal opportunity)</p>
             <p>• <strong>Direct & Indirect:</strong> Same 30% rate for all 7 levels deep</p>
             <p>• <strong>FREE Access:</strong> Join FREE with optional Bronze benefits (28 days trial)</p>
             <p>• <strong>Optional Extension:</strong> Invite friends to extend benefits (completely optional)</p>
             <p>• <strong>Payout Timing:</strong> Commissions paid quickly and reliably</p>
             <p>• <strong>Optional Bonuses:</strong> Earn points for bonuses based on sharing milestones (optional)</p>
           </div>
         </div>

         {/* Multiple Income Streams */}
         <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 p-6">
           <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
             <Zap className="h-5 w-5" />
             Multiple Income Streams
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-gray-700/30 p-3 rounded-lg">
               <div className="text-green-400 font-semibold text-sm mb-1">🚀 Fast-Start Bonuses</div>
               <div className="text-gray-300 text-xs">Instant bonuses for quick recruitment</div>
             </div>
             <div className="bg-gray-700/30 p-3 rounded-lg">
               <div className="text-blue-400 font-semibold text-sm mb-1">👑 Leadership Bonuses</div>
               <div className="text-gray-300 text-xs">For building large teams</div>
             </div>
             <div className="bg-gray-700/30 p-3 rounded-lg">
               <div className="text-purple-400 font-semibold text-sm mb-1">📈 Performance Bonuses</div>
               <div className="text-gray-300 text-xs">Monthly performance incentives</div>
             </div>
             <div className="bg-gray-700/30 p-3 rounded-lg">
               <div className="text-yellow-400 font-semibold text-sm mb-1">⭐ Rank Advancement</div>
               <div className="text-gray-300 text-xs">Bonuses for moving up tiers</div>
             </div>
             <div className="bg-gray-700/30 p-3 rounded-lg">
               <div className="text-cyan-400 font-semibold text-sm mb-1">♾️ Infinity Bonuses</div>
               <div className="text-gray-300 text-xs">For exceptional performance</div>
             </div>
             <div className="bg-gray-700/30 p-3 rounded-lg">
               <div className="text-pink-400 font-semibold text-sm mb-1">💎 Loyalty Bonuses</div>
               <div className="text-gray-300 text-xs">Long-term commitment rewards</div>
             </div>
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
              price: '$10/month',
              color: 'blue',
              levels: 'Levels 1',
              bonus: '30% Level 1',
              maxEarnings: '$3/month'
            },
            {
              name: 'SILVER',
              price: '$20/month',
              color: 'purple',
              levels: 'Levels 1-2',
              bonus: '30% All Levels',
              maxEarnings: '$6/month'
            },
            {
              name: 'GOLD',
              price: '$50/month',
              color: 'pink',
              levels: 'Levels 1-5',
              bonus: '30% All Levels',
              maxEarnings: '$15/month'
            },
            {
              name: 'DIAMOND',
              price: '$100/month',
              color: 'cyan',
              levels: 'Levels 1-7',
              bonus: '30% All Levels',
              maxEarnings: '$30/month'
            }
          ].map((tier) => (
            <div key={tier.name} className={`bg-${tier.color}-500/10 border border-${tier.color}-500/30 p-4 rounded-lg relative`}>
              {tier.name === 'GOLD' && (
                <div className="absolute -top-2 -right-2 bg-pink-500 text-black text-xs px-2 py-1 rounded font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-xl font-bold text-${tier.color}-400 mb-2`}>{tier.name}</h3>
              <p className="text-white font-semibold text-lg mb-1">${{ 'BRONZE': 10, 'SILVER': 20, 'GOLD': 50, 'DIAMOND': 100 }[tier.name]}/month</p>
              <p className="text-green-400 font-semibold text-sm mb-2">Max: ${{
                'BRONZE': '3',
                'SILVER': '6',
                'GOLD': '15',
                'DIAMOND': '30'
              }[tier.name]}/month</p>
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
            <h3 className="text-lg font-semibold text-white mb-4">Equal Opportunity Commission Rates</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/30">
                <span className="text-gray-300">All Levels (1-7)</span>
                <span className="text-green-400 font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50">
                <span className="text-gray-300">Direct & Indirect Referrals</span>
                <span className="text-green-400 font-semibold">Same Rate</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50">
                <span className="text-gray-300">All Membership Tiers</span>
                <span className="text-green-400 font-semibold">Equal Opportunity</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Level 5</span>
                <span className="text-green-400 font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Level 6</span>
                <span className="text-green-400 font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-green-400 font-semibold">All Membership Tiers</span>
                <span className="text-green-400 font-semibold">Equal Opportunity</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Level 7</span>
                <span className="text-green-400 font-semibold">30%</span>
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
                <span className="text-gray-300">FREE Access</span>
                <span className="text-yellow-400 font-semibold">Optional Bronze Benefits</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <span className="text-gray-300">Optional Extension</span>
                <span className="text-blue-400 font-semibold">Invite Friends = Extended Access</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                <span className="text-gray-300">Flexible Duration</span>
                <span className="text-purple-400 font-semibold">Build at Your Own Pace</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-sm">
              💎 <strong>Fair & Transparent:</strong> All paid members earn 30% commission on successful referrals. FREE members have optional access to Bronze benefits with no commitment required.
            </p>
            <p className="text-blue-300 text-xs mt-2">
              📋 <strong>Legal Compliance:</strong> No mandatory recruitment or activity requirements. All participation is completely voluntary.
            </p>
          </div>
      </div>

      {/* Detailed Income Streams */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 p-6">
        <h3 className="text-yellow-400 font-bold text-lg mb-6 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Income Stream Details
        </h3>

        <div className="space-y-6">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-sm">🚀</span>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold">Fast-Start Bonuses</h4>
                <p className="text-gray-300 text-sm">Instant cash bonuses for rapid team building</p>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1 ml-11">
              <p>• <strong>$50</strong> bonus for 3 referrals in first 7 days</p>
              <p>• <strong>$150</strong> bonus for 5 referrals in first 14 days</p>
              <p>• <strong>$500</strong> bonus for 10 referrals in first 30 days</p>
            </div>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center">
                <span className="text-blue-400 text-sm">👑</span>
              </div>
              <div>
                <h4 className="text-blue-400 font-semibold">Leadership Bonuses</h4>
                <p className="text-gray-300 text-sm">Monthly bonuses for team leadership</p>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1 ml-11">
              <p>• <strong>$200/month</strong> for teams of 50+ active members</p>
              <p>• <strong>$500/month</strong> for teams of 100+ active members</p>
              <p>• <strong>$1,000/month</strong> for teams of 250+ active members</p>
            </div>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded-full flex items-center justify-center">
                <span className="text-purple-400 text-sm">📈</span>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold">Performance Bonuses</h4>
                <p className="text-gray-300 text-sm">Monthly incentives for consistent performance</p>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1 ml-11">
              <p>• <strong>$100</strong> for maintaining 90%+ team activity</p>
              <p>• <strong>$250</strong> for 95%+ team activity</p>
              <p>• <strong>$500</strong> for 98%+ team activity</p>
            </div>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-yellow-500/20 border border-yellow-500/40 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 text-sm">⭐</span>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold">Rank Advancement Bonuses</h4>
                <p className="text-gray-300 text-sm">One-time bonuses for achieving higher ranks</p>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1 ml-11">
              <p>• <strong>$200</strong> bonus for reaching Silver rank</p>
              <p>• <strong>$500</strong> bonus for reaching Gold rank</p>
              <p>• <strong>$1,000</strong> bonus for reaching Diamond rank</p>
            </div>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/40 rounded-full flex items-center justify-center">
                <span className="text-cyan-400 text-sm">♾️</span>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold">Infinity Bonuses</h4>
                <p className="text-gray-300 text-sm">Special bonuses for extraordinary achievements</p>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1 ml-11">
              <p>• <strong>$5,000</strong> for 500+ team members</p>
              <p>• <strong>$10,000</strong> for 1,000+ team members</p>
              <p>• <strong>$25,000</strong> for exceptional team leadership</p>
            </div>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-pink-500/20 border border-pink-500/40 rounded-full flex items-center justify-center">
                <span className="text-pink-400 text-sm">💎</span>
              </div>
              <div>
                <h4 className="text-pink-400 font-semibold">Loyalty Bonuses</h4>
                <p className="text-gray-300 text-sm">Annual bonuses for long-term commitment</p>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1 ml-11">
              <p>• <strong>$300</strong> bonus after 1 year of active membership</p>
              <p>• <strong>$600</strong> bonus after 2 years of active membership</p>
              <p>• <strong>$1,200</strong> bonus after 3+ years of active membership</p>
            </div>
          </div>
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
                            const commission = isLocked ? 'LOCKED' : `$${getCommissionData(selectedTier, level)} AUD`;
       
                            return (
                              <tr key={level} className={level % 2 === 0 ? 'bg-gray-700/30' : ''}>
                                <td className="py-3 px-4 text-white font-semibold">Level {level}</td>
                                <td className="py-3 px-4 text-center text-gray-300">
                                  30%
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white heading-font">Live Earnings Calculator</h2>
          </div>
          <button
            onClick={() => setShowCalculatorHelp(true)}
            className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg transition-all duration-200 text-sm"
          >
            <HelpCircle className="h-4 w-4" />
            Calculator Help
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Calculator Inputs */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Build Your Network</h3>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Membership Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value as any)}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg touch-manipulation text-sm sm:text-base"
                >
                  <option value="BRONZE">Bronze - $10/month</option>
                  <option value="SILVER">Silver - $20/month</option>
                  <option value="GOLD">Gold - $50/month</option>
                  <option value="DIAMOND">Diamond - $100/month</option>
                </select>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                <p className="text-blue-200 text-sm mb-3">💡 <strong>Quick Setup:</strong> Enter realistic numbers to see potential earnings</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setReferrals({ level1: 2, level2: 1, level3: 1, level4: 0, level5: 0 });
                    }}
                    className="bg-blue-600/20 hover:bg-blue-600/30 active:bg-blue-600/40 text-blue-300 px-2 sm:px-3 py-2 rounded text-xs sm:text-sm touch-manipulation transition-colors"
                  >
                    Small Network
                  </button>
                  <button
                    onClick={() => {
                      setReferrals({ level1: 5, level2: 3, level3: 2, level4: 1, level5: 1 });
                    }}
                    className="bg-green-600/20 hover:bg-green-600/30 active:bg-green-600/40 text-green-300 px-2 sm:px-3 py-2 rounded text-xs sm:text-sm touch-manipulation transition-colors"
                  >
                    Growing Network
                  </button>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 1 Referrals (Direct)</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level1}
                    onChange={(e) => handleReferralChange(1, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg touch-manipulation text-sm sm:text-base"
                    placeholder="People you personally recruit"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 2 Referrals</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level2}
                    onChange={(e) => handleReferralChange(2, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg touch-manipulation text-sm sm:text-base"
                    placeholder="People recruited by your Level 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 3 Referrals</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level3}
                    onChange={(e) => handleReferralChange(3, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg touch-manipulation text-sm sm:text-base"
                    placeholder="People recruited by your Level 2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 4 Referrals</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level4}
                    onChange={(e) => handleReferralChange(4, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg touch-manipulation text-sm sm:text-base"
                    placeholder="People recruited by your Level 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level 5 Referrals</label>
                  <input
                    type="number"
                    min="0"
                    value={referrals.level5}
                    onChange={(e) => handleReferralChange(5, parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg touch-manipulation text-sm sm:text-base"
                    placeholder="People recruited by your Level 4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Results */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Your Monthly Earnings</h3>

            <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                  ${calculateTotalEarnings()}
                </div>
                <div className="text-sm text-gray-400">Monthly Commission Potential</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Based on {Object.values(referrals).reduce((a, b) => a + b, 0)} total referrals
                </div>
              </div>
            </div>

            <div className="bg-gray-700/30 p-3 rounded-lg mb-4">
              <h4 className="text-white font-semibold text-sm mb-2">Commission Breakdown:</h4>
              <div className="space-y-2">
                {Array.from({ length: getMaxLevel(selectedTier) }, (_, i) => i + 1).map(level => {
                  const referralCount = referrals[`level${level}` as keyof typeof referrals];
                  const commissionPerReferral = parseFloat(getCommissionData(selectedTier, level));
                  const levelTotal = referralCount * commissionPerReferral;

                  return (
                    <div key={level} className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                      <span className="text-gray-300">
                        Level {level} ({referralCount} referrals):
                      </span>
                      <span className="text-green-400 font-semibold">
                        ${levelTotal.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg mb-4">
              <h4 className="text-purple-400 font-semibold text-sm mb-2">📊 Network Statistics</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-300">Total Referrals:</div>
                <div className="text-purple-300 font-semibold">{Object.values(referrals).reduce((a, b) => a + b, 0)}</div>
                <div className="text-gray-300">Active Levels:</div>
                <div className="text-purple-300 font-semibold">{getMaxLevel(selectedTier)}</div>
                <div className="text-gray-300">Commission Rate:</div>
                <div className="text-purple-300 font-semibold">30%</div>
                <div className="text-gray-300">Your Tier:</div>
                <div className="text-purple-300 font-semibold">{selectedTier}</div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
              <p className="text-yellow-200 text-sm">
                💡 <strong>Growth Potential:</strong> Each referral can recruit more people, creating exponential growth.
                Start with quality relationships for the best long-term results!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus System */}
      <div className="bg-gray-800/50 border border-gray-700 p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Star className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl font-bold text-white heading-font">Bonus System</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-base font-semibold text-white mb-3">How Points Work</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-gray-300">Each membership signup earns points:</span>
              </div>
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-blue-400">Bronze = 1 point</span>
              </div>
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-purple-400">Silver = 2 points</span>
              </div>
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-pink-400">Gold = 5 points</span>
              </div>
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-cyan-400">Diamond = 10 points</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white mb-3">Bonus Unlocks</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-green-400">25 points = $50 bonus</span>
              </div>
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-green-400">50 points = $125 bonus</span>
              </div>
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-green-400">100 points = $300 bonus</span>
              </div>
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-green-400">200 points = $750 bonus</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-xs">
              💰 <strong>Bonus Calculation:</strong> Bonuses paid 28 days after reaching point thresholds. Points from successful member signups.
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
      {/* 28-Day Payout System */}
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-6 w-6 text-red-400" />
          <h2 className="text-2xl font-bold text-white heading-font">28-Day Cashflow Protection System</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">🛡️ Why 28 Days?</h3>
            <div className="text-gray-300 text-sm space-y-1">
              <p>• Protects company cashflow</p>
              <p>• Covers refund periods</p>
              <p>• Ensures financial stability</p>
              <p>• Builds trust with reliable payouts</p>
            </div>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h3 className="text-orange-400 font-semibold mb-2">⚡ Batch Payroll System</h3>
            <div className="text-gray-300 text-sm space-y-1">
              <p>• Monday-Friday payouts</p>
              <p>• First 90 days: Controlled releases</p>
              <p>• Automated processing</p>
              <p>• Maximum cashflow efficiency</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/30 p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-3">How It Works:</h3>
          <div className="text-gray-300 text-sm space-y-2">
            <p><strong>Day 1-28:</strong> Commissions earned but held for refund protection</p>
            <p><strong>Day 29:</strong> Commissions released via batch payroll system</p>
            <p><strong>Processing:</strong> Monday-Friday payouts ensure efficient cash management</p>
            <p><strong>Result:</strong> Company maintains 70% of revenue for operations while affiliates earn generously</p>
          </div>
        </div>
      </div>

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

      </div>

      {/* Calculator Help Modal */}
      {showCalculatorHelp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">Calculator Help Guide</h2>
                </div>
                <button
                  onClick={() => setShowCalculatorHelp(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">🎯 How the Calculator Works</h3>
                <p className="text-green-200 text-sm">
                  This calculator shows your potential monthly commission earnings based on your network size and membership tier.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">📊 Understanding Levels</h3>
                <div className="text-blue-200 text-sm space-y-2">
                  <p><strong>Level 1:</strong> People you personally recruit (direct referrals)</p>
                  <p><strong>Level 2:</strong> People recruited by your Level 1 referrals</p>
                  <p><strong>Level 3:</strong> People recruited by your Level 2 referrals</p>
                  <p><strong>And so on...</strong> Up to your membership tier limit</p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">💰 Commission Structure</h3>
                <div className="text-purple-200 text-sm space-y-2">
                  <p><strong>All Levels:</strong> 30% commission on every membership</p>
                  <p><strong>Example:</strong> Bronze member ($20) = $6 commission per referral</p>
                  <p><strong>Same Rate:</strong> Every level pays the same 30% - completely fair!</p>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">🚀 Quick Setup Buttons</h3>
                <div className="text-yellow-200 text-sm space-y-2">
                  <p><strong>Small Network:</strong> Realistic starting numbers (2,1,1,0,0)</p>
                  <p><strong>Growing Network:</strong> Established network example (5,3,2,1,1)</p>
                  <p><strong>Use these to see:</strong> How earnings scale with network growth</p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">📈 Reading Your Results</h3>
                <div className="text-red-200 text-sm space-y-2">
                  <p><strong>Total Earnings:</strong> Your monthly commission potential</p>
                  <p><strong>Commission Breakdown:</strong> Shows earnings per level</p>
                  <p><strong>Network Statistics:</strong> Overview of your network size</p>
                  <p><strong>Remember:</strong> This is potential - actual earnings depend on active members</p>
                </div>
              </div>

              <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">❓ Common Calculator Questions</h3>
                <div className="text-gray-300 text-sm space-y-3">
                  <div>
                    <p className="font-semibold text-white">Q: Are these guaranteed earnings?</p>
                    <p>A: No, these are potential earnings. Actual commissions depend on active members and their payments.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Q: When do I get paid?</p>
                    <p>A: Commissions are paid monthly, 28 days after they're earned (for refund protection).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Q: Can I change my tier?</p>
                    <p>A: Yes! Higher tiers unlock more levels and greater earning potential.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 bg-gray-800/50">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowCalculatorHelp(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Start Calculating!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Compensation Plan Guide</h2>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">🎯 What is the Compensation Plan?</h3>
                <p className="text-blue-200 text-sm">
                  This is your affiliate rewards system. When people join using your referral link, you earn 30% commission on their membership fees. The system goes 7 levels deep, meaning you can earn from your direct referrals and their referrals too!
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">💰 How Commissions Work</h3>
                <div className="text-green-200 text-sm space-y-2">
                  <p><strong>30% Commission Rate:</strong> You earn 30% of every membership fee from people in your network</p>
                  <p><strong>7 Levels Deep:</strong> Earn from direct referrals (Level 1) through their referrals (Level 2-7)</p>
                  <p><strong>Same Rate Everywhere:</strong> Every level pays the same 30% - completely fair!</p>
                  <p><strong>Monthly Payouts:</strong> Commissions are paid monthly after a 28-day protection period</p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">🏆 Membership Tiers</h3>
                <div className="text-purple-200 text-sm space-y-2">
                  <p><strong>Bronze ($20/month):</strong> 1 level deep - earn from direct referrals only</p>
                  <p><strong>Silver ($50/month):</strong> 2 levels deep - earn from direct + their referrals</p>
                  <p><strong>Gold ($100/month):</strong> 5 levels deep - earn from 5 levels of referrals</p>
                  <p><strong>Diamond ($250/month):</strong> 7 levels deep - earn from maximum 7 levels</p>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">🎲 Points & Bonus System</h3>
                <div className="text-yellow-200 text-sm space-y-2">
                  <p><strong>How Points Work:</strong> Each membership signup earns you points based on their tier</p>
                  <p><strong>Point Values:</strong> Bronze=1, Silver=2, Gold=5, Diamond=10 points</p>
                  <p><strong>Bonus Tiers:</strong> Reach point thresholds to unlock cash bonuses</p>
                  <p><strong>Example:</strong> 25 Bronze signups = 25 points = $50 bonus</p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">🧮 Live Earnings Calculator</h3>
                <div className="text-red-200 text-sm space-y-2">
                  <p><strong>How to Use:</strong> Select your membership tier, then enter how many referrals you have at each level</p>
                  <p><strong>Realistic Numbers:</strong> Start with 1 referral per level to see potential earnings</p>
                  <p><strong>Growth:</strong> Your earnings grow exponentially as your network expands</p>
                  <p><strong>Tip:</strong> Focus on quality referrals who will also build their own networks</p>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">💡 Pro Tips for Success</h3>
                <div className="text-cyan-200 text-sm space-y-2">
                  <p><strong>Start Small:</strong> Focus on helping 1-2 people genuinely first</p>
                  <p><strong>Share Value:</strong> Talk about the courses, community, and spiritual growth</p>
                  <p><strong>Be Patient:</strong> Building a network takes time - focus on long-term relationships</p>
                  <p><strong>Upgrade Smart:</strong> Higher tiers unlock more earning potential</p>
                </div>
              </div>

              <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">❓ Common Questions</h3>
                <div className="text-gray-300 text-sm space-y-3">
                  <div>
                    <p className="font-semibold text-white">Q: When do I get paid?</p>
                    <p>A: Commissions are paid monthly, 28 days after they're earned (for refund protection).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Q: Can I change my tier?</p>
                    <p>A: Yes! You can upgrade or downgrade at any time from your dashboard.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Q: What if someone cancels?</p>
                    <p>A: You only earn from active members. Cancelled memberships stop earning.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 bg-gray-800/50">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowHelp(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Got it! Close Help
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}