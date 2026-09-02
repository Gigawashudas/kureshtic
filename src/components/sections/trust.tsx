import { ArrowRight, Eye, MessageSquare, ShieldCheck, Wrench } from "lucide-react";

const trustPoints = [
  {
    number: "01",
    title: "Clear communication",
    description: "You should always understand what we are doing, what comes next, and why a decision matters.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Transparent decisions",
    description: "We explain our recommendations and trade-offs so you can make informed decisions about your product.",
    icon: Eye,
  },
  {
    number: "03",
    title: "Responsible technology",
    description: "We choose tools and architecture based on the actual project instead of adding complexity for its own sake.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Long-term thinking",
    description: "A product should remain understandable, maintainable, and useful after the initial launch.",
    icon: Wrench,
  },
];

export function Trust() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="k-eyebrow">Trust</p>

            <h2 id="trust-heading" className="k-heading-2 mt-6 max-w-xl">
              You should know what you are paying for.
            </h2>

            <p className="k-body-large mt-7 max-w-lg">Technology projects become difficult when communication becomes unclear. We believe the process should be understandable from the first conversation to the final delivery.</p>

            <div className="mt-10">
              <p className="text-sm font-semibold text-[var(--text-primary)]">No black box.</p>

              <div className="mt-4 flex max-w-sm items-center gap-3">
                <span aria-hidden="true" className="h-px flex-1 bg-[var(--border-strong)]" />

                <span className="font-mono text-xs text-[var(--accent)]">OPEN / CLEAR / PRACTICAL</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-[var(--border)]">
              {trustPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <article key={point.number} className="group border-b border-[var(--border)] py-7 sm:py-8">
                    <div className="grid gap-5 sm:grid-cols-[56px_1fr_auto] sm:gap-7">
                      <span className="font-mono text-xs text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]">{point.number}</span>

                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-2xl">{point.title}</h3>

                        <p className="k-body mt-3 max-w-xl">{point.description}</p>
                      </div>

                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] sm:flex">
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">A technology partner should make things clearer.</p>

                  <p className="k-body-small mt-2 max-w-xl">If something does not make sense, we believe you should be able to ask why, understand the answer, and make the decision with confidence.</p>
                </div>

                <a href="#contact" className="k-link group inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
                  Start a conversation
                  <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
