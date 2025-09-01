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
    description: 'Basic access to get started',
    benefits: [
      'Access to limited free courses',
      'Basic community updates',
      'Referral program access'
    ],
    limitations: [
      'No premium course access',
      'No Help Me Fund access', 
      'No private community access',
      'No affiliate commission earnings'
    ],
    upgradeOffer: 'Refer 3 Bronze members within 14 days of signing up and get a FREE Bronze upgrade for 28 days! Once at Bronze, refer 5 more Bronze members within 30 days and you\'ll have 3 months free Bronze membership!',
    courses: ['Limited free courses only'],
    level: 'Free Access',
    churchSpecific: false
  },
  {
    name: 'BRONZE',
    price: 19,
    color: 'blue',
    icon: Users,
    description: 'Private Telegram group access',
    benefits: [
      'Private Telegram group access',
      'Access to all institute (premium) courses',
      'Weekly community updates',
      'Help Me Fund access',
      '5% Promo discount on merch',
      'Affiliate earnings capped at $1,000 AUD/month',
      'Commission Levels: 1st (20%)'
    ],
    courses: ['Access to all institute (premium) courses'],
    level: 'Entry Level',
    churchSpecific: false
  },
  {
    name: 'SILVER',
    price: 33,
    color: 'purple',
    icon: BookOpen,
    description: 'Private Telegram group access',
    benefits: [
      'Private Telegram group access',
      'Access to all institute (premium) courses',
      'Fortnightly Q&A Meetings',
      'Help Me Fund access',
      '10% Promo discount on merch',
      'Affiliate earnings capped at $3,000 AUD/month',
      'Commission Levels: 1st (20%), 2nd (10%)'
    ],
    courses: ['Access to all institute (premium) courses'],
    level: 'Intermediate',
    churchSpecific: false
  },
  {
    name: 'GOLD',
    price: 149,
    color: 'pink',
    icon: Target,
    description: 'Advanced ministry training access',
    benefits: [
      'Private Telegram group access',
      'Access to all institute (premium) courses',
      'Weekly Q&A Meetings',
      'Help Me Fund access',
      '15% Promo discount on merch', 
      'Affiliate earnings capped at $10,000 AUD/month',
      'Commission Levels: 1st (20%), 2nd (10%), 3rd (5%)',
      'Advanced ministry training modules',
      'Direct access to senior leadership'
    ],
    courses: ['All institute courses + Advanced Ministry Training'],
    level: 'Advanced',
    churchSpecific: false
  },
  {
    name: 'DIAMOND',
    price: 499,
    color: 'cyan',
    icon: Sparkles,
    description: 'Complete ministry transformation',
    benefits: [
      'All previous tier benefits',
      'Unlimited access to all content',
      'Monthly 1-on-1 coaching calls',
      'Personal ministry development plan',
      'Direct WhatsApp access to leadership',
      '20% Promo discount on merch',
      'Unlimited affiliate earnings potential',
      'Commission Levels: All levels (20%, 10%, 5%)',
      'Priority event access',
      'Custom training development'
    ],
    courses: ['All courses + Custom personal training'],
    level: 'Elite',
    churchSpecific: false,
    featured: true
  }
];
