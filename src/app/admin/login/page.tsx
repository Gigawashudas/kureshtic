"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage("Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)]">
            <LockKeyhole size={18} strokeWidth={1.6} aria-hidden="true" />
          </div>

          <p className="k-eyebrow">KURESHTIC</p>

          <h1 className="k-heading-2 mt-5">Admin access</h1>

          <p className="k-body mt-4 max-w-sm">Sign in to manage projects and website content.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="admin-email" className="text-sm font-semibold text-[var(--text-primary)]">
                Email
              </label>

              <input id="admin-email" name="email" type="email" autoComplete="email" placeholder="Admin email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-transparent px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" />
            </div>

            <div>
              <label htmlFor="admin-password" className="text-sm font-semibold text-[var(--text-primary)]">
                Password
              </label>

              <input id="admin-password" name="password" type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-transparent px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]" />
            </div>

            {errorMessage && (
              <p role="alert" className="text-sm text-[var(--error)]">
                {errorMessage}
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="k-button k-button-primary group w-full disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Signing in..." : "Sign in"}

              {!isSubmitting && <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />}
            </button>
          </div>
        </form>

        <p className="k-body-small mt-6 text-center">KURESHTIC · Admin</p>
      </div>
    </main>
  );
}
