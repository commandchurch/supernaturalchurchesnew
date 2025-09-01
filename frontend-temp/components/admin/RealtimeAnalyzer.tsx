import React, { useEffect, useState } from 'react';

import { Activity, RefreshCw } from 'lucide-react';

export default function RealtimeAnalyzer() {
  const [connected, setConnected] = useState(true);
  const [refreshTime, setRefreshTime] = useState(Date.now());

  // Mock balance and transactions data
  const balance = {
    totalAmount: 15000,
    reservedAmount: 2500,
    availableAmount: 12500
  };

  const transactions = {
    transactions: [
      { id: '1', amount: 500, description: 'Church donation', type: 'credit', date: new Date().toISOString() },
      { id: '2', amount: 200, description: 'Mission support', type: 'debit', date: new Date().toISOString() },
      { id: '3', amount: 750, description: 'Event funding', type: 'credit', date: new Date().toISOString() }
    ]
  };

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const latest = balance && transactions ? {
    totalAmount: balance.totalAmount || 0,
    reservedAmount: balance.reservedAmount || 0,
    availableAmount: balance.availableAmount || 0,
    recentTransactions: transactions.transactions?.slice(0, 10) || [],
    timestamp: refreshTime
  } : null;

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Activity className={`h-5 w-5 ${connected ? 'text-green-400' : 'text-gray-400'}`} />
        <h2 className="text-xl font-bold text-white heading-font">Real-Time Analyzer</h2>
        <RefreshCw className="h-4 w-4 text-gray-400" />
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Live feed of fund balances and recent transactions. This will auto-update every few seconds.
      </p>

      {latest ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Metric label="Total Amount" value={fmt(latest.totalAmount)} />
            <Metric label="Reserved" value={fmt(latest.reservedAmount)} />
            <Metric label="Available" value={fmt(latest.availableAmount)} />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Recent Transactions</h3>
            <div className="bg-gray-900/50 border border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 px-3 py-2">ID</th>
                    <th className="text-left text-gray-400 px-3 py-2">Type</th>
                    <th className="text-left text-gray-400 px-3 py-2">Description</th>
                    <th className="text-left text-gray-400 px-3 py-2">Amount</th>
                    <th className="text-left text-gray-400 px-3 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {latest.recentTransactions.map(tx => (
                    <tr key={tx.id} className="border-b border-gray-800">
                      <td className="px-3 py-2 text-white">{tx.id}</td>
                      <td className="px-3 py-2 text-gray-300">{tx.type}</td>
                      <td className="px-3 py-2 text-gray-300">{tx.description}</td>
                      <td className={`px-3 py-2 ${tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>{fmt(tx.amount)}</td>
                      <td className="px-3 py-2 text-gray-400">{new Date(tx.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-500 mt-2">Last update: {new Date(latest.timestamp).toLocaleTimeString()}</div>
          </div>
        </>
      ) : (
        <div className="text-gray-400">Waiting for first snapshot...</div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 p-4">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-white heading-font">{value}</div>
    </div>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}
