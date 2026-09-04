"use client";

import { ArrowRight, Check, Code2, Database, Layers3, Lightbulb, Smartphone, Wrench } from "lucide-react";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Digital Strategy",
    shortDescription: "Figure out what should be built.",
    description: "Before technology, there is a business problem. We help you understand what you actually need, define the right direction, and avoid building things that do not create value.",
    icon: Lightbulb,
    whatWeDo: ["Business and product discovery", "Problem and requirement definition", "Feature and scope planning", "Technical direction"],
    bestFor: ["New digital product ideas", "Businesses unsure what to build", "Existing products that need a clearer direction"],
    outcomes: ["Clear problem definition", "Focused scope", "Practical technology direction"],
  },
  {
    number: "02",
    title: "Website Development",
    shortDescription: "A digital presence built around your business.",
    description: "We build websites that communicate clearly, work across devices, and give your business a reliable digital foundation.",
    icon: Code2,
    whatWeDo: ["Business and corporate websites", "Marketing and landing pages", "Portfolio and professional websites", "Content-managed websites"],
    bestFor: ["Businesses establishing an online presence", "Companies replacing outdated websites", "Professionals and organizations that need a stronger digital presence"],
    outcomes: ["Clear user experience", "Responsive implementation", "Fast and maintainable website"],
  },
  {
    number: "03",
    title: "Web Application Development",
    shortDescription: "When a website is not enough.",
    description: "When your business needs users to log in, manage information, perform actions, or interact with complex workflows, we build the application behind the experience.",
    icon: Layers3,
    whatWeDo: ["Custom web applications", "Dashboards and portals", "User accounts and workflows", "Business-specific application features"],
    bestFor: ["Internal business tools", "Customer portals", "Online platforms and products", "Businesses replacing manual workflows"],
    outcomes: ["Working application", "Structured user workflows", "Reliable data-driven experience"],
  },
  {
    number: "04",
    title: "Mobile Application Development",
    shortDescription: "Put the product where your users already are.",
    description: "We build mobile experiences for businesses that need their product or service to be available directly on users' phones.",
    icon: Smartphone,
    whatWeDo: ["Cross-platform mobile applications", "Customer-facing mobile products", "Business utility applications", "API-connected mobile experiences"],
    bestFor: ["Products that depend on mobile users", "Customer applications", "Mobile-first business ideas", "Existing systems that need a mobile interface"],
    outcomes: ["Practical mobile experience", "Connected application architecture", "Ready-to-use product interface"],
  },
  {
    number: "05",
    title: "Digital Systems & Integrations",
    shortDescription: "Connect the technology behind the business.",
    description: "Your business may already use several tools. We help connect those systems so information can move reliably between them and unnecessary manual work can be reduced.",
    icon: Database,
    whatWeDo: ["API development and integration", "Database-connected systems", "Third-party service integrations", "Business workflow automation"],
    bestFor: ["Businesses using multiple disconnected systems", "Manual data-entry workflows", "Businesses that need systems to communicate", "Products requiring external services or APIs"],
    outcomes: ["Connected systems", "Reduced manual work", "More reliable data flow"],
  },
  {
    number: "06",
    title: "Ongoing Technology Support",
    shortDescription: "Technology should not stop at launch.",
    description: "Digital products need attention after they go live. We can help maintain, improve, monitor, and evolve the technology as your business changes.",
    icon: Wrench,
    whatWeDo: ["Website and application maintenance", "Bug fixes and improvements", "Performance and reliability work", "Ongoing feature development"],
    bestFor: ["Businesses without an internal technology team", "Existing websites and applications", "Products that need continuous improvement", "Businesses looking for a long-term technology partner"],
    outcomes: ["Better reliability", "Continuous improvement", "Long-term technical support"],
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  const service = services[activeService];
  const ServiceIcon = service.icon;

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-[var(--border)] py-20 lg:py-28">
        <div className="k-container">
          <div className="max-w-4xl">
            <p className="k-eyebrow">Services</p>

            <h1 className="k-heading-1 mt-6 max-w-4xl">Technology that makes the work work.</h1>

            <p className="k-body-large mt-7 max-w-2xl">From figuring out what to build to supporting what is already running, we help businesses choose and build technology that makes sense.</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="k-section">
        <div className="k-container">
          <div className="max-w-3xl">
            <p className="k-eyebrow">Before the code</p>

            <h2 className="k-heading-2 mt-5">The service starts before the code.</h2>

            <p className="k-body-large mt-5">Good technology begins with understanding the business, the people using it, and the problem that actually needs solving.</p>

            <p className="mt-8 text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Think first. Build second.</p>
          </div>
        </div>
      </section>

      {/* Interactive Service Explorer */}
      <section aria-labelledby="service-explorer-heading" className="k-section border-y border-[var(--border)]">
        <div className="k-container">
          <div className="mb-10 lg:mb-12">
            <p className="k-eyebrow">Explore our services</p>

            <h2 id="service-explorer-heading" className="k-heading-2 mt-5 max-w-3xl">
              What do you actually need?
            </h2>

            <p className="k-body mt-5 max-w-2xl">Choose a service to see where it fits, what we can help with, and what you can expect from the work.</p>
          </div>

          <div className="overflow-hidden border border-[var(--border)]">
            <div className="grid lg:grid-cols-12">
              {/* Service Selector */}
              <div className="lg:col-span-4 lg:border-r lg:border-[var(--border)]">
                {/* Mobile / Tablet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden" role="tablist" aria-label="Services">
                  {services.map((item, index) => {
                    const isActive = index === activeService;
                    const ItemIcon = item.icon;

                    const isRightColumn = index % 2 === 1;
                    const isLastRow = index >= 4;

                    return (
                      <button key={item.number} type="button" role="tab" aria-selected={isActive} aria-controls={`service-panel-${item.number}`} onClick={() => setActiveService(index)} className={`group relative flex min-h-[104px] items-center gap-4 px-5 py-5 text-left transition-colors duration-200 sm:px-6 ${!isLastRow ? "border-b border-[var(--border)]" : ""} ${isRightColumn ? "sm:border-l sm:border-[var(--border)]" : ""}`}>
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-200 ${isActive ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]" : "border-[var(--border)] text-[var(--text-muted)] group-hover:border-[var(--border-strong)] group-hover:text-[var(--text-primary)]"}`}>
                          <ItemIcon size={19} strokeWidth={1.6} aria-hidden="true" />
                        </div>

                        <div className="min-w-0">
                          <span className={`block font-mono text-xs ${isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>{item.number}</span>

                          <span className={`mt-1 block text-sm font-semibold leading-tight ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}>{item.title}</span>
                        </div>

                        <span className={`absolute bottom-0 left-0 h-0.5 bg-[var(--accent)] transition-all duration-200 ${isActive ? "right-0" : "right-full group-hover:right-0"}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Desktop */}
                <div className="hidden lg:block" role="tablist" aria-label="Services">
                  {services.map((item, index) => {
                    const isActive = index === activeService;
                    const isLast = index === services.length - 1;

                    return (
                      <button key={item.number} type="button" role="tab" aria-selected={isActive} aria-controls={`service-panel-${item.number}`} onClick={() => setActiveService(index)} className={`group relative flex w-full min-h-[92px] items-center gap-5 px-6 py-5 text-left transition-colors duration-200 xl:px-7 ${!isLast ? "border-b border-[var(--border)]" : ""}`}>
                        <span className={`w-7 shrink-0 font-mono text-xs ${isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>{item.number}</span>

                        <span className={`min-w-0 text-sm font-semibold xl:text-base ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}>{item.title}</span>

                        <span className={`absolute bottom-0 left-0 h-0.5 bg-[var(--accent)] transition-all duration-200 ${isActive ? "right-0" : "right-full group-hover:right-0"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Content */}
              <div id={`service-panel-${service.number}`} role="tabpanel" className="lg:col-span-8">
                <div className="flex min-h-[620px] flex-col lg:min-h-[700px]">
                  {/* Service Header */}
                  <div className="border-b border-[var(--border)] px-6 pb-8 pt-6 sm:px-8 sm:pt-8 lg:px-12 lg:pt-12">
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">{service.title}</h3>

                        <p className="mt-4 max-w-2xl text-lg font-medium leading-snug text-[var(--text-secondary)] sm:text-xl">{service.shortDescription}</p>
                      </div>

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[var(--border)] text-[var(--accent)] sm:h-16 sm:w-16">
                        <ServiceIcon size={26} strokeWidth={1.4} aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-8 sm:px-8 sm:pb-8 lg:px-12 lg:pb-12">
                    {/* Description */}
                    <p className="k-body-large max-w-3xl">{service.description}</p>

                    {/* Details */}
                    <div className="mt-10 grid gap-10 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
                      <div>
                        <p className="k-eyebrow">What we do</p>

                        <ul className="mt-5 space-y-3">
                          {service.whatWeDo.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <Check size={16} strokeWidth={1.7} className="mt-1 shrink-0 text-[var(--accent)]" aria-hidden="true" />

                              <span className="k-body">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="k-eyebrow">Best for</p>

                        <ul className="mt-5 space-y-3">
                          {service.bestFor.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                              <span className="k-body">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="mt-10 border-l-2 border-[var(--foreground)] pl-5">
                      <p className="k-eyebrow">What you get</p>

                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                        {service.outcomes.map((outcome) => (
                          <span key={outcome} className="text-sm font-semibold text-[var(--text-primary)]">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-10">
                      <a href="/contact" className="k-button k-button-primary">
                        Start a Project
                        <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Actually Get */}
      <section className="k-section">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Intro */}
            <div className="lg:col-span-5">
              <p className="k-eyebrow">What you actually get</p>

              <h2 className="k-heading-2 mt-5 max-w-xl">More than development.</h2>

              <p className="k-body-large mt-5 max-w-xl">Depending on the project, our work can bring together the thinking, design, development, systems, and support needed to make the solution useful in the real world.</p>
            </div>

            {/* Capability List */}
            <div className="lg:col-span-7">
              <div className="border-t border-[var(--border)]">
                {[
                  {
                    number: "01",
                    title: "Strategy",
                    description: "Understand the problem and define the direction.",
                  },
                  {
                    number: "02",
                    title: "Design",
                    description: "Create an experience that makes sense to people.",
                  },
                  {
                    number: "03",
                    title: "Development",
                    description: "Turn the solution into reliable working technology.",
                  },
                  {
                    number: "04",
                    title: "Content",
                    description: "Structure the information your users actually need.",
                  },
                  {
                    number: "05",
                    title: "Data",
                    description: "Build the foundation behind the digital experience.",
                  },
                  {
                    number: "06",
                    title: "Integrations",
                    description: "Connect the systems and services your business uses.",
                  },
                  {
                    number: "07",
                    title: "Launch",
                    description: "Move the finished product into the real world.",
                  },
                  {
                    number: "08",
                    title: "Support",
                    description: "Keep improving and maintaining what we build.",
                  },
                ].map((item) => (
                  <div key={item.number} className="group grid gap-4 border-b border-[var(--border)] py-5 sm:grid-cols-[64px_180px_1fr] sm:items-center sm:gap-6">
                    <span className="font-mono text-xs text-[var(--accent)]">{item.number}</span>

                    <h3 className="text-lg font-semibold tracking-[-0.025em] text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">{item.title}</h3>

                    <p className="k-body-small max-w-md">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing statement */}
          <div className="mt-12 border-l-2 border-[var(--foreground)] pl-5 lg:mt-16">
            <p className="max-w-3xl text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-xl">One partner across the work — from the first question to what comes after launch.</p>
          </div>
        </div>
      </section>

      {/* Find the Right Service */}
      <section className="k-section border-y border-[var(--border)]">
        <div className="k-container">
          <div className="mb-12 max-w-3xl">
            <p className="k-eyebrow">Not sure what you need?</p>

            <h2 className="k-heading-2 mt-5">Start with the problem.</h2>

            <p className="k-body-large mt-5">You do not need to know which technology or service is right before talking to us.</p>
          </div>

          <div className="border-t border-[var(--border)]">
            {[
              {
                problem: "I need a website for my business.",
                service: "Website Development",
              },
              {
                problem: "I have an idea but do not know what to build.",
                service: "Digital Strategy",
              },
              {
                problem: "My business relies on manual processes.",
                service: "Digital Systems & Integrations",
              },
              {
                problem: "I need customers to use a digital product.",
                service: "Web or Mobile Application Development",
              },
              {
                problem: "I already have technology but need ongoing help.",
                service: "Ongoing Technology Support",
              },
            ].map((item) => (
              <div key={item.problem} className="grid gap-4 border-b border-[var(--border)] py-5 sm:grid-cols-2 sm:items-center">
                <p className="text-base font-medium text-[var(--text-primary)]">{item.problem}</p>

                <p className="k-body-small sm:text-right">{item.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="k-section border-y border-[var(--border)]">
        <div className="k-container">
          {/* Header */}
          <div className="max-w-4xl">
            <p className="k-eyebrow">Technology</p>

            <h2 className="k-heading-2 mt-5 max-w-3xl">The right technology depends on the problem.</h2>

            <p className="k-body-large mt-6 max-w-2xl">We do not start with a technology stack and look for a reason to use it. We start with the business problem and choose the technology that makes sense.</p>
          </div>

          {/* Technology Architecture */}
          <div className="mt-16 border-t border-[var(--border)] lg:mt-20">
            <div className="grid lg:grid-cols-12">
              {/* Philosophy */}
              <div className="border-b border-[var(--border)] py-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-10 lg:pr-10">
                <p className="k-eyebrow">Our approach</p>

                <p className="mt-5 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">Technology should serve the business, not the other way around.</p>

                <p className="k-body mt-6 max-w-sm">We choose tools, platforms, and architecture based on what the product actually needs.</p>
              </div>

              {/* Capability Matrix */}
              <div className="lg:col-span-8">
                <div className="grid sm:grid-cols-2">
                  {[
                    {
                      number: "01",
                      title: "Digital Experiences",
                      description: "Websites and interfaces designed around people and their goals.",
                    },
                    {
                      number: "02",
                      title: "Applications",
                      description: "Web and mobile products built around real workflows.",
                    },
                    {
                      number: "03",
                      title: "Data & Systems",
                      description: "Reliable foundations for information, operations, and products.",
                    },
                    {
                      number: "04",
                      title: "Integrations",
                      description: "APIs and connected services that allow systems to work together.",
                    },
                    {
                      number: "05",
                      title: "Automation",
                      description: "Practical automation that removes repetitive work.",
                    },
                    {
                      number: "06",
                      title: "Intelligent Solutions",
                      description: "AI and intelligent technology where it creates meaningful value.",
                    },
                  ].map((item, index) => {
                    const isRightColumn = index % 2 === 1;
                    const isBottomRow = index >= 4;

                    return (
                      <div key={item.number} className={`group relative p-7 transition-colors duration-200 hover:bg-[var(--surface-muted)] sm:p-8 ${!isBottomRow ? "border-b border-[var(--border)]" : ""} ${isRightColumn ? "sm:border-l sm:border-[var(--border)]" : ""}`}>
                        <div className="flex items-start justify-between gap-6">
                          <span className="font-mono text-xs text-[var(--accent)]">{item.number}</span>

                          <span className="text-xs text-[var(--text-muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">→</span>
                        </div>

                        <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{item.title}</h3>

                        <p className="k-body-small mt-3 max-w-sm">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="mt-12 flex flex-col gap-5 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <p className="max-w-3xl text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
              We do not sell a technology stack.
              <span className="text-[var(--accent)]"> We solve the business problem.</span>
            </p>

            <span className="shrink-0 font-mono text-xs text-[var(--text-muted)]">KURESHTIC / TECHNOLOGY</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="k-section border-y border-[var(--border)]">
        <div className="k-container">
          <div className="max-w-3xl">
            <p className="k-eyebrow">Pricing approach</p>

            <h2 className="k-heading-2 mt-5">Scope first. Clear proposal second.</h2>

            <p className="k-body-large mt-5">Every project is different. Instead of forcing your requirements into a fixed package, we understand the scope first and then provide a clear proposal around the actual work.</p>

            <a href="/contact" className="k-button k-button-primary mt-7">
              Discuss Your Project
              <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32">
        <div className="k-container">
          <div className="max-w-4xl">
            <p className="k-eyebrow">Start here</p>

            <h2 className="k-heading-1 mt-6">Not sure what you need yet?</h2>

            <p className="k-body-large mt-7 max-w-2xl">You do not need to have everything figured out before reaching out. Bring us the problem and we can figure out the right direction together.</p>

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
