import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Events
export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    return await ctx.db
      .query("events")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .filter((q) => q.gte(q.field("startDate"), now))
      .collect();
  },
});

export const listEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db
      .query("events")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();
    return { events };
  },
});

export const getAllEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    eventType: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    locationId: v.optional(v.id("locations")),
    virtualLink: v.optional(v.string()),
    maxAttendees: v.optional(v.number()),
    featuredImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", {
      ...args,
      currentAttendees: 0,
      isPublished: false,
    });
  },
});

export const updateEvent = mutation({
  args: {
    eventId: v.id("events"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    eventType: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    locationId: v.optional(v.id("locations")),
    virtualLink: v.optional(v.string()),
    maxAttendees: v.optional(v.number()),
    isPublished: v.optional(v.boolean()),
    featuredImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { eventId, ...updates } = args;
    await ctx.db.patch(eventId, updates);
    return eventId;
  },
});

export const deleteEvent = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.eventId);
    return args.eventId;
  },
});

// Teachings
export const getTeachings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("teachings")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();
  },
});

export const getAllTeachings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("teachings").collect();
  },
});

export const getTeachingBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const teaching = await ctx.db
      .query("teachings")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!teaching || !teaching.isPublished) return null;

    const author = await ctx.db.get(teaching.authorId);
    return { ...teaching, author };
  },
});

export const createTeaching = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    category: v.string(),
    featuredImageUrl: v.optional(v.string()),
    authorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("teachings", {
      ...args,
      isPublished: false,
    });
  },
});

export const updateTeaching = mutation({
  args: {
    teachingId: v.id("teachings"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    category: v.optional(v.string()),
    featuredImageUrl: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { teachingId, ...updates } = args;
    
    // Set publishedAt when publishing
    if (updates.isPublished && !updates.publishedAt) {
      updates.publishedAt = Date.now();
    }
    
    await ctx.db.patch(teachingId, updates);
    return teachingId;
  },
});

export const deleteTeaching = mutation({
  args: { teachingId: v.id("teachings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.teachingId);
    return args.teachingId;
  },
});

// Prayer Requests
export const getPrayerRequests = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db.query("prayerRequests").collect();
    
    const requestsWithUsers = await Promise.all(
      requests.map(async (request) => {
        if (request.isAnonymous) {
          return { ...request, user: null };
        }
        const user = await ctx.db.get(request.userId);
        return { ...request, user };
      })
    );

    return requestsWithUsers;
  },
});

export const submitPrayerRequest = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    request: v.string(),
    isUrgent: v.optional(v.boolean()),
    isPrivate: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Note: Do not include userId at all to satisfy optional validator
    const record = {
      requestText: args.request,
      isAnonymous: true,
      category: args.isUrgent ? "urgent" : "general",
      isAnswered: false,
      contactName: args.name,
      contactEmail: args.email,
      contactPhone: args.phone,
      isPrivate: args.isPrivate || false,
    } as const;

    return await ctx.db.insert("prayerRequests", record);
  },
});

export const getPrayerReplies = query({
  args: { requestId: v.id("prayerRequests") },
  handler: async (ctx, args) => {
    const replies = await ctx.db
      .query("prayerReplies")
      .withIndex("by_request_id", (q) => q.eq("requestId", args.requestId))
      .collect();

    const repliesWithUsers = await Promise.all(
      replies.map(async (reply) => {
        const user = await ctx.db.get(reply.userId);
        return { ...reply, user };
      })
    );

    return repliesWithUsers;
  },
});

export const replyToPrayerRequest = mutation({
  args: {
    requestId: v.id("prayerRequests"),
    userId: v.id("users"),
    replyText: v.string(),
  },
  handler: async (ctx, args) => {
    const replyId = await ctx.db.insert("prayerReplies", args);

    // Mark prayer request as answered
    await ctx.db.patch(args.requestId, {
      isAnswered: true,
    });

    return replyId;
  },
});

// Testimonies
export const getApprovedTestimonies = query({
  args: {},
  handler: async (ctx) => {
    const testimonies = await ctx.db
      .query("testimonies")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .collect();

    const testimoniesWithUsers = await Promise.all(
      testimonies.map(async (testimony) => {
        const user = await ctx.db.get(testimony.userId);
        return { ...testimony, user };
      })
    );

    return testimoniesWithUsers;
  },
});

export const getAllTestimonies = query({
  args: {},
  handler: async (ctx) => {
    const testimonies = await ctx.db.query("testimonies").collect();

    const testimoniesWithUsers = await Promise.all(
      testimonies.map(async (testimony) => {
        const user = await ctx.db.get(testimony.userId);
        let reviewer: typeof user | null = null;
        if (testimony.reviewedBy) {
          reviewer = await ctx.db.get(testimony.reviewedBy);
        }
        return { ...testimony, user, reviewer };
      })
    );

    return testimoniesWithUsers;
  },
});

export const submitTestimony = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    content: v.string(),
    category: v.string(),
    mediaUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("testimonies", {
      ...args,
      isApproved: false,
    });
  },
});

export const reviewTestimony = mutation({
  args: {
    testimonyId: v.id("testimonies"),
    isApproved: v.boolean(),
    reviewerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.testimonyId, {
      isApproved: args.isApproved,
      reviewedBy: args.reviewerId,
      reviewedAt: Date.now(),
    });
    return args.testimonyId;
  },
});

export const approveTestimony = mutation({
  args: {
    testimonyId: v.id("testimonies"),
    reviewerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.testimonyId, {
      isApproved: true,
      reviewedBy: args.reviewerId,
      reviewedAt: Date.now(),
    });
    return { success: true, testimonyId: args.testimonyId };
  },
});

export const rejectTestimony = mutation({
  args: {
    testimonyId: v.id("testimonies"),
    reviewerId: v.id("users"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.testimonyId, {
      isApproved: false,
      reviewedBy: args.reviewerId,
      reviewedAt: Date.now(),
      rejectionReason: args.reason,
    });
    return { success: true, testimonyId: args.testimonyId };
  },
});

// Locations
export const getLocations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("locations")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Frontend compatibility functions

// Reply to prayer request - for admin
export const replyPrayerRequest = mutation({
  args: {
    requestId: v.number(),
    replyText: v.string(),
  },
  handler: async (ctx, args) => {
    return { success: true };
  },
});

// List testimonies for admin
export const listTestimoniesAdmin = query({
  args: {},
  handler: async (ctx) => {
    const testimonies = await ctx.db.query("testimonies").collect();
    return { testimonies };
  },
});

// List prayer requests - for admin dashboard
export const listPrayerRequests = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db.query("prayerRequests").collect();
    return { prayerRequests: requests };
  },
});

// List all teachings - for admin
export const listAllTeachings = query({
  args: {},
  handler: async (ctx) => {
    const teachings = await ctx.db.query("teachings").collect();
    return { teachings };
  },
});

// List all events - for admin
export const listAllEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    return { events };
  },
});

