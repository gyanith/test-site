import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";

export async function middleware(request: NextRequest) {
  // Check if we have a session
  try {
    const { account } = await createSessionClient();
    await account.get();

    // If we're here, the user is logged in.
    // You can add logic to redirect *away* from auth pages if desired, e.g.:
    // if (request.nextUrl.pathname.startsWith('/auth')) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url));
    // }
  } catch (error) {
    // Not logged in
    // If trying to access protected routes, redirect to login
    // Example:
    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //   return NextResponse.redirect(new URL('/auth', request.url));
    // }
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
     * - auth (auth pages - we want these accessible)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
