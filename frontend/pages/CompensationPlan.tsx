import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Users, TrendingUp, Crown, Star, Target, Zap } from 'lucide-react';

const commissionStructure = [
    {
      level: "Level 1",
      description: "Your direct referrals",
      commission: "30%"
    },
    {
      level: "Level 2",
      description: "People recruited by your Level 1",
      commission: "10%"
    },
    {
      level: "Level 3",
      description: "Deeper network levels",
      commission: "5%"
    },
    {
      level: "Level 4",
      description: "Deeper network levels",
      commission: "4%"
    },
    {
      level: "Level 5",
      description: "Deeper network levels",
      commission: "3%"
    },
    {
      level: "Level 6",
      description: "Deeper network levels",
      commission: "2%"
    },
    {
      level: "Level 7",
      description: "Deeper network levels",
      commission: "1%"
    }
  ];

export default function CompensationPlan() {
   const [selectedTier, setSelectedTier] = useState<'SILVER' | 'GOLD' | 'DIAMOND'>('SILVER');

   // Calculator state
   const [networkLevels, setNetworkLevels] = useState([
     { churches: 1, silver: 4, gold: 2, diamond: 1 }, // Level 1
     { churches: 0, silver: 8, gold: 3, diamond: 1 }, // Level 2
     { churches: 0, silver: 12, gold: 5, diamond: 2 }, // Level 3
     { churches: 0, silver: 15, gold: 8, diamond: 3 }, // Level 4
     { churches: 0, silver: 18, gold: 10, diamond: 4 }, // Level 5
     { churches: 0, silver: 20, gold: 12, diamond: 5 }, // Level 6
     { churches: 0, silver: 25, gold: 15, diamond: 6 }  // Level 7
   ]);

   // Calculator scenarios
   const scenarios = [
     {
       name: "Growing Church",
       churchReferrals: 3,
       silverMembers: 8,
       goldMembers: 3,
       diamondMembers: 1
     },
     {
       name: "Established Ministry",
       churchReferrals: 8,
       silverMembers: 15,
       goldMembers: 8,
       diamondMembers: 3
     },
     {
       name: "Kingdom Builder",
       churchReferrals: 15,
       silverMembers: 25,
       goldMembers: 12,
       diamondMembers: 5
     }
   ];

   // Calculate total monthly commission
   const calculateCommission = () => {
     let totalCommission = 0;

     networkLevels.forEach((level, levelIndex) => {
       const levelRate = [0.30, 0.10, 0.05, 0.04, 0.03, 0.02, 0.01][levelIndex];

       const churchCommission = level.churches * 99 * levelRate;
       const silverCommission = level.silver * 33 * levelRate;
       const goldCommission = level.gold * 149 * levelRate;
       const diamondCommission = level.diamond * 499 * levelRate;

       totalCommission += churchCommission + silverCommission + goldCommission + diamondCommission;
     });

     return totalCommission;
   };

   // Update level data
   const updateLevel = (levelIndex: number, field: string, value: number) => {
     const newLevels = [...networkLevels];
     newLevels[levelIndex] = { ...newLevels[levelIndex], [field]: Math.max(0, value) };
     setNetworkLevels(newLevels);
   };

   // Load scenario
   const loadScenario = (index: number) => {
     const scenario = scenarios[index];
     const newLevels = [
       { churches: scenario.churchReferrals, silver: 4, gold: 2, diamond: 1 }, // Level 1
       { churches: 0, silver: scenario.silverMembers, gold: 3, diamond: 1 }, // Level 2
       { churches: 0, silver: 12, gold: scenario.goldMembers, diamond: 2 }, // Level 3
       { churches: 0, silver: 15, gold: 8, diamond: scenario.diamondMembers }, // Level 4
       { churches: 0, silver: 18, gold: 10, diamond: 4 }, // Level 5
       { churches: 0, silver: 20, gold: 12, diamond: 5 }, // Level 6
       { churches: 0, silver: 25, gold: 15, diamond: 6 }  // Level 7
     ];
     setNetworkLevels(newLevels);
   };

  const getCommissionData = (tier: string, level: number) => {
    const membershipPrices = { 'SILVER': 33, 'GOLD': 149, 'DIAMOND': 499 };
    // Correct tiered commission rates based on level
    const commissionRates = {
      1: 0.30, // 30%
      2: 0.10, // 10%
      3: 0.05, // 5%
      4: 0.04, // 4%
      5: 0.03, // 3%
      6: 0.02, // 2%
      7: 0.01  // 1%
    };
    const rate = commissionRates[level as keyof typeof commissionRates] || 0.01;
    const price = membershipPrices[tier as keyof typeof membershipPrices];
    return (price * rate).toFixed(2);
  };

  const getMaxLevel = (tier: string) => {
    switch (tier) {
      case 'SILVER': return 2;
      case 'GOLD': return 5;
      case 'DIAMOND': return 7;
      default: return 2;
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <Link to="/dashboard/affiliate-rewards" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Affiliate Rewards
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:gap-4 mb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-white heading-font">
            Supernatural Institute Compensation Plan
          </h1>
        </div>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6 px-2">
          Complete guide to our 7-level affiliate commission structure with tiered rates: 30%/10%/5%/4%/3%/2%/1%
        </p>

      </div>

      {/* Membership Overview */}
      <div className="bg-gray-800/50 border border-gray-700 p-4 lg:p-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400" />
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white heading-font">Membership Benefits</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
          <div className="bg-green-500/10 border border-green-500/30 p-3 lg:p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 lg:h-6 lg:w-6 bg-green-500/20 border border-green-500/40 flex items-center justify-center rounded-full flex-shrink-0">
                <span className="text-green-400 text-xs lg:text-sm">💰</span>
              </div>
              <h3 className="text-green-400 font-semibold text-sm lg:text-base">Fast & Reliable Payments</h3>
            </div>
            <p className="text-green-200 text-xs lg:text-sm">Get paid quickly and reliably for your referrals.</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 p-3 lg:p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 lg:h-6 lg:w-6 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full flex-shrink-0">
                <span className="text-blue-400 text-xs lg:text-sm">📈</span>
              </div>
              <h3 className="text-blue-400 font-semibold text-sm lg:text-base">Sustainable Growth</h3>
            </div>
            <p className="text-blue-200 text-xs lg:text-sm">Gradual price increases as your business scales.</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 p-3 lg:p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 lg:h-6 lg:w-6 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center rounded-full flex-shrink-0">
                <span className="text-purple-400 text-xs lg:text-sm">🎯</span>
              </div>
              <h3 className="text-purple-400 font-semibold text-sm lg:text-base">Legal Compliance</h3>
            </div>
            <p className="text-purple-200 text-xs lg:text-sm">Australian Consumer Law compliant with proper cooling-off periods.</p>
          </div>
        </div>

        <div className="bg-gray-700/30 p-4">
           <h3 className="text-white font-semibold mb-2">Membership Benefits:</h3>
           <div className="text-gray-300 text-sm space-y-2">
             <p><strong>SILVER ($33/month):</strong> Affiliate commission earnings (2 levels), Monthly Private Group Teaching, Sign up bonus qualification, Enhanced membership</p>
             <p><strong>GOLD ($149/month):</strong> Everything in Silver + Affiliate commission earnings (5 levels), Fortnightly Q&A group coaching, Fortnightly Private Live Teaching, 5% discount on any merch available, Sign up bonus qualification, Advanced membership</p>
             <p><strong>DIAMOND ($499/month):</strong> Everything in Gold + Affiliate commission earnings (7 levels), Fortnightly Private Live Teaching, Direct level 1 referrals increase from 20% to 33%, Free tickets to all in person or online events, 10% discount on any merch available, Sign up bonus qualification, Elite membership</p>
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
          <Target className="h-6 w-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Commission Payouts</h2>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'SILVER',
              price: 33,
              color: 'purple',
              description: 'Everything in Bronze + Affiliate commission earnings (2 levels), Monthly Private Group Teaching, Sign up bonus qualification, Enhanced membership'
            },
            {
              name: 'GOLD',
              price: 149,
              color: 'pink',
              description: 'Everything in Silver + Affiliate commission earnings (5 levels), Fortnightly Q&A group coaching, Fortnightly Private Live Teaching, 5% discount on any merch available, Sign up bonus qualification, Advanced membership',
              popular: true
            },
            {
              name: 'DIAMOND',
              price: 499,
              color: 'cyan',
              description: 'Everything in Gold + Affiliate commission earnings (7 levels), Fortnightly Private Live Teaching, Direct level 1 referrals increase from 20% to 33%, Free tickets to all in person or online events, 10% discount on any merch available, Sign up bonus qualification, Elite membership'
            }
          ].map((tier) => (
            <div key={tier.name} className={`bg-gray-800/50 border border-${tier.color}-500/30 p-6 rounded-lg relative overflow-hidden`}>
              <div className="text-center mb-4">
                <h3 className={`text-2xl font-bold text-${tier.color}-400 mb-2`}>{tier.name}</h3>
                <div className="text-3xl font-black text-white mb-1">${tier.price}</div>
                <div className="text-sm text-gray-400">per month</div>
              </div>

              <div className="text-sm text-gray-300 mb-6 leading-relaxed">
                {tier.description}
              </div>

              <button className={`w-full bg-${tier.color}-600 hover:bg-${tier.color}-700 text-white py-3 px-6 rounded-lg font-bold uppercase tracking-wide transition-colors duration-200`}>
                JOIN {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>



      {/* Commission Structure */}
      <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Commission Structure</h2>
        </div>

        {/* Tier Selection Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-white font-semibold mr-2">Select Tier:</span>
          {['SILVER', 'GOLD', 'DIAMOND'].map((tier) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {[
            { tier: 'SILVER', price: '$33', maxEarnings: '$10/month', color: 'purple' },
            { tier: 'GOLD', price: '$149', maxEarnings: '$45/month', color: 'pink' },
            { tier: 'DIAMOND', price: '$499', maxEarnings: '$150/month', color: 'cyan' }
          ].map(({ tier, price, maxEarnings, color }) => (
            <div key={tier} className={`bg-${color}-500/10 border border-${color}-500/30 p-6 rounded-lg text-center`}>
              <h3 className={`text-2xl font-bold text-${color}-400 mb-2`}>{tier}</h3>
              <p className="text-white font-bold text-3xl mb-1">{price}</p>
              <p className="text-${color}-300 text-sm mb-3">per month</p>
              <p className="text-green-400 font-semibold text-sm">Max: {maxEarnings}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs lg:text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 lg:py-3 px-2 lg:px-4 text-white font-semibold">Level</th>
                <th className="text-center py-2 lg:py-3 px-2 lg:px-4 text-white font-semibold">Rate</th>
                <th className="text-center py-2 lg:py-3 px-2 lg:px-4 text-white font-semibold">{selectedTier} (${{ 'SILVER': 33, 'GOLD': 149, 'DIAMOND': 499 }[selectedTier]})</th>
              </tr>
            </thead>
            <tbody>
                  {[1, 2, 3, 4, 5, 6, 7].map((level) => {
                            const maxLevel = getMaxLevel(selectedTier);
                            const isLocked = level > maxLevel;
                            const commission = isLocked ? 'LOCKED' : `$${getCommissionData(selectedTier, level)} AUD`;
       
                            return (
                              <tr key={level} className={level % 2 === 0 ? 'bg-gray-700/30' : ''}>
                                <td className="py-2 lg:py-3 px-2 lg:px-4 text-white font-semibold text-xs lg:text-sm">Level {level}</td>
                                <td className="py-2 lg:py-3 px-2 lg:px-4 text-center text-gray-300 text-xs lg:text-sm">
                                  {level === 1 ? '30%' : level === 2 ? '10%' : level === 3 ? '5%' : level === 4 ? '4%' : level === 5 ? '3%' : level === 6 ? '2%' : '1%'}
                                </td>
                                <td className={`py-2 lg:py-3 px-2 lg:px-4 text-center font-semibold text-xs lg:text-sm ${isLocked ? 'text-gray-500' : 'text-green-400'}`}>
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
                ${{ 'SILVER': 33, 'GOLD': 149, 'DIAMOND': 499 }[selectedTier]} AUD
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
              <div className="bg-gray-700/30 p-2 rounded">
                <span className="text-purple-400">Premium Course = 1 point</span>
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
            <p><strong>Result:</strong> Reliable payouts with protection for all parties</p>
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
            <p className="text-gray-300">Weekly payouts after refund periods. Monthly on the 15th or the following month if it's within a refund period.</p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Refund Information</h3>
            <p className="text-gray-300 text-sm">All memberships include a 28-day cooling-off period for full refunds. Commissions are held during this period to protect both affiliates and the company. Refunds can be requested through your dashboard at any time during the cooling-off period.</p>
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
            <p className="text-gray-300">$5 AUD minimum payout threshold. No maximum limits!</p>
          </div>

        </div>
      </div>

      {/* Church Partnership Section */}
      <div className="bg-purple-500/10 border border-purple-500/30 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white heading-font">Church Partnership Program</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Church Partnership Benefits</h3>
            <div className="space-y-3">
              <div className="bg-gray-700/30 p-3 rounded">
                <div className="text-purple-400 font-semibold text-sm mb-1">30%/10%/5%/4%/3%/2%/1% Commission Structure</div>
                <div className="text-gray-300 text-xs">Tiered rates for direct and indirect church referrals</div>
              </div>
              <div className="bg-gray-700/30 p-3 rounded">
                <div className="text-purple-400 font-semibold text-sm mb-1">$99 AUD Monthly Partnership</div>
                <div className="text-gray-300 text-xs">Complete church transformation package</div>
              </div>
              <div className="bg-gray-700/30 p-3 rounded">
                <div className="text-purple-400 font-semibold text-sm mb-1">Senior Leadership Oversight</div>
                <div className="text-gray-300 text-xs">24/7 apostolic guidance and mentorship</div>
              </div>
              <div className="bg-gray-700/30 p-3 rounded">
                <div className="text-purple-400 font-semibold text-sm mb-1">Complete Ministry Training</div>
                <div className="text-gray-300 text-xs">Five-fold ministry development and ordination</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Church Commission Calculator</h3>
            <div className="bg-gray-700/30 p-4 rounded">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-purple-400">$29.70/month</div>
                <div className="text-gray-300 text-sm">per Level 1 church referral</div>
              </div>
              <div className="text-gray-300 text-xs space-y-1">
                <p>• <strong>Level 1 (Direct):</strong> Your immediate church referrals get you 30% commission</p>
                <p>• <strong>Level 2-7 (Network):</strong> Earn from churches your referrals bring in</p>
                <p>• <strong>Teaching Focus:</strong> Help churches understand supernatural ministry and Kingdom principles</p>
                <p>• <strong>Growth Strategy:</strong> Each church referral can create their own network of churches</p>
                <p>• <strong>Monthly payouts after 28-day protection period</strong></p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/partnership"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-colors"
              >
                Become a Church Partner
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/30 p-4 rounded">
          <h4 className="text-white font-semibold mb-2">Church Partnership vs Individual Membership</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-purple-400 font-semibold mb-1">Church Partnership ($99/month)</div>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>• 30% commission on all 7 levels</li>
                <li>• Senior leadership oversight</li>
                <li>• Complete ministry training</li>
                <li>• Ordination certificates</li>
                <li>• Congregation discipleship</li>
              </ul>
            </div>
            <div>
              <div className="text-blue-400 font-semibold mb-1">Individual Membership ($33-499/month)</div>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>• SILVER: $33/month (Levels 1-2)</li>
                <li>• GOLD: $149/month (Levels 1-5)</li>
                <li>• DIAMOND: $499/month (Levels 1-7)</li>
                <li>• Personal spiritual growth</li>
                <li>• Access to courses and community</li>
                <li>• Ministry tools and resources</li>
                <li>• Personal development focus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Level Network Calculator */}
      <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">7-Level Network Calculator</h3>

        {/* Scenario Buttons */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Quick Scenarios:</h4>
          <div className="grid grid-cols-1 gap-2">
            {scenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => loadScenario(index)}
                className="p-3 rounded-lg text-left transition-colors bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
              >
                <div className="font-semibold">{scenario.name}</div>
                <div className="text-sm opacity-75">
                  {scenario.churchReferrals} churches, {scenario.silverMembers + scenario.goldMembers + scenario.diamondMembers} members
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 7-Level Input Grid */}
        <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Customize Your Network:</h4>

          <div className="space-y-4">
            {networkLevels.map((level, levelIndex) => {
              const levelRate = [0.30, 0.10, 0.05, 0.04, 0.03, 0.02, 0.01][levelIndex];
              const levelCommission =
                (level.churches * 99 + level.silver * 33 + level.gold * 149 + level.diamond * 499) * levelRate;

              return (
                <div key={levelIndex} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold">
                      Level {levelIndex + 1} ({(levelRate * 100).toFixed(0)}% rate)
                    </span>
                    <span className="text-green-400 font-semibold">
                      ${levelCommission.toFixed(2)}/month
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-gray-300 text-xs mb-1">Churches</label>
                      <input
                        type="number"
                        value={level.churches}
                        onChange={(e) => updateLevel(levelIndex, 'churches', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded text-sm focus:border-green-500 focus:outline-none"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs mb-1">Silver ($33)</label>
                      <input
                        type="number"
                        value={level.silver}
                        onChange={(e) => updateLevel(levelIndex, 'silver', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded text-sm focus:border-green-500 focus:outline-none"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs mb-1">Gold ($149)</label>
                      <input
                        type="number"
                        value={level.gold}
                        onChange={(e) => updateLevel(levelIndex, 'gold', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded text-sm focus:border-green-500 focus:outline-none"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs mb-1">Diamond ($499)</label>
                      <input
                        type="number"
                        value={level.diamond}
                        onChange={(e) => updateLevel(levelIndex, 'diamond', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded text-sm focus:border-green-500 focus:outline-none"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Results */}
        <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              ${calculateCommission().toFixed(2)}
            </div>
            <div className="text-gray-300 text-sm">Total Monthly Commission</div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            {networkLevels.map((level, levelIndex) => {
              const levelRate = [0.30, 0.10, 0.05, 0.04, 0.03, 0.02, 0.01][levelIndex];
              const levelCommission =
                (level.churches * 99 + level.silver * 33 + level.gold * 149 + level.diamond * 499) * levelRate;

              return (
                <div key={levelIndex} className="flex justify-between">
                  <span className="text-gray-400">Level {levelIndex + 1}:</span>
                  <span className="text-green-400">${levelCommission.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-300 font-semibold mb-2">Commission Structure:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-green-200">
            <div>• Level 1: 30% (Direct referrals)</div>
            <div>• Level 2: 10% (Network level 2)</div>
            <div>• Level 3: 5% (Network level 3)</div>
            <div>• Level 4: 4% (Network level 4)</div>
            <div>• Level 5: 3% (Network level 5)</div>
            <div>• Level 6: 2% (Network level 6)</div>
            <div>• Level 7: 1% (Network level 7)</div>
          </div>
          <div className="mt-3 pt-3 border-t border-green-500/30">
            <div className="text-green-200 text-sm">
              <strong>Monthly payouts</strong> after 28-day protection period • <strong>Unlimited width</strong> per level
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-200 text-sm">
            <strong>Customize & Calculate:</strong> Adjust the numbers for each level to see your potential earnings.
            This demonstrates the true power of the 7-level commission structure.
            Full commission tracking available in your partner dashboard.
          </p>
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


    </div>
  );
}
