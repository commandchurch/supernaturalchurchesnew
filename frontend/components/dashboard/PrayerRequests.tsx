// @ts-nocheck
import React, { useMemo, useState } from 'react';

import { Heart, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import client from '../../client';

export default function PrayerRequests() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
    isUrgent: false,
    isPrivate: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Show recently submitted requests locally for UX
  const [submittedRequests, setSubmittedRequests] = useState<Array<any>>([]);

  // Memo email for user to use with replies listing in future
  const myEmail = useMemo(() => user?.emailAddresses?.[0]?.emailAddress || formData.email || '', [user, formData.email]);

  // Submit to Encore.dev backend (the real working system)
  const handleRealSubmit = async () => {
    const response = await client.church.submitPrayerRequest({
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      request: formData.request.trim(),
      isUrgent: formData.isUrgent,
      isPrivate: formData.isPrivate,
      userId: user?.id,
    });

    setSubmittedRequests(prev => [
      ...prev,
      {
        ...formData,
        id: String(response.id),
        submittedAt: new Date().toISOString(),
        status: 'pending'
      }
    ]);

    alert('✅ Prayer request submitted successfully!');
    setFormData({ name: '', email: '', phone: '', request: '', isUrgent: false, isPrivate: false });
    setErrors({});
    setTouched({});
  };

  // Validation functions
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return ''; // Email is now optional
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (!value.trim()) return ''; // Phone is now optional
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
        return '';
      case 'request':
        if (!value.trim()) return 'Prayer request is required';
        if (value.trim().length < 10) return 'Please provide more detail in your prayer request';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // Only validate required fields
    const requiredFields = ['name', 'request'];
    requiredFields.forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData] as string);
      if (error) newErrors[key] = error;
    });
    // Validate email if provided
    if (formData.email.trim()) {
      const emailError = validateField('email', formData.email);
      if (emailError) newErrors.email = emailError;
    }
    // Validate phone if provided
    if (formData.phone.trim()) {
      const phoneError = validateField('phone', formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData] as string);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched for validation
    const allFields = ['name', 'email', 'phone', 'request'];
    const newTouched: Record<string, boolean> = {};
    allFields.forEach(field => {
      if ((field === 'phone' || field === 'email') && !(formData[field as keyof typeof formData] as string).trim()) {
        // Don't mark phone or email as touched if it's empty (optional)
        return;
      }
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Validate form
    if (!validateForm()) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('📤 Attempting to submit prayer request...');

      // Submit to backend
      await handleRealSubmit();
      console.log('✅ Prayer request submitted successfully');

    } catch (error: any) {
      console.error('❌ Submission failed:', error);
      alert('❌ Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
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
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              onBlur={() => handleFieldBlur('name')}
              className={`w-full bg-gray-700 border text-white px-4 py-2 ${
                errors.name && touched.name ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.name && touched.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Email (Optional)</label>
              <input
                type="email"
                placeholder="Enter your email (optional)"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={`w-full bg-gray-700 border text-white px-4 py-2 placeholder-gray-400 ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Phone (Optional)</label>
              <input
                type="tel"
                placeholder="Enter your phone number (optional)"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={() => handleFieldBlur('phone')}
                className={`w-full bg-gray-700 border text-white px-4 py-2 placeholder-gray-400 ${
                  errors.phone && touched.phone ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.phone && touched.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Prayer Request *</label>
            <textarea
              rows={6}
              value={formData.request}
              onChange={(e) => handleFieldChange('request', e.target.value)}
              onBlur={() => handleFieldBlur('request')}
              className={`w-full bg-gray-700 border text-white px-4 py-2 ${
                errors.request && touched.request ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Please share your prayer request..."
            />
            {errors.request && touched.request && (
              <p className="text-red-400 text-sm mt-1">{errors.request}</p>
            )}
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
            className="w-full bg-white text-black hover:bg-gray-200 py-3 font-semibold uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                Submit Prayer Request
              </>
            )}
          </button>
        </form>

        {/* Removed local echo; use Messages tab for conversation */}
      </div>
    </div>
  );
}
