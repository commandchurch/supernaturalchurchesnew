import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  ExternalLink, 
  Target, 
  Eye, 
  DollarSign, 
  MessageCircle, 
  Users, 
  GraduationCap,
  Church,
  Building2,
  Crown,
  Zap,
  Heart,
  Globe,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';
import ChurchPartnershipCTA from '../components/ChurchPartnershipCTA';
const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` }
  ]
};

export default function About() {
  const [activeTab, setActiveTab] = useState('church-partnership');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if we need to scroll to church partnership section
    if (window.location.hash === '#church-partnership') {
      setActiveTab('church-partnership');
      setTimeout(() => {
        const element = document.getElementById('church-partnership');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const handlePlayAudio = useCallback(() => {
    window.open('https://drive.google.com/file/d/1Vm49SiDoMbWYfKBoRw1CWDMgWbM67UpJ/view', '_blank', 'noopener');
  }, []);

  const tabs = [
    { id: 'church-partnership', name: 'Partnership', icon: Building2 },
    { id: 'compensation-plan', name: 'Compensation', icon: DollarSign },
    { id: 'beliefs', name: 'Beliefs', icon: BookOpen },
    { id: 'miracles-testimony', name: 'Testimonies', icon: Heart },
    { id: 'leadership', name: 'Leadership', icon: Crown }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="About Supernatural Institute — Supernatural Training for Every Believer"
        description="Supernatural Institute equips every believer to demonstrate the Gospel in power. Training, ordination pathways, Help Me Fund, Prayer Requests, and Affiliate Program."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Church className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          About Supernatural Institute
        </h1>
        <div className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed space-y-2 sm:space-y-1">
          <p className="block">Everything we do centers around winning souls for the Kingdom of God through supernatural demonstration and biblical discipleship.</p>
          <p className="block">Leadership demonstrating authentic supernatural power and ministry excellence.</p>
          <p className="block">Established under senior leadership oversight with genuine ecclesiastical authority for supernatural ministry training.</p>
          <p className="block">Witness the power of God demonstrated through real-time miracles and supernatural encounters.</p>
          <p className="block">Built on the unshakeable foundation of God's Word and demonstrated through supernatural power.</p>
        </div>
      </div>

      {/* Subtabs Navigation */}
      <div className="flex justify-center mb-12 sm:mb-16">
        <div className="bg-white/5 border border-white/10 p-1 flex flex-wrap gap-1 w-full max-w-5xl" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const element = document.getElementById(tab.id);
                  if (element) {
                    // Dynamic offset based on screen size and header height
                    const isMobile = window.innerWidth < 768;
                    const headerOffset = isMobile ? 200 : 220; // Account for mobile header and tab navigation
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: Math.max(0, offsetPosition), // Ensure we don't scroll above top
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all duration-300 flex-1 min-w-0 touch-manipulation ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg active:bg-purple-700'
                    : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/5'
                }`}
                aria-label={`Navigate to ${tab.name} section`}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-center leading-tight text-xs sm:text-sm truncate max-w-full">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Outreach & Soul Winning */}
      <section id="overview" className="mb-12 sm:mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Container */}
          <div className="bg-gray-900/30 border border-gray-700/50 p-6 sm:p-8 mb-8 sm:mb-12 rounded-xl">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 heading-font">
                Our Core Focus: Outreach & Soul Winning
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Everything we do centers around winning souls for the Kingdom of God through supernatural demonstration and biblical discipleship.
              </p>
            </div>
          </div>

          {/* Core Pillars Container */}
          <div className="bg-gray-800/30 border border-gray-700/50 p-6 sm:p-8 mb-8 sm:mb-12 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-all duration-300 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center rounded-full">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white heading-font">WIN SOULS</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We train believers to perform supernatural outreach—healing the sick, casting out demons, and demonstrating God's power to win souls for Christ through Kingdom authority.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-all duration-300 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center rounded-full">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white heading-font">DISCIPLE THEM</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  New believers receive comprehensive discipleship training—learning to walk in God's power, understand His Word, and mature in their faith through supernatural ministry.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-all duration-300 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center rounded-full">
                    <Church className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white heading-font">PLUG INTO CHURCHES</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  We connect discipled believers with partnered churches in their local area for ongoing fellowship, growth, and ministry opportunities in Kingdom communities.
                </p>
              </div>
            </div>
          </div>

          {/* Strategy Container */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-6 sm:p-8 rounded-xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4 heading-font text-center">
                The Supernatural Outreach Strategy
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center mb-4">
                Our approach goes beyond traditional evangelism. We train believers to demonstrate the Gospel through signs, wonders, and miracles—just as Jesus commissioned in Mark 16:15-20.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center">
                When people see God's power in action, hearts are opened, souls are won, and communities are transformed. This supernatural outreach creates a multiplication effect
                as new converts become equipped disciples who reach others in their spheres of influence through Kingdom ministry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Features */}
      <section className="mb-12 sm:mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/30 border border-gray-700/50 p-6 sm:p-8 mb-8 sm:mb-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 heading-font">
                Ministry Features
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                Practical support and pathways designed to help you thrive in life and ministry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white heading-font">HELP ME FUND</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                A compassionate emergency fund for our paid members facing genuine crisis situations. We support urgent bills, unexpected hardship, and emergency medical expenses.
              </p>
              <div className="space-y-3 mb-4">
                <div className="bg-green-500/10 border border-green-500/30 p-3 rounded">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">✅ What We Cover:</h4>
                  <ul className="text-green-200 text-xs space-y-1">
                    <li>• Emergency rent or utility bills</li>
                    <li>• Urgent medical expenses (accident-related)</li>
                    <li>• Unexpected hardship situations</li>
                    <li>• Crisis support for active ministry members</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-3 rounded">
                  <h4 className="text-red-400 font-semibold text-sm mb-2">❌ What We Don't Cover:</h4>
                  <ul className="text-red-200 text-xs space-y-1">
                    <li>• General medication or ongoing medical treatment</li>
                    <li>• Education or study expenses</li>
                    <li>• Business or personal loans</li>
                    <li>• Non-emergency situations</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-xs text-gray-400">Available in your dashboard</p>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white heading-font">PRAYER REQUESTS</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                Submit prayer requests and receive pastoral support, encouragement, and ministry guidance from our experienced team.
              </p>
              <div className="text-center mt-4">
                <p className="text-xs text-gray-400">Available in your dashboard</p>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors lg:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white heading-font">AFFILIATE PROGRAM</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                    Earn 30% commissions on all levels while spreading the Gospel. Our equal-opportunity affiliate program rewards everyone the same generous rate.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-2">💰 Commission Structure:</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>• <strong>30% on ALL levels</strong> - Same rate for everyone</p>
                      <p>• Up to 7 levels deep network</p>
                      <p>• Payouts on second Friday of each month</p>
                      <p>• No special Diamond rates - equal opportunity</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <p className="text-xs text-gray-400 text-center">Available in your dashboard</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors lg:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white heading-font">SCHOOL</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                    We equip believers to obey Christ's command in <span className="text-blue-400 font-semibold">Mark 16:15–20 (NKJV)</span> and restore the fullness of God's truth to His church.
                    Many understand the blood of Jesus; we also teach the power of His body—broken for you—to walk in divine health daily.
                  </p>
                  <blockquote className="border-l-4 border-blue-500/50 pl-4 text-gray-300 text-sm italic bg-gray-900/30 p-3 rounded-r mb-4">
                    "And He said to them, 'Go into all the world and preach the gospel to every creature..." — <span className="text-blue-400 font-semibold">Mark 16:15–20 (NKJV)</span>
                  </blockquote>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <p className="text-xs text-gray-400 text-center">Available in your dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Simplified Authority & Training */}
      <section className="mb-12 sm:mb-20">
        <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 heading-font">
              Authority & Excellence
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-6">
              Supernatural Institute operates under <span className="text-blue-400 font-semibold">senior leadership oversight</span> through Supernatural Churches Limited. 
              We provide professional ministry training with genuine ecclesiastical authority, equipping believers to walk in supernatural power while 
              maintaining the highest standards of biblical truth and ministry excellence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">TRAIN</h3>
                <p className="text-gray-300 text-sm">Professional supernatural ministry education</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
                  <Church className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">ORDAIN</h3>
                <p className="text-gray-300 text-sm">Legal ordination with ecclesiastical covering</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">MINISTER</h3>
                <p className="text-gray-300 text-sm">Supernatural ministry with power and integrity</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/academy"
                className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 text-sm sm:text-base uppercase tracking-wide transition-colors duration-200"
              >
                START YOUR TRAINING →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Supernatural Ministry Testimony */}
      <section id="miracles-testimony" className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 heading-font">
            Supernatural Ministry in Action
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Witness the power of God demonstrated through real-time miracles and supernatural encounters.
          </p>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <button
              className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
              onClick={handlePlayAudio}
              aria-label="Play miracle audio testimony"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-purple-600/20" />
              <div className="text-center relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:bg-white/20 transition-all duration-300">
                  <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1" />
                </div>
                <p className="text-white text-base sm:text-lg font-semibold">Live Radio Miracle</p>
                <p className="text-gray-300 text-sm">Kiss FM 106.5 Sydney</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Click to listen</p>
              </div>
            </button>
            <div>
              <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 text-xs sm:text-sm font-semibold inline-block mb-3 sm:mb-4">
                LIVE MIRACLE
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">
                Instant Healing Live on Air
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
                In 2022, radio host Kyle Sandilands from Kiss FM 106.5 in Sydney, Australia received an instant miracle live on air. 
                Samuel called to stop a séance from happening, and Jesus healed Kyle's crippling back injury with undeniable evidence 
                for millions of listeners.
              </p>
              <p className="text-gray-400 leading-relaxed mb-5 text-sm sm:text-base">
                Pain erased, movement restored, as the world listened in real time. This supernatural encounter was backed up by 
                church testimony and demonstrates the authentic power of God flowing through this ministry.
              </p>
              <div className="space-y-3">
                <a 
                  href="https://youtu.be/XHfSRh77bFA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-100 font-semibold uppercase tracking-wide px-4 sm:px-6 py-2 text-sm sm:text-base"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  WATCH TESTIMONY
                </a>
                <div className="text-xs text-gray-400">
                  <p className="mb-1">⚠️ Warning: Contains strong language</p>
                  <p>Audio recording also available via Google Drive link</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Compensation Plan Section */}
      <section id="compensation-plan" className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 heading-font">
            AFFILIATE PROGRAM
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Earn 30% commissions on all levels while spreading the Gospel. Our equal-opportunity affiliate program rewards everyone the same generous rate.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 mb-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-400 text-2xl font-bold">30%</span>
                </div>
                <h3 className="text-green-200 font-bold mb-2">All Levels</h3>
                <p className="text-green-100 text-sm">Same commission rate for everyone</p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-2xl">7</span>
                </div>
                <h3 className="text-blue-200 font-bold mb-2">Levels Deep</h3>
                <p className="text-blue-100 text-sm">Up to 7 levels in your network</p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-lg">
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-purple-200 font-bold mb-2">Monthly Payouts</h3>
                <p className="text-purple-100 text-sm">Paid on the 2nd Friday of each month</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-white mb-4">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-400 font-bold">1</span>
                  </div>
                  <p className="text-gray-300">Join FREE and get your affiliate link</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-400 font-bold">2</span>
                  </div>
                  <p className="text-gray-300">Share your link and help others join</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <p className="text-gray-300">Earn 30% on all referrals in your network</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/compensation-plan" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-colors">
                VIEW FULL COMPENSATION PLAN →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statement of Faith Preview */}
      <section id="beliefs" className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 heading-font">
            Our Foundation
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Built on the unshakeable foundation of God's Word and demonstrated through supernatural power.
          </p>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 heading-font">
              The Difference: Power, Not Just Words
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base">
              "For the kingdom of God is not in word but in power." - 1 Corinthians 4:20
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 heading-font">Scriptural Authority</h4>
              <p className="text-gray-400 text-sm">
                We affirm that the Scriptures serve as the definitive guide for Christian life and practice, 
                unbroken and fulfilled through Jesus Christ.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 heading-font">Divine Healing</h4>
              <p className="text-gray-400 text-sm">
                We uphold belief in Divine Healing through Christ's sacrifice, making it a divine mandate 
                for Christians to facilitate healing for everyone.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 heading-font">Supernatural Living</h4>
              <p className="text-gray-400 text-sm">
                Every believer is empowered to do the impossible through faith, demonstrating God's 
                miraculous power in everyday life.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/statement-of-faith" className="inline-block bg-white text-black hover:bg-gray-200 font-semibold uppercase tracking-wide px-4 sm:px-6 py-2 text-sm sm:text-base">
              READ FULL STATEMENT OF FAITH
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="mb-16 sm:mb-20">
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 heading-font">
              LEADERSHIP
            </h2>
            <Crown className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Meet the senior leadership team that provides apostolic oversight, supernatural training, and biblical accuracy to churches worldwide.
          </p>
        </div>

        {/* Senior Leader Profile */}
        <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center overflow-hidden">
              <img
                src="/samuel-waterhouse.png"
                alt="Senior Leader, Samuel Waterhouse"
                className="w-full h-full object-cover"
                width="128"
                height="128"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <span className="text-3xl sm:text-4xl font-black text-white hidden">SW</span>
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 heading-font">
                Senior Leader, Samuel Waterhouse
              </h3>
              <p className="text-blue-400 mb-4 text-sm sm:text-base font-semibold">Sole Director & Founder</p>
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Under the leadership of Senior Leader, Samuel Waterhouse, Supernatural Institute and Supernatural Churches Limited are committed to building disciples,
                supporting global ministry, and spreading the Gospel worldwide through authentic community and bold demonstration of God's power.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Samuel walks in demonstrated power and has witnessed countless miracles, including supernatural healings that have been
                documented and verified. His ministry is marked by the authentic move of God's Spirit and a commitment to seeing
                believers equipped to walk in the same supernatural power that Jesus demonstrated.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <BookOpen className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ministry Team</h3>
            <p className="text-blue-300 text-sm mb-4 font-semibold">Training & Development</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Experienced ministry leaders who develop curriculum, provide ongoing support, and ensure biblical accuracy in all training materials.
            </p>
            <div className="space-y-2 text-xs text-gray-300">
              <div>• Curriculum development</div>
              <div>• Biblical accuracy oversight</div>
              <div>• Ongoing student support</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500/30 to-blue-500/30 border border-green-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <Users className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Partner Network</h3>
            <p className="text-green-300 text-sm mb-4 font-semibold">Church Leadership</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A growing network of partner church pastors and ministry leaders who implement our training and provide local oversight and support.
            </p>
            <div className="space-y-2 text-xs text-gray-300">
              <div>• Local church oversight</div>
              <div>• Regional ministry support</div>
              <div>• Practical implementation</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 text-center md:col-span-2 lg:col-span-1">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500/30 to-orange-500/30 border border-purple-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <Church className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ordination Board</h3>
            <p className="text-purple-300 text-sm mb-4 font-semibold">Ecclesiastical Authority</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Official ordination certificates and ecclesiastical covering for ministry leaders completing our comprehensive training programs.
            </p>
            <div className="space-y-2 text-xs text-gray-300">
              <div>• Official ordination certificates</div>
              <div>• Ecclesiastical authority</div>
              <div>• Ministry credentialing</div>
            </div>
          </div>
        </div>

        {/* Leadership Principles & Contact */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 p-8 rounded">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Leadership Principles</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm">Biblical Authority</p>
                    <p className="text-gray-400 text-xs">All teaching and ministry practices are rooted in Scripture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm">Supernatural Demonstration</p>
                    <p className="text-gray-400 text-xs">Power ministry that proves the Gospel through signs and wonders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm">Apostolic Oversight</p>
                    <p className="text-gray-400 text-xs">Senior leadership provides guidance and accountability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm">Church Multiplication</p>
                    <p className="text-gray-400 text-xs">Training leaders who plant and transform churches</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 border border-white/20 p-6 rounded">
                <h4 className="text-white font-bold text-lg mb-4">Contact Leadership</h4>
                <p className="text-gray-300 text-sm mb-6">
                  Need direct access to our senior leadership team? Partner churches receive priority consultation and support.
                </p>
                <Link to="/about#church-partnership" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-colors">
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church Partnership Section */}
      <section id="church-partnership" className="mb-16 sm:mb-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 heading-font">
            CHURCH PARTNERSHIP
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join our Supernatural Churches Apostolic Partnership and demonstrate Kingdom power through miraculous ministry.
            We equip churches to be the light of this world through authentic supernatural power and biblical authority.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-8 sm:p-12 mb-8">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 heading-font">
              Transform Your Ministry Through Supernatural Power
            </h3>
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              <strong className="text-blue-400">"Dunamis power"</strong> (Greek: δύναμις - miraculous power, mighty works, strength - Strong's G1411)
              - not just words, but demonstration. We bring spiritually dead churches back to life through Kingdom power.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded text-center">
                <Crown className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-blue-200 font-bold mb-2">Senior Leadership</h4>
                <p className="text-blue-100 text-sm">24/7 access to apostolic oversight</p>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 p-4 rounded text-center">
                <Zap className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-green-200 font-bold mb-2">Supernatural Training</h4>
                <p className="text-green-100 text-sm">Five-fold ministry development</p>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 p-4 rounded text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-purple-200 font-bold mb-2">Church Resources</h4>
                <p className="text-purple-100 text-sm">Complete ministry toolkit</p>
              </div>

              <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded text-center">
                <DollarSign className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h4 className="text-orange-200 font-bold mb-2">Financial Support</h4>
                <p className="text-orange-100 text-sm">Commission & Help Me Fund access</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-6 rounded-lg mb-8">
              <div className="text-center">
                <div className="text-3xl font-black text-white heading-font mb-2">$200 AUD</div>
                <div className="text-gray-300 mb-4">per month</div>
                <p className="text-gray-300 text-sm mb-6">
                  Complete church transformation package with apostolic oversight and supernatural training
                </p>
                <Link
                  to="/find-church"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold uppercase tracking-wide text-sm transition-colors"
                >
                  LEARN MORE & APPLY →
                </Link>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">
                Ready to bring Kingdom power to your church?
              </p>
              <Link
                to="/find-church"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 font-semibold uppercase tracking-wide text-sm transition-colors"
              >
                PARTNER YOUR CHURCH
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
