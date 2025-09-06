import React from 'react';
import { Headphones, MessageSquare, Clock } from 'lucide-react';

export default function SupportAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Headphones className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Support Management</h2>
        </div>
        <p className="text-gray-400">Manage support tickets and customer inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Open Tickets</p>
              <p className="text-xl font-bold text-white">12</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">Pending Response</p>
              <p className="text-xl font-bold text-white">5</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Headphones className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Resolved Today</p>
              <p className="text-xl font-bold text-white">8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}