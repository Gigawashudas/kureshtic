import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer";
}

export function Container({ children, className = "", as: Element = "div" }: ContainerProps) {
  return <Element className={`k-container ${className}`.trim()}>{children}</Element>;
}
