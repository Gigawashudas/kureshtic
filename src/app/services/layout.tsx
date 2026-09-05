import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology Services",
  description: "Explore KURESHTIC technology services, including digital strategy, website development, web applications, mobile applications, digital systems, integrations, and ongoing technology support.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Technology Services — KURESHTIC",
    description: "Technology strategy, development, digital systems, integrations, and ongoing support built around your business.",
    url: "https://kureshtic.com/services",
  },
};

interface ServicesLayoutProps {
  children: React.ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return children;
}
