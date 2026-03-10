import { ConvexError, v } from "convex/values";
import type { QueryCtx } from "./_generated/server";
import { query } from "./_generated/server";
import { authComponent } from "./auth";

const ROLE_VALIDATOR = v.union(
  v.literal("user"),
  v.literal("staff"),
  v.literal("admin"),
  v.literal("super_admin")
);

const USER_TYPE_VALIDATOR = v.union(
  v.literal("buyer"),
  v.literal("seller"),
  v.literal("both")
);

function canAccessSellerWorkspace(userType?: string | null) {
  return userType === "seller" || userType === "both";
}

async function requireViewerProfile(ctx: QueryCtx) {
  const user = await authComponent.getAuthUser(ctx);
  if (!user) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "You must be signed in to access this data.",
    });
  }

  const profile = await ctx.db
    .query("profiles")
    .withIndex("by_user_id", (q) => q.eq("userId", user._id))
    .first();

  return { profile, user };
}

function requireSuperAdmin(role?: string) {
  if (role !== "super_admin") {
    throw new ConvexError({
      code: "FORBIDDEN",
      message: "Only super admins can access this data.",
    });
  }
}

export const getWorkspaceAccess = query({
  args: {},
  returns: v.union(
    v.object({
      availableWorkspaces: v.array(v.string()),
      canAccessAdmin: v.boolean(),
      canAccessBuyer: v.boolean(),
      canAccessSeller: v.boolean(),
      canAccessStaff: v.boolean(),
      canAccessSuperAdmin: v.boolean(),
      hasStore: v.boolean(),
      onboardingCompleted: v.boolean(),
      role: ROLE_VALIDATOR,
      storeName: v.optional(v.string()),
      storeSlug: v.optional(v.string()),
      userType: v.optional(USER_TYPE_VALIDATOR),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return null;
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();
    const store = await ctx.db
      .query("stores")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user._id))
      .first();

    const role: "user" | "staff" | "admin" | "super_admin" =
      profile?.role === "staff" ||
      profile?.role === "admin" ||
      profile?.role === "super_admin"
        ? profile.role
        : "user";
    const userType =
      profile?.userType === "buyer" ||
      profile?.userType === "seller" ||
      profile?.userType === "both"
        ? profile.userType
        : undefined;

    const canAccessSuperAdmin = role === "super_admin";
    const canAccessAdmin = role === "admin" || role === "super_admin";
    const canAccessStaff =
      role === "staff" || role === "admin" || role === "super_admin";
    const canAccessSeller = canAccessSellerWorkspace(userType);
    const availableWorkspaces = ["buyer"];

    if (canAccessSeller) {
      availableWorkspaces.push("seller");
    }
    if (canAccessStaff) {
      availableWorkspaces.push("staff");
    }
    if (canAccessAdmin) {
      availableWorkspaces.push("admin");
    }
    if (canAccessSuperAdmin) {
      availableWorkspaces.push("super_admin");
    }

    return {
      availableWorkspaces,
      canAccessAdmin,
      canAccessBuyer: true,
      canAccessSeller,
      canAccessStaff,
      canAccessSuperAdmin,
      hasStore: !!store,
      onboardingCompleted: !!profile?.onboardingCompleted,
      role,
      storeName: store?.name ?? profile?.storeName,
      storeSlug: store?.slug,
      userType,
    };
  },
});

export const getSuperAdminOverview = query({
  args: {},
  returns: v.object({
    activeStores: v.number(),
    admins: v.number(),
    buyers: v.number(),
    products: v.number(),
    recentStores: v.array(
      v.object({
        createdAt: v.number(),
        name: v.string(),
        ownerName: v.string(),
        slug: v.string(),
      })
    ),
    sellers: v.number(),
    staff: v.number(),
    superAdmins: v.number(),
    totalUsers: v.number(),
  }),
  handler: async (ctx) => {
    const { profile } = await requireViewerProfile(ctx);
    requireSuperAdmin(profile?.role);

    const profiles = await ctx.db.query("profiles").collect();
    const stores = await ctx.db.query("stores").collect();
    const products = await ctx.db.query("products").collect();

    const recentStores = await Promise.all(
      stores
        .sort((left, right) => right.createdAt - left.createdAt)
        .slice(0, 5)
        .map(async (store) => {
          const owner = await authComponent.getAnyUserById(ctx, store.ownerId);
          return {
            createdAt: store.createdAt,
            name: store.name,
            ownerName: owner?.name ?? owner?.email ?? "Store owner",
            slug: store.slug,
          };
        })
    );

    return {
      activeStores: stores.filter((store) => store.status === "active").length,
      admins: profiles.filter((profile) => profile.role === "admin").length,
      buyers: profiles.filter(
        (profile) => profile.userType === "buyer" || profile.userType === "both"
      ).length,
      products: products.length,
      recentStores,
      sellers: profiles.filter(
        (profile) =>
          profile.userType === "seller" || profile.userType === "both"
      ).length,
      staff: profiles.filter((profile) => profile.role === "staff").length,
      superAdmins: profiles.filter((profile) => profile.role === "super_admin")
        .length,
      totalUsers: profiles.length,
    };
  },
});

export const listAdminRoster = query({
  args: {},
  returns: v.array(
    v.object({
      createdAt: v.number(),
      email: v.string(),
      name: v.string(),
      role: ROLE_VALIDATOR,
    })
  ),
  handler: async (ctx) => {
    const { profile } = await requireViewerProfile(ctx);
    requireSuperAdmin(profile?.role);

    const [superAdmins, admins, staff] = await Promise.all([
      ctx.db
        .query("profiles")
        .withIndex("by_role", (q) => q.eq("role", "super_admin"))
        .collect(),
      ctx.db
        .query("profiles")
        .withIndex("by_role", (q) => q.eq("role", "admin"))
        .collect(),
      ctx.db
        .query("profiles")
        .withIndex("by_role", (q) => q.eq("role", "staff"))
        .collect(),
    ]);

    const roster = await Promise.all(
      [...superAdmins, ...admins, ...staff].map(async (entry) => {
        const user = await authComponent.getAnyUserById(ctx, entry.userId);
        return {
          createdAt: entry.createdAt,
          email: user?.email ?? "Unknown",
          name: user?.name ?? "Unnamed User",
          role: entry.role ?? "user",
        };
      })
    );

    const roleOrder = {
      admin: 2,
      staff: 1,
      super_admin: 3,
      user: 0,
    } as const;

    return roster.sort(
      (left, right) =>
        roleOrder[right.role] - roleOrder[left.role] ||
        right.createdAt - left.createdAt
    );
  },
});

export const listSellerPerformance = query({
  args: {},
  returns: v.array(
    v.object({
      activeProducts: v.number(),
      name: v.string(),
      ownerName: v.string(),
      slug: v.string(),
      totalProducts: v.number(),
      userType: USER_TYPE_VALIDATOR,
    })
  ),
  handler: async (ctx) => {
    const { profile } = await requireViewerProfile(ctx);
    requireSuperAdmin(profile?.role);

    const stores = await ctx.db.query("stores").collect();
    const products = await ctx.db.query("products").collect();

    return await Promise.all(
      stores.map(async (store) => {
        const owner = await authComponent.getAnyUserById(ctx, store.ownerId);
        const ownerProfile = await ctx.db
          .query("profiles")
          .withIndex("by_user_id", (q) => q.eq("userId", store.ownerId))
          .first();
        const ownedProducts = products.filter(
          (product) => product.userId === store.ownerId
        );

        return {
          activeProducts: ownedProducts.filter(
            (product) => product.status === "active"
          ).length,
          name: store.name,
          ownerName: owner?.name ?? owner?.email ?? "Store owner",
          slug: store.slug,
          totalProducts: ownedProducts.length,
          userType:
            ownerProfile?.userType === "both" ||
            ownerProfile?.userType === "seller"
              ? ownerProfile.userType
              : "seller",
        };
      })
    );
  },
});
