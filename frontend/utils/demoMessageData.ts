import { MessageService, MessageType, MessageReply } from '../lib/messageSystem';

// Demo data generator for showcasing the enhanced messaging system
export function generateDemoMessages(userId: string = 'user-123') {
  const messages = [];

  // Church Partnership Messages with replies
  const churchPartnershipMsg = MessageService.createMessage('church_partnership_approved', userId, {
    churchName: 'Grace Community Church',
    certificateUrl: '/certificates/gcc-partnership.pdf'
  });
  churchPartnershipMsg.canReply = true;
  churchPartnershipMsg.replies = [
    {
      id: 'reply-1',
      messageId: churchPartnershipMsg.id,
      userId: 'admin-1',
      userRole: 'admin' as const,
      content: 'Congratulations! Your church partnership application has been approved. We\'ll be sending you the welcome packet within 24 hours.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'reply-2',
      messageId: churchPartnershipMsg.id,
      userId: userId,
      userRole: 'user' as const,
      content: 'Thank you! When can we expect the first training materials?',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];
  messages.push(churchPartnershipMsg);

  messages.push(MessageService.createMessage('church_partnership_update', userId, {
    churchName: 'New Life Baptist Church'
  }));

  messages.push(MessageService.createMessage('certificate_ready', userId, {
    certificateType: 'Ordination Certificate',
    downloadUrl: '/certificates/ordination-john-doe.pdf'
  }));

  // Billing & Payment Messages
  const paymentFailedMsg = MessageService.createMessage('payment_failed', userId, {
    amount: '$29.99',
    reason: 'Insufficient funds'
  });
  paymentFailedMsg.canReply = true;
  messages.push(paymentFailedMsg);

  messages.push(MessageService.createMessage('subscription_cancelled', userId, {
    planName: 'Premium Membership',
    effectiveDate: 'December 31, 2024'
  }));

  messages.push(MessageService.createMessage('payment_successful', userId, {
    invoiceNumber: 'INV-2024-001',
    amount: '$29.99',
    dueDate: 'January 15, 2025'
  }));

  // Training & Academy Messages
  messages.push(MessageService.createMessage('course_enrollment_confirmed', userId, {
    courseName: 'Biblical Leadership Foundations',
    instructorName: 'Pastor Michael Johnson'
  }));

  messages.push(MessageService.createMessage('course_completed', userId, {
    courseName: 'Ministry Ethics and Conduct',
    certificateUrl: '/certificates/ethics-completion.pdf'
  }));

  messages.push(MessageService.createMessage('course_prerequisite_missing', userId, {
    courseName: 'Advanced Theology Studies',
    prerequisite: 'Introduction to Biblical Studies'
  }));

  // Event Messages
  messages.push(MessageService.createMessage('event_registration_confirmed', userId, {
    eventName: 'Supernatural Institute Regional Conference',
    eventDate: 'February 15, 2025',
    eventTime: '9:00 AM PST'
  }));

  messages.push(MessageService.createMessage('event_cancelled', userId, {
    eventName: 'Monthly Prayer Meeting',
    reason: 'Weather conditions'
  }));

  // Testimony Messages
  messages.push(MessageService.createMessage('testimony_approved', userId, {
    testimonyTitle: 'Miraculous Healing Through Prayer'
  }));

  messages.push(MessageService.createMessage('testimony_rejected', userId, {
    testimonyTitle: 'My Journey to Faith',
    reason: 'Needs more specific details about the supernatural intervention'
  }));

  // Affiliate Program Messages
  // Affiliate & Downline Messages
  messages.push(MessageService.createMessage('downline_signup', userId, {
    memberName: 'Sarah Johnson',
    membershipTier: 'Bronze',
    commission: '$3.80',
    bonusPoints: '50'
  }));

  messages.push(MessageService.createMessage('downline_upgrade', userId, {
    memberName: 'Michael Chen',
    oldTier: 'Bronze',
    newTier: 'Silver',
    commission: '$2.80'
  }));

  messages.push(MessageService.createMessage('downline_achievement', userId, {
    milestone: '10 Active Members',
    totalMembers: '12',
    monthlyCommission: '$47.60'
  }));

  messages.push(MessageService.createMessage('affiliate_commission_earned', userId, {
    amount: '$45.00',
    referralCount: '3'
  }));

  messages.push(MessageService.createMessage('affiliate_payment_processed', userId, {
    amount: '$145.00',
    paymentMethod: 'PayPal'
  }));

  messages.push(MessageService.createMessage('referral_bonus_earned', userId, {
    bonusAmount: '$25.00',
    referredUser: 'John Smith'
  }));

  // Support Messages
  messages.push(MessageService.createMessage('support_ticket_response', userId, {
    ticketNumber: 'SUP-2024-156',
    subject: 'Login Issues with Dashboard'
  }));

  messages.push(MessageService.createMessage('content_access_issue', userId, {
    issue: 'Unable to access course materials',
    resolution: 'Access restored - please refresh your browser'
  }));

  // Financial Messages
  messages.push(MessageService.createMessage('donation_receipt', userId, {
    donationAmount: '$100.00',
    receiptNumber: 'DON-2024-789'
  }));

  messages.push(MessageService.createMessage('tax_document_ready', userId, {
    taxYear: '2024',
    documentType: 'Tax Deduction Summary'
  }));

  // System Messages
  messages.push(MessageService.createMessage('system_maintenance_alert', userId, {
    startTime: '2:00 AM PST',
    endTime: '4:00 AM PST',
    date: 'January 20, 2025'
  }));

  messages.push(MessageService.createMessage('feature_update', userId, {
    featureName: 'Enhanced Messaging System',
    description: 'New filtering and categorization options'
  }));

  messages.push(MessageService.createMessage('welcome_message', userId, {
    userName: 'New Member'
  }));

  // Add timestamps and randomize read status for demo
  const now = Date.now();
  messages.forEach((message, index) => {
    message.createdAt = new Date(now - (index * 3600000 + Math.random() * 3600000)); // Spread over last few hours
    message.status = Math.random() > 0.4 ? 'read' : 'unread'; // 60% read, 40% unread
  });

  // Sort by timestamp (newest first)
  messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return messages;
}

// Generate sample admin-specific messages
export function generateAdminDemoMessages(userId: string = 'admin-001') {
  const messages = [];

  // High priority admin messages
  messages.push(MessageService.createMessage('system_maintenance_alert', userId, {
    alertType: 'Multiple failed login attempts',
    actionTaken: 'IP address blocked temporarily'
  }));

  messages.push(MessageService.createMessage('system_announcement', userId, {
    title: 'Scheduled Maintenance',
    details: 'System will be down for maintenance from 11:00 PM to 1:00 AM PST on January 25, 2025'
  }));

  messages.push(MessageService.createMessage('content_feedback_response', userId, {
    contentType: 'Church Partnership Application',
    feedback: 'Application requires additional documentation',
    reviewerName: 'Admin Review Team'
  }));

  messages.push(MessageService.createMessage('staff_application_status', userId, {
    applicantName: 'Michael Chen',
    position: 'Senior Content Reviewer',
    status: 'Interview Scheduled'
  }));

  messages.push(MessageService.createMessage('volunteer_assignment', userId, {
    volunteerName: 'Sarah Wilson',
    assignment: 'Student Advisor',
    department: 'Academy Support'
  }));

  // Add timestamps and mark as unread for urgency
  const now = Date.now();
  messages.forEach((message, index) => {
    message.createdAt = new Date(now - (index * 1800000)); // Spread over last few hours
    message.status = index > 2 ? 'read' : 'unread'; // First 3 unread for urgency
  });

  return messages;
}
