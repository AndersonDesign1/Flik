import { z } from "zod/v4";

/**
 * Schema for updating user profile during onboarding.
 */
export const updateProfileSchema = z.object({
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
 * Schema for inviting users to admin/staff roles.
 */
export const inviteToRoleSchema = z.object({
  email: z
    .email("Invalid email format")
    .transform((val) => val.toLowerCase().trim()),
  role: z.enum(["admin", "staff"]),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type InviteToRoleInput = z.infer<typeof inviteToRoleSchema>;
