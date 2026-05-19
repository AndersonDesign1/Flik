// Export a static instance for Better Auth schema generation.
// This file should only be used for schema generation, not at runtime.
import { betterAuth } from "better-auth";
import {
  admin,
  emailOTP,
  haveIBeenPwned,
  lastLoginMethod,
  twoFactor,
} from "better-auth/plugins";
import {
  FLIK_AUTH_ADMIN_ROLES,
  flikAuthAccessControl,
  flikAuthRoles,
} from "../../src/lib/auth-permissions";

// Minimal auth config just for schema generation — no env vars needed
export const auth = betterAuth({
  database: { provider: "sqlite", url: ":memory:" },
  emailAndPassword: { enabled: true },
  plugins: [
    haveIBeenPwned({ enabled: false }),
    lastLoginMethod({ storeInDatabase: false }),
    admin({
      ac: flikAuthAccessControl,
      adminRoles: FLIK_AUTH_ADMIN_ROLES,
      defaultRole: "user",
      roles: flikAuthRoles,
    }),
    emailOTP({
      async sendVerificationOTP() {},
    }),
    twoFactor({
      otpOptions: {
        async sendOTP() {},
      },
    }),
  ],
});
