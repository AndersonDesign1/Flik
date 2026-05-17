import { convexClient } from "@convex-dev/better-auth/client/plugins";
import {
  adminClient,
  emailOTPClient,
  lastLoginMethodClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { flikAuthAccessControl, flikAuthRoles } from "@/lib/auth-permissions";

export const authClient = createAuthClient({
  plugins: [
    convexClient(),
    lastLoginMethodClient(),
    adminClient({
      ac: flikAuthAccessControl,
      roles: flikAuthRoles,
    }),
    emailOTPClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/verify";
      },
    }),
  ],
});
