import type { GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import type { BetterAuthOptions } from "better-auth/minimal";
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
} from "../src/lib/auth-permissions";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getOAuthEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

interface OAuthProviderConfig {
  clientId: string;
  clientSecret: string;
}

function getOAuthProvider(
  provider: "google" | "github",
  clientIdEnv: string,
  clientSecretEnv: string,
  forSchemaGeneration?: boolean
): OAuthProviderConfig | undefined {
  const clientId = getOAuthEnv(clientIdEnv);
  const clientSecret = getOAuthEnv(clientSecretEnv);

  if (!(clientId || clientSecret)) {
    if (!forSchemaGeneration) {
      console.warn(
        `[Auth Warning] ${provider} OAuth is disabled because ${clientIdEnv} and ${clientSecretEnv} are not set.`
      );
    }
    return undefined;
  }

  if (!(clientId && clientSecret)) {
    if (forSchemaGeneration) {
      return undefined;
    }
    throw new Error(
      `Incomplete ${provider} OAuth configuration: both ${clientIdEnv} and ${clientSecretEnv} must be set in the active Convex deployment.`
    );
  }

  return { clientId, clientSecret };
}

type CreateAuthOptionsConfig = {
  forSchemaGeneration?: boolean;
};

export function createAuthOptions(
  ctx: GenericCtx<DataModel>,
  database: BetterAuthOptions["database"],
  config: CreateAuthOptionsConfig = {}
): BetterAuthOptions {
  const { forSchemaGeneration = false } = config;
  const convexSiteUrl = forSchemaGeneration
    ? "https://placeholder.convex.site"
    : getRequiredEnv("CONVEX_SITE_URL");
  const adminUserIds =
    process.env.BETTER_AUTH_ADMIN_USER_IDS?.split(",")
      .map((id) => id.trim())
      .filter(Boolean) ?? [];

  const googleProvider = getOAuthProvider(
    "google",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    forSchemaGeneration
  );
  const githubProvider = getOAuthProvider(
    "github",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    forSchemaGeneration
  );

  return {
    appName: "Flik",
    baseURL: process.env.BETTER_AUTH_URL ?? convexSiteUrl,
    database,
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    rateLimit: {
      window: 60,
      max: 10,
      storage: "database",
    },
    trustedOrigins: [
      "http://localhost:3000",
      "https://flikapp.xyz",
      "https://www.flikapp.xyz",
      convexSiteUrl,
    ],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: {
      ...(googleProvider ? { google: googleProvider } : {}),
      ...(githubProvider ? { github: githubProvider } : {}),
    },
    plugins: [
      convex({ authConfig }),
      haveIBeenPwned({
        enabled: forSchemaGeneration
          ? false
          : process.env.NODE_ENV === "production",
      }),
      lastLoginMethod({
        storeInDatabase: false,
      }),
      admin({
        ac: flikAuthAccessControl,
        adminRoles: FLIK_AUTH_ADMIN_ROLES,
        adminUserIds,
        defaultRole: "user",
        impersonationSessionDuration: 60 * 60,
        roles: flikAuthRoles,
      }),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          const { sendEmailWithResend } = await import("./authEmail");
          let subject = "Your Flik verification code";
          if (type === "email-verification") {
            subject = "Verify your Flik email";
          } else if (type === "forget-password") {
            subject = "Reset your Flik password";
          }
          await sendEmailWithResend(email, subject, otp);
        },
      }),
      twoFactor({
        otpOptions: {
          async sendOTP({ user, otp }) {
            const { sendEmailWithResend } = await import("./authEmail");
            await sendEmailWithResend(
              user.email,
              "Your Flik verification code",
              otp,
              user.name
            );
          },
        },
      }),
    ],
  } satisfies BetterAuthOptions;
}