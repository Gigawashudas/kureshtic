import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@wrksz/themes/next";

import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kureshtic.com"),

  title: {
    default: "KURESHTIC — Technology Partner",
    template: "%s — KURESHTIC",
  },

  description: "KURESHTIC is a technology partner helping businesses choose, build, and maintain reliable digital solutions.",

  applicationName: "KURESHTIC",

  keywords: ["KURESHTIC", "technology partner", "technology company", "website development", "web application development", "mobile application development", "digital systems", "custom software development", "digital solutions"],

  authors: [
    {
      name: "KURESHTIC",
      url: "https://kureshtic.com",
    },
  ],

  creator: "KURESHTIC",
  publisher: "KURESHTIC",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kureshtic.com",
    siteName: "KURESHTIC",
    title: "KURESHTIC — Technology Partner",
    description: "KURESHTIC helps businesses choose, build, and maintain reliable digital solutions.",
  },

  twitter: {
    card: "summary_large_image",
    title: "KURESHTIC — Technology Partner",
    description: "KURESHTIC helps businesses choose, build, and maintain reliable digital solutions.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KURESHTIC",
  url: "https://kureshtic.com",
  description: "KURESHTIC is a technology partner helping businesses choose, build, and maintain reliable digital solutions.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
