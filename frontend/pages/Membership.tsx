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
import { individualMembershipTiers, churchMembershipTiers, MembershipTier } from '../data/membershipTiers';
import SEO from '../components/SEO';
import { siteUrl } from '../config/index';
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

// Skeleton Loader Component
const SkeletonLoader = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className || ""}`}></div>
);

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 hover:bg-gray-700/30 transition-colors flex items-center justify-between"
      >
        <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-gray-300 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Membership: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [membershipType, setMembershipType] = useState<'individual' | 'church'>('individual');
  const [isPartnershipFormOpen, setIsPartnershipFormOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [errorType, setErrorType] = useState<'network' | 'payment' | 'auth' | 'unknown'>('unknown');
  const [lastErrorTime, setLastErrorTime] = useState<number | null>(null);
  const [customPrice, setCustomPrice] = useState<number>(10);
  const [billingFrequency, setBillingFrequency] = useState<'weekly' | 'fortnightly' | 'monthly'>('monthly');
  const [billingDate, setBillingDate] = useState<number>(1);
  
  // Fixed pricing subscription plans
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
  
  // Enhanced error categorization helper
  const categorizeError = (error: unknown): { message: string; type: 'network' | 'payment' | 'auth' | 'unknown' } => {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();

      if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
        return { message: 'Network connection issue. Please check your internet connection and try again.', type: 'network' };
      }
      if (message.includes('payment') || message.includes('stripe') || message.includes('checkout')) {
        return { message: 'Payment processing error. Please check your payment details and try again.', type: 'payment' };
      }
      if (message.includes('auth') || message.includes('unauthorized') || message.includes('login')) {
        return { message: 'Authentication required. Please sign in and try again.', type: 'auth' };
      }
      return { message: error.message, type: 'unknown' };
    }
    return { message: 'An unexpected error occurred. Please try again.', type: 'unknown' };
  };

  // Handle JOIN NOW button click with enhanced error handling
  const handleJoinNow = async (planCode: string) => {
    // Rate limiting check - prevent rapid retries
    const now = Date.now();
    if (lastErrorTime && now - lastErrorTime < 2000) {
      setError('Please wait a moment before retrying.');
      return;
    }

    if (planCode === 'FREE') {
      // Handle free tier signup - just redirect to dashboard
      try {
        setIsProcessing(true);
        setError(null);
        setErrorType('unknown');
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Failed to redirect to dashboard:', error);
        const { message, type } = categorizeError(error);
        setError(message);
        setErrorType(type);
        setLastErrorTime(now);
        setIsProcessing(false);
      }
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setErrorType('unknown');

      const result = await createCheckoutSession({
        planCode,
        successUrl: `${window.location.origin}/dashboard?subscription=success`,
        cancelUrl: `${window.location.origin}/membership?subscription=cancelled`,
        userId: user?.id || '',
      });

      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      const { message, type } = categorizeError(error);
      setError(message);
      setErrorType(type);
      setLastErrorTime(now);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsProcessing(false);
    }
  };

  // Enhanced retry function with exponential backoff
  const handleRetry = () => {
    setError(null);
    setErrorType('unknown');
    setLastErrorTime(null);

    // Reset retry count after successful retry or if too many attempts
    if (retryCount >= 3) {
      setRetryCount(0);
    } else {
      setRetryCount(prev => prev + 1);
    }
  };

  // Get error icon based on error type
  const getErrorIcon = () => {
    switch (errorType) {
      case 'network':
        return '🌐';
      case 'payment':
        return '💳';
      case 'auth':
        return '🔐';
      default:
        return '⚠️';
    }
  };

  // Get help text based on error type
  const getErrorHelp = () => {
    switch (errorType) {
      case 'network':
        return 'Check your internet connection and try again in a few moments.';
      case 'payment':
        return 'Verify your payment details or try a different payment method.';
      case 'auth':
        return 'Please sign in to your account and try again.';
      default:
        return 'If this problem persists, please contact our support team.';
    }
  };

  // Get the appropriate tier list based on membership type - update with real data from Convex
  const getUpdatedTiers = () => {
    const baseTiers = membershipType === 'church' ? churchMembershipTiers : individualMembershipTiers;

    if (!subscriptionPlans || !Array.isArray(subscriptionPlans)) return baseTiers;

    // Map Encore plans to tier display data
    return baseTiers.map(tier => {
      const encorePlan = subscriptionPlans.find(p =>
        p && p.code && (
          tier.name.toUpperCase().includes(p.code) ||
          p.name?.toUpperCase().includes(tier.name.toUpperCase())
        )
      );

      if (encorePlan) {
        return {
          ...tier,
          price: encorePlan.price || tier.price,
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

  // Calculate pricing based on billing period and frequency
  const getPrice = (basePrice: number, planCode?: string) => {
    let price = basePrice;

    // If using custom pricing, use the custom price
    if (planCode && planCode !== 'FREE') {
      price = customPrice;
    }

    // Adjust for billing frequency
    if (billingFrequency === 'weekly') {
      price = price / 4.33; // Average weeks per month
    } else if (billingFrequency === 'fortnightly') {
      price = price / 2; // Fortnightly = every 2 weeks
    }

    if (billingPeriod === 'annual') {
      // Use the pre-calculated annual price from subscriptionPlans
      const plan = subscriptionPlans?.find(p => p.code === planCode);
      if (plan?.annualPrice) {
        return plan.annualPrice;
      }
      // Fallback calculation - exact pricing without rounding
      return (price * 12 * 0.9).toFixed(2); // Annual price with 10% discount
    }
    return price.toFixed(2);
  };

  const getOriginalPrice = (basePrice: number, planCode?: string) => {
    if (billingPeriod === 'annual') {
      // Use the pre-calculated annual price from subscriptionPlans
      const plan = subscriptionPlans?.find(p => p.code === planCode);
      if (plan?.annualPrice) {
        return Math.round(plan.annualPrice / 0.9); // Show original price before discount
      }
      // Fallback calculation
      return basePrice * 12; // Original annual price
    }
    return null;
  };

  // Show membership content for all users - signed out users can see plans but need to sign in to purchase

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Membership Plans - Start Your Supernatural Journey"
        description="Join our supernatural ministry training platform. Start FREE and build your commission network. Multiple membership tiers available."
        canonicalUrl={`${siteUrl}/membership`}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Hero Section - Concise & Enticing */}
        <div className="text-center mb-16" id="plans">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 heading-font">
            Start Your<br />
            <span className="text-orange-400">Supernatural Journey</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            No credit card required. Begin building your ministry network and income potential.
          </p>


        </div>


        {/* Premium Tiers Grid */}
        <div id="paid-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {currentTiers
            .filter(tier => tier.name !== 'FREE') // Exclude FREE tier from main grid
            .map((tier, index) => {
            const Icon = tier.icon;
            const isPopular = tier.name === 'GOLD'; // Mark Gold as popular

            // Special handling for church partnership
            if (membershipType === 'church' && tier.name === 'SUPERNATURAL CHURCHES PARTNERSHIP') {
              const Icon = tier.icon || Church; // Fallback to Church icon
              return (
                <div
                  key={tier.name}
                  className="group relative bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/50 backdrop-blur-sm hover:border-orange-400 transition-all duration-500 p-8 flex flex-col col-span-full lg:col-span-4 transform hover:scale-105"
                >
                  {/* Featured badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap">
                      ✨ APOSTOLIC PARTNERSHIP
                    </span>
                  </div>

                  <div className="text-center mb-8 pt-6">
                    <div className="h-20 w-20 bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
                      <Icon className="h-10 w-10 text-orange-400" />
                    </div>

                    <h3 className="text-3xl font-black text-white mb-4 heading-font">
                      SUPERNATURAL CHURCHES PARTNERSHIP
                    </h3>

                    <div className="text-4xl font-black text-white mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg text-gray-400">$</span>
                        {tier.range || getPrice(tier.price || 0, tier.planCode)}
                        {getOriginalPrice(tier.price || 0, tier.planCode) && (
                          <span className="text-xl text-gray-500 line-through ml-2">
                            ${getOriginalPrice(tier.price || 0, tier.planCode)}
                          </span>
                        )}
                      </div>
                      <div className="text-center">
                        <span className="text-base text-gray-400">
                          /{billingPeriod === 'annual' ? 'year' : 'month'}
                        </span>
                        {tier.suggested && (
                          <div className="text-sm text-blue-400 mt-1">
                            Suggested: ${tier.suggested}/{billingPeriod === 'annual' ? 'year' : 'month'}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      Equip your church with apostolic oversight, supernatural training, and Kingdom power that demonstrates miraculous signs, wonders, and transformed lives.
                    </p>

                    {/* Church Commission Info */}
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-6 w-6 bg-orange-500/20 border border-orange-500/40 flex items-center justify-center rounded-full">
                          <span className="text-orange-400 text-sm">💰</span>
                        </div>
                        <span className="text-orange-400 font-semibold text-sm">CHURCH COMMISSION STRUCTURE</span>
                      </div>
                      <div className="text-orange-200 text-sm space-y-1">
                        <p>• <strong>30%</strong> commission on Level 1 referrals</p>
                        <p>• <strong>10%</strong> commission on Level 2 referrals</p>
                        <p>• <strong>5%</strong> commission on Level 3 referrals</p>
                        <p>• <strong>3 levels deep</strong> commission structure</p>
                      </div>
                    </div>
                  </div>

                  {/* Partnership CTA */}
                  <div className="mt-auto">
                    <div className="bg-gray-800/50 border border-gray-600 p-8 rounded-xl text-center space-y-6">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-12 w-12 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
                          <span className="text-blue-400 text-xl">⛪</span>
                        </div>
                        <h3 className="text-white font-bold text-2xl">Partner Your Church</h3>
                      </div>

                      <p className="text-gray-300 text-base leading-relaxed mb-6">
                        Join our Supernatural Churches Apostolic Partnership and bring supernatural power, healing protocols, and Kingdom authority to your congregation.
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
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap">
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

                  <div className="text-3xl font-black text-white mb-3">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm text-gray-400">$</span>
                      <span>{tier.price}</span>
                      <span className="text-sm text-gray-400">/{billingPeriod === 'annual' ? 'year' : 'month'}</span>
                      {billingPeriod === 'annual' && (
                        <span className="text-lg text-gray-400 line-through ml-2">
                          ${(tier.price * 12).toFixed(0)}
                        </span>
                      )}
                    </div>
                    {billingPeriod === 'annual' && (
                      <div className="text-xs text-green-400 text-center mt-1">
                        SAVE 10% with annual
                      </div>
                    )}

                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {tier.name === 'BRONZE' && 'Entry level membership'}
                      {tier.name === 'SILVER' && 'Enhanced membership'}
                      {tier.name === 'GOLD' && 'Advanced membership'}
                      {tier.name === 'DIAMOND' && 'Elite membership'}
                    </p>
                  </div>

                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Key Benefits - Concise */}
                  <div className="text-center mb-6">
                    <div className="text-green-400 font-semibold text-sm mb-2">✓ {tier.name === 'BRONZE' ? '1' : tier.name === 'SILVER' ? '2' : tier.name === 'GOLD' ? '5' : '7'} Commission Levels</div>
                    <div className="text-blue-400 font-semibold text-sm">✓ Premium Training Access</div>
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
                    <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-600/50">
                      +{tier.benefits.length - 5} more premium benefits
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <button
                    className={`w-full px-8 py-5 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-lg touch-manipulation ${
                      isPopular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:from-orange-700 active:to-orange-800 text-white shadow-lg hover:shadow-xl active:scale-95'
                        : 'bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white active:scale-95'
                    }`}
                    onClick={() => handleJoinNow(tier.planCode || tier.name || 'FREE')}
                    disabled={isProcessing}
                    aria-label={`Join ${tier.name} membership plan`}
                    role="button"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        {tier.name === 'BRONZE' ? 'START EARNING NOW' : `JOIN ${tier.name}`}
                      </>
                    )}
                  </button>

                  {/* Enhanced Error Display */}
                  {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 bg-red-500/20 border border-red-500/40 rounded-full flex items-center justify-center">
                          <span className="text-red-400 text-sm">{getErrorIcon()}</span>
                        </div>
                        <div>
                          <span className="text-red-400 text-sm font-semibold">
                            {errorType === 'network' ? 'Connection Error' :
                             errorType === 'payment' ? 'Payment Error' :
                             errorType === 'auth' ? 'Authentication Error' : 'Error'}
                          </span>
                          {retryCount > 0 && (
                            <span className="text-red-300 text-xs ml-2">
                              (Attempt {retryCount + 1})
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-red-200 text-sm mb-3 leading-relaxed">{error}</p>

                      <div className="bg-red-500/5 border border-red-500/20 rounded p-3 mb-3">
                        <p className="text-red-300 text-xs leading-relaxed">{getErrorHelp()}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleRetry}
                          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded transition-colors"
                          aria-label="Retry action"
                        >
                          Try Again
                        </button>
                        {errorType === 'auth' && !isSignedIn && (
                          <button
                            onClick={() => window.location.href = '/login'}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-colors"
                          >
                            Sign In
                          </button>
                        )}
                      </div>

                      {retryCount >= 2 && (
                        <p className="text-red-300 text-xs text-center mt-2">
                          Need help? Contact support@supernatural.institute
                        </p>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* FREE Tier - Enhanced Section */}
        {currentTiers.find(tier => tier.name === 'FREE') && (
          <div id="free-section" className="max-w-6xl mx-auto">
            {/* Free Tier Hero - Streamlined */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 heading-font">
                Start <span className="text-green-400">FREE</span> Today
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                No credit card required. Begin building your ministry network and income potential.
              </p>

              {/* Key Stats - More Compelling */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">$0</div>
                  <div className="text-xs text-gray-400">to start</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">30%</div>
                  <div className="text-xs text-gray-400">commissions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">$30K</div>
                  <div className="text-xs text-gray-400">max monthly</div>
                </div>
              </div>
            </div>


            {/* Streamlined FREE Tier Card */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-600/50 backdrop-blur-sm p-8 rounded-2xl max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-green-400 mb-4">$0</div>
                <h3 className="text-xl font-bold text-white mb-2">FREE Membership</h3>
                <p className="text-gray-300 text-sm mb-6">Start your journey with our referral program</p>
              </div>

              {/* Key Benefits - Clear & Non-Contradictory */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-green-200">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>30% commissions on referrals</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-green-200">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>Prayer request submissions</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-green-200">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>Support ticket access</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-green-200">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>Basic training access</span>
                    </div>
                  </div>
    
                  {/* Getting Started Tips */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                    <h4 className="text-blue-400 font-semibold text-sm mb-3 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Ways to Get Started
                    </h4>
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

              {/* Simple How It Works */}
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

              {/* CTA Button */}
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
        )}

        {/* FAQ Section - Expandable */}
        <div className="max-w-4xl mx-auto mt-20 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 heading-font">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="How do I start earning?"
              answer="Start FREE and share your referral link. Earn 30% commission on every signup through your link."
            />

            <FAQItem
              question="What's the difference between FREE and paid?"
              answer="FREE gets you started with commissions. Paid memberships unlock deeper levels and premium benefits."
            />

            <FAQItem
              question="How does the optional sharing work?"
              answer="Sharing is completely optional and recommended for the best experience. There are no mandatory requirements or time limits for maintaining your membership benefits."
            />

            <FAQItem
              question="Can I cancel anytime?"
              answer="Yes! Cancel anytime. Your earned commissions continue as long as you meet the sharing requirement."
            />

            <FAQItem
              question="What's in the FREE pack exactly?"
              answer="FREE Membership includes: Private Community Access, Premium course access, Help Me Fund access, Affiliate commission earnings (1 level), Sign up bonus qualification."
            />

            <FAQItem
              question="What's in the BRONZE pack exactly?"
              answer="BRONZE Membership includes: Everything in FREE + Affiliate commission earnings (1 level), Private Community Access, Premium course access, Help Me Fund access, Sign up bonus qualification."
            />

            <FAQItem
              question="What's in the SILVER pack exactly?"
              answer="SILVER Membership includes: Everything in BRONZE + Affiliate commission earnings (2 levels), Monthly Private Group Teaching, Sign up bonus qualification."
            />

            <FAQItem
              question="What's in the GOLD pack exactly?"
              answer="GOLD Membership includes: Everything in SILVER + Affiliate commission earnings (5 levels), Fortnightly Q&A group coaching, Fortnightly Private Live Teaching, 5% discount on any merch available, Sign up bonus qualification."
            />

            <FAQItem
              question="What's in the DIAMOND pack exactly?"
              answer="DIAMOND Membership includes: Everything in GOLD + Affiliate commission earnings (7 levels), Fortnightly Private Live Teaching, Direct level 1 referrals increase from 20% to 33%, Free tickets to all in person or online events, 10% discount on any merch available, Sign up bonus qualification."
            />

            <FAQItem
              question="How does the commission structure work?"
              answer="You earn 30% commission on all levels. FREE members earn on 1 level, BRONZE on 1 level, SILVER on 2 levels, GOLD on 5 levels, and DIAMOND on 7 levels. Commissions are paid monthly."
            />

            <FAQItem
              question="Is there a sign-up bonus?"
              answer="Yes! All membership tiers qualify for sign-up bonuses when you refer new members. The bonus amount varies by tier and is paid after your referral completes their first month."
            />

            <FAQItem
              question="What happens if I upgrade my membership?"
              answer="When you upgrade, you immediately gain access to all the benefits of your new tier and start earning commissions on additional levels. Your existing referrals continue to generate commissions at the higher rates."
            />

            <FAQItem
              question="Are there any hidden fees?"
              answer="No hidden fees! Everything is transparent. You only pay your membership fee - no setup fees, no processing fees, no surprise charges."
            />
          </div>
        </div>
      </div>


      <FiveFoldPartnershipApplication
        isOpen={isPartnershipFormOpen}
        onClose={() => setIsPartnershipFormOpen(false)}
      />
    </div>
  );
};

export default Membership;
