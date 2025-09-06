import React from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminCostCalculator() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-6 w-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Cost Calculator</h2>
        </div>
        <p className="text-gray-400">Calculate costs and analyze financial metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Monthly Revenue</p>
              <p className="text-xl font-bold text-white">$12,450</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calculator className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Operating Costs</p>
              <p className="text-xl font-bold text-white">$3,200</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Net Profit</p>
              <p className="text-xl font-bold text-white">$9,250</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}