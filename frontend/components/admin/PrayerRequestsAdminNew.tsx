import React, { useState, useEffect } from 'react';

import { Heart, Reply, ChevronDown, ChevronUp, Clock, CheckCircle, AlertCircle, RefreshCw, Filter } from 'lucide-react';
import client from '../../client';

export default function PrayerRequestsAdminNew() {
  const [prayerRequests, setPrayerRequests] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'urgent' | 'private'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch prayer requests from Encore.dev backend
  useEffect(() => {
    const fetchPrayerRequests = async () => {
      try {
        setLoading(true);
        const response = await client.church.listPrayerRequests();
        setPrayerRequests({ prayerRequests: response.requests });
      } catch (error) {
        console.error('Failed to fetch prayer requests:', error);
        setPrayerRequests({ prayerRequests: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerRequests();
  }, [refreshing]);

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRefresh = async () => {
    setRefreshing(prev => !prev); // This will trigger useEffect to refetch
  };

  const filteredRequests = (prayerRequests?.prayerRequests || []).filter((request: any) => {
    if (!request) return false;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        (request.name || '').toLowerCase().includes(searchLower) ||
        (request.email || '').toLowerCase().includes(searchLower) ||
        (request.request || '').toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    switch (filter) {
      case 'urgent':
        return request.isUrgent;
      case 'private':
        return request.isPrivate;
      default:
        return true;
    }
  }) || [];

  const handleReply = async (requestId: string) => {
    if (!replies[requestId]?.trim()) return;

    try {
      setReplyingTo(requestId);
      await client.church.replyPrayerRequest({
        id: parseInt(requestId),
        responderName: 'Admin',
        responderEmail: 'admin@supernaturalimstitute.com',
        message: replies[requestId],
      });
      setReplies(prev => ({ ...prev, [requestId]: '' }));
      setReplyingTo(null);
      alert('Reply sent successfully!');
      handleRefresh(); // Refresh the list
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply. Please try again.');
      setReplyingTo(null);
    }
  };

  const isLoading = loading;
  const requests = prayerRequests?.prayerRequests || [];

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="h-5 w-5 text-white" />
        <div>
          <h2 className="text-xl font-bold text-white heading-font">Prayer Requests</h2>
          <p className="text-gray-400 text-sm">Manage and respond to prayer requests from users.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, email, or request content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'urgent' | 'private')}
            className="bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
          >
            <option value="all">All Requests</option>
            <option value="urgent">Urgent Only</option>
            <option value="private">Private Only</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-2 flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Results Summary */}
      {prayerRequests && (
        <div className="text-sm text-gray-400 mb-4">
          Showing {filteredRequests.length} of {requests.length} prayer requests
          {filter !== 'all' && ` (filtered by ${filter})`}
          {searchTerm && ` (search: "${searchTerm}")`}
        </div>
      )}

      {prayerRequests === undefined ? (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-400 mr-2" />
          <p className="text-gray-400">Loading prayer requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            {searchTerm || filter !== 'all' ? 'No prayer requests match your filters.' : 'No prayer requests found.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request: any) => (
            <div key={request.id} className="bg-gray-700/50 border border-gray-600 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold">
                      {request.name || 'Anonymous'}
                    </h3>
                    {request.isUrgent && (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                    {request.isPrivate && (
                      <Clock className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      request.status === 'answered' ? 'bg-green-600 text-white' :
                      request.status === 'praying' ? 'bg-blue-600 text-white' :
                      'bg-yellow-600 text-white'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{request.request}</p>
                  {request.email && (
                    <p className="text-gray-400 text-sm">Email: {request.email}</p>
                  )}
                  {request.phone && (
                    <p className="text-gray-400 text-sm">Phone: {request.phone}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-2">
                    Submitted: {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => toggleExpand(request.id)}
                  className="text-gray-400 hover:text-white"
                >
                  {expanded[request.id] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expanded[request.id] && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="space-y-3">
                    <textarea
                      value={replies[request.id] || ''}
                      onChange={(e) => setReplies(prev => ({ ...prev, [request.id]: e.target.value }))}
                      placeholder="Type your reply here..."
                      className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 text-sm min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleReply(request.id)}
                        disabled={!replies[request.id]?.trim() || replyingTo === request.id}
                        className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm disabled:opacity-50"
                      >
                        {replyingTo === request.id ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
