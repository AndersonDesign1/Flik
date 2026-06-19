import { ConvexError, v } from "convex/values";
import { components } from "./_generated/api";
import type { QueryCtx } from "./_generated/server";
import { query } from "./_generated/server";
import { authComponent } from "./auth";
import { normalizeRole } from "./lib/roles";

const ROLE_VALIDATOR = v.union(
  v.literal("user"),
  v.literal("staff"),
  v.literal("super_admin")
);

const USER_TYPE_VALIDATOR = v.union(
  v.literal("buyer"),
  v.literal("seller"),
  v.literal("both")
);

const STORE_STATUS_VALIDATOR = v.union(v.literal("draft"), v.literal("active"));
const PRODUCT_STATUS_VALIDATOR = v.union(
  v.literal("draft"),
  v.literal("active"),
  v.literal("archived")
);

type PlatformRole = "user" | "staff" | "super_admin";
type PlatformUserType = "buyer" | "seller" | "both" | undefined;

interface DirectoryProfile {
  createdAt: number;
  role?: string;
  userId: string;
  userType?: string;
}

interface DirectoryStore {
  createdAt: number;
  name: string;
  ownerId: string;
  slug: string;
  status: "draft" | "active";
}

interface DirectoryUser {
  _id: string;
  createdAt?: number;
  email: string;
  name?: string;
}

interface PaginatedUsersResponse {
  continueCursor: string | null;
  page: DirectoryUser[];
}

interface DirectoryPerson {
  _id: string;
  createdAt: number;
  email: string;
  name?: string;
  role: PlatformRole;
  storeName?: string;
  storeSlug?: string;
  userType?: PlatformUserType;
}

function normalizeUserType(userType?: string | null): PlatformUserType {
  if (userType === "buyer" || userType === "seller" || userType === "both") {
    return userType;
  }

  return undefined;
}

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
  if (normalizeRole(role) !== "super_admin") {
    throw new ConvexError({
      code: "FORBIDDEN",
      message: "Only super admins can access this data.",
    });
  }
}

function requireOperator(role?: string) {
  const normalizedRole = normalizeRole(role);
  if (!(normalizedRole === "staff" || normalizedRole === "super_admin")) {
    throw new ConvexError({
      code: "FORBIDDEN",
      message: "Only staff or super admins can access this data.",
    });
  }
}

function isDirectoryUser(value: unknown): value is DirectoryUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate._id === "string" &&
    typeof candidate.email === "string" &&
    (candidate.name === undefined || typeof candidate.name === "string") &&
    (candidate.createdAt === undefined ||
      typeof candidate.createdAt === "number")
  );
}

function parsePaginatedUsersResponse(value: unknown): PaginatedUsersResponse {
  if (typeof value !== "object" || value === null) {
    throw new ConvexError({
      code: "INTERNAL_ERROR",
      message: "Invalid Better Auth user page response.",
    });
  }

  const candidate = value as Record<string, unknown>;
  const page = candidate.page;
  const continueCursor = candidate.continueCursor;

  if (!(Array.isArray(page) && page.every(isDirectoryUser))) {
    throw new ConvexError({
      code: "INTERNAL_ERROR",
      message: "Better Auth user page payload is malformed.",
    });
  }

  if (!(continueCursor === null || typeof continueCursor === "string")) {
    throw new ConvexError({
      code: "INTERNAL_ERROR",
      message: "Better Auth pagination cursor is malformed.",
    });
  }

  return { continueCursor, page };
}

async function getAuthUsers(
  ctx: QueryCtx,
  {
    cursor = null,
    pageSize = 5000,
  }: { cursor?: string | null; pageSize?: number }
) {
  const response = await ctx.runQuery(components.betterAuth.adapter.findMany, {
    model: "user",
    paginationOpts: {
      cursor,
      numItems: pageSize,
    },
    sortBy: {
      direction: "desc",
      field: "createdAt",
    },
  });

  return parsePaginatedUsersResponse(response);
}

async function buildDirectoryPeople(
  ctx: QueryCtx,
  profiles: DirectoryProfile[],
  stores: DirectoryStore[]
) {
  const pageSize = 5000;
  const maxIterations = 100;
  const users: DirectoryUser[] = [];
  let cursor: string | null = null;
  let iteration = 0;

  while (true) {
    iteration += 1;
    if (iteration > maxIterations) {
      throw new ConvexError({
        code: "INTERNAL_ERROR",
        message:
          "Exceeded Better Auth pagination safeguard while loading users.",
      });
    }

    const response = await getAuthUsers(ctx, {
      cursor,
      pageSize,
    });
    users.push(...response.page);

    if (!response.continueCursor) {
      break;
    }

    cursor = response.continueCursor;
  }

  const profileByUserId = new Map(
    profiles.map((entry) => [entry.userId, entry] as const)
  );
  const storeByOwnerId = new Map(
    stores.map((store) => [store.ownerId, store] as const)
  );

  const authUsers = users.map((user) => {
    const profile = profileByUserId.get(user._id);
    const store = storeByOwnerId.get(user._id);

    return {
      _id: user._id,
      createdAt: user.createdAt ?? profile?.createdAt ?? 0,
      email: user.email,
      name: user.name ?? undefined,
      role: normalizeRole(profile?.role),
      storeName: store?.name ?? undefined,
      storeSlug: store?.slug ?? undefined,
      userType: normalizeUserType(profile?.userType),
    } satisfies DirectoryPerson;
  });

  const authUserIds = new Set(authUsers.map((user) => user._id));
  const profileOnlyPeople = await Promise.all(
    profiles
      .filter((profile) => !authUserIds.has(profile.userId))
      .map(async (profile) => {
        const authUser = await authComponent.getAnyUserById(
          ctx,
          profile.userId
        );
        const store = storeByOwnerId.get(profile.userId);

        return {
          _id: profile.userId,
          createdAt: authUser?.createdAt ?? profile.createdAt,
          email: authUser?.email ?? "Unknown",
          name: authUser?.name ?? undefined,
          role: normalizeRole(profile.role),
          storeName: store?.name ?? undefined,
          storeSlug: store?.slug ?? undefined,
          userType: normalizeUserType(profile.userType),
        } satisfies DirectoryPerson;
      })
  );

  const people = [...authUsers, ...profileOnlyPeople].sort(
    (left, right) => right.createdAt - left.createdAt
  );

  const summary = people.reduce(
    (accumulator, person) => {
      accumulator.totalUsers += 1;

      if (person.userType === "buyer" || person.userType === "both") {
        accumulator.buyers += 1;
      }

      if (person.userType === "seller" || person.userType === "both") {
        accumulator.sellerEnabled += 1;
      }

      if (person.role === "staff" || person.role === "super_admin") {
        accumulator.internalTeam += 1;
      }

      return accumulator;
    },
    {
      buyers: 0,
      internalTeam: 0,
      sellerEnabled: 0,
      totalUsers: 0,
    }
  );

  return { people, summary };
}

function buildSellerRows(
  ctx: QueryCtx,
  stores: DirectoryStore[],
  products: Array<{
    _id: string;
    createdAt: number;
    price: number;
    sales?: number;
    status: "draft" | "active" | "archived";
    userId: string;
  }>,
  profiles: DirectoryProfile[]
) {
  const profileByUserId = new Map(
    profiles.map((entry) => [entry.userId, entry] as const)
  );

  return Promise.all(
    stores.map(async (store) => {
      const owner = await authComponent.getAnyUserById(ctx, store.ownerId);
      const ownerProfile = profileByUserId.get(store.ownerId);
      const ownedProducts = products.filter(
        (product) => product.userId === store.ownerId
      );

      return {
        activeProducts: ownedProducts.filter(
          (product) => product.status === "active"
        ).length,
        createdAt: store.createdAt,
        name: store.name,
        ownerEmail: owner?.email ?? "Unknown",
        ownerName: owner?.name ?? owner?.email ?? "Store owner",
        slug: store.slug,
        status: store.status,
        totalProducts: ownedProducts.length,
        totalSales: ownedProducts.reduce(
          (total, product) => total + (product.sales ?? 0),
          0
        ),
        userType:
          normalizeUserType(ownerProfile?.userType) ??
          (canAccessSellerWorkspace(ownerProfile?.userType)
            ? "seller"
            : undefined),
      };
    })
  );
}

export const getWorkspaceAccess = query({
  args: {},
  returns: v.union(
    v.object({
      availableWorkspaces: v.array(v.string()),
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

    const role = normalizeRole(profile?.role);
    const userType = normalizeUserType(profile?.userType);
    const canAccessSuperAdmin = role === "super_admin";
    const canAccessStaff = role === "staff" || role === "super_admin";
    const canAccessSeller = canAccessSellerWorkspace(userType);
    const availableWorkspaces = ["buyer"];

    if (canAccessSeller) {
      availableWorkspaces.push("seller");
    }
    if (canAccessStaff) {
      availableWorkspaces.push("staff");
    }
    if (canAccessSuperAdmin) {
      availableWorkspaces.push("super_admin");
    }

    return {
      availableWorkspaces,
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

    const [profiles, stores, products] = await Promise.all([
      ctx.db.query("profiles").collect(),
      ctx.db.query("stores").collect(),
      ctx.db.query("products").collect(),
    ]);
    const directory = await buildDirectoryPeople(ctx, profiles, stores);

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
      buyers: directory.summary.buyers,
      products: products.length,
      recentStores,
      sellers: directory.summary.sellerEnabled,
      staff: profiles.filter((entry) => normalizeRole(entry.role) === "staff")
        .length,
      superAdmins: profiles.filter(
        (entry) => normalizeRole(entry.role) === "super_admin"
      ).length,
      totalUsers: directory.summary.totalUsers,
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

    const profiles = await ctx.db.query("profiles").collect();
    const roster = await Promise.all(
      profiles
        .filter((entry) => normalizeRole(entry.role) !== "user")
        .map(async (entry) => {
          const user = await authComponent.getAnyUserById(ctx, entry.userId);
          return {
            createdAt: entry.createdAt,
            email: user?.email ?? "Unknown",
            name: user?.name ?? "Unnamed User",
            role: normalizeRole(entry.role),
          };
        })
    );

    const roleOrder = {
      staff: 1,
      super_admin: 2,
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
      createdAt: v.number(),
      name: v.string(),
      ownerEmail: v.string(),
      ownerName: v.string(),
      slug: v.string(),
      status: STORE_STATUS_VALIDATOR,
      totalProducts: v.number(),
      totalSales: v.number(),
      userType: v.optional(USER_TYPE_VALIDATOR),
    })
  ),
  handler: async (ctx) => {
    const { profile } = await requireViewerProfile(ctx);
    requireOperator(profile?.role);

    const [stores, products, profiles] = await Promise.all([
      ctx.db.query("stores").collect(),
      ctx.db.query("products").collect(),
      ctx.db.query("profiles").collect(),
    ]);

    return buildSellerRows(ctx, stores, products, profiles);
  },
});

export const getSuperAdminPeopleDirectory = query({
  args: {},
  returns: v.object({
    people: v.array(
      v.object({
        _id: v.string(),
        createdAt: v.number(),
        email: v.string(),
        name: v.optional(v.string()),
        role: ROLE_VALIDATOR,
        storeName: v.optional(v.string()),
        storeSlug: v.optional(v.string()),
        userType: v.optional(USER_TYPE_VALIDATOR),
      })
    ),
    summary: v.object({
      buyers: v.number(),
      internalTeam: v.number(),
      sellerEnabled: v.number(),
      totalUsers: v.number(),
    }),
  }),
  handler: async (ctx) => {
    const { profile } = await requireViewerProfile(ctx);
    requireSuperAdmin(profile?.role);

    const [profiles, stores] = await Promise.all([
      ctx.db.query("profiles").collect(),
      ctx.db.query("stores").collect(),
    ]);

    return buildDirectoryPeople(ctx, profiles, stores);
  },
});

export const getStaffOverview = query({
  args: {},
  returns: v.object({
    activeStores: v.number(),
    internalTeam: v.number(),
    liveProducts: v.number(),
    recentProducts: v.array(
      v.object({
        _id: v.id("products"),
        createdAt: v.number(),
        name: v.string(),
        ownerName: v.string(),
        price: v.number(),
        status: PRODUCT_STATUS_VALIDATOR,
        storeName: v.optional(v.string()),
        storeSlug: v.optional(v.string()),
      })
    ),
    recentStores: v.array(
      v.object({
        activeProducts: v.number(),
        createdAt: v.number(),
        name: v.string(),
        ownerName: v.string(),
        slug: v.string(),
        totalProducts: v.number(),
      })
    ),
    sellerEnabledUsers: v.number(),
    totalProducts: v.number(),
    totalUsers: v.number(),
  }),
  handler: async (ctx) => {
    const { profile } = await requireViewerProfile(ctx);
    requireOperator(profile?.role);

    const [profiles, stores, products] = await Promise.all([
      ctx.db.query("profiles").collect(),
      ctx.db.query("stores").collect(),
      ctx.db.query("products").collect(),
    ]);
    const directory = await buildDirectoryPeople(ctx, profiles, stores);

    const storeByOwnerId = new Map(
      stores.map((store) => [store.ownerId, store] as const)
    );
    const recentProducts = await Promise.all(
      products
        .sort((left, right) => right.createdAt - left.createdAt)
        .slice(0, 5)
        .map(async (product) => {
          const owner = await authComponent.getAnyUserById(ctx, product.userId);
          const store = storeByOwnerId.get(product.userId);
          return {
            _id: product._id,
            createdAt: product.createdAt,
            name: product.name,
            ownerName: owner?.name ?? owner?.email ?? "Seller",
            price: product.price,
            status: product.status,
            storeName: store?.name ?? undefined,
            storeSlug: store?.slug ?? undefined,
          };
        })
    );

    const sellerRows = await buildSellerRows(ctx, stores, products, profiles);

    return {
      activeStores: stores.filter((store) => store.status === "active").length,
      internalTeam: directory.summary.internalTeam,
      liveProducts: products.filter((product) => product.status === "active")
        .length,
      recentProducts,
      recentStores: sellerRows
        .sort((left, right) => right.createdAt - left.createdAt)
        .slice(0, 5)
        .map((seller) => ({
          activeProducts: seller.activeProducts,
          createdAt: seller.createdAt,
          name: seller.name,
          ownerName: seller.ownerName,
          slug: seller.slug,
          totalProducts: seller.totalProducts,
        })),
      sellerEnabledUsers: directory.summary.sellerEnabled,
      totalProducts: products.length,
      totalUsers: directory.summary.totalUsers,
    };
  },
});

export const listStaffProducts = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("products"),
      createdAt: v.number(),
      name: v.string(),
      ownerEmail: v.string(),
      ownerName: v.string(),
      price: v.number(),
      sales: v.number(),
      status: PRODUCT_STATUS_VALIDATOR,
      storeName: v.optional(v.string()),
      storeSlug: v.optional(v.string()),
    })
  ),
  handler: async (ctx) => {
    const { profile } = await requireViewerProfile(ctx);
    requireOperator(profile?.role);

    const [products, stores] = await Promise.all([
      ctx.db.query("products").collect(),
      ctx.db.query("stores").collect(),
    ]);
    const storeByOwnerId = new Map(
      stores.map((store) => [store.ownerId, store] as const)
    );

    return Promise.all(
      products
        .sort((left, right) => right.createdAt - left.createdAt)
        .map(async (product) => {
          const owner = await authComponent.getAnyUserById(ctx, product.userId);
          const store = storeByOwnerId.get(product.userId);

          return {
            _id: product._id,
            createdAt: product.createdAt,
            name: product.name,
            ownerEmail: owner?.email ?? "Unknown",
            ownerName: owner?.name ?? owner?.email ?? "Seller",
            price: product.price,
            sales: product.sales ?? 0,
            status: product.status,
            storeName: store?.name ?? undefined,
            storeSlug: store?.slug ?? undefined,
          };
        })
    );
  },
});
