import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    avatarStorageId: v.optional(v.id("_storage")),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    userType: v.optional(
      v.union(v.literal("buyer"), v.literal("seller"), v.literal("both"))
    ),
    role: v.optional(
      v.union(v.literal("user"), v.literal("staff"), v.literal("admin"))
    ),
    storeName: v.optional(v.string()),
    offerTypes: v.optional(v.array(v.string())),
    onboardingCompleted: v.optional(v.boolean()),
    createdAt: v.float64(),
    updatedAt: v.float64(),
  }).index("by_user_id", ["userId"]),

  role_invites: defineTable({
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("staff")),
    invitedBy: v.string(),
    createdAt: v.float64(),
  }).index("by_email", ["email"]),

  products: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    price: v.float64(),
    compareAtPrice: v.optional(v.float64()),
    allowCustomPrice: v.boolean(),
    status: v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("archived")
    ),
    coverStorageId: v.optional(v.id("_storage")),
    files: v.array(
      v.object({
        storageId: v.id("_storage"),
        fileName: v.string(),
        fileSize: v.float64(),
        mimeType: v.optional(v.string()),
      })
    ),
    createdAt: v.float64(),
    updatedAt: v.float64(),
  })
    .index("by_user_id", ["userId"])
    .index("by_user_id_status", ["userId", "status"]),
});
