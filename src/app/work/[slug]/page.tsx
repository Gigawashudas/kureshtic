import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { createPublicClient } from "@/lib/supabase/public";
import { createServerAdminClient } from "@/lib/supabase/server-admin";
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
async function getProject(slug: string) {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("projects").select("title, slug, category, short_description, description, client_name, project_url, cover_image, gallery, technology_areas").eq("slug", slug).eq("published", true).single();
  if (error || !data) {
    return null;
  }
  return data as Project;
}
async function getImageUrl(path: string | null) {
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
  const validGalleryImages = galleryImages.filter((image): image is { path: string; url: string } => image !== null);
  return (
    <main className="min-h-screen bg-background text-foreground">
      {" "}
      <div className="k-container">
        {" "}
        <div className="border-b border-border py-6">
          {" "}
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {" "}
            <ArrowLeft className="size-4" /> Back to Work{" "}
          </Link>{" "}
        </div>{" "}
        <section className="py-16 md:py-24">
          {" "}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            {" "}
            <div>
              {" "}
              <p className="k-eyebrow mb-5">{project.category}</p> <h1 className="k-display max-w-4xl">{project.title}</h1> <p className="k-body-large mt-6 max-w-2xl text-muted-foreground"> {project.short_description} </p>{" "}
            </div>{" "}
            {project.project_url ? (
              <div className="lg:justify-self-end">
                {" "}
                <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="k-button k-button-primary">
                  {" "}
                  Visit Project <ExternalLink className="size-4" />{" "}
                </a>{" "}
              </div>
            ) : null}{" "}
          </div>{" "}
        </section>{" "}
        {coverUrl ? (
          <section className="pb-16 md:pb-24">
            {" "}
            <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] bg-surface">
              {" "}
              <Image src={coverUrl} alt={project.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1440px" unoptimized />{" "}
            </div>{" "}
          </section>
        ) : null}{" "}
        <section className="grid gap-12 border-t border-border py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          {" "}
          <div>
            {" "}
            <p className="k-eyebrow mb-4">About the project</p> <h2 className="k-heading-2 max-w-md"> What we built and why it matters. </h2>{" "}
          </div>{" "}
          <div className="max-w-3xl">
            {" "}
            <p className="k-body-large whitespace-pre-line text-muted-foreground"> {project.description} </p>{" "}
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {" "}
              {project.client_name ? (
                <div>
                  {" "}
                  <p className="k-eyebrow mb-2">Client</p> <p className="font-medium">{project.client_name}</p>{" "}
                </div>
              ) : null}{" "}
              <div>
                {" "}
                <p className="k-eyebrow mb-2">Category</p> <p className="font-medium">{project.category}</p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        {project.technology_areas.length > 0 ? (
          <section className="border-t border-border py-16 md:py-24">
            {" "}
            <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
              {" "}
              <div>
                {" "}
                <p className="k-eyebrow mb-4">Capabilities</p> <h2 className="k-heading-2"> Technology shaped around the problem. </h2>{" "}
              </div>{" "}
              <div className="flex flex-wrap content-start gap-3">
                {" "}
                {project.technology_areas.map((technology) => (
                  <span key={technology} className="rounded-full border border-border px-4 py-2 text-sm">
                    {" "}
                    {technology}{" "}
                  </span>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </section>
        ) : null}{" "}
        {validGalleryImages.length > 0 ? (
          <section className="border-t border-border py-16 md:py-24">
            {" "}
            <div className="mb-10">
              {" "}
              <p className="k-eyebrow mb-4">Project gallery</p> <h2 className="k-heading-2">A closer look at the work.</h2>{" "}
            </div>{" "}
            <div className="grid gap-6 md:grid-cols-2">
              {" "}
              {validGalleryImages.map((image, index) => (
                <div key={image.path} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-surface">
                  {" "}
                  <Image src={image.url} alt={`${project.title} — image ${index + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 50vw" unoptimized />{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </section>
        ) : null}{" "}
        <section className="border-t border-border py-20 md:py-28">
          {" "}
          <div className="max-w-3xl">
            {" "}
            <p className="k-eyebrow mb-5">Have a similar problem?</p> <h2 className="k-heading-1"> Let&apos;s figure out the right solution. </h2> <p className="k-body-large mt-6 max-w-2xl text-muted-foreground"> Tell us what you are trying to achieve. We will help you understand what makes sense before anything gets built. </p>{" "}
            <div className="mt-8">
              {" "}
              <Link href="/#start-project" className="k-button k-button-primary">
                {" "}
                Start a Project{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
      </div>{" "}
    </main>
  );
}
