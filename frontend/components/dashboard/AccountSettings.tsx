import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import client from '../../client';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Shield, Bell, Globe, Lock, Eye, EyeOff, HelpCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface UserProfile {
  userId: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postcode?: string;
  dateOfBirth?: string;
  bio?: string;
  aboutMe?: string;
  avatar?: string;
  timezone?: string;
  language?: string;
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
    marketing: boolean;
    courseUpdates: boolean;
    prayerRequests: boolean;
  };
  privacySettings?: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
}

function AccountSettings() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchProfile();
    }
  }, [isLoaded, user?.id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileResponse = await client.user.getProfile(user!.id);
      setProfile(profileResponse as UserProfile);
      setFormData(profileResponse as Partial<UserProfile>);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // Set default profile data
      const defaultProfile: UserProfile = {
        userId: user!.id,
        name: user!.firstName || 'User',
        username: '',
        email: user!.emailAddresses?.[0]?.emailAddress || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postcode: '',
        dateOfBirth: '',
        bio: '',
        aboutMe: '',
        avatar: '',
        timezone: 'Australia/Sydney',
        language: 'en',
        notificationPreferences: {
          email: true,
          sms: false,
          push: true,
          marketing: false,
          courseUpdates: true,
          prayerRequests: true,
        },
        privacySettings: {
          profileVisibility: 'private',
          showEmail: false,
          showPhone: false,
          showLocation: false,
        },
      };
      setProfile(defaultProfile);
      setFormData(defaultProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section: string, field: string, value: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof UserProfile] as object || {}),
        [field]: value
      }
    }));
  };

  const checkUsernameAvailability = async (username: string) => {
    if (!username.trim() || username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    try {
      setCheckingUsername(true);
      const response = await client.user.checkUsername({
        username: username.trim(),
        excludeUserId: profile?.username ? user?.id : undefined
      });
      setUsernameAvailable(response.available);
    } catch (error) {
      console.error('Failed to check username:', error);
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleSave = async (section: string) => {
    try {
      setSaving(true);
      // In a real implementation, this would save to the backend
      // For now, we'll just update the local state
      setProfile(prev => prev ? { ...prev, ...formData } as UserProfile : null);
      setEditMode(null);

      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white mb-2 heading-font">Account Settings</h1>
        <p className="text-gray-400">Manage your personal information and account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/50 rounded-xl p-4 backdrop-blur-sm">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md'
                    }`}
                  >
                    <Icon className={`h-5 w-5 flex-shrink-0 ${
                      activeSection === section.id ? 'text-blue-200' : 'text-slate-400'
                    }`} />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 w-full">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            {/* Personal Information */}
            {activeSection === 'personal' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white heading-font">Personal Information</h2>
                  <button
                    onClick={() => setEditMode(editMode === 'personal' ? null : 'personal')}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200"
                  >
                    <Edit className="h-4 w-4" />
                    {editMode === 'personal' ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-white font-semibold mb-2">Full Name</label>
                    {editMode === 'personal' ? (
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                      />
                    ) : (
                      <div className="bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg">
                        {profile?.name}
                      </div>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-white font-semibold mb-2">Username</label>
                    {editMode === 'personal' ? (
                      <div className="relative">
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-slate-600 border border-r-0 border-slate-500 text-slate-300 rounded-l">
                            @
                          </span>
                          <input
                            type="text"
                            value={formData.username || ''}
                            onChange={(e) => {
                              const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
                              handleInputChange('username', value);
                              checkUsernameAvailability(value);
                            }}
                            className="flex-1 bg-slate-700/50 border border-slate-600 text-white px-4 py-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                            placeholder="yourusername"
                          />
                        </div>
                        {checkingUsername && (
                          <div className="absolute right-3 top-3">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                          </div>
                        )}
                        {formData.username && formData.username.length >= 3 && !checkingUsername && (
                          <div className="absolute right-3 top-3">
                            {usernameAvailable === true ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : usernameAvailable === false ? (
                              <X className="h-4 w-4 text-red-400" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg">
                        @{profile?.username || 'Not set'}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-2">Email Address</label>
                    <div className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{profile?.email}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Email cannot be changed here. Contact support if needed.</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white font-semibold mb-2">Phone Number</label>
                    {editMode === 'personal' ? (
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        placeholder="+61 XXX XXX XXX"
                      />
                    ) : (
                      <div className="bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-lg flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {profile?.phone || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-white font-semibold mb-2">Date of Birth</label>
                    {editMode === 'personal' ? (
                      <input
                        type="date"
                        value={formData.dateOfBirth || ''}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                      />
                    ) : (
                      <div className="bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-lg flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {profile?.dateOfBirth || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-2">Bio</label>
                    {editMode === 'personal' ? (
                      <textarea
                        value={formData.bio || ''}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none h-24 resize-none transition-all duration-200"
                        placeholder="Tell us about yourself..."
                        maxLength={500}
                      />
                    ) : (
                      <div className="bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg min-h-[80px]">
                        {profile?.bio || 'No bio provided'}
                      </div>
                    )}
                  </div>

                  {/* About Me */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-2">About Me <span className="text-sm text-gray-400">(Optional)</span></label>
                    {editMode === 'personal' ? (
                      <textarea
                        value={formData.aboutMe || ''}
                        onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none h-32 resize-none transition-all duration-200"
                        placeholder="Share more about your journey, interests, and ministry experience..."
                        maxLength={1000}
                      />
                    ) : (
                      <div className="bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg min-h-[100px]">
                        {profile?.aboutMe || 'No about me information provided'}
                      </div>
                    )}
                  </div>

                  {/* Profile Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-2">Profile Image <span className="text-sm text-gray-400">(500x500 recommended)</span></label>
                    {editMode === 'personal' ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={formData.avatar || profile?.avatar || 'https://via.placeholder.com/500x500?text=Upload+Image'}
                              alt="Profile"
                              className="w-24 h-24 rounded-full object-cover border-2 border-slate-600"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    const result = e.target?.result as string;
                                    handleInputChange('avatar', result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1">
                            <button
                              type="button"
                              onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200"
                            >
                              Upload Image
                            </button>
                            <p className="text-sm text-gray-400 mt-2">Click to upload or drag and drop. Max file size: 5MB</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <img
                          src={profile?.avatar || 'https://via.placeholder.com/500x500?text=No+Image'}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"
                        />
                        <div>
                          <p className="text-white font-medium">Profile Image</p>
                          <p className="text-sm text-gray-400">Update in edit mode to change your profile picture</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Address Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-white font-semibold mb-2">Street Address</label>
                      {editMode === 'personal' ? (
                        <input
                          type="text"
                          value={formData.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        />
                      ) : (
                        <div className="bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg">
                          {profile?.address || 'Not provided'}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">City</label>
                      {editMode === 'personal' ? (
                        <input
                          type="text"
                          value={formData.city || ''}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        />
                      ) : (
                        <div className="bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg">
                          {profile?.city || 'Not provided'}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">State</label>
                      {editMode === 'personal' ? (
                        <input
                          type="text"
                          value={formData.state || ''}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        />
                      ) : (
                        <div className="bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg">
                          {profile?.state || 'Not provided'}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Postcode</label>
                      {editMode === 'personal' ? (
                        <input
                          type="text"
                          value={formData.postcode || ''}
                          onChange={(e) => handleInputChange('postcode', e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        />
                      ) : (
                        <div className="bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg">
                          {profile?.postcode || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {editMode === 'personal' && (
                  <div className="flex justify-end pt-6 border-t border-gray-600">
                    <button
                      onClick={() => handleSave('personal')}
                      disabled={saving}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:bg-slate-600 text-white px-6 py-3 font-semibold uppercase tracking-wide rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all duration-200"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Account Security */}
            {activeSection === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white heading-font">Account Security</h2>

                {/* Password Change */}
                <div className="bg-slate-700/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 pr-12 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 font-semibold uppercase tracking-wide rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-200">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-slate-700/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300">Add an extra layer of security to your account</p>
                      <p className="text-xs text-gray-400 mt-1">Recommended for enhanced security</p>
                    </div>
                    <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2 font-semibold rounded-lg shadow-lg shadow-emerald-500/25 transition-all duration-200">
                      Enable 2FA
                    </button>
                  </div>
                </div>

                {/* Login History */}
                <div className="bg-slate-700/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Login Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-600">
                      <div>
                        <p className="text-white font-medium">Current Session</p>
                        <p className="text-xs text-gray-400">Chrome on Windows • Sydney, Australia</p>
                      </div>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-600">
                      <div>
                        <p className="text-white font-medium">Yesterday</p>
                        <p className="text-xs text-gray-400">Mobile App • Sydney, Australia</p>
                      </div>
                      <span className="text-gray-400 text-sm">Inactive</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white heading-font">Notification Preferences</h2>
                  <button
                    onClick={() => handleSave('notifications')}
                    disabled={saving}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:bg-slate-600 text-white px-4 py-2 font-semibold rounded-lg shadow-lg shadow-emerald-500/25 transition-all duration-200"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Course Updates</p>
                          <p className="text-sm text-gray-400">New courses, updates, and completion notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.notificationPreferences?.courseUpdates}
                            onChange={(e) => handleNestedChange('notificationPreferences', 'courseUpdates', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-700 shadow-lg shadow-blue-500/25"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Prayer Request Updates</p>
                          <p className="text-sm text-gray-400">Updates on your prayer requests</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.notificationPreferences?.prayerRequests}
                            onChange={(e) => handleNestedChange('notificationPreferences', 'prayerRequests', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-700 shadow-lg shadow-blue-500/25"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Marketing Communications</p>
                          <p className="text-sm text-gray-400">News, updates, and special offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.notificationPreferences?.marketing}
                            onChange={(e) => handleNestedChange('notificationPreferences', 'marketing', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-700 shadow-lg shadow-blue-500/25"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      SMS Notifications
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-400">Receive important updates via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notificationPreferences?.sms}
                          onChange={(e) => handleNestedChange('notificationPreferences', 'sms', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Push Notifications
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Browser Push Notifications</p>
                        <p className="text-sm text-gray-400">Receive notifications in your browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notificationPreferences?.push}
                          onChange={(e) => handleNestedChange('notificationPreferences', 'push', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white heading-font">Privacy Settings</h2>
                  <button
                    onClick={() => handleSave('privacy')}
                    disabled={saving}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:bg-slate-600 text-white px-4 py-2 font-semibold rounded-lg shadow-lg shadow-emerald-500/25 transition-all duration-200"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Profile Visibility</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="public"
                          name="profileVisibility"
                          value="public"
                          checked={formData.privacySettings?.profileVisibility === 'public'}
                          onChange={(e) => handleNestedChange('privacySettings', 'profileVisibility', e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <label htmlFor="public" className="text-white font-medium cursor-pointer">Public</label>
                          <p className="text-sm text-gray-400">Anyone can see your profile and activity</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="friends"
                          name="profileVisibility"
                          value="friends"
                          checked={formData.privacySettings?.profileVisibility === 'friends'}
                          onChange={(e) => handleNestedChange('privacySettings', 'profileVisibility', e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <label htmlFor="friends" className="text-white font-medium cursor-pointer">Friends Only</label>
                          <p className="text-sm text-gray-400">Only approved connections can see your profile</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="private"
                          name="profileVisibility"
                          value="private"
                          checked={formData.privacySettings?.profileVisibility === 'private'}
                          onChange={(e) => handleNestedChange('privacySettings', 'profileVisibility', e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <label htmlFor="private" className="text-white font-medium cursor-pointer">Private</label>
                          <p className="text-sm text-gray-400">Only you can see your profile details</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Visibility */}
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Show Email Address</p>
                          <p className="text-sm text-gray-400">Allow others to see your email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.privacySettings?.showEmail}
                            onChange={(e) => handleNestedChange('privacySettings', 'showEmail', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-700 shadow-lg shadow-blue-500/25"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Show Phone Number</p>
                          <p className="text-sm text-gray-400">Allow others to see your phone</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.privacySettings?.showPhone}
                            onChange={(e) => handleNestedChange('privacySettings', 'showPhone', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-700 shadow-lg shadow-blue-500/25"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Show Location</p>
                          <p className="text-sm text-gray-400">Allow others to see your general location</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.privacySettings?.showLocation}
                            onChange={(e) => handleNestedChange('privacySettings', 'showLocation', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-700 shadow-lg shadow-blue-500/25"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Data Export */}
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Data & Privacy</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-3 font-semibold uppercase tracking-wide rounded-lg shadow-lg shadow-slate-500/25 transition-all duration-200">
                        Export My Data
                      </button>
                      <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 font-semibold uppercase tracking-wide rounded-lg shadow-lg shadow-red-500/25 transition-all duration-200">
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeSection === 'preferences' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white heading-font">Preferences</h2>
                  <button
                    onClick={() => handleSave('preferences')}
                    disabled={saving}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:bg-slate-600 text-white px-4 py-2 font-semibold rounded-lg shadow-lg shadow-emerald-500/25 transition-all duration-200"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Language & Region */}
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Language & Region
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-white font-semibold mb-2">Language</label>
                        <select
                          value={formData.language || 'en'}
                          onChange={(e) => handleInputChange('language', e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">Timezone</label>
                        <select
                          value={formData.timezone || 'Australia/Sydney'}
                          onChange={(e) => handleInputChange('timezone', e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                        >
                          <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                          <option value="Australia/Melbourne">Australia/Melbourne (AEST)</option>
                          <option value="Australia/Perth">Australia/Perth (AWST)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
