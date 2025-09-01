import React, { useState } from 'react';
import { Church, Mail, Phone, MapPin, Users, BookOpen, CheckCircle, X, Loader2 } from 'lucide-react';

interface FormData {
  churchName: string;
  pastorName: string;
  email: string;
  phone: string;
  location: string;
  denomination: string;
  congregationSize: string;
  currentChallenges: string;
  goals: string;
  hearAboutUs: string;
}

interface FiveFoldApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FiveFoldApplicationForm({ isOpen, onClose }: FiveFoldApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    churchName: '',
    pastorName: '',
    email: '',
    phone: '',
    location: '',
    denomination: '',
    congregationSize: '',
    currentChallenges: '',
    goals: '',
    hearAboutUs: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit Five-Fold application via direct API call
      const response = await fetch('/api/fivefold/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      // Email confirmation handled by backend

      setIsSubmitted(true);
      // Reset form after successful submission
      setFormData({
        churchName: '',
        pastorName: '',
        email: '',
        phone: '',
        location: '',
        denomination: '',
        congregationSize: '',
        currentChallenges: '',
        goals: '',
        hearAboutUs: '',
      });
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      churchName: '',
      pastorName: '',
      email: '',
      phone: '',
      location: '',
      denomination: '',
      congregationSize: '',
      currentChallenges: '',
      goals: '',
      hearAboutUs: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-black border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-black border-b border-white/20 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 border border-white/20 p-2 rounded">
              <Church className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white heading-font">
                Five Fold Partnership Application
              </h2>
              <p className="text-gray-400 text-sm">Join Our Apostolic Network</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-500/20 border border-green-500/30 p-6 rounded-lg mb-6">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                <p className="text-gray-300">
                  Thank you for your interest in our Five Fold Partnership Program. 
                  Our senior leadership team will review your application and contact you within 48 hours.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 font-semibold uppercase tracking-wide text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-blue-100 text-sm">
                  <strong>Partnership Investment:</strong> $200 AUD/month includes senior leadership oversight, 
                  complete ministry training, congregation discipleship, and growth support.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Church Name *
                  </label>
                  <input
                    type="text"
                    name="churchName"
                    value={formData.churchName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                    placeholder="Enter your church name"
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
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                    placeholder="Enter pastor's name"
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
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                    placeholder="pastor@church.com"
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
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                    placeholder="+61 xxx xxx xxx"
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
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                    placeholder="Sydney, NSW"
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
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                    placeholder="Pentecostal, Baptist, etc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white font-semibold mb-2">
                    Congregation Size *
                  </label>
                  <select
                    name="congregationSize"
                    value={formData.congregationSize}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                  >
                    <option value="">Select congregation size</option>
                    <option value="Under 50">Under 50</option>
                    <option value="50-100">50-100</option>
                    <option value="100-200">100-200</option>
                    <option value="200-500">200-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Current Ministry Challenges
                </label>
                <textarea
                  name="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none resize-none"
                  placeholder="What challenges is your ministry currently facing?"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Partnership Goals *
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none resize-none"
                  placeholder="What do you hope to achieve through this partnership?"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  How did you hear about us?
                </label>
                <select
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                >
                  <option value="">Select an option</option>
                  <option value="Website">Website</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Referral">Referral from another pastor</option>
                  <option value="Conference">Conference/Event</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-gray-300 text-sm">
                  By submitting this application, you acknowledge that partnership requires completion 
                  of our Leadership Course and adherence to our teaching standards. Partnership may be 
                  revoked if standards are not maintained.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-700 text-white hover:bg-gray-600 px-6 py-3 font-semibold uppercase tracking-wide text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 font-semibold uppercase tracking-wide text-sm disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
