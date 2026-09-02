import { Blocks, Code2, Database, GitBranch, LayoutTemplate, Plug, Rocket, Workflow } from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Product Strategy",
    description: "Turning business goals and problems into a clear digital direction before development begins.",
    icon: LayoutTemplate,
  },
  {
    number: "02",
    title: "UI / UX",
    description: "Designing interfaces and user journeys that are clear, useful, accessible, and built around real users.",
    icon: Blocks,
  },
  {
    number: "03",
    title: "Frontend Development",
    description: "Building responsive, performant interfaces that work consistently across modern devices and browsers.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Backend Development",
    description: "Creating the application logic, services, authentication, and infrastructure that power digital products.",
    icon: Workflow,
  },
  {
    number: "05",
    title: "Data & Databases",
    description: "Structuring and managing the data layer so information remains reliable, accessible, and useful.",
    icon: Database,
  },
  {
    number: "06",
    title: "APIs & Integrations",
    description: "Connecting applications, third-party services, and business tools into a coherent digital environment.",
    icon: Plug,
  },
  {
    number: "07",
    title: "CMS & Content",
    description: "Giving teams practical ways to manage content and keep their digital products up to date.",
    icon: GitBranch,
  },
  {
    number: "08",
    title: "Deployment & Maintenance",
    description: "Getting products live and helping keep them stable, secure, and maintainable as they grow.",
    icon: Rocket,
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="k-eyebrow">Capabilities</p>

            <h2 id="capabilities-heading" className="k-heading-2 mt-6 max-w-lg">
              The work behind the solution.
            </h2>

            <p className="k-body-large mt-7 max-w-md">Good digital products need more than a polished interface. We bring together the thinking, design, development, and technical foundations needed to make them work.</p>

            <div className="mt-10 border-l-2 border-[var(--foreground)] pl-5">
              <p className="text-sm font-semibold text-[var(--text-primary)]">One partner. From direction to delivery.</p>

              <p className="k-body-small mt-2 max-w-sm">The exact capabilities involved depend on the problem we are solving together.</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid border-t border-[var(--border)] sm:grid-cols-2">
              {capabilities.map((capability) => {
                const Icon = capability.icon;

                return (
                  <article key={capability.number} className="group relative border-b border-[var(--border)] p-6 transition-colors duration-300 hover:bg-[var(--surface-muted)] sm:p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-5">
                      <span className="font-mono text-xs text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]">{capability.number}</span>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] text-[var(--text-secondary)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{capability.title}</h3>

                    <p className="k-body mt-3 max-w-md">{capability.description}</p>

                    <div className="mt-7 flex items-center gap-2">
                      <span aria-hidden="true" className="h-px w-5 bg-[var(--border-strong)] transition-all duration-300 group-hover:w-8 group-hover:bg-[var(--accent)]" />

                      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">KURESHTIC</span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-4 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Not sure what you need?</p>

                <p className="k-body-small mt-2 max-w-xl">That is exactly where the conversation should start. Tell us what you are trying to achieve and we can work out the technology together.</p>
              </div>

              <a href="#contact" className="k-link inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
                Talk to us
                <span aria-hidden="true" className="text-[var(--accent)]">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
