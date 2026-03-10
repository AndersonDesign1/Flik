import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { createStoreSchema } from "./validation";

const STORE_STATUS_VALIDATOR = v.union(v.literal("draft"), v.literal("active"));

function slugifyStoreName(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeOptionalString(input?: string) {
  const trimmed = input?.trim();
  return trimmed || undefined;
}

function getNextUserTypeForStore(userType?: string) {
  if (userType === "seller" || userType === "both") {
    return userType;
  }
  if (userType === "buyer") {
    return "both";
  }
  return "seller";
}

export const getMyStore = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("stores"),
      _creationTime: v.number(),
      createdAt: v.number(),
      description: v.optional(v.string()),
      name: v.string(),
      ownerId: v.string(),
      slug: v.string(),
      status: STORE_STATUS_VALIDATOR,
      updatedAt: v.number(),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return null;
    }

    return await ctx.db
      .query("stores")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user._id))
      .first();
  },
});

export const getStoreBySlug = query({
  args: {
    slug: v.string(),
  },
  returns: v.union(
    v.object({
      name: v.string(),
      slug: v.string(),
      description: v.optional(v.string()),
      ownerName: v.string(),
      productCount: v.number(),
      products: v.array(
        v.object({
          _id: v.id("products"),
          name: v.string(),
          price: v.number(),
          status: v.union(
            v.literal("draft"),
            v.literal("active"),
            v.literal("archived")
          ),
          sales: v.number(),
        })
      ),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const store = await ctx.db
      .query("stores")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug.toLowerCase()))
      .first();

    if (!store) {
      return null;
    }

    const owner = await authComponent.getAnyUserById(ctx, store.ownerId);
    const products = await ctx.db
      .query("products")
      .withIndex("by_user_id", (q) => q.eq("userId", store.ownerId))
      .collect();

    const activeProducts = products
      .filter((product) => product.status === "active")
      .map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        sales: product.sales ?? 0,
        status: product.status,
      }));

    return {
      description: store.description,
      name: store.name,
      ownerName: owner?.name ?? owner?.email ?? "Store owner",
      productCount: activeProducts.length,
      products: activeProducts,
      slug: store.slug,
    };
  },
});

export const createStore = mutation({
  args: {
    description: v.optional(v.string()),
    name: v.string(),
    slug: v.optional(v.string()),
  },
  returns: v.object({
    _id: v.id("stores"),
    name: v.string(),
    slug: v.string(),
  }),
  handler: async (ctx, args) => {
    const validated = createStoreSchema.parse(args);

    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "You must be signed in to create a store.",
      });
    }

    if (!user.emailVerified) {
      throw new ConvexError({
        code: "EMAIL_NOT_VERIFIED",
        message: "Verify your email before creating a store.",
      });
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (!profile?.onboardingCompleted) {
      throw new ConvexError({
        code: "ONBOARDING_REQUIRED",
        message: "Complete onboarding before creating a store.",
      });
    }

    const existingStore = await ctx.db
      .query("stores")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user._id))
      .first();

    if (existingStore) {
      return {
        _id: existingStore._id,
        name: existingStore.name,
        slug: existingStore.slug,
      };
    }

    const normalizedName = validated.name;
    if (!normalizedName) {
      throw new ConvexError({
        code: "INVALID_NAME",
        message: "Store name is required.",
      });
    }

    const normalizedSlug = slugifyStoreName(validated.slug ?? normalizedName);
    if (normalizedSlug.length < 3) {
      throw new ConvexError({
        code: "INVALID_SLUG",
        message: "Store slug must be at least 3 characters.",
      });
    }

    const slugTaken = await ctx.db
      .query("stores")
      .withIndex("by_slug", (q) => q.eq("slug", normalizedSlug))
      .first();

    if (slugTaken) {
      throw new ConvexError({
        code: "SLUG_TAKEN",
        message: "That store URL is already taken.",
      });
    }

    const now = Date.now();
    const storeId = await ctx.db.insert("stores", {
      createdAt: now,
      description: normalizeOptionalString(validated.description),
      name: normalizedName,
      ownerId: user._id,
      slug: normalizedSlug,
      status: "active",
      updatedAt: now,
    });

    await ctx.db.patch(profile._id, {
      storeName: normalizedName,
      updatedAt: now,
      userType: getNextUserTypeForStore(profile.userType),
    });

    return {
      _id: storeId,
      name: normalizedName,
      slug: normalizedSlug,
    };
  },
});
