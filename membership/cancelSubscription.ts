import { api, APIError } from "encore.dev/api";
import { membershipDB } from "./db";
import { getAuthData } from "~encore/auth";
import { secret } from "encore.dev/config";
import Stripe from "stripe";

const stripeKey = secret("StripeSecretKey");

interface CancelSubscriptionResponse {
  success: boolean;
  status: string;
}

// Cancels the authenticated user's active subscription.
export const cancelSubscription = api<void, CancelSubscriptionResponse>(
  { auth: true, expose: true, method: "POST", path: "/membership/subscription/cancel" },
  async () => {
    const auth = getAuthData()!;
    const stripe = new Stripe(stripeKey(), { apiVersion: '2025-02-24.acacia' });

    const sub = await membershipDB.queryRow<{ stripe_subscription_id: string }>`
      SELECT stripe_subscription_id FROM subscriptions
      WHERE user_id = ${auth.userID} AND status = 'active'
    `;

    if (!sub?.stripe_subscription_id) {
      throw APIError.notFound("No active subscription found to cancel.");
    }

    try {
      await stripe.subscriptions.update(sub.stripe_subscription_id, {
        cancel_at_period_end: true,
      });
    } catch (err: any) {
      // If subscription is already canceled on Stripe, we can ignore the error.
      if (err.code !== 'resource_missing') {
        throw APIError.internal("Failed to cancel Stripe subscription");
      }
    }

    await membershipDB.exec`
      UPDATE subscriptions
      SET status = 'canceled', canceled_at = NOW(), updated_at = NOW()
      WHERE user_id = ${auth.userID}
    `;
    return { success: true, status: "canceled" };
  }
);
