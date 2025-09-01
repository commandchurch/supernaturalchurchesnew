import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// List staff members
export const listStaff = query({
  args: {},
  handler: async (ctx) => {
    const staff = await ctx.db.query("staff").collect();
    return { staff };
  },
});

// Create staff member
export const createStaff = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    position: v.string(),
    department: v.string(),
    startDate: v.number(),
    emergencyContact: v.optional(v.string()),
    emergencyPhone: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffId = await ctx.db.insert("staff", {
      ...args,
      isActive: true,
      complianceStatus: "pending",
    });
    return { success: true, staffId };
  },
});

// Update staff member
export const updateStaff = mutation({
  args: {
    staffId: v.id("staff"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    position: v.optional(v.string()),
    department: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    emergencyContact: v.optional(v.string()),
    emergencyPhone: v.optional(v.string()),
    notes: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    complianceStatus: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { staffId, ...updates } = args;
    await ctx.db.patch(staffId, updates);
    return { success: true, staffId };
  },
});

// Delete staff member
export const deleteStaff = mutation({
  args: { staffId: v.id("staff") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.staffId);
    return { success: true, staffId: args.staffId };
  },
});

// Additional staff management functions

// Deactivate staff member (soft delete)
export const deactivateStaff = mutation({
  args: { 
    staffId: v.id("staff"),
    endDate: v.optional(v.number()),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.staffId, {
      isActive: false,
      endDate: args.endDate || Date.now(),
      deactivationReason: args.reason,
    });
    return { success: true, staffId: args.staffId };
  },
});

// Update compliance status
export const updateComplianceStatus = mutation({
  args: {
    staffId: v.id("staff"),
    status: v.string(), // "pending", "approved", "rejected", "expired"
    updatedBy: v.id("users"),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.staffId, {
      complianceStatus: args.status,
      complianceUpdatedBy: args.updatedBy,
      complianceUpdatedAt: Date.now(),
      complianceNotes: args.notes,
    });
    return { success: true, staffId: args.staffId };
  },
});
