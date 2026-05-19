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

interface SharedPluginsOpts {
  haveIBeenPwnedEnabled?: boolean;
  adminUserIds?: string[];
  impersonationSessionDuration?: number;
  sendVerificationOTP?: (params: {
    email: string;
    otp: string;
    type: "sign-in" | "email-verification" | "forget-password" | "change-email";
  }) => Promise<void>;
  sendTwoFactorOTP?: (params: {
    user: { email: string; name?: string };
    otp: string;
  }) => Promise<void>;
}

export function getSharedAuthPlugins(opts: SharedPluginsOpts = {}) {
  return [
    haveIBeenPwned({
      enabled: opts.haveIBeenPwnedEnabled ?? false,
    }),
    lastLoginMethod({
      storeInDatabase: false,
    }),
    admin({
      ac: flikAuthAccessControl,
      adminRoles: FLIK_AUTH_ADMIN_ROLES,
      adminUserIds: opts.adminUserIds,
      defaultRole: "user",
      impersonationSessionDuration: opts.impersonationSessionDuration,
      roles: flikAuthRoles,
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (opts.sendVerificationOTP) {
          await opts.sendVerificationOTP({ email, otp, type });
        }
      },
    }),
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          if (opts.sendTwoFactorOTP) {
            await opts.sendTwoFactorOTP({ user, otp });
          }
        },
      },
    }),
  ];
}
