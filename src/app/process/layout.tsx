import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Process",
  description: "See how KURESHTIC works with businesses to understand the problem, choose the right technology, build carefully, and deliver reliable digital solutions.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Our Process — KURESHTIC",
    description: "Think first. Build second. Discover how KURESHTIC approaches technology projects from problem to solution.",
    url: "https://kureshtic.com/process",
  },
};

interface ProcessLayoutProps {
  children: React.ReactNode;
}

export default function ProcessLayout({ children }: ProcessLayoutProps) {
  return children;
}
