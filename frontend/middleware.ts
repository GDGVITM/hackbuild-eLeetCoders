import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow landing, events, and about page without login
  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/browse-events"
  ) {
    return NextResponse.next();
  }

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

  // Allow all root-level static files (e.g., /file.png, /logo.svg)
  if (/^\/[^/]+\.(png|jpg|jpeg|svg|gif|webp|ico)$/i.test(pathname)) {
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

// Exclude static/image/about/public routes from middleware
export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|auth|static|images|public|about|browse-events|$).*)",
  ],
};
