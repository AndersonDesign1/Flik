"use node";

import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { render } from "@react-email/render";
import { betterAuth } from "better-auth";
import { emailOTP, twoFactor } from "better-auth/plugins";
import { Resend } from "resend";
import { OTPEmail } from "../emails/otp-email";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getOAuthEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.warn(
      `[Auth Warning] OAuth env var ${name} is not set. ` +
        "The corresponding OAuth provider will not work."
    );
  }
  return value ?? "";
}

const convexSiteUrl = getRequiredEnv("CONVEX_SITE_URL");

export const authComponent = createClient<DataModel>(components.betterAuth);

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

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
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
    ],
    emailAndPassword: {
      enabled: true,
      // Intentional: we enforce verification in UI/Layouts & mutations
      // to allow a smoother "Signup -> Auto-login -> Verify" flow.
      requireEmailVerification: false,
    },
    socialProviders: {
      google: {
        clientId: getOAuthEnv("GOOGLE_CLIENT_ID"),
        clientSecret: getOAuthEnv("GOOGLE_CLIENT_SECRET"),
      },
      github: {
        clientId: getOAuthEnv("GITHUB_CLIENT_ID"),
        clientSecret: getOAuthEnv("GITHUB_CLIENT_SECRET"),
      },
    },
    plugins: [
      convex({ authConfig }),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
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
  });
};
