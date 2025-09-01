export interface Message {
  id: string;
  userId: string;
  type: MessageType;
  title: string;
  content: string;
  status: 'unread' | 'read' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: MessageCategory;
  createdAt: Date;
  readAt?: Date;
  actionRequired?: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
  replies?: MessageReply[];
  canReply?: boolean;
}

export interface MessageReply {
  id: string;
  messageId: string;
  userId: string;
  userRole: 'user' | 'admin';
  content: string;
  createdAt: Date;
  readAt?: Date;
}

export type MessageType = 
  // Church Partnership
  | 'church_invitation_response'
  | 'church_partnership_approved'
  | 'church_partnership_rejected'
  | 'church_partnership_update'
  
  // Membership & Billing
  | 'membership_upgrade_prompt'
  | 'payment_failed'
  | 'payment_successful'
  | 'subscription_cancelled'
  | 'subscription_renewed'
  | 'account_suspended'
  | 'account_reactivated'
  | 'downline_signup'
  | 'downline_upgrade'
  | 'downline_achievement'
  
  // Training & Certificates
  | 'course_enrollment_confirmed'
  | 'course_prerequisite_missing'
  | 'course_schedule_change'
  | 'course_completed'
  | 'certificate_ready'
  | 'certificate_delivery_issue'
  
  // Testimonies & Content
  | 'testimony_approved'
  | 'testimony_rejected'
  | 'testimony_published'
  | 'content_feedback_response'
  
  // Events
  | 'event_registration_confirmed'
  | 'event_cancelled'
  | 'event_schedule_change'
  | 'event_reminder'
  
  // Affiliate Program
  | 'affiliate_commission_earned'
  | 'affiliate_payment_processed'
  | 'affiliate_commission_dispute'
  | 'referral_bonus_earned'
  
  // Support & Admin
  | 'support_ticket_response'
  | 'system_maintenance_alert'
  | 'content_access_issue'
  | 'church_directory_update'
  | 'find_church_response'
  
  // Staff & Volunteer
  | 'staff_application_status'
  | 'volunteer_assignment'
  | 'interview_scheduled'
  
  // Financial
  | 'donation_receipt'
  | 'tax_document_ready'
  | 'financial_inquiry_response'
  
  // General
  | 'system_announcement'
  | 'feature_update'
  | 'welcome_message';

export type MessageCategory = 
  | 'church_partnership'
  | 'membership'
  | 'billing'
  | 'training'
  | 'events'
  | 'testimonies'
  | 'affiliate'
  | 'support'
  | 'financial'
  | 'system'
  | 'general';

export interface MessageTemplate {
  type: MessageType;
  category: MessageCategory;
  title: string;
  content: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  actionRequired?: boolean;
  variables: string[];
}

export const MESSAGE_TEMPLATES: Record<MessageType, MessageTemplate> = {
  // Church Partnership Messages
  church_invitation_response: {
    type: 'church_invitation_response',
    category: 'church_partnership',
    title: 'Church Invitation Response',
    content: 'Your invitation to join {{churchName}} has been {{status}}.',
    priority: 'normal',
    variables: ['churchName', 'status']
  },
  
  church_partnership_approved: {
    type: 'church_partnership_approved',
    category: 'church_partnership',
    title: '🎉 Church Partnership Approved!',
    content: 'Congratulations! Your church partnership application has been approved. You now have access to all Five Fold Ministry resources. Your first leadership consultation is scheduled for {{consultationDate}}.',
    priority: 'high',
    actionRequired: true,
    variables: ['consultationDate']
  },
  
  church_partnership_rejected: {
    type: 'church_partnership_rejected',
    category: 'church_partnership',
    title: 'Church Partnership Application Update',
    content: 'Thank you for your interest in our Church Partnership program. After careful review, we need additional information before proceeding. Please contact our leadership team to discuss next steps.',
    priority: 'normal',
    actionRequired: true,
    variables: []
  },
  
  // Membership & Billing Messages
  membership_upgrade_prompt: {
    type: 'membership_upgrade_prompt',
    category: 'membership',
    title: 'Unlock More Ministry Training',
    content: 'You\'ve accessed all available content in your current tier. Upgrade to {{suggestedTier}} to continue your supernatural ministry education with {{additionalCourses}} more courses.',
    priority: 'normal',
    actionRequired: true,
    variables: ['suggestedTier', 'additionalCourses']
  },
  
  payment_failed: {
    type: 'payment_failed',
    category: 'billing',
    title: '❌ Payment Failed - Action Required',
    content: 'Your payment of ${{amount}} failed to process. Please update your payment method within 3 days to maintain access to your {{membershipTier}} benefits.',
    priority: 'urgent',
    actionRequired: true,
    variables: ['amount', 'membershipTier']
  },
  
  account_suspended: {
    type: 'account_suspended',
    category: 'billing',
    title: '⚠️ Account Suspended',
    content: 'Your account has been suspended due to {{reason}}. Please contact support or update your payment information to restore access.',
    priority: 'urgent',
    actionRequired: true,
    variables: ['reason']
  },
  
  // Training & Certificate Messages
  certificate_ready: {
    type: 'certificate_ready',
    category: 'training',
    title: '🏆 Your Ordination Certificate is Ready!',
    content: 'Congratulations! Your {{certificateType}} ordination certificate for {{courseName}} has been processed and is ready for download.',
    priority: 'high',
    actionRequired: true,
    variables: ['certificateType', 'courseName']
  },
  
  course_completed: {
    type: 'course_completed',
    category: 'training',
    title: '✅ Course Completed!',
    content: 'Excellent work completing {{courseName}}! Your progress has been recorded and you\'ve earned {{points}} ministry points. {{nextSteps}}',
    priority: 'normal',
    variables: ['courseName', 'points', 'nextSteps']
  },
  
  // Testimony Messages
  testimony_approved: {
    type: 'testimony_approved',
    category: 'testimonies',
    title: '✨ Your Testimony Has Been Approved',
    content: 'Your testimony "{{testimonyTitle}}" has been approved and published! Thank you for sharing how God is moving in your life. It will encourage many others.',
    priority: 'normal',
    variables: ['testimonyTitle']
  },
  
  testimony_rejected: {
    type: 'testimony_rejected',
    category: 'testimonies',
    title: 'Testimony Review Update',
    content: 'Thank you for submitting your testimony. We need some additional details before publication. {{reviewNotes}}',
    priority: 'normal',
    actionRequired: true,
    variables: ['reviewNotes']
  },
  
  // Affiliate Program Messages
  affiliate_commission_earned: {
    type: 'affiliate_commission_earned',
    category: 'affiliate',
    title: '💰 Commission Earned!',
    content: 'You\'ve earned ${{amount}} in commissions from {{referralName}}\'s {{membershipTier}} membership! Payment will be processed on {{paymentDate}}.',
    priority: 'normal',
    variables: ['amount', 'referralName', 'membershipTier', 'paymentDate']
  },
  
  referral_bonus_earned: {
    type: 'referral_bonus_earned',
    category: 'affiliate',
    title: '🎁 Referral Bonus Earned',
    content: 'Great news! Your referral {{referralName}} has completed their first month. You\'ve earned a ${{bonusAmount}} referral bonus!',
    priority: 'normal',
    variables: ['referralName', 'bonusAmount']
  },
  
  // Event Messages
  event_cancelled: {
    type: 'event_cancelled',
    category: 'events',
    title: '📅 Event Cancelled',
    content: 'Unfortunately, {{eventName}} scheduled for {{eventDate}} has been cancelled due to {{reason}}. {{refundInfo}}',
    priority: 'high',
    actionRequired: true,
    variables: ['eventName', 'eventDate', 'reason', 'refundInfo']
  },
  
  // System Messages
  system_maintenance_alert: {
    type: 'system_maintenance_alert',
    category: 'system',
    title: '🔧 Scheduled Maintenance',
    content: 'Our platform will be undergoing maintenance from {{startTime}} to {{endTime}} on {{date}}. All services will be temporarily unavailable.',
    priority: 'normal',
    variables: ['startTime', 'endTime', 'date']
  },
  
  // Default for other message types - will add more as needed
  welcome_message: {
    type: 'welcome_message',
    category: 'general',
    title: 'Welcome to Supernatural Institute!',
    content: 'Welcome {{userName}}! Your supernatural ministry journey begins now. Complete your profile and start with our Foundation course.',
    priority: 'normal',
    actionRequired: true,
    variables: ['userName']
  },
  
  // Placeholder entries for other types - will implement as needed
  church_partnership_update: { type: 'church_partnership_update', category: 'church_partnership', title: 'Update', content: '', priority: 'normal', variables: [] },
  payment_successful: { type: 'payment_successful', category: 'billing', title: 'Payment Successful', content: '', priority: 'low', variables: [] },
  subscription_cancelled: { type: 'subscription_cancelled', category: 'billing', title: 'Subscription Cancelled', content: '', priority: 'normal', variables: [] },
  subscription_renewed: { type: 'subscription_renewed', category: 'billing', title: 'Subscription Renewed', content: '', priority: 'normal', variables: [] },
  account_reactivated: { type: 'account_reactivated', category: 'billing', title: 'Account Reactivated', content: '', priority: 'normal', variables: [] },
  
  // Downline Notifications
  downline_signup: {
    type: 'downline_signup',
    category: 'affiliate',
    title: '🎉 New Member in Your Network!',
    content: 'Great news! {{memberName}} just joined as a {{membershipTier}} member through your referral. You\'ve earned {{commission}} in commission and {{bonusPoints}} bonus points!',
    priority: 'normal',
    variables: ['memberName', 'membershipTier', 'commission', 'bonusPoints']
  },
  
  downline_upgrade: {
    type: 'downline_upgrade',
    category: 'affiliate',
    title: '⬆️ Network Member Upgraded!',
    content: '{{memberName}} in your network just upgraded from {{oldTier}} to {{newTier}}! This generates an additional {{commission}} commission for you.',
    priority: 'normal',
    variables: ['memberName', 'oldTier', 'newTier', 'commission']
  },
  
  downline_achievement: {
    type: 'downline_achievement',
    category: 'affiliate',
    title: '🏆 Network Achievement Milestone!',
    content: 'Congratulations! Your referral network has reached {{milestone}}. You now have {{totalMembers}} active members generating {{monthlyCommission}} in monthly commissions.',
    priority: 'high',
    variables: ['milestone', 'totalMembers', 'monthlyCommission']
  },
  course_enrollment_confirmed: { type: 'course_enrollment_confirmed', category: 'training', title: 'Enrollment Confirmed', content: '', priority: 'normal', variables: [] },
  course_prerequisite_missing: { type: 'course_prerequisite_missing', category: 'training', title: 'Prerequisite Missing', content: '', priority: 'normal', variables: [] },
  course_schedule_change: { type: 'course_schedule_change', category: 'training', title: 'Schedule Change', content: '', priority: 'normal', variables: [] },
  certificate_delivery_issue: { type: 'certificate_delivery_issue', category: 'training', title: 'Certificate Issue', content: '', priority: 'normal', variables: [] },
  testimony_published: { type: 'testimony_published', category: 'testimonies', title: 'Testimony Published', content: '', priority: 'normal', variables: [] },
  content_feedback_response: { type: 'content_feedback_response', category: 'testimonies', title: 'Feedback Response', content: '', priority: 'normal', variables: [] },
  event_registration_confirmed: { type: 'event_registration_confirmed', category: 'events', title: 'Registration Confirmed', content: '', priority: 'normal', variables: [] },
  event_schedule_change: { type: 'event_schedule_change', category: 'events', title: 'Schedule Change', content: '', priority: 'normal', variables: [] },
  event_reminder: { type: 'event_reminder', category: 'events', title: 'Event Reminder', content: '', priority: 'normal', variables: [] },
  affiliate_payment_processed: { type: 'affiliate_payment_processed', category: 'affiliate', title: 'Payment Processed', content: '', priority: 'normal', variables: [] },
  affiliate_commission_dispute: { type: 'affiliate_commission_dispute', category: 'affiliate', title: 'Commission Dispute', content: '', priority: 'normal', variables: [] },
  support_ticket_response: { type: 'support_ticket_response', category: 'support', title: 'Support Response', content: '', priority: 'normal', variables: [] },
  content_access_issue: { type: 'content_access_issue', category: 'support', title: 'Access Issue', content: '', priority: 'normal', variables: [] },
  church_directory_update: { type: 'church_directory_update', category: 'support', title: 'Directory Update', content: '', priority: 'normal', variables: [] },
  find_church_response: { type: 'find_church_response', category: 'support', title: 'Church Response', content: '', priority: 'normal', variables: [] },
  staff_application_status: { type: 'staff_application_status', category: 'support', title: 'Application Status', content: '', priority: 'normal', variables: [] },
  volunteer_assignment: { type: 'volunteer_assignment', category: 'support', title: 'Volunteer Assignment', content: '', priority: 'normal', variables: [] },
  interview_scheduled: { type: 'interview_scheduled', category: 'support', title: 'Interview Scheduled', content: '', priority: 'normal', variables: [] },
  donation_receipt: { type: 'donation_receipt', category: 'financial', title: 'Donation Receipt', content: '', priority: 'normal', variables: [] },
  tax_document_ready: { type: 'tax_document_ready', category: 'financial', title: 'Tax Document Ready', content: '', priority: 'normal', variables: [] },
  financial_inquiry_response: { type: 'financial_inquiry_response', category: 'financial', title: 'Financial Inquiry Response', content: '', priority: 'normal', variables: [] },
  system_announcement: { type: 'system_announcement', category: 'system', title: 'System Announcement', content: '', priority: 'normal', variables: [] },
  feature_update: { type: 'feature_update', category: 'system', title: 'Feature Update', content: '', priority: 'normal', variables: [] }
};

export class MessageService {
  static createMessage(type: MessageType, userId: string, variables: Record<string, string> = {}): Message {
    const template = MESSAGE_TEMPLATES[type];
    
    let content = template.content;
    let title = template.title;
    
    // Replace variables in content and title
    for (const [key, value] of Object.entries(variables)) {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
      title = title.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      title,
      content,
      status: 'unread',
      priority: template.priority,
      category: template.category,
      createdAt: new Date(),
      actionRequired: template.actionRequired,
      metadata: variables
    };
  }
  
  static getCategoryColor(category: MessageCategory): string {
    const colors = {
      church_partnership: 'purple',
      membership: 'blue',
      billing: 'red',
      training: 'green',
      events: 'orange',
      testimonies: 'pink',
      affiliate: 'yellow',
      support: 'gray',
      financial: 'indigo',
      system: 'slate',
      general: 'gray'
    };
    return colors[category] || 'gray';
  }

  static addReply(messageId: string, userId: string, userRole: 'user' | 'admin', content: string): MessageReply {
    return {
      id: `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      messageId,
      userId,
      userRole,
      content,
      createdAt: new Date()
    };
  }

  static markMessageArchived(messageId: string, messages: Message[]): Message[] {
    return messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: 'archived' as const }
        : msg
    );
  }

  static markMessageRead(messageId: string, messages: Message[]): Message[] {
    return messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: 'read' as const, readAt: new Date() }
        : msg
    );
  }
  
  static getPriorityIcon(priority: string): string {
    const icons = {
      low: '📝',
      normal: '📬',
      high: '⚡',
      urgent: '🚨'
    };
    return icons[priority as keyof typeof icons] || '📬';
  }
}
