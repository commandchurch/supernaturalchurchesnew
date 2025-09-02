import { api } from "encore.dev/api";

interface UserRecruit {
  id: string;
  name: string;
  email: string;
  mobile: string;
  membershipTier: 'FREE' | 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
  status: string;
  lastContact: string;
  joinDate: string;
  followUpStatus: string;
  earnings: number;
  level: number;
  optedOut: boolean;
  doNotContact: boolean;
}

interface ListUserRecruitsResponse {
  recruits: UserRecruit[];
}

// Get user's recruits/downline for outreach CRM
export const listUserRecruits = api<void, ListUserRecruitsResponse>(
  { auth: true, expose: true, method: "GET", path: "/outreach/recruits/user" },
  async () => {
    // For now, return mock data that matches the frontend expectations
    // In a real implementation, this would query the user's downline from the database
    return {
      recruits: [
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
        }
      ]
    };
  }
);