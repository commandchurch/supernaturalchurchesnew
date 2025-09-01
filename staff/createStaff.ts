import { api, APIError } from "encore.dev/api";
import { staffDB } from "./db";
import type { StaffProfile } from "./types";
import { requireAdmin } from "../auth/admin";

// Creates a staff/volunteer profile for CRM tracking and compliance.
interface CreateStaffParams {
  userId?: string;
  fullName: string;
  email?: string;
  mobile?: string;
  paid?: boolean;
  avatarUrl?: string;
  wantsChildrenWork?: boolean;
  wantsMinistryTeam?: boolean;
}

export const createStaff = api<CreateStaffParams, StaffProfile>(
  { auth: true, expose: true, method: "POST", path: "/admin/staff" },
  async (p) => {
    requireAdmin();
    if (!p.fullName?.trim()) {
      throw APIError.invalidArgument("fullName is required");
    }
    // If userId is provided, enforce uniqueness
    if (p.userId) {
      const existing = await staffDB.queryRow`SELECT id FROM staff_profiles WHERE user_id = ${p.userId}`;
      if (existing) {
        throw APIError.alreadyExists("staff profile for this user already exists");
      }
    }

    const row = await staffDB.queryRow<{
      id: number;
      user_id?: string | null;
      full_name: string;
      email?: string | null;
      mobile?: string | null;
      paid: boolean;
      avatar_url?: string | null;
      drivers_license_front_url?: string | null;
      wants_children_work: boolean;
      wants_ministry_team: boolean;
      blue_card_number?: string | null;
      blue_card_expiry?: string | null;
      policy_acknowledged: boolean;
      background_check_completed: boolean;
      police_check_completed: boolean;
      training_completed_manual: boolean;
      forms_last_sent_at?: string | null;
      created_at: string;
      updated_at: string;
    }>`
      INSERT INTO staff_profiles (
        user_id, full_name, email, mobile, paid, avatar_url,
        wants_children_work, wants_ministry_team, updated_at
      )
      VALUES (
        ${p.userId || null}, ${p.fullName}, ${p.email || null}, ${p.mobile || null},
        ${!!p.paid}, ${p.avatarUrl || null}, ${!!p.wantsChildrenWork}, ${!!p.wantsMinistryTeam}, NOW()
      )
      RETURNING *
    `;

    if (!row) {
      throw APIError.internal("failed to create staff");
    }

    return mapRow(row);
  }
);

function mapRow(r: any): StaffProfile {
  return {
    id: r.id,
    userId: r.user_id ?? null,
    fullName: r.full_name,
    email: r.email ?? null,
    mobile: r.mobile ?? null,
    paid: r.paid,
    avatarUrl: r.avatar_url ?? null,
    driversLicenseFrontUrl: r.drivers_license_front_url ?? null,
    wantsChildrenWork: r.wants_children_work,
    wantsMinistryTeam: r.wants_ministry_team,
    blueCardNumber: r.blue_card_number ?? null,
    blueCardExpiry: r.blue_card_expiry ?? null,
    policyAcknowledged: r.policy_acknowledged,
    backgroundCheckCompleted: r.background_check_completed,
    policeCheckCompleted: r.police_check_completed,
    trainingCompletedManual: r.training_completed_manual,
    formsLastSentAt: r.forms_last_sent_at ?? null,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}
