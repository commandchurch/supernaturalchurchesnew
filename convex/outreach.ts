import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get user outreach stats
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    return {
      weeklyEarnings: 0,
      totalEarnings: 0,
      referralCount: 0,
      rank: "Bronze"
    };
  },
});

// List outreach profiles - for admin
export const listProfiles = query({
  args: {},
  handler: async (ctx) => {
    return { profiles: [] };
  },
});

// List leaderboard
export const listLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    return { leaderboard: [] };
  },
});

// List withdrawals - for admin
export const listWithdrawals = query({
  args: {},
  handler: async (ctx) => {
    return { withdrawals: [] };
  },
});

// Approve withdrawal - for admin
export const approveWithdrawal = mutation({
  args: { 
    withdrawalId: v.id("outreachWithdrawals"),
    approverId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.withdrawalId, {
      status: "approved",
      approvedBy: args.approverId,
      approvedAt: Date.now(),
    });
    return { success: true, withdrawalId: args.withdrawalId };
  },
});

// Reject withdrawal - for admin
export const rejectWithdrawal = mutation({
  args: { 
    withdrawalId: v.id("outreachWithdrawals"),
    approverId: v.id("users"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.withdrawalId, {
      status: "rejected",
      approvedBy: args.approverId,
      approvedAt: Date.now(),
      rejectionReason: args.reason,
    });
    return { success: true, withdrawalId: args.withdrawalId };
  },
});

// Seed network - for admin
export const seedNetwork = mutation({
  args: {},
  handler: async (ctx) => {
    return { success: true };
  },
});
