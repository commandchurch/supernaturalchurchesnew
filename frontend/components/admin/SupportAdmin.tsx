import React, { useState } from 'react';
import { Headphones, MessageSquare, AlertTriangle, CheckCircle, Clock, Search, Filter, Eye, Reply } from 'lucide-react';

export default function SupportAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock support tickets data - EXAMPLE ONLY
  const supportTickets = [
    {
      id: 1,
      userName: 'John Smith',
      email: 'john@example.com',
      membershipTier: 'PROFESSIONAL',
      subject: 'Cannot Access Dashboard - EXAMPLE',
      message: 'EXAMPLE: I\'m unable to log into my dashboard. Getting an error message saying "Invalid credentials" but I\'m sure my password is correct.',
      category: 'login',
      status: 'open',
      priority: 'high',
      createdAt: '2024-08-29 08:30 AM',
      lastActivity: '2024-08-29 08:30 AM',
      responses: 0
    }
  ];

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-600 text-white';
      case 'in-progress': return 'bg-yellow-600 text-white';
      case 'resolved': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Headphones className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Support Tickets</h2>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-red-600 p-4 text-white border border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-100">Open Tickets</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-200" />
            </div>
          </div>

          <div className="bg-yellow-600 p-4 text-white border border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-100">In Progress</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Clock className="h-6 w-6 text-yellow-200" />
            </div>
          </div>

          <div className="bg-green-600 p-4 text-white border border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100">Resolved Today</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-200" />
            </div>
          </div>

          <div className="bg-blue-600 p-4 text-white border border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Avg Response Time</p>
                <p className="text-2xl font-bold">N/A</p>
              </div>
              <MessageSquare className="h-6 w-6 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 border border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
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
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-gray-800/50 border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-4 text-gray-300 font-medium">Ticket</th>
                  <th className="text-left p-4 text-gray-300 font-medium">User</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Category</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Priority</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Created</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="p-4">
                      <div className="text-white font-medium">{ticket.subject}</div>
                      <div className="text-gray-500 text-xs">#{ticket.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">{ticket.userName}</div>
                      <div className="text-gray-500 text-xs">{ticket.membershipTier}</div>
                    </td>
                    <td className="p-4 text-gray-300 capitalize">{ticket.category}</td>
                    <td className="p-4">
                      <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{ticket.createdAt}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>View - EXAMPLE</span>
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs flex items-center space-x-1">
                          <Reply className="h-3 w-3" />
                          <span>Reply - EXAMPLE</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-6 mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Support Features - EXAMPLE ONLY</h3>
          <div className="space-y-4">
            <div className="text-gray-300">
              <p>• Real-time ticket tracking and management</p>
              <p>• Priority-based categorization (High/Medium/Low)</p>
              <p>• Direct communication with users</p>
              <p>• Response time monitoring</p>
              <p>• Resolution tracking and analytics</p>
            </div>
            <p className="text-yellow-400 text-sm">
              Note: This is an EXAMPLE implementation. Actions do not work. Connect to real backend for full functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
