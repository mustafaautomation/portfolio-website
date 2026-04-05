import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Muhammad Mustafa — QA Automation & AI Enablement Engineer",
  description:
    "44+ open-source repos across 6 languages. QA Automation, AI Enablement, Claude/MCP/n8n expertise. Top Rated Plus on Upwork.",
  openGraph: {
    title: "Muhammad Mustafa — QA Automation & AI Enablement",
    description: "44+ repos, 6 languages, AI-powered QA transformation",
    url: "https://portfolio-website-j5z7.onrender.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen font-[var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
