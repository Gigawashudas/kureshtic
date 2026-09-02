import { Bot, Database, Globe, Link2, Server, Workflow } from "lucide-react";

const technologyAreas = [
  {
    number: "01",
    title: "Digital Experiences",
    description: "Websites and interfaces designed around the people who use them and the goals they need to achieve.",
    icon: Globe,
  },
  {
    number: "02",
    title: "Applications",
    description: "Web and mobile applications built around the workflows, features, and requirements of the product.",
    icon: Server,
  },
  {
    number: "03",
    title: "Data & Systems",
    description: "Data structures, databases, and system architecture designed to support how the business actually operates.",
    icon: Database,
  },
  {
    number: "04",
    title: "Integrations",
    description: "Connecting the tools and services a business already uses when those connections create real value.",
    icon: Link2,
  },
  {
    number: "05",
    title: "Automation",
    description: "Reducing repetitive work and improving workflows when automation is genuinely useful.",
    icon: Workflow,
  },
  {
    number: "06",
    title: "Intelligent Solutions",
    description: "Using AI and other emerging technologies where they solve a real problem rather than simply following a trend.",
    icon: Bot,
  },
];

export function Technology() {
  return (
    <section id="technology" aria-labelledby="technology-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="k-eyebrow">Technology</p>

            <h2 id="technology-heading" className="k-heading-2 mt-6 max-w-lg">
              The right technology depends on the problem.
            </h2>

            <p className="k-body-large mt-7 max-w-md">We do not start with a fixed technology stack. We understand the requirements first, then choose the tools and approach that make the most sense.</p>

            <div className="mt-10 border-l-2 border-[var(--foreground)] pl-5">
              <p className="text-sm font-semibold text-[var(--text-primary)]">We do not sell a technology stack.</p>

              <p className="k-body-small mt-2 max-w-sm">We solve the business problem with technology that fits the project.</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid border-t border-[var(--border)] sm:grid-cols-2">
              {technologyAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <article key={area.number} className="group border-b border-[var(--border)] p-6 transition-colors duration-300 hover:bg-[var(--surface-muted)] sm:p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <span className="font-mono text-xs text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]">{area.number}</span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] text-[var(--text-secondary)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{area.title}</h3>

                    <p className="k-body mt-3 max-w-md">{area.description}</p>

                    <div className="mt-7 flex items-center gap-2">
                      <span aria-hidden="true" className="h-px w-5 bg-[var(--border-strong)] transition-all duration-300 group-hover:w-8 group-hover:bg-[var(--accent)]" />

                      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">CHOOSE WHAT FITS</span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">No technology for technology&apos;s sake.</p>

                  <p className="k-body-small mt-2 max-w-xl">The tools can change from project to project. The standard stays the same: appropriate, reliable, maintainable, and useful.</p>
                </div>

                <span aria-hidden="true" className="font-mono text-xs text-[var(--accent)]">
                  FIT &gt; TREND
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
