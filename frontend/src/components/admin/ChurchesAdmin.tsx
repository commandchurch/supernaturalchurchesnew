import React from 'react';
import { Church, Users, MapPin } from 'lucide-react';

export default function ChurchesAdmin() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Church className="h-6 w-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Church Management</h2>
        </div>
        <p className="text-gray-400">Manage church partnerships and directories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Church className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Churches</p>
              <p className="text-xl font-bold text-white">156</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Active Members</p>
              <p className="text-xl font-bold text-white">2,847</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Locations</p>
              <p className="text-xl font-bold text-white">23</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}