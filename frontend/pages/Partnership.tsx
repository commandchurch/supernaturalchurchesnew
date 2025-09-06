import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BookOpen, Check, Award, Handshake, TrendingUp, Globe, MessageCircle, Target, Heart, GraduationCap, Zap, Crown, Church, ArrowRight, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

import FiveFoldApplicationForm from '../components/FiveFoldApplicationForm';
import PartnershipCalculator from '../components/PartnershipCalculator';

const partnershipFeatures = [
  {
    icon: Handshake,
    title: "Senior Leadership Oversight & Development",
    description: "Gain unlimited access to our senior apostolic leadership team for guidance, mentorship, and support. Complete our Leadership Course and receive official ordination, equipping you to lead with biblical authority and wisdom.",
  },
  {
    icon: BookOpen,
    title: "Complete Ministry Training Tracks",
    description: "Receive role-based training designed for every key church position: Leadership, Deacons, Healing-the-Sick, Deliverance, and Evangelism. Learn to heal the sick, cast out demons, raise the dead, and hear from God with accuracy.",
  },
  {
    icon: Users,
    title: "Congregation Discipleship Integration",
    description: "Bring your entire congregation into our structured discipleship program, creating consistent spiritual growth and equipping every believer for supernatural ministry.",
  },
  {
    icon: Award,
    title: "Public Recognition & Growth Support",
    description: "Your church will be featured on our Find a Church page, with upcoming events promoted across our website and social platforms, helping you reach more people.",
  },
  {
    icon: TrendingUp,
    title: "7-Level Church Affiliate Network",
    description: "Participate in our 7-level commission structure (30% / 10% / 5% / 4% / 3% / 2% / 1%) designed for churches. Sponsorship is only available for churches, ensuring finances flow directly into the church body. This creates sustainable financial growth while advancing Kingdom impact together.",
  },
  {
    icon: Shield,
    title: "Accurate Teaching & Biblical Integrity",
    description: "Maintain the highest standards of doctrine through our oversight system, ensuring your church teaches God's Word with accuracy and demonstrates the supernatural power that confirms it.",
  },
];

export default function Partnership() {
  const [activeTab, setActiveTab] = useState('partner');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [members, setMembers] = useState(100);
  const [selectedTier, setSelectedTier] = useState('silver');
  const [billingType, setBillingType] = useState('monthly');
  const [level2Members, setLevel2Members] = useState(50);
  const [level3Members, setLevel3Members] = useState(25);
  
  // Partnership Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [showLegalDocs, setShowLegalDocs] = useState(false);
  
  // Application Form Data
  const [applicationData, setApplicationData] = useState({
    // Section 1: Core Beliefs & Commitment
    willingToChange: '',
    willingToFeedback: '',
    believeJesus: '',
    
    // Section 2: Church Information
    churchName: '',
    churchAddress: '',
    churchCity: '',
    churchState: '',
    churchPostcode: '',
    pastorName: '',
    isFounder: '',
    churchSize: '',
    hasOrdination: '',
    ordinationDetails: '',
    
    // Section 3: Contact & Agreement
    email: '',
    phone: '',
    infoAccurate: false
  });

  // Mock partners data
  const partnersData: {
    partners: Array<{
      id: string;
      name: string;
      location: string;
      members: number;
      joinedDate: string;
      tier: string;
      websiteUrl?: string;
      logoUrl?: string;
    }>
  } = {
    partners: [
      {
        id: '1',
        name: 'Grace Community Church',
        location: 'Springfield, IL',
        members: 150,
        joinedDate: '2024-01-15',
        tier: 'Gold'
      },
      {
        id: '2',
        name: 'Faith Baptist Church',
        location: 'Riverside, CA',
        members: 200,
        joinedDate: '2024-02-20',
        tier: 'Diamond'
      },
      {
        id: '3',
        name: 'Hope Ministries',
        location: 'Austin, TX',
        members: 80,
        joinedDate: '2024-03-10',
        tier: 'Silver'
      }
    ]
  };

  // Membership tier prices (AUD/month)
  const tierPrices = {
    silver: 33,
    gold: 149,
    diamond: 499
  };

  // Church partnership pricing (AUD/month)
  const churchPartnershipPrice = 99;

  // Calculate earnings with 7-level commission structure
  const basePrice = tierPrices[selectedTier as keyof typeof tierPrices];
  const adjustedPrice = billingType === 'annual' ? basePrice * 0.9 : basePrice; // 10% annual discount

  // Level 1: Direct Referrals (30%)
  const level1Commission = adjustedPrice * 0.3;
  const level1Earnings = members * level1Commission;

  // Level 2: Second Generation (10%)
  const level2Commission = adjustedPrice * 0.1;
  const level2Earnings = level2Members * level2Commission;

  // Level 3: Third Generation (5%)
  const level3Commission = adjustedPrice * 0.05;
  const level3Earnings = level3Members * level3Commission;

  // Level 4: Fourth Generation (4%)
  const level4Commission = adjustedPrice * 0.04;
  const level4Earnings = 0; // No input for level 4 yet

  // Level 5: Fifth Generation (3%)
  const level5Commission = adjustedPrice * 0.03;
  const level5Earnings = 0; // No input for level 5 yet

  // Level 6: Sixth Generation (2%)
  const level6Commission = adjustedPrice * 0.02;
  const level6Earnings = 0; // No input for level 6 yet

  // Level 7: Seventh Generation (1%)
  const level7Commission = adjustedPrice * 0.01;
  const level7Earnings = 0; // No input for level 7 yet

  const monthlyEarnings = level1Earnings + level2Earnings + level3Earnings + level4Earnings + level5Earnings + level6Earnings + level7Earnings;
  const annualEarnings = monthlyEarnings * 12;



  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Church Partnership", item: `${siteUrl}/partnership` }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="Partner Your Church with Supernatural Institute – Bring Dunamis Power to Australia"
        description="Partner your church with Supernatural Institute. Bring supernatural power, more finances, and souls with hearts after God. Restore correct doctrine with Dunamis power. $99 AUD/month."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          Apostolic Supernatural Churches Partnership
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
          Comprehensive supernatural ministry training and church partnership program. Providing ordination, guaranteed healing protocols, and apostolic oversight for safe supernatural churches.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/5 border border-white/10 p-2 rounded-xl">
          <div className="flex gap-2">
            {[
              { id: 'training', label: 'TRAINING', icon: GraduationCap },
              { id: 'membership', label: 'MEMBERSHIP', icon: Users },
              { id: 'partner', label: 'PARTNER', icon: Handshake }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'training' && (
        <section className="mb-12 sm:mb-16">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font text-center">
              Supernatural Institute of Ministry
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base text-center max-w-4xl mx-auto">
              Comprehensive supernatural ministry training through our partner organization, Supernatural Institute of Ministry. Learn to walk in dunamis power, heal the sick, cast out demons, and demonstrate Kingdom authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 border border-gray-700 p-6 text-center">
              <GraduationCap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Healing the Sick</h3>
              <p className="text-gray-300 text-sm mb-4">Learn proven protocols for supernatural healing ministry</p>
              <Link
                to="https://supernatural.institute/training"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                Start Training →
              </Link>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-6 text-center">
              <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Deliverance Ministry</h3>
              <p className="text-gray-300 text-sm mb-4">Master deliverance protocols and spiritual warfare</p>
              <Link
                to="https://supernatural.institute/training"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                Start Training →
              </Link>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-6 text-center">
              <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Apostolic Ministry</h3>
              <p className="text-gray-300 text-sm mb-4">Develop five-fold ministry gifts and Kingdom authority</p>
              <Link
                to="https://supernatural.institute/training"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                Start Training →
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-4">Access Full Training Platform</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Visit our dedicated training platform for complete courses on healing, deliverance, and supernatural ministry. Get certified and equipped for Kingdom ministry.
            </p>
            <a
              href="https://supernatural.institute/training"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-semibold uppercase tracking-wide text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Start Training at Supernatural Institute →
            </a>
          </div>
        </section>
      )}

      {activeTab === 'membership' && (
        <section className="mb-12 sm:mb-16">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font text-center">
              Membership & Commission Program
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base text-center max-w-4xl mx-auto">
              This membership is for everyday believers in Jesus, not for churches. When churches partner with us, they can share their affiliate link with their congregation, helping them receive sound teaching that produces true dunamis power in their lives and the lives of others.
              <br /><br />
              This program equips you to share the gospel with boldness and walk in supernatural power. You can also earn commissions when the people you witness to choose to study with the Supernatural Institute, all while building Kingdom relationships.
              <br /><br />
              When someone gives their life to Christ, we provide a sign-up form and send them helpful information. Every new believer receives free discipleship training. Once they've completed that, they can choose to upgrade if they want to go deeper into ministry training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 p-6 text-center">
              <div className="text-2xl font-black text-green-400 mb-2">$0/month</div>
              <h3 className="text-lg font-bold text-white mb-3">FREE Membership</h3>
              <p className="text-gray-300 text-sm mb-4">Start your journey with basic access and 30% commissions</p>
              <Link
                to="/membership"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                Start FREE
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 p-6 text-center">
              <div className="text-2xl font-black text-blue-400 mb-2">$33/month</div>
              <h3 className="text-lg font-bold text-white mb-3">Silver Membership</h3>
              <p className="text-gray-300 text-sm mb-4">Premium access with 2-level commission structure</p>
              <Link
                to="/membership"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                Join Silver
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 p-6 text-center">
              <div className="text-2xl font-black text-orange-400 mb-2">$149/month</div>
              <h3 className="text-lg font-bold text-white mb-3">Gold Membership</h3>
              <p className="text-gray-300 text-sm mb-4">Premium access with 5-level commission structure</p>
              <Link
                to="/membership"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                Join Gold
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 p-6 text-center">
              <div className="text-2xl font-black text-purple-400 mb-2">$499/month</div>
              <h3 className="text-lg font-bold text-white mb-3">Diamond Membership</h3>
              <p className="text-gray-300 text-sm mb-4">Premium access with 7-level commission structure</p>
              <Link
                to="/membership"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                Join Diamond
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 p-8 text-center">
            <a
              href="https://supernatural.institute/compensation-plan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 font-semibold uppercase tracking-wide text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              VIEW DETAILED COMPENSATION PLAN →
            </a>
          </div>
        </section>
      )}

      {activeTab === 'partner' && (
        <>
          <section className="mb-12 sm:mb-16">
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font text-center">
                Strategic Partnership for Kingdom Multiplication
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base text-center max-w-4xl mx-auto">
                Transform your church with God's supernatural power.
                We provide senior leadership oversight, comprehensive ministry training, and apostolic empowerment to help you faithfully deliver God's Word to your congregation. Scripture teaches that teachers are held to a higher standard, so we will help correct doctrine where needed and guide you to work closely with Jesus in leading your church.

                You will also receive training and resources to support you in turning from sin and drawing closer to God, which can be done privately between you and Him. We recognise that when a church is not walking in power, it often means the leaders or members are facing personal challenges. That's okay—we are all on a journey. Our role is to help you grow in faith and confidence toward God. Remember, all things are possible for those who believe, not just some things.
              </p>
            </div>
          </section>

      <section className="mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-4 lg:mb-6 heading-font">
              How Partnership Works
            </h2>
            <div className="text-gray-300 leading-relaxed mb-4 lg:mb-6 text-sm sm:text-base space-y-4">
              <div>
                <strong className="text-white">Step 1:</strong> Apply for partnership at no cost. Once your application is reviewed and approved, you'll be officially welcomed into the network.
              </div>
              <div>
                <strong className="text-white">Step 2:</strong> Make a one-time payment of $99 to activate your partnership. We'll email you a secure payment link along with an invoice. This unlocks access to your online training portal. Your leadership team will then complete our Supernatural Leadership Short Courses and receive recognised ordination certificates.
              </div>
              <div>
                <strong className="text-white">Step 3:</strong> Access in-depth leadership training, discipleship programs for your congregation, and ongoing mentorship. You'll also have the opportunity to earn commissions by helping churches and individuals enrol in Supernatural Institute training.
              </div>
              <div>
                <strong className="text-white">Step 4:</strong> Build sustainable ministry finances through our affiliate network and receive ongoing support whenever it's needed.
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-4 lg:p-6 text-center flex flex-col justify-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white heading-font mb-2">
              ${churchPartnershipPrice}
            </div>
            <div className="text-gray-400 mb-3 lg:mb-4 text-sm">AUD / month</div>
            <button
              onClick={() => setShowApplicationModal(true)}
              className="w-full bg-orange-500 text-white hover:bg-orange-600 px-4 lg:px-6 py-2 lg:py-3 font-semibold uppercase tracking-wide text-xs lg:text-sm text-center block"
            >
              BECOME A PARTNER
            </button>
            <p className="text-xs text-gray-500 mt-2 lg:mt-3">
              Free to apply • Cancel anytime • Leadership Course required
            </p>
            <p className="text-xs text-gray-400 mt-1 lg:mt-2">
              Includes senior leadership oversight, complete ministry training, congregation discipleship, and growth support
            </p>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 heading-font text-center">
          Partnership Earnings Calculator
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
          Discover how partnership can provide financial freedom for your ministry. Calculate potential monthly earnings while helping your congregation grow spiritually and advance God's Kingdom with sustainable ministry support.
        </p>

        <PartnershipCalculator />
      </section>

      {/* Affiliate Link & Templates Section */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 heading-font text-center">
          Easy Ministry Integration
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
          Once approved as a partner, you'll receive your custom affiliate link and ready-to-use templates. Making it simple to integrate with your existing ministry operations.
        </p>

        <div className="bg-white/5 border border-white/10 p-6 lg:p-8 max-w-6xl mx-auto rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Affiliate Link Section */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 p-6 rounded-xl hover:bg-blue-500/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Your Affiliate Link</h3>
              </div>
              <div className="bg-gray-900/80 border border-gray-600 p-4 rounded-lg mb-4">
                <code className="text-green-400 text-sm break-all font-mono">
                  https://supernatural.institute/join?ref=YURCHURCH
                </code>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Share this personalized link via SMS, email, or social media. All signups through your link automatically credit to your affiliate account.
              </p>
            </div>

            {/* Congregation Discounts Section */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 p-6 rounded-xl hover:bg-green-500/15 transition-all duration-300 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Congregation Discounts</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                As a partnered church, you'll receive a unique Stripe promo code that you can share with your congregation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/60 border border-gray-600 p-4 rounded-lg text-center hover:bg-gray-800/80 transition-colors">
                  <div className="text-2xl mb-2">🏷️</div>
                  <p className="text-gray-300 text-sm font-medium mb-1">20% Off First Month</p>
                  <p className="text-gray-400 text-xs">For congregation members</p>
                </div>
                <div className="bg-gray-800/60 border border-gray-600 p-4 rounded-lg text-center hover:bg-gray-800/80 transition-colors">
                  <div className="text-2xl mb-2">🤝</div>
                  <p className="text-gray-300 text-sm font-medium mb-1">Auto Tracking</p>
                  <p className="text-gray-400 text-xs">Commission & growth reporting</p>
                </div>
                <div className="bg-gray-800/60 border border-gray-600 p-4 rounded-lg text-center hover:bg-gray-800/80 transition-colors">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-gray-300 text-sm font-medium mb-1">Simple & Secure</p>
                  <p className="text-gray-400 text-xs">No extra systems required</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 p-4 rounded-lg">
                <p className="text-green-200 text-sm italic text-center">
                  This makes it easy for your congregation to get started with supernatural discipleship training while also supporting your church financially.
                </p>
              </div>
            </div>
            {/* Ready-to-Use Templates Section */}
            <div className="bg-gradient-to-br from-purple-500/10 to-indigo-600/10 border border-purple-500/20 p-6 rounded-xl hover:bg-purple-500/15 transition-all duration-300 lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Ready-to-Use Templates</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/60 border border-gray-600 p-4 rounded-lg hover:bg-gray-800/80 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <span className="text-blue-400 text-sm">📧</span>
                    </div>
                    <h4 className="text-white font-semibold text-sm">Email Template</h4>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Professional email template ready to send to your congregation with your affiliate link included.
                  </p>
                </div>

                <div className="bg-gray-800/60 border border-gray-600 p-4 rounded-lg hover:bg-gray-800/80 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <span className="text-green-400 text-sm">📱</span>
                    </div>
                    <h4 className="text-white font-semibold text-sm">SMS Template</h4>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Short, compelling SMS message template perfect for quick outreach to your staff and members.
                  </p>
                </div>

                <div className="bg-gray-800/60 border border-gray-600 p-4 rounded-lg hover:bg-gray-800/80 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                      <span className="text-orange-400 text-sm">📋</span>
                    </div>
                    <h4 className="text-white font-semibold text-sm">Announcement Template</h4>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Church bulletin and announcement templates for seamless integration into your services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Benefits */}
          <div className="mt-6 lg:mt-8 bg-blue-500/20 border border-blue-500/30 p-4 lg:p-6 rounded">
            <h3 className="text-white font-bold mb-3 text-center text-lg lg:text-xl">Complete Integration Support</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold text-sm">Staff Training</h4>
                <p className="text-blue-100 text-xs">Leadership course included for your ministry team</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold text-sm">Easy Tracking</h4>
                <p className="text-blue-100 text-xs">Real-time dashboard showing all referrals and earnings</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold text-sm">Ongoing Support</h4>
                <p className="text-blue-100 text-xs">Apostolic oversight and ministry growth guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 heading-font text-center">
          Partnership Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {partnershipFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-white/5 border border-white/10 p-4 lg:p-6">
                <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400 mb-3 lg:mb-4" />
                <h3 className="text-base lg:text-lg font-bold text-white mb-2 heading-font">{feature.title}</h3>
                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>



      <section className="bg-gray-800/50 border border-gray-700 p-4 lg:p-8 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 lg:mb-4 heading-font">
          Ready to Transform Your Ministry?
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4 lg:mb-6 max-w-3xl mx-auto text-sm lg:text-base px-2">
          Join our network of Kingdom-minded churches that teach accurately, lead powerfully, and demonstrate supernatural signs. Together, we're raising up a generation of leaders who advance the Gospel with integrity and divine power.
        </p>
        <button
          onClick={() => setShowApplicationModal(true)}
          className="inline-block bg-orange-500 text-white hover:bg-orange-600 px-6 lg:px-8 py-2 lg:py-3 font-semibold uppercase tracking-wide text-xs lg:text-sm mb-3 lg:mb-4"
        >
          BECOME A PARTNER
        </button>
        <p className="text-xs text-gray-500 max-w-3xl mx-auto px-2">
          Ordination certificates provided upon required training completion. Ministries not aligned with our teaching standards may have partnership revoked. Terms and Conditions apply.
        </p>
      </section>
        </>
      )}

      <FiveFoldApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Partnership Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white heading-font">Partnership Application</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-400'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-12 h-1 mx-2 ${
                          currentStep > step ? 'bg-orange-500' : 'bg-gray-700'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Intro Section */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-300 mb-4">
                  Thank you for your interest in partnering with Supernatural Churches. Please complete the form below truthfully. This application is for senior pastors and church leaders.
                </p>
                <p className="text-gray-300 mb-4">
                  By submitting, you acknowledge and agree to our Terms of Partnership and all related policies.
                </p>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="legal-accept"
                    checked={legalAccepted}
                    onChange={(e) => setLegalAccepted(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="legal-accept" className="text-sm text-gray-300">
                    I have read and agree to the{' '}
                    <button
                      onClick={() => setShowLegalDocs(!showLegalDocs)}
                      className="text-orange-500 hover:text-orange-400 underline flex items-center gap-1"
                    >
                      Terms of Partnership and all associated policies
                      {showLegalDocs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>{' '}
                    (Privacy, Refund, Donation Terms, Church Partnership Agreement).
                  </label>
                </div>
              </div>

              {/* Legal Documents Accordion */}
              {showLegalDocs && (
                <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Legal Documents</h3>
                    <button
                      onClick={() => setShowLegalDocs(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4 text-sm text-gray-300">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Terms of Partnership</h4>
                      <p>By becoming a partner, you agree to uphold biblical standards, complete required training, and maintain doctrinal integrity. Partnership may be revoked for misrepresentation or failure to meet standards.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Privacy Policy</h4>
                      <p>Your personal information is protected and used only for partnership administration and communication. We do not share your data with third parties without consent.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Refund Policy</h4>
                      <p>Refunds are available within 30 days of activation payment. Training materials are non-refundable once accessed. Partnership fees are non-refundable after 90 days.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Church Partnership Agreement</h4>
                      <p>This agreement outlines the mutual commitments between Supernatural Churches Limited and your ministry, including oversight, training, and commission structures.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Steps */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Step 1: Core Beliefs & Commitment</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Are you willing to change if you are guaranteed results that heal the sick?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingToChange"
                            value="yes"
                            checked={applicationData.willingToChange === 'yes'}
                            onChange={(e) => setApplicationData({...applicationData, willingToChange: e.target.value})}
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingToChange"
                            value="no"
                            checked={applicationData.willingToChange === 'no'}
                            onChange={(e) => setApplicationData({...applicationData, willingToChange: e.target.value})}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Are you willing to undergo feedback and sharpening of doctrine without taking offense?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingToFeedback"
                            value="yes"
                            checked={applicationData.willingToFeedback === 'yes'}
                            onChange={(e) => setApplicationData({...applicationData, willingToFeedback: e.target.value})}
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingToFeedback"
                            value="no"
                            checked={applicationData.willingToFeedback === 'no'}
                            onChange={(e) => setApplicationData({...applicationData, willingToFeedback: e.target.value})}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Do you believe Jesus Christ came in the flesh, died, and rose on the third day?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="believeJesus"
                            value="yes"
                            checked={applicationData.believeJesus === 'yes'}
                            onChange={(e) => setApplicationData({...applicationData, believeJesus: e.target.value})}
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="believeJesus"
                            value="no"
                            checked={applicationData.believeJesus === 'no'}
                            onChange={(e) => setApplicationData({...applicationData, believeJesus: e.target.value})}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Step 2: Church Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Church Name</label>
                      <input
                        type="text"
                        value={applicationData.churchName}
                        onChange={(e) => setApplicationData({...applicationData, churchName: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Pastor/Senior Leader Name</label>
                      <input
                        type="text"
                        value={applicationData.pastorName}
                        onChange={(e) => setApplicationData({...applicationData, pastorName: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Street Address</label>
                      <input
                        type="text"
                        value={applicationData.churchAddress}
                        onChange={(e) => setApplicationData({...applicationData, churchAddress: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        value={applicationData.churchCity}
                        onChange={(e) => setApplicationData({...applicationData, churchCity: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Postcode</label>
                      <input
                        type="text"
                        value={applicationData.churchPostcode}
                        onChange={(e) => setApplicationData({...applicationData, churchPostcode: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                      <select
                        value={applicationData.churchState}
                        onChange={(e) => setApplicationData({...applicationData, churchState: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select State</option>
                        <option value="NSW">New South Wales</option>
                        <option value="VIC">Victoria</option>
                        <option value="QLD">Queensland</option>
                        <option value="WA">Western Australia</option>
                        <option value="SA">South Australia</option>
                        <option value="TAS">Tasmania</option>
                        <option value="NT">Northern Territory</option>
                        <option value="ACT">Australian Capital Territory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Church Size</label>
                      <select
                        value={applicationData.churchSize}
                        onChange={(e) => setApplicationData({...applicationData, churchSize: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select Size</option>
                        <option value="0-50">0–50 members</option>
                        <option value="50-100">50–100 members</option>
                        <option value="100-250">100–250 members</option>
                        <option value="250+">250+ members</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Are you the founder of the ministry?
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isFounder"
                          value="yes"
                          checked={applicationData.isFounder === 'yes'}
                          onChange={(e) => setApplicationData({...applicationData, isFounder: e.target.value})}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="isFounder"
                          value="no"
                          checked={applicationData.isFounder === 'no'}
                          onChange={(e) => setApplicationData({...applicationData, isFounder: e.target.value})}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Do you currently have ordination or covering?
                    </label>
                    <div className="flex space-x-4 mb-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasOrdination"
                          value="yes"
                          checked={applicationData.hasOrdination === 'yes'}
                          onChange={(e) => setApplicationData({...applicationData, hasOrdination: e.target.value})}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasOrdination"
                          value="no"
                          checked={applicationData.hasOrdination === 'no'}
                          onChange={(e) => setApplicationData({...applicationData, hasOrdination: e.target.value})}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {applicationData.hasOrdination === 'yes' && (
                      <textarea
                        placeholder="Please explain your current ordination or covering..."
                        value={applicationData.ordinationDetails}
                        onChange={(e) => setApplicationData({...applicationData, ordinationDetails: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        rows={3}
                      />
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Step 3: Contact & Agreement</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Primary Contact Email *</label>
                      <input
                        type="email"
                        value={applicationData.email}
                        onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Best Phone Number *</label>
                      <input
                        type="tel"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="info-accurate"
                      checked={applicationData.infoAccurate}
                      onChange={(e) => setApplicationData({...applicationData, infoAccurate: e.target.checked})}
                      className="mt-1"
                    />
                    <label htmlFor="info-accurate" className="text-sm text-gray-300">
                      I affirm that the information provided is true, and I understand partnership may be revoked if misrepresentation occurs.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-2 bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {currentStep < 3 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2 bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // Handle form submission
                      console.log('Application submitted:', applicationData);
                      setShowApplicationModal(false);
                      // Redirect to thank you page or show success message
                      window.location.href = '/partnership/thank-you';
                    }}
                    disabled={!legalAccepted || !applicationData.infoAccurate}
                    className="px-6 py-2 bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    Submit Partnership Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

