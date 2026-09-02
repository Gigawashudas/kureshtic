import { ArrowRight, CheckCircle2 } from "lucide-react";

const projectTypes = ["Website", "Web Application", "Mobile Application", "Digital System", "Not Sure Yet"];

export function StartProject() {
  return (
    <section id="contact" aria-labelledby="start-project-heading" className="k-section border-b border-[var(--border)]">
      <div className="k-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="k-eyebrow">Start a project</p>

            <h2 id="start-project-heading" className="k-heading-2 mt-6 max-w-xl">
              What are you trying to achieve?
            </h2>

            <p className="k-body-large mt-7 max-w-lg">You do not need a complete specification. Tell us what you are trying to build, improve, or solve, and we can figure out the right direction together.</p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <CheckCircle2 size={19} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />

                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">No technical specification required</p>

                  <p className="k-body-small mt-1 max-w-sm">Start with the business problem. We can help shape the technical direction.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 size={19} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />

                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">A conversation before a commitment</p>

                  <p className="k-body-small mt-1 max-w-sm">We first understand what you need before recommending what should be built.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 size={19} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />

                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Clear next steps</p>

                  <p className="k-body-small mt-1 max-w-sm">Once we understand the project, we will explain what we recommend and what happens next.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="project-name" className="text-sm font-semibold text-[var(--text-primary)]">
                    Your name
                  </label>

                  <input id="project-name" name="name" type="text" autoComplete="name" placeholder="Your name" className="mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-transparent px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" />
                </div>

                <div>
                  <label htmlFor="project-email" className="text-sm font-semibold text-[var(--text-primary)]">
                    Email
                  </label>

                  <input id="project-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-transparent px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" />
                </div>

                <div>
                  <label htmlFor="project-company" className="text-sm font-semibold text-[var(--text-primary)]">
                    Company
                    <span className="ml-1 font-normal text-[var(--text-muted)]">Optional</span>
                  </label>

                  <input id="project-company" name="company" type="text" autoComplete="organization" placeholder="Company name" className="mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-transparent px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" />
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-semibold text-[var(--text-primary)]">What do you need?</legend>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {projectTypes.map((type) => (
                      <label key={type} className="group flex min-h-12 cursor-pointer items-center gap-3 border border-[var(--border)] px-4 transition-colors duration-200 hover:border-[var(--accent)]">
                        <input type="radio" name="project-type" value={type} className="h-4 w-4 accent-[var(--accent)]" />

                        <span className="text-sm text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]">{type}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="sm:col-span-2">
                  <label htmlFor="project-message" className="text-sm font-semibold text-[var(--text-primary)]">
                    Tell us about it
                  </label>

                  <textarea id="project-message" name="message" rows={6} placeholder="What are you trying to build, improve, or solve?" className="mt-2 w-full resize-y rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-transparent px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" />
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" className="k-button k-button-primary group w-full sm:w-auto">
                    Start a Project
                    <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>

                  <p className="k-body-small mt-4 max-w-lg">By sending this enquiry, you are simply starting a conversation. There is no obligation to proceed.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
