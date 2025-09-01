import { api } from "encore.dev/api";
import { paymentDB } from "./db";

interface LinkStripeCustomerParams {
  userId: string;
  stripeCustomerId: string;
}

// Links a user to a Stripe customer ID. Called internally.
export const linkStripeCustomer = api<LinkStripeCustomerParams, void>(
  { method: "POST", path: "/payment/link-stripe-customer" },
  async ({ userId, stripeCustomerId }) => {
    await paymentDB.exec`
      INSERT INTO stripe_customers (user_id, stripe_customer_id)
      VALUES (${userId}, ${stripeCustomerId})
      ON CONFLICT (user_id) DO UPDATE SET
        stripe_customer_id = EXCLUDED.stripe_customer_id
    `;
  }
);
