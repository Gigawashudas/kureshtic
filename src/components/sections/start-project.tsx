"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

const projectTypes = ["Website", "Web Application", "Mobile Application", "Digital System", "Not Sure Yet"];

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export function StartProject() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
    website: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setStatusMessage("");
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.projectType) {
      nextErrors.projectType = "Please choose a project type.";
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message = "Please tell us a little about what you are trying to achieve.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatusMessage("");
    setIsSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors({
            name: result.errors.name?.[0],
            email: result.errors.email?.[0],
            projectType: result.errors.projectType?.[0],
            message: result.errors.message?.[0],
          });
        }

        setStatusMessage(result.message || "We could not submit your enquiry. Please try again.");

        return;
      }

      setIsSuccess(true);
      setStatusMessage("Thank you. Your enquiry has been received. We will be in touch soon.");

      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: "",
        website: "",
      });
    } catch {
      setStatusMessage("Something went wrong while submitting your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form onSubmit={handleSubmit} noValidate className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="project-website">Website</label>
                <input id="project-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(event) => updateField("website", event.target.value)} />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="project-name" className="text-sm font-semibold text-[var(--text-primary)]">
                    Your name
                  </label>

                  <input id="project-name" name="name" type="text" autoComplete="name" placeholder="Your name" value={formData.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "project-name-error" : undefined} className={`mt-2 h-12 w-full rounded-[var(--radius-sm)] border bg-transparent px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] ${errors.name ? "border-[var(--error)]" : "border-[var(--border-strong)] focus:border-[var(--accent)]"}`} />

                  {errors.name && (
                    <p id="project-name-error" className="mt-2 text-xs text-[var(--error)]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="project-email" className="text-sm font-semibold text-[var(--text-primary)]">
                    Email
                  </label>

                  <input id="project-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "project-email-error" : undefined} className={`mt-2 h-12 w-full rounded-[var(--radius-sm)] border bg-transparent px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] ${errors.email ? "border-[var(--error)]" : "border-[var(--border-strong)] focus:border-[var(--accent)]"}`} />

                  {errors.email && (
                    <p id="project-email-error" className="mt-2 text-xs text-[var(--error)]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="project-company" className="text-sm font-semibold text-[var(--text-primary)]">
                    Company
                    <span className="ml-1 font-normal text-[var(--text-muted)]">Optional</span>
                  </label>

                  <input id="project-company" name="company" type="text" autoComplete="organization" placeholder="Company name" value={formData.company} onChange={(event) => updateField("company", event.target.value)} className="mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-transparent px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" />
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-semibold text-[var(--text-primary)]">What do you need?</legend>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type;

                      return (
                        <label key={type} className={`group flex min-h-12 cursor-pointer items-center gap-3 border px-4 transition-colors duration-200 ${isSelected ? "border-[var(--accent)] bg-[var(--surface-muted)]" : "border-[var(--border)] hover:border-[var(--accent)]"}`}>
                          <input type="radio" name="project-type" value={type} checked={isSelected} onChange={(event) => updateField("projectType", event.target.value)} className="h-4 w-4 accent-[var(--accent)]" />

                          <span className={`text-sm transition-colors duration-200 ${isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}>{type}</span>
                        </label>
                      );
                    })}
                  </div>

                  {errors.projectType && <p className="mt-2 text-xs text-[var(--error)]">{errors.projectType}</p>}
                </fieldset>

                <div className="sm:col-span-2">
                  <label htmlFor="project-message" className="text-sm font-semibold text-[var(--text-primary)]">
                    Tell us about it
                  </label>

                  <textarea id="project-message" name="message" rows={6} placeholder="What are you trying to build, improve, or solve?" value={formData.message} onChange={(event) => updateField("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "project-message-error" : undefined} className={`mt-2 w-full resize-y rounded-[var(--radius-sm)] border bg-transparent px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] ${errors.message ? "border-[var(--error)]" : "border-[var(--border-strong)] focus:border-[var(--accent)]"}`} />

                  {errors.message && (
                    <p id="project-message-error" className="mt-2 text-xs text-[var(--error)]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" disabled={isSubmitting} className="k-button k-button-primary group w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                    {isSubmitting ? "Sending..." : "Start a Project"}

                    {!isSubmitting && <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />}
                  </button>

                  <p className="k-body-small mt-4 max-w-lg">By sending this enquiry, you are simply starting a conversation. There is no obligation to proceed.</p>

                  {statusMessage && (
                    <p role="status" aria-live="polite" className={`mt-5 text-sm ${isSuccess ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
                      {statusMessage}
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
