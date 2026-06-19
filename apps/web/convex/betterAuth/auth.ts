import { convexAdapter } from "@convex-dev/better-auth";
import { betterAuth } from "better-auth/minimal";
import { createAuthOptions } from "../authOptions";

// Static export for Better Auth schema generation only. `forAdapterInit`
// builds options without requiring runtime env (no deployment context here).
export const auth = betterAuth(
  createAuthOptions({} as never, convexAdapter({} as never, {} as never), {
    forAdapterInit: true,
  })
);
