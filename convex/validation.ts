import { z } from "zod/v4";

/**
 * Schema for updating user profile during onboarding.
 */
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(100, "First name must be 100 characters or less")
    .optional(),
  lastName: z
    .string()
    .trim()
    .max(100, "Last name must be 100 characters or less")
    .optional(),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or less")
    .optional(),
  location: z
    .string()
    .trim()
    .max(120, "Location must be 120 characters or less")
    .optional(),
  userType: z.enum(["buyer", "seller", "both"]).optional(),
  storeName: z
    .string()
    .min(1, "Store name is required")
    .max(100, "Store name must be 100 characters or less")
    .optional(),
  offerTypes: z
    .array(z.string().max(50, "Offer type must be 50 characters or less"))
    .max(10, "Maximum 10 offer types allowed")
    .optional(),
});

/**
 * Schema for inviting users to privileged roles.
 */
export const inviteToRoleSchema = z.object({
  email: z
    .email("Invalid email format")
    .transform((val) => val.toLowerCase().trim()),
  role: z.enum(["admin", "staff", "super_admin"]),
});

/**
 * Schema for buyer-to-seller store activation.
 */
export const createStoreSchema = z.object({
  description: z
    .string()
    .trim()
    .max(280, "Description must be 280 characters or less")
    .optional(),
  name: z
    .string()
    .trim()
    .min(2, "Store name must be at least 2 characters")
    .max(100, "Store name must be 100 characters or less"),
  slug: z
    .string()
    .trim()
    .min(3, "Store URL must be at least 3 characters")
    .max(60, "Store URL must be 60 characters or less")
    .optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type InviteToRoleInput = z.infer<typeof inviteToRoleSchema>;
export type CreateStoreInput = z.infer<typeof createStoreSchema>;
