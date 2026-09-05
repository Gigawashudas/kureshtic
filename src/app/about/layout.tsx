import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About KURESHTIC",
  description: "Learn about KURESHTIC, a technology partner focused on helping businesses understand their needs and build reliable digital solutions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About KURESHTIC — Technology Partner",
    description: "KURESHTIC helps businesses understand their technology needs and build reliable digital solutions.",
    url: "https://kureshtic.com/about",
  },
};

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return children;
}
