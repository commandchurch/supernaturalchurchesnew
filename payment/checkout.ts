import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";
import Stripe from "stripe";
import { getAuthData } from "~encore/auth";
import { paymentDB } from "./db";
import { membershipDB } from "../membership/db";

const stripeKey = secret("StripeSecretKey");

interface CreateCheckoutSessionParams {
  planCode: string;
  successUrl: string;
  cancelUrl: string;
}

interface CreateCheckoutSessionResponse {
  sessionId: string;
}

// Creates a Stripe Checkout session for a subscription.
export const createCheckoutSession = api<CreateCheckoutSessionParams, CreateCheckoutSessionResponse>(
  { auth: true, expose: true, method: "POST", path: "/payment/checkout" },
  async ({ planCode, successUrl, cancelUrl }) => {
    const auth = getAuthData()!;
    const stripe = new Stripe(stripeKey(), { apiVersion: "2025-02-24.acacia" });

    const plan = await membershipDB.queryRow<{ price_monthly: string }>`
      SELECT price_monthly FROM subscription_plans WHERE code = ${planCode}
    `;
    if (!plan) {
      throw APIError.notFound("plan not found");
    }

    // Find or create a Stripe customer for this user
    let customerId: string;
    const existingCustomer = await paymentDB.queryRow<{ stripe_customer_id: string }>`
      SELECT stripe_customer_id FROM stripe_customers WHERE user_id = ${auth.userID}
    `;

    if (existingCustomer) {
      customerId = existingCustomer.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: auth.email || undefined,
        name: auth.name || undefined,
        metadata: { userId: auth.userID },
      });
      customerId = customer.id;
      await paymentDB.exec`
        INSERT INTO stripe_customers (user_id, stripe_customer_id)
        VALUES (${auth.userID}, ${customerId})
      `;
    }

    // Create a Stripe Price ID on the fly (or retrieve if it exists)
    // For production, you would create these in your Stripe dashboard.
    const price = await stripe.prices.create({
      currency: "aud",
      unit_amount: parseFloat(plan.price_monthly) * 100, // price in cents
      recurring: { interval: "month" },
      product_data: { name: `Command Church - ${planCode}` },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      subscription_data: {
        metadata: {
          userId: auth.userID,
          planCode: planCode,
        },
      },
    });

    if (!session.id) {
      throw APIError.internal("failed to create stripe session");
    }

    return { sessionId: session.id };
  }
);
