import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return null;
    }

    return ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();
  },
});

export const updateProfile = mutation({
  args: {
    userType: v.optional(v.string()),
    storeName: v.optional(v.string()),
    offerTypes: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    const now = Date.now();

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        userType: args.userType ?? existingProfile.userType,
        storeName: args.storeName ?? existingProfile.storeName,
        offerTypes: args.offerTypes ?? existingProfile.offerTypes,
        onboardingCompleted: true,
        updatedAt: now,
      });
      return existingProfile._id;
    }

    return ctx.db.insert("profiles", {
      userId: user._id,
      userType: args.userType ?? "buyer",
      storeName: args.storeName,
      offerTypes: args.offerTypes,
      onboardingCompleted: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});
