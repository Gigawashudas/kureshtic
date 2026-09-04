"use client";

import Link from "next/link";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

import { LivePreview, type PreviewMode } from "@/components/work/live-preview";

const projects = [
  {
    number: "01",
    category: "Business Platform",
    title: "FORM/SPACE",
    description: "A structured digital platform designed to help a growing business present its services, manage information, and create a clearer customer experience.",
    tags: ["Web Platform", "Business", "Responsive"],
    liveUrl: "https://interior-design-phi-roan.vercel.app/",
  },
  {
    number: "02",
    category: "Interior Photography",
    title: "ST Photography",
    description: "A refined portfolio experience built to present spaces, projects, and design work with a strong visual hierarchy and editorial feel.",
    tags: ["Website", "Portfolio", "CMS Ready"],
    liveUrl: "https://st-photography.vercel.app/",
  },
  {
    number: "03",
    category: "Real Estate",
    title: "Prime State",
    description: "A cinematic real estate experience focused on property discovery, visual presentation, and a simple path from browsing to enquiry.",
    tags: ["Website", "Real Estate", "Responsive"],
    liveUrl: "https://property-website-self.vercel.app/",
  },
];

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState("01");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");

  const project = projects.find((item) => item.number === selectedProject) ?? projects[0];

  function handleProjectChange(number: string) {
    setSelectedProject(number);
    setPreviewMode("desktop");
  }

  return (
    <>
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="max-w-4xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Work</p>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">Work built around real problems.</h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">A collection of digital products and experiences designed, developed, and shaped around what each business actually needed.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Selected Projects</p>

                <div className="mt-8 space-y-2">
                  {projects.map((item) => {
                    const isSelected = item.number === selectedProject;

                    return (
                      <button key={item.number} type="button" onClick={() => handleProjectChange(item.number)} className={`group relative flex w-full items-start gap-4 px-4 py-4 text-left transition-all duration-300 ${isSelected ? "bg-(--accent)/10 text-(--accent)" : "text-muted-foreground hover:bg-(--accent)/5 hover:text-(--accent)"}`}>
                        <span className="mt-0.5 font-mono text-xs">{item.number}</span>

                        <span className="flex-1">
                          <span className="block text-sm font-medium">{item.title}</span>

                          <span className={`mt-1 block text-xs transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}>{item.category}</span>
                        </span>

                        <span className={`absolute bottom-0 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${isSelected ? "w-full" : "w-0 group-hover:w-full"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <article>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{project.number}</span>

                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{project.category}</span>
                  </div>

                  {project.liveUrl && (
                    <div className="flex items-center">
                      <button type="button" onClick={() => setPreviewMode("desktop")} aria-label={`Show ${project.title} desktop preview`} aria-pressed={previewMode === "desktop"} className="flex h-9 w-9 items-center justify-center transition-colors">
                        <Monitor className={`h-4 w-4 transition-colors duration-200 ${previewMode === "desktop" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-[var(--accent)]"}`} />
                      </button>

                      <button type="button" onClick={() => setPreviewMode("mobile")} aria-label={`Show ${project.title} mobile preview`} aria-pressed={previewMode === "mobile"} className="flex h-9 w-9 items-center justify-center transition-colors">
                        <Smartphone className={`h-4 w-4 transition-colors duration-200 ${previewMode === "mobile" ? "text-[var(--accent)]" : "text-muted-foreground hover:text-[var(--accent)]"}`} />
                      </button>
                    </div>
                  )}
                </div>

                <LivePreview title={project.title} liveUrl={project.liveUrl} mode={previewMode} />

                <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto]">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">{project.title}</h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="border border-border px-3 py-1.5 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.liveUrl && (
                    <div className="md:self-end">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-[var(--accent)]">
                        Open full website
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Start a Project</p>

                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Have a project in mind?</h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">Tell us what you are trying to build. We will help you figure out the right approach and turn the idea into something real.</p>
              </div>

              <Link href="/#start-project" className="k-button k-button-primary shrink-0">
                Start Your Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
