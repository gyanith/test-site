import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

    console.log("Proxy Reached!!")
    // 1. Define the cookie name
    // Appwrite cookie format is 'a_session_' + project ID (usually lowercased)
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    const appwriteSessionCookie = `a_session_${projectId?.toLowerCase()}`

    // 2. Define protected routes
    // const protectedRoutes = ['/events', '/merch', '/residence', '/user']
    const protectedRoutes = ["/loader"]
    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    )

    // 3. Check if the session cookie exists
    const session = request.cookies.get(appwriteSessionCookie)

    // 4. Redirect logic
    if (isProtected && !session) {
        const loginUrl = new URL('/auth', request.url)
        // Add a redirect param so you can send them back after login
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

// 5. Matcher Configuration
export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}