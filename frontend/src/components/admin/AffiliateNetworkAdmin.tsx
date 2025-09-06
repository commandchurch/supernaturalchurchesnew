import React from 'react';
import { Users, DollarSign, TrendingUp } from 'lucide-react';

export default function AffiliateNetworkAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Affiliate Network</h2>
        </div>
        <p className="text-gray-400">Manage affiliate partnerships and commissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Active Affiliates</p>
              <p className="text-xl font-bold text-white">247</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Monthly Commissions</p>
              <p className="text-xl font-bold text-white">$8,450</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Conversion Rate</p>
              <p className="text-xl font-bold text-white">12.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}