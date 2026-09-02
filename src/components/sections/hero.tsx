import { ArrowDownRight, ArrowRight, Globe2, Server, Smartphone, Workflow } from "lucide-react";

const solutionItems = [
  {
    number: "01",
    label: "Website",
    icon: Globe2,
  },
  {
    number: "02",
    label: "Web Application",
    icon: Workflow,
  },
  {
    number: "03",
    label: "Mobile Application",
    icon: Smartphone,
  },
  {
    number: "04",
    label: "Digital System",
    icon: Server,
  },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid min-h-[calc(100svh-5rem)] items-center gap-16 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-7">
            <p className="k-eyebrow mb-7">Technology Partner</p>

            <h1 id="hero-heading" className="max-w-5xl text-[clamp(3.25rem,7vw,7rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[var(--text-primary)]">
              What does your business actually need online?
            </h1>

            <p className="k-body-large mt-8 max-w-2xl">We help you figure it out, then build the right solution.</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="k-button k-button-primary group">
                Let&apos;s Figure It Out
                <ArrowRight size={17} strokeWidth={1.8} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a href="#work" className="k-button k-button-secondary group">
                View Our Work
                <ArrowDownRight size={17} strokeWidth={1.8} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>

            <div className="mt-14 border-l-2 border-[var(--foreground)] pl-5">
              <p className="text-sm font-semibold tracking-[-0.01em] text-[var(--text-primary)]">You know your business. We know technology.</p>

              <p className="k-body-small mt-2 max-w-lg">We listen first, recommend what makes sense, and build what you actually need.</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div aria-label="Digital solutions overview" className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
              <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">What we build</span>

                  <span className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    Built around the problem
                  </span>
                </div>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {solutionItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.number} className="group relative flex min-h-28 items-center gap-4 px-5 py-5 transition-colors duration-300 hover:bg-[var(--surface-muted)] sm:min-h-32 sm:px-6">
                      <span className="w-8 shrink-0 font-mono text-xs text-[var(--text-muted)]">{item.number}</span>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--background)] transition-transform duration-300 group-hover:translate-x-1">
                        <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-base font-semibold tracking-[-0.015em] text-[var(--text-primary)] sm:text-lg">{item.label}</p>

                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {index === 0 && "Establish your digital presence."}
                          {index === 1 && "Let people interact with your business."}
                          {index === 2 && "Take the experience to mobile."}
                          {index === 3 && "Connect technology behind the business."}
                        </p>
                      </div>

                      <ArrowRight size={17} strokeWidth={1.6} aria-hidden="true" className="ml-auto shrink-0 text-[var(--text-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--text-primary)]" />
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[var(--border)] bg-[var(--surface-muted)] px-5 py-5 sm:px-6">
                <p className="text-sm font-medium leading-6 text-[var(--text-secondary)]">The right solution depends on the problem.</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 px-1">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Think first</span>

              <span aria-hidden="true" className="h-px flex-1 bg-[var(--border)]" />

              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Build second</span>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute right-[-10rem] top-[-10rem] h-80 w-80 rounded-full border border-[var(--border)] opacity-40 sm:right-[-8rem] sm:top-[-8rem]" />

      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-12rem] left-[-10rem] h-96 w-96 rounded-full border border-[var(--border)] opacity-30" />
    </section>
  );
}
