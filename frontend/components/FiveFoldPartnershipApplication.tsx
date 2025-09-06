import React, { useState } from 'react';
import { X, Crown, Church } from 'lucide-react';

interface FiveFoldPartnershipApplicationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FiveFoldPartnershipApplication({ isOpen, onClose }: FiveFoldPartnershipApplicationProps) {
  const [formData, setFormData] = useState({
    churchName: '',
    pastorName: '',
    email: '',
    phone: '',
    location: '',
    denomination: '',
    congregationSize: '',
    challenges: '',
    goals: '',
    hearAboutUs: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Partnership Application:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-yellow-500" />
              <Church className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 heading-font">
              Five Fold Partnership Application
            </h2>
            <p className="text-lg text-blue-400 font-semibold mb-4">
              Join Our Apostolic Network
            </p>
            <div className="bg-purple-500/20 border border-purple-500/30 p-4 rounded">
              <p className="text-purple-200 text-sm leading-relaxed">
                <strong>Partnership Investment:</strong> $99 AUD/month includes senior leadership oversight,
                complete ministry training, congregation discipleship, and 30% commission earnings from your network.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Church Name *
              </label>
              <input
                type="text"
                name="churchName"
                value={formData.churchName}
                onChange={handleChange}
                placeholder="Enter your church name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Pastor/Leader Name *
              </label>
              <input
                type="text"
                name="pastorName"
                value={formData.pastorName}
                onChange={handleChange}
                placeholder="Enter pastor's name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="pastor@church.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+61 xxx xxx xxx"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Location (City, State) *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Sydney, NSW"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Denomination/Background
              </label>
              <input
                type="text"
                name="denomination"
                value={formData.denomination}
                onChange={handleChange}
                placeholder="Pentecostal, Baptist, etc."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Congregation Size *
              </label>
              <select
                name="congregationSize"
                value={formData.congregationSize}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select congregation size</option>
                <option value="1-25">1-25 members</option>
                <option value="26-50">26-50 members</option>
                <option value="51-100">51-100 members</option>
                <option value="101-200">101-200 members</option>
                <option value="201-500">201-500 members</option>
                <option value="500+">500+ members</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Current Ministry Challenges
              </label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                placeholder="What challenges is your ministry currently facing?"
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Partnership Goals *
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                placeholder="What do you hope to achieve through this partnership?"
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                How did you hear about us?
              </label>
              <select
                name="hearAboutUs"
                value={formData.hearAboutUs}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select an option</option>
                <option value="website">Website</option>
                <option value="social-media">Social Media</option>
                <option value="referral">Church Referral</option>
                <option value="radio">Radio Ministry</option>
                <option value="conference">Conference/Event</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 p-4 rounded">
              <p className="text-yellow-200 text-sm leading-relaxed">
                By submitting this application, you acknowledge that partnership requires completion of our 
                Leadership Course and adherence to our teaching standards. Partnership may be revoked if 
                standards are not maintained.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold uppercase tracking-wide transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold uppercase tracking-wide transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
