import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Next.js 16 Proxy - Server-side route protection
 *
 * This performs optimistic auth checks by verifying session cookie presence.
 * Full authorization is handled in Server Components/layouts with database checks.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = [
    "/admin",
    "/staff",
    "/dashboard",
    "/account",
    "/onboarding",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const sessionCookie = getSessionCookie(request);

    // Optimistic check: redirect to login if no session cookie
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Public auth routes - redirect authenticated users
  const authRoutes = ["/login", "/signup", "/forgot-password"];
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isAuthRoute) {
    const sessionCookie = getSessionCookie(request);

    if (sessionCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/dashboard/:path*",
    "/account/:path*",
    "/onboarding",
    "/login",
    "/signup",
    "/forgot-password",
  ],
};
