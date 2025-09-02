// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Handshake, Loader2, CheckCircle, Clock, XCircle } from 'lucide-react';
import client from '../../client';

export default function PartnershipApplication() {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    churchName: '',
    websiteUrl: '',
    logoUrl: '',
    contactName: '',
    contactEmail: '',
    ministryType: 'pastor', // Default to pastor
    denomination: '',
    city: '',
    state: '',
    country: '',
    description: '',
  });

  const [membership, setMembership] = useState<any>(null);
  const [appStatus, setAppStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Note: These endpoints may need to be implemented in Encore.dev
        // For now, we'll skip membership check
        setMembership({ status: 'active' }); // Temporary bypass
        
        try {
          const status = await client.partnership.getApplicationStatus();
          setAppStatus(status);
        } catch (err) {
          // User hasn't applied yet
          setAppStatus({ hasApplied: false });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await client.partnership.apply({
        churchName: formData.churchName,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        websiteUrl: formData.websiteUrl || undefined,
        logoUrl: formData.logoUrl || undefined,
        ministryType: formData.ministryType,
        denomination: formData.denomination || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        country: formData.country || undefined,
        description: formData.description || undefined,
      });

      alert('Partnership application submitted successfully! We will review your application and get back to you. You will receive a confirmation email shortly.');
      setFormData({
        churchName: '',
        websiteUrl: '',
        logoUrl: '',
        contactName: '',
        contactEmail: '',
        ministryType: 'pastor',
        denomination: '',
        city: '',
        state: '',
        country: '',
        description: '',
      });
    } catch (error) {
      console.error('Failed to submit partnership application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = loading;

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
      </div>
    );
  }

  if (!membership || membership.status !== 'active') {
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
            <label className="block text-white font-semibold mb-1 text-sm">Church/Ministry Name *</label>
            <input type="text" required value={formData.churchName} onChange={(e) => setFormData({ ...formData, churchName: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" placeholder="Enter your church or ministry name" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Five-Fold Ministry Type *</label>
            <select
              required
              value={formData.ministryType}
              onChange={(e) => setFormData({ ...formData, ministryType: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            >
              <option value="apostle">Apostle</option>
              <option value="prophet">Prophet</option>
              <option value="evangelist">Evangelist</option>
              <option value="pastor">Pastor</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Contact Name *</label>
            <input type="text" required value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Contact Email *</label>
            <input type="email" required value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" placeholder="your@email.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">City</label>
            <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" placeholder="City" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">State/Province</label>
            <input type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" placeholder="State or Province" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Country</label>
            <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" placeholder="Country" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Website URL</label>
            <input type="url" value={formData.websiteUrl} onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" placeholder="https://yourwebsite.com" />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Denomination</label>
            <input type="text" value={formData.denomination} onChange={(e) => setFormData({ ...formData, denomination: e.target.value })} className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm" placeholder="e.g., Baptist, Methodist, Non-denominational" />
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Ministry Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            rows={3}
            placeholder="Briefly describe your ministry and its mission..."
          />
        </div>
        <div className="pt-2">
          <button type="submit" className="bg-white text-black hover:bg-gray-200 px-6 py-2 font-semibold uppercase tracking-wide text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Handshake className="w-4 h-4" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
