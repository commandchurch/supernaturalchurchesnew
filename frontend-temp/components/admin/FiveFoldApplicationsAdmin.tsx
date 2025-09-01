import React, { useState, useEffect } from 'react';
import { Users, Check, X, Clock, Building, Edit, RefreshCw } from 'lucide-react';

export default function FiveFoldApplicationsAdmin() {
  const [applications, setApplications] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Mock data since Five-Fold applications endpoint may not be implemented
        setApplications({ applications: [] });
      } catch (error) {
        console.error('Failed to fetch Five-Fold applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [refreshing]);

  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleStatusUpdate = async (applicationId: string, status: string) => {
    try {
      const notes = editingNotes[applicationId] || '';
      // Direct API call for status update
      const response = await fetch(`/api/fivefold/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status, notes }),
      });
      
      if (!response.ok) throw new Error('Failed to update');
      
      alert(`Application ${status} successfully!`);
      setEditingNotes(prev => ({ ...prev, [applicationId]: '' }));
    } catch (error) {
      console.error('Failed to update application:', error);
      alert('Failed to update application. Please try again.');
    }
  };

  const isLoading = loading;

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-white" />
          <div>
            <h2 className="text-xl font-bold text-white heading-font">Five-Fold Ministry Applications</h2>
            <p className="text-gray-400 text-sm">Review and manage five-fold ministry training applications.</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-2 flex items-center gap-2 disabled:opacity-50 text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading five-fold applications...</p>
      ) : !applications || applications.length === 0 ? (
        <p className="text-gray-400">No five-fold applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app: any) => (
            <div key={app._id} className="bg-gray-700/50 border border-gray-600 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-purple-400" />
                    <h3 className="text-white font-semibold">{app.churchName}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      app.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-gray-300"><strong>Pastor:</strong> {app.pastorName}</p>
                      <p className="text-gray-300"><strong>Email:</strong> {app.email}</p>
                      <p className="text-gray-300"><strong>Phone:</strong> {app.phone}</p>
                      <p className="text-gray-300"><strong>Location:</strong> {app.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-300"><strong>Denomination:</strong> {app.denomination}</p>
                      <p className="text-gray-300"><strong>Congregation Size:</strong> {app.congregationSize}</p>
                      <p className="text-gray-300"><strong>How they heard:</strong> {app.hearAboutUs}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-300"><strong>Current Challenges:</strong></p>
                    <p className="text-gray-400 text-sm ml-4">{app.currentChallenges}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-300"><strong>Goals:</strong></p>
                    <p className="text-gray-400 text-sm ml-4">{app.goals}</p>
                  </div>

                  {app.notes && (
                    <div className="mb-3">
                      <p className="text-gray-300"><strong>Admin Notes:</strong></p>
                      <p className="text-gray-400 text-sm ml-4">{app.notes}</p>
                    </div>
                  )}

                  <p className="text-gray-500 text-xs">
                    Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                {app.status === 'pending' && (
                  <div className="flex flex-col gap-2 ml-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'approved')}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded"
                        title="Approve"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'contacted')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
                        title="Contact"
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                        title="Reject"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add notes..."
                        value={editingNotes[app._id] || ''}
                        onChange={(e) => setEditingNotes(prev => ({ ...prev, [app._id]: e.target.value }))}
                        className="bg-gray-600 border border-gray-500 text-white px-2 py-1 text-sm flex-1"
                      />
                      <button
                        onClick={() => handleStatusUpdate(app._id, app.status)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-sm rounded"
                        title="Update Notes"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
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
