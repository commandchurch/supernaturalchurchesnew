import React from 'react';
import { Shield, AlertTriangle, Ban } from 'lucide-react';

export default function BlacklistAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">Blacklist Management</h2>
        </div>
        <p className="text-gray-400">Manage blocked users and suspicious activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Ban className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-gray-400 text-sm">Blocked Users</p>
              <p className="text-xl font-bold text-white">12</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">Suspicious IPs</p>
              <p className="text-xl font-bold text-white">8</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Auto-Blocked</p>
              <p className="text-xl font-bold text-white">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}