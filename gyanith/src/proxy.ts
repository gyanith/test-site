import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // 1. Define the cookie name
  // We check for our custom 'session' cookie (SSR) OR the standard Appwrite cookie (CSR fallback)
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const appwriteSessionCookie = `a_session_${projectId?.toLowerCase()}`;

  const session =
    request.cookies.get("session") ||
    request.cookies.get(appwriteSessionCookie);

  // 2. Define protected routes
  const protectedRoutes = ["/loader", "/user", "/events"];
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // 3. Redirect logic
  if (isProtected && !session) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
