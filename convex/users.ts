import { v } from "convex/values";
import { query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCurrentUser = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.string(),
      name: v.optional(v.string()),
      email: v.string(),
      emailVerified: v.boolean(),
      image: v.optional(v.string()),
      createdAt: v.optional(v.number()),
      updatedAt: v.optional(v.number()),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return null;
    }
    return {
      _id: user._id,
      name: user.name ?? undefined,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
});
