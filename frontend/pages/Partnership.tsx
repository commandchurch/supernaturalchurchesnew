import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BookOpen, Check, Award, Handshake, TrendingUp, Globe, MessageCircle, Target, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

import FiveFoldApplicationForm from '../components/FiveFoldApplicationForm';

const partnershipFeatures = [
  {
    icon: Handshake,
    title: "Senior Leadership Oversight & Development",
    description: "Receive anytime Q&A access to our senior leadership team and comprehensive Leadership Course with ordination upon completion. We take seriously that 'not many should become teachers, knowing we will receive a stricter judgment' (James 3:1).",
  },
  {
    icon: BookOpen,
    title: "Complete Ministry Training Tracks",
    description: "Role-based training for every church position: Leadership, Deacons, Healing-the-Sick, Deliverance, and Evangelism. Learn how to heal the sick, cast out demons, raise the dead, and receive accurately from God.",
  },
  {
    icon: Users,
    title: "Congregation Discipleship Integration",
    description: "Onboard your entire congregation into our proven discipleship program, creating unified spiritual growth and supernatural ministry training for every member.",
  },
  {
    icon: Award,
    title: "Public Recognition & Growth Support",
    description: "Your church receives prominent recognition on our Ministry Partners page, plus Help Me Fund access for churches in times of need, demonstrating our commitment to your success.",
  },
  {
    icon: TrendingUp,
    title: "7-Level Church Affiliate Network",
    description: "Access our proven 7-level commission structure (20%/10%/5%/3%/2%/1%/1%) with sponsorship options for member onboarding, creating sustainable ministry multiplication and financial support.",
  },
  {
    icon: Shield,
    title: "Accurate Teaching & Biblical Integrity",
    description: "Ensure your ministry teaches with precision and power through our oversight system, maintaining the highest standards of biblical accuracy while demonstrating supernatural signs that follow.",
  },
];

export default function Partnership() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [members, setMembers] = useState(100);
  const [selectedTier, setSelectedTier] = useState('bronze');
  const [billingType, setBillingType] = useState('monthly');
  const [level2Members, setLevel2Members] = useState(50);
  const [level3Members, setLevel3Members] = useState(25);
  
  // Mock partners data
  const partnersData = {
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
    bronze: 19,
    silver: 33,
    gold: 149,
    diamond: 499
  };

  // Calculate earnings with 3-level commission structure
  const basePrice = tierPrices[selectedTier as keyof typeof tierPrices];
  const adjustedPrice = billingType === 'annual' ? basePrice * 0.9 : basePrice; // 10% annual discount
  
  // Level 1: Direct Referrals (20%)
  const level1Commission = adjustedPrice * 0.2;
  const level1Earnings = members * level1Commission;
  
  // Level 2: Second Generation (10%)
  const level2Commission = adjustedPrice * 0.1;
  const level2Earnings = level2Members * level2Commission;
  
  // Level 3: Third Generation (5%)
  const level3Commission = adjustedPrice * 0.05;
  const level3Earnings = level3Members * level3Commission;
  
  const monthlyEarnings = level1Earnings + level2Earnings + level3Earnings;
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
        description="Partner your church with Supernatural Institute. Bring supernatural power, more finances, and souls with hearts after God. Restore correct doctrine with Dunamis power. $200 AUD/month."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          Partner your church with the Supernatural Institute
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
          Bring the supernatural into your church. Bring more finances into your church. Bring more people into your church with a heart after God. We support you and give you the tools you need. This is Australia's time to rise up with correct doctrine as for too long the devil has flooded Australia with his twisted lies. We are here to restore order to the body of Christ and we prove it with power as the kingdom of God is demonstrated in power - <strong className="text-blue-400">"Dunamis power"</strong> (Greek: δύναμις - miraculous power, mighty works, strength - Strong's G1411) not in words. Let us help.
        </p>
      </div>

      <section className="mb-12 sm:mb-16">
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font text-center">
            Strategic Partnership for Kingdom Multiplication
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base text-center max-w-4xl mx-auto">
            Join our strategic Supernatural Churches Leadership Partnership designed to strengthen, equip, and multiply local churches through senior leadership oversight, comprehensive training, and supernatural empowerment. Partner with us to create a unified network of Kingdom-focused ministries that teach accurately, lead powerfully, and demonstrate the signs that follow believers.
          </p>
        </div>
      </section>

      <section className="mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 heading-font">
              How Partnership Works
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
              Churches apply free and upon approval, subscribe to our Partnership program. Your leadership team completes our required Leadership Course and receives ordination certificates. You then gain access to role-based training tracks, congregation discipleship integration, and ongoing senior leadership support.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
              Partner churches can build their affiliate network through our 7-level commission structure while receiving Help Me Fund support when needed. Every church receives public recognition and becomes part of a growing network of supernatural ministries advancing God's Kingdom with power and integrity.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-6 text-center flex flex-col justify-center">
            <div className="text-5xl font-black text-white heading-font">
              $200
            </div>
            <div className="text-gray-400 mb-4">AUD / month</div>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="w-full bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 font-semibold uppercase tracking-wide text-sm"
            >
              Apply Now
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Free to apply • Cancel anytime • Leadership Course required
            </p>
            <p className="text-xs text-gray-400 mt-2">
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
          Calculate your potential monthly earnings through our affiliate program. Help your congregation grow spiritually while building sustainable ministry finances to advance God's Kingdom.
        </p>
        
        <div className="bg-white/5 border border-white/10 p-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Calculate Your Potential</h3>
              
              <div>
                <label className="block text-white font-semibold mb-2">Membership Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                >
                  <option value="bronze">Bronze - $19 AUD/month</option>
                  <option value="silver">Silver - $33 AUD/month</option>
                  <option value="gold">Gold - $149 AUD/month</option>
                  <option value="diamond">Diamond - $499 AUD/month</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Billing Frequency</label>
                <select
                  value={billingType}
                  onChange={(e) => setBillingType(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                >
                  <option value="monthly">Monthly Billing</option>
                  <option value="annual">Annual Billing (10% discount)</option>
                </select>
              </div>
              
              <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded">
                <h4 className="text-white font-semibold mb-2">3-Level Commission Structure</h4>
                <div className="space-y-2 text-blue-100 text-sm">
                  <div className="flex justify-between">
                    <span>Level 1 (Direct Referrals):</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level 2 (Second Generation):</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level 3 (Third Generation):</span>
                    <span className="font-semibold">5%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Level 1 - Direct Referrals (20%)</label>
                <input
                  type="number"
                  value={members}
                  onChange={(e) => setMembers(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                  placeholder="e.g., 100"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Level 2 - Second Generation (10%)</label>
                <input
                  type="number"
                  value={level2Members}
                  onChange={(e) => setLevel2Members(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                  placeholder="e.g., 50"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Level 3 - Third Generation (5%)</label>
                <input
                  type="number"
                  value={level3Members}
                  onChange={(e) => setLevel3Members(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-blue-400 focus:outline-none"
                  placeholder="e.g., 25"
                  min="0"
                />
              </div>
            </div>
            
            {/* Results */}
            <div className="bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Your Earnings Breakdown</h3>
              
              <div className="space-y-4 mb-6">
                <div className="border-b border-white/20 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Level 1 ({members} members @ 20%):</span>
                    <span className="text-green-400 font-semibold">${level1Earnings.toFixed(2)} AUD</span>
                  </div>
                </div>
                
                <div className="border-b border-white/20 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Level 2 ({level2Members} members @ 10%):</span>
                    <span className="text-blue-400 font-semibold">${level2Earnings.toFixed(2)} AUD</span>
                  </div>
                </div>
                
                <div className="border-b border-white/20 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Level 3 ({level3Members} members @ 5%):</span>
                    <span className="text-purple-400 font-semibold">${level3Earnings.toFixed(2)} AUD</span>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-white font-bold">Total Monthly:</span>
                    <span className="text-orange-400 font-black">${monthlyEarnings.toFixed(2)} AUD</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg mt-2">
                    <span className="text-white font-bold">Total Annual:</span>
                    <span className="text-green-400 font-black">${annualEarnings.toFixed(2)} AUD</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-500/20 border border-red-500/30 p-4 rounded">
                <p className="text-red-100 text-sm text-center font-semibold">
                  <strong>WE BRING SPIRITUALLY DEAD CHURCHES BACK TO LIFE</strong>
                </p>
                <p className="text-red-100 text-xs text-center mt-2">
                  Transform your ministry through supernatural power demonstration and proven Kingdom principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Link & Templates Section */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 heading-font text-center">
          Easy Ministry Integration
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
          Once approved as a partner, you'll receive your custom affiliate link and ready-to-use templates. Making it simple to integrate with your existing ministry operations.
        </p>
        
        <div className="bg-white/5 border border-white/10 p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Affiliate Link Section */}
            <div className="bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" />
                Your Affiliate Link
              </h3>
              <div className="bg-gray-800 border border-gray-700 p-4 rounded mb-4">
                <code className="text-green-400 text-sm break-all">
                  https://supernatural.institute/join?ref=YURCHURCH
                </code>
              </div>
              <p className="text-gray-300 text-sm">
                Share this personalized link via SMS, email, or social media. All signups through your link automatically credit to your affiliate account.
              </p>
            </div>

            {/* Templates Section */}
            <div className="bg-white/10 border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-blue-400" />
                Ready-to-Use Templates
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-800 border border-gray-700 p-3 rounded">
                  <h4 className="text-white font-semibold text-sm mb-2">📧 Email Template</h4>
                  <p className="text-gray-300 text-xs">
                    Professional email template ready to send to your congregation with your affiliate link included.
                  </p>
                </div>
                <div className="bg-gray-800 border border-gray-700 p-3 rounded">
                  <h4 className="text-white font-semibold text-sm mb-2">📱 SMS Template</h4>
                  <p className="text-gray-300 text-xs">
                    Short, compelling SMS message template perfect for quick outreach to your staff and members.
                  </p>
                </div>
                <div className="bg-gray-800 border border-gray-700 p-3 rounded">
                  <h4 className="text-white font-semibold text-sm mb-2">📋 Announcement Template</h4>
                  <p className="text-gray-300 text-xs">
                    Church bulletin and announcement templates for seamless integration into your services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Benefits */}
          <div className="mt-8 bg-blue-500/20 border border-blue-500/30 p-6 rounded">
            <h3 className="text-white font-bold mb-3 text-center">Complete Integration Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partnershipFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-white/5 border border-white/10 p-6">
                <Icon className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 heading-font">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {partnersData && partnersData.partners.length > 0 && (
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 heading-font text-center">
            Our Ministry Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partnersData.partners.map(partner => (
              <a key={partner.id} href={partner.websiteUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-center group">
                <div className="w-32 h-32 bg-gray-800/50 border border-gray-700 flex items-center justify-center mb-2 group-hover:border-white transition-colors">
                  {partner.logoUrl ? (
                    <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain p-2" />
                  ) : (
                    <span className="text-gray-400 text-sm">Logo</span>
                  )}
                </div>
                <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">{partner.name}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gray-800/50 border border-gray-700 p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font">
          Ready to Transform Your Ministry?
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
          Join our network of Kingdom-minded churches that teach accurately, lead powerfully, and demonstrate supernatural signs. Together, we're raising up a generation of leaders who advance the Gospel with integrity and divine power.
        </p>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="inline-block bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 font-semibold uppercase tracking-wide text-sm mb-4"
        >
          Apply Now Today
        </button>
        <p className="text-xs text-gray-500 max-w-3xl mx-auto">
          Ordination certificates provided upon required training completion. Ministries not aligned with our teaching standards may have partnership revoked. Terms and Conditions apply.
        </p>
      </section>

      <FiveFoldApplicationForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
}
