import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get subscription plans
export const getSubscriptionPlans = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("subscriptionPlans")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Create subscription plans (admin function)
export const createSubscriptionPlan = mutation({
  args: {
    code: v.string(),
    name: v.string(),
    priceMonthly: v.number(),
    features: v.array(v.string()),
    stripePriceId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("subscriptionPlans", {
      ...args,
      isActive: true,
    });
  },
});

// Get user's subscription
export const getUserSubscription = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!subscription) return null;

    const plan = await ctx.db
      .query("subscriptionPlans")
      .withIndex("by_code", (q) => q.eq("code", subscription.planCode))
      .first();

    return {
      ...subscription,
      plan,
    };
  },
});

// Activate subscription (called from Stripe webhook)
export const activateSubscription = mutation({
  args: {
    userId: v.id("users"),
    planCode: v.string(),
    stripeSubscriptionId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if plan exists
    const plan = await ctx.db
      .query("subscriptionPlans")
      .withIndex("by_code", (q) => q.eq("code", args.planCode))
      .first();

    if (!plan) {
      throw new Error("Invalid plan code");
    }

    // Check if user already has a subscription
    const existingSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    const now = Date.now();
    const renewsAt = now + (30 * 24 * 60 * 60 * 1000); // 30 days from now

    if (existingSubscription) {
      // Update existing subscription
      await ctx.db.patch(existingSubscription._id, {
        planCode: args.planCode,
        status: "active",
        renewsAt,
        canceledAt: undefined,
        stripeSubscriptionId: args.stripeSubscriptionId,
      });
      return existingSubscription._id;
    } else {
      // Create new subscription
      return await ctx.db.insert("subscriptions", {
        userId: args.userId,
        planCode: args.planCode,
        status: "active",
        startedAt: now,
        renewsAt,
        stripeSubscriptionId: args.stripeSubscriptionId,
      });
    }
  },
});

// Cancel subscription
export const cancelSubscription = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!subscription) {
      throw new Error("No subscription found");
    }

    await ctx.db.patch(subscription._id, {
      status: "canceled",
      canceledAt: Date.now(),
    });

    return subscription._id;
  },
});

// Check if user has access to premium content
export const checkPremiumAccess = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    if (!subscription) return false;

    // Check if subscription is still valid
    const now = Date.now();
    return subscription.renewsAt ? subscription.renewsAt > now : true;
  },
});

// Frontend compatibility functions
export const getSubscription = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return { subscription: null };
  },
});

export const listPlans = query({
  args: {},
  handler: async (ctx) => {
    const plans = await ctx.db
      .query("subscriptionPlans")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    return { plans };
  },
});
