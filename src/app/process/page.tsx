"use client";

import { ArrowLeft, ArrowRight, Check, MessageCircle, PenTool, Rocket, Wrench } from "lucide-react";
import { useRef, useState } from "react";

const processSteps = [
  {
    number: "01",
    title: "Understand",
    shortDescription: "Start with the business, not the technology.",
    description: "We start with your business, goals, users, and the problem you are trying to solve.",
    details: ["Understand your business and goals", "Identify users and their needs", "Explore the problem behind the request", "Separate real needs from assumptions"],
    outcome: "A clear understanding of the problem.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Define",
    shortDescription: "Turn understanding into a practical direction.",
    description: "We turn what we learn into a practical direction, deciding what should be built and what does not need to be built.",
    details: ["Define the scope and priorities", "Choose the right solution approach", "Identify important features and requirements", "Create a clear path forward"],
    outcome: "A focused scope and clear direction.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build",
    shortDescription: "Design and develop the solution.",
    description: "We design and develop the solution, keeping you involved at the important decisions without unnecessary complexity.",
    details: ["Design the experience and interface", "Develop the required functionality", "Connect data, systems, and integrations", "Review progress at meaningful points"],
    outcome: "A working digital product.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Launch",
    shortDescription: "Prepare the product for real users.",
    description: "We prepare the product for real users, test the important details, and get everything ready to go live.",
    details: ["Test important user flows", "Review performance and responsiveness", "Prepare deployment and production systems", "Launch with the necessary checks in place"],
    outcome: "A reliable launch.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Maintain",
    shortDescription: "Keep the product useful after launch.",
    description: "Technology does not stop at launch. We can continue improving, maintaining, and supporting what we build.",
    details: ["Monitor and maintain the product", "Fix issues as they appear", "Improve features based on real usage", "Support future changes and growth"],
    outcome: "A product that can keep evolving.",
    icon: Check,
  },
];

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const currentStep = processSteps[activeStep];

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % processSteps.length;
    }

    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + processSteps.length) % processSteps.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = processSteps.length - 1;
    }

    if (nextIndex === index) {
      return;
    }

    event.preventDefault();
    setActiveStep(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <main>
      {/* Hero */}
      <section aria-labelledby="process-page-heading" className="border-b border-[var(--border)] py-20 lg:py-28">
        <div className="k-container">
          <div className="max-w-4xl">
            <p className="k-eyebrow">Our process</p>

            <h1 id="process-page-heading" className="k-heading-1 mt-6 max-w-4xl">
              How we turn a problem into something that works.
            </h1>

            <p className="k-body-large mt-7 max-w-2xl">Good technology starts with understanding. Our process keeps the work clear, practical, and focused from the first conversation to what happens after launch.</p>
          </div>
        </div>
      </section>

      {/* Interactive Process */}
      <section aria-labelledby="process-explorer-heading" className="k-section">
        <div className="k-container">
          <div className="mb-10 lg:mb-12">
            <p className="k-eyebrow">Explore the process</p>

            <h2 id="process-explorer-heading" className="k-heading-2 mt-5 max-w-3xl">
              Five stages. One clear direction.
            </h2>
          </div>

          {/* Mobile Stage Selector */}
          <div className="grid grid-cols-5 border-y border-[var(--border)] sm:hidden" role="tablist" aria-label="Process stages">
            {processSteps.map((step, index) => {
              const isActive = index === activeStep;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.number}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`process-stage-${step.number}`}
                  aria-label={`${step.number} ${step.title}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`group relative flex min-w-0 items-center justify-center py-5 transition-colors duration-200 ${index < processSteps.length - 1 ? "border-r border-[var(--border)]" : ""}`}
                >
                  <StepIcon size={20} strokeWidth={1.6} aria-hidden="true" className={isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"} />

                  <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--accent)] transition-transform duration-200 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>
              );
            })}
          </div>

          {/* Tablet / Desktop Stage Selector */}
          <div className="hidden grid-cols-5 border-y border-[var(--border)] sm:grid" role="tablist" aria-label="Process stages">
            {processSteps.map((step, index) => {
              const isActive = index === activeStep;

              return (
                <button
                  key={step.number}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`process-stage-${step.number}`}
                  aria-label={`${step.number} ${step.title}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`group relative min-w-0 px-2 py-5 text-left transition-colors duration-200 sm:px-4 lg:py-6 ${index < processSteps.length - 1 ? "border-r border-[var(--border)]" : ""}`}
                >
                  <span className={`block font-mono text-xs ${isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"}`}>{step.number}</span>

                  <span className={`mt-2 block truncate text-sm font-semibold sm:text-base ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}>{step.title}</span>

                  <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--accent)] transition-transform duration-200 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>
              );
            })}
          </div>

          {/* Active Stage */}
          <div id={`process-stage-${currentStep.number}`} role="tabpanel" aria-label={`${currentStep.number} ${currentStep.title}`} className="min-h-[clamp(480px,calc(100svh-300px),680px)] border-b border-[var(--border)]">
            <div className="grid min-h-[clamp(430px,calc(100svh-350px),610px)] gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:py-14">
              {/* Stage Header */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-[var(--accent)]">{currentStep.number}</span>

                  <div className="h-px w-10 bg-[var(--border-strong)]" />
                </div>

                <h3 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl">{currentStep.title}</h3>

                <p className="k-body mt-4 max-w-md">{currentStep.shortDescription}</p>
              </div>

              {/* Stage Details */}
              <div className="lg:col-span-8">
                <p className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.025em] text-[var(--text-primary)] sm:text-3xl">{currentStep.description}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-10">
                  <div>
                    <p className="k-eyebrow">What happens</p>

                    <ul className="mt-4 space-y-3">
                      {currentStep.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                          <span className="k-body">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="k-eyebrow">The result</p>

                    <div className="mt-4 border-l-2 border-[var(--foreground)] pl-5">
                      <p className="text-lg font-semibold leading-snug tracking-[-0.02em] text-[var(--text-primary)] sm:text-xl">{currentStep.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-[var(--border)] pt-5 lg:mt-10">
                  <p className="k-body-small">Every project is different. The depth of each stage adapts to the size and complexity of the work.</p>
                </div>
              </div>
            </div>

            {/* Stage Navigation */}
            <div className="flex items-center justify-between border-t border-[var(--border)] py-4">
              <button type="button" onClick={() => setActiveStep((activeStep - 1 + processSteps.length) % processSteps.length)} className="k-link group inline-flex items-center gap-2 text-sm font-semibold disabled:pointer-events-none disabled:opacity-40" disabled={activeStep === 0} aria-label="Previous process stage">
                <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1" />

                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-2" aria-label={`Stage ${activeStep + 1} of ${processSteps.length}`}>
                {processSteps.map((step, index) => (
                  <span key={step.number} className={`h-1.5 rounded-full transition-all duration-200 ${index === activeStep ? "w-7 bg-[var(--accent)]" : "w-1.5 bg-[var(--border-strong)]"}`} />
                ))}
              </div>

              <button type="button" onClick={() => setActiveStep((activeStep + 1) % processSteps.length)} className="k-link group inline-flex items-center gap-2 text-sm font-semibold" aria-label="Next process stage">
                <span className="hidden sm:inline">Next</span>

                <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 lg:mt-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Not sure where your project starts?</p>

                <p className="k-body-small mt-2 max-w-xl">That is exactly what the first conversation is for. Bring the problem. We can work through the rest.</p>
              </div>

              <a href="/contact" className="k-button k-button-primary shrink-0">
                Start a conversation
                <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
