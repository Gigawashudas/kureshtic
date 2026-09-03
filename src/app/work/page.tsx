import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { createPublicClient } from "@/lib/supabase/public";
import { createServerAdminClient } from "@/lib/supabase/server-admin";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Work", description: "A selection of digital products, websites, applications, and systems built by KURESHTIC." };
interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  cover_image: string | null;
  mobile_image: string | null;
  technology_areas: string[];
  featured: boolean;
}
interface ProjectWithImages extends Project {
  desktopImageUrl: string | null;
  mobileImageUrl: string | null;
}
async function getProjects(): Promise<ProjectWithImages[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("projects").select("id, title, slug, category, short_description, cover_image, mobile_image, technology_areas, featured").eq("published", true).order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) {
    console.error("WORK PROJECTS ERROR:", error);
    return [];
  }
  const projects = (data ?? []) as Project[];
  const adminClient = createServerAdminClient();
  return Promise.all(
    projects.map(async (project) => {
      let desktopImageUrl: string | null = null;
      let mobileImageUrl: string | null = null;
      if (project.cover_image) {
        const { data: desktopData, error: desktopError } = await adminClient.storage.from("project-images").createSignedUrl(project.cover_image, 3600);
        if (!desktopError && desktopData?.signedUrl) {
          desktopImageUrl = desktopData.signedUrl;
        }
      }
      if (project.mobile_image) {
        const { data: mobileData, error: mobileError } = await adminClient.storage.from("project-images").createSignedUrl(project.mobile_image, 3600);
        if (!mobileError && mobileData?.signedUrl) {
          mobileImageUrl = mobileData.signedUrl;
        }
      }
      return { ...project, desktopImageUrl, mobileImageUrl };
    }),
  );
}
function ProjectPlaceholder() {
  return (
    <div className="flex aspect-[16/10] items-center justify-center bg-[var(--surface-muted)]">
      {" "}
      <span className="k-body-small text-[var(--foreground-muted)]"> Project preview </span>{" "}
    </div>
  );
}
function ProjectVisual({ project }: { project: ProjectWithImages }) {
  return (
    <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
      {" "}
      {project.desktopImageUrl ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          {" "}
          <Image src={project.desktopImageUrl} alt={`${project.title} desktop view`} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]" />{" "}
        </div>
      ) : (
        <ProjectPlaceholder />
      )}{" "}
      {project.mobileImageUrl && (
        <div className="absolute bottom-4 right-4 w-[24%] max-w-[150px] overflow-hidden border border-[var(--border-strong)] bg-[var(--surface)] shadow-xl">
          {" "}
          <div className="relative aspect-[9/16]">
            {" "}
            <Image src={project.mobileImageUrl} alt={`${project.title} mobile view`} fill sizes="150px" className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]" />{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
function ProjectCard({ project, index }: { project: ProjectWithImages; index: number }) {
  const projectNumber = String(index + 1).padStart(2, "0");
  return (
    <article className="group">
      {" "}
      <Link href={`/work/${project.slug}`} className="block focus-visible:outline-none">
        {" "}
        <ProjectVisual project={project} />{" "}
        <div className="mt-6">
          {" "}
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3">
            {" "}
            <span className="font-mono text-xs tracking-[0.16em] text-[var(--foreground-muted)]"> {projectNumber} </span> <span className="k-body-small text-[var(--foreground-muted)]"> {project.category} </span>{" "}
          </div>{" "}
          <div className="mt-5 flex items-start justify-between gap-5">
            {" "}
            <h2 className="k-heading-3 transition-colors duration-200 group-hover:text-[var(--accent)]"> {project.title} </h2> <ArrowUpRight size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-[var(--foreground-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--accent)]" />{" "}
          </div>{" "}
          <p className="k-body mt-3 max-w-xl text-[var(--foreground-muted)]"> {project.short_description} </p>{" "}
          {project.technology_areas.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
              {" "}
              {project.technology_areas.map((technology) => (
                <span key={technology} className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
                  {" "}
                  {technology}{" "}
                </span>
              ))}{" "}
            </div>
          )}{" "}
          <div className="mt-6 inline-flex items-center gap-2 border-b border-[var(--foreground)] pb-1 text-sm font-medium transition-colors duration-200 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            {" "}
            View project <ArrowUpRight size={15} strokeWidth={1.5} />{" "}
          </div>{" "}
        </div>{" "}
      </Link>{" "}
    </article>
  );
}
export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      {" "}
      <main>
        {" "}
        <section className="k-section">
          {" "}
          <div className="k-container">
            {" "}
            <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24 lg:py-28">
              {" "}
              <h1 className="k-heading-1 text-center"> What we&apos;ve built. </h1> <p className="k-body-large mx-auto mt-6 max-w-3xl text-center text-(--foreground-muted)"> A selection of digital products, websites, applications, and systems built around different business problems. </p>{" "}
            </div>{" "}
          </div>{" "}
        </section>
        <section className="k-section pt-0">
          {" "}
          <div className="k-container">
            {" "}
            {projects.length > 0 ? (
              <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20">
                {" "}
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}{" "}
              </div>
            ) : (
              <div className="border-y border-[var(--border)] py-20 text-center">
                {" "}
                <p className="k-heading-3">No projects yet.</p> <p className="k-body mt-3 text-[var(--foreground-muted)]"> We&apos;re preparing our selected work. </p>{" "}
              </div>
            )}{" "}
          </div>{" "}
        </section>{" "}
        <section className="k-section">
          {" "}
          <div className="k-container">
            {" "}
            <div className="border-y border-[var(--border)] py-20 sm:py-24 lg:py-28">
              {" "}
              <div className="max-w-3xl">
                {" "}
                <p className="k-eyebrow">Have a project in mind?</p> <h2 className="k-heading-2 mt-4"> Let&apos;s build something that makes sense. </h2> <p className="k-body-large mt-6 max-w-2xl text-[var(--foreground-muted)]"> Tell us what you&apos;re trying to achieve. We&apos;ll help you figure out the right technology and the right way to build it. </p>{" "}
                <div className="mt-8">
                  {" "}
                  <Link href="/#start-project" className="k-button k-button-primary">
                    {" "}
                    Start a Project <ArrowUpRight size={17} strokeWidth={1.5} />{" "}
                  </Link>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
      </main>{" "}
      <Footer />{" "}
    </>
  );
}
