import { createApi } from "@convex-dev/better-auth";
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
import schema from "./schema";

// Minimal auth options for schema validation only — no env vars needed.
// This must declare the same plugins as the full createAuthOptions in ../auth.ts
// so that the schema validators include all plugin fields.
const createSchemaOptions = () => ({
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

export const {
  create,
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
} = createApi(schema, createSchemaOptions);
