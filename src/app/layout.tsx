import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300","400","500","600","700","800"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });

export const metadata: Metadata = {
  title: "Muhammad Mustafa — QA Automation & AI Enablement",
  description: "44+ open-source repos across 6 languages. QA Automation, AI Enablement, Claude/MCP/n8n. Top Rated Plus on Upwork.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen font-[var(--font-inter)] antialiased grain grid-bg">
        {children}
      </body>
    </html>
  );
}
