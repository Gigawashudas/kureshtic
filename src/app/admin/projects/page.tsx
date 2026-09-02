import Link from "next/link";
import { ArrowLeft, ExternalLink, Pencil, Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { createAdminAuthClient } from "@/lib/supabase/admin-auth";

export default async function AdminProjectsPage() {
  const supabase = await createAdminAuthClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminUser } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (!adminUser) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  const { data: projects, error } = await supabase.from("projects").select("id, title, slug, category, short_description, featured, published, sort_order, created_at").order("sort_order", { ascending: true }).order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="k-container py-12 md:py-16">
          <Link href="/admin" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <section className="rounded-xl border border-error/30 bg-error/5 p-8">
            <p className="k-eyebrow mb-3 text-error">Projects</p>

            <h1 className="k-heading-2 mb-3">Unable to load projects</h1>

            <p className="k-body text-muted-foreground">Something went wrong while loading the project list. Please try again.</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="k-container py-8 md:py-12">
        <header className="mb-10">
          <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="k-eyebrow mb-3">Admin / Projects</p>

              <h1 className="k-heading-1">Projects</h1>

              <p className="k-body-large mt-3 max-w-2xl text-muted-foreground">Manage the projects displayed across the KURESHTIC website.</p>
            </div>

            <Link href="/admin/projects/new" className="k-button k-button-primary inline-flex w-fit items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Link>
          </div>
        </header>

        {projects.length === 0 ? (
          <section className="rounded-xl border border-border bg-surface p-8 md:p-12">
            <p className="k-eyebrow mb-3">No projects</p>

            <h2 className="k-heading-2 mb-3">Your project library is empty.</h2>

            <p className="k-body mb-6 max-w-xl text-muted-foreground">Create your first project to start building the KURESHTIC portfolio.</p>

            <Link href="/admin/projects/new" className="k-button k-button-primary inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create First Project
            </Link>
          </section>
        ) : (
          <section className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-6">
              <div>
                <p className="text-sm font-medium">
                  {projects.length} {projects.length === 1 ? "project" : "projects"}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">All projects in the CMS</p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {projects.map((project) => (
                <article key={project.id} className="px-5 py-5 transition-colors hover:bg-muted/30 md:px-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-base font-semibold">{project.title}</h2>

                        <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{project.category}</span>
                      </div>

                      <p className="mb-3 text-sm text-muted-foreground">{project.short_description}</p>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={`rounded-full px-2.5 py-1 ${project.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{project.published ? "Published" : "Draft"}</span>

                        {project.featured && <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent">Featured</span>}

                        <span className="text-muted-foreground">/{project.slug}</span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-3">
                      <span className="text-sm text-muted-foreground">Order {project.sort_order}</span>

                      <Link href={`/admin/projects/${project.id}/edit`} className="k-button k-button-secondary inline-flex items-center gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Link>

                      {project.published && (
                        <Link href={`/work/${project.slug}`} target="_blank" rel="noopener noreferrer" className="k-button k-button-secondary inline-flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Preview
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
