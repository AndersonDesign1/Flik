import { v } from "convex/values";
import { components } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { collectAllAuthUsers } from "./lib/directory";
import {
  canManageUsers,
  getRoleLevel,
  normalizeRole,
  type PlatformRole,
} from "./lib/roles";
import { inviteToRoleSchema, updateProfileSchema } from "./validation";

const WHITESPACE_REGEX = /\s+/;

async function mirrorBetterAuthRole(
  // TODO(auth-role-migration): replace this escape hatch after Convex codegen
  // includes Better Auth Admin's role fields in the component adapter types.
  // biome-ignore lint/suspicious/noExplicitAny: Component adapter generated types lag plugin schema generation here.
  ctx: any,
  userId: string,
  role: PlatformRole
) {
  await ctx.runMutation(components.betterAuth.adapter.updateMany, {
    input: {
      model: "user",
      update: {
        role,
        updatedAt: Date.now(),
      },
      where: [{ field: "_id", operator: "eq", value: userId }],
    },
  });
}

function splitName(fullName?: string | null) {
  const trimmed = fullName?.trim();
  if (!trimmed) {
    return { firstName: undefined, lastName: undefined };
  }

  const [firstName, ...rest] = trimmed.split(WHITESPACE_REGEX).filter(Boolean);
  return {
    firstName,
    lastName: rest.length > 0 ? rest.join(" ") : undefined,
  };
}

interface DirectoryProfile {
  createdAt: number;
  role?: string;
  userId: string;
}

interface DirectoryUserSummary {
  _id: string;
  createdAt: number;
  email: string;
  name?: string;
  role: PlatformRole;
}

export const getProfile = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("profiles"),
      _creationTime: v.number(),
      userId: v.string(),
      avatarStorageId: v.optional(v.id("_storage")),
      avatarUrl: v.optional(v.string()),
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      phone: v.optional(v.string()),
      location: v.optional(v.string()),
      userType: v.optional(v.string()),
      role: v.optional(v.string()),
      storeName: v.optional(v.string()),
      offerTypes: v.optional(v.array(v.string())),
      onboardingCompleted: v.optional(v.boolean()),
      createdAt: v.float64(),
      updatedAt: v.float64(),
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

    if (!profile) {
      return null;
    }

    const avatarUrl = profile.avatarStorageId
      ? await ctx.storage.getUrl(profile.avatarStorageId)
      : undefined;

    return {
      ...profile,
      avatarUrl: avatarUrl ?? undefined,
    };
  },
});

export const getAllUsers = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.string(),
      name: v.optional(v.string()),
      email: v.string(),
      role: v.string(),
      createdAt: v.float64(),
    })
  ),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return [];
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (!canManageUsers(profile?.role)) {
      return [];
    }

    const profiles = await ctx.db.query("profiles").collect();
    const authUsers = await collectAllAuthUsers(
      ctx,
      (message) => new Error(message)
    );

    const profileByUserId = new Map(
      profiles.map((entry) => [entry.userId, entry] as const)
    );

    const authBackedUsers: DirectoryUserSummary[] = authUsers.flatMap(
      (authUser) => {
        const profileEntry = profileByUserId.get(authUser._id);
        if (!profileEntry) {
          return [];
        }

        return {
          _id: authUser._id,
          createdAt: authUser.createdAt ?? profileEntry?.createdAt ?? 0,
          email: authUser.email,
          name: authUser.name ?? undefined,
          role: normalizeRole(profileEntry?.role),
        };
      }
    );

    const authUserIds = new Set(authBackedUsers.map((entry) => entry._id));
    const profileOnlyUsers = await Promise.all(
      profiles
        .filter((entry: DirectoryProfile) => !authUserIds.has(entry.userId))
        .map(async (entry: DirectoryProfile) => {
          const authUser = await authComponent.getAnyUserById(
            ctx,
            entry.userId
          );
          return {
            _id: entry.userId,
            createdAt: authUser?.createdAt ?? entry.createdAt,
            email: authUser?.email ?? "Unknown",
            name: authUser?.name ?? undefined,
            role: normalizeRole(entry.role),
          };
        })
    );

    return [...authBackedUsers, ...profileOnlyUsers].sort(
      (left, right) => right.createdAt - left.createdAt
    );
  },
});

export const getRole = query({
  args: {},
  returns: v.union(v.string(), v.null()),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return null;
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    return normalizeRole(profile?.role);
  },
});

export const updateProfile = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    userType: v.optional(
      v.union(v.literal("buyer"), v.literal("seller"), v.literal("both"))
    ),
    storeName: v.optional(v.string()),
    offerTypes: v.optional(v.array(v.string())),
  },
  returns: v.id("profiles"),
  handler: async (ctx, args) => {
    // Validate input with Zod
    const validated = updateProfileSchema.parse(args);

    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    if (!user.emailVerified) {
      throw new Error("Email must be verified to update profile");
    }

    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    const now = Date.now();
    const nameParts = splitName(user.name);

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        firstName:
          validated.firstName ??
          existingProfile.firstName ??
          nameParts.firstName,
        lastName:
          validated.lastName ?? existingProfile.lastName ?? nameParts.lastName,
        phone: validated.phone ?? existingProfile.phone,
        location: validated.location ?? existingProfile.location,
        userType: validated.userType ?? existingProfile.userType,
        storeName: validated.storeName ?? existingProfile.storeName,
        offerTypes: validated.offerTypes ?? existingProfile.offerTypes,
        onboardingCompleted: true,
        updatedAt: now,
      });
      return existingProfile._id;
    }

    // Check for pending role invite before creating profile
    const pendingInvite = await ctx.db
      .query("role_invites")
      .withIndex("by_email", (q) => q.eq("email", user.email))
      .first();

    // Use invited role if exists, otherwise default to "user"
    const role = normalizeRole(pendingInvite?.role);

    // Delete the invite if claimed during profile creation
    if (pendingInvite) {
      await ctx.db.delete(pendingInvite._id);
    }

    return ctx.db.insert("profiles", {
      userId: user._id,
      firstName: validated.firstName ?? nameParts.firstName,
      lastName: validated.lastName ?? nameParts.lastName,
      phone: validated.phone,
      location: validated.location,
      userType: validated.userType ?? "buyer",
      role,
      storeName: validated.storeName,
      offerTypes: validated.offerTypes,
      onboardingCompleted: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const generateAvatarUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const setAvatar = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  returns: v.union(v.string(), v.null()),
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
    const nameParts = splitName(user.name);

    if (existingProfile?.avatarStorageId) {
      await ctx.storage.delete(existingProfile.avatarStorageId);
    }

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        avatarStorageId: args.storageId,
        updatedAt: now,
      });

      return await ctx.storage.getUrl(args.storageId);
    }

    const pendingInvite = await ctx.db
      .query("role_invites")
      .withIndex("by_email", (q) => q.eq("email", user.email))
      .first();

    const role = normalizeRole(pendingInvite?.role);

    if (pendingInvite) {
      await ctx.db.delete(pendingInvite._id);
    }

    await ctx.db.insert("profiles", {
      userId: user._id,
      firstName: nameParts.firstName,
      lastName: nameParts.lastName,
      userType: "buyer",
      role,
      onboardingCompleted: false,
      avatarStorageId: args.storageId,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.storage.getUrl(args.storageId);
  },
});

export const removeAvatar = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (!existingProfile) {
      return null;
    }

    if (existingProfile.avatarStorageId) {
      await ctx.storage.delete(existingProfile.avatarStorageId);
    }

    await ctx.db.patch(existingProfile._id, {
      avatarStorageId: undefined,
      updatedAt: Date.now(),
    });

    return null;
  },
});

export const claimRoleInvite = mutation({
  args: {},
  returns: v.union(v.string(), v.null()),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Defense-in-depth: require email verification
    if (!user.emailVerified) {
      throw new Error("Email must be verified to claim role invite");
    }

    const invite = await ctx.db
      .query("role_invites")
      .withIndex("by_email", (q) => q.eq("email", user.email))
      .first();

    if (!invite) {
      return null;
    }

    // Store the role before any operations
    const invitedRole = normalizeRole(invite.role);

    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    const now = Date.now();
    const nameParts = splitName(user.name);

    if (existingProfile) {
      const currentLevel = getRoleLevel(existingProfile.role);
      const inviteLevel = getRoleLevel(invitedRole);

      if (inviteLevel > currentLevel) {
        await ctx.db.patch(existingProfile._id, {
          role: invitedRole,
          updatedAt: now,
        });
      }
    } else {
      await ctx.db.insert("profiles", {
        userId: user._id,
        firstName: nameParts.firstName,
        lastName: nameParts.lastName,
        userType: "buyer",
        role: invitedRole,
        onboardingCompleted: false,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Delete invite AFTER profile update (Convex mutations are transactional)
    await ctx.db.delete(invite._id);
    return invitedRole;
  },
});

// Invite a user to become staff or super admin
export const inviteToRole = mutation({
  args: {
    email: v.string(),
    role: v.union(v.literal("staff"), v.literal("super_admin")),
  },
  returns: v.id("role_invites"),
  handler: async (ctx, args) => {
    // Validate input with Zod (includes email format check and normalization)
    const validated = inviteToRoleSchema.parse(args);

    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Check if caller can manage internal roles
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (!canManageUsers(profile?.role)) {
      throw new Error("Only staff or super admins can invite users to roles");
    }

    if (
      validated.role === "super_admin" &&
      normalizeRole(profile?.role) !== "super_admin"
    ) {
      throw new Error("Only super admins can invite another super admin");
    }

    // Check if invite already exists (email already normalized by Zod)
    const existingInvite = await ctx.db
      .query("role_invites")
      .withIndex("by_email", (q) => q.eq("email", validated.email))
      .first();

    const now = Date.now();

    if (existingInvite) {
      // Update existing invite
      await ctx.db.patch(existingInvite._id, {
        role: validated.role,
        invitedBy: user._id,
        updatedAt: now,
      });
      return existingInvite._id;
    }

    return ctx.db.insert("role_invites", {
      email: validated.email,
      role: validated.role,
      invitedBy: user._id,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Revoke a pending role invite
export const revokeInvite = mutation({
  args: {
    email: v.string(),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Check if caller can manage internal roles
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (!canManageUsers(profile?.role)) {
      throw new Error("Only staff or super admins can revoke invites");
    }

    const invite = await ctx.db
      .query("role_invites")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (invite) {
      await ctx.db.delete(invite._id);
      return true;
    }

    return false;
  },
});

// Get all pending invites (staff/super admin only)
export const getPendingInvites = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("role_invites"),
      email: v.string(),
      role: v.string(),
      createdAt: v.float64(),
    })
  ),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return [];
    }

    // Check if caller can manage internal roles
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (!canManageUsers(profile?.role)) {
      return [];
    }

    const invites = await ctx.db.query("role_invites").collect();
    return invites.map((invite) => ({
      _id: invite._id,
      email: invite.email,
      role: normalizeRole(invite.role),
      createdAt: invite.createdAt,
    }));
  },
});

export const updateUserRole = mutation({
  args: {
    userId: v.string(),
    role: v.union(
      v.literal("user"),
      v.literal("staff"),
      v.literal("super_admin")
    ),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const actor = await authComponent.getAuthUser(ctx);
    if (!actor) {
      throw new Error("Not authenticated");
    }

    const actorProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", actor._id))
      .first();
    const actorRole = normalizeRole(actorProfile?.role);

    if (!canManageUsers(actorRole)) {
      throw new Error("Only staff or super admins can update user roles");
    }

    if (args.role === "super_admin" && actorRole !== "super_admin") {
      throw new Error("Only super admins can assign super admin role");
    }

    const targetProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!targetProfile) {
      throw new Error("Target user profile not found");
    }
    const targetRole = normalizeRole(targetProfile.role);

    if (actor._id === args.userId && args.role !== targetRole) {
      throw new Error("You can't change your own role");
    }

    if (actorRole !== "super_admin" && targetRole === "super_admin") {
      throw new Error("Only super admins can modify super admin accounts");
    }

    await ctx.db.patch(targetProfile._id, {
      role: args.role,
      updatedAt: Date.now(),
    });
    await mirrorBetterAuthRole(ctx, args.userId, args.role);

    return true;
  },
});

export const syncMyBetterAuthRole = mutation({
  args: {},
  returns: v.union(
    v.literal("user"),
    v.literal("staff"),
    v.literal("super_admin")
  ),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();
    const role = normalizeRole(profile?.role);

    await mirrorBetterAuthRole(ctx, user._id, role);

    return role;
  },
});

export const promoteSelfToSuperAdmin = mutation({
  args: {},
  returns: v.boolean(),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    if (!user.emailVerified) {
      throw new Error("Email must be verified before role elevation");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (!profile) {
      throw new Error(
        "Complete onboarding before requesting super admin access"
      );
    }

    const normalizedRole = normalizeRole(profile.role);
    const existingSuperAdmin = await ctx.db
      .query("profiles")
      .withIndex("by_role", (q) => q.eq("role", "super_admin"))
      .first();

    const internalProfiles = await ctx.db.query("profiles").collect();
    const hasExistingOperators = internalProfiles.some(
      (entry) =>
        entry.userId !== profile.userId && normalizeRole(entry.role) !== "user"
    );

    if (existingSuperAdmin) {
      throw new Error("A super admin already exists. Ask them for access.");
    }

    if (
      normalizedRole !== "staff" &&
      !(normalizedRole === "user" && !hasExistingOperators)
    ) {
      throw new Error(
        "Only staff users can bootstrap the first super admin account once operators exist"
      );
    }

    await ctx.db.patch(profile._id, {
      role: "super_admin",
      updatedAt: Date.now(),
    });
    await mirrorBetterAuthRole(ctx, user._id, "super_admin");

    return true;
  },
});
