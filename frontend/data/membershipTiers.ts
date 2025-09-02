import {
  Crown,
  Church,
  GraduationCap,
  Building2,
  Users,
  BookOpen,
  Target,
  Sparkles
} from 'lucide-react';

// Church-specific membership tiers with appropriate names
export const churchMembershipTiers = [
  {
    name: 'SUPERNATURAL CHURCHES PARTNERSHIP',
    churchName: 'Apostolic Partnership',
    price: 200,
    color: 'supernatural',
    icon: Crown,
    description: 'Equip your church with apostolic oversight, supernatural training, and biblical ministry protocols that demonstrate Kingdom power through miraculous signs, wonders, and transformed lives.',
    tagline: '🔥 WE BRING SPIRITUALLY DEAD CHURCHES BACK TO LIFE',
    subtitle: 'The Kingdom of God is demonstrated in power, not in words (1 Corinthians 4:20). The Greek word for power is "Dunamis" (δύναμις) - meaning miraculous power, mighty works, and supernatural strength. We are called to be the light of this world, not to look the same as the unbeliever.',
    benefits: [
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
      'Quarterly on-site ministry visits (Australia)',
      '24/7 Q&A access to senior leadership team',
      'Proven protocols for congregational healing',
      'Identifying and combating doctrines of demons',
      'Establishing supernatural ministry foundations',
      'Kingdom power demonstration training',
      'Affiliate Network & Support (20%/10%/5% commission structure)',
      'Help Me Fund access for churches facing financial challenges'
    ],
    courses: [
      'Five Fold Ministry Activation',
      'Apostolic Leadership Training', 
      'Prophetic Ministry Development',
      'Supernatural Church Operations',
      'Advanced Healing Protocols',
      'Deliverance Ministry Training',
      'Evangelism Excellence',
      'Dunamis Power Demonstration'
    ],
    level: 'Apostolic Level',
    churchSpecific: true,
    featured: true,
    powerStatement: 'Australia\'s time to rise up with correct doctrine and demonstrate the Dunamis power of God. Your congregation will witness supernatural transformation through proven Kingdom principles that produce lasting spiritual fruit.',
    requirements: 'Free to apply • Leadership Course required • Cancel anytime'
  }
];

// Individual membership tiers (existing structure)  
export const individualMembershipTiers = [
  {
    name: 'FREE',
    price: 0,
    color: 'gray',
    icon: GraduationCap,
    description: 'Start free and earn Bronze access through referrals',
    benefits: [
      'Access to limited free courses',
      'Basic community updates',
      'Referral program access',
      'Earn Level 1 affiliate earnings by signing up 2 Bronze members',
      'Maintain Bronze access by signing up 2 more Bronze members every 28 days',
      'Qualify for bonus payouts on Bronze signups',
      'Earn free Silver month with 20 recruits in 90 days',
      'Build your referrer\'s network (they earn from your recruits!)'
    ],
    limitations: [
      'No premium course access',
      'No Help Me Fund access',
      'No private community access',
      'No affiliate commission earnings (until you sign up 2 Bronze members)'
    ],
    upgradeOffer: 'FREE to BRONZE: Sign up 2 Bronze members to get Level 1 affiliate earnings. Maintain BRONZE: Sign up 2 more Bronze members every 28 days while staying on FREE membership. Recruit 20 people within 90 days = Silver status for 28 days (then earn full affiliate commissions).',
    courses: ['Limited free courses only'],
    level: 'Free Access',
    churchSpecific: false
  },
  {
    name: 'BRONZE',
    price: 10,
    annualPrice: 108, // 10 * 12 * 0.9 = 108 (10% annual discount)
    color: 'blue',
    icon: Users,
    description: 'Entry level with commission earnings',
    benefits: [
      'Private Community Access',
      'Premium course access',
      'Help Me Fund access',
      'Affiliate commission earnings (1 level)',
      'Sign up bonus qualification'
    ],
    courses: ['Access to all institute (premium) courses'],
    level: 'Entry Level',
    churchSpecific: false,
    commission: 4,
    points: 1,
    popular: false
  },
  {
    name: 'SILVER',
    price: 20,
    annualPrice: 216, // 20 * 12 * 0.9 = 216 (10% annual discount)
    color: 'purple',
    icon: BookOpen,
    description: 'Enhanced community with monthly teaching',
    benefits: [
      'Everything in Bronze',
      '+ Affiliate commission earnings (2 levels)',
      '+ Monthly Private Group Teaching',
      '+ Sign up bonus qualification'
    ],
    courses: ['Access to all institute (premium) courses'],
    level: 'Intermediate',
    churchSpecific: false,
    commission: 8,
    points: 2,
    popular: true
  },
  {
    name: 'GOLD',
    price: 50,
    annualPrice: 540, // 50 * 12 * 0.9 = 540 (10% annual discount)
    color: 'pink',
    icon: Target,
    description: 'Advanced training with coaching',
    benefits: [
      'Everything in Silver',
      '+ Affiliate commission earnings (5 levels)',
      '+ Fortnightly Q&A group coaching',
      '+ Fortnightly Private Live Teaching',
      '+ 5% discount on any merch available',
      '+ Sign up bonus qualification'
    ],
    courses: ['All institute courses + Advanced Ministry Training'],
    level: 'Advanced',
    churchSpecific: false,
    commission: 16,
    points: 5,
    popular: false
  },
  {
    name: 'DIAMOND',
    price: 100,
    annualPrice: 1080, // 100 * 12 * 0.9 = 1080 (10% annual discount)
    color: 'cyan',
    icon: Sparkles,
    description: 'Elite level with maximum benefits',
    benefits: [
      'Everything in Gold',
      '+ Affiliate commission earnings (7 levels)',
      '+ Fortnightly Private Live Teaching',
      '+ Direct level 1 referrals increase from 20% to 35%',
      '+ Free tickets to all in person or online events',
      '+ 10% discount on any merch available',
      '+ Sign up bonus qualification'
    ],
    courses: ['All courses + Custom personal training'],
    level: 'Elite',
    churchSpecific: false,
    featured: true,
    commission: 32,
    points: 10,
    popular: false
  }
];
