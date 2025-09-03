import React, { useMemo, useState } from 'react';
import { Calculator, DollarSign, Users, TrendingUp } from 'lucide-react';
import SliderInput from './SliderInput';

type Tier = 'bronze' | 'silver' | 'gold' | 'diamond';

const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function OutreachCalculator() {
   const [tier, setTier] = useState<Tier>('bronze');
   const [directReferrals, setDirectReferrals] = useState(5);
   const [avgReferralsPerPerson, setAvgReferralsPerPerson] = useState(2);
   const [avgMembershipPrice, setAvgMembershipPrice] = useState(33);

   const estimatedEarnings = useMemo(() => {
     const commissionRates = [0.20, 0.10, 0.05, 0.03, 0.02, 0.01, 0.01];
     let maxLevel = 1;
     if (tier === 'silver') maxLevel = 2;
     if (tier === 'gold') maxLevel = 5;
     if (tier === 'diamond') maxLevel = 7;

    let totalEarnings = 0;
    let referralsAtLevel = [directReferrals];
    let downlineDetails = [];

    for (let level = 0; level < maxLevel; level++) {
      const numReferrals = referralsAtLevel[level];
      if (!numReferrals || numReferrals < 1) break;

      const earningsAtLevel = numReferrals * avgMembershipPrice * commissionRates[level];
      totalEarnings += earningsAtLevel;

      downlineDetails.push({
        level: level + 1,
        referrals: Math.round(numReferrals),
        earnings: earningsAtLevel,
      });

      if (level + 1 < maxLevel) {
        const nextLevelReferrals = numReferrals * avgReferralsPerPerson;
        referralsAtLevel.push(nextLevelReferrals);
      }
    }
    
    // Note: Diamond cap is per-user, this is a simplified total.
    if (tier === 'diamond' && totalEarnings > 10000) {
      // This is a rough approximation. A real calculation would be per-user.
    }

    return { total: totalEarnings, details: downlineDetails };
  }, [tier, directReferrals, avgReferralsPerPerson, avgMembershipPrice]);

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-5 w-5 text-white" />
        <h3 className="text-lg sm:text-xl font-bold text-white heading-font">Estimate Your Potential Earnings</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Inputs */}
        <div className="space-y-4 sm:space-y-6">
          <SliderInput
            label="Your Direct Referrals"
            value={directReferrals}
            onChange={setDirectReferrals}
            min={1}
            max={50}
            icon={<Users />}
          />
          <SliderInput
            label="Avg. Referrals per Person"
            value={avgReferralsPerPerson}
            onChange={setAvgReferralsPerPerson}
            min={0.1}
            max={5}
            step={0.1}
            icon={<TrendingUp />}
          />
          <SliderInput
            label="Avg. Membership Price"
            value={avgMembershipPrice}
            onChange={setAvgMembershipPrice}
            min={19}
            max={499}
            prefix="$"
            icon={<DollarSign />}
          />
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">Your Membership Tier</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(['bronze', 'silver', 'gold', 'diamond'] as Tier[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`px-2 sm:px-3 py-2 text-xs font-semibold uppercase tracking-wide touch-manipulation ${
                    tier === t
                      ? 'bg-white text-black scale-105'
                      : 'bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500'
                  } transition-all duration-200`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6">
          <h4 className="text-base sm:text-lg font-bold text-white mb-4 heading-font">Estimated Monthly Earnings</h4>
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white heading-font">{formatCurrency(estimatedEarnings.total)}</p>
            <p className="text-gray-400 text-sm">per 28 days</p>
          </div>
          <div className="space-y-2">
            {estimatedEarnings.details.map(item => (
              <div key={item.level} className="flex justify-between items-center text-sm border-b border-gray-700 pb-2 last:border-b-0">
                <div className="text-gray-300">
                  Level {item.level} <span className="text-gray-500">({item.referrals} users)</span>
                </div>
                <div className="text-white font-semibold">{formatCurrency(item.earnings)}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            This is an estimate. Actual earnings depend on your network's activity. Diamond tier earnings are capped at $10,000/month per user.
          </p>
        </div>
      </div>
    </div>
  );
}
