import { api, APIError } from "encore.dev/api";
import { membershipDB } from "./db";
import { payment } from "~encore/clients";

interface ActivateSubscriptionParams {
  userId: string;
  planCode: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
}

// Activates a user's subscription. Called internally by the payment webhook.
export const activateSubscription = api<ActivateSubscriptionParams, void>(
  { expose: false, method: "POST", path: "/membership/activate-subscription" },
  async ({ userId, planCode, stripeSubscriptionId, stripeCustomerId }) => {
    const plan = await membershipDB.queryRow<{ code: string }>`
      SELECT code FROM subscription_plans WHERE code = ${planCode}
    `;
    if (!plan) {
      throw APIError.invalidArgument("invalid plan");
    }

    // Ensure user exists in membership DB
    await membershipDB.exec`
      INSERT INTO users (id)
      VALUES (${userId})
      ON CONFLICT (id) DO NOTHING
    `;

    // Upsert subscription
    await membershipDB.exec`
      INSERT INTO subscriptions (user_id, plan_code, status, started_at, renews_at, updated_at, stripe_subscription_id)
      VALUES (${userId}, ${planCode}, 'active', NOW(), NOW() + interval '30 days', NOW(), ${stripeSubscriptionId})
      ON CONFLICT (user_id)
      DO UPDATE SET
        plan_code = EXCLUDED.plan_code,
        status = 'active',
        renews_at = NOW() + interval '30 days',
        updated_at = NOW(),
        canceled_at = NULL,
        stripe_subscription_id = EXCLUDED.stripe_subscription_id
    `;

    // Link our user to the stripe customer
    await payment.linkStripeCustomer({ userId, stripeCustomerId });
  },
);
