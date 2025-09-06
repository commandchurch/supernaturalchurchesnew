import React from 'react';
import { Users, UserCheck, Clock } from 'lucide-react';

export default function StaffManager() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Staff Management</h2>
        </div>
        <p className="text-gray-400">Manage staff accounts and permissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Staff</p>
              <p className="text-xl font-bold text-white">15</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <UserCheck className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Active Staff</p>
              <p className="text-xl font-bold text-white">12</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">Pending Approval</p>
              <p className="text-xl font-bold text-white">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}