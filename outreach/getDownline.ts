import { api } from "encore.dev/api";
import { outreachDB } from "./db";
import { getAuthData } from "~encore/auth";
import { user } from "~encore/clients";

export interface DownlineMember {
  id: string;
  name: string;
  level: number;
  status: string;
  earnings: number;
  children: DownlineMember[];
}

interface GetDownlineResponse {
  downline: DownlineMember[];
}

// Builds the full downline tree for the authenticated user (all depths).
export const getDownline = api<void, GetDownlineResponse>(
  { auth: true, expose: true, method: "GET", path: "/outreach/downline" },
  async () => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    // Preload all referrals for efficiency
    const allReferrals = await outreachDB.queryAll<{
      referrer_id: string;
      referred_id: string;
    }>`SELECT referrer_id, referred_id FROM affiliate_referrals`;

    const childrenMap = new Map<string, { referred_id: string }[]>();
    for (const r of allReferrals) {
      const arr = childrenMap.get(r.referrer_id) ?? [];
      arr.push({ referred_id: r.referred_id });
      childrenMap.set(r.referrer_id, arr);
    }

    // Earnings per user
    const earningsRows = await outreachDB.queryAll<{
      user_id: string;
      weekly_earnings: string;
    }>`SELECT user_id, weekly_earnings FROM affiliate_profiles`;
    const weeklyMap = new Map<string, number>();
    for (const e of earningsRows) {
      weeklyMap.set(e.user_id, parseFloat(e.weekly_earnings));
    }

    // Collect all user IDs in the downline to fetch profiles in one batch
    const allUserIds = new Set<string>();
    function collectIds(uid: string, depth: number) {
      if (depth > 10 || allUserIds.has(uid)) return;
      allUserIds.add(uid);
      const kids = childrenMap.get(uid) ?? [];
      for (const k of kids) {
        collectIds(k.referred_id, depth + 1);
      }
    }
    collectIds(userId, 0);

    // Fetch profiles for all users in the downline
    const { profiles } = await user.getProfiles({ userIds: Array.from(allUserIds) });
    const profileMap = new Map<string, { name?: string | null }>();
    for (const p of profiles) {
      profileMap.set(p.userId, p);
    }

    const buildTree = (uid: string, currentLevel: number): DownlineMember[] => {
      const kids = childrenMap.get(uid) ?? [];
      if (currentLevel > 10) return []; // prevent infinite loops
      return kids.map((k) => ({
        id: k.referred_id,
        name: profileMap.get(k.referred_id)?.name || `User ${k.referred_id.slice(-4)}`,
        level: currentLevel + 1,
        status: "active",
        earnings: weeklyMap.get(k.referred_id) ?? 0,
        children: buildTree(k.referred_id, currentLevel + 1),
      }));
    };

    const downline = buildTree(userId, 0);
    return { downline };
  }
);
