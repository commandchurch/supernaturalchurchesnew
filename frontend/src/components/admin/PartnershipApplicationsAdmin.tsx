import React from 'react';
import { Handshake, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function PartnershipApplicationsAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Handshake className="h-6 w-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Partnership Applications</h2>
        </div>
        <p className="text-gray-400">Review and manage church partnership applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-sm">Pending Review</p>
              <p className="text-xl font-bold text-white">7</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Approved</p>
              <p className="text-xl font-bold text-white">23</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-gray-400 text-sm">Rejected</p>
              <p className="text-xl font-bold text-white">3</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Handshake className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Active Partners</p>
              <p className="text-xl font-bold text-white">156</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}