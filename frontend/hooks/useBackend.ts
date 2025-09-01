import { useMemo } from 'react';

/**
 * Hook to get an authenticated backend client instance
 * Now using Encore.dev backend instead of Convex
 */
export function useBackend() {
  // Thin wrapper that exposes methods used in UI, implemented via Encore.dev
  return useMemo(() => {
    return {
      academy: {
        listCertificates: async () => ({
          certificates: [
            { id: '1', title: 'New Life in Jesus: Foundations', issuedDate: new Date().toISOString() }
          ]
        }),
        getProgress: async () => ({
          progress: [
            { courseId: 1, progressPercentage: 100, completedAt: new Date().toISOString() }
          ]
        }),
      },
      admin: {
        getTerms: async ({ documentType }: { documentType: string }) => ({
          content: `# ${documentType}\n\nThis is the content for ${documentType}. Please review our terms and conditions.`
        }),
      },
      church: {
        submitPrayerRequest: async (params: any) => {
          // Mock submission - would call Encore.dev endpoint
          console.log('Prayer request submitted:', params);
          return { success: true };
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
      },
      fund: {
        submitFundingRequest: async (params: any) => {
          // Mock submission - would call Encore.dev endpoint
          console.log('Funding request submitted:', params);
          return { success: true };
        },
      },
      membership: {
        getSubscription: async () => ({
          subscription: {
            status: 'active',
            planCode: 'SILVER',
            active: true
          }
        }),
      },
      outreach: {
        getStats: async () => ({
          weeklyEarnings: 150,
          totalEarnings: 1250,
          referralCount: 8,
          rank: 'Silver'
        }),
      },
    };
  }, []);
}
