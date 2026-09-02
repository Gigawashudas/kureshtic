import { ArrowUpRight, Compass, Handshake, Lightbulb, ShieldCheck } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Reasonable",
    description: "We recommend what makes sense for the business, even when the answer is simpler than expected.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Reliable",
    description: "Clear communication, realistic expectations, and a commitment to doing what we say we will do.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Accessible",
    description: "You should not need to understand technology to work with a technology partner.",
    icon: Handshake,
  },
  {
    number: "04",
    title: "Open-minded",
    description: "We do not begin with a predetermined solution. We start by understanding what the business actually needs.",
    icon: Lightbulb,
  },
];

export function WhyKureshtic() {
  return (
    <section id="about" aria-labelledby="why-kureshtic-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="k-eyebrow">Why KURESHTIC</p>

            <h2 id="why-kureshtic-heading" className="k-heading-2 mt-6 max-w-xl">
              Technology should feel like a partnership.
            </h2>

            <p className="k-body-large mt-7 max-w-lg">The best digital work happens when business knowledge and technical knowledge work together. You know your business. We know technology.</p>

            <div className="mt-10 max-w-lg border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
              <p className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">“We do not just build what you ask for.”</p>

              <p className="k-body-small mt-4">We ask questions, challenge assumptions when necessary, and help find the solution that makes the most sense.</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid border-t border-[var(--border)] sm:grid-cols-2">
              {principles.map((principle) => {
                const Icon = principle.icon;

                return (
                  <article key={principle.number} className="group border-b border-[var(--border)] p-6 transition-colors duration-300 hover:bg-[var(--surface-muted)] sm:p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <span className="font-mono text-xs text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]">{principle.number}</span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] text-[var(--text-secondary)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{principle.title}</h3>

                    <p className="k-body mt-3 max-w-md">{principle.description}</p>

                    <div className="mt-7 flex items-center gap-2">
                      <span aria-hidden="true" className="h-px w-5 bg-[var(--border-strong)] transition-all duration-300 group-hover:w-8 group-hover:bg-[var(--accent)]" />

                      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">HOW WE WORK</span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-5 border-t border-[var(--border)] pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="k-body-small max-w-xl">No unnecessary technology. No confusing language. No one-size- fits-all approach.</p>

              <a href="#contact" className="k-link group inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
                Work with us
                <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
