// Mock Encore.dev client for frontend compatibility
// These functions will be replaced with actual API calls when the backend is deployed

export const academy = {
  listCertificates: async () => ({
    certificates: [
      { id: '1', title: 'New Life in Jesus: Foundations', issuedDate: new Date().toISOString() },
      { id: '2', title: 'Evangelism Essentials', issuedDate: new Date().toISOString() }
    ]
  }),
  getProgress: async () => ({
    progress: [
      { courseId: 1, progressPercentage: 100, completedAt: new Date().toISOString() }
    ]
  }),
};

export const admin = {
  getTerms: async ({ documentType }: { documentType: string }) => ({
    content: `# ${documentType}\n\nThis is the content for ${documentType}. Please review our terms and conditions.`
  }),
};

export const church = {
  submitPrayerRequest: async (params: any) => {
    console.log('Prayer request submitted:', params);
    return { success: true, id: Date.now() };
  },
  listEvents: async () => ({
    events: [
      {
        id: '1',
        title: 'Sunday Worship Service',
        description: 'Weekly worship service',
        eventType: 'service',
        startDate: new Date().toISOString(),
        locationName: 'Online'
      }
    ]
  }),
  listPrayerRequests: async () => ({
    requests: []
  }),
  listTestimoniesAdmin: async () => [],
  reviewTestimony: async (params: any) => ({ success: true }),
};

export const fund = {
  submitFundingRequest: async (params: any) => {
    console.log('Funding request submitted:', params);
    return { success: true };
  },
};

export const membership = {
  getSubscription: async () => ({
    subscription: {
      status: 'active',
      planCode: 'SILVER',
      active: true
    }
  }),
};

export const outreach = {
  getStats: async () => ({
    weeklyEarnings: 150,
    totalEarnings: 1250,
    referralCount: 8,
    rank: 'Silver'
  }),
};

export const partnership = {
  apply: async (params: any) => {
    console.log('Partnership application submitted:', params);
    return { success: true };
  },
  getApplicationStatus: async () => ({
    status: 'pending',
    message: 'Your application is being reviewed.'
  }),
};

export const staff = {
  listStaff: async () => ({
    staff: []
  }),
};

export const user = {
  getProfile: async () => ({
    profile: { name: 'User', email: 'user@example.com' }
  }),
};

// Default export for backward compatibility
const client = {
  academy,
  admin,
  church,
  fund,
  membership,
  outreach,
  partnership,
  staff,
  user,
};

export default client;
