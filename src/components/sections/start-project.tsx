"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const projectTypes = ["Website", "Web Application", "Mobile Application", "Digital System", "Not Sure Yet"];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function StartProject() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      website: String(formData.get("website") ?? ""),
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "We could not submit your enquiry. Please try again.");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" aria-labelledby="start-project-heading" className="k-section border-b border-(--border)">
      <div className="k-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="k-eyebrow">Start a project</p>

            <h2 id="start-project-heading" className="k-heading-2 mt-5 max-w-xl">
              What are you trying to achieve?
            </h2>

            <p className="k-body-large mt-5 max-w-lg">You do not need a complete specification. Tell us what you are trying to build, improve, or solve, and we can figure out the right direction together.</p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-(--accent)" aria-hidden="true" />

                <div>
                  <p className="text-sm font-semibold text-(--text-primary)">No technical specification required</p>

                  <p className="k-body-small mt-0.5 max-w-sm">Start with the business problem. We can help shape the technical direction.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-(--accent)" aria-hidden="true" />

                <div>
                  <p className="text-sm font-semibold text-(--text-primary)">A conversation before a commitment</p>

                  <p className="k-body-small mt-0.5 max-w-sm">We first understand what you need before recommending what should be built.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-(--accent)" aria-hidden="true" />

                <div>
                  <p className="text-sm font-semibold text-(--text-primary)">Clear next steps</p>

                  <p className="k-body-small mt-0.5 max-w-sm">Once we understand the project, we will explain what we recommend and what happens next.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="border border-(--border) bg-(--surface) p-5 sm:p-6">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="project-first-name" className="text-sm font-semibold text-(--text-primary)">
                    First name
                  </label>

                  <input id="project-first-name" name="firstName" type="text" autoComplete="given-name" placeholder="First name" required disabled={isSubmitting} className="mt-1 h-11 w-full rounded-sm border border-(--border-strong) bg-transparent px-3.5 text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--accent) disabled:cursor-not-allowed disabled:opacity-60" />
                </div>

                <div>
                  <label htmlFor="project-last-name" className="text-sm font-semibold text-(--text-primary)">
                    Last name
                  </label>

                  <input id="project-last-name" name="lastName" type="text" autoComplete="family-name" placeholder="Last name" required disabled={isSubmitting} className="mt-1 h-11 w-full rounded-sm border border-(--border-strong) bg-transparent px-3.5 text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--accent) disabled:cursor-not-allowed disabled:opacity-60" />
                </div>

                <div>
                  <label htmlFor="project-email" className="text-sm font-semibold text-(--text-primary)">
                    Email
                  </label>

                  <input id="project-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={isSubmitting} className="mt-1 h-11 w-full rounded-sm border border-(--border-strong) bg-transparent px-3.5 text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--accent) disabled:cursor-not-allowed disabled:opacity-60" />
                </div>

                <div>
                  <label htmlFor="project-phone" className="text-sm font-semibold text-(--text-primary)">
                    Phone number
                  </label>

                  <input id="project-phone" name="phone" type="tel" autoComplete="tel" placeholder="+880 1XXX XXXXXX" required disabled={isSubmitting} className="mt-1 h-11 w-full rounded-sm border border-(--border-strong) bg-transparent px-3.5 text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--accent) disabled:cursor-not-allowed disabled:opacity-60" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="project-company" className="text-sm font-semibold text-(--text-primary)">
                    Company
                    <span className="ml-1 font-normal text-(--text-muted)">Optional</span>
                  </label>

                  <input id="project-company" name="company" type="text" autoComplete="organization" placeholder="Company name" disabled={isSubmitting} className="mt-1 h-11 w-full rounded-sm border border-(--border-strong) bg-transparent px-3.5 text-sm text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--accent) disabled:cursor-not-allowed disabled:opacity-60" />
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-semibold text-(--text-primary)">What do you need?</legend>

                  <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {projectTypes.map((type) => (
                      <label key={type} className="group flex min-h-10 cursor-pointer items-center gap-3 border border-(--border) px-3.5 transition-colors duration-200 hover:border-(--accent)">
                        <input type="radio" name="projectType" value={type} required disabled={isSubmitting} className="h-4 w-4 accent-(--accent)" />

                        <span className="text-sm text-(--text-secondary) transition-colors duration-200 group-hover:text-(--text-primary)">{type}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="sm:col-span-2">
                  <label htmlFor="project-message" className="text-sm font-semibold text-(--text-primary)">
                    Tell us about it
                  </label>

                  <textarea id="project-message" name="message" rows={4} placeholder="What are you trying to build, improve, or solve?" required disabled={isSubmitting} className="mt-1 min-h-24 w-full resize-y rounded-sm border border-(--border-strong) bg-transparent px-3.5 py-2.5 text-sm leading-6 text-(--text-primary) outline-none placeholder:text-(--text-muted) focus:border-(--accent) disabled:cursor-not-allowed disabled:opacity-60" />
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" disabled={isSubmitting} className="k-button k-button-primary group w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">
                    {isSubmitting ? "Sending..." : "Start a Project"}

                    <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>

                  <p className="k-body-small mt-2 max-w-lg">By sending this enquiry, you are simply starting a conversation. There is no obligation to proceed.</p>

                  {status === "success" && (
                    <p className="mt-2 text-sm font-medium text-(--success)" role="status">
                      Thanks. Your enquiry has been received. We will get back to you soon.
                    </p>
                  )}

                  {status === "error" && (
                    <p className="mt-2 text-sm font-medium text-(--error)" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
