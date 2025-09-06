import React from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';

export default function EventsManager() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Events Management</h2>
        </div>
        <p className="text-gray-400">Manage church events and gatherings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Upcoming Events</p>
              <p className="text-xl font-bold text-white">8</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Registrations</p>
              <p className="text-xl font-bold text-white">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Event Locations</p>
              <p className="text-xl font-bold text-white">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}