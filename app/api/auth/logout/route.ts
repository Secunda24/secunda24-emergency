import { NextResponse } from "next/server";

import { authCookieName, impersonationCookieName } from "@/lib/auth";
import { brandingCookieName } from "@/lib/branding";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(authCookieName);
  response.cookies.delete(impersonationCookieName);
  response.cookies.set(brandingCookieName, "", { path: "/", maxAge: 0 });
  return response;
}

