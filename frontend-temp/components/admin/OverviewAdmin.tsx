import React from 'react';
import { TrendingUp, Users, Heart, MessageSquare, AlertTriangle, Calendar, Star, Headphones, UserCheck } from 'lucide-react';

export default function OverviewAdmin() {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard Overview</h2>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-600 p-6 text-white border border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active Affiliates</p>
                <p className="text-3xl font-bold">2,847</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
            <p className="text-green-100 text-sm mt-2">+234 new this month</p>
          </div>
          
          <div className="bg-blue-600 p-6 text-white border border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Church Partnerships</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-200" />
            </div>
            <p className="text-blue-100 text-sm mt-2">28 active</p>
          </div>
          
          <div className="bg-purple-600 p-6 text-white border border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Prayer Requests</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <Heart className="h-8 w-8 text-purple-200" />
            </div>
            <p className="text-purple-100 text-sm mt-2">23 urgent</p>
          </div>
          
          <div className="bg-orange-600 p-6 text-white border border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Support Tickets</p>
                <p className="text-3xl font-bold">42</p>
              </div>
              <Headphones className="h-8 w-8 text-orange-200" />
            </div>
            <p className="text-orange-100 text-sm mt-2">8 pending response</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-black/50 p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity - EXAMPLE</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400"></div>
                <p className="text-gray-300 text-sm">EXAMPLE: New affiliate registration - Sarah Johnson</p>
                <span className="text-gray-500 text-xs">2 min ago</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button className="text-blue-400 hover:text-blue-300 text-sm">View All Activity</button>
            </div>
          </div>

          <div className="bg-black/50 p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Urgent Tasks (Over 24 Hours)</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-900/30 border border-red-700">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Support Ticket #1247</p>
                    <p className="text-gray-400 text-xs">Login issues - 28 hours old</p>
                  </div>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs">
                  Respond
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-900/30 border border-yellow-700">
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Urgent Prayer Request</p>
                    <p className="text-gray-400 text-xs">Medical emergency - 26 hours old</p>
                  </div>
                </div>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 text-xs">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-900/30 border border-orange-700">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Church Partnership Inquiry</p>
                    <p className="text-gray-400 text-xs">Grace Community Church - 32 hours old</p>
                  </div>
                </div>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 text-xs">
                  Contact
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-900/30 border border-purple-700">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Testimony Awaiting Review</p>
                    <p className="text-gray-400 text-xs">Healing testimony - 29 hours old</p>
                  </div>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-xs">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-900/30 border border-blue-700">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Event Registration Issue</p>
                    <p className="text-gray-400 text-xs">Payment failed - 25 hours old</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs">
                  Resolve
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-black/50 p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-400 mx-auto mb-2"></div>
              <p className="text-white font-medium">API Services</p>
              <p className="text-gray-400 text-sm">All systems operational</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-green-400 mx-auto mb-2"></div>
              <p className="text-white font-medium">Database</p>
              <p className="text-gray-400 text-sm">Response time: 45ms</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-yellow-400 mx-auto mb-2"></div>
              <p className="text-white font-medium">Email Service</p>
              <p className="text-gray-400 text-sm">Minor delays detected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
