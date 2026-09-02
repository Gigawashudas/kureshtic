import { ArrowUpRight } from "lucide-react";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="k-section">
      <div className="k-container">
        <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div aria-hidden="true" className="absolute right-0 top-0 h-32 w-32 border-l border-b border-[var(--border)]" />

          <div aria-hidden="true" className="absolute bottom-0 left-0 h-20 w-20 border-r border-t border-[var(--border)]" />

          <div className="relative max-w-4xl">
            <p className="k-eyebrow">Ready when you are</p>

            <h2 id="final-cta-heading" className="k-heading-1 mt-6 max-w-4xl">
              Have a problem worth solving?
            </h2>

            <p className="k-body-large mt-7 max-w-2xl">Tell us what you are trying to achieve. We will help you figure out what makes sense, what does not, and what should happen next.</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#contact" className="k-button k-button-primary group w-full sm:w-auto">
                Start a Project
                <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a href="#work" className="k-button k-button-secondary w-full sm:w-auto">
                View Our Work
              </a>
            </div>
          </div>

          <div className="relative mt-16 border-t border-[var(--border)] pt-6 sm:mt-20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">You know your business. We know technology.</p>

              <span className="font-mono text-xs text-[var(--accent)]">THINK FIRST. BUILD SECOND.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
