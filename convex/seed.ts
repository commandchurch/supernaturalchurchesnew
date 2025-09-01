import { mutation } from "./_generated/server";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Seed subscription plans (matching frontend tier names)
    const plans = [
      {
        code: "BRONZE",
        name: "Bronze Membership",
        priceMonthly: 19.00,
        features: [
          "Private Telegram group access",
          "Access to all institute (premium) courses",
          "Weekly community updates",
          "Help Me Fund access",
          "5% Promo discount on merch",
          "Affiliate earnings capped at $1,000 AUD/month",
          "Commission Levels: 1st (20%)"
        ],
        isActive: true,
      },
      {
        code: "SILVER",
        name: "Silver Membership",
        priceMonthly: 33.00,
        features: [
          "Private Telegram group access",
          "Access to all institute (premium) courses",
          "Fortnightly Q&A Meetings",
          "Help Me Fund access",
          "10% Promo discount on merch",
          "Affiliate earnings capped at $3,000 AUD/month",
          "Commission Levels: 1st (20%), 2nd (10%)"
        ],
        isActive: true,
      },
      {
        code: "GOLD",
        name: "Gold Membership",
        priceMonthly: 149.00,
        features: [
          "Private Telegram group access",
          "Access to all institute (premium) courses",
          "Weekly Q&A Meetings",
          "Help Me Fund access",
          "15% Promo discount on merch",
          "Affiliate earnings capped at $10,000 AUD/month",
          "Commission Levels: 1st (20%), 2nd (10%), 3rd (5%)",
          "Advanced ministry training modules",
          "Direct access to senior leadership"
        ],
        isActive: true,
      },
      {
        code: "DIAMOND",
        name: "Diamond Membership",
        priceMonthly: 499.00,
        features: [
          "All previous tier benefits",
          "Unlimited access to all content",
          "Monthly 1-on-1 coaching calls",
          "Personal ministry development plan",
          "Direct WhatsApp access to leadership",
          "20% Promo discount on merch",
          "Unlimited affiliate earnings potential",
          "Commission Levels: All levels (20%, 10%, 5%)",
          "Priority event access",
          "Custom training development"
        ],
        isActive: true,
      }
    ];

    for (const plan of plans) {
      await ctx.db.insert("subscriptionPlans", plan);
    }

    // Seed some sample funding requests
    const sampleRequests = [
      {
        title: "Global Outreach Fund",
        description: "Supporting evangelism efforts worldwide",
        targetAmount: 25000,
        currentAmount: 15750,
        category: "missions",
        isApproved: true,
      },
      {
        title: "Ministry Training Center",
        description: "Equipment for supernatural ministry training",
        targetAmount: 12000,
        currentAmount: 8200,
        category: "education",
        isApproved: true,
      }
    ];

    // Create a dummy user for the funding requests
    const dummyUserId = await ctx.db.insert("users", {
      clerkId: "dummy-seed-user",
      email: "admin@supernatural.institute",
      name: "Admin User",
    });

    for (const request of sampleRequests) {
      await ctx.db.insert("fundingRequests", {
        ...request,
        userId: dummyUserId,
        approvedBy: dummyUserId,
        approvedAt: Date.now(),
      });
    }

    return { message: "Database seeded successfully", plansCreated: plans.length, requestsCreated: sampleRequests.length };
  },
});