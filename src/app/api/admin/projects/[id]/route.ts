import { NextResponse } from "next/server";

import { createAdminAuthClient } from "@/lib/supabase/admin-auth";
import { createServerAdminClient } from "@/lib/supabase/server-admin";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      {
        error: "Project ID is required.",
      },
      {
        status: 400,
      },
    );
  }

  const authClient = await createAdminAuthClient();

  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        error: "Unauthorized.",
      },
      {
        status: 401,
      },
    );
  }

  const { data: adminUser, error: adminError } = await authClient.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (adminError || !adminUser) {
    return NextResponse.json(
      {
        error: "Forbidden.",
      },
      {
        status: 403,
      },
    );
  }

  const supabase = createServerAdminClient();

  const { data: project, error: projectError } = await supabase.from("projects").select("id, cover_image, gallery").eq("id", id).single();

  if (projectError || !project) {
    return NextResponse.json(
      {
        error: "Project not found.",
      },
      {
        status: 404,
      },
    );
  }

  const imagePaths = [project.cover_image, ...(project.gallery ?? [])].filter((path): path is string => typeof path === "string" && path.length > 0);

  if (imagePaths.length > 0) {
    const { error: storageError } = await supabase.storage.from("project-images").remove(imagePaths);

    if (storageError) {
      console.error("PROJECT IMAGE CLEANUP ERROR:", storageError);

      return NextResponse.json(
        {
          error: "Project images could not be removed. The project was not deleted.",
        },
        {
          status: 500,
        },
      );
    }
  }

  const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);

  if (deleteError) {
    console.error("PROJECT DELETE ERROR:", deleteError);

    return NextResponse.json(
      {
        error: "Project could not be deleted.",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
