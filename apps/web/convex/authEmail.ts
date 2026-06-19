"use node";

import { render } from "@react-email/render";
import { Resend } from "resend";
import { OTPEmail } from "../emails/otp-email";

const FROM_EMAIL = "Flik <noreply@notification.flikapp.xyz>";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing required environment variable: RESEND_API_KEY");
  }
  return new Resend(apiKey);
}

export async function sendEmailWithResend(
  to: string,
  subject: string,
  otp: string,
  userName?: string
): Promise<void> {
  const html = await render(OTPEmail({ otp, userName }));

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject,
    html,
  });

  if (error) {
    // Avoid logging the raw provider error object — it can carry delivery
    // metadata (recipient address, provider internals) into logs.
    console.error("Failed to send verification email via email provider");
    throw new Error(
      "Failed to send verification email. Please try again later."
    );
  }
}
