import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export default function OverviewAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">System Overview</h2>
        <p className="text-gray-400">
          Welcome to the admin dashboard. This is the main overview page where you can see key system metrics and manage your application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-blue-400">1,247</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-green-400">$12,450</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Sessions</p>
              <p className="text-2xl font-bold text-purple-400">89</p>
            </div>
            <Activity className="h-8 w-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Growth Rate</p>
              <p className="text-2xl font-bold text-orange-400">+15.2%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
}