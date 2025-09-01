import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Stripe webhook handler
http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    // In a real implementation, you'd verify the webhook signature here
    // For now, we'll parse the basic event structure
    
    try {
      const event = JSON.parse(body);
      
      switch (event.type) {
        case "checkout.session.completed":
          // Handle successful subscription signup
          const session = event.data.object;
          if (session.mode === "subscription") {
            // Extract user and subscription data
            const metadata = session.metadata;
            if (metadata?.userId && metadata?.planCode) {
              await ctx.runMutation(api.membership.activateSubscription, {
                userId: metadata.userId as any,
                planCode: metadata.planCode,
                stripeSubscriptionId: session.subscription,
              });
            }
          }
          break;

        case "payment_intent.succeeded":
          // Handle successful donation
          const paymentIntent = event.data.object;
          await ctx.runMutation(api.payments.updateDonationStatus, {
            stripePaymentIntentId: paymentIntent.id,
            status: "succeeded",
          });
          break;

        case "payment_intent.payment_failed":
          // Handle failed donation
          const failedPayment = event.data.object;
          await ctx.runMutation(api.payments.updateDonationStatus, {
            stripePaymentIntentId: failedPayment.id,
            status: "failed",
          });
          break;

        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          // Handle subscription changes
          const subscription = event.data.object;
          // You'd implement subscription update logic here
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response("Webhook error", { status: 400 });
    }
  }),
});

// Clerk webhook handler
http.route({
  path: "/clerk/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.text();
    
    try {
      const event = JSON.parse(body);
      
      switch (event.type) {
        case "user.created":
          await ctx.runMutation(api.auth.createUser, {
            clerkId: event.data.id,
            email: event.data.email_addresses?.[0]?.email_address,
            name: `${event.data.first_name || ""} ${event.data.last_name || ""}`.trim(),
            profilePicture: event.data.image_url,
          });
          break;

        case "user.updated":
          await ctx.runMutation(api.auth.createUser, {
            clerkId: event.data.id,
            email: event.data.email_addresses?.[0]?.email_address,
            name: `${event.data.first_name || ""} ${event.data.last_name || ""}`.trim(),
            profilePicture: event.data.image_url,
          });
          break;

        case "user.deleted":
          await ctx.runMutation(api.auth.deleteUser, {
            clerkId: event.data.id,
          });
          break;

        default:
          console.log(`Unhandled Clerk event type: ${event.type}`);
      }

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Clerk webhook error:", error);
      return new Response("Webhook error", { status: 400 });
    }
  }),
});

export default http;
