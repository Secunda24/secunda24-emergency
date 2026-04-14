import { NextResponse } from "next/server";
import { z } from "zod";

import { authCookieName, createSessionValue, getDemoProfileForRole, getPortalHome } from "@/lib/auth";
import { getSessionCookieOptions } from "@/lib/cookie-options";

const schema = z.object({
  role: z.enum(["client", "admin"])
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid demo role." }, { status: 400 });
  }

  const profile = getDemoProfileForRole(parsed.data.role);
  const response = NextResponse.json({
    redirectTo: getPortalHome(profile.role)
  });

  response.cookies.set(
    authCookieName,
    createSessionValue(profile),
    getSessionCookieOptions()
  );

  return response;
}
