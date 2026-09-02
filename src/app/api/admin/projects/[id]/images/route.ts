import { NextResponse } from "next/server";

import { createAdminAuthClient } from "@/lib/supabase/admin-auth";
import { createServerAdminClient } from "@/lib/supabase/server-admin";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: RouteContext) {
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

  const { data: project, error: projectError } = await supabase.from("projects").select("cover_image, gallery").eq("id", id).single();

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

  let cover: {
    path: string;
    url: string;
  } | null = null;

  if (project.cover_image) {
    const { data: signedCover, error: coverError } = await supabase.storage.from("project-images").createSignedUrl(project.cover_image, 3600);

    if (!coverError && signedCover?.signedUrl) {
      cover = {
        path: project.cover_image,
        url: signedCover.signedUrl,
      };
    }
  }

  const gallery = await Promise.all(
    (project.gallery ?? []).map(async (path) => {
      const { data: signedImage, error } = await supabase.storage.from("project-images").createSignedUrl(path, 3600);

      if (error || !signedImage?.signedUrl) {
        return null;
      }

      return {
        path,
        url: signedImage.signedUrl,
      };
    }),
  );

  return NextResponse.json({
    cover,
    gallery: gallery.filter(
      (
        image,
      ): image is {
        path: string;
        url: string;
      } => image !== null,
    ),
  });
}
