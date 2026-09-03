import { NextResponse } from "next/server";

import { createServerAdminClient } from "@/lib/supabase/server-admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      {
        error: "Image path is required.",
      },
      {
        status: 400,
      },
    );
  }

  const supabase = createServerAdminClient();

  const { data, error } = await supabase.storage.from("project-images").createSignedUrl(path, 3600);

  if (error || !data?.signedUrl) {
    console.error("PROJECT IMAGE SIGNED URL ERROR:", error);

    return NextResponse.json(
      {
        error: "Image could not be loaded.",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.redirect(data.signedUrl);
}
