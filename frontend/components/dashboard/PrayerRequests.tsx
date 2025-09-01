import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../_generated/api';
import { Heart } from 'lucide-react';

export default function PrayerRequests() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
    isUrgent: false,
    isPrivate: false,
  });

  const submitPrayerRequest = useMutation(api.church.submitPrayerRequest);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitPrayerRequest(formData);
      alert('Your prayer request has been submitted!');
      setFormData({ name: '', email: '', phone: '', request: '', isUrgent: false, isPrivate: false });
    } catch (error: any) {
      alert(`Submission failed: ${error?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Submit Prayer Request</h2>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          Our team is ready to stand with you in prayer. Please share your request below.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Prayer Request *</label>
            <textarea
              required
              rows={6}
              value={formData.request}
              onChange={(e) => setFormData({ ...formData, request: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
              placeholder="Please share your prayer request..."
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isUrgent}
                onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                className="mr-3"
              />
              <span className="text-white">This is an urgent prayer request</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isPrivate}
                onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                className="mr-3"
              />
              <span className="text-white">Keep this request private (not shared publicly)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 py-3 font-semibold uppercase tracking-wide"
            disabled={submitPrayerRequest.isPending}
          >
            {submitPrayerRequest.isPending ? 'Submitting...' : 'Submit Prayer Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
