import React from 'react';

import { Handshake, Check, X, Clock, Building, RefreshCw, Filter } from 'lucide-react';

export default function PartnershipApplicationsAdmin() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  // Mock applications data
  const applications = [
    {
      id: '1',
      churchName: 'Grace Community Church',
      contactName: 'Pastor John Smith',
      email: 'john@gracechurch.com',
      phone: '+1-555-0123',
      city: 'Springfield',
      state: 'IL',
      country: 'USA',
      website: 'https://gracechurch.com',
      status: 'pending',
      submittedAt: new Date().toISOString()
    },
    {
      id: '2',
      churchName: 'Faith Baptist Church',
      contactName: 'Pastor Sarah Johnson',
      email: 'sarah@faithbaptist.com',
      phone: '+1-555-0456',
      city: 'Riverside',
      state: 'CA',
      country: 'USA',
      website: 'https://faithbaptist.com',
      status: 'approved',
      submittedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  const approveMutation = async (params: any) => {
    alert('Application approved successfully!');
  };

  const rejectMutation = async (params: any) => {
    alert('Application rejected.');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredApplications = applications?.filter(app => {
    if (!app) return false;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        app.name?.toLowerCase().includes(searchLower) ||
        app.contactPerson?.toLowerCase().includes(searchLower) ||
        app.email?.toLowerCase().includes(searchLower) ||
        app.city?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    switch (filter) {
      case 'pending':
        return app.status === 'pending';
      case 'approved':
        return app.status === 'approved';
      case 'rejected':
        return app.status === 'rejected';
      default:
        return true;
    }
  }) || [];

  const handleApprove = async (applicationId: string) => {
    try {
      await approveMutation({ applicationId });
      alert('Application approved successfully!');
    } catch (error) {
      console.error('Failed to approve application:', error);
      alert('Failed to approve application. Please try again.');
    }
  };

  const handleReject = async (applicationId: string) => {
    try {
      await rejectMutation({ applicationId });
      alert('Application rejected.');
    } catch (error) {
      console.error('Failed to reject application:', error);
      alert('Failed to reject application. Please try again.');
    }
  };

  const isLoading = applications === undefined;

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Handshake className="h-5 w-5 text-white" />
        <div>
          <h2 className="text-xl font-bold text-white heading-font">Partnership Applications</h2>
          <p className="text-gray-400 text-sm">Review and manage church partnership applications.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by church name, contact, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
            className="bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
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
      {applications && (
        <div className="text-sm text-gray-400 mb-4">
          Showing {filteredApplications.length} of {applications.length} partnership applications
          {filter !== 'all' && ` (filtered by ${filter})`}
          {searchTerm && ` (search: "${searchTerm}")`}
        </div>
      )}

      {applications === undefined ? (
        <p className="text-gray-400">Loading partnership applications...</p>
      ) : filteredApplications.length === 0 ? (
        <div className="text-center py-8">
          <Handshake className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            {searchTerm || filter !== 'all' ? 'No applications match your filters.' : 'No partnership applications found.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app: any) => (
            <div key={app._id} className="bg-gray-700/50 border border-gray-600 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-blue-400" />
                    <h3 className="text-white font-semibold">{app.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{app.description}</p>
                  <div className="text-gray-400 text-sm space-y-1">
                    <p>Contact: {app.contactPerson}</p>
                    <p>Email: {app.email}</p>
                    {app.phone && <p>Phone: {app.phone}</p>}
                    {app.website && <p>Website: {app.website}</p>}
                    {app.denomination && <p>Denomination: {app.denomination}</p>}
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Applied: {new Date(app.applicationDate).toLocaleDateString()}
                  </p>
                </div>

                {app.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleApprove(app._id)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                      title="Approve"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleReject(app._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      title="Reject"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
