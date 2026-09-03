import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@wrksz/themes/next";

import { Navigation } from "@/components/layout/navigation";

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
  title: {
    default: "KURESHTIC — Technology Partner",
    template: "%s — KURESHTIC",
  },
  description: "KURESHTIC helps businesses choose, build, and maintain reliable digital solutions.",
  applicationName: "KURESHTIC",
  keywords: ["KURESHTIC", "technology partner", "website development", "web application development", "mobile application development", "digital systems", "custom software", "digital solutions"],
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
