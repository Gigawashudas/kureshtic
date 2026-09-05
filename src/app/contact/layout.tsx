import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Talk to KURESHTIC about your website, web application, mobile application, digital system, or technology needs.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Start a Project — KURESHTIC",
    description: "Have a technology problem or project in mind? Talk to KURESHTIC about the right digital solution for your business.",
    url: "https://kureshtic.com/contact",
  },
};

interface ContactLayoutProps {
  children: React.ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return children;
}
