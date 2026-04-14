import { NextResponse } from "next/server";

import { impersonationCookieName } from "@/lib/auth";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/portal/admin", request.url));
  response.cookies.delete(impersonationCookieName);
  return response;
}

