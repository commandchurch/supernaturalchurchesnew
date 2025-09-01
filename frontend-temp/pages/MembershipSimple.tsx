import React, { useState, useCallback, useMemo } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription
} from '../components/ui/enhanced-card';
import {
  EnhancedButton,
  RealTimeCounter,
  RealTimeBadge,
  FloatingActionButton
} from '../components/ui/enhanced-button';
import { useRealTime } from '../components/RealTimeProvider';
import {
  Heart,
  DollarSign,
  Users,
  Crown,
  Sparkles,
  Command,
  Flame,
  Star,
  Shield,
  CheckCircle,
  ArrowRight,
  Gift,
  Award,
  Wifi,
  WifiOff,
  MessageCircle
} from 'lucide-react';

const MembershipSimple: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'donate' | 'monthly' | 'tiers'>('tiers');
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const { data: realTimeData, isConnected } = useRealTime();

  // Memoized data to prevent unnecessary re-renders
  const membershipTiers = useMemo(() => [
    {
      id: 'seed',
      name: 'Seed Sower',
      price: 25,
      period: 'monthly',
      description: 'Basic access to courses and community',
      features: ['Access to basic courses', 'Community forum access', 'Monthly prayer updates'],
      color: 'blue',
      icon: Heart,
      members: 1250,
      popular: false
    },
    {
      id: 'harvest',
      name: 'Harvest Builder',
      price: 50,
      period: 'monthly',
      description: 'Full access to all courses and advanced features',
      features: ['All courses included', 'Advanced community access', 'Live Q&A sessions', 'Monthly mentorship calls'],
      color: 'purple',
      icon: Sparkles,
      members: 890,
      popular: true
    },
    {
      id: 'apostle',
      name: 'Apostle Ambassador',
      price: 100,
      period: 'monthly',
      description: 'VIP access with personal mentorship and networking',
      features: ['VIP course access', 'Personal mentorship', 'Network introductions', 'Exclusive events', 'Priority support'],
      color: 'gold',
      icon: Crown,
      members: 234,
      popular: false
    }
  ], []);

  const membershipStats = useMemo(() => ({
    totalMembers: 2374,
    monthlyRevenue: 89450,
    averageDonation: 195,
    newMembersThisMonth: 127
  }), []);

  const testimonials = useMemo(() => [
    {
      name: "Sarah Johnson",
      role: "Seed Sower Member",
      content: "The courses have transformed my prayer life completely!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Harvest Builder",
      content: "Best investment in my spiritual growth. The mentorship is incredible.",
      rating: 5
    },
    {
      name: "Grace Chen",
      role: "Apostle Ambassador",
      content: "This community has become my spiritual family.",
      rating: 5
    }
  ], []);

  // Optimized tab change handler
  const handleTabChange = useCallback((tabId: 'donate' | 'monthly' | 'tiers') => {
    setActiveTab(tabId);
  }, []);

  // Optimized tier selection
  const handleTierSelect = useCallback((tierId: string) => {
    setSelectedTier(tierId);
  }, []);

  // Optimized donation amount setting
  const handleDonationAmountChange = useCallback((amount: string) => {
    setDonationAmount(amount);
  }, []);

  // Optimized quick amount selection
  const handleQuickAmountSelect = useCallback((amount: number) => {
    setDonationAmount(amount.toString());
  }, []);

  // Optimized help action
  const handleHelpClick = useCallback(() => {
    alert('Our team will contact you to help choose the perfect membership! 🙏');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <RealTimeBadge
          count={isConnected ? 1 : 0}
          label={isConnected ? "LIVE" : "OFFLINE"}
          variant={isConnected ? "green" : "pink"}
          animate={true}
          className="backdrop-blur-sm"
        />
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-supernatural-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 animate-supernatural-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent animate-supernatural-pulse"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full animate-supernatural-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full animate-supernatural-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-pink-500/10 rounded-full animate-supernatural-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-32">
          <div className="text-center max-w-7xl mx-auto">
            {/* Enhanced Logo */}
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="relative">
                <div className="w-32 h-32 bg-supernatural-gradient rounded-2xl flex items-center justify-center shadow-supernatural-glow animate-supernatural-glow">
                  <Crown className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -inset-2 bg-supernatural-gradient rounded-2xl blur-lg opacity-50 animate-supernatural-pulse"></div>
              </div>
            </div>

            {/* Enhanced Main Title */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 tracking-tight leading-none animate-supernatural-fade-in">
              SUPERNATURAL<span className="block bg-supernatural-gradient bg-clip-text text-transparent animate-supernatural-shimmer">
              MEMBERSHIP
              </span>
            </h1>

            {/* Real-time Status Badge */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className="bg-supernatural-gradient text-white px-6 py-3 text-lg font-bold animate-supernatural-pulse">
                <Flame className="w-5 h-5 mr-2" />
                UNLOCK • GROW • TRANSFORM
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-400 animate-supernatural-pulse" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-400" />
                )}
                <span>{isConnected ? 'LIVE SYSTEM' : 'CONNECTING...'}</span>
              </div>
            </div>

            {/* Enhanced Description */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light animate-supernatural-slide-up">
              Join the <span className="text-white font-semibold bg-supernatural-gradient bg-clip-text text-transparent">Supernatural Institute</span> membership program and access world-class training, community, and supernatural resources to accelerate your spiritual growth.
            </p>

            {/* Real-time Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center animate-supernatural-fade-in">
                <RealTimeCounter
                  value={membershipStats.totalMembers}
                  label="Active Members"
                  className="text-3xl font-black text-blue-400"
                />
              </div>
              <div className="text-center animate-supernatural-fade-in" style={{ animationDelay: '0.2s' }}>
                <RealTimeCounter
                  value={membershipStats.monthlyRevenue}
                  prefix="$"
                  label="Monthly Support"
                  className="text-3xl font-black text-green-400"
                />
              </div>
              <div className="text-center animate-supernatural-fade-in" style={{ animationDelay: '0.4s' }}>
                <RealTimeCounter
                  value={membershipStats.newMembersThisMonth}
                  label="New This Month"
                  className="text-3xl font-black text-purple-400"
                />
              </div>
              <div className="text-center animate-supernatural-fade-in" style={{ animationDelay: '0.6s' }}>
                <RealTimeCounter
                  value={membershipStats.averageDonation}
                  prefix="$"
                  label="Avg. Gift"
                  className="text-3xl font-black text-pink-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="container mx-auto px-4 pb-8">
        <EnhancedCard variant="gradient" className="mb-12">
          <EnhancedCardContent className="p-2">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'tiers', label: 'Membership Tiers', icon: Crown },
                { id: 'donate', label: 'One-Time Donation', icon: Heart },
                { id: 'monthly', label: 'Monthly Giving', icon: DollarSign }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <EnhancedButton
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as any)}
                    variant={activeTab === tab.id ? "supernatural" : "glow"}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-semibold">{tab.label}</span>
                  </EnhancedButton>
                );
              })}
            </div>
          </EnhancedCardContent>
        </EnhancedCard>

        {/* Tab Content */}
        {activeTab === 'tiers' && (
          <div className="space-y-12">
            {/* Membership Tiers Grid */}
            <div>
              <h2 className="text-3xl font-black text-center mb-4 animate-supernatural-fade-in">
                Choose Your <span className="bg-supernatural-gradient bg-clip-text text-transparent">Membership Level</span>
              </h2>
              <p className="text-xl text-gray-300 text-center mb-16 animate-supernatural-slide-up">
                Select the tier that best fits your spiritual journey and calling
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {membershipTiers.map((tier, index) => {
                  const IconComponent = tier.icon;
                  return (
                    <EnhancedCard
                      key={tier.id}
                      variant={tier.popular ? "animated" : "gradient"}
                      className={`group hover:scale-105 transition-all duration-300 animate-supernatural-fade-in ${
                        tier.popular ? 'ring-4 ring-yellow-400 shadow-supernatural-glow-blue' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <EnhancedCardHeader className="text-center pb-6">
                        <div className="relative mb-6">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-supernatural-glow group-hover:scale-110 transition-transform ${
                            tier.id === selectedTier ? 'bg-supernatural-gradient' : 'bg-gray-800'
                          }`}>
                            <IconComponent className={`w-8 h-8 ${tier.id === selectedTier ? 'text-white' : `text-${tier.color}-400`}`} />
                          </div>
                          {tier.id === selectedTier && (
                            <div className="absolute -inset-1 bg-supernatural-gradient rounded-2xl blur-md opacity-50 animate-supernatural-pulse"></div>
                          )}
                        </div>

                        <EnhancedCardTitle className="text-xl mb-4">{tier.name}</EnhancedCardTitle>

                        <div className="mb-4">
                          <RealTimeCounter
                            value={tier.price}
                            prefix="$"
                            suffix={`/${tier.period}`}
                            label=""
                            className="text-3xl font-black text-white"
                          />
                        </div>

                        {tier.popular && (
                          <Badge className="bg-supernatural-gradient text-white font-bold px-4 py-2 animate-supernatural-pulse">
                            <Star className="w-4 h-4 mr-2" />
                            Most Popular
                          </Badge>
                        )}

                        <p className="text-gray-400 text-sm mt-4">{tier.description}</p>
                      </EnhancedCardHeader>

                      <EnhancedCardContent>
                        <div className="space-y-4 mb-8">
                          {tier.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-3 text-sm text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-400 animate-supernatural-bounce" style={{ animationDelay: `${featureIndex * 0.1}s` }} />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="text-center mb-4">
                          <span className="text-gray-400 text-sm">{tier.members.toLocaleString()} members enrolled</span>
                        </div>

                        <EnhancedButton
                          variant={tier.popular ? "supernatural" : "primary"}
                          className="w-full"
                          onClick={() => handleTierSelect(tier.id)}
                        >
                          {selectedTier === tier.id ? 'Selected' : 'Select Tier'}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </EnhancedButton>
                      </EnhancedCardContent>
                    </EnhancedCard>
                  );
                })}
              </div>
            </div>

            {/* Testimonials Section */}
            <EnhancedCard variant="gradient">
              <EnhancedCardHeader>
                <EnhancedCardTitle className="text-3xl text-center">What Our Members Say</EnhancedCardTitle>
                <EnhancedCardDescription className="text-center">Real stories from our supernatural community</EnhancedCardDescription>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="text-center p-6 bg-black/30 rounded-lg border border-gray-700">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          </div>
        )}

        {activeTab === 'donate' && (
          <div className="max-w-2xl mx-auto">
            <EnhancedCard variant="animated">
              <EnhancedCardHeader>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-supernatural-glow-blue group-hover:scale-110 transition-all duration-300">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl blur-md opacity-50"></div>
                  </div>
                  <div>
                    <EnhancedCardTitle className="text-2xl">Make a One-Time Donation</EnhancedCardTitle>
                    <EnhancedCardDescription>Your generous gift will directly support our ministry work</EnhancedCardDescription>
                  </div>
                </div>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Donation Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={donationAmount}
                        onChange={(e) => handleDonationAmountChange(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[25, 50, 100, 250].map((amount) => (
                      <EnhancedButton
                        key={amount}
                        variant="glow"
                        size="sm"
                        onClick={() => handleQuickAmountSelect(amount)}
                        className="w-full"
                      >
                        ${amount}
                      </EnhancedButton>
                    ))}
                  </div>

                  <EnhancedButton variant="supernatural" className="w-full py-6 text-lg">
                    <Gift className="mr-3 h-5 w-5" />
                    Complete Donation
                  </EnhancedButton>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          </div>
        )}

        {activeTab === 'monthly' && (
          <div className="max-w-2xl mx-auto">
            <EnhancedCard variant="gradient">
              <EnhancedCardHeader>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-supernatural-glow-blue group-hover:scale-110 transition-all duration-300">
                      <DollarSign className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl blur-md opacity-50"></div>
                  </div>
                  <div>
                    <EnhancedCardTitle className="text-2xl">Monthly Partnership</EnhancedCardTitle>
                    <EnhancedCardDescription>Become a monthly partner and provide consistent support</EnhancedCardDescription>
                  </div>
                </div>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[25, 50, 100].map((amount) => (
                      <div key={amount} className="p-4 bg-black/30 rounded-lg border border-gray-700 text-center">
                        <div className="text-2xl font-bold text-white mb-2">${amount}</div>
                        <div className="text-gray-400 text-sm">per month</div>
                        <EnhancedButton
                          variant="glow"
                          size="sm"
                          className="w-full mt-3"
                          onClick={() => handleQuickAmountSelect(amount)}
                        >
                          Select
                        </EnhancedButton>
                      </div>
                    ))}
                  </div>

                  <EnhancedButton variant="supernatural" className="w-full py-6 text-lg">
                    <Shield className="mr-3 h-5 w-5" />
                    Start Monthly Giving
                  </EnhancedButton>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon={<MessageCircle className="w-6 h-6" />}
        label="Get Help Choosing"
        onClick={handleHelpClick}
        variant="accent"
        position="bottom-right"
        animate={true}
      />
    </div>
  );
};

export default MembershipSimple;

