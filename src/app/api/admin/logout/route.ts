import { NextResponse } from "next/server";

import { createAdminAuthClient } from "@/lib/supabase/admin-auth";

export async function POST(request: Request) {
  const supabase = await createAdminAuthClient();

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/admin/login", request.url));
}
