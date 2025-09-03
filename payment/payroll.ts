import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { paymentDB } from "./db";
import { outreachDB } from "../outreach/db";
import Stripe from "stripe";
import { secret } from "encore.dev/config";

const stripeKey = secret("StripeSecretKey");

// Batch payroll processing for first 90 days
export const processBatchPayroll = api(
  { auth: true, expose: true, method: "POST", path: "/payment/payroll/batch" },
  async (): Promise<{ processed: number; totalAmount: number; errors: string[] }> => {
    const auth = getAuthData()!;
    const stripe = new Stripe(stripeKey(), { apiVersion: "2025-02-24.acacia" });

    // Only allow admin users to process payroll
    if (!auth.email?.includes('admin')) {
      throw APIError.notFound("Admin access required");
    }

    const errors: string[] = [];
    let processed = 0;
    let totalAmount = 0;

    try {
      // Get all pending commissions that are 28+ days old
      const pendingCommissions = await outreachDB.query`
        SELECT
          c.id,
          c.user_id,
          c.amount,
          c.created_at,
          u.email,
          sc.stripe_customer_id
        FROM commissions c
        JOIN users u ON c.user_id = u.id
        LEFT JOIN stripe_customers sc ON c.user_id = sc.user_id
        WHERE c.status = 'pending'
        AND c.created_at <= datetime('now', '-28 days')
        AND c.amount >= 10.00  -- Minimum payout threshold
      `;

      // Convert async generator to array
      const commissionsArray = [];
      for await (const commission of pendingCommissions) {
        commissionsArray.push(commission);
      }

      for (const commission of commissionsArray) {
        try {
          if (!commission.stripe_customer_id) {
            errors.push(`No Stripe customer for user ${commission.user_id}`);
            continue;
          }

          // Create payout to affiliate's Stripe account
          const payout = await stripe.payouts.create({
            amount: Math.round(commission.amount * 100), // Convert to cents
            currency: 'aud',
            destination: commission.stripe_customer_id,
            description: `Commission payout - ${commission.id}`,
            metadata: {
              commissionId: commission.id,
              userId: commission.user_id
            }
          });

          // Mark commission as paid
          await outreachDB.exec`
            UPDATE commissions
            SET status = 'paid', paid_at = datetime('now'), stripe_payout_id = ${payout.id}
            WHERE id = ${commission.id}
          `;

          processed++;
          totalAmount += commission.amount;

        } catch (error) {
          console.error(`Failed to process commission ${commission.id}:`, error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          errors.push(`Failed to process commission ${commission.id}: ${errorMessage}`);
        }
      }

    } catch (error) {
      console.error('Batch payroll processing failed:', error);
      throw APIError.internal('Batch payroll processing failed');
    }

    return { processed, totalAmount, errors };
  }
);


// Get payroll status and history
export const getPayrollStatus = api(
  { auth: true, expose: true, method: "GET", path: "/payment/payroll/status" },
  async (): Promise<{
    nextPayoutDate: string;
    pendingAmount: number;
    daysUntilPayout: number;
    launchDaysRemaining: number;
  }> => {
    const auth = getAuthData()!;

    // Calculate next payout date (Mondays and Fridays)
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[today.getDay()];

    let nextPayout = new Date(today);
    if (dayOfWeek === 'Monday' || dayOfWeek === 'Tuesday' || dayOfWeek === 'Wednesday' || dayOfWeek === 'Thursday') {
      // Next Friday
      nextPayout.setDate(today.getDate() + (5 - today.getDay()));
    } else if (dayOfWeek === 'Friday' || dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
      // Next Monday
      nextPayout.setDate(today.getDate() + (8 - today.getDay()));
    }

    // Get user's pending commissions
    const pendingCommissions = await outreachDB.queryRow<{ total: number }>`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM commissions
      WHERE user_id = ${auth.userID}
      AND status = 'pending'
      AND created_at <= datetime('now', '-28 days')
    `;

    // Calculate days until launch period ends
    const launchDate = new Date('2024-09-01'); // Set your actual launch date
    const daysSinceLaunch = Math.floor((Date.now() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const launchDaysRemaining = Math.max(0, 90 - daysSinceLaunch);

    return {
      nextPayoutDate: nextPayout.toISOString().split('T')[0],
      pendingAmount: pendingCommissions?.total || 0,
      daysUntilPayout: Math.ceil((nextPayout.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
      launchDaysRemaining
    };
  }
);

// Get cashflow analytics for admin
export const getCashflowAnalytics = api(
  { auth: true, expose: true, method: "GET", path: "/payment/cashflow/analytics" },
  async (): Promise<{
    totalPendingCommissions: number;
    totalPaidThisMonth: number;
    averageCommissionSize: number;
    cashflowEfficiency: number;
    projectedMonthlyPayouts: number;
    launchPeriodCashflow: {
      totalRevenue: number;
      totalCommissions: number;
      netCashflow: number;
      daysRemaining: number;
    };
  }> => {
    const auth = getAuthData()!;

    // Only allow admin users
    if (!auth.email?.includes('admin')) {
      throw APIError.notFound("Admin access required");
    }

    // Get total pending commissions
    const pendingResult = await outreachDB.queryRow<{ total: number }>`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM commissions
      WHERE status = 'pending'
      AND created_at <= datetime('now', '-28 days')
    `;

    // Get total paid this month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const paidResult = await outreachDB.queryRow<{ total: number }>`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM commissions
      WHERE status = 'paid'
      AND paid_at >= ${startOfMonth}
    `;

    // Get average commission size
    const avgResult = await outreachDB.queryRow<{ avg: number }>`
      SELECT AVG(amount) as avg
      FROM commissions
      WHERE status = 'paid'
      AND paid_at >= date('now', '-30 days')
    `;

    // Calculate launch period cashflow
    const launchDate = new Date('2024-09-01');
    const daysSinceLaunch = Math.floor((Date.now() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const launchDaysRemaining = Math.max(0, 90 - daysSinceLaunch);

    // Get total revenue and commissions during launch period
    const launchRevenue = await outreachDB.queryRow<{ total: number }>`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM commissions
      WHERE created_at >= ${launchDate}
    `;

    const totalPending = pendingResult?.total || 0;
    const totalPaid = paidResult?.total || 0;
    const avgCommission = avgResult?.avg || 0;

    // Project monthly payouts based on current trends
    const projectedMonthly = totalPaid * 1.2; // 20% growth projection

    // Calculate cashflow efficiency (70% retained for operations)
    const cashflowEfficiency = 0.7;

    return {
      totalPendingCommissions: totalPending,
      totalPaidThisMonth: totalPaid,
      averageCommissionSize: avgCommission,
      cashflowEfficiency,
      projectedMonthlyPayouts: projectedMonthly,
      launchPeriodCashflow: {
        totalRevenue: launchRevenue?.total || 0,
        totalCommissions: totalPending + totalPaid,
        netCashflow: (launchRevenue?.total || 0) * cashflowEfficiency,
        daysRemaining: launchDaysRemaining
      }
    };
  }
);