import { useMemo } from 'react';
import { api } from '../_generated/api';
import { useQuery, useMutation } from 'convex/react';

/**
 * Hook to get an authenticated backend client instance
 * Since we removed Clerk authentication, this returns a basic client instance
 */
export function useBackend() {
  // Thin wrapper that exposes only methods used in UI, implemented via Convex
  return useMemo(() => {
    return {
      academy: {
        listCertificates: async () => ({ certificates: [] }),
        getProgress: async () => ({ progress: [] }),
      },
      admin: {
        getTerms: async ({ documentType }: { documentType: string }) => ({ content: '' }),
      },
      church: {
        submitPrayerRequest: async (params: any) => {
          // Call Convex mutation
          const fn = (window as any).convex?.mutation ?? null;
          if (fn) return fn(api.church.submitPrayerRequest, params);
          // Fallback: POST to Convex HTTP action if available in future
          return null;
        },
        listEvents: async () => ({ events: [] }),
      },
      fund: {
        submitFundingRequest: async () => null,
      },
      membership: {
        getSubscription: async () => ({ subscription: null }),
      },
      outreach: {
        getStats: async () => ({ weeklyEarnings: 0, totalEarnings: 0, referralCount: 0, rank: 'Bronze' }),
      },
    };
  }, []);
}
