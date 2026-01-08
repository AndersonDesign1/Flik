import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    userType: v.optional(v.string()),
    storeName: v.optional(v.string()),
    offerTypes: v.optional(v.array(v.string())),
    onboardingCompleted: v.optional(v.boolean()),
    createdAt: v.float64(),
    updatedAt: v.float64(),
  }).index("by_user_id", ["userId"]),
});
