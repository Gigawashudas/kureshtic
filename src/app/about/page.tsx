import { ArrowRight, Check, Compass, Handshake, Lightbulb, ShieldCheck } from "lucide-react";

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

const thinkingProcess = [
  {
    number: "01",
    title: "Understand",
    description: "We learn about the business, the people, and the problem before recommending a solution.",
  },
  {
    number: "02",
    title: "Question",
    description: "We challenge assumptions when necessary and make sure we are solving the right problem.",
  },
  {
    number: "03",
    title: "Decide",
    description: "We define the right direction, scope, and technology based on what the business actually needs.",
  },
  {
    number: "04",
    title: "Build",
    description: "We turn the agreed direction into reliable technology that can work in the real world.",
  },
];

const audiences = ["Businesses building their first digital product", "Companies improving an existing digital presence", "Teams replacing manual business processes", "Professionals who need a reliable digital platform", "People with an idea who are unsure where to start"];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-[var(--border)] py-20 lg:py-28">
        <div className="k-container">
          <div className="max-w-5xl">
            <p className="k-eyebrow">About KURESHTIC</p>

            <h1 className="k-heading-1 mt-6 max-w-5xl">Technology should make business clearer, not more complicated.</h1>

            <p className="k-body-large mt-8 max-w-3xl">KURESHTIC is a technology partner helping businesses understand, choose, build, and maintain the digital solutions they actually need.</p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="k-section">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="k-eyebrow">Who we are</p>

              <h2 className="k-heading-2 mt-5 max-w-xl">We are a technology partner.</h2>
            </div>

            <div className="lg:col-span-7">
              <p className="k-body-large max-w-3xl">Businesses understand their customers, operations, goals, and challenges. Technology can help turn those things into better experiences and better systems.</p>

              <p className="k-body mt-6 max-w-2xl">Our role is to connect those two worlds. We help translate business problems into practical digital solutions, then design and build the technology needed to make them work.</p>

              <div className="mt-10 border-l-2 border-[var(--foreground)] pl-5">
                <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
                  You know your business.
                  <br />
                  We know technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="k-section border-y border-[var(--border)]">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="k-eyebrow">The problem we believe in</p>

              <h2 className="k-heading-2 mt-5 max-w-3xl">Knowing you need technology is not the same as knowing what technology you need.</h2>
            </div>

            <div className="lg:col-span-5">
              <p className="k-body-large max-w-xl">A business may know that it needs a website, an application, automation, or a better system. But the first idea is not always the right solution.</p>

              <p className="k-body mt-6 max-w-xl">That is why we believe the conversation should begin before the code. Understanding the problem first often leads to a simpler, more useful solution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Think First */}
      <section className="k-section">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="k-eyebrow">Our philosophy</p>

              <h2 className="k-heading-2 mt-5 max-w-xl">
                Think first.
                <br />
                Build second.
              </h2>

              <p className="k-body-large mt-6 max-w-lg">Good technology starts with good questions. We take the time to understand what is actually worth building before deciding how to build it.</p>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-[var(--border)]">
                {thinkingProcess.map((item) => (
                  <div key={item.number} className="grid gap-5 border-b border-[var(--border)] py-7 sm:grid-cols-[64px_180px_1fr] sm:items-start sm:gap-6 lg:py-8">
                    <span className="font-mono text-xs text-[var(--accent)]">{item.number}</span>

                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{item.title}</h3>

                    <p className="k-body-small max-w-md">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="k-section border-y border-[var(--border)]">
        <div className="k-container">
          <div className="max-w-3xl">
            <p className="k-eyebrow">What we believe</p>

            <h2 className="k-heading-2 mt-5">The way we work matters.</h2>

            <p className="k-body-large mt-6">Technology is only part of the relationship. How we communicate, make decisions, and handle complexity matters just as much.</p>
          </div>

          <div className="mt-14 border-t border-[var(--border)] lg:mt-16">
            <div className="grid sm:grid-cols-2">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                const isRightColumn = index % 2 === 1;
                const isBottomRow = index >= 2;

                return (
                  <article key={principle.number} className={`group p-7 transition-colors duration-300 hover:bg-[var(--surface-muted)] sm:p-8 lg:p-10 ${!isBottomRow ? "border-b border-[var(--border)]" : ""} ${isRightColumn ? "sm:border-l sm:border-[var(--border)]" : ""}`}>
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs text-[var(--accent)]">{principle.number}</span>

                      <Icon size={20} strokeWidth={1.4} className="text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]" aria-hidden="true" />
                    </div>

                    <div className="mt-14 max-w-lg">
                      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">{principle.title}</h3>

                      <p className="k-body mt-4 max-w-md">{principle.description}</p>
                    </div>

                    <div className="mt-10 flex items-center gap-3">
                      <span aria-hidden="true" className="h-px w-8 bg-[var(--border-strong)] transition-all duration-300 group-hover:w-12 group-hover:bg-[var(--accent)]" />

                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Principle</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="k-section">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <p className="k-eyebrow">The relationship</p>

              <h2 className="k-heading-2 mt-5 max-w-2xl">You should feel like a partner, not a project number.</h2>
            </div>

            <div className="lg:col-span-6">
              <p className="k-body-large max-w-2xl">We believe the strongest digital work happens when both sides bring their expertise to the table.</p>

              <div className="mt-10 border-t border-[var(--border)]">
                <div className="grid grid-cols-2">
                  <div className="border-b border-[var(--border)] py-6 pr-6">
                    <p className="k-eyebrow">You bring</p>

                    <p className="mt-3 text-lg font-semibold tracking-[-0.025em] text-[var(--text-primary)]">Business knowledge</p>

                    <p className="k-body-small mt-2">Your customers, operations, goals, and context.</p>
                  </div>

                  <div className="border-b border-l border-[var(--border)] py-6 pl-6">
                    <p className="k-eyebrow">We bring</p>

                    <p className="mt-3 text-lg font-semibold tracking-[-0.025em] text-[var(--text-primary)]">Technical knowledge</p>

                    <p className="k-body-small mt-2">Strategy, design, development, and technology.</p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">Together, we figure out what makes sense.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Approach */}
      <section className="k-section border-y border-[var(--border)]">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <p className="k-eyebrow">Our approach to technology</p>

              <h2 className="k-heading-2 mt-5 max-w-2xl">We choose technology for a reason.</h2>
            </div>

            <div className="lg:col-span-6">
              <p className="k-body-large max-w-2xl">We do not believe in adding technology simply because it is new, popular, or impressive.</p>

              <div className="mt-8 border-t border-[var(--border)]">
                {["Solve the actual problem", "Keep the solution understandable", "Avoid unnecessary complexity", "Choose technology that fits the project", "Build for what the business needs next"].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 border-b border-[var(--border)] py-5">
                    <Check size={17} strokeWidth={1.7} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />

                    <span className="text-base font-semibold text-[var(--text-primary)]">{item}</span>

                    <span className="ml-auto font-mono text-[10px] text-[var(--text-muted)]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-l-2 border-[var(--foreground)] pl-5">
                <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                  We do not sell a technology stack.
                  <span className="text-[var(--accent)]"> We solve the business problem.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="k-section">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="k-eyebrow">Who we work with</p>

              <h2 className="k-heading-2 mt-5 max-w-xl">You do not need to have everything figured out.</h2>

              <p className="k-body-large mt-6 max-w-lg">Whether you have a clear project or only a problem that needs solving, the conversation can start there.</p>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-[var(--border)]">
                {audiences.map((item, index) => (
                  <div key={item} className="grid gap-4 border-b border-[var(--border)] py-6 sm:grid-cols-[56px_1fr] sm:items-center">
                    <span className="font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>

                    <p className="text-lg font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[var(--border)] py-24 lg:py-32">
        <div className="k-container">
          <div className="max-w-4xl">
            <p className="k-eyebrow">Start here</p>

            <h2 className="k-heading-1 mt-6 max-w-4xl">Have a problem worth solving?</h2>

            <p className="k-body-large mt-7 max-w-2xl">You do not need to know exactly what to build. Bring us the problem and we can figure out the right direction together.</p>

            <a href="/contact" className="k-button k-button-primary mt-8">
              Let&apos;s Figure It Out
              <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
