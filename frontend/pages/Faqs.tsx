import React, { useState, useMemo } from 'react';
import { Filter, ChevronDown, ChevronUp, HelpCircle, BookOpen, DollarSign, Users, Shield, MessageCircle, Award, Target, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import EmailSupportPopup from '../components/EmailSupportPopup';
import { siteUrl } from '../config';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const Faqs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showEmailSupport, setShowEmailSupport] = useState(false);

  // Comprehensive FAQ data organized by categories
  const faqData: FAQItem[] = [
    // Getting Started
    {
      id: 'getting-started-1',
      question: 'How do I start earning?',
      answer: 'Start FREE and share your referral link. Earn 30% commission on every signup through your link. No credit card required to begin your journey.',
      category: 'getting-started',
      tags: ['start', 'free', 'commission', 'referral']
    },
    {
      id: 'getting-started-2',
      question: 'What\'s the difference between FREE and paid memberships?',
      answer: 'FREE gets you started with 30% commissions on 1 level. Paid memberships unlock deeper commission levels (SILVER: 2 levels, GOLD: 5 levels, DIAMOND: 7 levels) and premium benefits like advanced training, priority support, and exclusive community access.',
      category: 'getting-started',
      tags: ['free', 'paid', 'membership', 'commission', 'levels']
    },
    {
      id: 'getting-started-3',
      question: 'How does the optional sharing work?',
      answer: 'Sharing is completely optional and recommended for the best experience. There are no mandatory requirements or time limits for maintaining your membership benefits. You can share as much or as little as you want.',
      category: 'getting-started',
      tags: ['sharing', 'optional', 'requirements', 'experience']
    },
    {
      id: 'getting-started-4',
      question: 'Can I cancel anytime?',
      answer: 'Yes! Cancel anytime with no penalties. Your earned commissions continue as long as you meet the sharing requirement. We believe in freedom and have no long-term contracts.',
      category: 'getting-started',
      tags: ['cancel', 'anytime', 'penalties', 'freedom']
    },

    // Membership Tiers
    {
      id: 'membership-1',
      question: 'What\'s in the FREE membership exactly?',
      answer: 'FREE Membership includes: Private Community Access, Premium course access, Help Me Fund access, Affiliate commission earnings (1 level at 30%), Sign up bonus qualification, Prayer request submissions, Support ticket access, Basic training access.',
      category: 'membership',
      tags: ['free', 'benefits', 'commission', 'training', 'community']
    },
    {
      id: 'membership-2',
      question: 'What\'s in the SILVER membership exactly?',
      answer: 'SILVER Membership ($33/month) includes: Everything in FREE + Enhanced community features, Priority support access, Monthly progress reports, Advanced training modules, Exclusive webinars, Affiliate commission earnings (2 levels).',
      category: 'membership',
      tags: ['silver', 'benefits', 'price', 'training', 'support', 'commission']
    },
    {
      id: 'membership-3',
      question: 'What\'s in the GOLD membership exactly?',
      answer: 'GOLD Membership ($149/month) includes: Everything in SILVER + Affiliate commission earnings (5 levels), Fortnightly Q&A group coaching, Fortnightly Private Live Teaching, 5% discount on merchandise, Leadership development program.',
      category: 'membership',
      tags: ['gold', 'benefits', 'commission', 'teaching', 'certificates', 'coaching']
    },
    {
      id: 'membership-4',
      question: 'What\'s in the DIAMOND membership exactly?',
      answer: 'DIAMOND Membership ($499/month) includes: Everything in GOLD + Affiliate commission earnings (7 levels), Weekly Private Live Teaching, Tiered commission structure (30%/10%/5%/4%/3%/2%/1%), Free tickets to all events, 10% discount on merchandise, VIP support line.',
      category: 'membership',
      tags: ['diamond', 'benefits', 'commission', 'teaching', 'events', 'vip']
    },

    // Commissions & Earnings
    {
      id: 'commissions-1',
      question: 'How does the commission structure work?',
      answer: 'We use a tiered commission structure: Level 1: 30%, Level 2: 10%, Level 3: 5%, Level 4: 4%, Level 5: 3%, Level 6: 2%, Level 7: 1%. SILVER members earn on 2 levels, GOLD on 5 levels, and DIAMOND on 7 levels. Commissions are paid monthly via your preferred payment method.',
      category: 'commissions',
      tags: ['commission', 'structure', 'levels', 'payment', 'monthly', 'tiered']
    },
    {
      id: 'commissions-2',
      question: 'Is there a sign-up bonus?',
      answer: 'Yes! All membership tiers qualify for sign-up bonuses when you refer new members. The bonus amount varies by tier: FREE ($25), SILVER ($100), GOLD ($250), DIAMOND ($500). Bonuses are paid after your referral completes their first month.',
      category: 'commissions',
      tags: ['bonus', 'signup', 'referral', 'payment', 'tiers']
    },
    {
      id: 'commissions-3',
      question: 'What happens if I upgrade my membership?',
      answer: 'When you upgrade, you immediately gain access to all benefits of your new tier and start earning commissions on additional levels. Your existing referrals continue to generate commissions at the higher rates. No commissions are lost in the upgrade process.',
      category: 'commissions',
      tags: ['upgrade', 'benefits', 'commission', 'existing', 'rates']
    },
    {
      id: 'commissions-4',
      question: 'How are commissions paid?',
      answer: 'Commissions are paid monthly on the 15th of each month for the previous month\'s earnings. Payments are made via bank transfer (Australia) or USDT/TRX (International). Minimum payout threshold is $10 AUD equivalent.',
      category: 'commissions',
      tags: ['payment', 'monthly', 'bank', 'usdt', 'threshold']
    },
    {
      id: 'commissions-5',
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees! Everything is transparent. You only pay your membership fee - no setup fees, no processing fees, no surprise charges. All costs are clearly displayed before purchase.',
      category: 'commissions',
      tags: ['fees', 'hidden', 'transparent', 'costs', 'payment']
    },

    // Training & Education
    {
      id: 'training-1',
      question: 'What training programs are available?',
      answer: 'We offer comprehensive supernatural ministry training including: Healing the Sick, Deliverance Ministry, Evangelism, Five-fold office development (Apostle, Prophet, Evangelist, Pastor, Teacher), Leadership development, and specialized courses in signs and wonders.',
      category: 'training',
      tags: ['training', 'programs', 'healing', 'deliverance', 'evangelism', 'leadership']
    },
    {
      id: 'training-2',
      question: 'Do you offer certificates?',
      answer: 'Yes! Upon completion of training modules, you receive official certificates of completion. These certificates are recognized within our supernatural ministry network and can be used for ordination and ministry credentials.',
      category: 'training',
      tags: ['certificates', 'completion', 'ordination', 'credentials', 'ministry']
    },
    {
      id: 'training-3',
      question: 'Is the training accredited?',
      answer: 'Our training is accredited through Supernatural Churches Limited and provides ecclesiastical authority for ministry. While not government-accredited, our certificates are recognized within the supernatural ministry community and qualify graduates for ordination.',
      category: 'training',
      tags: ['accredited', 'ecclesiastical', 'ordination', 'authority', 'ministry']
    },

    // Community & Support
    {
      id: 'community-1',
      question: 'What community features are available?',
      answer: 'Access private community forums, prayer groups, mentorship programs, live teaching sessions, Q&A calls, regional meetups, and exclusive events. Higher membership tiers unlock more premium community features.',
      category: 'community',
      tags: ['community', 'forums', 'prayer', 'mentorship', 'events', 'premium']
    },
    {
      id: 'community-2',
      question: 'How do I get support?',
      answer: 'Access support through: Help tickets in your dashboard, community forums, live Q&A sessions, mentorship programs, and direct support lines for DIAMOND members. Our pastoral team is here to help you succeed.',
      category: 'community',
      tags: ['support', 'tickets', 'forums', 'qa', 'mentorship', 'pastoral']
    },

    // Technical & Account
    {
      id: 'technical-1',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email. If you don\'t receive the email, check your spam folder or contact support.',
      category: 'technical',
      tags: ['password', 'reset', 'login', 'email', 'support']
    },
    {
      id: 'technical-2',
      question: 'Can I change my payment method?',
      answer: 'Yes, you can update your payment method anytime in your dashboard under Account Settings > Billing. Changes take effect with your next billing cycle.',
      category: 'technical',
      tags: ['payment', 'method', 'billing', 'account', 'settings']
    },

    // Church Partnership
    {
      id: 'church-1',
      question: 'How does church partnership work?',
      answer: 'Church partnership costs $99/month and includes apostolic oversight, supernatural training for your congregation, commission sharing, Help Me Fund access, and priority support. Your church receives official partnership status and ecclesiastical covering.',
      category: 'church',
      tags: ['church', 'partnership', 'apostolic', 'training', 'commission', 'oversight']
    },
    {
      id: 'church-2',
      question: 'What training do partner churches receive?',
      answer: 'Partner churches receive: Five-fold ministry training, healing protocols, deliverance training, leadership development, congregation integration programs, apostolic oversight, and quarterly on-site visits.',
      category: 'church',
      tags: ['church', 'training', 'five-fold', 'healing', 'leadership', 'apostolic']
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle, count: faqData.length },
    { id: 'getting-started', name: 'Getting Started', icon: Target, count: faqData.filter(f => f.category === 'getting-started').length },
    { id: 'membership', name: 'Membership Tiers', icon: Award, count: faqData.filter(f => f.category === 'membership').length },
    { id: 'commissions', name: 'Commissions & Earnings', icon: DollarSign, count: faqData.filter(f => f.category === 'commissions').length },
    { id: 'training', name: 'Training & Education', icon: BookOpen, count: faqData.filter(f => f.category === 'training').length },
    { id: 'community', name: 'Community & Support', icon: Users, count: faqData.filter(f => f.category === 'community').length },
    { id: 'technical', name: 'Technical & Account', icon: Shield, count: faqData.filter(f => f.category === 'technical').length },
    { id: 'church', name: 'Church Partnership', icon: Zap, count: faqData.filter(f => f.category === 'church').length }
  ];

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    let filtered = faqData;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    return filtered;
  }, [selectedCategory]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredFaqs.map(faq => faq.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "FAQs", item: `${siteUrl}/faqs` }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Frequently Asked Questions - Supernatural Institute"
        description="Find answers to common questions about membership, commissions, training, and supernatural ministry. Comprehensive FAQ guide for all your questions."
        canonicalUrl={`${siteUrl}/faqs`}
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 heading-font">
            Frequently Asked <span className="text-orange-400">Questions</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Find comprehensive answers to all your questions about membership, commissions, training, and supernatural ministry.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 border border-gray-700 p-6 mb-8">

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide border transition-all ${
                    selectedCategory === category.id
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  <span className="bg-gray-600 px-2 py-1 text-xs rounded-full">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expand/Collapse Controls */}
          <div className="flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              Showing {filteredFaqs.length} of {faqData.length} questions
            </div>
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase tracking-wide"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white font-semibold uppercase tracking-wide"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 p-8 text-center">
              <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No questions found</h3>
              <p className="text-gray-400">
                Try adjusting your search terms or browse all categories.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full text-left p-6 hover:bg-gray-700/30 transition-colors flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  <div className={`transform transition-transform ${expandedItems.has(faq.id) ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
                {expandedItems.has(faq.id) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{faq.answer}</p>
                    <div className="flex flex-wrap gap-2">
                      {faq.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-8 text-center">
          <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 heading-font">Still Have Questions?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            Can't find what you're looking for? Our support team is here to help you succeed in your supernatural ministry journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowEmailSupport(true)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase tracking-wide transition-colors"
            >
              Email Support
            </button>
          </div>
        </div>
      </div>

      {/* Email Support Popup */}
      <EmailSupportPopup
        isOpen={showEmailSupport}
        onClose={() => setShowEmailSupport(false)}
      />
    </div>
  );
};

export default Faqs;