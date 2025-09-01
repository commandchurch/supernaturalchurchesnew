import { api, APIError, Request } from "encore.dev/api";
import { secret } from "encore.dev/config";
import Stripe from "stripe";
import { membership } from "~encore/clients";
import { membershipDB } from "../membership/db";
import { paymentTopic } from "../commission/pubsub";

const stripeKey = secret("StripeSecretKey");
const webhookSecret = secret("StripeWebhookSecret");

// Handles incoming Stripe webhooks.
export const webhook = api.raw(
  { expose: true, path: "/payment/webhook" },
  async (req: Request) => {
    const stripe = new Stripe(stripeKey(), { apiVersion: "2024-04-10" });
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      throw APIError.invalidArgument("missing stripe signature");
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret());
    } catch (err: any) {
      throw APIError.invalidArgument(`webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        const userId = sub.metadata.userId;
        const planCode = sub.metadata.planCode;
        if (!userId || !planCode || !session.customer) {
          throw APIError.invalidArgument("missing metadata on subscription");
        }
        await membership.activateSubscription({
          userId,
          planCode,
          stripeSubscriptionId: sub.id,
          stripeCustomerId: session.customer as string,
        });

        // Publish event for commission calculation
        await paymentTopic.publish({
          userId,
          planCode,
          amountPaid: session.amount_total || 0, // amount_total is in cents
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: sub.id,
        });
        
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const status = sub.status;
        await membershipDB.exec`
          UPDATE subscriptions SET status = ${status}, updated_at = NOW()
          WHERE stripe_subscription_id = ${sub.id}
        `;
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { status: 200, body: { received: true } };
  }
);
