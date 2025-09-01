import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User Management
  users: defineTable({
    clerkId: v.string(), // Clerk user ID
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    profilePicture: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),

  // User Profiles (extended info)
  userProfiles: defineTable({
    userId: v.id("users"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    country: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    bio: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  // Membership System
  subscriptionPlans: defineTable({
    code: v.string(), // RECRUIT, PRIVATE, CAPTAIN, COMMANDO
    name: v.string(),
    priceMonthly: v.number(),
    features: v.array(v.string()),
    stripePriceId: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_code", ["code"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    planCode: v.string(),
    status: v.string(), // active, canceled, past_due
    startedAt: v.number(),
    renewsAt: v.optional(v.number()),
    canceledAt: v.optional(v.number()),
    stripeSubscriptionId: v.optional(v.string()),
  }).index("by_user_id", ["userId"])
    .index("by_status", ["status"]),

  // Academy System
  courses: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(),
    thumbnailUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    pdfUrl: v.optional(v.string()),
    durationMinutes: v.optional(v.number()),
    isPublished: v.boolean(),
    requiresSubscription: v.optional(v.boolean()),
    order: v.optional(v.number()),
  }).index("by_category", ["category"])
    .index("by_published", ["isPublished"]),

  courseModules: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    description: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    order: v.number(),
    durationMinutes: v.optional(v.number()),
  }).index("by_course_id", ["courseId"]),

  courseProgress: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    progressPercentage: v.number(),
    completedAt: v.optional(v.number()),
    lastAccessed: v.number(),
  }).index("by_user_id", ["userId"])
    .index("by_course_id", ["courseId"])
    .index("by_user_course", ["userId", "courseId"]),

  quizzes: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    questions: v.array(v.object({
      question: v.string(),
      options: v.array(v.string()),
      correctAnswer: v.number(),
    })),
    passingScore: v.number(),
  }).index("by_course_id", ["courseId"]),

  quizSubmissions: defineTable({
    userId: v.id("users"),
    quizId: v.id("quizzes"),
    answers: v.array(v.number()),
    score: v.number(),
    passed: v.boolean(),
    submittedAt: v.number(),
  }).index("by_user_id", ["userId"])
    .index("by_quiz_id", ["quizId"]),

  certificates: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    certificateUrl: v.string(),
    issuedAt: v.number(),
  }).index("by_user_id", ["userId"])
    .index("by_course_id", ["courseId"]),

  // Church System
  events: defineTable({
    title: v.string(),
    description: v.string(),
    eventType: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    locationId: v.optional(v.id("locations")),
    virtualLink: v.optional(v.string()),
    maxAttendees: v.optional(v.number()),
    currentAttendees: v.number(),
    isPublished: v.boolean(),
    featuredImage: v.optional(v.string()),
  }).index("by_start_date", ["startDate"])
    .index("by_published", ["isPublished"]),

  locations: defineTable({
    name: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    country: v.string(),
    postalCode: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
    serviceTimes: v.optional(v.any()),
    isActive: v.boolean(),
  }),

  teachings: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    category: v.string(),
    featuredImageUrl: v.optional(v.string()),
    authorId: v.id("users"),
    isPublished: v.boolean(),
    publishedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"])
    .index("by_author", ["authorId"])
    .index("by_published", ["isPublished"]),

  prayerRequests: defineTable({
    userId: v.optional(v.id("users")),
    requestText: v.string(),
    isAnonymous: v.boolean(),
    isAnswered: v.boolean(),
    category: v.optional(v.string()),
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    isPrivate: v.optional(v.boolean()),
  }).index("by_user_id", ["userId"])
    .index("by_answered", ["isAnswered"]),

  prayerReplies: defineTable({
    requestId: v.id("prayerRequests"),
    userId: v.id("users"),
    replyText: v.string(),
  }).index("by_request_id", ["requestId"])
    .index("by_user_id", ["userId"]),

  testimonies: defineTable({
    userId: v.id("users"),
    title: v.string(),
    content: v.string(),
    category: v.string(),
    mediaUrl: v.optional(v.string()),
    isApproved: v.boolean(),
    reviewedBy: v.optional(v.id("users")),
    reviewedAt: v.optional(v.number()),
  }).index("by_user_id", ["userId"])
    .index("by_approved", ["isApproved"]),

  // Fund System
  fundingRequests: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
    category: v.string(),
    isApproved: v.boolean(),
    approvedBy: v.optional(v.id("users")),
    approvedAt: v.optional(v.number()),
  }).index("by_user_id", ["userId"])
    .index("by_approved", ["isApproved"]),

  donations: defineTable({
    userId: v.id("users"),
    requestId: v.optional(v.id("fundingRequests")),
    amount: v.number(),
    stripePaymentIntentId: v.string(),
    status: v.string(), // succeeded, pending, failed
    donationType: v.string(), // general, specific_request
  }).index("by_user_id", ["userId"])
    .index("by_request_id", ["requestId"]),

  // Outreach System
  outreachProfiles: defineTable({
    userId: v.id("users"),
    referredBy: v.optional(v.id("users")),
    rank: v.string(),
    totalEarnings: v.number(),
    totalReferrals: v.number(),
    isActive: v.boolean(),
    joinedAt: v.number(),
  }).index("by_user_id", ["userId"])
    .index("by_referrer", ["referredBy"]),

  outreachGuides: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.string(),
    isPublished: v.boolean(),
    authorId: v.id("users"),
  }).index("by_category", ["category"])
    .index("by_published", ["isPublished"]),

  payouts: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    status: v.string(), // pending, approved, paid
    requestedAt: v.number(),
    processedAt: v.optional(v.number()),
  }).index("by_user_id", ["userId"])
    .index("by_status", ["status"]),

  // Staff System
  staff: defineTable({
    userId: v.id("users"),
    position: v.string(),
    department: v.string(),
    hireDate: v.number(),
    salary: v.optional(v.number()),
    isActive: v.boolean(),
    managerId: v.optional(v.id("staff")),
  }).index("by_user_id", ["userId"])
    .index("by_department", ["department"]),

  complianceCategories: defineTable({
    name: v.string(),
    description: v.string(),
    isRequired: v.boolean(),
    order: v.number(),
  }),

  complianceItems: defineTable({
    categoryId: v.id("complianceCategories"),
    title: v.string(),
    description: v.string(),
    documentType: v.string(),
    isRequired: v.boolean(),
    order: v.number(),
  }).index("by_category", ["categoryId"]),

  staffCompliance: defineTable({
    staffId: v.id("staff"),
    complianceItemId: v.id("complianceItems"),
    status: v.string(), // pending, submitted, approved, rejected
    documentUrl: v.optional(v.string()),
    submittedAt: v.optional(v.number()),
    reviewedAt: v.optional(v.number()),
    notes: v.optional(v.string()),
  }).index("by_staff_id", ["staffId"])
    .index("by_compliance_item", ["complianceItemId"]),

  // Partnership System
  churchPartners: defineTable({
    name: v.string(),
    contactPerson: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    country: v.string(),
    denomination: v.optional(v.string()),
    website: v.optional(v.string()),
    description: v.string(),
    status: v.string(), // pending, approved, rejected
    applicationDate: v.number(),
    approvedDate: v.optional(v.number()),
  }).index("by_status", ["status"]),

  churchAudits: defineTable({
    partnerId: v.id("churchPartners"),
    status: v.string(), // pending, in_progress, completed
    notes: v.optional(v.string()),
    scheduledDate: v.optional(v.number()),
    completedDate: v.optional(v.number()),
    auditReport: v.optional(v.string()),
  }).index("by_partner_id", ["partnerId"])
    .index("by_status", ["status"]),

  // Payment System
  stripeCustomers: defineTable({
    userId: v.id("users"),
    stripeCustomerId: v.string(),
  }).index("by_user_id", ["userId"])
    .index("by_stripe_id", ["stripeCustomerId"]),

  // Admin System
  adminTerms: defineTable({
    documentType: v.string(), // privacy_policy, terms_of_service, etc.
    content: v.string(),
    version: v.string(),
    lastUpdated: v.number(),
    isActive: v.boolean(),
  }).index("by_document_type", ["documentType"]),
});
