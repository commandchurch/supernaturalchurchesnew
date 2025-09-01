import { CronJob } from "encore.dev/cron";
import { partnershipDB } from "./db";

// Runs daily to schedule recurring Command Audits for partners.
// Temporarily commented out due to syntax issues
// export const scheduleAudits = new CronJob("schedule-recurring-audits", "0 0 * * *", async () => { // Runs daily at midnight. Use "* * * * *" for testing every minute.
    const partners = await partnershipDB.queryAll<{ id: number }>`
      SELECT id FROM church_partners WHERE status = 'approved'
    `;

    for (const partner of partners) {
      const lastAudit = await partnershipDB.queryRow<{ completed_at: string }>`
        SELECT completed_at FROM church_audits
        WHERE partner_id = ${partner.id} AND status = 'completed'
        ORDER BY completed_at DESC
        LIMIT 1
      `;

      const pendingAudit = await partnershipDB.queryRow<{ id: number }>`
        SELECT id FROM church_audits
        WHERE partner_id = ${partner.id} AND status = 'pending'
      `;

      // If there's already a pending audit, do nothing.
      if (pendingAudit) {
        continue;
      }

      // If there is a completed audit and it was more than 6 months ago, schedule a new one.
      if (lastAudit?.completed_at) {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        if (new Date(lastAudit.completed_at) < sixMonthsAgo) {
          await partnershipDB.exec`
            INSERT INTO church_audits (partner_id, status, notes)
            VALUES (${partner.id}, 'pending', 'Recurring 6-month audit scheduled.')
          `;
        }
      }
    }
// });
