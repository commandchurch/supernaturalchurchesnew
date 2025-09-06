import React from 'react';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';

export default function TestimoniesAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Testimony Management</h2>
        </div>
        <p className="text-gray-400">Review and manage user testimonies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">Pending Review</p>
              <p className="text-xl font-bold text-white">3</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Approved</p>
              <p className="text-xl font-bold text-white">127</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Testimonies</p>
              <p className="text-xl font-bold text-white">130</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}