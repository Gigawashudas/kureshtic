"use client";

import Link from "next/link";
import { ArrowRight, Code2, Database, Globe2, Lightbulb, Smartphone, Wrench } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Digital Strategy",
    heading: "Know what you're building before you build it.",
    description: "Many businesses know they need technology but are not always sure what the right solution is. We help turn an unclear idea, business requirement, or existing problem into a practical digital direction.",
    provides: ["Business and requirement discovery", "Digital product planning", "Technical direction", "Feature and scope definition", "Technology recommendations", "Solution architecture", "MVP planning"],
    usefulWhen: ["You have an idea but don't know where to start.", "You're unsure whether you need a website, application, or system.", "Your current digital setup isn't working well.", "You need technical direction before investing in development."],
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Website Development",
    heading: "A digital presence built around your business.",
    description: "We design and develop websites that communicate clearly, represent the business professionally, and give visitors a straightforward path to take the next step.",
    provides: ["Business websites", "Corporate websites", "Marketing websites", "Landing pages", "Portfolio websites", "Personal brand websites", "E-commerce websites", "Content-driven websites"],
    usefulWhen: ["Your business needs a professional online presence.", "Your current website no longer represents the business.", "Customers struggle to understand your services online.", "You need a fast, responsive, and maintainable website."],
    icon: Globe2,
  },
  {
    number: "03",
    title: "Web Application Development",
    heading: "When a website isn't enough.",
    description: "Some businesses need customers, employees, or partners to interact with a digital system. We build web applications around real workflows, data, users, and business requirements.",
    provides: ["Customer portals", "Internal dashboards", "Booking platforms", "SaaS products", "Management systems", "Membership platforms", "Client portals", "Custom business applications", "Data-driven platforms"],
    usefulWhen: ["Users need accounts or personalized experiences.", "Your business depends on structured digital workflows.", "Customers need to book, submit, manage, or track information.", "Your team needs a custom internal system."],
    icon: Code2,
  },
  {
    number: "04",
    title: "Mobile Application Development",
    heading: "Put the product where your users already are.",
    description: "Not every business needs a mobile application. When mobile genuinely improves the customer or business experience, we design and develop an application around that specific use case.",
    provides: ["Customer applications", "Business applications", "Service applications", "Internal mobile tools", "Booking applications", "Cross-platform applications", "API-connected mobile products"],
    usefulWhen: ["Customers regularly interact with your service from mobile devices.", "A mobile experience can simplify an important workflow.", "Your business needs a dedicated mobile product.", "Your existing web product needs a mobile-first experience."],
    icon: Smartphone,
  },
  {
    number: "05",
    title: "Digital Systems & Integrations",
    heading: "Connect the technology behind the business.",
    description: "Businesses rarely operate through a single system. We connect applications, databases, services, APIs, and workflows so information can move reliably between the tools your business already uses.",
    provides: ["Backend systems", "API development", "Database systems", "System integrations", "Business automation", "Internal tools", "Data workflows", "Third-party service integrations"],
    usefulWhen: ["Your team is doing repetitive work manually.", "Your existing software doesn't communicate properly.", "Information has to be copied between multiple systems.", "Your business needs custom internal technology."],
    icon: Database,
  },
  {
    number: "06",
    title: "Ongoing Technology Support",
    heading: "Technology shouldn't stop at launch.",
    description: "A digital product changes after it goes live. Content changes, businesses grow, users reveal new requirements, integrations evolve, and technology moves forward. We can stay involved to keep the system reliable and useful.",
    provides: ["Website maintenance", "Application maintenance", "Bug fixes", "Performance improvements", "Security updates", "CMS support", "Feature improvements", "Integration maintenance", "Technical improvements", "Infrastructure support"],
    usefulWhen: ["Your website or application needs regular maintenance.", "You need someone to handle ongoing technical improvements.", "Your product needs new features after launch.", "Your existing development team needs additional technical support."],
    icon: Wrench,
  },
];

const outcomes = [
  {
    title: "Strategy",
    description: "Clear requirements, technical direction, and practical scope.",
  },
  {
    title: "Design",
    description: "User-focused interfaces and responsive digital experiences.",
  },
  {
    title: "Development",
    description: "Production-ready websites, applications, and digital systems.",
  },
  {
    title: "Content",
    description: "CMS capabilities that allow teams to manage their own content.",
  },
  {
    title: "Data",
    description: "Databases, storage, and reliable data-driven workflows.",
  },
  {
    title: "Integrations",
    description: "APIs and connections between the services your business depends on.",
  },
  {
    title: "Launch",
    description: "Deployment and production setup for the finished product.",
  },
  {
    title: "Support",
    description: "Ongoing maintenance, improvements, and technical assistance.",
  },
];

const serviceScenarios = [
  {
    question: "I need a professional online presence.",
    answer: "Website Development",
  },
  {
    question: "I need customers to log in and use a system.",
    answer: "Web Application Development",
  },
  {
    question: "I want customers to use our product from their phones.",
    answer: "Mobile Application Development",
  },
  {
    question: "Our team is doing too much work manually.",
    answer: "Digital Systems & Integrations",
  },
  {
    question: "Our existing software doesn't communicate properly.",
    answer: "Digital Systems & Integrations",
  },
  {
    question: "I have an idea but don't know what I actually need.",
    answer: "Digital Strategy",
  },
  {
    question: "We already have a product but need someone to maintain and improve it.",
    answer: "Ongoing Technology Support",
  },
];

const technologyAreas = ["Frontend", "Backend", "Databases", "APIs", "CMS", "Cloud & Deployment", "Automation", "Intelligent Solutions"];

export default function ServicesPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="border-b border-[var(--border)]">
          <div className="k-container py-20 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <p className="k-eyebrow">Services</p>

                <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.045em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">Technology that makes the work work.</h1>

                <p className="k-body-large mt-6 max-w-2xl">From figuring out what should be built to developing, launching, and supporting it, KURESHTIC helps businesses turn real needs into reliable digital solutions.</p>
              </div>

              <div className="flex items-end lg:col-span-4 lg:justify-end">
                <div className="max-w-sm border-l border-[var(--border-strong)] pl-5">
                  <p className="text-sm font-medium text-[var(--text-primary)]">You know your business.</p>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">We know technology.</p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="k-button k-button-primary">
                Start a Project
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <Link href="/work" className="k-button k-button-secondary">
                View Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="k-section border-b border-[var(--border)]">
          <div className="k-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className="k-eyebrow">Before the build</p>

                <h2 className="k-heading-2 mt-5 max-w-lg">The service starts before the code.</h2>
              </div>

              <div className="lg:col-span-8">
                <p className="k-body-large max-w-3xl">A website, application, or digital system is only useful when it solves the right problem.</p>

                <p className="k-body mt-5 max-w-3xl">We begin by understanding what the business is trying to accomplish, who the solution is for, what already exists, and where technology can actually help. From there, we recommend the right service and the right level of technology for the situation.</p>

                <div className="mt-8 border-t border-[var(--border)] pt-5">
                  <p className="text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Think first. Build second.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="k-section">
          <div className="k-container">
            <div className="mb-12 max-w-3xl lg:mb-14">
              <p className="k-eyebrow">What we provide</p>

              <h2 className="k-heading-2 mt-5">Services built around real business needs.</h2>

              <p className="k-body-large mt-6">Different businesses need different levels of technology. These are the areas where KURESHTIC can help—from the first idea through long-term technical support.</p>
            </div>

            <div>
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article key={service.number} className="border-t border-[var(--border)] py-12 lg:py-16">
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                      <div className="lg:col-span-3">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-[var(--accent)]">{service.number}</span>

                          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] text-[var(--accent)]">
                            <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                          </div>
                        </div>

                        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-3xl">{service.title}</h3>
                      </div>

                      <div className="lg:col-span-9">
                        <h4 className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-4xl">{service.heading}</h4>

                        <p className="k-body-large mt-5 max-w-3xl">{service.description}</p>

                        <div className="mt-10 grid gap-8 sm:grid-cols-2">
                          <div>
                            <p className="k-eyebrow">We provide</p>

                            <ul className="mt-4 space-y-3">
                              {service.provides.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="k-eyebrow">Useful when</p>

                            <ul className="mt-4 space-y-3">
                              {service.usefulWhen.map((item) => (
                                <li key={item} className="border-l border-[var(--border-strong)] pl-4 text-sm leading-6 text-[var(--text-secondary)]">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="k-section border-t border-[var(--border)]">
          <div className="k-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className="k-eyebrow">What you get</p>

                <h2 className="k-heading-2 mt-5 max-w-lg">Technology you can actually use.</h2>

                <p className="k-body mt-5 max-w-md">Depending on the project, KURESHTIC can provide the strategy, design, development, infrastructure, integrations, launch, and support needed to make the solution useful.</p>
              </div>

              <div className="lg:col-span-8">
                <div className="grid border-t border-[var(--border)] sm:grid-cols-2">
                  {outcomes.map((outcome, index) => (
                    <div key={outcome.title} className={`border-b border-[var(--border)] p-5 lg:p-7 ${index % 2 === 0 ? "sm:border-r" : ""}`}>
                      <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{outcome.title}</p>

                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{outcome.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Find The Right Service */}
        <section className="k-section border-t border-[var(--border)]">
          <div className="k-container">
            <div className="mb-12 max-w-3xl">
              <p className="k-eyebrow">Find the right service</p>

              <h2 className="k-heading-2 mt-5">Not sure where to start?</h2>

              <p className="k-body-large mt-6">You don't need to know the technical name for what you need. Start with the problem. We'll help identify the appropriate direction.</p>
            </div>

            <div className="border-t border-[var(--border)]">
              {serviceScenarios.map((scenario) => (
                <div key={scenario.question} className="grid gap-3 border-b border-[var(--border)] py-5 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
                  <p className="text-base text-[var(--text-primary)]">{scenario.question}</p>

                  <div className="flex items-center gap-3 text-sm font-medium text-[var(--accent)]">
                    <span>{scenario.answer}</span>

                    <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="k-section border-t border-[var(--border)]">
          <div className="k-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="k-eyebrow">Technology</p>

                <h2 className="k-heading-2 mt-5 max-w-xl">The right technology depends on the problem.</h2>
              </div>

              <div className="lg:col-span-7">
                <p className="k-body-large max-w-2xl">We don't believe businesses should choose technology based on what's fashionable. The architecture, frameworks, services, and infrastructure should fit the requirements, complexity, budget, maintainability, and future needs of the product.</p>

                <div className="mt-8 grid grid-cols-2 border-t border-[var(--border)] sm:grid-cols-4">
                  {technologyAreas.map((area) => (
                    <div key={area} className="border-b border-[var(--border)] px-4 py-4 text-sm text-[var(--text-secondary)] first:pl-0 sm:px-5">
                      {area}
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-l-2 border-[var(--accent)] pl-5">
                  <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">We do not sell a technology stack. We solve the business problem.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="k-section border-t border-[var(--border)]">
          <div className="k-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="k-eyebrow">Pricing approach</p>

                <h2 className="k-heading-2 mt-5 max-w-xl">Every project is different.</h2>
              </div>

              <div className="lg:col-span-7">
                <p className="k-body-large max-w-2xl">A landing page and a customer platform may both fall under “web development,” but they require very different levels of planning, design, development, infrastructure, and support.</p>

                <p className="k-body mt-5 max-w-2xl">We understand the requirement first, define the appropriate scope, and then provide a clear proposal based on what actually needs to be built.</p>

                <Link href="/contact" className="k-button k-button-secondary mt-7">
                  Discuss Your Project
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-[var(--border)]">
          <div className="k-container py-24 lg:py-32">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-8">
                <p className="k-eyebrow">Start a Project</p>

                <h2 className="k-heading-2 mt-5 max-w-3xl">Not sure what you need yet?</h2>

                <p className="k-body-large mt-6 max-w-2xl">That's okay. Tell us what you're trying to accomplish. We'll help you figure out where technology can actually help.</p>
              </div>

              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Link href="/contact" className="k-button k-button-primary">
                  Let's Figure It Out
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
