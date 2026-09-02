import { ArrowUpRight } from "lucide-react";

const featuredProjects = [
  {
    number: "01",
    category: "Business Platform",
    title: "NOVA",
    description: "A structured digital platform designed to help a growing business present its services, manage information, and create a clearer customer experience.",
    tags: ["Web Platform", "Business", "Responsive"],
    featured: true,
    theme: "light",
  },
  {
    number: "02",
    category: "Interior Design",
    title: "FORM/SPACE",
    description: "A refined portfolio experience built to present spaces, projects, and design work with a strong visual hierarchy and editorial feel.",
    tags: ["Website", "Portfolio", "CMS Ready"],
    featured: true,
    theme: "dark",
  },
  {
    number: "03",
    category: "Photography",
    title: "ST Photography",
    description: "A cinematic photography portfolio focused on visual storytelling, project discovery, and a simple path from browsing to enquiry.",
    tags: ["Portfolio", "Photography", "Enquiry"],
    featured: true,
    theme: "image",
  },
];

function ProjectVisual({ project }: { project: (typeof featuredProjects)[number] }) {
  if (project.theme === "dark") {
    return (
      <div className="relative h-full min-h-72 overflow-hidden bg-[#111111] p-5 text-[#f2f2ef] sm:min-h-80 sm:p-7">
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <span className="text-xs font-semibold tracking-[0.08em]">FORM/SPACE</span>

          <span className="text-[10px] uppercase tracking-[0.12em] text-white/45">Studio</span>
        </div>

        <div className="mt-10 max-w-sm">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/45">Selected spaces</p>

          <p className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
            Designed for
            <br />
            how people live.
          </p>
        </div>

        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 sm:bottom-7 sm:left-7 sm:right-7">
          <div className="h-16 bg-white/10" />
          <div className="h-16 bg-white/15" />
          <div className="h-16 bg-white/5" />
        </div>
      </div>
    );
  }

  if (project.theme === "image") {
    return (
      <div className="relative h-full min-h-72 overflow-hidden bg-[#202020] p-5 text-[#f4f4f6] sm:min-h-80 sm:p-7">
        <div className="absolute inset-0">
          <div className="absolute left-[12%] top-[18%] h-40 w-28 rotate-[-8deg] border border-white/20 bg-white/5" />
          <div className="absolute right-[14%] top-[12%] h-48 w-32 rotate-[7deg] border border-white/15 bg-white/10" />
          <div className="absolute bottom-[10%] left-[30%] h-44 w-32 rotate-[-3deg] border border-white/15 bg-white/5" />
        </div>

        <div className="relative flex items-center justify-between">
          <span className="text-xs font-semibold tracking-[0.08em]">ST PHOTOGRAPHY</span>

          <span className="text-[10px] uppercase tracking-[0.12em] text-white/45">Portfolio</span>
        </div>

        <div className="relative mt-32 sm:mt-36">
          <p className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
            Stories
            <br />
            worth seeing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-72 overflow-hidden bg-[#e9e9e5] p-5 text-[#111111] sm:min-h-80 sm:p-7">
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <span className="text-xs font-semibold tracking-[0.08em]">NOVA</span>

        <span className="text-[10px] uppercase tracking-[0.12em] text-black/45">Dashboard</span>
      </div>

      <div className="mt-7 grid grid-cols-[1fr_1.5fr] gap-3">
        <div className="space-y-3">
          <div className="h-20 bg-white" />
          <div className="h-24 bg-white" />
        </div>

        <div className="bg-white p-4">
          <div className="h-2 w-16 bg-black/10" />
          <div className="mt-5 h-24 border border-black/10" />

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-8 bg-black/5" />
            <div className="h-8 bg-black/5" />
            <div className="h-8 bg-black/5" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 sm:bottom-7 sm:left-7 sm:right-7">
        <div className="h-1 flex-1 bg-black/10" />
        <div className="h-1 w-16 bg-black/20" />
      </div>
    </div>
  );
}

export function SelectedWork() {
  const featured = featuredProjects.filter((project) => project.featured);

  return (
    <section id="work" aria-labelledby="selected-work-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="k-eyebrow">Featured work</p>

            <h2 id="selected-work-heading" className="k-heading-2 mt-6 max-w-lg">
              A few things we&apos;ve built.
            </h2>

            <p className="k-body-large mt-7 max-w-md">A small selection of projects that represent the kind of digital products and experiences we create.</p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-8">
              {featured.map((project) => (
                <article key={project.number} className="group overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                  <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="overflow-hidden border-b border-[var(--border)] lg:border-b-0 lg:border-r">
                      <ProjectVisual project={project} />
                    </div>

                    <div className="flex flex-col justify-between p-6 sm:p-8">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-xs text-[var(--accent)]">{project.number}</span>

                          <span className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--text-muted)]">{project.category}</span>
                        </div>

                        <h3 className="mt-6 text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">{project.title}</h3>

                        <p className="k-body mt-4 max-w-lg">{project.description}</p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-10 border-t border-[var(--border)] pt-5">
                        <a href="#contact" className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--accent)]">
                          View project
                          <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="k-body-small">Only selected projects appear here.</p>

              <a href="#contact" className="k-link text-sm font-semibold">
                Discuss your project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
