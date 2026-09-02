import { ArrowDown, ArrowRight } from "lucide-react";

const thinkingSteps = [
  {
    number: "01",
    title: "Understand the business",
    description: "What are you trying to achieve? Who is it for? What actually matters to the business?",
  },
  {
    number: "02",
    title: "Understand the problem",
    description: "What is getting in the way? What needs to improve? What should technology actually solve?",
  },
  {
    number: "03",
    title: "Choose the right approach",
    description: "Sometimes the answer is a website. Sometimes it is an application, a system, or something simpler.",
  },
  {
    number: "04",
    title: "Build what makes sense",
    description: "Once the direction is clear, we design and build a solution around the actual need.",
  },
];

export function QuestionAnswer() {
  return (
    <section id="thinking" aria-labelledby="question-answer-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="k-eyebrow">Before we build</p>

            <h2 id="question-answer-heading" className="k-heading-2 mt-6 max-w-xl">
              You do not always need more technology.
              <span className="mt-2 block text-[var(--text-secondary)]">You need the right technology.</span>
            </h2>

            <p className="k-body-large mt-8 max-w-lg">Every business has different goals, people, problems, and constraints. So we do not begin by deciding what to build.</p>

            <div className="mt-10 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-[var(--foreground)]" />

              <span className="text-sm font-medium text-[var(--text-secondary)]">Think first. Build second.</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-[var(--border)]">
              {thinkingSteps.map((step) => (
                <article key={step.number} className="group border-b border-[var(--border)] py-8 sm:py-9">
                  <div className="grid gap-5 sm:grid-cols-[64px_1fr_auto] sm:gap-6">
                    <span className="font-mono text-xs text-[var(--text-muted)]">{step.number}</span>

                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-2xl">{step.title}</h3>

                      <p className="k-body mt-3 max-w-xl">{step.description}</p>
                    </div>

                    <ArrowRight size={19} strokeWidth={1.6} aria-hidden="true" className="hidden text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--text-primary)] sm:mt-1 sm:block" />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-6 border border-[var(--border)] bg-[var(--surface)] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Good technology starts with a good question.</p>

                <p className="k-body-small mt-2 max-w-xl">We would rather understand the problem properly than build something you do not need.</p>
              </div>

              <div aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)]">
                <ArrowDown size={18} strokeWidth={1.6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
