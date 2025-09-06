import React, { useState } from 'react';

interface NetworkLevel {
  churches: number;
  silver: number;
  gold: number;
  diamond: number;
}

interface Scenario {
  name: string;
  churchReferrals: number;
  silverMembers: number;
  goldMembers: number;
  diamondMembers: number;
}

const NetworkCalculator: React.FC = () => {
  const [networkLevels, setNetworkLevels] = useState<NetworkLevel[]>([
    { churches: 1, silver: 4, gold: 2, diamond: 1 }, // Level 1
    { churches: 0, silver: 8, gold: 3, diamond: 1 }, // Level 2
    { churches: 0, silver: 12, gold: 5, diamond: 2 }, // Level 3
    { churches: 0, silver: 15, gold: 8, diamond: 3 }, // Level 4
    { churches: 0, silver: 18, gold: 10, diamond: 4 }, // Level 5
    { churches: 0, silver: 20, gold: 12, diamond: 5 }, // Level 6
    { churches: 0, silver: 25, gold: 15, diamond: 6 }  // Level 7
  ]);

  // Calculator scenarios
  const scenarios: Scenario[] = [
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

  return (
    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-6 lg:p-8">
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
  );
};

export default NetworkCalculator;
