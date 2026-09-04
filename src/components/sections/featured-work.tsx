"use client";

import Link from "next/link";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const featuredProjects = [
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

type PreviewMode = "desktop" | "mobile";

interface LivePreviewProps {
  title: string;
  liveUrl: string;
  mode: PreviewMode;
}

interface PreviewFrameProps {
  title: string;
  liveUrl: string;
  mode: PreviewMode;
  onLoad: () => void;
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute h-10 w-10 animate-ping rounded-full border border-[var(--accent)]/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </div>

        <p className="mt-4 text-sm font-medium text-foreground">Loading preview</p>

        <p className="mt-1 text-xs text-muted-foreground">Connecting to the live website</p>
      </div>
    </div>
  );
}

function DesktopPreview({ title, liveUrl, onLoad }: PreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateScale = () => {
      const width = container.clientWidth;

      if (!width) {
        return;
      }

      setScale(width / 1440);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-background">
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: "1440px",
          height: "900px",
          transform: `scale(${scale})`,
        }}
      >
        <div className="flex h-10 items-center gap-2 bg-background px-4">
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <span className="h-2.5 w-2.5 rounded-full border border-border" />

          <div className="ml-3 flex h-6 flex-1 items-center border border-border px-3">
            <span className="truncate text-[10px] text-muted-foreground">{liveUrl}</span>
          </div>
        </div>

        <iframe key={`${liveUrl}-desktop`} src={liveUrl} title={`${title} desktop preview`} className="block h-[860px] w-[1440px] border-0" loading="eager" onLoad={onLoad} />
      </div>
    </div>
  );
}

function MobilePreview({ title, liveUrl, onLoad }: PreviewFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  const MOBILE_WIDTH = 400;
  const MOBILE_HEIGHT = 750;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateScale = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      const availableWidth = Math.min(width - 32, MOBILE_WIDTH);
      const availableHeight = height - 32;

      const widthScale = availableWidth / MOBILE_WIDTH;
      const heightScale = availableHeight / MOBILE_HEIGHT;

      setScale(Math.min(widthScale, heightScale, 1));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center overflow-hidden bg-muted/20">
      <div
        className="relative shrink-0 overflow-hidden rounded bg-background"
        style={{
          width: `${MOBILE_WIDTH * scale}px`,
          height: `${MOBILE_HEIGHT * scale}px`,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: `${MOBILE_WIDTH}px`,
            height: `${MOBILE_HEIGHT}px`,
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            key={`${liveUrl}-mobile`}
            src={liveUrl}
            title={`${title} mobile preview`}
            className="absolute left-0 top-0 block border-0"
            style={{
              width: `${MOBILE_WIDTH}px`,
              height: `${MOBILE_HEIGHT}px`,
              margin: 0,
              padding: 0,
            }}
            loading="eager"
            onLoad={onLoad}
          />
        </div>
      </div>
    </div>
  );
}

function LivePreview({ title, liveUrl, mode }: LivePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Schedule setting loading state asynchronously to avoid
    // triggering cascading renders by calling setState synchronously
    // inside the effect body.
    const id = window.setTimeout(() => setIsLoading(true), 0);
    return () => window.clearTimeout(id);
  }, [liveUrl, mode]);

  if (!liveUrl) {
    return (
      <div className="flex h-[752px] items-center justify-center bg-muted/20 lg:aspect-[16/10] lg:h-auto">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Live preview coming soon</p>

          <p className="mt-1 text-xs text-muted-foreground">This project will be connected shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[752px] w-full overflow-hidden bg-muted/20 lg:aspect-[16/10] lg:h-auto">
      {mode === "desktop" ? <DesktopPreview title={title} liveUrl={liveUrl} mode={mode} onLoad={() => setIsLoading(false)} /> : <MobilePreview title={title} liveUrl={liveUrl} mode={mode} onLoad={() => setIsLoading(false)} />}

      {isLoading && <LoadingOverlay />}
    </div>
  );
}

export function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState("01");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");

  const project = featuredProjects.find((item) => item.number === selectedProject) ?? featuredProjects[0];

  function handleProjectChange(number: string) {
    setSelectedProject(number);
    setPreviewMode("desktop");
  }

  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">05 — Featured Work</p>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Work built around real problems.</h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">A selection of digital products and experiences designed, developed, and shaped around what the business actually needed.</p>

            <div className="mt-10 space-y-2">
              {featuredProjects.map((item) => {
                const isSelected = item.number === selectedProject;

                return (
                  <button key={item.number} type="button" onClick={() => handleProjectChange(item.number)} className={`group relative flex w-full items-start gap-4 px-4 py-4 text-left transition-all duration-300 ${isSelected ? "bg-(--accent)/10 text-(--accent)" : "text-muted-foreground hover:bg-(--accent)/5 hover:text-(--accent)"}`}>
                    <span className="mt-0.5 font-mono text-xs transition-colors duration-300">{item.number}</span>

                    <span className="flex-1">
                      <span className="block text-sm font-medium transition-colors duration-300">{item.title}</span>

                      <span className={`mt-1 block text-xs transition-all duration-300 ${isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}>{item.category}</span>
                    </span>

                    <span className={`absolute bottom-0 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${isSelected ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </button>
                );
              })}
            </div>

            {/* <Link href="/work" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-[var(--accent)]">
              View all work
              <ArrowUpRight className="h-4 w-4" />
            </Link> */}
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
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">{project.title}</h3>

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
  );
}
