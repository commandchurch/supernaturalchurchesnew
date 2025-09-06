import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  Crown,
  Zap,
  Heart,
  Star,
  CheckCircle,
  Users,
  BookOpen,
  Award,
  DollarSign,
  Target,
  Globe,
  Shield,
  Flame,
  Rocket,
  ArrowRight,
  Sparkles,
  Church,
  GraduationCap,
  X,
  Building,
  Loader2,
  HelpCircle,
  Play,
  ExternalLink
} from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

const Ambassador: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { isSignedIn, user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock ambassador data - will be replaced with API call
  const ambassadorData = {
    username: username || 'demo',
    name: 'John Smith',
    church: 'Supernatural Church Sydney',
    location: 'Sydney, Australia',
    bio: 'Leading supernatural ministry and training believers in Kingdom authority.',
    profileImage: '/samuel-waterhouse.png',
    referralCode: username || 'demo123'
  };

  // Mock testimonies - will be replaced with API call
  const testimonies = [
    {
      id: 1,
      title: 'Life-Changing Ministry Training',
      content: 'This training completely transformed my understanding of supernatural ministry. I\'ve seen more miracles in the last 6 months than in my entire previous ministry career.',
      author: 'Pastor Sarah Johnson',
      church: 'Freedom Church Melbourne',
      date: '2024-08-15'
    }
  ];

  const handleJoinNow = async (planCode: string) => {
    setIsProcessing(true);
    // Mock implementation - will be replaced with actual signup flow
    setTimeout(() => {
      window.location.href = `/membership?ref=${ambassadorData.referralCode}`;
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={`${ambassadorData.name} - Supernatural Ambassador`}
        description={`Join ${ambassadorData.name} from ${ambassadorData.church} in supernatural ministry training. Start your journey with Kingdom authority and power.`}
        canonicalUrl={`${siteUrl}/ambassador/${ambassadorData.username}`}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 heading-font">
            TRAIN. GO. SAVE. REPEAT.
          </h1>
          <p className="text-xl text-orange-400 mb-4">"For the kingdom of God is not in word but in power."</p>
          <p className="text-lg text-gray-300 mb-8">— 1 Corinthians 4:20</p>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Heaven's truth revealed through accurate biblical teaching. Equipping believers to walk in Christ's authority, demonstrate supernatural power, and transform nation.
          </p>
          <p className="text-lg text-gray-300 mt-4">
            The World's Premier Supernatural Ministry Training Institute
          </p>
        </div>

        {/* Ambassador Info */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 bg-gray-800/50 border border-gray-700 rounded-xl px-6 py-4 mb-6">
            <img
              src={ambassadorData.profileImage}
              alt={ambassadorData.name}
              className="w-16 h-16 rounded-full border-2 border-orange-500"
            />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-white">{ambassadorData.name}</h2>
              <p className="text-gray-300">{ambassadorData.church}</p>
              <p className="text-gray-400 text-sm">{ambassadorData.location}</p>
            </div>
          </div>
        </div>

        {/* Core Focus Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Our Core Focus: Outreach & Soul Winning</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Everything we do centers around winning souls for the Kingdom of God through supernatural demonstration and biblical discipleship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">WIN SOULS</h3>
            <p className="text-gray-300 leading-relaxed">
              We train believers to perform supernatural outreach—healing the sick, casting out demons, and demonstrating God's power to win souls for Christ through Kingdom authority.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <GraduationCap className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">DISCIPLE THEM</h3>
            <p className="text-gray-300 leading-relaxed">
              New believers receive comprehensive discipleship training—learning to walk in God's power, understand His Word, and mature in their faith through supernatural ministry.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <Church className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">PLUG INTO CHURCHES</h3>
            <p className="text-gray-300 leading-relaxed">
              We connect discipled believers with partnered churches in their local area for ongoing fellowship, growth, and ministry opportunities in Kingdom communities.
            </p>
          </div>
        </div>

        {/* Help Me Fund Section */}
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-xl p-8 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">HELP ME FUND</h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Emergency financial support for active members facing crisis. Covers urgent bills, medical expenses, and unexpected hardship situations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">✅ What We Cover:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Emergency rent or utility bills</li>
                <li>• Urgent medical expenses (accident-related)</li>
                <li>• Unexpected hardship situations</li>
                <li>• Crisis support for active ministry members</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">❌ What We Don't Cover:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• General medication or ongoing medical treatment</li>
                <li>• Education or study expenses</li>
                <li>• Business or personal loans</li>
                <li>• Non-emergency situations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prayer Requests Section */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-8 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">PRAYER REQUESTS</h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Connect with our pastoral team for prayer support, spiritual guidance, and encouragement in your faith journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-300">• Submit prayer requests anytime</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-300">• Receive pastoral guidance and support</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-300">• Join community prayer groups</p>
            </div>
          </div>
        </div>

        {/* Outreach Affiliate Program */}
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-8 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">Outreach Affiliate Program</h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Share the Gospel and earn commissions while equipping believers for supernatural ministry. Transform lives through authentic outreach and Kingdom partnerships.
            </p>
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Install Our Mobile App</h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Get the full Supernatural Institute experience on your mobile device. No app store required - install directly from your browser!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h4 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
                📱 iOS Installation (iPhone/iPad)
              </h4>
              <ol className="text-gray-300 text-sm space-y-2">
                <li>1. Open Safari browser on your iOS device</li>
                <li>2. Visit supernatural.institute in Safari</li>
                <li>3. Tap the Share button (📤) at the bottom of Safari</li>
                <li>4. Scroll down and tap "Add to Home Screen"</li>
                <li>5. Tap "Add" in the top right corner</li>
                <li>6. Find the app icon on your home screen and tap to open</li>
              </ol>
              <p className="text-gray-400 text-xs mt-3">
                Note: Safari is required for iOS installation. Other browsers won't work.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                🤖 Android Installation
              </h4>
              <ol className="text-gray-300 text-sm space-y-2">
                <li>1. Open Chrome browser on your Android device</li>
                <li>2. Visit supernatural.institute in Chrome</li>
                <li>3. Look for "Install app" banner at the top, or tap menu (⋮)</li>
                <li>4. If using menu: Tap "Install app" or "Add to Home Screen"</li>
                <li>5. Tap "Install" to add to your home screen</li>
                <li>6. Find the app icon on your home screen and tap to open</li>
              </ol>
              <p className="text-gray-400 text-xs mt-3">
                Note: Chrome, Edge, or Samsung Internet browsers work best for Android.
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-300 text-sm mb-4">
              💡 Pro Tip: After installation, long-press the app icon to access quick actions like "Add Prayer Request" directly from your home screen!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-all duration-300 rounded-lg"
            >
              Download Mobile App
            </Link>
          </div>
        </div>

        {/* Try Dashboard & Sign in */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
            <p className="text-gray-300 mb-4">Try Dashboard • Sign in with Clerk authentication • Works offline • Push notifications included</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-all duration-300 rounded-lg"
              >
                Try Dashboard
              </Link>
              <Link
                to="/membership"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-all duration-300 rounded-lg"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Supernatural Ministry in Action */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Supernatural Ministry in Action</h3>
            <p className="text-gray-300 leading-relaxed">
              Witness the power of God demonstrated through real-time miracles and supernatural encounters.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-orange-400 font-semibold mb-2">Live Radio Miracle</h4>
                <p className="text-gray-300 mb-4">Kiss FM 106.5 Sydney</p>
                <button className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 font-semibold text-sm transition-all duration-300 rounded-lg">
                  <Play className="w-4 h-4" />
                  Click to listen
                </button>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">LIVE MIRACLE</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Instant Healing Live on Air In 2022, radio host Kyle Sandilands from Kiss FM 106.5 in Sydney, Australia received an instant miracle live on air. Samuel called to stop a séance from happening, and Jesus healed Kyle's crippling back injury with undeniable evidence for millions of listeners.
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  Pain erased, movement restored, as the world listened in real time. This supernatural encounter was backed up by church testimony and demonstrates the authentic power of God flowing through this ministry.
                </p>
                <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-semibold text-sm transition-all duration-300 rounded-lg">
                  <ExternalLink className="w-4 h-4" />
                  WATCH TESTIMONY
                </button>
                <p className="text-gray-400 text-xs mt-2">⚠️ Warning: Contains strong language</p>
                <p className="text-gray-400 text-xs">Audio recording also available via Google Drive link</p>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 heading-font">
              Start Your Supernatural Journey
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              No credit card required. Begin building your ministry network and income potential.
            </p>
          </div>

          {/* Membership Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
            {/* SILVER */}
            <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/50 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 p-8 flex flex-col transform hover:scale-105">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black mb-4 heading-font text-white">SILVER</h3>
                <div className="text-3xl font-black text-white mb-3">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-gray-400">$</span>
                    <span>33</span>
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-6">Everything in Bronze +</p>

                <div className="text-left mb-4">
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="text-blue-400 font-semibold">Everything in Bronze +</div>
                    <div>• Affiliate commission earnings (2 levels)</div>
                    <div>• Monthly Private Group Teaching</div>
                    <div>• Sign up bonus qualification</div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  className="w-full px-8 py-5 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                  onClick={() => handleJoinNow('SILVER')}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      JOIN SILVER
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* GOLD - Most Popular */}
            <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-orange-500/60 ring-2 ring-orange-500/30 shadow-orange-500/20 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 p-8 flex flex-col transform hover:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap">
                  🔥 MOST POPULAR
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black mb-4 heading-font text-orange-400">GOLD</h3>
                <div className="text-3xl font-black text-white mb-3">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-gray-400">$</span>
                    <span>149</span>
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-6">Everything in Silver +</p>

                <div className="text-left mb-4">
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="text-purple-400 font-semibold">Everything in Silver +</div>
                    <div>• Affiliate commission earnings (5 levels)</div>
                    <div>• Fortnightly Q&A group coaching</div>
                    <div>• Fortnightly Private Live Teaching</div>
                    <div>• 5% discount on any merch available</div>
                    <div>• Sign up bonus qualification</div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  className="w-full px-8 py-5 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
                  onClick={() => handleJoinNow('GOLD')}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      JOIN GOLD
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* DIAMOND */}
            <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/50 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 p-8 flex flex-col transform hover:scale-105">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black mb-4 heading-font text-white">DIAMOND</h3>
                <div className="text-3xl font-black text-white mb-3">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm text-gray-400">$</span>
                    <span>499</span>
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-6">Everything in Gold +</p>

                <div className="text-left mb-4">
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="text-orange-400 font-semibold">Everything in Gold +</div>
                    <div>• Affiliate commission earnings (7 levels)</div>
                    <div>• Fortnightly Private Live Teaching</div>
                    <div>• Direct level 1 referrals increase from 20% to 33%</div>
                    <div>• Free tickets to all in person or online events</div>
                    <div>• 10% discount on any merch available</div>
                    <div>• Sign up bonus qualification</div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  className="w-full px-8 py-5 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                  onClick={() => handleJoinNow('DIAMOND')}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      JOIN DIAMOND
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* FREE Tier */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-green-400 mb-4">Start FREE Today</h3>
              <p className="text-lg text-gray-300 max-w-xl mx-auto mb-6">
                No credit card required. Begin building your ministry network and income potential.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-sm p-8 rounded-2xl">
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-green-400 mb-4">$0</div>
                <h4 className="text-xl font-bold text-white mb-2">FREE Membership</h4>
                <p className="text-gray-300 text-sm mb-6">Start your journey with our referral program</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-sm text-gray-300">• 30% commissions on referrals</div>
                <div className="text-sm text-gray-300">• Prayer request submissions</div>
                <div className="text-sm text-gray-300">• Support ticket access</div>
                <div className="text-sm text-gray-300">• Basic training access</div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <h5 className="text-blue-400 font-semibold text-sm mb-3 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Ways to Get Started
                </h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                    Complete courses in the Academy to earn certificates
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                    Submit prayer requests for ministry support
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                    Join our community events and gatherings
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-500/20">
                  <p className="text-xs text-blue-300">
                    💡 <strong>Pro Tip:</strong> Paid memberships unlock premium courses and deeper commission levels when you're ready to grow!
                  </p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg mb-6">
                <div className="text-green-200 text-sm space-y-1">
                  <p>1. Join FREE → Start your journey</p>
                  <p>2. Optional: Invite friends to unlock Bronze benefits</p>
                  <p>3. Optional: Share monthly to enhance your experience</p>
                  <p>4. Earn 30% commissions on successful referrals</p>
                </div>
                <div className="mt-3 pt-3 border-t border-green-500/20">
                  <p className="text-xs text-green-300">
                    🔓 <strong>No Obligations:</strong> Everything is completely optional. Build at your own pace.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                  onClick={() => handleJoinNow('FREE')}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      START FREE NOW
                    </>
                  )}
                </button>
                <p className="text-gray-300 text-xs mt-3">Start your earning journey today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Benefits Summary */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Membership Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="text-lg font-semibold text-white mb-2">Fast & Reliable Payments</h4>
              <p className="text-gray-300 text-sm">Get paid quickly and reliably for your referrals.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="text-lg font-semibold text-white mb-2">Sustainable Growth</h4>
              <p className="text-gray-300 text-sm">Gradual price increases as your business scales.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="text-lg font-semibold text-white mb-2">Legal Compliance</h4>
              <p className="text-gray-300 text-sm">Australian Consumer Law compliant with proper cooling-off periods.</p>
            </div>
          </div>
        </div>

        {/* READ FULL COMPENSATION PLAN CTA */}
        <div className="text-center mb-12">
          <Link
            to="/compensation-plan"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-lg uppercase tracking-wide transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
          >
            READ FULL COMPENSATION PLAN
          </Link>
        </div>

        {/* 7-Level Network Calculator */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">7-Level Network Calculator</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Quick Scenarios: Customize Your Network
            </p>
          </div>

          {/* Calculator will be implemented here */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
            <p className="text-gray-300 mb-4">Interactive calculator coming soon...</p>
            <p className="text-sm text-gray-400">
              This will allow visitors to input their network structure and see potential earnings
            </p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Getting Started</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl mb-4">1️⃣</div>
              <h4 className="text-lg font-semibold text-white mb-2">Join a Membership</h4>
              <p className="text-gray-300 text-sm">Choose Bronze, Silver, Gold, or Diamond membership</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">2️⃣</div>
              <h4 className="text-lg font-semibold text-white mb-2">Share Your Link</h4>
              <p className="text-gray-300 text-sm">Get your unique referral link from the dashboard</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">3️⃣</div>
              <h4 className="text-lg font-semibold text-white mb-2">Earn Commissions</h4>
              <p className="text-gray-300 text-sm">Watch your network grow and commissions roll in whilst growing closer to Jesus and winning souls!</p>
            </div>
          </div>
        </div>

        {/* Ambassador Testimonies Section */}
        {testimonies.length > 0 && (
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Testimonials from {ambassadorData.name}'s Network</h3>
            </div>

            <div className="space-y-6">
              {testimonies.map((testimony) => (
                <div key={testimony.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">{testimony.title}</h4>
                  <p className="text-gray-300 mb-4">"{testimony.content}"</p>
                  <div className="text-sm text-gray-400">
                    <p className="font-semibold">{testimony.author}</p>
                    <p>{testimony.church}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Ambassador;