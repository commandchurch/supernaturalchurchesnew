import React from 'react';
import { Crown, Network, Wallet, CheckCircle2, Clock3, RefreshCw } from 'lucide-react';
import DownlineTree from './DownlineTree';

type ProfileItem = {
  userId: string;
  rank: string;
  directReferrals: number;
  weeklyEarnings: number;
};

type LeaderboardItem = {
  userId: string;
  rank: string;
  level: number;
  weeklyEarnings: number;
  totalEarnings: number;
};

type WithdrawalItem = {
  id: number;
  affiliateId: string;
  walletAddress: string;
  amount: number;
  status: 'pending' | 'completed';
  processedAt?: string;
};

type DownlineNode = {
  userId: string;
  level: number;
  earnings: number;
};

type ProfilesData = { profiles: ProfileItem[] } | undefined;
type LeaderboardData = { leaderboard: LeaderboardItem[] } | undefined;
type WithdrawalsData = { withdrawals: WithdrawalItem[] } | undefined;
type DownlineData = { downline: DownlineNode[] } | undefined;

interface OutreachAdminProps {
  profiles: ProfilesData;
  leaderboard: LeaderboardData;
  withdrawals: WithdrawalsData;
  downline: DownlineData;
  selectedUserId: string | null;
  setSelectedUserId: (id: string) => void;
  seedMutation: any;
  approveWithdrawalMutation: any;
  formatCurrency: (n: number) => string;
}

export default function OutreachAdmin({
  profiles,
  leaderboard,
  withdrawals,
  downline,
  selectedUserId,
  setSelectedUserId,
  seedMutation,
  approveWithdrawalMutation,
  formatCurrency,
}: OutreachAdminProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-800/50 border border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <Network className="h-5 w-5 text-white" />
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white heading-font">Soul Outreach Network</h2>
            <p className="text-gray-400 text-xs md:text-sm">Manage leaders, view downlines, payouts, and seed demo data.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => seedMutation.mutate()}
            className="bg-white text-black hover:bg-gray-200 px-3 md:px-4 py-2 font-semibold uppercase tracking-wide inline-flex items-center text-xs md:text-sm"
            disabled={seedMutation.isPending}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${seedMutation.isPending ? 'animate-spin' : ''}`} />
            {seedMutation.isPending ? 'Seeding...' : 'Seed Demo Data'}
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <section>
        <h3 className="text-lg font-bold text-white mb-4 heading-font inline-flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-300" /> Top Earners
        </h3>
        <div className="overflow-x-auto bg-gray-800/50 border border-gray-700">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-3 px-3">User</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Rank</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Level</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Weekly</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard?.leaderboard.map((e) => (
                <tr key={e.userId} className="border-b border-gray-700">
                  <td className="py-3 px-3 text-white">{e.userId}</td>
                  <td className="py-3 px-3 text-white">{e.rank}</td>
                  <td className="py-3 px-3 text-white">{e.level}</td>
                  <td className="py-3 px-3 text-white">{formatCurrency(e.weeklyEarnings)}</td>
                  <td className="py-3 px-3 text-white">{formatCurrency(e.totalEarnings)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Profiles + Downline */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-white mb-4 heading-font">Leaders</h3>
          <div className="bg-gray-800/50 border border-gray-700 divide-y divide-gray-700">
            {profiles?.profiles.map((p) => (
              <button
                key={p.userId}
                onClick={() => setSelectedUserId(p.userId)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-700/50 ${selectedUserId === p.userId ? 'bg-white/5' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{p.userId}</div>
                    <div className="text-gray-400 text-xs">Rank: {p.rank} • Direct: {p.directReferrals}</div>
                  </div>
                  <div className="text-white font-bold">{formatCurrency(p.weeklyEarnings)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-4 heading-font">Downline</h3>
          <div className="bg-gray-800/50 border border-gray-700 p-4">
            {selectedUserId ? (
              <div>
                {downline?.downline && downline.downline.length > 0 ? (
                  <DownlineTree nodes={downline.downline} formatCurrency={formatCurrency} />
                ) : (
                  <p className="text-gray-400">No downline found for {selectedUserId}.</p>
                )}
              </div>
            ) : (
              <p className="text-gray-400">Select a leader to view their downline.</p>
            )}
          </div>
        </div>
      </section>

      {/* Withdrawals */}
      <section>
        <h3 className="text-lg font-bold text-white mb-4 heading-font inline-flex items-center gap-2">
          <Wallet className="h-5 w-5 text-teal-300" /> Withdrawals
        </h3>
        <div className="overflow-x-auto bg-gray-800/50 border border-gray-700">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-3 px-3">ID</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Affiliate</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Wallet</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Amount</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals?.withdrawals.map((w) => (
                <tr key={w.id} className="border-b border-gray-700">
                  <td className="py-3 px-3 text-white">{w.id}</td>
                  <td className="py-3 px-3 text-white">{w.affiliateId}</td>
                  <td className="py-3 px-3 text-gray-300">{w.walletAddress}</td>
                  <td className="py-3 px-3 text-white">{formatCurrency(w.amount)}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 text-xs font-semibold ${
                      w.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {w.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {w.status !== 'completed' ? (
                      <button
                        onClick={() => approveWithdrawalMutation.mutate(w.id)}
                        className="text-green-400 hover:text-green-300 inline-flex items-center gap-1"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Approve
                      </button>
                    ) : (
                      <span className="text-gray-500 inline-flex items-center gap-1">
                        <Clock3 className="h-4 w-4" /> {w.processedAt ? new Date(w.processedAt).toLocaleDateString() : 'Processed'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
