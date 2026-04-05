"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { projects, categories, type Category } from "@/data/projects";
import { RevealText, RevealStagger, CountUp } from "@/components/TextReveal";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const HeroSphere = dynamic(() => import("@/components/HeroSphere"), { ssr: false });

export default function Home() {
  const [tab, setTab] = useState<Category | "all">("all");
  const filtered = tab === "all" ? projects : projects.filter((p) => p.category === tab);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />

      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#1F1F1F] bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#" className="font-[var(--font-mono)] text-sm font-medium tracking-wider">MM<span className="text-[#00E599]">.</span></a>
          <div className="hidden items-center gap-8 text-[13px] text-[#666] md:flex">
            {["About", "Work", "Stack", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="link-slide transition hover:text-white">{l}</a>
            ))}
          </div>
          <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="rounded-md border border-[#00E599]/30 bg-[#00E599]/10 px-4 py-1.5 text-xs font-medium text-[#00E599] transition hover:bg-[#00E599]/20">Available for hire</a>
        </div>
      </nav>

      {/* Hero with 3D */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-14">
        <Suspense fallback={null}><HeroSphere /></Suspense>
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <RevealText><span className="font-[var(--font-mono)] text-xs uppercase tracking-[4px] text-[#444]">Founder, Quvantic</span></RevealText>
            <RevealText><h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">Muhammad<br /><span className="text-[#00E599]">Mustafa</span></h1></RevealText>
            <RevealText><p className="mt-6 max-w-md text-lg leading-relaxed text-[#666]">QA Automation & AI Enablement Engineer. I build testing infrastructure and enable AI across entire organizations.</p></RevealText>
            <RevealText>
              <div className="mt-8 flex gap-3">
                <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="rounded-md bg-[#00E599] px-5 py-2.5 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#00CC88] hover:scale-105">Hire on Upwork</a>
                <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="rounded-md border border-[#1F1F1F] px-5 py-2.5 text-sm font-medium text-[#666] transition hover:border-[#333] hover:text-white hover:scale-105">GitHub</a>
              </div>
            </RevealText>
          </div>
          <RevealStagger className="grid grid-cols-2 gap-3">
            {[
              { n: 44, s: "+", l: "Open Source Repos", c: "#00E599" },
              { n: 6, s: "", l: "Languages", c: "#EDEDED" },
              { n: 160, s: "+", l: "PRs Merged", c: "#00E599" },
              { n: 100, s: "%", l: "Job Success", c: "#EDEDED" },
            ].map((stat) => (
              <div key={stat.l} className="rounded-lg border border-[#1F1F1F] bg-[#111]/80 p-5 backdrop-blur-sm transition hover:border-[#00E599]/20">
                <div className="font-[var(--font-mono)] text-3xl font-bold" style={{ color: stat.c }}><CountUp target={stat.n} suffix={stat.s} /></div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-[#444]">{stat.l}</div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealText><div className="mb-3 flex items-center gap-3"><div className="h-px w-8 bg-[#00E599]" /><span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#00E599]">What I do</span></div></RevealText>
          <RevealText><h2 className="text-3xl font-bold tracking-tight md:text-5xl">Not just testing —<br />I enable <span className="text-[#00E599]">AI at org level</span>.</h2></RevealText>
          <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "QA Automation", desc: "E2E, API, performance, visual, a11y — Playwright, Cypress, Selenium, Appium, Maestro", icon: "→" },
              { title: "AI Enablement", desc: "Claude API, MCP servers, AI test gen, self-healing pipelines, n8n automation", icon: "⚡" },
              { title: "6 Languages", desc: "TypeScript, Java, C#, Python, Rust, JS — production frameworks in each", icon: "◆" },
              { title: "Org Transform", desc: "Take entire engineering teams from manual to AI-powered workflows", icon: "▲" },
            ].map((card) => (
              <div key={card.title} className="group rounded-lg border border-[#1F1F1F] bg-[#111] p-6 transition duration-300 hover:border-[#00E599]/30 hover:-translate-y-1">
                <div className="mb-4 font-[var(--font-mono)] text-xl text-[#00E599] transition group-hover:scale-110 inline-block">{card.icon}</div>
                <h3 className="mb-2 text-sm font-semibold">{card.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#555]">{card.desc}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealText><div className="mb-3 flex items-center gap-3"><div className="h-px w-8 bg-[#00E599]" /><span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#00E599]">Open Source</span></div></RevealText>
          <RevealText><h2 className="text-3xl font-bold tracking-tight md:text-5xl">44+ production-grade <span className="text-[#00E599]">repos</span></h2><p className="mt-3 text-[#444]">Every repo has tests, CI, docs, and works when you clone it.</p></RevealText>
          <RevealText>
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat.key} onClick={() => setTab(cat.key)} className={`rounded-md px-3 py-1.5 font-[var(--font-mono)] text-[11px] uppercase tracking-wider transition ${tab === cat.key ? "bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30" : "text-[#444] border border-[#1F1F1F] hover:text-[#888] hover:border-[#333]"}`}>
                  {cat.label} <span className="ml-1 opacity-40">{cat.count}</span>
                </button>
              ))}
            </div>
          </RevealText>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <a key={project.repo} href={`https://github.com/mustafaautomation/${project.repo}`} target="_blank" rel="noopener" className="group rounded-lg border border-[#1F1F1F] bg-[#111] p-5 transition duration-300 hover:border-[#00E599]/20 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold transition group-hover:text-[#00E599]">{project.name}</h3>
                  <span className="text-xs text-[#222] transition group-hover:text-[#00E599]">↗</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[#444]">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (<span key={tag} className="rounded border border-[#1A1A1A] px-2 py-0.5 font-[var(--font-mono)] text-[10px] text-[#333]">{tag}</span>))}
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10"><a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="link-slide text-sm text-[#444] transition hover:text-[#00E599]">View all repos on GitHub →</a></div>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealText><div className="mb-3 flex items-center gap-3"><div className="h-px w-8 bg-[#00E599]" /><span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#00E599]">Tech Stack</span></div></RevealText>
          <RevealText><h2 className="text-3xl font-bold tracking-tight md:text-5xl">Tools I ship <span className="text-[#00E599]">production</span> with</h2></RevealText>
          <RevealStagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { lang: "TypeScript", tools: "Playwright · Vitest · Express", accent: true },
              { lang: "Java", tools: "Selenium · REST Assured · TestNG" },
              { lang: "C#", tools: "Playwright .NET · SpecFlow · NUnit" },
              { lang: "Python", tools: "Robot Framework · pytest" },
              { lang: "Rust", tools: "Tokio · reqwest · clap" },
              { lang: "JavaScript", tools: "k6 · Node.js · Express" },
            ].map((item) => (
              <div key={item.lang} className="rounded-lg border border-[#1F1F1F] bg-[#111] p-5 transition duration-300 hover:border-[#00E599]/20 hover:-translate-y-1">
                <div className={`font-[var(--font-mono)] text-sm font-bold ${"accent" in item && item.accent ? "text-[#00E599]" : "text-[#EDEDED]"}`}>{item.lang}</div>
                <div className="mt-1 text-[12px] text-[#444]">{item.tools}</div>
              </div>
            ))}
          </RevealStagger>
          <RevealText>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude API", "MCP Servers", "n8n", "GitHub Actions", "Docker", "Pact.io", "axe-core", "Allure"].map((t) => (
                <span key={t} className="rounded border border-[#1A1A1A] px-3 py-1 font-[var(--font-mono)] text-[10px] text-[#333] transition hover:border-[#333] hover:text-[#555]">{t}</span>
              ))}
            </div>
          </RevealText>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealText><div className="mb-3 flex items-center justify-center gap-3"><div className="h-px w-8 bg-[#00E599]" /><span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#00E599]">Contact</span><div className="h-px w-8 bg-[#00E599]" /></div></RevealText>
          <RevealText><h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Let&apos;s build something<br /><span className="text-[#00E599]">that doesn&apos;t break.</span></h2></RevealText>
          <RevealText><p className="mt-4 text-[#444]">Available for QA automation, AI enablement, and org-level transformation.</p></RevealText>
          <RevealText>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="rounded-md bg-[#00E599] px-6 py-2.5 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#00CC88] hover:scale-105">Hire on Upwork</a>
              <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="rounded-md border border-[#1F1F1F] px-6 py-2.5 text-sm font-medium text-[#666] transition hover:border-[#333] hover:text-white hover:scale-105">GitHub</a>
              <a href="https://www.linkedin.com/in/mustafahameed1" target="_blank" rel="noopener" className="rounded-md border border-[#1F1F1F] px-6 py-2.5 text-sm font-medium text-[#666] transition hover:border-[#333] hover:text-white hover:scale-105">LinkedIn</a>
            </div>
          </RevealText>
        </div>
      </section>

      <footer className="border-t border-[#1F1F1F] py-8 text-center font-[var(--font-mono)] text-[11px] text-[#222]">
        Built by Muhammad Mustafa · <a href="https://quvantic.com" className="text-[#00E599]/40 transition hover:text-[#00E599]">Quvantic</a>
      </footer>
    </>
  );
}
