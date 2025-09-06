import React, { useState, useEffect } from 'react';

interface PartnershipCalculatorProps {}

const PartnershipCalculator: React.FC<PartnershipCalculatorProps> = () => {
  // Level data structure - each level has its own churches and members
  const [levels, setLevels] = useState([
    { churches: 100, silverMembers: 50, goldMembers: 10, diamondMembers: 2 },
    { churches: 50, silverMembers: 25, goldMembers: 5, diamondMembers: 1 },
    { churches: 25, silverMembers: 12, goldMembers: 3, diamondMembers: 0 },
    { churches: 12, silverMembers: 6, goldMembers: 1, diamondMembers: 0 },
    { churches: 6, silverMembers: 3, goldMembers: 0, diamondMembers: 0 },
    { churches: 3, silverMembers: 1, goldMembers: 0, diamondMembers: 0 },
    { churches: 1, silverMembers: 0, goldMembers: 0, diamondMembers: 0 }
  ]);

  // Commission rates
  const commissionRates = [0.30, 0.10, 0.05, 0.04, 0.03, 0.02, 0.01]; // 30%, 10%, 5%, 4%, 3%, 2%, 1%

  // Subscription prices
  const churchPrice = 99; // $99 AUD per church
  const memberPrices = {
    silver: 33,    // $33 AUD
    gold: 149,     // $149 AUD
    diamond: 499   // $499 AUD
  };

  // Update level data
  const updateLevel = (levelIndex: number, field: string, value: number) => {
    const newLevels = [...levels];
    newLevels[levelIndex] = { ...newLevels[levelIndex], [field]: value };
    setLevels(newLevels);
  };

  // Calculate earnings
  const calculateEarnings = () => {
    const levelBreakdowns = levels.map((level, index) => {
      const rate = commissionRates[index];

      // Church earnings
      const churchRevenue = level.churches * churchPrice;
      const churchCommission = churchRevenue * rate;

      // Member earnings
      const silverRevenue = level.silverMembers * memberPrices.silver;
      const goldRevenue = level.goldMembers * memberPrices.gold;
      const diamondRevenue = level.diamondMembers * memberPrices.diamond;
      const totalMemberRevenue = silverRevenue + goldRevenue + diamondRevenue;
      const memberCommission = totalMemberRevenue * rate;

      const totalLevelCommission = churchCommission + memberCommission;

      return {
        churchCommission,
        memberCommission,
        totalCommission: totalLevelCommission,
        breakdown: {
          churches: level.churches,
          silverMembers: level.silverMembers,
          goldMembers: level.goldMembers,
          diamondMembers: level.diamondMembers
        }
      };
    });

    // Calculate total church commission across all levels
    const totalChurchCommission = levelBreakdowns.reduce((sum, level) => sum + level.churchCommission, 0);
    const churchCap = 100000; // $100,000 AUD cap for church payouts

    let adjustedLevelBreakdowns = levelBreakdowns;
    let capApplied = false;

    // Apply cap if church commission exceeds $100,000
    if (totalChurchCommission > churchCap) {
      capApplied = true;
      const scalingFactor = churchCap / totalChurchCommission;

      adjustedLevelBreakdowns = levelBreakdowns.map(level => ({
        ...level,
        churchCommission: level.churchCommission * scalingFactor,
        totalCommission: (level.churchCommission * scalingFactor) + level.memberCommission
      }));
    }

    const totalMonthly = adjustedLevelBreakdowns.reduce((sum, level) => sum + level.totalCommission, 0);
    const totalAnnual = totalMonthly * 12;

    return {
      levelBreakdowns: adjustedLevelBreakdowns,
      totalMonthly,
      totalAnnual,
      capApplied,
      originalChurchCommission: totalChurchCommission,
      cappedChurchCommission: capApplied ? churchCap : totalChurchCommission
    };
  };

  const { levelBreakdowns, totalMonthly, totalAnnual, capApplied, originalChurchCommission, cappedChurchCommission } = calculateEarnings();

  const levelColors = [
    'text-green-400',
    'text-blue-400',
    'text-purple-400',
    'text-yellow-400',
    'text-pink-400',
    'text-cyan-400',
    'text-red-400'
  ];

  return (
    <div className="bg-white/5 border border-white/10 p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Calculator Inputs */}
        <div className="space-y-4 lg:space-y-6">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">Calculate Your Potential</h3>

          {/* Level Inputs */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((levelNum) => {
              const levelIndex = levelNum - 1;
              const level = levels[levelIndex];
              const rate = commissionRates[levelIndex];

              return (
                <div key={levelNum} className="bg-gray-800/30 border border-gray-700/50 p-4 rounded">
                  <h4 className="text-white font-semibold mb-3">
                    Level {levelNum} - {(rate * 100).toFixed(0)}% Commission
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Churches ($99/month)
                      </label>
                      <input
                        type="number"
                        value={level.churches}
                        onChange={(e) => updateLevel(levelIndex, 'churches', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Silver Members ($33/month)
                      </label>
                      <input
                        type="number"
                        value={level.silverMembers}
                        onChange={(e) => updateLevel(levelIndex, 'silverMembers', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Gold Members ($149/month)
                      </label>
                      <input
                        type="number"
                        value={level.goldMembers}
                        onChange={(e) => updateLevel(levelIndex, 'goldMembers', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">
                        Diamond Members ($499/month)
                      </label>
                      <input
                        type="number"
                        value={level.diamondMembers}
                        onChange={(e) => updateLevel(levelIndex, 'diamondMembers', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>



          {/* Commission Structure Info */}
          <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded">
            <h4 className="text-white font-semibold mb-2">7-Level Commission Structure</h4>
            <div className="space-y-2 text-blue-100 text-sm">
              {commissionRates.map((rate, index) => (
                <div key={index} className="flex justify-between">
                  <span>Level {index + 1}:</span>
                  <span className="font-semibold">{(rate * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-blue-500/30">
              <p className="text-blue-200 text-xs">
                💰 <strong>$100,000 AUD monthly cap</strong> on church payouts
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white/10 border border-white/20 p-4 lg:p-6">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">Your Earnings Breakdown</h3>

          {/* Cap Notice */}
          {capApplied && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 p-3 rounded mb-4">
              <p className="text-yellow-100 text-sm font-semibold">
                ⚠️ Church payout cap applied: ${originalChurchCommission.toFixed(2)} → ${cappedChurchCommission.toFixed(2)} AUD
              </p>
              <p className="text-yellow-200 text-xs mt-1">
                Monthly church payouts are capped at $100,000 AUD
              </p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {levelBreakdowns.map((level, index) => {
              const colorClass = levelColors[index % levelColors.length];
              const breakdown = level.breakdown;

              return (
                <div key={index} className="border-b border-white/20 pb-3">
                  <div className="mb-2">
                    <span className="text-gray-300 font-semibold">Level {index + 1} ({(commissionRates[index] * 100).toFixed(0)}%):</span>
                  </div>

                  <div className="text-sm text-gray-400 space-y-1 ml-4">
                    <div>Churches: {breakdown.churches} × $99 = ${(breakdown.churches * churchPrice).toFixed(2)}</div>
                    <div>Silver: {breakdown.silverMembers} × $33 = ${(breakdown.silverMembers * memberPrices.silver).toFixed(2)}</div>
                    <div>Gold: {breakdown.goldMembers} × $149 = ${(breakdown.goldMembers * memberPrices.gold).toFixed(2)}</div>
                    <div>Diamond: {breakdown.diamondMembers} × $499 = ${(breakdown.diamondMembers * memberPrices.diamond).toFixed(2)}</div>
                    {capApplied && (
                      <div className="text-yellow-400 text-xs mt-2">
                        * Church commission adjusted due to $100K cap
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10">
                    <span className="text-gray-300">Total Level {index + 1}:</span>
                    <span className={`font-semibold ${colorClass}`}>${level.totalCommission.toFixed(2)} AUD</span>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-white/20 pt-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-white font-bold">Total Monthly:</span>
                <span className="text-orange-400 font-black">${totalMonthly.toFixed(2)} AUD</span>
              </div>

              <div className="flex justify-between items-center text-lg mt-2">
                <span className="text-white font-bold">Total Annual:</span>
                <span className="text-green-400 font-black">${totalAnnual.toFixed(2)} AUD</span>
              </div>
            </div>
          </div>

          <div className="bg-red-500/20 border border-red-500/30 p-4 rounded">
            <p className="text-red-100 text-sm text-center font-semibold">
              Monthly payouts are made after a 28-day protection period. Unlimited width per level.
            </p>
            <p className="text-red-200 text-xs text-center mt-2">
              Church payouts are capped at $100,000 AUD per month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipCalculator;
