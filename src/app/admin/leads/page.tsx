import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { createAdminAuthClient } from "@/lib/supabase/admin-auth";
import { createServerAdminClient } from "@/lib/supabase/server-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads",
  description: "Manage KURESHTIC project enquiries and leads.",
};

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  message: string;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

const statusStyles: Record<string, string> = {
  new: "border-accent/30 bg-accent/10 text-accent",
  contacted: "border-border bg-muted text-muted-foreground",
  qualified: "border-border bg-muted text-foreground",
  proposal: "border-border bg-muted text-foreground",
  won: "border-success/30 bg-success/10 text-success",
  lost: "border-error/30 bg-error/10 text-error",
};

async function getLeads(): Promise<Lead[]> {
  const authClient = await createAdminAuthClient();

  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: adminUser } = await authClient.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (!adminUser) {
    return [];
  }

  const supabase = createServerAdminClient();

  const { data, error } = await supabase.from("enquiries").select("id, name, email, company, project_type, message, status, created_at").order("created_at", { ascending: false });

  if (error) {
    console.error("ADMIN LEADS ERROR:", error);
    return [];
  }

  return data ?? [];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function LeadsPage() {
  const leads = await getLeads();

  const newLeads = leads.filter((lead) => lead.status === "new").length;

  const activeLeads = leads.filter((lead) => lead.status === "contacted" || lead.status === "qualified" || lead.status === "proposal").length;

  const wonLeads = leads.filter((lead) => lead.status === "won").length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Section spacing="large">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="k-eyebrow">Admin</p>

                <h1 className="k-display mt-4">Leads</h1>

                <p className="k-body-large mt-4 max-w-2xl text-muted-foreground">Manage enquiries and turn conversations into projects.</p>
              </div>

              <Link href="/admin" className="k-button k-button-secondary self-start md:self-auto">
                Dashboard
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-border bg-surface p-6">
                <p className="k-eyebrow">New</p>

                <p className="mt-3 text-3xl font-semibold">{newLeads}</p>
              </div>

              <div className="border border-border bg-surface p-6">
                <p className="k-eyebrow">Active</p>

                <p className="mt-3 text-3xl font-semibold">{activeLeads}</p>
              </div>

              <div className="border border-border bg-surface p-6">
                <p className="k-eyebrow">Won</p>

                <p className="mt-3 text-3xl font-semibold">{wonLeads}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="large">
        <Container>
          <div className="border border-border bg-surface">
            <div className="border-b border-border px-6 py-5 md:px-8">
              <h2 className="k-heading-2">All leads</h2>

              <p className="k-body-small mt-1 text-muted-foreground">{leads.length} total enquiries</p>
            </div>

            {leads.length === 0 ? (
              <div className="px-6 py-16 text-center md:px-8">
                <h3 className="k-heading-2">No leads yet.</h3>

                <p className="k-body mt-3 text-muted-foreground">New enquiries from the website will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {leads.map((lead) => {
                  const statusLabel = statusLabels[lead.status] ?? lead.status;

                  const statusClass = statusStyles[lead.status] ?? "border-border bg-muted text-muted-foreground";

                  return (
                    <Link key={lead.id} href={`/admin/leads/${lead.id}`} className="group block px-6 py-6 transition-colors hover:bg-muted/50 md:px-8">
                      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr_auto_auto] lg:items-center">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <h3 className="truncate font-medium">{lead.name}</h3>

                            {lead.status === "new" ? <span className="size-2 shrink-0 rounded-full bg-accent" /> : null}
                          </div>

                          <p className="mt-1 truncate text-sm text-muted-foreground">{lead.company || lead.email}</p>
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{lead.project_type}</p>

                          <p className="mt-1 truncate text-sm text-muted-foreground">{lead.message}</p>
                        </div>

                        <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium ${statusClass}`}>{statusLabel}</span>

                        <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                          <span className="text-xs text-muted-foreground">{formatDate(lead.created_at)}</span>

                          <span className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">View →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
