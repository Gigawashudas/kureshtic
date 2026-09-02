import { redirect } from "next/navigation";
import { LogOut, FolderKanban, Settings } from "lucide-react";

import { createAdminAuthClient } from "@/lib/supabase/admin-auth";

export default async function AdminPage() {
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

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)]">
        <div className="k-container flex min-h-20 items-center justify-between gap-6">
          <div>
            <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">KURESHTIC</p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">Admin</p>
          </div>

          <form action="/api/admin/logout" method="post">
            <button type="submit" className="k-button k-button-secondary">
              <LogOut size={17} strokeWidth={1.7} aria-hidden="true" />

              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </header>

      <div className="k-container py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="k-eyebrow">Dashboard</p>

          <h1 className="k-heading-1 mt-5">Manage KURESHTIC.</h1>

          <p className="k-body-large mt-6 max-w-2xl">Manage projects and website content from one place.</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="group border border-[var(--border)] bg-[var(--surface)] p-7 transition-colors duration-200 hover:border-[var(--accent)]">
            <FolderKanban size={21} strokeWidth={1.6} className="text-[var(--accent)]" aria-hidden="true" />

            <h2 className="mt-7 text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">Projects</h2>

            <p className="k-body mt-3 max-w-md">Add, edit, publish, feature, and organize portfolio projects.</p>

            <span className="mt-7 block text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">Coming next</span>
          </div>

          <div className="border border-[var(--border)] bg-[var(--surface)] p-7">
            <Settings size={21} strokeWidth={1.6} className="text-[var(--text-secondary)]" aria-hidden="true" />

            <h2 className="mt-7 text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">Settings</h2>

            <p className="k-body mt-3 max-w-md">Site and administration settings will live here as the CMS grows.</p>

            <span className="mt-7 block text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">Coming later</span>
          </div>
        </div>

        <div className="mt-10 border-l-2 border-[var(--accent)] pl-5">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Signed in as</p>

          <p className="k-body-small mt-1">{user.email}</p>
        </div>
      </div>
    </main>
  );
}
