import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  as?: "section" | "div";
}

export function Section({ children, className = "", containerClassName = "", id, as: Element = "section" }: SectionProps) {
  return (
    <Element id={id} className={`k-section ${className}`.trim()}>
      <Container className={containerClassName}>{children}</Container>
    </Element>
  );
}
