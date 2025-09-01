import { api, APIError } from "encore.dev/api";
import { staffDB } from "./db";
import type { StaffProfile } from "./types";
import { computeComplianceFor } from "./util_compliance";
import { requireAdmin } from "../auth/admin";

interface GetComplianceParams {
  id: number;
}

interface GetComplianceResponse {
  profile: StaffProfile;
}

// Returns a single staff profile with derived compliance status.
export const getCompliance = api<GetComplianceParams, GetComplianceResponse>(
  { auth: true, expose: true, method: "GET", path: "/admin/staff/:id/compliance" },
  async ({ id }) => {
    requireAdmin();
    const r = await staffDB.queryRow<any>`SELECT * FROM staff_profiles WHERE id = ${id}`;
    if (!r) throw APIError.notFound("staff not found");
    const s: StaffProfile = {
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
    s.compliance = await computeComplianceFor(s);
    return { profile: s };
  }
);
