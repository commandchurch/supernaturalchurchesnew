import { api, APIError } from "encore.dev/api";
import { staffDB } from "./db";
import type { StaffProfile } from "./types";
import { requireAdmin } from "../auth/admin";

interface UpdateStaffParams {
  id: number;
  userId?: string | null;
  fullName?: string;
  email?: string | null;
  mobile?: string | null;
  paid?: boolean;
  avatarUrl?: string | null;
  driversLicenseFrontUrl?: string | null;
  wantsChildrenWork?: boolean;
  wantsMinistryTeam?: boolean;
  blueCardNumber?: string | null;
  blueCardExpiry?: string | null; // ISO date string or null
  policyAcknowledged?: boolean;
  backgroundCheckCompleted?: boolean;
  policeCheckCompleted?: boolean;
  trainingCompletedManual?: boolean;
}

export const updateStaff = api<UpdateStaffParams, StaffProfile>(
  { auth: true, expose: true, method: "PUT", path: "/admin/staff/:id" },
  async (p) => {
    requireAdmin();
    const existing = await staffDB.queryRow`SELECT id FROM staff_profiles WHERE id = ${p.id}`;
    if (!existing) {
      throw APIError.notFound("staff not found");
    }

    // If userId is set, ensure uniqueness (other rows must not have same user_id)
    if (p.userId) {
      const conflict = await staffDB.queryRow`SELECT id FROM staff_profiles WHERE user_id = ${p.userId} AND id <> ${p.id}`;
      if (conflict) {
        throw APIError.alreadyExists("another staff profile already uses this userId");
      }
    }

    await staffDB.exec`
      UPDATE staff_profiles
      SET
        user_id = COALESCE(${p.userId ?? null}, user_id),
        full_name = COALESCE(${p.fullName ?? null}, full_name),
        email = COALESCE(${p.email ?? null}, email),
        mobile = COALESCE(${p.mobile ?? null}, mobile),
        paid = COALESCE(${typeof p.paid === "boolean" ? p.paid : null}, paid),
        avatar_url = COALESCE(${p.avatarUrl ?? null}, avatar_url),
        drivers_license_front_url = COALESCE(${p.driversLicenseFrontUrl ?? null}, drivers_license_front_url),
        wants_children_work = COALESCE(${typeof p.wantsChildrenWork === "boolean" ? p.wantsChildrenWork : null}, wants_children_work),
        wants_ministry_team = COALESCE(${typeof p.wantsMinistryTeam === "boolean" ? p.wantsMinistryTeam : null}, wants_ministry_team),
        blue_card_number = COALESCE(${p.blueCardNumber ?? null}, blue_card_number),
        blue_card_expiry = COALESCE(${p.blueCardExpiry ?? null}, blue_card_expiry),
        policy_acknowledged = COALESCE(${typeof p.policyAcknowledged === "boolean" ? p.policyAcknowledged : null}, policy_acknowledged),
        background_check_completed = COALESCE(${typeof p.backgroundCheckCompleted === "boolean" ? p.backgroundCheckCompleted : null}, background_check_completed),
        police_check_completed = COALESCE(${typeof p.policeCheckCompleted === "boolean" ? p.policeCheckCompleted : null}, police_check_completed),
        training_completed_manual = COALESCE(${typeof p.trainingCompletedManual === "boolean" ? p.trainingCompletedManual : null}, training_completed_manual),
        updated_at = NOW()
      WHERE id = ${p.id}
    `;

    const row = await staffDB.queryRow<any>`SELECT * FROM staff_profiles WHERE id = ${p.id}`;
    return mapRow(row!);
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
