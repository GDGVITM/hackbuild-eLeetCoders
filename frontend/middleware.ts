import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow landing page and about page without login
  if (pathname === "/" || pathname === "/about") return NextResponse.next();

  // Allow static files (images, etc.) to be accessed without login
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Check for authentication cookie (adjust the cookie name as per your backend)
  const token = request.cookies.get("token")?.value;
  if (!token) {
    // Redirect to login with redirect param
    const loginUrl = new URL("/auth?form=login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only run middleware on these routes (all except '/', '/about', static, and api/auth)
export const config = {
  matcher: ["/((?!_next|api|favicon.ico|auth|static|images|public|about|$).*)"],
};
