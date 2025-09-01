import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Funding Requests
export const submitFundingRequest = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    targetAmount: v.number(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("fundingRequests", {
      ...args,
      currentAmount: 0,
      isApproved: false,
    });
  },
});

export const getFundingRequests = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db
      .query("fundingRequests")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .collect();

    const requestsWithUsers = await Promise.all(
      requests.map(async (request) => {
        const user = await ctx.db.get(request.userId);
        return { ...request, user };
      })
    );

    return requestsWithUsers;
  },
});

export const getAllFundingRequests = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db.query("fundingRequests").collect();

    const requestsWithUsers = await Promise.all(
      requests.map(async (request) => {
        const user = await ctx.db.get(request.userId);
        let approver = null;
        if (request.approvedBy) {
          approver = await ctx.db.get(request.approvedBy);
        }
        return { ...request, user, approver };
      })
    );

    return requestsWithUsers;
  },
});

export const approveFundingRequest = mutation({
  args: {
    requestId: v.id("fundingRequests"),
    approverId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.requestId, {
      isApproved: true,
      approvedBy: args.approverId,
      approvedAt: Date.now(),
    });
    return args.requestId;
  },
});

export const rejectFundingRequest = mutation({
  args: {
    requestId: v.id("fundingRequests"),
    approverId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.requestId, {
      isApproved: false,
      approvedBy: args.approverId,
      approvedAt: Date.now(),
    });
    return args.requestId;
  },
});

// Donations and Balance
export const getBalance = query({
  args: {},
  handler: async (ctx) => {
    const donations = await ctx.db.query("donations").collect();
    const totalReceived = donations
      .filter(d => d.status === "succeeded")
      .reduce((sum, d) => sum + d.amount, 0);

    const requests = await ctx.db.query("fundingRequests").collect();
    const totalAllocated = requests
      .filter(r => r.isApproved)
      .reduce((sum, r) => sum + r.currentAmount, 0);

    return {
      totalReceived,
      totalAllocated,
      availableBalance: totalReceived - totalAllocated,
    };
  },
});

export const getTransactions = query({
  args: {},
  handler: async (ctx) => {
    const donations = await ctx.db.query("donations").collect();
    
    const donationsWithUsers = await Promise.all(
      donations.map(async (donation) => {
        const user = await ctx.db.get(donation.userId);
        let request = null;
        if (donation.requestId) {
          request = await ctx.db.get(donation.requestId);
        }
        return { 
          ...donation, 
          user, 
          request,
          type: "donation" as const,
        };
      })
    );

    return donationsWithUsers.sort((a, b) => b._creationTime - a._creationTime);
  },
});

// Frontend compatibility functions
export const listNeeds = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db
      .query("fundingRequests")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .collect();
    return { needs: requests };
  },
});

export const listTransactions = query({
  args: {},
  handler: async (ctx) => {
    const transactions = await ctx.runQuery("fund:getTransactions");
    return { transactions };
  },
});

export const approveNeed = mutation({
  args: { 
    requestId: v.id("fundingRequests"),
    approverId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.requestId, {
      isApproved: true,
      approvedBy: args.approverId,
      approvedAt: Date.now(),
    });
    return { success: true, requestId: args.requestId };
  },
});

export const rejectNeed = mutation({
  args: { 
    requestId: v.id("fundingRequests"),
    approverId: v.id("users"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.requestId, {
      isApproved: false,
      approvedBy: args.approverId,
      approvedAt: Date.now(),
      rejectionReason: args.reason,
    });
    return { success: true, requestId: args.requestId };
  },
});
