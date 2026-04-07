import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

const LEADING_SLASHES = /^\/+/;

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
    const adminPath = pathname
      .slice("/admin".length)
      .replace(LEADING_SLASHES, "");
    const adminRouteMap: Record<string, string> = {
      products: "/staff/products",
      sellers: "/staff/sellers",
      users: "/staff/users",
    };

    redirectUrl.pathname =
      pathname === "/admin" ? "/staff" : (adminRouteMap[adminPath] ?? "/staff");
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
