import { NextResponse } from "next/server";

import { parseSessionValue, impersonationCookieName } from "@/lib/auth";
import { getSessionCookieOptions } from "@/lib/cookie-options";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const profileId = url.searchParams.get("profileId");
  const nextUrl = url.searchParams.get("next") ?? "/portal/client";
  const cookieValue = request.headers
    .get("cookie")
    ?.split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith("clientflow-session="))
    ?.split("=")[1];
  const session = parseSessionValue(cookieValue ? decodeURIComponent(cookieValue) : null);

  if (!session || session.role !== "admin" || !profileId) {
    return NextResponse.redirect(new URL("/portal/admin", request.url));
  }

  const response = NextResponse.redirect(new URL(nextUrl, request.url));
  response.cookies.set(impersonationCookieName, profileId, getSessionCookieOptions());
  return response;
}
