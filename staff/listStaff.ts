import { api } from "encore.dev/api";
import { staffDB } from "./db";
import type { StaffProfile } from "./types";
import { computeComplianceFor } from "./util_compliance";
import { requireAdmin } from "../auth/admin";

// Lists all staff/volunteer profiles with derived compliance status.
export const listStaff = api<void, { staff: StaffProfile[] }>(
  {
    auth: true,
    expose: true,
    method: "GET",
    path: "/admin/staff"
  },
  async () => {
    requireAdmin();
    const rows = await staffDB.queryAll<any>`SELECT * FROM staff_profiles ORDER BY created_at DESC`;
    const staff: StaffProfile[] = [];
    for (const r of rows) {
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
      staff.push(s);
    }
    return { staff };
  }
);
