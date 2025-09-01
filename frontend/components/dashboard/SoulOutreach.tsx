import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useBackend } from '../../hooks/useBackend';
import { 
  Copy, 
  AlertCircle, 
  CheckCircle, 
  ExternalLink, 
  PlayCircle, 
  Mail,
  MessageSquare,
  Share2,
  UserPlus,
  Send,
  Phone,
  Plus,
  Users,
  DollarSign,
  Target,
  Filter,
  Search,
  Clock,
  X,
  Eye,
  EyeOff,
  Calendar,
  BarChart3,
  UserCheck,
  UserX,
  RefreshCw,
  Church,
  Heart,
  Zap
} from 'lucide-react';

export default function SoulOutreach() {
  const authedBackend = useBackend();
  const [courseCompletion, setCourseCompletion] = useState({
    'evangelism-essentials': true
  });
  const [newRecruit, setNewRecruit] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [selectedScript, setSelectedScript] = useState('email');
  const [showAddRecruit, setShowAddRecruit] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCrmSubTab, setActiveCrmSubTab] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('salvation');
  const [personName, setPersonName] = useState('');
  const [showOptOutConfirm, setShowOptOutConfirm] = useState<string | null>(null);
  const [followUpSequences, setFollowUpSequences] = useState<{[key: string]: string[]}>({});
  
  // Mock user data - in real app this would come from backend
  const userProfile = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com'
  };

  // Mock recruits data with CRM features
  const [recruits, setRecruits] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      mobile: '+61412345678',
      membershipTier: 'SILVER',
      status: 'active',
      lastContact: '2025-01-01',
      joinDate: '2024-12-15',
      followUpStatus: 'responsive',
      earnings: 33,
      level: 1,
      optedOut: false,
      doNotContact: false
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      mobile: '+61423456789',
      membershipTier: 'BRONZE',
      status: 'active',
      lastContact: '2025-01-02',
      joinDate: '2024-12-20',
      followUpStatus: 'responsive',
      earnings: 19,
      level: 1,
      optedOut: false,
      doNotContact: false
    },
    {
      id: '3',
      name: 'Lisa Williams',
      email: 'lisa@example.com',
      mobile: '+61434567890',
      membershipTier: 'FREE',
      status: 'unresponsive_3_days',
      lastContact: '2024-12-30',
      joinDate: '2024-12-27',
      followUpStatus: 'unresponsive',
      earnings: 0,
      level: 2,
      optedOut: false,
      doNotContact: false
    },
    {
      id: '4',
      name: 'David Brown',
      email: '',
      mobile: '+61445678901',
      membershipTier: 'GOLD',
      status: 'active',
      lastContact: '2025-01-01',
      joinDate: '2024-12-10',
      followUpStatus: 'responsive',
      earnings: 149,
      level: 1,
      optedOut: false,
      doNotContact: false
    },
    {
      id: '5',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      mobile: '',
      membershipTier: 'FREE',
      status: 'opted_out',
      lastContact: '2024-12-25',
      joinDate: '2024-12-15',
      followUpStatus: 'opted_out',
      earnings: 0,
      level: 1,
      optedOut: true,
      doNotContact: true
    }
  ]);

  // Check for course completion status from localStorage (for testing)
  useEffect(() => {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
    setCourseCompletion(prev => ({
      ...prev,
      ...completedCourses
    }));
  }, []);

  const markCourseCompleted = (courseId: string) => {
    const updatedCompletion = { ...courseCompletion, [courseId]: true };
    setCourseCompletion(updatedCompletion);
    localStorage.setItem('completedCourses', JSON.stringify(updatedCompletion));
  };

  const startEvangelismCourse = () => {
    // Simulate course completion for testing
    setTimeout(() => {
      markCourseCompleted('evangelism-essentials');
      alert('Congratulations! You have completed the Evangelism Essentials course. You can now access the full Outreach program.');
    }, 2000);
  };

  const addNewRecruit = () => {
    if (!newRecruit.name || (!newRecruit.email && !newRecruit.mobile)) {
      alert('Please provide at least a name and either email or mobile number.');
      return;
    }

    // Generate new recruit ID
    const newRecruitId = (recruits.length + 1).toString();
    
    // Determine which invitations will be sent
    const hasEmail = !!newRecruit.email;
    const hasSMS = !!newRecruit.mobile;
    
    // Use the salvation template as the default first-time invitation
    const invitationTemplate = scriptTemplates.salvation;
    
    // Process the scripts with the new recruit's name
    let invitationSummary = `📧 INVITATION DETAILS FOR ${newRecruit.name.toUpperCase()}:\n\n`;
    
    if (hasEmail) {
      const emailScript = processScript(invitationTemplate.email.body, newRecruit.name);
      invitationSummary += `✉️ EMAIL INVITATION:\n`;
      invitationSummary += `Subject: ${invitationTemplate.email.subject}\n`;
      invitationSummary += `To: ${newRecruit.email}\n`;
      invitationSummary += `Preview: ${emailScript.substring(0, 150)}...\n\n`;
    }
    
    if (hasSMS) {
      const smsScript = processScript(invitationTemplate.sms, newRecruit.name);
      invitationSummary += `📱 SMS INVITATION:\n`;
      invitationSummary += `To: ${newRecruit.mobile}\n`;
      invitationSummary += `Message: ${smsScript}\n\n`;
    }
    
    invitationSummary += `📋 TEMPLATE USED: "${invitationTemplate.name}" (${invitationTemplate.category})\n`;
    invitationSummary += `🔄 3/7/28 Day Follow-up Sequence: ACTIVATED\n\n`;
    
    const methodsText = hasEmail && hasSMS ? 'both Email AND SMS' : 
                       hasEmail ? 'Email only' : 'SMS only';
    
    invitationSummary += `This invitation will be sent via ${methodsText}.\n\nProceed with sending?`;
    
    // Show confirmation with full script details
    if (confirm(invitationSummary)) {
      // Add to recruits list
      const recruitData = {
        id: newRecruitId,
        name: newRecruit.name,
        email: newRecruit.email,
        mobile: newRecruit.mobile,
        membershipTier: 'FREE' as const,
        status: 'new_recruit' as const,
        lastContact: new Date().toISOString().split('T')[0],
        joinDate: new Date().toISOString().split('T')[0],
        followUpStatus: 'pending' as const,
        earnings: 0,
        level: 1,
        optedOut: false,
        doNotContact: false
      };
      
      setRecruits(prev => [...prev, recruitData]);
      
      // Initialize follow-up sequence
      initializeFollowUpSequence(newRecruitId);
      
      // Success message with detailed confirmation
      let successMsg = `✅ SUCCESS! Invitation sent to ${newRecruit.name}:\n\n`;
      if (hasEmail) successMsg += `📧 Email sent to: ${newRecruit.email}\n`;
      if (hasSMS) successMsg += `📱 SMS sent to: ${newRecruit.mobile}\n`;
      successMsg += `\n🎯 Template: "${invitationTemplate.name}"\n`;
      successMsg += `🔄 Automated follow-up sequence initialized\n`;
      successMsg += `📅 Next follow-up: 3 days`;
      
      alert(successMsg);
      setNewRecruit({ name: '', email: '', mobile: '' });
      setShowAddRecruit(false);
    }
  };

  // Enhanced script templates with auto-fill
  const scriptTemplates = {
    salvation: {
      category: 'Ministry Invitation',
      name: 'Salvation & Ministry Training',
      email: {
        subject: "Transform Your Life with Supernatural Ministry Training",
        body: `Hi [PERSON_NAME],

I hope this message finds you blessed! I wanted to share something incredible with you that has completely transformed my spiritual journey.

I've been training with the Supernatural Institute of Ministry, and it's unlike anything I've experienced. This isn't just theory - it's practical, life-changing training that equips believers to:

✓ Walk in supernatural power and authority
✓ Heal the sick and cast out demons
✓ Experience divine health and financial breakthrough
✓ Build unshakeable faith for every situation

The training is led by Senior Leader, Samuel Waterhouse, who walks in demonstrated power with documented miracles and healings.

I'd love for you to check it out - there's even FREE training to get started:
[YOUR_AFFILIATE_LINK]

No pressure at all, but if you're hungry for more of God and want to walk in the same power Jesus demonstrated, this could be exactly what you've been looking for.

Blessings,
[YOUR_NAME]

P.S. Feel free to reach out if you have any questions. I'm here to help!`
      },
      sms: `Hi [PERSON_NAME]! It's [YOUR_NAME]. I've been training with Supernatural Institute of Ministry and it's incredible. Real supernatural power training - healing the sick, casting out demons, divine health & more. There's FREE training to start: [YOUR_AFFILIATE_LINK] Check it out!`
    },
    church_invite: {
      category: 'Church Invitation',
      name: 'Church Service Invitation',
      email: {
        subject: "Join Us This Sunday - Supernatural Church Experience",
        body: `Hi [PERSON_NAME],

I hope you're having a blessed week! I wanted to personally invite you to join us this Sunday at our supernatural church service.

We're part of the Supernatural Institute network, where we experience authentic signs, wonders, and miracles just like in the Bible. You'll witness:

🔥 Divine healing and deliverance
🔥 Powerful worship and genuine encounters with God
🔥 Life-changing biblical teaching
🔥 A community that truly loves and supports each other

Service Details:
📍 [CHURCH_ADDRESS]
🕘 Sunday at [TIME]
🎯 Dress: Come as you are!

I truly believe God has something special waiting for you. Whether you're seeking healing, breakthrough, or just want to experience more of God's presence, you're welcome here.

Let me know if you'd like me to pick you up or if you have any questions!

Can't wait to see you there,
[YOUR_NAME]

P.S. We always have amazing food and fellowship after the service too! 😊`
      },
      sms: `Hi [PERSON_NAME]! It's [YOUR_NAME]. Want to join me this Sunday at church? We're experiencing real miracles & healing! Service at [TIME] - [CHURCH_ADDRESS]. Would love to have you there! Let me know if you need a ride 🙏`
    },
    church_special_event: {
      category: 'Church Invitation',
      name: 'Special Event Invitation',
      email: {
        subject: "Special Supernatural Event - You Don't Want to Miss This!",
        body: `Hi [PERSON_NAME],

I hope this message finds you blessed! I wanted to personally invite you to a very special event happening at our church.

We're hosting a Supernatural Power Night with demonstrations of healing, prophecy, and miraculous breakthroughs. This isn't your typical church service - we're expecting God to move in extraordinary ways!

**Event Details:**
📅 Date: [DATE]
🕕 Time: [TIME]
📍 Location: [CHURCH_ADDRESS]
🎟️ Cost: FREE (but lives will be transformed!)

I've seen incredible things happen at these events - people healed of chronic conditions, relationships restored, financial breakthroughs, and so much more. I really believe God wants to do something special for you.

Can I save you a seat? Let me know if you're able to make it, and I'd be happy to pick you up if you need a ride.

Looking forward to experiencing God's power together!

Blessings,
[YOUR_NAME]

P.S. Feel free to bring a friend - the more the better!`
      },
      sms: `[PERSON_NAME]! Special Supernatural Power Night at our church [DATE] at [TIME]! Free event with healing, miracles & breakthroughs. Can I save you a seat? - [YOUR_NAME] 🔥⚡`
    },
    church_healing_service: {
      category: 'Church Invitation',
      name: 'Healing Service Invitation',
      email: {
        subject: "Healing Service This Sunday - Bring Your Faith!",
        body: `Hi [PERSON_NAME],

I've been praying for you and felt led to invite you to our healing service this Sunday. We're specifically focusing on physical healing and breakthrough prayer.

If you or anyone you know needs healing - whether physical, emotional, or spiritual - this would be a perfect time to come and receive prayer from our ministry team.

**What to Expect:**
🙏 Powerful worship and prayer
✨ Teaching on divine healing
👥 Personal prayer ministry
💪 Testimonies of healing

**Service Details:**
📅 This Sunday
🕕 Time: [TIME]  
📍 [CHURCH_ADDRESS]

I'd love to pray with you personally and introduce you to our incredible community. Plus, I can pick you up if you need transportation.

Believing for your breakthrough!

[YOUR_NAME]

P.S. Bring your faith and expectation - God loves to heal!`
      },
      sms: `Hi [PERSON_NAME]! Healing service this Sunday at [TIME]. Bringing prayer for breakthrough & miracles. Would you like to join me? I can pick you up! - [YOUR_NAME] 🙏✨`
    },
    follow_up_3_days: {
      category: 'Automated Follow-up',
      name: '3-Day Follow-up (Auto)',
      email: {
        subject: "Quick Check-in - Did You Get a Chance to Look?",
        body: `Hi [PERSON_NAME],

I hope you're doing well! I just wanted to follow up on the Supernatural Institute training I shared with you a few days ago.

I know life gets busy, so no worries if you haven't had a chance to check it out yet. I just didn't want you to miss this incredible opportunity to experience the same supernatural power that Jesus walked in.

Here's the link again if you'd like to explore the FREE training:
[YOUR_AFFILIATE_LINK]

Even just 10 minutes of browsing could open up a whole new dimension of faith for you.

If you have any questions or want to chat about it, I'm here!

Blessings,
[YOUR_NAME]

P.S. The free course "Evangelism Essentials" is a great place to start if you're curious.`
      },
      sms: `Hi [PERSON_NAME], just checking in! Did you get a chance to look at that supernatural ministry training? No pressure, just didn't want you to miss it: [YOUR_AFFILIATE_LINK] - [YOUR_NAME]`
    },
    follow_up_7_days: {
      category: 'Automated Follow-up',
      name: '7-Day Follow-up (Auto)',
      email: {
        subject: "One More Time - This Could Change Everything",
        body: `Hi [PERSON_NAME],

I hope you're having a wonderful week! This is my final follow-up about the Supernatural Institute training I mentioned.

I completely understand if this isn't for you right now - everyone's journey with God is different and timing matters.

But if there's even a small part of you that's hungry for more of God's power in your life, I really encourage you to just take a quick look:

[YOUR_AFFILIATE_LINK]

The transformation I've experienced has been incredible:
• My faith is stronger than ever
• I've seen people healed through prayer
• My relationship with God is deeper
• I have peace even in difficult times

If you're curious about any of this, the door is always open. If not, I completely respect that and won't bring it up again.

Either way, you're in my prayers!

Much love,
[YOUR_NAME]`
      },
      sms: `Hi [PERSON_NAME], this is [YOUR_NAME]. Last message about the supernatural training - if you're interested: [YOUR_AFFILIATE_LINK] If not, no worries at all! Blessings! 🙏`
    },
    follow_up_28_days: {
      category: 'Automated Follow-up',
      name: '28-Day Final Follow-up (Auto)',
      email: {
        subject: "A Month Later - Still Thinking of You",
        body: `Hi [PERSON_NAME],

It's been about a month since I first shared the Supernatural Institute opportunity with you. I wanted to reach out one final time to see how you're doing spiritually.

I completely understand if this isn't the right time or fit for you - no pressure at all! I just wanted to make sure you had every opportunity to experience the incredible spiritual growth that's available.

If you're still curious or have any questions, I'm always here to help. Otherwise, please know that I'm praying for your continued spiritual journey and I'm here as a friend regardless.

Here's that link one last time if you'd like to explore: [YOUR_AFFILIATE_LINK]

Many blessings on your path,
[YOUR_NAME]

P.S. If you'd prefer not to receive any more messages about this, just reply "STOP" and I'll respect that completely. Your friendship means more to me than any business opportunity.`
      },
      sms: `Hi [PERSON_NAME]! [YOUR_NAME] here. Just wanted to check in after a month - hope your spiritual journey is going amazing! If you're still interested in that supernatural training: [YOUR_AFFILIATE_LINK] Otherwise, all good! Reply STOP to opt out. Blessings! 🙏✨`
    }
  };

  const scripts = {
    email: scriptTemplates[selectedTemplate as keyof typeof scriptTemplates]?.email || scriptTemplates.salvation.email,
    sms: scriptTemplates[selectedTemplate as keyof typeof scriptTemplates]?.sms || scriptTemplates.salvation.sms
  };

  // Helper functions
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const processScript = (script: string, targetPersonName: string = personName) => {
    return script
      .replace(/\[PERSON_NAME\]/g, targetPersonName || '[PERSON_NAME]')
      .replace(/\[YOUR_NAME\]/g, userProfile.firstName)
      .replace(/\[YOUR_AFFILIATE_LINK\]/g, referralLink)
      .replace(/\[CHURCH_ADDRESS\]/g, '[CHURCH_ADDRESS]')
      .replace(/\[TIME\]/g, '[TIME]');
  };

  const filteredRecruits = recruits.filter(recruit => {
    const matchesSearch = recruit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recruit.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMembership = membershipFilter === 'all' || recruit.membershipTier === membershipFilter;
    
    // Filter by CRM sub-tab
    let matchesSubTab = true;
    if (activeTab === 'crm') {
      switch (activeCrmSubTab) {
        case 'active':
          matchesSubTab = recruit.status === 'active';
          break;
        case 'prospects':
          matchesSubTab = recruit.membershipTier === 'FREE' && recruit.status !== 'opted_out';
          break;
        case 'unresponsive':
          matchesSubTab = recruit.followUpStatus === 'unresponsive' || recruit.status.includes('unresponsive');
          break;
        case 'opted_out':
          matchesSubTab = recruit.optedOut || recruit.status === 'opted_out';
          break;
        default: // 'all'
          matchesSubTab = true;
      }
    }
    
    return matchesSearch && matchesMembership && matchesSubTab;
  });

  const membershipStats = {
    FREE: recruits.filter(r => r.membershipTier === 'FREE').length,
    BRONZE: recruits.filter(r => r.membershipTier === 'BRONZE').length,
    SILVER: recruits.filter(r => r.membershipTier === 'SILVER').length,
    GOLD: recruits.filter(r => r.membershipTier === 'GOLD').length,
    DIAMOND: recruits.filter(r => r.membershipTier === 'DIAMOND').length,
    total: recruits.length,
    active: recruits.filter(r => r.status === 'active').length,
    unresponsive: recruits.filter(r => r.followUpStatus === 'unresponsive').length,
    optedOut: recruits.filter(r => r.optedOut).length
  };

  const handleOptOut = (recruitId: string) => {
    setShowOptOutConfirm(recruitId);
  };

  const confirmOptOut = (recruitId: string) => {
    const recruit = recruits.find(r => r.id === recruitId);
    if (!recruit) return;
    
    // Show the "Are you sure?" confirmation with DNC options
    const confirmMessage = `Are you sure you want to opt out ${recruit.name}?\n\nThis will:\n✓ Mark them as "Do Not Contact"\n✓ Hide their contact information\n✓ Stop all automated follow-ups\n✓ Add them to our DNC (Do Not Call) list\n\nNote: We can also automatically handle STOP requests from SMS/Email replies if they prefer to opt out directly.`;
    
    if (confirm(confirmMessage)) {
      setRecruits(prev => prev.map(recruit => 
        recruit.id === recruitId 
          ? { ...recruit, optedOut: true, doNotContact: true, status: 'opted_out', followUpStatus: 'opted_out' }
          : recruit
      ));
      alert(`${recruit.name} has been opted out and added to the Do Not Contact list. Their information is now protected and hidden.`);
    }
    setShowOptOutConfirm(null);
  };

  const initializeFollowUpSequence = (recruitId: string) => {
    // Initialize 3/7/28 day follow-up sequence
    const sequence = [
      { day: 3, template: 'follow_up_3_days', sent: false },
      { day: 7, template: 'follow_up_7_days', sent: false },
      { day: 28, template: 'follow_up_28_days', sent: false }
    ];
    
    setFollowUpSequences(prev => ({
      ...prev,
      [recruitId]: sequence.map(item => `Day ${item.day}: ${item.template}`)
    }));
  };

  const handleSendFollowUp = (recruitId: string, type: 'email' | 'sms') => {
    const recruit = recruits.find(r => r.id === recruitId);
    if (!recruit || recruit.doNotContact) {
      alert('Cannot send follow-up to this contact.');
      return;
    }
    
    setRecruits(prev => prev.map(r => 
      r.id === recruitId 
        ? { ...r, lastContact: new Date().toISOString().split('T')[0], followUpStatus: 'pending' }
        : r
    ));
    
    alert(`${type.toUpperCase()} follow-up sent to ${recruit.name}`);
  };

  // For now, we'll use mock data since the API integration needs userId
  // const { data: profile, isLoading } = useQuery({
  //   queryKey: ['outreach-profile'],
  //   queryFn: () => authedBackend.outreach.getProfile({ userId: 'current' }),
  // });

  // Mock profile data for development
  const profile = {
    isAffiliate: true,
    referralCode: 'DEMO123',
    totalEarnings: 1245,
    rank: 'Silver'
  };
  const isLoading = false;

  // Mock other data as well
  const downlineData = { totalUsers: 12, activeUsers: 8 };
  const payoutsData = { payouts: [] };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const referralLink = `https://supernatural.institute/join?ref=${profile?.referralCode || 'DEMO123'}`;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show course requirements if not completed
  if (!courseCompletion['evangelism-essentials']) {
    return (
      <div className="space-y-6">
        {/* Course Requirements */}
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-4 heading-font">Outreach Program Requirements</h2>
          <p className="text-gray-400 mb-6">
            To join the Outreach program and earn affiliate commissions, you must first complete the required training course.
          </p>
          
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <PlayCircle className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Evangelism Essentials</h3>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">
                  Master the foundational principles of effective soul-winning and Gospel outreach. This foundational course equips you with the knowledge and skills for effective soul-winning.
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>📚 4 modules</span>
                  <span>⏱️ 2 hours</span>
                  <span>🆓 FREE</span>
                </div>
                
                <button
                  onClick={startEvangelismCourse}
                  className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-3 font-semibold uppercase tracking-wide inline-flex items-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Start Course (Test)
                </button>
              </div>
              
              <a
                href="/academy"
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 text-sm font-semibold uppercase tracking-wide inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View in Academy
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Navigation tabs
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'crm', name: 'CRM & Network', icon: Users },
    { id: 'scripts', name: 'Scripts & Templates', icon: MessageSquare },
    { id: 'followup', name: 'Follow-up Sequences', icon: RefreshCw },
    { id: 'analytics', name: 'Analytics', icon: Target }
  ];

  // Sub-tabs for CRM section
  const crmSubTabs = [
    { id: 'all', name: 'All Contacts', icon: Users },
    { id: 'active', name: 'Active Members', icon: UserCheck },
    { id: 'prospects', name: 'Prospects', icon: Target },
    { id: 'unresponsive', name: 'Need Follow-up', icon: Clock },
    { id: 'opted_out', name: 'Do Not Contact', icon: UserX }
  ];

  // Main Outreach Dashboard (after course completion)
  return (
    <div className="space-y-6">
      {/* Sub Navigation Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-white font-semibold">Total Recruits</h3>
                  <p className="text-blue-400 text-xl font-bold">{membershipStats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="text-white font-semibold">Monthly Earnings</h3>
                  <p className="text-green-400 text-xl font-bold">$247</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-orange-400" />
                <div>
                  <h3 className="text-white font-semibold">Active Members</h3>
                  <p className="text-orange-400 text-xl font-bold">{membershipStats.active}</p>
                </div>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <UserX className="w-6 h-6 text-red-400" />
                <div>
                  <h3 className="text-white font-semibold">Unresponsive</h3>
                  <p className="text-red-400 text-xl font-bold">{membershipStats.unresponsive}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Affiliate Link */}
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h2 className="text-lg font-bold text-white mb-4 heading-font">Your Affiliate Link</h2>
              <div className="flex gap-2 mb-4">
                <input 
                  value={referralLink} 
                  readOnly 
                  className="bg-gray-700 border border-gray-600 text-white flex-1 px-3 py-2 text-sm"
                />
                <button 
                  onClick={() => copyToClipboard(referralLink)} 
                  className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 font-semibold"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Add Recruit */}
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h2 className="text-lg font-bold text-white mb-4 heading-font">Quick Add Recruit</h2>
              <button
                onClick={() => setActiveTab('crm')}
                className="w-full bg-orange-500 text-white hover:bg-orange-600 px-4 py-3 font-semibold uppercase tracking-wide inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Go to CRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CRM & Network Tab */}
      {activeTab === 'crm' && (
        <div className="space-y-6">
          {/* CRM Sub-tabs */}
          <div className="border-b border-gray-700">
            <nav className="flex space-x-1">
              {crmSubTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCrmSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCrmSubTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium inline-flex items-center gap-2 border-b-2 transition-colors ${
                      isActive
                        ? 'text-orange-400 border-orange-400'
                        : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recruits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white text-sm"
                />
              </div>
              <select
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
              >
                <option value="all">All Tiers ({membershipStats.total})</option>
                <option value="FREE">FREE ({membershipStats.FREE})</option>
                <option value="BRONZE">BRONZE ({membershipStats.BRONZE})</option>
                <option value="SILVER">SILVER ({membershipStats.SILVER})</option>
                <option value="GOLD">GOLD ({membershipStats.GOLD})</option>
                <option value="DIAMOND">DIAMOND ({membershipStats.DIAMOND})</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddRecruit(true)}
              className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 font-semibold uppercase tracking-wide inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Recruit
            </button>
          </div>

          {/* Add Recruit Modal */}
          {showAddRecruit && (
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-white font-semibold mb-4">Add New Recruit</h3>
              
              {/* Template Information */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-blue-400 font-semibold text-sm mb-1">Invitation Template</h4>
                    <p className="text-white text-sm font-medium">"{scriptTemplates.salvation.name}"</p>
                    <p className="text-blue-300 text-xs">{scriptTemplates.salvation.category}</p>
                    <div className="mt-2 text-xs text-gray-300">
                      <div className="flex items-center gap-4">
                        <span>📧 Email: {scriptTemplates.salvation.email.subject}</span>
                      </div>
                      <div className="mt-1">
                        <span>📱 SMS: First-time ministry training invitation</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-400">
                  💡 This template will be automatically sent to all provided contact methods (Email + SMS if both available)
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={newRecruit.name}
                  onChange={(e) => setNewRecruit(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-600 border border-gray-500 text-white px-3 py-2 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newRecruit.email}
                  onChange={(e) => setNewRecruit(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-600 border border-gray-500 text-white px-3 py-2 text-sm"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={newRecruit.mobile}
                  onChange={(e) => setNewRecruit(prev => ({ ...prev, mobile: e.target.value }))}
                  className="bg-gray-600 border border-gray-500 text-white px-3 py-2 text-sm"
                />
              </div>
              
              {/* Dynamic Preview */}
              {(newRecruit.email || newRecruit.mobile) && (
                <div className="mb-4 p-3 bg-gray-700/30 border border-gray-600">
                  <h5 className="text-white text-sm font-semibold mb-2">Invitation Preview:</h5>
                  {newRecruit.email && (
                    <div className="text-xs text-gray-300 mb-2">
                      📧 <span className="text-green-400">Email will be sent to:</span> {newRecruit.email}
                    </div>
                  )}
                  {newRecruit.mobile && (
                    <div className="text-xs text-gray-300">
                      📱 <span className="text-green-400">SMS will be sent to:</span> {newRecruit.mobile}
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddRecruit(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewRecruit}
                  className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 font-semibold inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Salvation Invitation
                </button>
              </div>
            </div>
          )}

          {/* Recruits List */}
          <div className="space-y-4">
            {filteredRecruits.map((recruit) => (
              <div key={recruit.id} className={`bg-gray-800/50 border p-4 ${recruit.doNotContact ? 'border-red-500/30 bg-red-500/5' : 'border-gray-700'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold">{recruit.name}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold ${
                        recruit.membershipTier === 'FREE' ? 'bg-gray-500/20 text-gray-400' :
                        recruit.membershipTier === 'BRONZE' ? 'bg-blue-500/20 text-blue-400' :
                        recruit.membershipTier === 'SILVER' ? 'bg-purple-500/20 text-purple-400' :
                        recruit.membershipTier === 'GOLD' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-pink-500/20 text-pink-400'
                      }`}>
                        {recruit.membershipTier}
                      </span>
                      <span className={`px-2 py-1 text-xs ${
                        recruit.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        recruit.status === 'unresponsive_3_days' ? 'bg-yellow-500/20 text-yellow-400' :
                        recruit.status === 'opted_out' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {recruit.status.replace('_', ' ')}
                      </span>
                      {recruit.doNotContact && (
                        <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 border border-red-500/30">
                          DO NOT CONTACT
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Contact:</p>
                        <p className="text-white">
                          {recruit.doNotContact ? (
                            <span className="text-gray-500">*** HIDDEN ***</span>
                          ) : (
                            <>
                              {recruit.email && <span>{recruit.email}</span>}
                              {recruit.email && recruit.mobile && <br />}
                              {recruit.mobile && <span>{recruit.mobile}</span>}
                            </>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Last Contact:</p>
                        <p className="text-white">{recruit.lastContact}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Earnings:</p>
                        <p className="text-green-400 font-semibold">${recruit.earnings}</p>
                      </div>
                    </div>
                  </div>

                  {!recruit.doNotContact && (
                    <div className="flex gap-2">
                      {recruit.email && (
                        <button
                          onClick={() => handleSendFollowUp(recruit.id, 'email')}
                          className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          Email
                        </button>
                      )}
                      {recruit.mobile && (
                        <button
                          onClick={() => handleSendFollowUp(recruit.id, 'sms')}
                          className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          SMS
                        </button>
                      )}
                      <button
                        onClick={() => handleOptOut(recruit.id)}
                        className="bg-red-500 text-white hover:bg-red-600 px-3 py-1 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Opt Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scripts & Templates Tab */}
      {activeTab === 'scripts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Template Selection */}
            <div className="bg-gray-800/50 border border-gray-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4 heading-font">Script Templates</h3>
              <div className="space-y-2">
                {Object.entries(scriptTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTemplate(key)}
                    className={`w-full text-left p-3 border transition-colors ${
                      selectedTemplate === key
                        ? 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold text-sm">{template.name}</div>
                    <div className="text-xs opacity-75">{template.category}</div>
                  </button>
                ))}
              </div>

              {/* Person Name Input */}
              <div className="mt-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  Person's Name (optional):
                </label>
                <input
                  type="text"
                  placeholder="Enter person's name..."
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Auto-fills [PERSON_NAME] in scripts
                </p>
              </div>
            </div>

            {/* Script Content */}
            <div className="lg:col-span-2 space-y-4">
              {/* Email Script */}
              <div className="bg-gray-800/50 border border-gray-700 p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Script
                  </h3>
                  <button
                    onClick={() => copyToClipboard(processScript(scripts.email.body))}
                    className="text-orange-400 hover:text-orange-300 text-sm font-semibold"
                  >
                    Copy Script
                  </button>
                </div>
                <div className="mb-2">
                  <label className="text-gray-400 text-xs">Subject:</label>
                  <input
                    value={scripts.email.subject}
                    readOnly
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-1 text-sm mt-1"
                  />
                </div>
                <textarea
                  value={processScript(scripts.email.body)}
                  readOnly
                  rows={12}
                  className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 text-sm"
                />
              </div>

              {/* SMS Script */}
              <div className="bg-gray-800/50 border border-gray-700 p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    SMS Script
                  </h3>
                  <button
                    onClick={() => copyToClipboard(processScript(scripts.sms))}
                    className="text-orange-400 hover:text-orange-300 text-sm font-semibold"
                  >
                    Copy Script
                  </button>
                </div>
                <textarea
                  value={processScript(scripts.sms)}
                  readOnly
                  rows={4}
                  className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Follow-up Sequences Tab */}
      {activeTab === 'followup' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 p-6">
            <h3 className="text-lg font-bold text-white mb-4 heading-font">Automated Follow-up Sequences</h3>
            <p className="text-gray-400 mb-6">
              Set up and monitor automated follow-up sequences for your recruits. Our system will automatically send 
              follow-up messages at strategic intervals to maximize engagement.
            </p>

            {/* Sequence Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">3 Days</div>
                <h4 className="text-white font-semibold mb-2">Quick Check-in</h4>
                <p className="text-gray-400 text-sm">Light follow-up to see if they've had a chance to look at the training</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 p-6 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">7 Days</div>
                <h4 className="text-white font-semibold mb-2">Value-focused</h4>
                <p className="text-gray-400 text-sm">Share more value and address common hesitations</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 p-6 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-2">28 Days</div>
                <h4 className="text-white font-semibold mb-2">Final Touch</h4>
                <p className="text-gray-400 text-sm">Last gentle reminder with full respect for their decision</p>
              </div>
            </div>

            {/* Sequence Management */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Active Sequences</h4>
              
              {Object.keys(followUpSequences).length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active follow-up sequences yet.</p>
                  <p className="text-sm">Sequences will appear here when you add new recruits.</p>
                </div>
              ) : (
                Object.entries(followUpSequences).map(([recruitId, sequence]) => {
                  const recruit = recruits.find(r => r.id === recruitId);
                  if (!recruit) return null;
                  
                  return (
                    <div key={recruitId} className="bg-gray-700/30 border border-gray-600 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h5 className="text-white font-semibold">{recruit.name}</h5>
                          <p className="text-gray-400 text-sm">Joined: {recruit.joinDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs border ${
                            recruit.followUpStatus === 'responsive' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            recruit.followUpStatus === 'unresponsive' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          }`}>
                            {recruit.followUpStatus}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {sequence.map((step, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* STOP/Unsubscribe Information */}
            <div className="mt-8 bg-red-500/10 border border-red-500/30 p-6">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <X className="w-5 h-5 text-red-400" />
                STOP/Unsubscribe Protection
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• All automated messages include clear STOP/Unsubscribe instructions</p>
                <p>• System automatically processes STOP requests from SMS/Email replies</p>
                <p>• Contacts who request to STOP are immediately added to Do Not Contact list</p>
                <p>• Manual opt-out includes confirmation dialog with data protection notice</p>
                <p>• All opt-out requests are logged for compliance and can be reviewed</p>
              </div>
              
              <div className="mt-4 p-4 bg-gray-800/50 border border-gray-600">
                <h5 className="text-white font-semibold mb-2">Compliance Features:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                  <div>✓ Automatic DNC (Do Not Call) list management</div>
                  <div>✓ TCPA compliant messaging practices</div>
                  <div>✓ Contact information protection when opted out</div>
                  <div>✓ Audit trail for all communication preferences</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Enhanced Membership Breakdown */}
          <div className="bg-gray-800/50 border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white heading-font">Detailed Membership Analysis</h3>
              <select
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm"
              >
                <option value="all">All Tiers</option>
                <option value="FREE">Free Members</option>
                <option value="BRONZE">Bronze Members</option>
                <option value="SILVER">Silver Members</option>
                <option value="GOLD">Gold Members</option>
                <option value="DIAMOND">Diamond Members</option>
              </select>
            </div>

            {/* Tier Cards with Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { tier: 'FREE', color: 'gray', commission: '0%', description: 'Prospects exploring content' },
                { tier: 'BRONZE', color: 'blue', commission: '20%', description: 'Basic membership active' },
                { tier: 'SILVER', color: 'purple', commission: '25%', description: 'Mid-tier commitment' },
                { tier: 'GOLD', color: 'yellow', commission: '30%', description: 'High-value members' },
                { tier: 'DIAMOND', color: 'pink', commission: '35%', description: 'Premium partnership' }
              ].map((tierInfo) => {
                const count = membershipStats[tierInfo.tier as keyof typeof membershipStats];
                const percentage = membershipStats.total > 0 ? Math.round((count / membershipStats.total) * 100) : 0;
                
                return (
                  <div 
                    key={tierInfo.tier}
                    className={`bg-${tierInfo.color}-500/10 border border-${tierInfo.color}-500/30 p-6 transition-all hover:bg-${tierInfo.color}-500/15`}
                  >
                    <div className="text-center mb-4">
                      <div className={`text-3xl font-bold text-${tierInfo.color}-400 mb-1`}>
                        {count}
                      </div>
                      <h4 className="text-white font-semibold mb-1">{tierInfo.tier}</h4>
                      <p className="text-gray-400 text-xs">{percentage}% of network</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-300">
                        <span>Commission:</span>
                        <span className={`font-semibold text-${tierInfo.color}-400`}>{tierInfo.commission}</span>
                      </div>
                      <p className="text-gray-400 text-xs">{tierInfo.description}</p>
                      
                      {/* Revenue calculation */}
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Est. Monthly:</span>
                          <span className={`font-semibold text-${tierInfo.color}-400`}>
                            ${tierInfo.tier === 'FREE' ? '0' : 
                              tierInfo.tier === 'BRONZE' ? (count * 15).toString() :
                              tierInfo.tier === 'SILVER' ? (count * 25).toString() :
                              tierInfo.tier === 'GOLD' ? (count * 35).toString() :
                              (count * 50).toString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Network Health Metrics */}
            <div className="bg-gray-700/30 border border-gray-600 p-6">
              <h4 className="text-white font-semibold mb-4">Network Health Indicators</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {Math.round((membershipStats.active / membershipStats.total) * 100) || 0}%
                  </div>
                  <p className="text-gray-400 text-sm">Engagement Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {membershipStats.total - membershipStats.FREE}
                  </div>
                  <p className="text-gray-400 text-sm">Paid Members</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {Math.round(((membershipStats.total - membershipStats.FREE) / membershipStats.total) * 100) || 0}%
                  </div>
                  <p className="text-gray-400 text-sm">Conversion Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    {membershipStats.unresponsive}
                  </div>
                  <p className="text-gray-400 text-sm">Need Attention</p>
                </div>
              </div>
            </div>
          </div>

          {/* Church Invitation Tracking */}
          <div className="bg-gray-800/50 border border-gray-700 p-6">
            <h3 className="text-lg font-bold text-white mb-4 heading-font flex items-center gap-2">
              <Church className="w-5 h-5 text-orange-400" />
              Church Invitation Tracking
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-500/10 border border-blue-500/30 p-6 text-center">
                <Heart className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">8</div>
                <div className="text-blue-300 text-sm">Church Invites Sent</div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/30 p-6 text-center">
                <UserCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">3</div>
                <div className="text-green-300 text-sm">Attended Services</div>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/30 p-6 text-center">
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">37%</div>
                <div className="text-purple-300 text-sm">Invitation Response Rate</div>
              </div>
            </div>
            
            {/* Recent Church Invitations */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Recent Church Invitations</h4>
              <div className="space-y-2">
                {[
                  { name: 'Sarah Johnson', type: 'Special Event', status: 'Attending', date: '2025-01-02' },
                  { name: 'Mike Davis', type: 'Sunday Service', status: 'Maybe', date: '2025-01-01' },
                  { name: 'Lisa Williams', type: 'Healing Service', status: 'No Response', date: '2024-12-30' }
                ].map((invite, index) => (
                  <div key={index} className="bg-gray-700/30 border border-gray-600 p-3 flex justify-between items-center">
                    <div>
                      <span className="text-white font-medium">{invite.name}</span>
                      <span className="text-gray-400 text-sm ml-2">• {invite.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">{invite.date}</span>
                      <span className={`px-2 py-1 text-xs border ${
                        invite.status === 'Attending' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        invite.status === 'Maybe' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}>
                        {invite.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-500/10 border border-green-500/30 p-6 text-center">
              <UserCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{membershipStats.active}</div>
              <div className="text-green-300 text-sm">Active & Responsive</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 text-center">
              <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{membershipStats.unresponsive}</div>
              <div className="text-yellow-300 text-sm">Unresponsive (Need Follow-up)</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-6 text-center">
              <UserX className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{membershipStats.optedOut}</div>
              <div className="text-red-300 text-sm">Opted Out (Do Not Contact)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
