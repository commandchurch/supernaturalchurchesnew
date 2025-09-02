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
    { id: 'church-partnership', name: 'Church Partnership', icon: Building2 },
    { id: 'beliefs', name: 'Our Beliefs', icon: BookOpen },
    { id: 'miracles-testimony', name: 'Miracles Testimony', icon: Heart },
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
          <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Church className="w-8 h-8 text-blue-400" />
          </div>
          <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
          <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center">
            <Globe className="w-8 h-8 text-blue-400" />
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
        <div className="bg-white/5 border border-white/10 p-1 flex flex-wrap gap-1 w-full max-w-5xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const element = document.getElementById(tab.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all duration-300 flex-1 min-w-0 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-center leading-tight text-xs sm:text-sm">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Outreach & Soul Winning */}
      <section id="overview" className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 heading-font">
            Our Core Focus: Outreach & Soul Winning
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto">
            Everything we do centers around winning souls for the Kingdom of God through supernatural demonstration and biblical discipleship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white heading-font">WIN SOULS</h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              We train believers to perform supernatural outreach—healing the sick, casting out demons, and demonstrating God's power to win souls for Christ.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white heading-font">DISCIPLE THEM</h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              New believers receive comprehensive discipleship training—learning to walk in God's power, understand His Word, and mature in their faith.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                <Church className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white heading-font">PLUG INTO CHURCHES</h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              We connect discipled believers with partnered churches in their local area for ongoing fellowship, growth, and ministry opportunities.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 p-6 sm:p-8 mt-8 sm:mt-12">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-4 heading-font text-center">
            The Supernatural Outreach Strategy
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center max-w-4xl mx-auto">
            Our approach goes beyond traditional evangelism. We train believers to demonstrate the Gospel through signs, wonders, and miracles—just as Jesus commissioned in Mark 16:15-20. 
            When people see God's power in action, hearts are opened, souls are won, and communities are transformed. This supernatural outreach creates a multiplication effect 
            as new converts become equipped disciples who reach others in their spheres of influence.
          </p>
        </div>
      </section>

      {/* Ministry Features */}
      <section className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 heading-font">
            Ministry Features
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Practical support and pathways designed to help you thrive in life and ministry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white heading-font">HELP ME FUND</h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              A compassionate fund designed to support students in times of need—so you can keep learning, serving, and moving forward.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white heading-font">PRAYER REQUESTS</h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Every student can submit prayer requests and receive pastoral support, encouragement, and ministry from our team.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white heading-font">AFFILIATE PROGRAM</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Earn while spreading the Gospel! After completing evangelism training, qualified students can participate in our comprehensive affiliate program.
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">How It Works:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Complete evangelism training course</li>
                  <li>• Receive unique referral code and marketing materials</li>
                  <li>• Share with your network, social media, or during outreach</li>
                  <li>• Earn commissions when referrals join membership plans</li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Example Earnings:</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>• BRONZE ($20/mo) = <span className="text-green-400 font-semibold">$4.00 monthly commission (1 level)</span></p>
                  <p>• SILVER ($35/mo) = <span className="text-green-400 font-semibold">$7.00 monthly commission (2 levels)</span></p>
                  <p>• GOLD ($150/mo) = <span className="text-green-400 font-semibold">$30.00 monthly commission (5 levels)</span></p>
                  <p>• DIAMOND ($500/mo) = <span className="text-green-400 font-semibold">$175.00 monthly commission (7 levels, 35% on level 1)</span></p>
                </div>
              </div>

              <p className="text-blue-400 text-sm font-medium">
                Transform your ministry outreach into sustainable income while helping others access supernatural training.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative group hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white heading-font">SCHOOL</h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
              We equip believers to obey Christ's command in <span className="text-orange-400 font-semibold">Mark 16:15–20 (NKJV)</span> and restore the fullness of God's truth to His church.
              Many understand the blood of Jesus; we also teach the power of His body—broken for you—to walk in divine health daily.
            </p>
            <blockquote className="border-l-4 border-orange-500/50 pl-4 text-gray-300 text-sm italic bg-gray-900/30 p-3 rounded-r">
              "And He said to them, 'Go into all the world and preach the gospel to every creature. He who believes and is baptized will be saved; but he who does not believe will be condemned. And these signs will follow those who believe: In My name they will cast out demons; they will speak with new tongues; they will take up serpents; and if they drink anything deadly, it will by no means hurt them; they will lay hands on the sick, and they will recover.' So then, after the Lord had spoken to them, He was received up into heaven, and sat down at the right hand of God. And they went out and preached everywhere, the Lord working with them and confirming the word through the accompanying signs. Amen." — <span className="text-orange-400 font-semibold">Mark 16:15–20 (NKJV)</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white heading-font">
              Leadership
            </h2>
            <Crown className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Leadership demonstrating authentic supernatural power and ministry excellence.
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-500/10 to-transparent"></div>
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
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 heading-font">
                Senior Leader, Samuel Waterhouse
              </h3>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">Sole Director & Founder</p>
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Under the leadership of Senior Leader, Samuel Waterhouse, Supernatural Institute and Supernatural Churches Limited are committed to building disciples,
                supporting global ministry, and spreading the Gospel worldwide through authentic community and bold demonstration of God’s power.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Samuel walks in demonstrated power and has witnessed countless miracles, including supernatural healings that have been 
                documented and verified. His ministry is marked by the authentic move of God's Spirit and a commitment to seeing 
                believers equipped to walk in the same supernatural power that Jesus demonstrated.
              </p>
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
                <p className="text-gray-400 text-sm">Professional supernatural ministry education</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
                  <Church className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">ORDAIN</h3>
                <p className="text-gray-400 text-sm">Legal ordination with ecclesiastical covering</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">MINISTER</h3>
                <p className="text-gray-400 text-sm">Supernatural ministry with power and integrity</p>
              </div>
            </div>

            <div className="mt-8">
              <Link 
                to="/academy" 
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 text-sm sm:text-base uppercase tracking-wide transition-colors duration-200"
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
                <div className="text-xs text-gray-500">
                  <p className="mb-1">⚠️ Warning: Contains strong language</p>
                  <p>Audio recording also available via Google Drive link</p>
                </div>
              </div>
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
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 heading-font">
            LEADERSHIP
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Meet the senior leadership team that provides apostolic oversight, supernatural training, and biblical accuracy to churches worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <Crown className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Samuel Waterhouse</h3>
            <p className="text-purple-300 text-sm mb-4 font-semibold">Senior Leader & Founder</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Apostolic oversight and supernatural ministry training. Demonstrated healing ministry with documented miracles and church transformation across Australia.
            </p>
            <div className="space-y-2 text-xs text-gray-500">
              <div>• 15+ years ministry experience</div>
              <div>• Church planting and revival</div>
              <div>• Supernatural healing protocols</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/30 to-green-500/30 border border-blue-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <BookOpen className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ministry Team</h3>
            <p className="text-blue-300 text-sm mb-4 font-semibold">Training & Development</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Experienced ministry leaders who develop curriculum, provide ongoing support, and ensure biblical accuracy in all training materials.
            </p>
            <div className="space-y-2 text-xs text-gray-500">
              <div>• Curriculum development</div>
              <div>• Biblical accuracy oversight</div>
              <div>• Ongoing student support</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 text-center md:col-span-2 lg:col-span-1">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500/30 to-orange-500/30 border border-green-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
              <Users className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Partner Network</h3>
            <p className="text-green-300 text-sm mb-4 font-semibold">Church Leadership</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A growing network of partner church pastors and ministry leaders who implement our training and provide local oversight and support.
            </p>
            <div className="space-y-2 text-xs text-gray-500">
              <div>• Local church oversight</div>
              <div>• Regional ministry support</div>
              <div>• Practical implementation</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 p-8 rounded">
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
                <Link to="/about#church-partnership" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-colors">
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
            SUPERNATURAL CHURCHES PARTNERSHIP
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Transform your church with apostolic oversight, supernatural training, and proven ministry protocols. 
            We bring spiritually dead churches back to life through demonstrable Kingdom power and doctrinal clarity.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 sm:p-12 mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 heading-font">
                Bring Dunamis Power to Your Church
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                <strong className="text-blue-400">"Dunamis power"</strong> (Greek: δύναμις - miraculous power, mighty works, strength - Strong's G1411) 
                - not just words, but demonstration. This is Australia's time to rise up with correct doctrine. 
                For too long the devil has flooded Australia with twisted lies. We are here to restore order to the body of Christ 
                and we prove it with power, as the Kingdom of God is demonstrated in power.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                We provide clear, practical teaching on:
              </p>
              <div className="mb-8">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>How to heal your congregation with proven protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>How to identify and combat doctrines of demons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Establishing supernatural ministry foundations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Demonstrating Kingdom power that transforms lives</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-purple-500/20 border border-purple-500/30 p-4 rounded">
                  <h4 className="text-purple-200 font-bold mb-3 flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Senior Leadership Access
                  </h4>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    24/7 Q&A access to our senior leadership team. Complete our comprehensive Leadership Course 
                    and receive official ordination certificates upon completion.
                  </p>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded">
                  <h4 className="text-blue-200 font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Supernatural Training
                  </h4>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Complete ministry training in: Healing-the-Sick, Deliverance Ministry, Evangelism, 
                    and Five-fold office development (Apostle, Prophet, Evangelist, Pastor, Teacher).
                  </p>
                </div>
                
                <div className="bg-green-500/20 border border-green-500/30 p-4 rounded">
                  <h4 className="text-green-200 font-bold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Congregation Integration
                  </h4>
                  <p className="text-green-100 text-sm leading-relaxed">
                    Seamlessly onboard your entire congregation into our proven discipleship programs 
                    with unified spiritual growth protocols and systematic training pathways.
                  </p>
                </div>
                
                <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded">
                  <h4 className="text-orange-200 font-bold mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Affiliate Network & Support
                  </h4>
                  <p className="text-orange-100 text-sm leading-relaxed">
                    Access our 3-tier commission structure (20%/10%/5%) for sustainable ministry income, 
                    plus Help Me Fund access for churches facing financial challenges.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 border border-white/20 p-6 text-center">
                <div className="text-4xl font-black text-white heading-font mb-2">
                  $200 AUD
                </div>
                <div className="text-gray-400 mb-4">/month</div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Complete church transformation package with senior leadership oversight, 
                  comprehensive training, and ongoing support.
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Free to apply • Leadership Course required • Cancel anytime
                </p>
                <ChurchPartnershipCTA 
                  variant="compact" 
                  showLearnMore={false}
                  className="bg-transparent border-0 p-0"
                />
              </div>

              <div className="bg-red-500/20 border border-red-500/30 p-6 rounded">
                <h4 className="text-red-200 font-bold text-lg mb-3 text-center">
                  🔥 WE BRING SPIRITUALLY DEAD CHURCHES BACK TO LIFE
                </h4>
                <p className="text-red-100 text-sm text-center leading-relaxed">
                  Transform your ministry through supernatural power demonstration, accurate biblical teaching, 
                  and proven Kingdom principles that produce lasting fruit.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-semibold mb-3">Complete Partnership Benefits:</h4>
                {[
                  'Complete church leadership team access',
                  'Five-fold ministry office training modules',
                  'Ordination Certificates for Pastors',
                  'Monthly leadership strategy sessions',
                  'Church-wide miracle healing protocols',
                  'Prophetic ministry development curriculum',
                  'Apostolic church planting resources',
                  'Evangelistic outreach training programs',
                  'Pastoral care excellence frameworks',
                  'Teaching ministry anointing development',
                  'Priority support & consultation',
                  'Custom curriculum development',
                  'Quarterly on-site ministry visits (Australia)'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 p-8 rounded">
            <h3 className="text-2xl font-bold text-white mb-4">How Partnership Works</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-3 rounded">
                  <span className="text-purple-400 font-bold">1</span>
                </div>
                <h4 className="font-bold text-white mb-2">Apply</h4>
                <p className="text-gray-400 text-sm">Submit your church partnership application for review and approval</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mx-auto mb-3 rounded">
                  <span className="text-blue-400 font-bold">2</span>
                </div>
                <h4 className="font-bold text-white mb-2">Payment Required</h4>
                <p className="text-gray-400 text-sm">Upon approval, $200 AUD/month payment begins your partnership journey</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-3 rounded">
                  <span className="text-green-400 font-bold">3</span>
                </div>
                <h4 className="font-bold text-white mb-2">Complete Access</h4>
                <p className="text-gray-400 text-sm">Leadership training, ordination certificates, and full ministry resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
