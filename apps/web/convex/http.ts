import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

const siteUrl = process.env.SITE_URL;
if (!siteUrl) {
  throw new Error(
    "Missing SITE_URL environment variable. Set it in your Convex deployment."
  );
}

// Match the trustedOrigins in auth.ts so CORS works in all environments
const allowedOrigins = [
  siteUrl,
  "http://localhost:3000",
  "https://flikapp.xyz",
  "https://www.flikapp.xyz",
];

// Register Better Auth routes
authComponent.registerRoutes(http, createAuth, {
  cors: { allowedOrigins },
});

export default http;
