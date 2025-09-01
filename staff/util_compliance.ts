import { SQLDatabase } from "encore.dev/storage/sqldb";
import type { StaffProfile } from "./types";

// Reference academy database by name to check training completion.
// Ensure "academy" DB exists in the application.
const academyDB = SQLDatabase.named("academy");

// Determines whether staff meets required compliance based on their desired roles.
export async function computeComplianceFor(sp: StaffProfile): Promise<StaffProfile["compliance"]> {
  const requiresBlueCard = !!sp.wantsChildrenWork;
  const hasBlueCard =
    !!sp.blueCardNumber &&
    !!sp.blueCardExpiry &&
    new Date(sp.blueCardExpiry) >= new Date();

  // Ministry team training requirement:
  const requiresMinistryTraining = !!sp.wantsMinistryTeam;
  let ministryTrainingCompleted = !!sp.trainingCompletedManual;
  if (requiresMinistryTraining && !ministryTrainingCompleted && sp.userId) {
    // Check if the user completed the "Ministering at a Church Meeting" course.
    const course = await academyDB.queryRow<{ id: number }>`
      SELECT id FROM courses WHERE lower(title) LIKE '%ministering at a church meeting%'
    `;
    if (course) {
      const prog = await academyDB.queryRow<{ completed_at: string | null }>`
        SELECT completed_at FROM course_progress WHERE user_id = ${sp.userId} AND course_id = ${course.id}
      `;
      ministryTrainingCompleted = !!prog?.completed_at;
    } else {
      // If course not found, we keep manual flag as the only indicator.
      ministryTrainingCompleted = !!sp.trainingCompletedManual;
    }
  }

  // Documents: policy ack + background + police + driver's license
  const documentsComplete =
    !!sp.policyAcknowledged &&
    !!sp.backgroundCheckCompleted &&
    !!sp.policeCheckCompleted &&
    !!sp.driversLicenseFrontUrl;

  const eligible =
    (!requiresBlueCard || hasBlueCard) &&
    (!requiresMinistryTraining || ministryTrainingCompleted) &&
    documentsComplete;

  return {
    requiresBlueCard,
    hasBlueCard,
    requiresMinistryTraining,
    ministryTrainingCompleted,
    documentsComplete,
    eligible,
  };
}
