"use client";

import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { FormEvent, useState } from "react";

const projectTypes = ["Website", "Web Application", "Mobile Application", "Digital System", "Not sure yet"];

const expectations = ["A clear understanding of your problem", "An honest recommendation", "A practical direction for the project", "Clear communication about scope and next steps"];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      projectType: String(formData.get("projectType") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");

      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-[var(--border)] py-20 lg:py-28">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <p className="k-eyebrow">Contact KURESHTIC</p>

              <h1 className="k-heading-1 mt-6 max-w-5xl">Have a problem worth solving?</h1>

              <p className="k-body-large mt-8 max-w-3xl">Tell us what you are trying to achieve. You do not need to have the technology figured out yet.</p>
            </div>

            <div className="flex items-end lg:col-span-4">
              <div className="w-full border-l-2 border-[var(--foreground)] pl-5">
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

      {/* Conversation + Form */}
      <section className="k-section">
        <div className="k-container">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            {/* Left */}
            <div className="lg:col-span-4">
              <p className="k-eyebrow">Start a conversation</p>

              <h2 className="k-heading-3 mt-5 max-w-md">Let&apos;s understand what you need.</h2>

              <p className="k-body mt-5 max-w-md">Start with the problem, the idea, or simply what is not working today. We can figure out the technical direction together.</p>

              <div className="mt-10 border-t border-[var(--border)]">
                <a href="mailto:hello@kureshtic.com" className="group flex items-start gap-4 border-b border-[var(--border)] py-5">
                  <Mail size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--accent)]" aria-hidden="true" />

                  <div>
                    <p className="k-eyebrow">Email</p>

                    <p className="mt-2 text-base font-semibold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">hello@kureshtic.com</p>
                  </div>
                </a>

                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="group flex items-start gap-4 border-b border-[var(--border)] py-5">
                  <MessageCircle size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--accent)]" aria-hidden="true" />

                  <div>
                    <p className="k-eyebrow">WhatsApp</p>

                    <p className="mt-2 text-base font-semibold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">Start a conversation</p>
                  </div>
                </a>
              </div>

              <div className="mt-10">
                <p className="k-eyebrow">What happens next</p>

                <div className="mt-5 border-t border-[var(--border)]">
                  {[
                    {
                      number: "01",
                      title: "We read your enquiry",
                    },
                    {
                      number: "02",
                      title: "We understand the problem",
                    },
                    {
                      number: "03",
                      title: "We discuss the right direction",
                    },
                  ].map((item) => (
                    <div key={item.number} className="grid grid-cols-[40px_1fr] gap-3 border-b border-[var(--border)] py-4">
                      <span className="font-mono text-xs text-[var(--accent)]">{item.number}</span>

                      <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <div className="border border-[var(--border)] bg-[var(--surface)]">
                <div className="border-b border-[var(--border)] px-6 py-6 sm:px-8 lg:px-10">
                  <p className="k-eyebrow">Project enquiry</p>

                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">Tell us about your project.</h2>
                </div>

                {status === "success" ? (
                  <div className="px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
                    <div className="flex h-12 w-12 items-center justify-center border border-[var(--border-strong)]">
                      <Check size={22} strokeWidth={1.7} className="text-[var(--accent)]" aria-hidden="true" />
                    </div>

                    <h3 className="k-heading-3 mt-7">Your enquiry has been received.</h3>

                    <p className="k-body-large mt-4 max-w-xl">Thank you for reaching out. We&apos;ll review what you shared and get back to you.</p>

                    <button type="button" onClick={() => setStatus("idle")} className="k-button k-button-secondary mt-8">
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                    {/* Honeypot */}
                    <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                      <label htmlFor="website">Website</label>

                      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="k-eyebrow">
                          First name
                        </label>

                        <input id="firstName" name="firstName" type="text" required autoComplete="given-name" className="mt-2 w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" placeholder="Your first name" />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="k-eyebrow">
                          Last name
                        </label>

                        <input id="lastName" name="lastName" type="text" required autoComplete="family-name" className="mt-2 w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" placeholder="Your last name" />
                      </div>

                      <div>
                        <label htmlFor="email" className="k-eyebrow">
                          Email
                        </label>

                        <input id="email" name="email" type="email" required autoComplete="email" className="mt-2 w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" placeholder="you@example.com" />
                      </div>

                      <div>
                        <label htmlFor="phone" className="k-eyebrow">
                          Phone
                        </label>

                        <input id="phone" name="phone" type="tel" required autoComplete="tel" className="mt-2 w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" placeholder="+880 1XXXXXXXXX" />
                      </div>

                      <div>
                        <label htmlFor="company" className="k-eyebrow">
                          Company
                        </label>

                        <input id="company" name="company" type="text" autoComplete="organization" className="mt-2 w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" placeholder="Company name" />
                      </div>

                      <div>
                        <label htmlFor="projectType" className="k-eyebrow">
                          What do you need?
                        </label>

                        <select id="projectType" name="projectType" required defaultValue="" className="mt-2 w-full appearance-none border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors duration-200 focus:border-[var(--accent)]">
                          <option value="" disabled>
                            Select a service
                          </option>

                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="message" className="k-eyebrow">
                        Tell us about it
                      </label>

                      <textarea id="message" name="message" required rows={7} className="mt-2 w-full resize-y border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--text-primary)] outline-none transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" placeholder="What are you trying to build, improve, or solve?" />
                    </div>

                    {status === "error" && (
                      <div role="alert" className="mt-6 border-l-2 border-[var(--error)] bg-[var(--surface-muted)] px-4 py-3">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{errorMessage}</p>
                      </div>
                    )}

                    <div className="mt-8 flex flex-col gap-5 border-t border-[var(--border)] pt-7 sm:flex-row sm:items-center sm:justify-between">
                      <p className="k-body-small max-w-md">By sending this enquiry, you are starting a conversation. There is no obligation to move forward.</p>

                      <button type="submit" disabled={status === "submitting"} className="k-button k-button-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60">
                        {status === "submitting" ? "Sending..." : "Send Enquiry"}

                        <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="k-section border-y border-[var(--border)]">
        <div className="k-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="k-eyebrow">What you can expect</p>

              <h2 className="k-heading-2 mt-5 max-w-xl">A useful conversation comes first.</h2>

              <p className="k-body-large mt-6 max-w-lg">We would rather understand the problem properly than rush into a solution that does not fit.</p>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-[var(--border)]">
                {expectations.map((item, index) => (
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
      <section className="py-24 lg:py-32">
        <div className="k-container">
          <div className="max-w-4xl">
            <p className="k-eyebrow">Still figuring it out?</p>

            <h2 className="k-heading-1 mt-6 max-w-4xl">That&apos;s exactly where the conversation can begin.</h2>

            <p className="k-body-large mt-7 max-w-2xl">You do not need a finished specification. Tell us what is happening, what you want to improve, or what you are thinking about building.</p>

            <a href="mailto:hello@kureshtic.com" className="k-button k-button-secondary mt-8">
              Email KURESHTIC
              <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
