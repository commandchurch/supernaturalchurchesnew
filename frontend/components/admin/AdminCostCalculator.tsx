import React, { useMemo, useState } from 'react';
import { Calculator, DollarSign, Users, TrendingUp, HandCoins, HeartHandshake, Receipt, PlusCircle, Trash2 } from 'lucide-react';

type Bill = { id: string; name: string; amount: number };

export default function AdminCostCalculator() {
  // Assumptions
  const [totalUsers, setTotalUsers] = useState(10000);
  const [pctRecruit, setPctRecruit] = useState(60);   // %
  const [pctPrivate, setPctPrivate] = useState(25);  // %
  const [pctCaptain, setPctCaptain] = useState(10);  // %
  const [pctCommando, setPctCommando] = useState(5); // %

  const [priceRecruit, setPriceRecruit] = useState(19);
  const [pricePrivate, setPricePrivate] = useState(33);
  const [priceCaptain, setPriceCaptain] = useState(149);
  const [priceCommando, setPriceCommando] = useState(499);

  // Outreach payout structure (base)
  const [pL1, setPL1] = useState(20);
  const [pL2, setPL2] = useState(10);
  const [pL3, setPL3] = useState(5);
  const [pL4, setPL4] = useState(2);
  const [pL5, setPL5] = useState(1); // Captain & Commando
  const [pL6, setPL6] = useState(1); // Commando
  const [pL7, setPL7] = useState(1); // Commando

  // Network activity assumptions
  const [activeAffiliatesPct, setActiveAffiliatesPct] = useState(35); // % of paying users who actively refer
  const [avgReferralsPerAffiliate, setAvgReferralsPerAffiliate] = useState(2);
  const [platformCosts, setPlatformCosts] = useState(5000); // fixed monthly costs (infra, ops)
  const [ministryTithePct, setMinistryTithePct] = useState(10); // % of revenue set aside for ministry giving
  const [churnPct, setChurnPct] = useState(4); // monthly churn %

  // Bills / expenses
  const [bills, setBills] = useState<Bill[]>([
    { id: 'infra', name: 'Infrastructure', amount: 2500 },
    { id: 'payroll', name: 'Payroll', amount: 5500 },
  ]);
  const billsTotal = useMemo(() => bills.reduce((s, b) => s + (b.amount || 0), 0), [bills]);

  // Derived counts
  const payingUsers = useMemo(() => totalUsers, [totalUsers]);
  const nRecruit = Math.round(payingUsers * pctRecruit / 100);
  const nPrivate = Math.round(payingUsers * pctPrivate / 100);
  const nCaptain = Math.round(payingUsers * pctCaptain / 100);
  const nCommando = Math.round(payingUsers * pctCommando / 100);

  // Monthly revenue by tier
  const revenueRecruit = nRecruit * priceRecruit;
  const revenuePrivate = nPrivate * pricePrivate;
  const revenueCaptain = nCaptain * priceCaptain;
  const revenueCommando = nCommando * priceCommando;
  const totalRevenue = revenueRecruit + revenuePrivate + revenueCaptain + revenueCommando;

  // Outreach payouts estimate:
  // Simple model: Apply base levels to all tiers, extend Captain to L5, Commando to L7.
  // Assumption: Referrals are spread across tiers proportionally.
  const basePct = (pL1 + pL2 + pL3 + pL4) / 100;
  const captainExtraPct = pL5 / 100;
  const commandoExtraPct = (pL5 + pL6 + pL7) / 100;

  const payoutsRecruit = revenueRecruit * basePct;
  const payoutsPrivate = revenuePrivate * basePct;
  const payoutsCaptain = revenueCaptain * (basePct + captainExtraPct);
  const payoutsCommando = revenueCommando * (basePct + commandoExtraPct);

  let grossPayouts = payoutsRecruit + payoutsPrivate + payoutsCaptain + payoutsCommando;

  // Apply Commando cap: earnings per Commando limited to 10k. We'll approximate by capping total commando payouts at 10k * number of Commandos.
  const commandoCap = nCommando * 10000;
  const commandoPayoutsCapped = Math.min(payoutsCommando, commandoCap);
  grossPayouts = payoutsRecruit + payoutsPrivate + payoutsCaptain + commandoPayoutsCapped;

  // Ministry tithe (first fruits to ministry from revenue)
  const ministryTithe = (ministryTithePct / 100) * totalRevenue;

  // Estimated active affiliates and growth
  const activeAffiliates = Math.round(payingUsers * (activeAffiliatesPct / 100));
  const monthlyNewUsersFromReferrals = Math.round(activeAffiliates * avgReferralsPerAffiliate * 0.2); // assume 20% conversion

  // Churn estimation
  const churnedUsers = Math.round(payingUsers * (churnPct / 100));
  const netUserDelta = monthlyNewUsersFromReferrals - churnedUsers;

  const netProfitBeforeTithe = totalRevenue - grossPayouts - platformCosts - billsTotal;
  const netProfitAfterTithe = netProfitBeforeTithe - ministryTithe;
  const profitMargin = totalRevenue > 0 ? (netProfitAfterTithe / totalRevenue) * 100 : 0;

  const addBill = () => setBills([...bills, { id: Math.random().toString(36).slice(2), name: '', amount: 0 }]);
  const updateBill = (id: string, field: keyof Bill, value: string) => {
    setBills((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: field === 'amount' ? Number(value) : value } : b)));
  };
  const removeBill = (id: string) => setBills((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-5 w-5 text-white" />
        <div>
          <h2 className="text-xl font-bold text-white heading-font">Christian Business Cost Calculator</h2>
          <p className="text-gray-400 text-sm">Model monthly revenue, outreach payouts, ministry tithe, and net profit.</p>
        </div>
      </div>

      {/* Assumptions */}
      <div className="bg-gray-900/50 border border-gray-700 p-4 mb-6">
        <h3 className="text-white font-semibold mb-3">Assumptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <NumberInput label="Total Paying Users" value={totalUsers} onChange={setTotalUsers} />
          <NumberInput label="% Recruit" value={pctRecruit} onChange={setPctRecruit} />
          <NumberInput label="% Private" value={pctPrivate} onChange={setPctPrivate} />
          <NumberInput label="% Captain" value={pctCaptain} onChange={setPctCaptain} />
          <NumberInput label="% Commando" value={pctCommando} onChange={setPctCommando} />
          <NumberInput label="Recruit Price" value={priceRecruit} onChange={setPriceRecruit} prefix="$" />
          <NumberInput label="Private Price" value={pricePrivate} onChange={setPricePrivate} prefix="$" />
          <NumberInput label="Captain Price" value={priceCaptain} onChange={setPriceCaptain} prefix="$" />
          <NumberInput label="Commando Price" value={priceCommando} onChange={setPriceCommando} prefix="$" />
          <NumberInput label="Platform Costs" value={platformCosts} onChange={setPlatformCosts} prefix="$" />
          <NumberInput label="Ministry Tithe %" value={ministryTithePct} onChange={setMinistryTithePct} />
          <NumberInput label="Active Affiliates %" value={activeAffiliatesPct} onChange={setActiveAffiliatesPct} />
          <NumberInput label="Avg Referrals / Affiliate" value={avgReferralsPerAffiliate} onChange={setAvgReferralsPerAffiliate} />
          <NumberInput label="Churn %" value={churnPct} onChange={setChurnPct} />
        </div>
      </div>

      {/* Bills */}
      <div className="bg-gray-900/50 border border-gray-700 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold inline-flex items-center gap-2">
            <Receipt className="h-4 w-4" /> Monthly Bills / Expenses
          </h3>
          <button onClick={addBill} className="text-white inline-flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Bill
          </button>
        </div>
        <div className="space-y-2">
          {bills.map((b) => (
            <div key={b.id} className="grid grid-cols-12 gap-2 items-center">
              <input
                value={b.name}
                onChange={(e) => updateBill(b.id, 'name', e.target.value)}
                placeholder="Name"
                className="col-span-7 bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm"
              />
              <div className="col-span-4 flex items-center bg-gray-800 border border-gray-700 px-2">
                <span className="text-gray-400 text-sm mr-1">$</span>
                <input
                  type="number"
                  value={b.amount}
                  onChange={(e) => updateBill(b.id, 'amount', e.target.value)}
                  className="w-full bg-transparent text-white py-2 text-sm outline-none"
                />
              </div>
              <button onClick={() => removeBill(b.id)} className="col-span-1 text-red-400 hover:text-red-300 flex items-center justify-center">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Structure */}
      <div className="bg-gray-900/50 border border-gray-700 p-4 mb-6">
        <h3 className="text-white font-semibold mb-3">Outreach Payout Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          <NumberInput label="L1 %" value={pL1} onChange={setPL1} />
          <NumberInput label="L2 %" value={pL2} onChange={setPL2} />
          <NumberInput label="L3 %" value={pL3} onChange={setPL3} />
          <NumberInput label="L4 %" value={pL4} onChange={setPL4} />
          <NumberInput label="L5 %" value={pL5} onChange={setPL5} />
          <NumberInput label="L6 %" value={pL6} onChange={setPL6} />
          <NumberInput label="L7 %" value={pL7} onChange={setPL7} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Captain extends to L5. Commando extends to L7. Commando tier capped at $10,000 per month per user.
        </p>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <KPI icon={<Users className="h-5 w-5" />} label="Paying Users" value={payingUsers.toLocaleString()} />
        <KPI icon={<DollarSign className="h-5 w-5" />} label="Monthly Revenue" value={fmt(totalRevenue)} />
        <KPI icon={<HandCoins className="h-5 w-5" />} label="Outreach Payouts" value={fmt(grossPayouts)} />
        <KPI icon={<HeartHandshake className="h-5 w-5" />} label="Ministry Tithe" value={fmt(ministryTithe)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Tier Breakdown" icon={<TrendingUp className="h-5 w-5" />} items={[
          { label: 'Recruit', value: `${nRecruit.toLocaleString()} • ${fmt(revenueRecruit)}` },
          { label: 'Private', value: `${nPrivate.toLocaleString()} • ${fmt(revenuePrivate)}` },
          { label: 'Captain', value: `${nCaptain.toLocaleString()} • ${fmt(revenueCaptain)}` },
          { label: 'Commando', value: `${nCommando.toLocaleString()} • ${fmt(revenueCommando)}` },
        ]} />
        <Card title="Network Activity" icon={<Users className="h-5 w-5" />} items={[
          { label: 'Active Affiliates', value: activeAffiliates.toLocaleString() },
          { label: 'Est. New Users / Mo', value: monthlyNewUsersFromReferrals.toLocaleString() },
          { label: 'Churned Users / Mo', value: churnedUsers.toLocaleString() },
          { label: 'Net User Delta', value: (netUserDelta >= 0 ? '+' : '') + netUserDelta.toLocaleString() },
        ]} />
        <Card title="Profitability" icon={<DollarSign className="h-5 w-5" />} items={[
          { label: 'Platform Costs', value: fmt(platformCosts) },
          { label: 'Bills Total', value: fmt(billsTotal) },
          { label: 'Net Profit (after tithe)', value: fmt(netProfitAfterTithe) },
          { label: 'Margin', value: `${profitMargin.toFixed(1)}%` },
        ]} />
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange, prefix }: { label: string; value: number; onChange: (n: number) => void; prefix?: string }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs text-gray-400">{label}</label>
      <div className="flex items-center bg-gray-800 border border-gray-700 px-2">
        {prefix && <span className="text-gray-400 text-sm mr-1">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-white py-2 text-sm outline-none"
        />
      </div>
    </div>
  );
}

function KPI({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 p-4">
      <div className="flex items-center gap-2 text-white">
        {icon}
        <div className="text-xs text-gray-400">{label}</div>
      </div>
      <div className="text-2xl font-bold text-white heading-font mt-2">{value}</div>
    </div>
  );
}

function Card({ title, icon, items }: { title: string; icon: React.ReactNode; items: { label: string; value: string }[] }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 p-4">
      <div className="flex items-center gap-2 text-white mb-2">
        {icon}
        <div className="font-semibold">{title}</div>
      </div>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="text-gray-300">{it.label}</div>
            <div className="text-white font-semibold">{it.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}
