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

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname =
      pathname === "/admin"
        ? "/staff"
        : `/staff/${pathname.slice("/admin/".length)}`;
    return NextResponse.redirect(redirectUrl);
  }

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/dashboard/:path*",
    "/account/:path*",
    "/onboarding",
  ],
};
