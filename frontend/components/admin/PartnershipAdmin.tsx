import React, { useState } from 'react';

import { Handshake, Check, X, Edit, Clock, CheckCircle2 } from 'lucide-react';

type Applications = Array<{
  id: string;
  applicantName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: number;
}>;

type Audits = Array<{
  id: string;
  applicationId: string;
  reviewerName: string;
  status: 'passed' | 'failed';
  notes?: string;
  auditedAt: number;
}>;

interface PartnershipAdminProps {
  applications: Applications | undefined;
  audits: Audits | undefined;
  updateStatusMutation: any;
  updateAuditMutation: any;
}

export default function PartnershipAdmin({ applications, audits, updateStatusMutation, updateAuditMutation }: PartnershipAdminProps) {
  const [editingAudit, setEditingAudit] = useState<{ id: number; status: string; notes: string } | null>(null);

  const handleSaveAudit = () => {
    if (!editingAudit) return;
    updateAuditMutation.mutate({
      id: editingAudit.id,
      status: editingAudit.status,
      notes: editingAudit.notes,
    });
    setEditingAudit(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Handshake className="h-5 w-5 text-white" />
          <div>
            <h2 className="text-xl font-bold text-white heading-font">Manage Partnerships</h2>
            <p className="text-gray-400 text-sm">Review and approve ministry partnership applications.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Church Name</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Contact</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((app) => (
                <tr key={app.id} className="border-b border-gray-700">
                  <td className="py-3 px-3">
                    <div className="text-white font-semibold">{app.name}</div>
                    <a href={app.websiteUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs hover:underline">
                      {app.websiteUrl || 'No website'}
                    </a>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-gray-300">{app.contactName}</div>
                    <div className="text-gray-400 text-xs">{app.contactEmail}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 text-xs font-semibold ${
                      app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {app.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {app.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: app.id, status: 'approved' })}
                          className="text-green-400 hover:text-green-300"
                          title="Approve"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: app.id, status: 'rejected' })}
                          className="text-red-400 hover:text-red-300"
                          title="Reject"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="h-5 w-5 text-white" />
          <div>
            <h2 className="text-xl font-bold text-white heading-font">Command Audits</h2>
            <p className="text-gray-400 text-sm">Manage scheduled audits for partner ministries.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Partner</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Scheduled For</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Notes</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {audits?.map((audit) => (
                <tr key={audit.id} className="border-b border-gray-700">
                  <td className="py-3 px-3 text-white">{audit.partnerName}</td>
                  <td className="py-3 px-3 text-gray-300">{new Date(audit.scheduledFor).toLocaleDateString()}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 text-xs font-semibold ${
                      audit.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      audit.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      audit.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {audit.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400 text-xs">{audit.notes}</td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => setEditingAudit({ id: audit.id, status: audit.status, notes: audit.notes || '' })}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingAudit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 p-8 w-full max-w-lg">
            <h3 className="text-xl font-bold text-white mb-4 heading-font">Update Audit #{editingAudit.id}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-1 text-sm">Status</label>
                <select
                  value={editingAudit.status}
                  onChange={(e) => setEditingAudit({ ...editingAudit, status: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-1 text-sm">Notes</label>
                <textarea
                  rows={4}
                  value={editingAudit.notes}
                  onChange={(e) => setEditingAudit({ ...editingAudit, notes: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button onClick={handleSaveAudit} className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm">Save</button>
                <button onClick={() => setEditingAudit(null)} className="border border-gray-600 text-white hover:bg-gray-700 px-4 py-2 font-semibold uppercase tracking-wide text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
