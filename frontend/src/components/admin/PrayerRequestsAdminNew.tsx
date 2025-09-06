import React from 'react';
import { Heart, Clock, CheckCircle } from 'lucide-react';

export default function PrayerRequestsAdminNew() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="h-6 w-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">Prayer Requests</h2>
        </div>
        <p className="text-gray-400">Manage prayer requests and pastoral care.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">Pending Requests</p>
              <p className="text-xl font-bold text-white">23</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-gray-400 text-sm">Urgent Prayers</p>
              <p className="text-xl font-bold text-white">5</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Answered This Week</p>
              <p className="text-xl font-bold text-white">47</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}