import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all published courses
export const getCourses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();
  },
});

// Get courses by category
export const getCoursesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
  },
});

// Get single course by ID
export const getCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const course = await ctx.db.get(args.courseId);
    if (!course || !course.isPublished) return null;

    // Get course modules
    const modules = await ctx.db
      .query("courseModules")
      .withIndex("by_course_id", (q) => q.eq("courseId", args.courseId))
      .collect();

    return {
      ...course,
      modules: modules.sort((a, b) => a.order - b.order),
    };
  },
});

// Create course (admin function)
export const createCourse = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    thumbnailUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    pdfUrl: v.optional(v.string()),
    durationMinutes: v.optional(v.number()),
    requiresSubscription: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("courses", {
      ...args,
      isPublished: false,
    });
  },
});

// Update course (admin function)
export const updateCourse = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    pdfUrl: v.optional(v.string()),
    durationMinutes: v.optional(v.number()),
    requiresSubscription: v.optional(v.boolean()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { courseId, ...updates } = args;
    await ctx.db.patch(courseId, updates);
    return courseId;
  },
});

// Delete course (admin function)
export const deleteCourse = mutation({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    // Delete course modules first
    const modules = await ctx.db
      .query("courseModules")
      .withIndex("by_course_id", (q) => q.eq("courseId", args.courseId))
      .collect();
    
    for (const module of modules) {
      await ctx.db.delete(module._id);
    }

    // Delete course progress
    const progressRecords = await ctx.db
      .query("courseProgress")
      .withIndex("by_course_id", (q) => q.eq("courseId", args.courseId))
      .collect();
    
    for (const progress of progressRecords) {
      await ctx.db.delete(progress._id);
    }

    // Delete the course
    await ctx.db.delete(args.courseId);
    return args.courseId;
  },
});

// Get user's course progress
export const getUserProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const progressRecords = await ctx.db
      .query("courseProgress")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    const progressWithCourses = await Promise.all(
      progressRecords.map(async (progress) => {
        const course = await ctx.db.get(progress.courseId);
        return {
          ...progress,
          course,
        };
      })
    );

    return progressWithCourses;
  },
});

// Update course progress
export const updateProgress = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
    progressPercentage: v.number(),
  },
  handler: async (ctx, args) => {
    const existingProgress = await ctx.db
      .query("courseProgress")
      .withIndex("by_user_course", (q) => 
        q.eq("userId", args.userId).eq("courseId", args.courseId)
      )
      .first();

    const now = Date.now();
    
    if (existingProgress) {
      await ctx.db.patch(existingProgress._id, {
        progressPercentage: args.progressPercentage,
        lastAccessed: now,
        completedAt: args.progressPercentage >= 100 ? now : undefined,
      });
      return existingProgress._id;
    } else {
      return await ctx.db.insert("courseProgress", {
        userId: args.userId,
        courseId: args.courseId,
        progressPercentage: args.progressPercentage,
        lastAccessed: now,
        completedAt: args.progressPercentage >= 100 ? now : undefined,
      });
    }
  },
});

// Complete course - simplified version for frontend compatibility
export const completeCourse = mutation({
  args: {
    courseId: v.number(), // Frontend sends number
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    // Mock completion for now
    return { success: true, courseId: args.courseId };
  },
});

// Get progress - simplified for frontend
export const getProgress = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return { progress: [] };
  },
});

// List certificates - simplified for frontend
export const listCertificates = query({
  args: {},
  handler: async (ctx) => {
    return { certificates: [] };
  },
});

// List all courses - for admin
export const listAllCourses = query({
  args: {},
  handler: async (ctx) => {
    return { courses: [] };
  },
});

// Get user certificates
export const getUserCertificates = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const certificates = await ctx.db
      .query("certificates")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();

    const certificatesWithCourses = await Promise.all(
      certificates.map(async (cert) => {
        const course = await ctx.db.get(cert.courseId);
        return {
          ...cert,
          course,
        };
      })
    );

    return certificatesWithCourses;
  },
});

// Submit quiz
export const submitQuiz = mutation({
  args: {
    userId: v.id("users"),
    quizId: v.id("quizzes"),
    answers: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const quiz = await ctx.db.get(args.quizId);
    if (!quiz) throw new Error("Quiz not found");

    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === args.answers[index]) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.questions.length) * 100;
    const passed = score >= quiz.passingScore;

    return await ctx.db.insert("quizSubmissions", {
      userId: args.userId,
      quizId: args.quizId,
      answers: args.answers,
      score,
      passed,
      submittedAt: Date.now(),
    });
  },
});
