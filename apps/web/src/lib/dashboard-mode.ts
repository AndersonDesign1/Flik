import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "../../convex/_generated/api";

export type DashboardDataMode = "demo" | "empty";

function getDemoEmails(): Set<string> {
  const raw = process.env.DEMO_USER_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function getViewerDashboardMode(): Promise<DashboardDataMode> {
  const user = await fetchAuthQuery(api.users.getCurrentUser);

  if (!user) {
    return "empty";
  }

  const demoEmails = getDemoEmails();
  if (demoEmails.has(user.email.toLowerCase())) {
    return "demo";
  }

  return "empty";
}
