import { ArrowRight, Check, MessageCircle, PenTool, Rocket, Wrench } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Understand",
    description: "We start with your business, goals, users, and the problem you are trying to solve.",
    outcome: "A clear understanding of the problem.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Define",
    description: "We turn what we learn into a practical direction, deciding what should be built and what does not need to be built.",
    outcome: "A focused scope and clear direction.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build",
    description: "We design and develop the solution, keeping you involved at the important decisions without unnecessary complexity.",
    outcome: "A working digital product.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Launch",
    description: "We prepare the product for real users, test the important details, and get everything ready to go live.",
    outcome: "A reliable launch.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Maintain",
    description: "Technology does not stop at launch. We can continue improving, maintaining, and supporting what we build.",
    outcome: "A product that can keep evolving.",
    icon: Check,
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="k-eyebrow">Our process</p>

            <h2 id="process-heading" className="k-heading-2 mt-6 max-w-lg">
              No guessing. No unnecessary complexity.
            </h2>

            <p className="k-body-large mt-7 max-w-md">A good process makes technology easier to understand. We keep the work structured, transparent, and focused on what matters.</p>

            <div className="mt-10 border-l-2 border-[var(--foreground)] pl-5">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Think first. Build second.</p>

              <p className="k-body-small mt-2 max-w-sm">The process can adapt to the size and complexity of the project, but the principle stays the same.</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-[var(--border)]">
              {processSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <article key={step.number} className="group border-b border-[var(--border)] py-7 sm:py-8">
                    <div className="grid gap-6 sm:grid-cols-[56px_1fr_auto] sm:items-start sm:gap-7">
                      <span className="font-mono text-xs text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]">{step.number}</span>

                      <div>
                        <div className="flex items-center gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] text-[var(--text-secondary)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] sm:hidden">
                            <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                          </div>

                          <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-2xl">{step.title}</h3>
                        </div>

                        <p className="k-body mt-3 max-w-xl">{step.description}</p>

                        <div className="mt-5 flex items-start gap-3">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                          <p className="text-sm font-medium text-[var(--text-secondary)]">{step.outcome}</p>
                        </div>
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
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">The first step is simply a conversation.</p>

                  <p className="k-body-small mt-2 max-w-xl">You do not need a complete specification before talking to us. Bring the problem. We can work through the rest.</p>
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
