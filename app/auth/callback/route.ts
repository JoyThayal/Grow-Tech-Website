import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/"; // jodi path na thake tokhon home-e jabe

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // jekhan theke user click korechhe sekhaney pathiye debe
  return NextResponse.redirect(`${origin}${next}`);
}
