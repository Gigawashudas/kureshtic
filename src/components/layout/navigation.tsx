"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigationItems = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="k-container">
        <nav className="flex min-h-20 items-center justify-between gap-6" aria-label="Main navigation">
          <Link href="/" className="shrink-0 text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]" aria-label="KURESHTIC home">
            KURESHTIC
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <div className="flex items-center gap-7">
              {navigationItems.map((item) => (
                <a key={item.href} href={item.href} className="k-link text-sm font-medium text-[var(--text-secondary)]">
                  {item.label}
                </a>
              ))}
            </div>

            <a href="#contact" className="k-button k-button-primary">
              Start a Project
            </a>

            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <button type="button" className="k-button k-button-secondary" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen((open) => !open)}>
              {isMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
            </button>
          </div>
        </nav>

        <div id="mobile-navigation" className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden ${isMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`} aria-hidden={!isMenuOpen}>
          <div className="border-t border-[var(--border)] py-5">
            <div className="flex flex-col">
              {navigationItems.map((item) => (
                <a key={item.href} href={item.href} tabIndex={isMenuOpen ? 0 : -1} className="k-link border-b border-[var(--border)] py-4 text-base font-medium text-[var(--text-primary)]" onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </div>

            <a href="#contact" tabIndex={isMenuOpen ? 0 : -1} className="k-button k-button-primary mt-5 w-full" onClick={closeMenu}>
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
