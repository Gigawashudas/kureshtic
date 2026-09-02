"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <button type="button" aria-label="Toggle theme" className="k-button k-transition" disabled>
        <Sun size={18} strokeWidth={1.8} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button type="button" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"} className="k-button k-transition" onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
    </button>
  );
}
