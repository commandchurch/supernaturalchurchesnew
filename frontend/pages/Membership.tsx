import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardHeader,
  EnhancedCardTitle
} from '../components/ui/enhanced-card';
import {
  EnhancedButton
} from '../components/ui/enhanced-button';
import { Badge } from '../components/ui/badge';
import ChurchPartnershipCTA from '../components/ChurchPartnershipCTA';
import FiveFoldPartnershipApplication from '../components/FiveFoldPartnershipApplication';
import MembershipToggle from '../components/MembershipToggle';
import { individualMembershipTiers, churchMembershipTiers } from '../data/membershipTiers';
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
  Loader2
} from 'lucide-react';

const Membership: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [membershipType, setMembershipType] = useState<'individual' | 'church'>('individual');
  const [isPartnershipFormOpen, setIsPartnershipFormOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock subscription plans - UPDATED WITH ROUND PRICING
  const subscriptionPlans = [
    { code: 'FREE', name: 'Free Membership', price: 0, description: 'Basic access' },
    { code: 'BRONZE', name: 'Bronze Membership', price: 10, annualPrice: 108, description: 'Entry level membership' },
    { code: 'SILVER', name: 'Silver Membership', price: 20, annualPrice: 216, description: 'Enhanced membership' },
    { code: 'GOLD', name: 'Gold Membership', price: 50, annualPrice: 540, description: 'Advanced membership' },
    { code: 'DIAMOND', name: 'Diamond Membership', price: 100, annualPrice: 1080, description: 'Elite membership' }
  ];

  const createCheckoutSession = async (params: any) => {
    // Mock checkout session creation
    alert('Redirecting to Stripe checkout...');
    // In real implementation, this would redirect to Stripe
    return { url: '/dashboard?subscription=success' }; // Mock return for now
  };
  
  // Handle JOIN NOW button click
  const handleJoinNow = async (planCode: string) => {
    if (planCode === 'FREE') {
      // Handle free tier signup - just redirect to dashboard
      window.location.href = '/dashboard';
      return;
    }

    try {
      setIsProcessing(true);
      const result = await createCheckoutSession({
        planCode,
        successUrl: `${window.location.origin}/dashboard?subscription=success`,
        cancelUrl: `${window.location.origin}/membership?subscription=cancelled`,
        userId: user?.id || '',
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      alert('Failed to start payment process. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Get the appropriate tier list based on membership type - update with real data from Convex
  const getUpdatedTiers = () => {
    const baseTiers = membershipType === 'church' ? churchMembershipTiers : individualMembershipTiers;
    
    if (!subscriptionPlans) return baseTiers;
    
    // Map Encore plans to tier display data
    return baseTiers.map(tier => {
      const encorePlan = subscriptionPlans.find(p =>
        tier.name.toUpperCase().includes(p.code) ||
        p.name.toUpperCase().includes(tier.name.toUpperCase())
      );

      if (encorePlan) {
        return {
          ...tier,
          price: encorePlan.price,
          benefits: encorePlan.description ? [encorePlan.description] : tier.benefits,
          planCode: encorePlan.code
        };
      }
      
      return tier;
    });
  };
  
  const currentTiers = getUpdatedTiers();

  // Show loading state while plans are being fetched
  if (subscriptionPlans === undefined) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading membership plans...</p>
        </div>
      </div>
    );
  }

  // Calculate pricing based on billing period
  const getPrice = (basePrice: number, planCode?: string) => {
    if (billingPeriod === 'annual') {
      // Use the pre-calculated annual price from subscriptionPlans
      const plan = subscriptionPlans.find(p => p.code === planCode);
      if (plan && plan.annualPrice) {
        return plan.annualPrice;
      }
      // Fallback calculation - exact pricing without rounding
      return (basePrice * 12 * 0.9).toFixed(2); // Annual price with 10% discount
    }
    return basePrice;
  };

  const getOriginalPrice = (basePrice: number, planCode?: string) => {
    if (billingPeriod === 'annual') {
      // Use the pre-calculated annual price from subscriptionPlans
      const plan = subscriptionPlans.find(p => p.code === planCode);
      if (plan && plan.annualPrice) {
        return Math.round(plan.annualPrice / 0.9); // Show original price before discount
      }
      // Fallback calculation
      return basePrice * 12; // Original annual price
    }
    return null;
  };

  // Show membership content for all users - signed out users can see plans but need to sign in to purchase

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-20" id="plans">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Rocket className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Supernatural Institute</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 heading-font bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Choose Your<br />
              <span className="text-orange-400">Supernatural Path</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Transform your ministry with premium courses, exclusive community access, and supernatural training that changes lives. Start free and earn as you grow!
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Users className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-blue-400">10K+</span>
              </div>
              <p className="text-blue-200 text-sm">Active Members</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <DollarSign className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold text-green-400">$2M+</span>
              </div>
              <p className="text-green-200 text-sm">Paid to Affiliates</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Target className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold text-purple-400">30%</span>
              </div>
              <p className="text-purple-200 text-sm">Commission Rate</p>
            </div>
          </div>

          {/* How It Works Overview */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 mb-12 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Start Free</h4>
                <p className="text-gray-300 text-sm">Join with no commitment and access basic training</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Build Your Network</h4>
                <p className="text-gray-300 text-sm">Recruit members and earn commissions as you grow</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Scale & Earn</h4>
                <p className="text-gray-300 text-sm">Upgrade tiers and maximize your earning potential</p>
              </div>
            </div>
          </div>

          {/* Membership Type Toggle */}
          <div className="flex justify-center mb-8">
            <MembershipToggle
              membershipType={membershipType}
              onToggle={setMembershipType}
            />
          </div>

          {/* Billing Period Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-1 flex backdrop-blur-sm">
              <button
                className={`px-8 py-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billingPeriod === 'monthly'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly Billing
              </button>
              <button
                className={`px-8 py-4 rounded-lg text-sm font-semibold transition-all duration-300 relative ${
                  billingPeriod === 'annual'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual Billing
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  SAVE 10%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {currentTiers
            .filter(tier => tier.name !== 'FREE') // Exclude FREE tier from main grid
            .map((tier, index) => {
            const Icon = tier.icon;
            const isPopular = tier.name === 'SILVER'; // Mark Silver as popular

            // Special handling for church partnership
            if (membershipType === 'church' && tier.name === 'SUPERNATURAL CHURCHES PARTNERSHIP') {
              return (
                <div
                  key={tier.name}
                  className="group relative bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/50 backdrop-blur-sm hover:border-orange-400 transition-all duration-500 p-8 flex flex-col col-span-full lg:col-span-4 transform hover:scale-105"
                >
                  {/* Featured badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap">
                      ✨ FEATURED PARTNERSHIP
                    </span>
                  </div>

                  <div className="text-center mb-8 pt-6">
                    <div className="h-20 w-20 bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
                      <Icon className="h-10 w-10 text-orange-400" />
                    </div>

                    <h3 className="text-3xl font-black text-white mb-4 heading-font">
                      {tier.name}
                    </h3>

                    <div className="text-5xl font-black text-white mb-4">
                      <div className="flex items-center justify-center gap-2">
                        ${getPrice(tier.price, (tier as any).planCode)}
                        {getOriginalPrice(tier.price, (tier as any).planCode) && (
                          <span className="text-2xl text-gray-500 line-through">
                            ${getOriginalPrice(tier.price, (tier as any).planCode)}
                          </span>
                        )}
                      </div>
                      <span className="text-lg text-gray-400">
                        /{billingPeriod === 'annual' ? 'year' : 'month'}
                      </span>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {tier.description}
                    </p>
                  </div>

                  {/* Partnership CTA */}
                  <div className="mt-auto">
                    <div className="bg-gray-800/50 border border-gray-600 p-8 rounded-xl text-center space-y-6">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-12 w-12 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
                          <span className="text-blue-400 text-xl">⛪</span>
                        </div>
                        <h4 className="text-white font-bold text-2xl">Partner Your Church</h4>
                      </div>

                      <p className="text-gray-300 text-base leading-relaxed mb-6">
                        Join our Supernatural Churches Apostolic Partnership and bring supernatural power, healing protocols, and doctrinal clarity to your congregation.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                          to="/about#church-partnership"
                          className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all duration-300 text-sm tracking-wide text-center rounded-lg"
                        >
                          LEARN MORE
                        </Link>
                        <button
                          className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 text-sm tracking-wide rounded-lg"
                          onClick={() => setIsPartnershipFormOpen(true)}
                        >
                          PARTNER WITH US
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Enhanced premium tier cards
            return (
              <div
                key={tier.name}
                className={`group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 p-8 flex flex-col transform hover:scale-105 hover:shadow-2xl ${
                  isPopular
                    ? 'border-orange-500/60 ring-2 ring-orange-500/30 shadow-orange-500/20'
                    : 'border-gray-600/50 hover:border-gray-500/60'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
                      🔥 MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`h-16 w-16 ${isPopular ? 'bg-orange-500/20 border-orange-500/40' : 'bg-gray-600/20 border-gray-500/40'} border-2 flex items-center justify-center mx-auto mb-6 rounded-xl`}>
                    <Icon className={`h-8 w-8 ${isPopular ? 'text-orange-400' : 'text-gray-400'}`} />
                  </div>

                  <h3 className={`text-2xl font-black mb-4 heading-font ${
                    isPopular ? 'text-orange-400' : 'text-white'
                  }`}>
                    {tier.name}
                  </h3>

                  <div className="text-4xl font-black text-white mb-3">
                    <div className="flex items-center justify-center gap-2">
                      ${getPrice(tier.price, (tier as any).planCode)}
                      {getOriginalPrice(tier.price, (tier as any).planCode) && (
                        <span className="text-2xl text-gray-500 line-through">
                          ${getOriginalPrice(tier.price, (tier as any).planCode)}
                        </span>
                      )}
                    </div>
                    <span className="text-base text-gray-400">
                      /{billingPeriod === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>

                  <p className="text-gray-400 text-base leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Commission Earnings Highlight */}
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-6 w-6 bg-green-500/20 border border-green-500/40 flex items-center justify-center rounded-full">
                        <span className="text-green-400 text-sm">💰</span>
                      </div>
                      <span className="text-green-400 font-semibold text-sm">EARNING POTENTIAL</span>
                    </div>
                    <div className="text-left">
                      {tier.name === 'BRONZE' && (
                        <div className="text-green-200 text-sm space-y-1">
                          <p>• <strong>30%</strong> on direct referrals</p>
                          <p>• <strong>$3,000/mo</strong> max earnings</p>
                          <p>• <strong>1 level</strong> commission depth</p>
                        </div>
                      )}
                      {tier.name === 'SILVER' && (
                        <div className="text-green-200 text-sm space-y-1">
                          <p>• <strong>30% + 10%</strong> on referrals</p>
                          <p>• <strong>$6,000/mo</strong> max earnings</p>
                          <p>• <strong>2 levels</strong> commission depth</p>
                        </div>
                      )}
                      {tier.name === 'GOLD' && (
                        <div className="text-green-200 text-sm space-y-1">
                          <p>• <strong>30% + 10% + 5% + 3% + 2%</strong> on referrals</p>
                          <p>• <strong>$15,000/mo</strong> max earnings</p>
                          <p>• <strong>5 levels</strong> commission depth</p>
                        </div>
                      )}
                      {tier.name === 'DIAMOND' && (
                        <div className="text-green-200 text-sm space-y-1">
                          <p>• <strong>30% + 10% + 5% + 3% + 2% + 1% + 1%</strong> on referrals</p>
                          <p>• <strong>$30,000/mo</strong> max earnings</p>
                          <p>• <strong>7 levels</strong> commission depth</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="space-y-3 mb-8 flex-1">
                  {tier.benefits.slice(0, 5).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="flex-1 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                  {tier.benefits.length > 5 && (
                    <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-600/50">
                      +{tier.benefits.length - 5} more premium benefits
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <button
                    className={`w-full px-8 py-5 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-lg ${
                      isPopular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    onClick={() => handleJoinNow((tier as any).planCode || tier.name)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        JOIN {tier.name}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FREE Tier - Enhanced Section */}
        {currentTiers.find(tier => tier.name === 'FREE') && (
          <div className="max-w-6xl mx-auto">
            {/* Free Tier Hero */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                <Rocket className="h-4 w-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">Zero Cost Entry</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 heading-font">
                Start Your Journey <span className="text-green-400">FREE</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                No commitment, no credit card required. Join our community and start earning through referrals immediately.
              </p>
            </div>

            {/* Free Tier Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <span className="text-3xl font-bold text-green-400">$0</span>
                </div>
                <p className="text-green-200 text-sm">Entry Cost</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Users className="h-8 w-8 text-blue-400" />
                  <span className="text-3xl font-bold text-blue-400">30%</span>
                </div>
                <p className="text-blue-200 text-sm">Commission Rate</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Target className="h-8 w-8 text-purple-400" />
                  <span className="text-3xl font-bold text-purple-400">2</span>
                </div>
                <p className="text-purple-200 text-sm">Referrals to Earn</p>
              </div>
            </div>

            {/* How Free Tier Works */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">How FREE Tier Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Join FREE</h4>
                  <p className="text-gray-300 text-sm">Get access to basic training and community features at no cost</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Recruit 2 Bronze</h4>
                  <p className="text-gray-300 text-sm">Sign up 2 Bronze members to unlock Level 1 affiliate earnings</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Start Earning</h4>
                  <p className="text-gray-300 text-sm">Earn 30% commission on all your Bronze referrals</p>
                </div>
              </div>
            </div>

            {/* Tithing Encouragement */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-8 mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-12 w-12 bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center rounded-full">
                  <span className="text-yellow-400 text-xl">🙏</span>
                </div>
                <h4 className="text-2xl font-bold text-white">Test God with Your Tithe</h4>
              </div>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-yellow-200 text-lg leading-relaxed mb-6 italic">
                  "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this," says the LORD Almighty, "and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it."
                </p>
                <p className="text-yellow-200 text-base leading-relaxed mb-4">
                  - Malachi 3:10
                </p>
                <p className="text-yellow-200 text-base leading-relaxed">
                  As you begin earning through our affiliate program, consider cheerfully giving 10% of your earnings back to God. This is the only place in Scripture where God invites us to test Him!
                </p>
              </div>
            </div>

            {(() => {
              const freeTier = currentTiers.find(tier => tier.name === 'FREE')!;
              const Icon = freeTier.icon;

              return (
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-sm p-10 rounded-3xl">
                  <div className="text-center mb-10">
                    <div className="h-20 w-20 bg-gray-600/20 border-2 border-gray-500/40 flex items-center justify-center mx-auto mb-6 rounded-xl">
                      <Icon className="h-10 w-10 text-gray-400" />
                    </div>

                    <h4 className="text-3xl font-black text-white mb-4">
                      START FREE
                    </h4>

                    <div className="text-6xl font-black text-green-400 mb-6">
                      $0
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                      Join our supernatural community at no cost and start building your network. Earn commissions by helping others join the Bronze tier.
                    </p>
                  </div>

                  {/* Enhanced Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl">
                      <h5 className="text-green-400 font-semibold text-lg mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        What You Get FREE
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm text-green-200">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Access to limited free courses</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-green-200">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Basic community updates</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-green-200">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Referral program access</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-green-200">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Help build your referrer's network</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl">
                      <h5 className="text-blue-400 font-semibold text-lg mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        How You Earn
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm text-blue-200">
                          <span className="text-blue-400 font-bold">1.</span>
                          <span>Sign up 2 Bronze members</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-blue-200">
                          <span className="text-blue-400 font-bold">2.</span>
                          <span>Unlock 30% Level 1 commissions</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-blue-200">
                          <span className="text-blue-400 font-bold">3.</span>
                          <span>Maintain by recruiting 2 more every 28 days</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-blue-200">
                          <span className="text-blue-400 font-bold">4.</span>
                          <span>Stay on FREE membership</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upgrade Path */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 p-8 rounded-xl mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                      <h5 className="text-blue-400 font-semibold text-lg">Your FREE to Earning Path</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-200">
                      <div className="bg-blue-500/10 p-4 rounded-lg">
                        <p className="font-semibold text-blue-300 mb-2">🎯 Step 1: Join FREE</p>
                        <p>Get access to training and community</p>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg">
                        <p className="font-semibold text-blue-300 mb-2">👥 Step 2: Recruit 2 Bronze</p>
                        <p>Sign up 2 Bronze members to unlock earnings</p>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg">
                        <p className="font-semibold text-blue-300 mb-2">💰 Step 3: Start Earning</p>
                        <p>Earn 30% on all your Bronze referrals</p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-300 text-sm">
                        <strong>💡 Pro Tip:</strong> Stay on FREE membership to maintain your Bronze earning status. Recruit 2 more Bronze members every 28 days to keep earning!
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      className="px-12 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-3 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl mx-auto"
                      onClick={() => handleJoinNow((freeTier as any).planCode || freeTier.name)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          START EARNING FREE
                          <ArrowRight className="ml-2 h-6 w-6" />
                        </>
                      )}
                    </button>
                    <p className="text-gray-400 text-sm mt-4">No credit card required • Start immediately</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      <FiveFoldPartnershipApplication 
        isOpen={isPartnershipFormOpen}
        onClose={() => setIsPartnershipFormOpen(false)}
      />
    </div>
  );
};

export default Membership;
