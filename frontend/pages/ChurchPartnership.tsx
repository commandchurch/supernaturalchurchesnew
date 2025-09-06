import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Church,
  Crown,
  Users,
  DollarSign,
  CheckCircle,
  Star,
  Heart,
  Shield,
  BookOpen,
  Award,
  ArrowRight,
  Zap,
  Target,
  Sparkles,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  Loader2,
  ChevronDown,
  X,
  TrendingUp
} from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config/index';

const ChurchPartnership: React.FC = () => {
    const [isApplicationOpen, setIsApplicationOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false); // Temporary until new auth is set up
   const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

   // Calculator state
   const [networkLevels, setNetworkLevels] = useState([
     { churches: 1, silver: 4, gold: 2, diamond: 1 }, // Level 1
     { churches: 0, silver: 8, gold: 3, diamond: 1 }, // Level 2
     { churches: 0, silver: 12, gold: 5, diamond: 2 }, // Level 3
     { churches: 0, silver: 15, gold: 8, diamond: 3 }, // Level 4
     { churches: 0, silver: 18, gold: 10, diamond: 4 }, // Level 5
     { churches: 0, silver: 20, gold: 12, diamond: 5 }, // Level 6
     { churches: 0, silver: 25, gold: 15, diamond: 6 }  // Level 7
   ]);

   // Calculator scenarios
   const scenarios = [
     {
       name: "Growing Church",
       churchReferrals: 3,
       silverMembers: 8,
       goldMembers: 3,
       diamondMembers: 1
     },
     {
       name: "Established Ministry",
       churchReferrals: 8,
       silverMembers: 15,
       goldMembers: 8,
       diamondMembers: 3
     },
     {
       name: "Kingdom Builder",
       churchReferrals: 15,
       silverMembers: 25,
       goldMembers: 12,
       diamondMembers: 5
     }
   ];

   // Commission rates
   const commissionRates = {
     church: 0.30, // 30% for church referrals
     silver: 0.10, // 10% for level 2 (silver members)
     gold: 0.05,   // 5% for level 3 (gold members)
     diamond: 0.04 // 4% for level 4 (diamond members)
   };

   // Calculate total monthly commission
   const calculateCommission = () => {
     let totalCommission = 0;

     networkLevels.forEach((level, levelIndex) => {
       const levelRate = [0.30, 0.10, 0.05, 0.04, 0.03, 0.02, 0.01][levelIndex];

       const churchCommission = level.churches * 99 * levelRate;
       const silverCommission = level.silver * 33 * levelRate;
       const goldCommission = level.gold * 149 * levelRate;
       const diamondCommission = level.diamond * 499 * levelRate;

       totalCommission += churchCommission + silverCommission + goldCommission + diamondCommission;
     });

     return totalCommission;
   };

   // Update level data
   const updateLevel = (levelIndex: number, field: string, value: number) => {
     const newLevels = [...networkLevels];
     newLevels[levelIndex] = { ...newLevels[levelIndex], [field]: Math.max(0, value) };
     setNetworkLevels(newLevels);
   };

   // Load scenario
   const loadScenario = (index: number) => {
     const scenario = scenarios[index];
     const newLevels = [
       { churches: scenario.churchReferrals, silver: 4, gold: 2, diamond: 1 }, // Level 1
       { churches: 0, silver: scenario.silverMembers, gold: 3, diamond: 1 }, // Level 2
       { churches: 0, silver: 12, gold: scenario.goldMembers, diamond: 2 }, // Level 3
       { churches: 0, silver: 15, gold: 8, diamond: scenario.diamondMembers }, // Level 4
       { churches: 0, silver: 18, gold: 10, diamond: 4 }, // Level 5
       { churches: 0, silver: 20, gold: 12, diamond: 5 }, // Level 6
       { churches: 0, silver: 25, gold: 15, diamond: 6 }  // Level 7
     ];
     setNetworkLevels(newLevels);
   };

  const partnershipBenefits = [
    {
      icon: Crown,
      title: "Complete Church Leadership Team Access",
      description: "24/7 access to our senior apostolic leadership team through our ticket system. For emergencies, click 'emergency' when submitting a ticket for immediate attention."
    },
    {
      icon: BookOpen,
      title: "Five-fold Ministry Office Training Modules",
      description: "Comprehensive training in Apostle, Prophet, Evangelist, Pastor, and Teacher ministries."
    },
    {
      icon: Award,
      title: "Ordination Certificates for Pastors",
      description: "Official ordination certificates upon completion of our comprehensive Leadership Course."
    },
    {
      icon: Calendar,
      title: "Monthly Leadership Strategy Sessions",
      description: "Exclusive monthly sessions with senior leadership for church growth strategies."
    },
    {
      icon: Heart,
      title: "Church-wide Miracle Healing Protocols",
      description: "Proven protocols for healing ministry that work across your entire congregation."
    },
    {
      icon: Zap,
      title: "Prophetic Ministry Development Curriculum",
      description: "Complete prophetic training with practical application and activation exercises."
    },
    {
      icon: Target,
      title: "Apostolic Church Planting Resources",
      description: "Full toolkit for church planting with apostolic authority and Kingdom principles."
    },
    {
      icon: Users,
      title: "Evangelistic Outreach Training Programs",
      description: "Powerful evangelistic methods that demonstrate Kingdom power and produce lasting fruit."
    },
    {
      icon: Shield,
      title: "Pastoral Care Excellence Frameworks",
      description: "Biblical frameworks for pastoral care that protect and nurture your flock."
    },
    {
      icon: Sparkles,
      title: "Teaching Ministry Anointing Development",
      description: "Develop powerful teaching ministry with biblical authority and revelation knowledge."
    },
    {
      icon: MessageCircle,
      title: "Priority Support & Consultation",
      description: "Priority access to our support team and apostolic consultation services."
    },
    {
      icon: Target,
      title: "Custom Curriculum Development",
      description: "Tailored curriculum development for your church's specific needs and vision."
    },
    {
      icon: MapPin,
      title: "Quarterly On-site Ministry Visits",
      description: "Quarterly visits from apostolic leadership for hands-on ministry and training (Australia)."
    }
  ];

  const commissionStructure = [
    {
      level: "Level 1",
      description: "Your direct referrals",
      commission: "30%"
    },
    {
      level: "Level 2",
      description: "People recruited by your Level 1",
      commission: "10%"
    },
    {
      level: "Level 3",
      description: "Deeper network levels",
      commission: "5%"
    },
    {
      level: "Level 4",
      description: "Deeper network levels",
      commission: "4%"
    },
    {
      level: "Level 5",
      description: "Deeper network levels",
      commission: "3%"
    },
    {
      level: "Level 6",
      description: "Deeper network levels",
      commission: "2%"
    },
    {
      level: "Level 7",
      description: "Deeper network levels",
      commission: "1%"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Application Review",
      description: "Submit your church partnership application for comprehensive review by our apostolic leadership team",
      icon: CheckCircle
    },
    {
      step: "2",
      title: "Leadership Assessment",
      description: "Complete our Leadership Course and demonstrate alignment with our supernatural ministry standards",
      icon: BookOpen
    },
    {
      step: "3",
      title: "Partnership Agreement",
      description: "Upon approval, sign our partnership agreement and begin $99 AUD/month partnership",
      icon: DollarSign
    },
    {
      step: "4",
      title: "Complete Access",
      description: "Access all ministry resources, ordination certificates, and apostolic oversight",
      icon: Crown
    }
  ];

  const churchResponsibilities = [
    {
      title: "Ministry Standards",
      canDo: [
        "Teach supernatural ministry principles",
        "Demonstrate Kingdom power through miracles",
        "Lead congregational healing services",
        "Conduct deliverance ministry sessions",
        "Train members in prophetic ministry",
        "Host apostolic church planting initiatives"
      ],
      cannotDo: [
        "Teach doctrines contrary to biblical revelation",
        "Promote false teachings or spiritual deception",
        "Engage in practices that contradict Kingdom principles",
        "Misrepresent apostolic authority or ordination"
      ],
      additionalNote: "Maintain biblical integrity in all ministry practices"
    },
    {
      title: "Financial Compliance",
      canDo: [
        "Receive 30% commissions from network referrals",
        "Access Help Me Fund for ministry support",
        "Participate in apostolic fundraising initiatives",
        "Benefit from church-wide financial resources"
      ],
      cannotDo: [
        "Misrepresent commission earnings or potential",
        "Engage in unethical fundraising practices",
        "Promise guaranteed financial returns to members",
        "Use partnership for personal financial gain"
      ],
      additionalNote: "Put into practice faith for finances"
    },
    {
      title: "Community Standards",
      canDo: [
        "Lead by apostolic example and integrity",
        "Foster healthy spiritual community",
        "Mentor emerging ministry leaders",
        "Collaborate with other churches"
      ],
      cannotDo: [
        "Engage in divisive or harmful practices",
        "Promote personal agendas over Kingdom purposes",
        "Discriminate against any person or group",
        "Violate our code of ministerial conduct"
      ],
      collaborationNote: "We won't allow collaboration with those who deny God's word though - get them on board to agree with the word of God we teach!"
    }
  ];

  const faqs = [
    {
      question: "What makes this partnership different from other church networks?",
      answer: "Our partnership focuses on authentic supernatural ministry with proven apostolic oversight. We emphasize demonstration of Kingdom power through real miracles, not just theoretical teaching. Our multi-level commission network provides sustainable financial support while maintaining biblical integrity."
    },
    {
      question: "Do I need to change my church's name or branding?",
      answer: "No, you maintain complete autonomy over your church's identity, name, and branding. The partnership provides apostolic covering and resources while preserving your unique ministry calling and local identity."
    },
    {
      question: "What happens if my church doesn't align with the standards?",
      answer: "We work collaboratively with churches to ensure alignment with biblical standards. If significant concerns arise, we provide apostolic counsel and support for realignment. Partnership may be terminated only after thorough review and opportunity for correction."
    },
    {
      question: "Can I access the resources immediately?",
      answer: "Upon approval, you receive immediate access to our complete ministry toolkit. Some advanced features may require completion of specific training modules to ensure proper stewardship of apostolic authority."
    },
    {
      question: "What support do I receive for church growth?",
      answer: "You receive comprehensive apostolic oversight, quarterly ministry visits (Australia), custom curriculum development, priority support access, and collaboration opportunities with other apostolic churches in our network."
    },
    {
      question: "How does the commission system work?",
      answer: "You earn 30% commission on direct referrals and reduced percentages on extended network levels. Use our interactive calculator to see potential earnings based on your expected church and member referrals. When someone you refer joins and recruits others, you continue earning from their network. This creates residual income for sustainable ministry support."
    },
    {
      question: "What training do I receive?",
      answer: "Complete five-fold ministry training (Apostle, Prophet, Evangelist, Pastor, Teacher), supernatural ministry protocols, healing ministry techniques, deliverance ministry, prophetic development, and apostolic church planting strategies."
    },
    {
      question: "Can I invite my congregation to join the institute?",
      answer: "Yes! You can seamlessly onboard your entire congregation to our discipleship programs. We provide unified spiritual growth protocols and systematic training pathways designed for congregational integration."
    },
    {
      question: "What if I need financial assistance for my church?",
      answer: "Our Help Me Fund provides financial support for churches facing challenges. Additionally, the commission structure creates ongoing revenue streams to support your ministry's financial health and expansion."
    },
    {
      question: "How long does the approval process take?",
      answer: "The approval process typically takes 7-14 days. We conduct a thorough review of your ministry, vision, and alignment with our apostolic standards. During this time, you can begin our free Leadership Course."
    },
    {
      question: "How do I use the commission calculator?",
      answer: "Our interactive calculator lets you input expected numbers of church referrals and individual members at different levels. Choose from pre-set scenarios (Growing Church, Established Ministry, Kingdom Builder) or customize your own numbers to see potential monthly commission earnings. The calculator shows breakdowns by referral type and total projected income."
    },
    {
      question: "What are the different membership levels and their benefits?",
      answer: "Silver ($33/month): Basic access to courses and community. Gold ($149/month): Enhanced training and resources. Diamond ($499/month): Premium access with advanced features. All levels support the Help Me Fund and contribute to your commission earnings when recruited through your network."
    }
  ];

  const handleApply = async () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsApplicationOpen(true);
    }, 2000);
  };

  return (
    <>
            <SEO
        title="Partner Your Church - Supernatural Apostolic Partnership"
        description="Join our Supernatural Churches Apostolic Partnership and demonstrate Kingdom power through miraculous ministry. We equip churches with supernatural training and biblical authority."
        canonicalUrl={`${siteUrl}/churchpartnership`}
        image={`${siteUrl}/og-church-partnership.jpg`}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 heading-font">
                Partner Your <span className="text-orange-400">Church</span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
                Join our Supernatural Churches Apostolic Partnership and demonstrate Kingdom power through miraculous ministry.
                We equip churches to be the light of this world through authentic supernatural power and biblical authority.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg max-w-2xl mx-auto mb-8">
                <p className="text-blue-200 text-sm text-center">
                  🎯 <strong>Become a Verified Church:</strong> Your church will be listed as a verified partner under our "Find a Church" tab,
                  showcasing your commitment to supernatural ministry and apostolic partnership.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={handleApply}
                  disabled={isProcessing}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg uppercase tracking-wide transition-all duration-300 rounded-lg shadow-lg hover:shadow-orange-500/25 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Become a Partner'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Supernatural Institute of Ministry Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
              Supernatural Institute of Ministry
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              God's supernatural ministry training believers to be fully equipped for the advancement of the Kingdom of Heaven here on earth. Master signs, wonders, miracles and learn how to apply faith to every aspect of your life—financially, health, and eternally.
            </p>
          </div>


          {/* Church Access Section */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 lg:p-12 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                Church Access
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Church courses are available exclusively to members of partnered churches. Enter your church's affiliate link username to gain access to congregation-specific training materials.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Premium Church Content */}
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-6 w-6 text-yellow-400" />
                  <h4 className="text-xl font-bold text-white">Premium Church Content</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Access discipleship programs, leadership training, and congregation-specific courses designed for church growth.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Discipleship programs for all ages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Leadership training modules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Congregation growth strategies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Ministry activation courses</span>
                  </li>
                </ul>
              </div>

              {/* Church Access Code */}
              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h4 className="text-xl font-bold text-white">Church Access Code</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Enter your church access code to unlock congregation-specific training materials.
                </p>

                <div className="space-y-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    Grant Church Access
                  </button>
                </div>

                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-200 text-sm">
                    <strong>Don't have an access code?</strong><br />
                    Contact your church leader to receive your congregation's access code. These codes give you access to specialized training materials designed specifically for your congregation's growth and development.
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Church Training Materials */}
            <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-purple-400" />
                <h4 className="text-xl font-bold text-white">Custom Church Training Materials</h4>
              </div>
              <p className="text-gray-300 mb-4">
                Partnered churches can upload their own custom training materials for congregation-specific courses.
                Perfect for onboarding new volunteers, teaching church-specific protocols, or delivering specialized ministry training.
              </p>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h5 className="text-purple-300 font-semibold mb-2">How It Works:</h5>
                <ul className="space-y-2 text-purple-200 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Simply sign up for free and access the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Upload your custom training videos and materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>All videos are sent to us for approval before publishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Confidential access - only your congregation can see church-specific content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Perfect for volunteer training, membership classes, or ministry-specific protocols</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-200 text-sm">
                  <strong>Church Partnership Advantage:</strong> This feature demonstrates our commitment to supporting
                  local churches with their unique ministry needs while maintaining quality standards through our approval process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dunamis Power Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
                Bring Dunamis Power to Your Church
              </h2>
              <p className="text-xl text-orange-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                "Dunamis power" (Greek: δύναμις - miraculous power, mighty works, strength - Strong's G1411) -
                not just words, but demonstration. This is Australia's time to rise up with correct doctrine.
                For too long the devil has flooded Australia with twisted lies. We are here to restore order
                to the body of Christ and we prove it with power, as the Kingdom of God is demonstrated in power.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-6 w-6 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">How to heal your congregation</h3>
                </div>
                <p className="text-gray-300">Proven protocols for miracle healing ministry</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Combat doctrines of demons</h3>
                </div>
                <p className="text-gray-300">Identify and dismantle spiritual deception</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Supernatural ministry foundations</h3>
                </div>
                <p className="text-gray-300">Establish powerful Kingdom ministry principles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Partnership Benefits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
              Complete Partnership Benefits
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to transform your church into a supernatural powerhouse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg hover:bg-gray-800/70 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-lg flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Church Responsibilities */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
              Church Responsibilities & Standards
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Clear guidelines for maintaining apostolic integrity and Kingdom standards
            </p>
          </div>

          <div className="space-y-8">
            {churchResponsibilities.map((category, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/40 flex items-center justify-center rounded-full">
                    <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  {category.title}
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      What You CAN Do
                    </h4>
                    <ul className="space-y-2">
                      {category.canDo.map((item, idx) => (
                        <li key={idx} className="text-green-200 flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                      <X className="h-5 w-5" />
                      What You CANNOT Do
                    </h4>
                    <ul className="space-y-2">
                      {category.cannotDo.map((item, idx) => (
                        <li key={idx} className="text-red-200 flex items-start gap-2">
                          <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Benefits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
                Partner Dashboard Features
              </h2>
              <p className="text-xl text-purple-200 mb-8">
                Comprehensive tools and resources available in your partner dashboard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Church Staff Management</h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Upload staff via CSV</li>
                  <li>• Upload congregational members via CSV</li>
                  <li>• Send email invitations</li>
                  <li>• Assign course access</li>
                  <li>• Track staff progress</li>
                  <li>• Monitor sign-up notifications</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-6 w-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Commission Tracking</h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Real-time earnings dashboard</li>
                  <li>• Network visualization</li>
                  <li>• Commission calculators</li>
                  <li>• Payout history</li>
                  <li>• Referral analytics</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Ministry Resources</h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Apostolic training materials</li>
                  <li>• Healing protocols library</li>
                  <li>• Sermon resources</li>
                  <li>• Custom curriculum builder</li>
                  <li>• Live Q&A sessions</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Apostolic Support</h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• 24/7 leadership access</li>
                  <li>• Priority support tickets</li>
                  <li>• Monthly strategy calls</li>
                  <li>• Weekly Live Q&A sessions for pastors</li>
                  <li>• Custom consultation</li>
                  <li>• Crisis intervention</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Ordination & Certification</h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Official ordination certificates</li>
                  <li>• Ministry credentials</li>
                  <li>• Apostolic authority recognition</li>
                  <li>• Professional documentation</li>
                  <li>• Church affiliation status</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">Analytics & Reporting</h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Church growth metrics</li>
                  <li>• Ministry impact reports</li>
                  <li>• Financial performance</li>
                  <li>• Member engagement stats</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How Partnership Works */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
              How Partnership Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple 4-step process to bring Kingdom power to your church
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="h-20 w-20 bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center mx-auto mb-6 rounded-full">
                    <step.icon className="h-10 w-10 text-orange-400" />
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-orange-500/30 transform -translate-y-1/2" />
                  )}
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                  <div className="text-2xl font-bold text-orange-400 mb-2">{step.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Benefits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
                Sustainable Ministry Income
              </h2>
              <p className="text-xl text-green-200 mb-8">
                Build generational wealth through our multi-level commission network while expanding Kingdom impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-400 mb-4">30%</div>
                <div className="text-lg font-semibold text-white mb-2">Direct Referrals</div>
                <div className="text-gray-300">Your immediate network connections</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-400 mb-4">10-1%</div>
                <div className="text-lg font-semibold text-white mb-2">Extended Network</div>
                <div className="text-gray-300">Residual income from your network's growth</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-400 mb-4">∞</div>
                <div className="text-lg font-semibold text-white mb-2">Unlimited Width</div>
                <div className="text-gray-300">No limits on network expansion</div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-green-300 font-semibold mb-2">Commission Payments</h3>
                <p className="text-green-200 mb-4">
                  Monthly payouts processed after 28-day protection period
                </p>
                <p className="text-green-300">
                  Plus access to our Help Me Fund for churches facing financial challenges
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:p-12 text-center">
            <div className="mb-8">
              <div className="text-6xl font-black text-white mb-4">$99</div>
              <div className="text-2xl text-gray-300 mb-6">AUD per month</div>
              <div className="text-lg text-gray-400 mb-8">
                Complete church transformation package with senior leadership oversight, comprehensive training, and ongoing support.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300 mb-8">
                <div>• Free to apply</div>
                <div>• Leadership Course required</div>
                <div>• Cancel anytime</div>
              </div>
            </div>

            <button
              onClick={handleApply}
              disabled={isProcessing}
              className="px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl uppercase tracking-wide transition-all duration-300 rounded-lg shadow-lg hover:shadow-orange-500/25 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin inline mr-2" />
                  Processing...
                </>
              ) : (
                'Partner Your Church'
              )}
            </button>

          </div>
        </div>

        {/* Church Partnership Program Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
              Church Partnership Program
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Complete church transformation package with comprehensive benefits and commission structure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Benefits Column */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Church Partnership Benefits</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-green-500/20 border border-green-500/40 flex items-center justify-center rounded-full">
                    <span className="text-green-400 font-bold text-sm">30%</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Multi-Level Commission Network</p>
                    <p className="text-gray-300 text-sm">Sustainable income from your growing network</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-orange-500/20 border border-orange-500/40 flex items-center justify-center rounded-full">
                    <span className="text-orange-400 font-bold text-sm">$99</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">AUD Monthly Partnership</p>
                    <p className="text-gray-300 text-sm">Complete church transformation package</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Senior Leadership Oversight</h4>
                <p className="text-gray-300 text-sm">24/7 apostolic guidance and mentorship through ticket system</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 mt-4">
                <h4 className="text-white font-semibold mb-2">Complete Ministry Training</h4>
                <p className="text-gray-300 text-sm">Five-fold ministry development and ordination certificates</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 mt-4">
                <h4 className="text-white font-semibold mb-2">Custom Church Training Platform</h4>
                <p className="text-gray-300 text-sm">Upload your own congregation-specific training materials and courses. Members sign up for free and access church-specific content designed for your ministry's unique needs and vision.</p>
              </div>
            </div>

            {/* 7-Level Network Calculator */}
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">7-Level Network Calculator</h3>

              {/* Scenario Buttons */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Quick Scenarios:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {scenarios.map((scenario, index) => (
                    <button
                      key={index}
                      onClick={() => loadScenario(index)}
                      className="p-3 rounded-lg text-left transition-colors bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
                    >
                      <div className="font-semibold">{scenario.name}</div>
                      <div className="text-sm opacity-75">
                        {scenario.churchReferrals} churches, {scenario.silverMembers + scenario.goldMembers + scenario.diamondMembers} members
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 7-Level Input Grid */}
              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">Customize Your Network:</h4>

                <div className="space-y-4">
                  {networkLevels.map((level, levelIndex) => {
                    const levelRate = [0.30, 0.10, 0.05, 0.04, 0.03, 0.02, 0.01][levelIndex];
                    const levelCommission =
                      (level.churches * 99 + level.silver * 33 + level.gold * 149 + level.diamond * 499) * levelRate;

                    return (
                      <div key={levelIndex} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-white font-semibold">
                            Level {levelIndex + 1} ({(levelRate * 100).toFixed(0)}% rate)
                          </span>
                          <span className="text-green-400 font-semibold">
                            ${levelCommission.toFixed(2)}/month
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-gray-300 text-xs mb-1">Churches</label>
                            <input
                              type="number"
                              value={level.churches}
                              onChange={(e) => updateLevel(levelIndex, 'churches', parseInt(e.target.value) || 0)}
                              className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded text-sm focus:border-green-500 focus:outline-none"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 text-xs mb-1">Silver ($33)</label>
                            <input
                              type="number"
                              value={level.silver}
                              onChange={(e) => updateLevel(levelIndex, 'silver', parseInt(e.target.value) || 0)}
                              className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded text-sm focus:border-green-500 focus:outline-none"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 text-xs mb-1">Gold ($149)</label>
                            <input
                              type="number"
                              value={level.gold}
                              onChange={(e) => updateLevel(levelIndex, 'gold', parseInt(e.target.value) || 0)}
                              className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded text-sm focus:border-green-500 focus:outline-none"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 text-xs mb-1">Diamond ($499)</label>
                            <input
                              type="number"
                              value={level.diamond}
                              onChange={(e) => updateLevel(levelIndex, 'diamond', parseInt(e.target.value) || 0)}
                              className="w-full bg-gray-900 border border-gray-600 text-white px-2 py-1 rounded text-sm focus:border-green-500 focus:outline-none"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total Results */}
              <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${calculateCommission().toFixed(2)}
                  </div>
                  <div className="text-gray-300 text-sm">Total Monthly Commission</div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  {networkLevels.map((level, levelIndex) => {
                    const levelRate = [0.30, 0.10, 0.05, 0.04, 0.03, 0.02, 0.01][levelIndex];
                    const levelCommission =
                      (level.churches * 99 + level.silver * 33 + level.gold * 149 + level.diamond * 499) * levelRate;

                    return (
                      <div key={levelIndex} className="flex justify-between">
                        <span className="text-gray-400">Level {levelIndex + 1}:</span>
                        <span className="text-green-400">${levelCommission.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-300 font-semibold mb-2">Commission Structure:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-green-200">
                  <div>• Level 1: 30% (Direct referrals)</div>
                  <div>• Level 2: 10% (Network level 2)</div>
                  <div>• Level 3: 5% (Network level 3)</div>
                  <div>• Level 4: 4% (Network level 4)</div>
                  <div>• Level 5: 3% (Network level 5)</div>
                  <div>• Level 6: 2% (Network level 6)</div>
                  <div>• Level 7: 1% (Network level 7)</div>
                </div>
                <div className="mt-3 pt-3 border-t border-green-500/30">
                  <div className="text-green-200 text-sm">
                    <strong>Monthly payouts</strong> after 28-day protection period • <strong>Unlimited width</strong> per level
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>Customize & Calculate:</strong> Adjust the numbers for each level to see your potential earnings.
                  This demonstrates the true power of the 7-level commission structure.
                  Full commission tracking available in your partner dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Church Partnership vs Individual Membership</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Church Partnership */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-4">Church Partnership ($99/month)</h4>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-white">30% commission on multi-level network</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-white">Senior leadership oversight</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-white">Complete ministry training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-white">Ordination certificates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-white">Congregation discipleship</span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-2xl font-bold text-orange-400">$99 AUD/month</span>
                </div>
              </div>

              {/* Individual Membership */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
                <h4 className="text-xl font-bold text-blue-400 mb-4">Individual Membership ($33-499/month)</h4>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">Tiered commission structure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">Personal spiritual growth</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">Access to courses and community</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">Ministry tools and resources</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">Personal development focus</span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-sm text-gray-400">SILVER $33 • GOLD $149 • DIAMOND $499</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Me Fund Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
                Help Me Fund
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                Supporting ministries and members in times of emergency hardship
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Emergency Ministry Support</h3>
                  <p className="text-gray-300 mb-4">
                    In certain times where a ministry may be struggling, the Help Me Fund is designed to assist in times of emergency should it be required on a case-by-case basis.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Financial assistance for churches facing challenges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Emergency support for ministry operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Case-by-case evaluation and approval</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Fund Source</h3>
                  <p className="text-gray-300">
                    A portion of all funds we receive goes towards this Help Me Fund, available for churches in emergency hardship and our members in emergency hardship.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Win-Win-Win Partnership</h3>
                  <p className="text-gray-300 mb-4">
                    We provide material on how to share this with your church, your new partnership, and how your congregation will benefit. It supports us, it supports you, and it supports them.
                  </p>
                  <p className="text-blue-200 font-semibold">
                    We call this a win-win-win situation:
                  </p>
                  <ul className="space-y-2 text-gray-300 mt-3">
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span><strong>We win:</strong> Help more people get God's word</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span><strong>You win:</strong> Training and finances needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span><strong>They win:</strong> Training to draw closer to God</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Healthy Lifestyle Benefits</h3>
                  <p className="text-gray-300">
                    Your congregation gets the training they need to draw closer to God and they'll live a healthy lifestyle without sickness and disease with our teachings if applied.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
                Help Me Fund - Ministry Support Network
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                A dedicated fund providing emergency financial assistance for churches and members in times of genuine need.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-6 w-6 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">How It Works</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  A portion of all funds received from partnerships and memberships goes directly to the Help Me Fund.
                  This creates a sustainable support network for ministry emergencies.
                </p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Case-by-case emergency assistance</li>
                  <li>• Available for churches facing financial hardship</li>
                  <li>• Support for members in crisis situations</li>
                  <li>• Transparent fund allocation and reporting</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Fund Allocation</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Every partnership and membership contribution helps build this safety net for the ministry community.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Church Partnership ($99/month)</span>
                    <span className="text-green-400">$5/month to fund</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Silver Membership ($33/month)</span>
                    <span className="text-green-400">$2/month to fund</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Gold Membership ($149/month)</span>
                    <span className="text-green-400">$7/month to fund</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Diamond Membership ($499/month)</span>
                    <span className="text-green-400">$25/month to fund</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-blue-300 font-semibold mb-2">Emergency Support Criteria</h3>
                <p className="text-blue-200 text-sm">
                  Assistance is provided on a case-by-case basis for genuine ministry emergencies including natural disasters,
                  unexpected financial hardship, or crisis situations that threaten ministry continuity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sharing Partnership Materials Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
                Share the Partnership - Win-Win-Win
              </h2>
              <p className="text-xl text-orange-200 mb-8">
                We provide comprehensive materials to help you share this life-changing opportunity with your church and community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-lg font-semibold text-white mb-2">We Grow</h3>
                <p className="text-gray-300 text-sm">More people access God's word and supernatural ministry training</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-lg font-semibold text-white mb-2">You Benefit</h3>
                <p className="text-gray-300 text-sm">Financial support and advanced ministry training for your church</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-600/50 p-6 rounded-lg text-center">
                <div className="text-3xl mb-4">🙏</div>
                <h3 className="text-lg font-semibold text-white mb-2">They Transform</h3>
                <p className="text-gray-300 text-sm">Your congregation receives life-changing training and spiritual growth</p>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Available Materials Include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Presentation slides for church meetings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Video testimonials and success stories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>FAQ documents for your congregation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Social media content and graphics</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Email templates for communication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Commission calculator tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Ministry transformation guides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>Success tracking spreadsheets</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-orange-200">
                <strong>This creates a true win-win-win situation:</strong> We help more people get God's word,
                you get the training and finances needed, and your congregation draws closer to God with healthy,
                sickness-free lifestyles through our teachings when applied.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 heading-font">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive answers to help you understand the church partnership program
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`} />
                  </div>
                </button>

                {expandedFaq === index && (
                  <div className="px-6 pb-6 border-t border-gray-700">
                    <p className="text-gray-300 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        {isApplicationOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-6">
                <Church className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Church Partnership Application</h2>
                <p className="text-gray-300">
                  Thank you for your interest in partnering with us! Our team will review your application within 24-48 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <h3 className="text-blue-300 font-semibold mb-2">Next Steps:</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Complete our Leadership Course (free to start)</li>
                    <li>• Submit your church information for review</li>
                    <li>• Receive official ordination certificates</li>
                    <li>• Access complete ministry transformation package</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsApplicationOpen(false)}
                    className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg"
                  >
                    Close
                  </button>
                  <Link
                    to="/academy"
                    className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-center"
                  >
                    Start Leadership Course
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

export default ChurchPartnership;
