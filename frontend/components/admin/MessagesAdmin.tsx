import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Headphones, Church, Search, Filter, Eye, Reply, CheckCircle, Clock, AlertTriangle, User, Mail } from 'lucide-react';
import client from '../../client';

export default function MessagesAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [prayerRequests, setPrayerRequests] = useState<any>(null);
  const [testimonies, setTestimonies] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prayerRes, testimoniesRes] = await Promise.all([
          client.church.listPrayerRequests(),
          client.church.listTestimoniesAdmin()
        ]);
        setPrayerRequests(prayerRes);
        setTestimonies(testimoniesRes);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Mock support tickets data - EXAMPLE ONLY
  const mockSupportTickets = [
    {
      id: 1,
      type: 'support',
      userName: 'John Smith',
      email: 'john@example.com',
      subject: 'Cannot Access Dashboard - EXAMPLE',
      message: 'EXAMPLE: I\'m unable to log into my dashboard. Getting an error message saying "Invalid credentials" but I\'m sure my password is correct.',
      status: 'open',
      priority: 'high',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      category: 'login'
    }
  ];

  // Combine all messages into a unified list
  const allMessages: any[] = React.useMemo(() => {
    const messages: any[] = [];

    // Add prayer requests
    if (prayerRequests?.prayerRequests) {
      prayerRequests.prayerRequests.forEach((request: any) => {
        messages.push({
          id: `prayer-${request.id}`,
          type: 'prayer',
          userName: request.name || 'Anonymous',
          email: request.email || '',
          subject: 'Prayer Request',
          message: request.request,
          status: request.status,
          priority: request.isUrgent ? 'urgent' : 'normal',
          createdAt: request.createdAt,
          category: 'prayer',
          originalData: request
        });
      });
    }

    // Add testimonies
    if (testimonies?.testimonies) {
      testimonies.testimonies.forEach((testimony: any) => {
        messages.push({
          id: `testimony-${testimony.id}`,
          type: 'testimony',
          userName: 'Anonymous', // Testimonies don't have user names in the current structure
          email: '',
          subject: 'Testimony',
          message: testimony.contentText || 'Video testimony',
          status: testimony.status,
          priority: 'normal',
          createdAt: testimony.createdAt,
          category: 'testimony',
          originalData: testimony
        });
      });
    }

    // Add support tickets
    mockSupportTickets.forEach((ticket: any) => {
      messages.push(ticket);
    });

    // Sort by created date (newest first)
    return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [prayerRequests, testimonies]);

  // Filter messages
  const filteredMessages = allMessages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || message.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || message.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Reply mutations


  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prayer': return <Heart className="h-4 w-4 text-red-400" />;
      case 'support': return <Headphones className="h-4 w-4 text-blue-400" />;
      case 'partnership': return <Church className="h-4 w-4 text-green-400" />;
      case 'testimony': return <MessageSquare className="h-4 w-4 text-purple-400" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600 text-white';
      case 'open': return 'bg-red-600 text-white';
      case 'in-progress': return 'bg-blue-600 text-white';
      case 'approved': return 'bg-green-600 text-white';
      case 'rejected': return 'bg-gray-600 text-white';
      case 'answered': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'normal': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'prayer': return 'Prayer Request';
      case 'support': return 'Support Ticket';
      case 'partnership': return 'Partnership';
      case 'testimony': return 'Testimony';
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Messages</h2>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-600 p-4 text-white border border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-100">Prayer Requests</p>
                <p className="text-2xl font-bold">{prayerRequests?.prayerRequests?.length || 0}</p>
              </div>
              <Heart className="h-6 w-6 text-red-200" />
            </div>
          </div>

          <div className="bg-blue-600 p-4 text-white border border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Support Tickets - EXAMPLE</p>
                <p className="text-2xl font-bold">{mockSupportTickets.length}</p>
              </div>
              <Headphones className="h-6 w-6 text-blue-200" />
            </div>
          </div>

          <div className="bg-purple-600 p-4 text-white border border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-100">Testimonies</p>
                <p className="text-2xl font-bold">{testimonies?.testimonies?.length || 0}</p>
              </div>
              <MessageSquare className="h-6 w-6 text-purple-200" />
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
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="prayer">Prayer Requests</option>
              <option value="support">Support Tickets</option>
              <option value="testimony">Testimonies</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="approved">Approved</option>
              <option value="answered">Answered</option>
            </select>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-gray-800/50 border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-4 text-gray-300 font-medium">Type</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Subject</th>
                  <th className="text-left p-4 text-gray-300 font-medium">From</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Category</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Priority</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Created</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="p-4">
                      {getTypeIcon(message.type)}
                    </td>
                    <td className="p-4">
                      <div className="text-white font-medium">{message.subject}</div>
                      <div className="text-gray-500 text-xs line-clamp-2">{message.message.substring(0, 100)}...</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">{message.userName}</div>
                      <div className="text-gray-500 text-xs">{message.email}</div>
                    </td>
                    <td className="p-4 text-gray-300 capitalize">
                      {getCategoryLabel(message.category)}
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${getPriorityColor(message.priority)}`}>
                        {message.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>
                        {(message.type === 'prayer' || message.type === 'support') && (
                          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs flex items-center space-x-1">
                            <Reply className="h-3 w-3" />
                            <span>Reply</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredMessages.length === 0 && (
          <div className="bg-gray-800/50 border border-gray-700 p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No messages found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
