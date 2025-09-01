import React from 'react';
import { Eye, CheckCircle2, Trash2 } from 'lucide-react';

type NeedItem = {
  id: number;
  title: string;
  amountNeeded: number;
  amountRaised: number;
  status: 'pending' | 'approved' | 'rejected';
};

type TransactionItem = {
  id: string;
  description: string;
  amount: number;
  type: 'contribution' | 'withdrawal';
  createdAt: string;
};

type NeedsData = { needs: NeedItem[] } | undefined;
type TransactionsData = { transactions: TransactionItem[] } | undefined;

interface FundAdminProps {
  needs: NeedsData;
  transactions: TransactionsData;
  formatCurrency: (n: number) => string;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  approving: boolean;
  rejecting: boolean;
}

const FundAdmin = ({ needs, transactions, formatCurrency, onApprove, onReject, approving, rejecting }: FundAdminProps) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h2 className="text-lg md:text-xl font-bold text-white heading-font">Manage Help Me Fund</h2>
        <a href="/help-me-fund" className="bg-white text-black hover:bg-gray-200 px-3 md:px-4 py-2 font-semibold uppercase tracking-wide text-xs md:text-sm">
          View Public Page
        </a>
      </div>
      
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-semibold py-3 px-2">Title</th>
              <th className="text-left text-gray-400 font-semibold py-3 px-2">Amount Needed</th>
              <th className="text-left text-gray-400 font-semibold py-3 px-2">Amount Raised</th>
              <th className="text-left text-gray-400 font-semibold py-3 px-2">Status</th>
              <th className="text-left text-gray-400 font-semibold py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {needs?.needs.map((need) => (
              <tr key={need.id} className="border-b border-gray-700">
                <td className="py-3 px-2 text-white">{need.title}</td>
                <td className="py-3 px-2 text-white">{formatCurrency(need.amountNeeded)}</td>
                <td className="py-3 px-2 text-white">{formatCurrency(need.amountRaised)}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 text-[11px] md:text-xs font-semibold ${
                    need.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    need.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {need.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex flex-wrap gap-2">
                    {need.status === 'pending' && (
                      <>
                        <button onClick={() => onApprove(need.id)} className="text-green-400 hover:text-green-300 inline-flex items-center gap-1" disabled={approving}>
                          <CheckCircle2 className="h-4 w-4" /> Approve
                        </button>
                        <button onClick={() => onReject(need.id)} className="text-red-400 hover:text-red-300 inline-flex items-center gap-1" disabled={rejecting}>
                          <Trash2 className="h-4 w-4" /> Reject
                        </button>
                      </>
                    )}
                    {need.status !== 'pending' && (
                      <button className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
                        <Eye className="h-4 w-4" /> View
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!needs?.needs?.length && (
              <tr><td colSpan={5} className="text-gray-400 py-4">No needs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-bold text-white mb-4 heading-font">Recent Activity</h3>
      <div className="bg-gray-900/50 border border-gray-700 p-3 md:p-4">
        <div className="space-y-3">
          {transactions?.transactions.slice(0, 8).map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
              <div>
                <p className="text-white text-sm">{activity.description}</p>
                <p className="text-gray-400 text-xs">{new Date(activity.createdAt).toLocaleDateString()}</p>
              </div>
              <div className={`text-sm font-bold ${activity.type === 'contribution' ? 'text-green-400' : 'text-red-400'}`}>
                {activity.type === 'contribution' ? '+' : ''}{formatCurrency(activity.amount)}
              </div>
            </div>
          ))}
          {!transactions?.transactions?.length && (
            <div className="text-gray-400 text-sm">No recent transactions.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundAdmin;
