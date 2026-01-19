import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { inviteToRoleSchema, updateProfileSchema } from "./validation";

export const getProfile = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("profiles"),
      _creationTime: v.number(),
      userId: v.string(),
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

    return ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();
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

    if (profile?.role !== "admin") {
      return [];
    }

    const profiles = await ctx.db.query("profiles").collect();
    const usersWithProfiles = await Promise.all(
      profiles.map(async (p) => {
        const authUser = await authComponent.getAnyUserById(ctx, p.userId);
        return {
          _id: p.userId,
          name: authUser?.name ?? undefined,
          email: authUser?.email ?? "Unknown",
          role: p.role ?? "user",
          createdAt: p.createdAt,
        };
      })
    );

    return usersWithProfiles;
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

    return profile?.role ?? "user";
  },
});

export const updateProfile = mutation({
  args: {
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

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
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
    const role = pendingInvite?.role ?? "user";

    // Delete the invite if claimed during profile creation
    if (pendingInvite) {
      await ctx.db.delete(pendingInvite._id);
    }

    return ctx.db.insert("profiles", {
      userId: user._id,
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
    const invitedRole = invite.role;

    const existingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    const now = Date.now();

    if (existingProfile) {
      const currentRole = existingProfile.role ?? "user";
      const roleHierarchy = { user: 0, staff: 1, admin: 2 };
      const currentLevel =
        roleHierarchy[currentRole as keyof typeof roleHierarchy] ?? 0;
      const inviteLevel =
        roleHierarchy[invitedRole as keyof typeof roleHierarchy] ?? 0;

      if (inviteLevel > currentLevel) {
        await ctx.db.patch(existingProfile._id, {
          role: invitedRole,
          updatedAt: now,
        });
      }
    } else {
      await ctx.db.insert("profiles", {
        userId: user._id,
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

// Invite a user to become admin or staff
export const inviteToRole = mutation({
  args: {
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("staff")),
  },
  returns: v.id("role_invites"),
  handler: async (ctx, args) => {
    // Validate input with Zod (includes email format check and normalization)
    const validated = inviteToRoleSchema.parse(args);

    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Check if caller is admin
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (profile?.role !== "admin") {
      throw new Error("Only admins can invite users to roles");
    }

    // Check if invite already exists (email already normalized by Zod)
    const existingInvite = await ctx.db
      .query("role_invites")
      .withIndex("by_email", (q) => q.eq("email", validated.email))
      .first();

    if (existingInvite) {
      // Update existing invite
      await ctx.db.patch(existingInvite._id, {
        role: validated.role,
        invitedBy: user._id,
        createdAt: Date.now(),
      });
      return existingInvite._id;
    }

    return ctx.db.insert("role_invites", {
      email: validated.email,
      role: validated.role,
      invitedBy: user._id,
      createdAt: Date.now(),
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

    // Check if caller is admin
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (profile?.role !== "admin") {
      throw new Error("Only admins can revoke invites");
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

// Get all pending invites (admin only)
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

    // Check if caller is admin
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .first();

    if (profile?.role !== "admin") {
      return [];
    }

    const invites = await ctx.db.query("role_invites").collect();
    return invites.map((invite) => ({
      _id: invite._id,
      email: invite.email,
      role: invite.role,
      createdAt: invite.createdAt,
    }));
  },
});
