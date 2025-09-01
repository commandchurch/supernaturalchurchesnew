import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../_generated/api';
import { Send, AlertTriangle, Ambulance } from 'lucide-react';

export default function HelpMeFund() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amountNeeded: '',
    category: 'emergency',
    urgency: 'high',
    deadline: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    organizationName: '',
    justification: '',
  });

  const submitFundingRequest = useMutation(api.fund.submitFundingRequest);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitFundingRequest({
        ...formData,
        amountNeeded: parseFloat(formData.amountNeeded)
      });
      alert('Your request has been submitted and is pending leadership review.');
      setFormData({
        title: '', description: '', amountNeeded: '', category: 'emergency', urgency: 'high',
        deadline: '', contactName: '', contactEmail: '', contactPhone: '', organizationName: '', justification: ''
      });
    } catch (error: any) {
      alert(`Submission failed: ${error?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Send className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white heading-font">Request Help (Help Me Fund)</h2>
      </div>

      <div className="bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 p-3 mb-6 text-sm">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Purpose of Help Me Fund</p>
            <p>
              Help Me Fund exists to support our paid members in genuine times of crisis and emergency (e.g., urgent bills, unexpected hardship). 
              We do not fund external study or education, and we do not provide money for general medication or ongoing medical treatment. 
              Exception: we may assist with emergency medical bills arising from an accident (e.g., ambulance, emergency triage).
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-6">
        Share the details of your urgent need. All requests are reviewed by leadership and must be approved before any funds are disbursed or shown publicly.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Request Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
              placeholder="e.g., Emergency Rent Support"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Amount Needed (AUD) *</label>
            <input
              type="number"
              required
              value={formData.amountNeeded}
              onChange={(e) => setFormData({ ...formData, amountNeeded: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Description *</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            placeholder="Explain the emergency and how funds will be used..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            >
              <option value="emergency">Emergency</option>
              <option value="relief">Relief</option>
              <option value="rent-bills">Rent/Bills</option>
              <option value="accident-medical">Accident Medical (Emergency Only)</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Urgency</label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Contact Name *</label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">Contact Email *</label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-blue-500/10 text-blue-200 border border-blue-500/20 p-3 text-sm">
          <div className="flex items-start gap-2">
            <Ambulance className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-semibold">Emergency Medical (Accident Only)</p>
              <p>If your urgent need is due to an accident resulting in ambulance or emergency treatment bills, please include brief details here. We cannot assist with general medication costs or ongoing medical treatment.</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-1 text-sm">Justification *</label>
          <textarea
            required
            rows={3}
            placeholder="Explain why this emergency support is needed now and the immediate impact it will have..."
            value={formData.justification}
            onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm"
            disabled={submitFundingRequest.isPending}
          >
            {submitFundingRequest.isPending ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
