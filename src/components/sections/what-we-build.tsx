"use client";

import { ArrowRight, Globe2, Server, Smartphone, Workflow } from "lucide-react";
import { useState } from "react";

const solutions = [
  {
    number: "01",
    title: "Websites",
    shortDescription: "A clear digital presence built around your business and your audience.",
    description: "From focused landing pages to complete business websites and e-commerce experiences, we build websites that communicate clearly and make it easy for people to take the next step.",
    examples: ["Business websites", "Landing pages", "Portfolio websites", "E-commerce websites", "Marketing websites"],
    capabilities: ["Responsive interface design", "Content-focused experiences", "Performance and SEO foundations", "Analytics and integrations"],
    icon: Globe2,
  },
  {
    number: "02",
    title: "Web Applications",
    shortDescription: "Digital products that let customers, teams, or communities interact with your business.",
    description: "We build web applications around real workflows, whether you need a customer portal, internal dashboard, booking platform, SaaS product, or a completely custom web experience.",
    examples: ["Dashboards", "Customer portals", "SaaS products", "Booking systems", "Custom web platforms"],
    capabilities: ["Frontend and backend development", "Authentication and user roles", "Database-driven workflows", "APIs and third-party integrations"],
    icon: Workflow,
  },
  {
    number: "03",
    title: "Mobile Applications",
    shortDescription: "Mobile experiences designed around how people actually use your product.",
    description: "When your business needs to live beyond the browser, we create mobile applications that are practical, intuitive, and designed for real-world use across modern mobile platforms.",
    examples: ["Customer applications", "Business applications", "Service applications", "Internal mobile tools", "Cross-platform applications"],
    capabilities: ["Mobile-first product design", "Cross-platform development", "API and backend integration", "Application deployment support"],
    icon: Smartphone,
  },
  {
    number: "04",
    title: "Digital Systems",
    shortDescription: "The technology behind the business that connects people, data, and processes.",
    description: "We build the systems that make a business work behind the scenes, connecting applications, data, services, and workflows into a reliable digital environment.",
    examples: ["Backend systems", "Business automation", "APIs", "Internal tools", "System integrations"],
    capabilities: ["Backend architecture", "Database systems", "API development", "Automation and integrations"],
    icon: Server,
  },
];

export function WhatWeBuild() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSolution = solutions[activeIndex];
  const ActiveIcon = activeSolution.icon;

  return (
    <section id="services" aria-labelledby="what-we-build-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="k-eyebrow">What we build</p>

            <h2 id="what-we-build-heading" className="k-heading-2 mt-6 max-w-lg">
              Technology shaped around the work.
            </h2>

            <p className="k-body-large mt-7 max-w-md">The solution should fit the business, not the other way around. Choose an area to see how we approach it.</p>

            <div className="mt-10 hidden lg:block">
              <p className="text-sm font-medium text-[var(--text-secondary)]">Four ways to build.</p>

              <p className="k-body-small mt-2 max-w-xs">The right starting point depends on what you are trying to accomplish.</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid border-t border-[var(--border)] lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.28fr)]">
              <div className="border-b border-[var(--border)] lg:border-b-0 lg:border-r">
                {solutions.map((solution, index) => {
                  const Icon = solution.icon;
                  const isActive = index === activeIndex;

                  return (
                    <button key={solution.number} type="button" aria-pressed={isActive} onClick={() => setActiveIndex(index)} className={`group flex w-full items-center gap-4 border-b border-[var(--border)] px-4 py-5 text-left transition-colors duration-300 last:border-b-0 sm:px-5 ${isActive ? "bg-[var(--surface-muted)]" : "hover:bg-[var(--surface-muted)]"}`}>
                      <span className={`font-mono text-xs transition-colors duration-300 ${isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>{solution.number}</span>

                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border transition-colors duration-300 ${isActive ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--border-strong)] text-[var(--text-secondary)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"}`}>
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className={`block text-base font-semibold tracking-[-0.015em] transition-colors duration-300 ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}>{solution.title}</span>
                      </span>

                      <ArrowRight size={17} strokeWidth={1.6} aria-hidden="true" className={`shrink-0 transition-all duration-300 ${isActive ? "translate-x-1 text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:translate-x-1 group-hover:text-[var(--text-primary)]"}`} />
                    </button>
                  );
                })}
              </div>

              <div className="min-w-0 bg-[var(--surface)]">
                <div className="border-b border-[var(--border)] p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="font-mono text-xs text-[var(--accent)]">{activeSolution.number}</span>

                      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-4xl">{activeSolution.title}</h3>
                    </div>

                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--accent)] sm:flex">
                      <ActiveIcon size={21} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </div>

                  <p className="mt-6 max-w-xl text-lg leading-7 text-[var(--text-secondary)]">{activeSolution.shortDescription}</p>

                  <p className="k-body mt-5 max-w-xl">{activeSolution.description}</p>
                </div>

                <div className="grid gap-8 p-6 sm:grid-cols-2 sm:p-8 lg:p-10">
                  <div>
                    <p className="k-eyebrow">Examples</p>

                    <ul className="mt-5 space-y-3">
                      {activeSolution.examples.map((example) => (
                        <li key={example} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />

                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="k-eyebrow">Capabilities</p>

                    <ul className="mt-5 space-y-3">
                      {activeSolution.capabilities.map((capability) => (
                        <li key={capability} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                          <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-[var(--border-strong)]" />

                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-[var(--border)] px-6 py-5 sm:px-8 lg:px-10">
                  <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--accent)]">
                    Start a conversation
                    <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
