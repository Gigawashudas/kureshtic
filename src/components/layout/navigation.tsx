"use client";

import Link from "next/link";

import { Menu, X } from "lucide-react";

import { usePathname } from "next/navigation";

import { useState } from "react";

import { KureshticLogo } from "@/components/brand/kureshtic-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigationItems = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/work") {
      return pathname === "/work" || pathname.startsWith("/work/");
    }

    if (href === "/services") {
      return pathname === "/services" || pathname.startsWith("/services/");
    }

    if (href === "/process") {
      return pathname === "/process" || pathname.startsWith("/process/");
    }

    if (href === "/about") {
      return pathname === "/about" || pathname.startsWith("/about/");
    }

    if (href === "/contact") {
      return pathname === "/contact" || pathname.startsWith("/contact/");
    }

    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="k-container">
        <nav className="flex min-h-20 items-center justify-between gap-6" aria-label="Main navigation">
          <KureshticLogo href="/" className="shrink-0 transition-colors duration-200 hover:text-[var(--accent)]" />

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <div className="flex items-center gap-7">
              {navigationItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`relative py-2 text-sm font-medium transition-colors duration-200 ${active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
                    {item.label}

                    <span aria-hidden="true" className={`absolute bottom-0 left-0 h-px bg-[var(--accent)] transition-all duration-200 ${active ? "w-full" : "w-0"}`} />
                  </Link>
                );
              })}
            </div>

            <Link href="/contact" className="k-button k-button-primary">
              Start a Project
            </Link>

            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <button type="button" className="k-button k-button-secondary" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen((open) => !open)}>
              {isMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        <div id="mobile-navigation" className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden ${isMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`} aria-hidden={!isMenuOpen}>
          <div className="border-t border-[var(--border)] py-5">
            <div className="flex flex-col">
              {navigationItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link key={item.href} href={item.href} tabIndex={isMenuOpen ? 0 : -1} aria-current={active ? "page" : undefined} className={`relative border-b py-4 text-base font-medium transition-colors duration-200 ${active ? "border-[var(--border)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--text-primary)]"}`} onClick={closeMenu}>
                    <span className="flex items-center justify-between">
                      {item.label}

                      {active && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
                    </span>
                  </Link>
                );
              })}
            </div>

            <Link href="/contact" tabIndex={isMenuOpen ? 0 : -1} className="k-button k-button-primary mt-5 w-full" onClick={closeMenu}>
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
