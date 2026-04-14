import { NextResponse, type NextRequest } from "next/server";

import {
  canAccessPath,
  getImpersonationFromRequest,
  getPortalHome,
  getSessionFromRequest
} from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/portal")) {
    return NextResponse.next();
  }

  const session = getSessionFromRequest(request);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/portal") {
    return NextResponse.redirect(new URL(getPortalHome(session.role), request.url));
  }

  if (!canAccessPath(session.role, pathname)) {
    return NextResponse.redirect(new URL(getPortalHome(session.role), request.url));
  }

  if (
    pathname.startsWith("/portal/admin") &&
    getImpersonationFromRequest(request) &&
    pathname !== "/portal/admin"
  ) {
    const response = NextResponse.next();
    response.cookies.delete("clientflow-impersonation");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"]
};
