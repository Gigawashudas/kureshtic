import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const navigationLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
const serviceLinks = [
  { label: "Websites", href: "#services" },
  { label: "Web Applications", href: "#services" },
  { label: "Mobile Applications", href: "#services" },
  { label: "Digital Systems", href: "#services" },
];
const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
        {" "}
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" /> <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" /> <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />{" "}
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
        {" "}
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8.2v3h2.6v8h2.7Z" />{" "}
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
        {" "}
        <path d="M5.2 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3.6 9h3.2v11.5H3.6V9Zm5.1 0h3v1.6h.1c.4-.8 1.5-2 3.3-2 3.5 0 4.1 2.3 4.1 5.4v6.5H16v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.9H8.7V9Z" />{" "}
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
        {" "}
        <path d="M21.6 7.1a2.9 2.9 0 0 0-2-2C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2C2 8.9 2 12 2 12s0 3.1.4 4.9a2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2c.4-1.8.4-4.9.4-4.9s0-3.1-.4-4.9ZM10 15.7V8.3l6 3.7-6 3.7Z" />{" "}
      </svg>
    ),
  },
];
export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      {" "}
      <div className="k-container">
        {" "}
        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          {" "}
          <div className="lg:col-span-5">
            {" "}
            <Link href="/" className="inline-flex text-xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--accent)]">
              {" "}
              KURESHTIC{" "}
            </Link>{" "}
            <p className="k-body-large mt-6 max-w-lg"> A technology partner helping businesses choose, build, and maintain the right digital solutions. </p>{" "}
            <div className="mt-8 border-l-2 border-[var(--accent)] pl-5">
              {" "}
              <p className="text-sm font-medium text-[var(--text-primary)]"> You know your business. </p> <p className="mt-1 text-sm text-[var(--text-secondary)]"> We know technology. </p>{" "}
            </div>{" "}
            <div className="mt-10 space-y-3 text-sm">
              {" "}
              <p className="text-[var(--text-muted)]">
                {" "}
                Email: <span className="ml-2 text-[var(--text-secondary)]"> your@email.com </span>{" "}
              </p>{" "}
              <p className="text-[var(--text-muted)]">
                {" "}
                Phone: <span className="ml-2 text-[var(--text-secondary)]"> +880 XXX XXX XXXX </span>{" "}
              </p>{" "}
              <p className="text-[var(--text-muted)]">
                {" "}
                Location: <span className="ml-2 text-[var(--text-secondary)]"> Your Location </span>{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="lg:col-span-2 lg:col-start-7">
            {" "}
            <p className="k-eyebrow">Explore</p>{" "}
            <nav className="mt-6" aria-label="Footer navigation">
              {" "}
              <ul className="grid gap-3">
                {" "}
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    {" "}
                    <a href={link.href} className="k-link inline-flex py-1 text-sm font-medium text-[var(--text-secondary)]">
                      {" "}
                      {link.label}{" "}
                    </a>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </nav>{" "}
          </div>{" "}
          <div className="lg:col-span-2">
            {" "}
            <p className="k-eyebrow">What we build</p>{" "}
            <nav className="mt-6" aria-label="Services navigation">
              {" "}
              <ul className="grid gap-3">
                {" "}
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    {" "}
                    <a href={link.href} className="k-link inline-flex py-1 text-sm text-[var(--text-secondary)]">
                      {" "}
                      {link.label}{" "}
                    </a>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </nav>{" "}
          </div>{" "}
          <div className="lg:col-span-3">
            {" "}
            <p className="k-eyebrow">Start a conversation</p> <h2 className="mt-6 max-w-sm text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl"> Have a problem worth solving? </h2> <p className="k-body-small mt-4 max-w-sm"> You do not need a complete specification. Tell us what you are trying to achieve and we will help you figure out what makes sense. </p>{" "}
            <a href="#contact" className="k-link group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              {" "}
              Start a Project <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
        <div className="grid gap-8 border-t border-[var(--border)] py-8 sm:grid-cols-[1fr_auto] sm:items-center">
          {" "}
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]"> Think first. Build second. </p>{" "}
          <nav aria-label="Social media">
            {" "}
            <ul className="flex flex-wrap items-center gap-2">
              {" "}
              {socialLinks.map((social) => (
                <li key={social.label}>
                  {" "}
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]">
                    {" "}
                    {social.icon}{" "}
                  </a>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </nav>{" "}
        </div>{" "}
        <div className="flex flex-col gap-4 border-t border-[var(--border)] py-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          {" "}
          <p>© {new Date().getFullYear()} KURESHTIC. All rights reserved.</p>{" "}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {" "}
            <Link href="/privacy" className="transition-colors duration-200 hover:text-[var(--text-primary)]">
              {" "}
              Privacy{" "}
            </Link>{" "}
            <Link href="/terms" className="transition-colors duration-200 hover:text-[var(--text-primary)]">
              {" "}
              Terms{" "}
            </Link>{" "}
            <span className="hidden text-[var(--border-strong)] sm:inline"> / </span> <span className="font-mono uppercase tracking-[0.08em]"> Technology Partner </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
}
