  import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

// Link Stripe customer to user
export const linkStripeCustomer = mutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("stripeCustomers")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        stripeCustomerId: args.stripeCustomerId,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("stripeCustomers", {
        userId: args.userId,
        stripeCustomerId: args.stripeCustomerId,
      });
    }
  },
});

// Get Stripe customer ID for user
export const getStripeCustomer = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stripeCustomers")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();
  },
});

// Create donation
export const createDonation = mutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
    stripePaymentIntentId: v.string(),
    requestId: v.optional(v.id("fundingRequests")),
    donationType: v.string(),
  },
  handler: async (ctx, args) => {
    const donationId = await ctx.db.insert("donations", {
      ...args,
      status: "pending",
    });

    // If this is for a specific funding request, update the current amount
    if (args.requestId) {
      const request = await ctx.db.get(args.requestId);
      if (request) {
        await ctx.db.patch(args.requestId, {
          currentAmount: request.currentAmount + args.amount,
        });
      }
    }

    return donationId;
  },
});

// Update donation status (from Stripe webhook)
export const updateDonationStatus = mutation({
  args: {
    stripePaymentIntentId: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const donations = await ctx.db
      .query("donations")
      .filter((q) => q.eq(q.field("stripePaymentIntentId"), args.stripePaymentIntentId))
      .collect();

    for (const donation of donations) {
      await ctx.db.patch(donation._id, {
        status: args.status,
      });
    }

    return donations.length;
  },
});

// Get user's donation history
export const getUserDonations = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const donations = await ctx.db
      .query("donations")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    const donationsWithRequests = await Promise.all(
      donations.map(async (donation) => {
        if (donation.requestId) {
          const request = await ctx.db.get(donation.requestId);
          return { ...donation, request };
        }
        return donation;
      })
    );

    return donationsWithRequests;
  },
});

// Get donation analytics (admin)
export const getDonationAnalytics = query({
  args: {},
  handler: async (ctx) => {
    const donations = await ctx.db.query("donations").collect();
    
    const totalAmount = donations
      .filter(d => d.status === "succeeded")
      .reduce((sum, d) => sum + d.amount, 0);
    
    const monthlyTotals = donations
      .filter(d => d.status === "succeeded")
      .reduce((acc, donation) => {
        const month = new Date(donation._creationTime).toISOString().substring(0, 7);
        acc[month] = (acc[month] || 0) + donation.amount;
        return acc;
      }, {} as Record<string, number>);

    return {
      totalAmount,
      totalDonations: donations.filter(d => d.status === "succeeded").length,
      monthlyTotals,
    };
  },
});

// Create Stripe checkout session for subscription
export const createCheckoutSession = action({
  args: {
    planCode: v.string(),
    successUrl: v.string(),
    cancelUrl: v.string(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { planCode, successUrl, cancelUrl, userId } = args;
    
    // Get the plan details - use API reference
    const plans = await ctx.runQuery(api.membership.getSubscriptionPlans);
    console.log("payments:createCheckoutSession → planCode:", planCode);
    const plan = plans.find((p: any) => p.code === planCode);
    
    if (!plan) {
      throw new Error(`Plan not found: ${planCode}`);
    }

    // Import Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    try {
      // Convert price to cents for Stripe (AUD)
      if (typeof plan.priceMonthly !== 'number' || isNaN(plan.priceMonthly)) {
        throw new Error(`Invalid price for plan ${plan.code}: ${String(plan.priceMonthly)}`);
      }
      const priceInCents = Math.round(plan.priceMonthly * 100);
      
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'aud',
              product_data: {
                name: plan.name,
                description: `Monthly subscription to ${plan.name}`,
              },
              unit_amount: priceInCents,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          planCode: planCode,
          userId: userId || '',
        },
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    } catch (error: any) {
      console.error('Stripe checkout session creation failed:', error);
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }
  },
});