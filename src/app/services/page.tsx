import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe2, Server, Smartphone, Workflow } from "lucide-react";

import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Services",
  description: "KURESHTIC helps businesses choose, build, and maintain the right digital solutions.",
};

const services = [
  {
    number: "01",
    title: "Websites",
    shortDescription: "A digital presence that communicates clearly and gives people a reason to take the next step.",
    description: "From focused landing pages to complete business websites and e-commerce experiences, we build websites around your business, your audience, and the job the website needs to do.",
    examples: ["Business websites", "Landing pages", "Portfolio websites", "E-commerce websites", "Marketing websites"],
    capabilities: ["Responsive interface design", "Content-focused experiences", "Performance and SEO foundations", "Analytics and integrations"],
    icon: Globe2,
    visual: "browser",
  },
  {
    number: "02",
    title: "Web Applications",
    shortDescription: "Digital products that let customers, teams, or communities interact with your business.",
    description: "We build web applications around real workflows, whether you need a customer portal, internal dashboard, booking platform, SaaS product, or a completely custom web experience.",
    examples: ["Dashboards", "Customer portals", "SaaS products", "Booking systems", "Custom web platforms"],
    capabilities: ["Frontend and backend development", "Authentication and user roles", "Database-driven workflows", "APIs and third-party integrations"],
    icon: Workflow,
    visual: "dashboard",
  },
  {
    number: "03",
    title: "Mobile Applications",
    shortDescription: "Mobile experiences designed around how people actually use your product.",
    description: "When your business needs to live beyond the browser, we create mobile applications that are practical, intuitive, and designed for real-world use across modern mobile platforms.",
    examples: ["Customer applications", "Business applications", "Service applications", "Internal mobile tools", "Cross-platform applications"],
    capabilities: ["Mobile-first product design", "Cross-platform development", "API and backend integration", "Application deployment support"],
    icon: Smartphone,
    visual: "mobile",
  },
  {
    number: "04",
    title: "Digital Systems",
    shortDescription: "The technology behind the business that connects people, data, and processes.",
    description: "We build the systems that make a business work behind the scenes, connecting applications, data, services, and workflows into a reliable digital environment.",
    examples: ["Backend systems", "Business automation", "APIs", "Internal tools", "System integrations"],
    capabilities: ["Backend architecture", "Database systems", "API development", "Automation and integrations"],
    icon: Server,
    visual: "system",
  },
];

function ServiceVisual({ type }: { type: string }) {
  if (type === "browser") {
    return (
      <div className="relative mx-auto w-full max-w-xl">
        <div className="overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex h-10 items-center gap-2 border-b border-[var(--border)] px-4">
            <span className="h-2 w-2 rounded-full bg-[var(--foreground-muted)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--foreground-muted)] opacity-60" />
            <span className="h-2 w-2 rounded-full bg-[var(--foreground-muted)] opacity-40" />
            <div className="ml-4 h-5 flex-1 border border-[var(--border)]" />
          </div>

          <div className="grid min-h-[280px] grid-cols-12 gap-4 p-6">
            <div className="col-span-3 border-r border-[var(--border)]" />

            <div className="col-span-9 space-y-5">
              <div className="h-3 w-24 bg-[var(--foreground)]" />
              <div className="h-12 w-4/5 bg-[var(--surface-muted)]" />
              <div className="h-3 w-3/5 bg-[var(--foreground-muted)] opacity-40" />

              <div className="grid grid-cols-2 gap-3 pt-6">
                <div className="h-20 border border-[var(--border)]" />
                <div className="h-20 border border-[var(--border)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="mx-auto w-full max-w-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-4">
          <div className="h-3 w-28 bg-[var(--foreground)]" />
          <div className="h-7 w-7 border border-[var(--border)]" />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 space-y-3 border-r border-[var(--border)] pr-4">
            <div className="h-2 w-full bg-[var(--foreground-muted)] opacity-30" />
            <div className="h-2 w-4/5 bg-[var(--foreground-muted)] opacity-30" />
            <div className="h-2 w-full bg-[var(--foreground-muted)] opacity-30" />
            <div className="h-2 w-3/5 bg-[var(--foreground-muted)] opacity-30" />
          </div>

          <div className="col-span-9 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 border border-[var(--border)]" />
              <div className="h-20 border border-[var(--border)]" />
              <div className="h-20 border border-[var(--border)]" />
            </div>

            <div className="h-36 border border-[var(--border)]">
              <div className="flex h-full items-end gap-2 p-5">
                <div className="h-1/3 w-1/6 bg-[var(--foreground-muted)] opacity-30" />
                <div className="h-2/5 w-1/6 bg-[var(--foreground-muted)] opacity-40" />
                <div className="h-3/5 w-1/6 bg-[var(--foreground-muted)] opacity-50" />
                <div className="h-4/5 w-1/6 bg-[var(--foreground)] opacity-70" />
                <div className="h-full w-1/6 bg-[var(--foreground)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="flex justify-center">
        <div className="w-52 overflow-hidden rounded-[2rem] border-[6px] border-[var(--foreground)] bg-[var(--surface)] shadow-2xl">
          <div className="flex h-8 items-center justify-center border-b border-[var(--border)]">
            <div className="h-1.5 w-12 rounded-full bg-[var(--foreground-muted)]" />
          </div>

          <div className="space-y-4 p-5">
            <div className="h-3 w-20 bg-[var(--foreground)]" />
            <div className="h-28 border border-[var(--border)]" />
            <div className="space-y-2">
              <div className="h-2 w-full bg-[var(--foreground-muted)] opacity-40" />
              <div className="h-2 w-4/5 bg-[var(--foreground-muted)] opacity-30" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 border border-[var(--border)]" />
              <div className="h-16 border border-[var(--border)]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-mono text-xs text-[var(--foreground-muted)]">SYSTEM / ARCHITECTURE</span>
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="border border-[var(--border)] p-4 text-center text-xs">Application</div>

        <div className="border border-[var(--border)] p-4 text-center text-xs">API</div>

        <div className="border border-[var(--border)] p-4 text-center text-xs">Services</div>
      </div>

      <div className="my-4 flex justify-center">
        <div className="h-8 w-px bg-[var(--border)]" />
      </div>

      <div className="border border-[var(--border)] p-4 text-center text-xs">Data &amp; Infrastructure</div>

      <div className="my-4 flex justify-center">
        <div className="h-8 w-px bg-[var(--border)]" />
      </div>

      <div className="border border-[var(--accent)] p-4 text-center text-xs">Business Workflow</div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main>
      <section className="k-section border-b border-[var(--border)]">
        <div className="k-container">
          <div className="mx-auto max-w-5xl py-24 text-center sm:py-32 lg:py-40">
            <p className="k-eyebrow">Services</p>

            <h1 className="k-display mt-6">Technology shaped around the work.</h1>

            <p className="k-body-large mx-auto mt-8 max-w-2xl text-[var(--foreground-muted)]">We don&apos;t start with technology. We start with what your business needs.</p>

            <div className="mt-12 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--foreground-muted)]">
              <span>01</span>
              <span className="h-px w-12 bg-[var(--border)]" />
              <span>04</span>
              <span>Services</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        {services.map((service, index) => {
          const Icon = service.icon;
          const isReversed = index % 2 !== 0;

          return (
            <article key={service.number} className="group border-b border-[var(--border)]">
              <div className="k-container">
                <div className={`grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-32 ${isReversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="lg:col-span-5">
                    <div className="flex items-start justify-between lg:block">
                      <span className="font-mono text-sm text-[var(--foreground-muted)]">{service.number}</span>

                      <Icon size={28} strokeWidth={1.5} className="text-[var(--foreground-muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 lg:mt-16" />
                    </div>

                    <h2 className="k-heading-1 mt-8">{service.title}</h2>

                    <p className="k-body-large mt-6 max-w-lg text-[var(--foreground-muted)]">{service.shortDescription}</p>

                    <Link href="/#start-project" className="k-button k-button-secondary mt-8 inline-flex">
                      Start a conversation
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="lg:col-span-7">
                    <ServiceVisual type={service.visual} />

                    <div className="mt-10 grid gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
                      <div>
                        <p className="k-eyebrow">What we build</p>

                        <ul className="mt-5 space-y-3">
                          {service.examples.map((example) => (
                            <li key={example} className="flex items-center gap-3 text-sm">
                              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="k-eyebrow">Capabilities</p>

                        <ul className="mt-5 space-y-3">
                          {service.capabilities.map((capability) => (
                            <li key={capability} className="text-sm text-[var(--foreground-muted)]">
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="k-body mt-8 max-w-2xl text-[var(--foreground-muted)]">{service.description}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="k-section">
        <div className="k-container">
          <div className="mx-auto max-w-4xl border border-[var(--border)] px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16 lg:py-28">
            <p className="k-eyebrow">Not sure what you need?</p>

            <h2 className="k-heading-1 mt-6">Let&apos;s figure it out together.</h2>

            <p className="k-body-large mx-auto mt-6 max-w-2xl text-[var(--foreground-muted)]">Tell us what you are trying to achieve. We&apos;ll help you understand the problem, explore the options, and choose a sensible way forward.</p>

            <Link href="/#start-project" className="k-button k-button-primary mt-10 inline-flex">
              Start a Project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
