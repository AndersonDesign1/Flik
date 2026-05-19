"use node";

import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { render } from "@react-email/render";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { getSharedAuthPlugins } from "./betterAuth/shared-plugins";
import { Resend } from "resend";
import { OTPEmail } from "../emails/otp-email";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";
import authSchema from "./betterAuth/schema";

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
  clientSecretEnv: string
): OAuthProviderConfig | undefined {
  const clientId = getOAuthEnv(clientIdEnv);
  const clientSecret = getOAuthEnv(clientSecretEnv);

  if (!(clientId || clientSecret)) {
    console.warn(
      `[Auth Warning] ${provider} OAuth is disabled because ${clientIdEnv} and ${clientSecretEnv} are not set.`
    );
    return undefined;
  }

  if (!(clientId && clientSecret)) {
    throw new Error(
      `Incomplete ${provider} OAuth configuration: both ${clientIdEnv} and ${clientSecretEnv} must be set in the active Convex deployment.`
    );
  }

  return { clientId, clientSecret };
}

export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema,
    },
  }
);

export const createAuthOptions = (
  ctx: GenericCtx<DataModel>
): BetterAuthOptions => {
  const convexSiteUrl = getRequiredEnv("CONVEX_SITE_URL");
  const adminUserIds =
    process.env.BETTER_AUTH_ADMIN_USER_IDS?.split(",")
      .map((id) => id.trim())
      .filter(Boolean) ?? [];

  // Initialize Resend SDK
  const resend = new Resend(getRequiredEnv("RESEND_API_KEY"));
  const FROM_EMAIL = "Flik <noreply@notification.flikapp.xyz>";

  /**
   * Send email using Resend SDK with React Email templates
   */
  async function sendEmailWithResend(
    to: string,
    subject: string,
    otp: string,
    userName?: string
  ): Promise<void> {
    // Render React Email template to HTML
    const html = await render(OTPEmail({ otp, userName }));

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw new Error(
        "Failed to send verification email. Please try again later."
      );
    }
  }

  const googleProvider = getOAuthProvider(
    "google",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET"
  );
  const githubProvider = getOAuthProvider(
    "github",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET"
  );

  return {
    appName: "Flik",
    baseURL: process.env.BETTER_AUTH_URL ?? convexSiteUrl,
    database: authComponent.adapter(ctx),
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // Refresh every 24 hours
    },
    rateLimit: {
      window: 60, // 60 second window
      max: 10, // Max 10 requests per window
    },
    trustedOrigins: [
      "http://localhost:3000",
      "https://flikapp.xyz",
      "https://www.flikapp.xyz",
      convexSiteUrl,
      ...(process.env.SITE_URL ? [process.env.SITE_URL] : []),
    ],
    emailAndPassword: {
      enabled: true,
      // Intentional: we enforce verification in UI/Layouts & mutations
      // to allow a smoother "Signup -> Auto-login -> Verify" flow.
      requireEmailVerification: false,
    },
    socialProviders: {
      ...(googleProvider ? { google: googleProvider } : {}),
      ...(githubProvider ? { github: githubProvider } : {}),
    },
    plugins: [
      convex({ authConfig }),
      ...getSharedAuthPlugins({
        haveIBeenPwnedEnabled: process.env.NODE_ENV === "production",
        adminUserIds,
        impersonationSessionDuration: 60 * 60,
        async sendVerificationOTP({ email, otp, type }) {
          let subject = "Your Flik verification code";
          if (type === "email-verification") {
            subject = "Verify your Flik email";
          } else if (type === "forget-password") {
            subject = "Reset your Flik password";
          }
          await sendEmailWithResend(email, subject, otp);
        },
        async sendTwoFactorOTP({ user, otp }) {
          await sendEmailWithResend(
            user.email,
            "Your Flik verification code",
            otp,
            user.name
          );
        },
      }),
    ],
  };
};

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth(createAuthOptions(ctx));
};
