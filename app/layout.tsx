import type { Metadata, Viewport } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "UH Parallel Computing Society — The Future of Computing is Parallel",
  description:
    "The University of Houston Parallel Computing Society teaches students GPU computing, CUDA, parallel programming, and high-performance systems through workshops, projects, and industry events.",
  keywords: [
    "University of Houston",
    "Parallel Computing",
    "CUDA",
    "GPU",
    "HPC",
    "student organization",
  ],
  openGraph: {
    title: "UH Parallel Computing Society",
    description:
      "The future of computing is parallel. Workshops, projects, and industry events for UH students.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#030604",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/*
          Fonts are loaded from Google Fonts at runtime so the project builds
          in offline/CI environments. For production you can switch to
          `next/font/google` (self-hosted, zero layout shift) — see README.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Chakra+Petch:wght@500;600;700&family=Orbitron:wght@700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`:root{--font-sans:'Inter';--font-display:'Chakra Petch';--font-hero:'Orbitron';--font-mono:'JetBrains Mono';}`}</style>
      </head>
      <body className="font-sans">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-lineActive focus:bg-obsidian focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-mint"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
