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
  
  // Mock subscription plans
  const subscriptionPlans = [
    { code: 'FREE', name: 'Free Membership', price: 0, description: 'Basic access' },
    { code: 'BRONZE', name: 'Bronze Membership', price: 19, description: 'Standard membership' },
    { code: 'SILVER', name: 'Silver Membership', price: 33, description: 'Premium membership' },
    { code: 'GOLD', name: 'Gold Membership', price: 149, description: 'Ultimate membership' }
  ];

  const createCheckoutSession = async (params: any) => {
    // Mock checkout session creation
    alert('Redirecting to Stripe checkout...');
    // In real implementation, this would redirect to Stripe
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
          features: encorePlan.description ? [encorePlan.description] : tier.features,
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
  const getPrice = (basePrice: number) => {
    if (billingPeriod === 'annual') {
      return Math.round(basePrice * 12 * 0.9); // Annual price with 10% discount
    }
    return basePrice;
  };

  const getOriginalPrice = (basePrice: number) => {
    if (billingPeriod === 'annual') {
      return basePrice * 12; // Original annual price
    }
    return null;
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-supernatural-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black mb-4 bg-supernatural-gradient bg-clip-text text-transparent">
            SUPERNATURAL INSTITUTE
          </h1>
          <p className="text-gray-300 mb-6">
            Join our professional supernatural ministry training platform and unlock your divine calling.
          </p>
          <Link to="/give">
            <EnhancedButton variant="supernatural" className="px-8 py-4">
              Begin Your Training
            </EnhancedButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
            MEMBERSHIP PLANS
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Choose a plan to unlock premium courses, community access, and training. Transform lives through miraculous ministry.
          </p>
        </div>

        <div className="text-center mb-12 sm:mb-16" id="plans">
          
          <div className="flex justify-center mb-8">
            <MembershipToggle
              membershipType={membershipType}
              onToggle={setMembershipType}
            />
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-1 flex">
              <button 
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                  billingPeriod === 'monthly' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                28 DAYS
              </button>
              <span className="px-2 py-2 text-gray-400 text-sm font-semibold flex items-center">/</span>
              <button 
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                  billingPeriod === 'annual' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
                onClick={() => setBillingPeriod('annual')}
              >
                ANNUAL (10% OFF)
              </button>
            </div>
          </div>
          

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-16">
          {currentTiers.map((tier, index) => {
            const Icon = tier.icon;
            
            // Special handling for church partnership
            if (membershipType === 'church' && tier.name === 'SUPERNATURAL CHURCHES PARTNERSHIP') {
              return (
                <div
                  key={tier.name}
                  className={`group relative bg-white/5 border border-orange-500/30 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 p-6 sm:p-8 flex flex-col col-span-full lg:col-span-5 ${
                    selectedTier === tier.name ? 'ring-2 ring-orange-500/50' : ''
                  }`}
                  onClick={() => setSelectedTier(tier.name)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Featured badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider">
                      FEATURED PARTNERSHIP
                    </span>
                  </div>

                  <div className="text-center mb-6">
                    <div className="h-16 w-16 bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mx-auto mb-4 rounded">
                      <Icon className="h-8 w-8 text-orange-400" />
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 heading-font tracking-wide">
                      {tier.name}
                    </h3>
                    
                    {'tagline' in tier && tier.tagline && (
                      <p className="text-orange-400 font-bold text-sm mb-2">{tier.tagline}</p>
                    )}
                    
                    <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                      <div className="flex items-center justify-center gap-2">
                        ${getPrice(tier.price)} AUD
                        {getOriginalPrice(tier.price) && (
                          <span className="text-xl text-gray-500 line-through">
                            ${getOriginalPrice(tier.price)}
                          </span>
                        )}
                      </div>
                      <span className="text-lg text-gray-400">
                        /{billingPeriod === 'annual' ? 'year' : 'month'}
                      </span>
                      {billingPeriod === 'annual' && (
                        <div className="text-sm text-green-400 font-semibold">
                          Save 10% annually
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {tier.description}
                    </p>
                    
                    {'subtitle' in tier && tier.subtitle && (
                      <p className="text-gray-400 text-xs leading-relaxed mb-6 max-w-3xl mx-auto">
                        {tier.subtitle}
                      </p>
                    )}

                    {'powerStatement' in tier && tier.powerStatement && (
                      <div className="bg-purple-500/20 border border-purple-500/30 p-4 rounded mb-6">
                        <p className="text-purple-200 text-sm leading-relaxed">{tier.powerStatement}</p>
                      </div>
                    )}
                  </div>

                  {/* Benefits in 3 columns */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-sm">CORE TRAINING</h4>
                      {tier.benefits.slice(0, 7).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-sm">LEADERSHIP ACCESS</h4>
                      {tier.benefits.slice(7, 14).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-sm">POWER & SUPPORT</h4>
                      {tier.benefits.slice(14).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-auto space-y-6">
                    {'requirements' in tier && tier.requirements && (
                      <p className="text-gray-400 text-sm text-center">{tier.requirements}</p>
                    )}
                    
                    {/* Partnership Call to Action */}
                    <div className="bg-gray-800/50 border border-gray-600 p-6 rounded text-center space-y-4">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="h-8 w-8 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded">
                          <span className="text-blue-400 text-sm">⛪</span>
                        </div>
                        <h4 className="text-white font-bold text-lg">Partner Your Church</h4>
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
                        Join our Supernatural Churches Apostolic Partnership and bring supernatural power, healing protocols, and doctrinal clarity to your congregation.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <Link
                          to="/about#church-partnership"
                          className="px-8 py-3 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300 text-sm tracking-wide text-center"
                        >
                          LEARN MORE
                        </Link>
                        <button 
                          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 text-sm tracking-wide"
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
            
            // Regular tier handling for individual plans and simpler church tiers
            return (
              <div
                key={tier.name}
                className={`group relative bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 p-6 sm:p-8 flex flex-col ${
                  selectedTier === tier.name ? 'ring-2 ring-white/50' : ''
                }`}
                onClick={() => setSelectedTier(tier.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white/10 border border-white/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3 heading-font tracking-wide">
                  {tier.name.toUpperCase()}
                </h3>
                <div className="text-2xl sm:text-3xl font-black text-white mb-3">
                  <div className="flex items-center gap-2">
                    ${getPrice(tier.price)}
                    {getOriginalPrice(tier.price) && (
                      <span className="text-lg text-gray-500 line-through">
                        ${getOriginalPrice(tier.price)}
                      </span>
                    )}
                  </div>
                  <span className="text-lg text-gray-400">
                    /{billingPeriod === 'annual' ? 'year' : '28 days'}
                  </span>
                  {billingPeriod === 'annual' && (
                    <div className="text-sm text-green-400 font-semibold">
                      Save 10% annually
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  {tier.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="flex-1">{benefit}</span>
                    </div>
                  ))}
                  
                  {/* Show limitations for FREE plan */}
                  {tier.name === 'FREE' && 'limitations' in tier && tier.limitations && (
                    <>
                      <div className="border-t border-gray-600 pt-3 mt-3">
                        <h4 className="text-gray-400 text-xs font-semibold uppercase mb-2">Limitations</h4>
                        {tier.limitations.map((limitation: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 text-sm text-red-300">
                            <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="flex-1">{limitation}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Upgrade Offer */}
                      {'upgradeOffer' in tier && tier.upgradeOffer && (
                        <div className="bg-blue-500/20 border border-blue-500/30 p-3 rounded mt-3">
                          <p className="text-blue-200 text-xs font-semibold">🎯 UPGRADE OFFER</p>
                          <p className="text-blue-100 text-xs mt-1">{tier.upgradeOffer}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <div className="mt-auto">
                  <button 
                    className={`w-full px-4 py-3 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 ${
                      tier.name === 'FREE' 
                        ? 'bg-gray-600 text-white hover:bg-gray-500' 
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                    onClick={() => handleJoinNow(tier.planCode || tier.name)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      tier.name === 'FREE' ? 'GET STARTED FREE' : 'JOIN NOW'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
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
