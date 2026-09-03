import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { createPublicClient } from "@/lib/supabase/public";
import { createServerAdminClient } from "@/lib/supabase/server-admin";
export const dynamic = "force-dynamic";
interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}
interface Project {
  title: string;
  slug: string;
  category: string;
  short_description: string;
  description: string;
  client_name: string | null;
  project_url: string | null;
  cover_image: string | null;
  gallery: string[];
  technology_areas: string[];
}
interface GalleryImage {
  path: string;
  url: string;
}
async function getProject(slug: string): Promise<Project | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("projects").select("title, slug, category, short_description, description, client_name, project_url, cover_image, gallery, technology_areas").eq("slug", slug).eq("published", true).single();
  if (error || !data) {
    return null;
  }
  return data as Project;
}
async function getImageUrl(path: string | null): Promise<string | null> {
  if (!path) {
    return null;
  }
  const supabase = createServerAdminClient();
  const { data, error } = await supabase.storage.from("project-images").createSignedUrl(path, 3600);
  if (error || !data?.signedUrl) {
    console.error("KURESHTIC IMAGE SIGNING ERROR:", { path, error });
    return null;
  }
  return data.signedUrl;
}
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return { title: project.title, description: project.short_description };
}
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    notFound();
  }
  const coverUrl = await getImageUrl(project.cover_image);
  const galleryImages = await Promise.all(
    project.gallery.map(async (path) => {
      const url = await getImageUrl(path);
      if (!url) {
        return null;
      }
      return { path, url };
    }),
  );
  const validGalleryImages = galleryImages.filter((image): image is GalleryImage => image !== null);
  return (
    <>
      {" "}
      <main className="min-h-screen bg-background text-foreground">
        {" "}
        <div className="k-container">
          {" "}
          <div className="border-b border-[var(--border)] py-6">
            {" "}
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              {" "}
              <ArrowLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" /> Back to Work{" "}
            </Link>{" "}
          </div>{" "}
          <section className="py-16 md:py-24">
            {" "}
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
              {" "}
              <div className="lg:col-span-8">
                {" "}
                <p className="k-eyebrow">{project.category}</p> <h1 className="k-display mt-6 max-w-5xl"> {project.title} </h1> <p className="k-body-large mt-7 max-w-2xl text-[var(--text-secondary)]"> {project.short_description} </p>{" "}
              </div>{" "}
              {project.project_url ? (
                <div className="lg:col-span-4 lg:flex lg:justify-end">
                  {" "}
                  <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="k-button k-button-primary inline-flex items-center gap-2">
                    {" "}
                    Visit Project <ExternalLink className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />{" "}
                  </a>{" "}
                </div>
              ) : null}{" "}
            </div>{" "}
          </section>{" "}
          {coverUrl ? (
            <section className="pb-16 md:pb-24">
              {" "}
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-muted)]">
                {" "}
                <Image src={coverUrl} alt={project.title} fill priority unoptimized className="object-cover transition-transform duration-700 ease-out hover:scale-[1.01]" sizes="(max-width: 1024px) 100vw, 1440px" />{" "}
              </div>{" "}
            </section>
          ) : null}{" "}
          <section className="grid gap-12 border-t border-[var(--border)] py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
            {" "}
            <div className="lg:col-span-4">
              {" "}
              <p className="k-eyebrow">About the project</p> <h2 className="k-heading-2 mt-5 max-w-md"> What we built and why it matters. </h2>{" "}
            </div>{" "}
            <div className="lg:col-span-8">
              {" "}
              <p className="k-body-large max-w-3xl whitespace-pre-line text-[var(--text-secondary)]"> {project.description} </p>{" "}
              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {" "}
                {project.client_name ? (
                  <div>
                    {" "}
                    <p className="k-eyebrow">Client</p> <p className="mt-3 text-sm font-medium text-[var(--text-primary)]"> {project.client_name} </p>{" "}
                  </div>
                ) : null}{" "}
                <div>
                  {" "}
                  <p className="k-eyebrow">Category</p> <p className="mt-3 text-sm font-medium text-[var(--text-primary)]"> {project.category} </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          {project.technology_areas.length > 0 ? (
            <section className="border-t border-[var(--border)] py-16 md:py-24">
              {" "}
              <div className="grid gap-10 md:grid-cols-12 md:gap-10">
                {" "}
                <div className="md:col-span-5">
                  {" "}
                  <p className="k-eyebrow">Capabilities</p> <h2 className="k-heading-2 mt-5 max-w-md"> Technology shaped around the problem. </h2>{" "}
                </div>{" "}
                <div className="md:col-span-7">
                  {" "}
                  <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2">
                    {" "}
                    {project.technology_areas.map((technology) => (
                      <div key={technology} className="bg-[var(--surface)] px-5 py-5">
                        {" "}
                        <span className="text-sm font-medium text-[var(--text-primary)]"> {technology} </span>{" "}
                      </div>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </section>
          ) : null}{" "}
          {validGalleryImages.length > 0 ? (
            <section className="border-t border-[var(--border)] py-16 md:py-24">
              {" "}
              <div className="grid gap-10 md:grid-cols-12 md:gap-10">
                {" "}
                <div className="md:col-span-4">
                  {" "}
                  <p className="k-eyebrow">Project gallery</p> <h2 className="k-heading-2 mt-5 max-w-md"> A closer look at the work. </h2>{" "}
                </div>{" "}
                <div className="md:col-span-8">
                  {" "}
                  <div className="grid gap-6">
                    {" "}
                    {validGalleryImages.map((image, index) => (
                      <div key={image.path} className="group relative aspect-[4/3] overflow-hidden bg-[var(--surface-muted)]">
                        {" "}
                        <Image src={image.url} alt={`${project.title} — image ${index + 1}`} fill unoptimized className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 66vw" />{" "}
                      </div>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </section>
          ) : null}{" "}
          <section className="border-t border-[var(--border)] py-20 md:py-28">
            {" "}
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              {" "}
              <div className="md:col-span-8">
                {" "}
                <p className="k-eyebrow">Have a similar problem?</p> <h2 className="k-heading-1 mt-5 max-w-3xl"> Let&apos;s figure out the right solution. </h2> <p className="k-body-large mt-6 max-w-2xl text-[var(--text-secondary)]"> Tell us what you are trying to achieve. We will help you understand what makes sense before anything gets built. </p>{" "}
              </div>{" "}
              <div className="md:col-span-4 md:flex md:justify-end">
                {" "}
                <Link href="/#start-project" className="k-button k-button-primary inline-flex items-center gap-2">
                  {" "}
                  Start a Project <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />{" "}
                </Link>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
        </div>{" "}
      </main>{" "}
      <Footer />{" "}
    </>
  );
}
