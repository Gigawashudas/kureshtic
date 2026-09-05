import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore selected websites, web applications, and digital products built by KURESHTIC for real business needs.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work — KURESHTIC",
    description: "Explore selected digital products, websites, web applications, and systems built by KURESHTIC.",
    url: "https://kureshtic.com/work",
  },
};

interface WorkLayoutProps {
  children: React.ReactNode;
}

export default function WorkLayout({ children }: WorkLayoutProps) {
  return children;
}
