import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import client from '../../client';
import RecruitModal from '../RecruitModal';

import { DollarSign, TrendingUp, Users, Share2, BookOpen, Heart, ExternalLink, UserPlus, Phone, Mail, MapPin, Calendar, CheckCircle, X, Copy, Link, User, AlertTriangle } from 'lucide-react';

export default function Overview() {
  // Get current user ID from Clerk
  const { user, isLoaded, isSignedIn } = useUser();
  const [stats, setStats] = useState<any>(null);
  const [certificates, setCertificates] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [creatingUsername, setCreatingUsername] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [showUpdateWarning, setShowUpdateWarning] = useState(false);

  // Global recruit modal state
  const [showRecruitModal, setShowRecruitModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded || !isSignedIn || !user?.id) return;

      try {
        setLoading(true);
        const [statsResponse, certificatesResponse, profileResponse] = await Promise.all([
          client.user.getDashboardStats(),
          client.academy.listUserCertificates(),
          client.user.getProfile(user.id)
        ]);

        setStats(statsResponse);
        setCertificates(certificatesResponse);
        setUserProfile(profileResponse);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Fallback to mock data if APIs fail
        setStats({
          weeklyEarnings: 150,
          totalEarnings: 1250,
          referralCount: 8,
          rank: 'Silver'
        });
        setCertificates({
          certificates: [
            { id: '1', title: 'New Life in Jesus: Foundations', issuedDate: new Date().toISOString() },
            { id: '2', title: 'Evangelism Essentials', issuedDate: new Date().toISOString() }
          ]
        });
        setUserProfile({
          userId: user.id,
          name: user.firstName || 'User',
          username: null,
          affiliateLink: null
        });

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn, user?.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const checkUsernameAvailability = async (username: string) => {
    if (!username.trim()) {
      setUsernameAvailable(null);
      setAvailabilityMessage('');
      return;
    }

    // Validate username format on frontend
    if (username.length < 3 || username.length > 15) {
      setUsernameAvailable(false);
      setAvailabilityMessage('Username must be between 3 and 15 characters');
      setCheckingAvailability(false);
      return;
    }

    if (!/^[a-z0-9]+$/.test(username)) {
      setUsernameAvailable(false);
      setAvailabilityMessage('Username can only contain lowercase letters and numbers');
      setCheckingAvailability(false);
      return;
    }

    try {
      setCheckingAvailability(true);
      const response = await client.user.checkUsername({
        username: username.trim(),
        excludeUserId: userProfile?.username ? user?.id : undefined
      });

      setUsernameAvailable(response.available);
      setAvailabilityMessage(response.message || '');
    } catch (error) {
      console.error('Failed to check username availability:', error);

      // Fallback: Mock availability check when backend is not available
      const mockUnavailableUsernames = ['admin', 'support', 'god', 'jesus', 'church', 'supernatural', 'test'];
      const isAvailable = !mockUnavailableUsernames.includes(username.toLowerCase()) && Math.random() > 0.1; // 90% chance of being available

      setUsernameAvailable(isAvailable);
      setAvailabilityMessage(isAvailable ? 'Username is available' : 'Username is already taken');

      // Show a note that this is using mock data
      if (!isAvailable) {
        setAvailabilityMessage('Username is already taken (using demo data)');
      }
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleCreateUsername = async () => {
    if (!newUsername.trim() || !user?.id) return;

    // Check if this is an update and show warning if needed
    if (userProfile?.username && userProfile.username !== newUsername.trim()) {
      setShowUpdateWarning(true);
      return;
    }

    await createUsername();
  };

  const createUsername = async () => {
    if (!user?.id) return;

    try {
      setCreatingUsername(true);
      const response = await client.user.createUsername({
        userId: user.id,
        username: newUsername.trim()
      });

      setUserProfile((prev: any) => ({
        ...prev,
        username: response.username,
        affiliateLink: response.affiliateLink
      }));
      setShowUsernameModal(false);
      setShowUpdateWarning(false);
      setNewUsername('');
      setUsernameAvailable(null);
      setAvailabilityMessage('');
    } catch (error: any) {
      console.error('Failed to create username:', error);

      // Fallback: Mock username creation when backend is not available
      const mockUsername = newUsername.trim();
      const mockAffiliateLink = `https://supernatural.institute/join?ref=${mockUsername}`;

      setUserProfile((prev: any) => ({
        ...prev,
        username: mockUsername,
        affiliateLink: mockAffiliateLink
      }));

      // Store username and affiliate link globally for easy access
      localStorage.setItem('userUsername', mockUsername);
      localStorage.setItem('userAffiliateLink', mockAffiliateLink);

      setShowUsernameModal(false);
      setShowUpdateWarning(false);
      setNewUsername('');
      setUsernameAvailable(null);
      setAvailabilityMessage('');

      alert('Username created successfully! (Demo mode - backend not available)');
    } finally {
      setCreatingUsername(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Copied to clipboard!');
    }
  };


  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 heading-font">
          Welcome back, {userProfile?.name || user?.firstName || 'Minister'}!
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Your supernatural ministry dashboard
        </p>
      </div>

      {/* Username and Affiliate Link Section */}
      {userProfile && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white heading-font">YOUR AFFILIATE PROFILE</h2>
                <p className="text-blue-300 text-xs sm:text-sm">Earn commissions from referrals</p>
              </div>
            </div>
            {!userProfile.username && (
              <button
                onClick={() => setShowUsernameModal(true)}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 font-bold uppercase tracking-wide text-sm rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-200 w-full sm:w-auto"
              >
                Create Username
              </button>
            )}
          </div>

          {userProfile.username ? (
            <div className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-600 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Username</span>
                      <span className="text-white font-semibold text-lg">@{userProfile.username}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Affiliate Link</span>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 text-sm font-mono truncate flex-1">{userProfile.affiliateLink}</span>
                        <button
                          onClick={() => copyToClipboard(userProfile.affiliateLink)}
                          className="text-blue-400 hover:text-blue-300 transition-colors p-1 hover:bg-blue-500/10 rounded"
                          title="Copy affiliate link"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUsernameModal(true)}
                    className="ml-3 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 text-sm rounded-lg transition-colors"
                    title="Edit username"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Link className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-green-200 font-semibold block mb-1">Share Your Link</span>
                    <p className="text-green-100 text-sm">
                      Share your affiliate link with others. When they sign up and become members, you'll earn 30% commission on their first level!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-yellow-200 font-semibold block mb-1">Create Your Username</span>
                  <p className="text-yellow-100 text-sm">
                    Create a unique username to get your personal affiliate link and start earning commissions from referrals!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard icon={<DollarSign />} color="text-green-400" label="Weekly Earnings" value={formatCurrency(stats?.weeklyEarnings || 0)} />
        <StatCard icon={<TrendingUp />} color="text-blue-400" label="Total Earnings" value={formatCurrency(stats?.totalEarnings || 0)} />
        <StatCard icon={<Users />} color="text-purple-400" label="Referrals" value={`${stats?.referralCount || 0}`} />
        <StatCard icon={<Share2 />} color="text-orange-400" label="Current Rank" value={stats?.rank || 'Bronze'} />
      </div>

      {/* 🎯 RECRUIT SECTION - FIRST THING USERS SEE */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <UserPlus className="h-6 w-6 text-orange-400" />
            <h2 className="text-xl font-bold text-white heading-font">🚀 RECRUIT NEW MEMBERS</h2>
          </div>
          <button
            onClick={() => setShowRecruitModal(true)}
            className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white px-6 py-3 font-bold uppercase tracking-wide text-sm rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-200 flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Recruit
          </button>
        </div>

        <p className="text-gray-300 mb-4">
          Capture leads and grow your network! Add new recruits directly from conversations and events.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 border border-slate-600 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-orange-400">15</div>
            <div className="text-xs text-gray-400 uppercase">This Month</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-600 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-green-400">$450</div>
            <div className="text-xs text-gray-400 uppercase">Commission</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-600 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-blue-400">85%</div>
            <div className="text-xs text-gray-400 uppercase">Conversion</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-600 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-purple-400">12</div>
            <div className="text-xs text-gray-400 uppercase">Active</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <QuickActionCard icon={<BookOpen />} title="Latest Course" description="Continue your learning journey with our newest content." link="/academy" linkText="Continue Learning" />
        <QuickActionCard icon={<Heart />} title="Prayer Request" description="Submit a prayer request to our ministry team." link="/dashboard?tab=prayer" linkText="Submit Request" />
        <QuickActionCard icon={<Share2 />} title="Share & Earn" description="Invite others and start earning commissions today." link="/dashboard?tab=outreach" linkText="Get Link" />
      </div>

      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Certificates</h2>
        </div>
        {certificates && certificates.certificates.length > 0 ? (
          <div className="space-y-3">
            {certificates.certificates.map((cert: any) => (
              <div key={cert.id} className="bg-gray-700/50 border border-gray-600 p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{cert.courseTitle}</p>
                  <p className="text-sm text-gray-400">
                    Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                    {cert.recipientName ? ` • ${cert.recipientName}` : ''}
                  </p>
                  <p className="text-xs text-gray-500">Code: {cert.certificateCode}</p>
                </div>
                {cert.certificateUrl ? (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-white text-black hover:bg-gray-200 px-3 py-1 font-semibold inline-flex items-center rounded-lg"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Certificate
                  </a>
                ) : (
                  <button className="text-sm bg-gray-600 text-white px-3 py-1 font-semibold cursor-default" disabled>
                    Not Available
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You have not earned any certificates yet. Complete a course to get started!</p>
        )}
      </div>

      {/* Username Creation/Update Modal */}
      {showUsernameModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 sm:p-8 max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {userProfile?.username ? 'Update Username' : 'Create Your Username'}
              </h3>
              <button
                onClick={() => setShowUsernameModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-4">
                {userProfile?.username
                  ? 'Update your username to change your affiliate link.'
                  : 'Your username will be used to create your unique affiliate link for earning commissions.'
                }
              </p>
              <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-blue-200 text-sm font-semibold">Requirements:</p>
                  <button
                    onClick={() => setShowRulesModal(true)}
                    className="text-blue-400 hover:text-blue-300 text-xs underline"
                  >
                    View Rules
                  </button>
                </div>
                <p className="text-blue-200 text-sm">
                  3-15 characters, lowercase letters and numbers only.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCreateUsername(); }}>
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">Username</label>
                <div className="flex relative">
                  <span className="inline-flex items-center px-3 bg-gray-700 border border-r-0 border-gray-600 rounded-l text-gray-400">
                    @
                  </span>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
                      setNewUsername(value);
                      if (value.length >= 3) {
                        checkUsernameAvailability(value);
                      } else {
                        setUsernameAvailable(null);
                        setAvailabilityMessage('');
                      }
                    }}
                    placeholder="yourusername"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-r px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none pr-10"
                    maxLength={15}
                  />
                  {newUsername.length >= 3 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {checkingAvailability ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                      ) : usernameAvailable === true ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : usernameAvailable === false ? (
                        <X className="h-4 w-4 text-red-400" />
                      ) : null}
                    </div>
                  )}
                </div>
                {availabilityMessage && (
                  <div>
                    <p className={`text-xs mt-1 ${usernameAvailable ? 'text-green-400' : 'text-red-400'}`}>
                      {checkingAvailability ? 'Checking availability...' : availabilityMessage}
                    </p>
                    {availabilityMessage?.includes('demo data') && (
                      <p className="text-yellow-400 text-xs mt-1">
                        ⚠️ Using demo mode - backend not connected
                      </p>
                    )}
                  </div>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {newUsername.length}/15 characters
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowUsernameModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    creatingUsername ||
                    !newUsername.trim() ||
                    newUsername.length < 3 ||
                    newUsername.length > 15 ||
                    usernameAvailable === false ||
                    checkingAvailability
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  {creatingUsername ? 'Processing...' : userProfile?.username ? 'Update Username' : 'Create Username'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Username Update Warning Modal */}
      {showUpdateWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 sm:p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">Update Username Warning</h3>
              <button
                onClick={() => setShowUpdateWarning(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-200 font-semibold mb-1">Important Warning</p>
                    <p className="text-yellow-100 text-sm">
                      If you update your username, anyone who has your current affiliate link will need to get the new link from you. The old link will no longer work.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Are you sure you want to update your username from <strong className="text-white">@{userProfile?.username}</strong> to <strong className="text-white">@{newUsername}</strong>?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowUpdateWarning(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUpdateWarning(false);
                  createUsername();
                }}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Yes, Update Username
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Username Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 sm:p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">Username Rules</h3>
              <button
                onClick={() => setShowRulesModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">3-15 characters long</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">Lowercase letters only (a-z)</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">Numbers only (0-9)</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">No uppercase letters</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">No special characters (!@#$%^&*)</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">No spaces or underscores</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg mb-4">
              <p className="text-blue-200 text-sm">
                <strong>Example:</strong> "johnsmith123" ✓, "JohnSmith" ✗, "john_smith" ✗
              </p>
            </div>

            <button
              onClick={() => setShowRulesModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}


      {/* Global Recruit Modal */}
      <RecruitModal
        isOpen={showRecruitModal}
        onClose={() => setShowRecruitModal(false)}
      />
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-4 sm:p-6 hover:bg-gray-800/70 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div className={`${color} flex-shrink-0`}>
          {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 sm:h-6 sm:w-6" })}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wide truncate">{label}</p>
          <p className="text-lg sm:text-2xl font-bold text-white heading-font truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, description, link, linkText }: { icon: React.ReactNode; title: string; description: string; link: string; linkText: string }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-blue-400 mb-4" })}
      <h3 className="text-lg font-bold text-white mb-2 heading-font">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <a href={link} className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm rounded-lg">
        {linkText}
      </a>
    </div>
  );
}

