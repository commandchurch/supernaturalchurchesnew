import React from 'react';
import { DollarSign, Heart, TrendingUp } from 'lucide-react';

export default function FundAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="h-6 w-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">Help Me Fund</h2>
        </div>
        <p className="text-gray-400">Manage emergency support for ministry families.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Funds Distributed</p>
              <p className="text-xl font-bold text-white">$12,450</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-gray-400 text-sm">Families Helped</p>
              <p className="text-xl font-bold text-white">23</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="text-xl font-bold text-white">98%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}