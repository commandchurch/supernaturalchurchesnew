import { api, APIError } from "encore.dev/api";
import { outreachDB } from "./db";
import { academyDB } from "../academy/db";
import { getAuthData } from "~encore/auth";
import { membership } from "~encore/clients";

interface JoinProgramParams {
  sponsorCode?: string;
}

interface JoinProgramResponse {
  success: boolean;
  referralCode: string;
}

// Allows a user to join the Soul Outreach affiliate program.
export const joinProgram = api<JoinProgramParams, JoinProgramResponse>(
  { auth: true, expose: true, method: "POST", path: "/outreach/join" },
  async ({ sponsorCode }) => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    // Requirement 1: Check if user has completed the "Evangelism Essentials" course.
    const evangelismCourse = await academyDB.queryRow<{ id: number }>`
      SELECT id FROM courses WHERE lower(title) LIKE '%evangelism essentials%'
    `;
    if (!evangelismCourse) {
      throw APIError.failedPrecondition("Evangelism Essentials course not found.");
    }

    const progress = await academyDB.queryRow<{ completed_at: string }>`
      SELECT completed_at FROM course_progress WHERE user_id = ${userId} AND course_id = ${evangelismCourse.id}
    `;
    if (!progress?.completed_at) {
      throw APIError.failedPrecondition("You must complete the 'Evangelism Essentials' course before joining.");
    }

    // Requirement 2: Check if user is already an affiliate.
    const existingProfile = await outreachDB.queryRow`SELECT user_id FROM affiliate_profiles WHERE user_id = ${userId}`;
    if (existingProfile) {
      throw APIError.alreadyExists("You are already part of the Soul Outreach program.");
    }

    // Find sponsor if code is provided
    let sponsorId: string | null = null;
    let level = 1;
    if (sponsorCode) {
      const sponsor = await outreachDB.queryRow<{ user_id: string; level: number }>`
        SELECT user_id, level FROM affiliate_profiles WHERE referral_code = ${sponsorCode}
      `;
      if (sponsor) {
        sponsorId = sponsor.user_id;
        level = sponsor.level + 1;
      }
    }

    // Determine profile type based on subscription
    const sub = await membership.getSubscription();
    const profileType = sub.active && sub.planCode === 'PARTNER' ? 'church' : 'individual';

    // Create the new affiliate profile
    const referralCode = `CMD${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    await outreachDB.exec`
      INSERT INTO affiliate_profiles (user_id, referral_code, sponsor_id, level, rank, is_active, joined_at, profile_type)
      VALUES (${userId}, ${referralCode}, ${sponsorId}, ${level}, 'Bronze', true, NOW(), ${profileType})
    `;

    // If there's a sponsor, create the referral link
    if (sponsorId) {
      await outreachDB.exec`
        INSERT INTO affiliate_referrals (referrer_id, referred_id, level, commission_rate)
        VALUES (${sponsorId}, ${userId}, 1, 0.20) -- Level 1 referral
      `;
    }

    return { success: true, referralCode };
  }
);
