import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useBackend } from '../../hooks/useBackend';
import { Link } from 'react-router-dom';
import { Handshake, Loader2, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function PartnershipApplication() {
  const authedBackend = useBackend();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    churchName: '',
    websiteUrl: '',
    logoUrl: '',
    contactName: '',
    contactEmail: '',
  });

  const { data: membership, isLoading: isLoadingMembership } = useQuery({
    queryKey: ['membership'],
    queryFn: () => authedBackend.membership.getSubscription(),
  });

  const { data: appStatus, isLoading: isLoadingStatus } = useQuery({
    queryKey: ['partnership-status'],
    queryFn: () => authedBackend.partnership.getApplicationStatus(),
  });

  const applyMutation = useMutation({
    mutationFn: () => authedBackend.partnership.apply(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnership-status'] });
      alert('Your partnership application has been submitted for review.');
    },
    onError: (error: any) => {
      alert(`Submission failed: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyMutation.mutate();
  };

  const isLoading = isLoadingMembership || isLoadingStatus;

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      </div>
    );
  }

  if (!membership?.active || membership.planCode !== 'PARTNER') {
    return (
      <div className="bg-gray-800/50 border border-gray-700 p-6 text-center">
        <Handshake className="h-12 w-12 mx-auto text-blue-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2 heading-font">Ministry Partnership Program</h2>
        <p className="text-gray-400 mb-4">
          An active Church Partnership subscription is required to apply.
        </p>
        <Link to="/give" className="bg-white text-black hover:bg-gray-200 px-6 py-2 font-semibold uppercase tracking-wide text-sm">
          View Partnership Plan
        </Link>
      </div>
    );
  }

  if (appStatus?.hasApplied) {
    const statusColor =
      appStatus.status === 'approved' ? 'text-green-400' :
      appStatus.status === 'pending' ? 'text-yellow-400' :
      'text-red-400';
    const StatusIcon =
      appStatus.status === 'approved' ? CheckCircle :
      appStatus.status === 'pending' ? Clock :
      XCircle;

    return (
      <div className="bg-gray-800/50 border border-gray-700 p-6 text-center">
        <StatusIcon className={`h-12 w-12 mx-auto mb-4 ${statusColor}`} />
        <h2 className="text-xl font-bold text-white mb-2 heading-font">Application Submitted</h2>
        <p className="text-gray-300 mb-1">Church: {appStatus.churchName}</p>
        <p className="text-gray-400 mb-4">Submitted on: {new Date(appStatus.createdAt!).toLocaleDateString()}</p>
        <div className={`inline-block px-4 py-2 border ${statusColor.replace('text', 'border')} ${statusColor.replace('text', 'bg')}/20`}>
          Status: <span className="font-bold">{appStatus.status?.toUpperCase()}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Handshake className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white heading-font">Partnership Application</h2>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Complete the form below to apply for official partnership recognition.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Church Name *</label>
            <input type="text" required value={formData.churchName} onChange={(e) => setFormData({ ...formData, churchName: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Website URL</label>
            <input type="url" value={formData.websiteUrl} onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Contact Name *</label>
            <input type="text" required value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Contact Email *</label>
            <input type="email" required value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Logo URL</label>
            <input type="url" value={formData.logoUrl} onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="pt-2">
          <button type="submit" className="bg-white text-black hover:bg-gray-200 px-6 py-2 font-semibold uppercase tracking-wide text-sm" disabled={applyMutation.isPending}>
            {applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}
