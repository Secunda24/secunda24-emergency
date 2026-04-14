import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authCookieName, createSessionValue, getDemoProfileForRole } from "@/lib/auth";
import { getSessionCookieOptions } from "@/lib/cookie-options";
import { env, isSupabaseConfigured } from "@/lib/env";

const schema = z
  .object({
    fullName: z.string().min(2),
    companyName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match."
  });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete the signup form." }, { status: 400 });
  }

  const { email, password, fullName } = parsed.data;

  if (isSupabaseConfigured && env.supabaseUrl && env.supabaseAnonKey) {
    const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "client"
        }
      }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  const demoProfile = getDemoProfileForRole("client");
  const response = NextResponse.json({
    redirectTo: "/portal/client"
  });

  response.cookies.set(
    authCookieName,
    createSessionValue({
      ...demoProfile,
      email,
      fullName
    }),
    getSessionCookieOptions()
  );

  return response;
}
