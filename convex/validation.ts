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

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type InviteToRoleInput = z.infer<typeof inviteToRoleSchema>;
