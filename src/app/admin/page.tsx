import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Inbox } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { createAdminAuthClient } from "@/lib/supabase/admin-auth";
import { createServerAdminClient } from "@/lib/supabase/server-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "KURESHTIC administration dashboard.",
};

async function getStats() {
  const authClient = await createAdminAuthClient();

  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    return {
      leads: 0,
      newLeads: 0,
      projects: 0,
    };
  }

  const { data: adminUser } = await authClient.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (!adminUser) {
    return {
      leads: 0,
      newLeads: 0,
      projects: 0,
    };
  }

  const supabase = createServerAdminClient();

  const [{ data: leads }, { data: projects }] = await Promise.all([supabase.from("enquiries").select("id, status"), supabase.from("projects").select("id")]);

  const allLeads = leads ?? [];

  return {
    leads: allLeads.length,
    newLeads: allLeads.filter((lead) => lead.status === "new").length,
    projects: projects?.length ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Section spacing="large">
        <Container>
          <div>
            <p className="k-eyebrow">Admin</p>

            <h1 className="k-display mt-4">Dashboard</h1>

            <p className="k-body-large mt-4 max-w-2xl text-muted-foreground">Manage KURESHTIC projects, enquiries, and business activity.</p>
          </div>
        </Container>
      </Section>

      <Section spacing="large">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/admin/leads" className="group border border-border bg-surface p-6 transition-colors hover:bg-muted/50 md:p-8">
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center border border-border">
                  <Inbox className="size-5" />
                </div>

                <ArrowRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <p className="k-eyebrow mt-8">Leads</p>

              <p className="mt-3 text-3xl font-semibold">{stats.leads}</p>

              <p className="k-body-small mt-2 text-muted-foreground">Total enquiries</p>

              {stats.newLeads > 0 ? (
                <p className="mt-5 text-sm font-medium text-accent">
                  {stats.newLeads} new {stats.newLeads === 1 ? "lead" : "leads"}
                </p>
              ) : null}
            </Link>

            <Link href="/admin/projects" className="group border border-border bg-surface p-6 transition-colors hover:bg-muted/50 md:p-8">
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center border border-border">
                  <BriefcaseBusiness className="size-5" />
                </div>

                <ArrowRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <p className="k-eyebrow mt-8">Projects</p>

              <p className="mt-3 text-3xl font-semibold">{stats.projects}</p>

              <p className="k-body-small mt-2 text-muted-foreground">Projects in the system</p>
            </Link>

            <div className="border border-border bg-surface p-6 md:p-8">
              <p className="k-eyebrow">Quick Action</p>

              <h2 className="k-heading-2 mt-4">Review your leads</h2>

              <p className="k-body mt-3 text-muted-foreground">Keep track of new enquiries and move promising opportunities forward.</p>

              <Link href="/admin/leads" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                Open Leads
                <ArrowRight className="size-4 transition-transform duration-300 hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
