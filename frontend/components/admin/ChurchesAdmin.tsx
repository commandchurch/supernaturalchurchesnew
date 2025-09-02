import React, { useState } from 'react';
import { Church, BookOpen, Users, Search, Eye, CheckCircle, Clock } from 'lucide-react';

export default function ChurchesAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Example church data - replace with real backend integration
  const churchStats = {
    totalChurches: 1,
    activeChurches: 1,
    inactiveChurches: 0,
    totalCourses: 12
  };

  const churches = [
    {
      id: 1,
      churchName: 'Grace Community Church - EXAMPLE',
      pastorName: 'Pastor Michael Roberts',
      email: 'pastor@gracecommunity.org',
      phone: '+1 (555) 123-4567',
      location: 'Austin, TX',
      status: 'active',
      joinedDate: '2024-01-15',
      coursesCompleted: [
        { id: 1, name: 'Supernatural Ministry Basics', completedDate: '2024-02-01', status: 'completed' },
        { id: 2, name: 'Prayer & Intercession', completedDate: '2024-02-15', status: 'completed' },
        { id: 3, name: 'Healing Ministry', completedDate: '2024-03-01', status: 'completed' },
        { id: 4, name: 'Prophetic Ministry', completedDate: null, status: 'in-progress' }
      ],
      affiliateMembers: [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah@gracecommunity.org',
          joinedDate: '2024-02-01',
          status: 'active',
          monthlyRevenue: 285.50,
          totalRevenue: 2565.00,
          churchShare: 199.55, // 70% of monthly
          ourShare: 85.95 // 30% of monthly
        },
        {
          id: 2,
          name: 'Mike Davis',
          email: 'mike@gracecommunity.org',
          joinedDate: '2024-01-20',
          status: 'active',
          monthlyRevenue: 420.00,
          totalRevenue: 3780.00,
          churchShare: 294.00,
          ourShare: 126.00
        },
        {
          id: 3,
          name: 'Lisa Thompson',
          email: 'lisa@gracecommunity.org',
          joinedDate: '2024-03-15',
          status: 'active',
          monthlyRevenue: 150.25,
          totalRevenue: 901.50,
          churchShare: 105.18,
          ourShare: 45.07
        }
      ],
      totalMonthlyRevenue: 855.75,
      totalChurchShare: 598.73,
      totalOurShare: 257.02,
      activeAffiliateMembers: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'inactive': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'not-started': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Church className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Churches</h2>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-600 p-4 text-white border border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Total Churches</p>
                <p className="text-2xl font-bold">{churchStats.totalChurches}</p>
              </div>
              <Church className="h-6 w-6 text-blue-200" />
            </div>
          </div>

          <div className="bg-green-600 p-4 text-white border border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100">Active Churches</p>
                <p className="text-2xl font-bold">{churchStats.activeChurches}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-200" />
            </div>
          </div>

          <div className="bg-red-600 p-4 text-white border border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-100">Inactive Churches</p>
                <p className="text-2xl font-bold">{churchStats.inactiveChurches}</p>
              </div>
              <Clock className="h-6 w-6 text-red-200" />
            </div>
          </div>

          <div className="bg-purple-600 p-4 text-white border border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-100">Courses Available</p>
                <p className="text-2xl font-bold">{churchStats.totalCourses}</p>
              </div>
              <BookOpen className="h-6 w-6 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 border border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search churches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Churches List */}
        <div className="space-y-6">
          {churches.map((church) => (
            <div key={church.id} className="bg-gray-800/50 border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Church className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{church.churchName}</h3>
                    <p className="text-gray-400">{church.pastorName}</p>
                    <p className="text-gray-500 text-sm">{church.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-sm font-medium ${getStatusColor(church.status)}`}>
                    {church.status.toUpperCase()}
                  </span>
                  <p className="text-gray-400 text-sm mt-1">Joined: {church.joinedDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="text-gray-500">Email:</span> {church.email}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-500">Phone:</span> {church.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Course Progress</h4>
                  <div className="space-y-2">
                    {church.coursesCompleted.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-2 bg-gray-700/50 border border-gray-600">
                        <div>
                          <p className="text-white text-sm font-medium">{course.name}</p>
                          {course.completedDate && (
                            <p className="text-gray-500 text-xs">Completed: {course.completedDate}</p>
                          )}
                        </div>
                        <span className={`font-medium text-sm ${getCourseStatusColor(course.status)}`}>
                          {course.status === 'completed' ? 'COMPLETED' : 
                           course.status === 'in-progress' ? 'IN PROGRESS' : 'NOT STARTED'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Affiliate Members Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Active Affiliate Members ({church.activeAffiliateMembers})</h4>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">Monthly Revenue: ${church.totalMonthlyRevenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-400">Church: ${church.totalChurchShare.toFixed(2)} | Our Share: ${church.totalOurShare.toFixed(2)}</p>
                  </div>
                </div>
                
                {/* Show only first 2 members with CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  {church.affiliateMembers.slice(0, 2).map((member) => (
                    <div key={member.id} className="bg-gray-700/50 border border-gray-600 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-white font-medium">{member.name}</h5>
                        <span className="text-green-400 text-sm font-medium">{member.status.toUpperCase()}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-400">Email: {member.email}</p>
                        <p className="text-gray-400">Joined: {member.joinedDate}</p>
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Monthly:</span>
                            <span className="text-white">${member.monthlyRevenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total:</span>
                            <span className="text-white">${member.totalRevenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-400">Church (70%):</span>
                            <span className="text-blue-400">${member.churchShare.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-400">Our Share (30%):</span>
                            <span className="text-green-400">${member.ourShare.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Show All CTA */}
                <div className="bg-gray-800/50 border border-gray-700 p-4 text-center">
                  <p className="text-gray-300 mb-3">Showing 2 of {church.activeAffiliateMembers} affiliate members</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm border border-blue-500">
                    Show All Affiliate Members
                  </button>
                </div>
              </div>

              <div className="mt-4 flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm">
                  Assign Course
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-6 mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Church Management Features</h3>
          <div className="space-y-4">
            <div className="text-gray-300">
              <p>• Track course completion progress</p>
              <p>• Manage active/inactive status</p>
              <p>• Contact information management</p>
              <p>• Course assignment and tracking</p>
              <p>• Progress reports and analytics</p>
            </div>
            <p className="text-yellow-400 text-sm">
              Note: This is an EXAMPLE implementation. Connect to real backend for full functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
