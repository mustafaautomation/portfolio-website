"use client";

import { useState, useEffect } from "react";
import { projects, categories, type Category } from "@/data/projects";
import { RevealText, RevealStagger, CountUp } from "@/components/TextReveal";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  const [tab, setTab] = useState<Category | "all">("all");
  const filtered = tab === "all" ? projects : projects.filter((p) => p.category === tab);

  // Card spotlight effect
  useEffect(() => {
    const cards = document.querySelectorAll(".card-spotlight");
    const handleMouse = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    cards.forEach((card) => card.addEventListener("mousemove", handleMouse as EventListener));
    return () => cards.forEach((card) => card.removeEventListener("mousemove", handleMouse as EventListener));
  }, [filtered]);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />

      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#1A1A1A] bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#" className="font-[var(--font-heading)] text-base font-bold tracking-tight">MM<span className="text-gradient">.</span></a>
          <div className="hidden items-center gap-8 text-[13px] text-[#777] md:flex">
            {["About", "Work", "Stack", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="link-slide transition hover:text-white">{l}</a>
            ))}
          </div>
          <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="rounded-md border border-[#326BFF]/30 bg-[#326BFF]/10 px-4 py-1.5 text-xs font-medium text-[#326BFF] transition hover:bg-[#326BFF]/20">Available for hire</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-14">
        {/* Ambient glow */}
        <div className="absolute left-1/2 top-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#326BFF]/[0.04] blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 -z-10 h-[300px] w-[300px] rounded-full bg-[#8F42EC]/[0.03] blur-[100px]" />
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <RevealText>
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[4px] text-[#555]">Founder, Quvantic</span>
            </RevealText>
            <RevealText>
              <h1 className="mt-4 font-[var(--font-heading)] text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
                Muhammad<br /><span className="text-gradient">Mustafa</span>
              </h1>
            </RevealText>
            <RevealText>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#A1A1A1]">
                QA Automation & AI Enablement Engineer. I build testing infrastructure and enable AI across entire organizations.
              </p>
            </RevealText>
            <RevealText>
              <div className="mt-8 flex gap-3">
                <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="rounded-lg bg-[#326BFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4A7FFF] hover:shadow-[0_0_20px_rgba(50,107,255,0.3)] hover:scale-[1.02]">
                  Hire on Upwork
                </a>
                <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="rounded-lg border border-[#262626] px-6 py-3 text-sm font-medium text-[#A1A1A1] transition hover:border-[#444] hover:text-white hover:scale-[1.02]">
                  GitHub
                </a>
              </div>
            </RevealText>
          </div>
          <RevealStagger className="grid grid-cols-2 gap-3">
            {[
              { n: 44, s: "+", l: "Open Source Repos", gradient: true },
              { n: 6, s: "", l: "Languages", gradient: false },
              { n: 165, s: "+", l: "PRs Merged", gradient: true },
              { n: 100, s: "%", l: "Job Success", gradient: false },
            ].map((stat) => (
              <div key={stat.l} className="card-spotlight rounded-xl border border-[#1A1A1A] bg-[#111]/80 p-5 backdrop-blur-sm transition hover:border-[#326BFF]/20">
                <div className={`font-[var(--font-heading)] text-3xl font-bold ${stat.gradient ? "text-gradient" : "text-[#F5F5F5]"}`}>
                  <CountUp target={stat.n} suffix={stat.s} />
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-[#555]">{stat.l}</div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealText>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-[#326BFF]" />
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#326BFF]">What I do</span>
            </div>
          </RevealText>
          <RevealText>
            <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight md:text-5xl">
              Not just testing —<br />I enable <span className="text-gradient">AI at org level</span>.
            </h2>
          </RevealText>
          <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "QA Automation", desc: "E2E, API, performance, visual, a11y — Playwright, Cypress, Selenium, Appium, Maestro", icon: "01" },
              { title: "AI Enablement", desc: "Claude API, MCP servers, AI test gen, self-healing pipelines, n8n automation", icon: "02" },
              { title: "6 Languages", desc: "TypeScript, Java, C#, Python, Rust, JS — production frameworks in each", icon: "03" },
              { title: "Org Transform", desc: "Take entire engineering teams from manual to AI-powered workflows", icon: "04" },
            ].map((card) => (
              <div key={card.title} className="card-spotlight group rounded-xl border border-[#1A1A1A] bg-[#111] p-6 transition duration-300 hover:border-[#326BFF]/30 hover:-translate-y-1">
                <div className="mb-4 font-[var(--font-mono)] text-xs text-[#326BFF]/60">{card.icon}</div>
                <h3 className="mb-2 font-[var(--font-heading)] text-sm font-semibold">{card.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#666]">{card.desc}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealText>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-[#326BFF]" />
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#326BFF]">Open Source</span>
            </div>
          </RevealText>
          <RevealText>
            <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight md:text-5xl">
              44+ production-grade <span className="text-gradient">repos</span>
            </h2>
            <p className="mt-3 text-[#666]">Every repo has tests, CI, docs, and works when you clone it.</p>
          </RevealText>
          <RevealText>
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setTab(cat.key)}
                  className={`rounded-lg px-3 py-1.5 font-[var(--font-mono)] text-[11px] uppercase tracking-wider transition ${
                    tab === cat.key
                      ? "bg-[#326BFF]/10 text-[#326BFF] border border-[#326BFF]/30"
                      : "text-[#555] border border-[#1A1A1A] hover:text-[#999] hover:border-[#333]"
                  }`}
                >
                  {cat.label} <span className="ml-1 opacity-40">{cat.count}</span>
                </button>
              ))}
            </div>
          </RevealText>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <a
                key={project.repo}
                href={`https://github.com/mustafaautomation/${project.repo}`}
                target="_blank"
                rel="noopener"
                className="card-spotlight group rounded-xl border border-[#1A1A1A] bg-[#111] p-5 transition duration-300 hover:border-[#326BFF]/20 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-[var(--font-heading)] text-sm font-semibold transition group-hover:text-[#326BFF]">{project.name}</h3>
                  <span className="text-xs text-[#333] transition group-hover:text-[#326BFF]">↗</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[#555]">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded border border-[#1A1A1A] px-2 py-0.5 font-[var(--font-mono)] text-[10px] text-[#444]">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10">
            <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="link-slide text-sm text-[#555] transition hover:text-[#326BFF]">
              View all repos on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealText>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-[#326BFF]" />
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#326BFF]">Tech Stack</span>
            </div>
          </RevealText>
          <RevealText>
            <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight md:text-5xl">
              Tools I ship <span className="text-gradient">production</span> with
            </h2>
          </RevealText>
          <RevealStagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { lang: "TypeScript", tools: "Playwright · Vitest · Express", primary: true },
              { lang: "Java", tools: "Selenium · REST Assured · TestNG", primary: false },
              { lang: "C#", tools: "Playwright .NET · SpecFlow · NUnit", primary: false },
              { lang: "Python", tools: "Robot Framework · pytest", primary: false },
              { lang: "Rust", tools: "Tokio · reqwest · clap", primary: false },
              { lang: "JavaScript", tools: "k6 · Node.js · Express", primary: false },
            ].map((item) => (
              <div key={item.lang} className="card-spotlight rounded-xl border border-[#1A1A1A] bg-[#111] p-5 transition duration-300 hover:border-[#326BFF]/20 hover:-translate-y-1">
                <div className={`font-[var(--font-heading)] text-sm font-bold ${item.primary ? "text-gradient" : "text-[#F5F5F5]"}`}>
                  {item.lang}
                </div>
                <div className="mt-1 text-[12px] text-[#555]">{item.tools}</div>
              </div>
            ))}
          </RevealStagger>
          <RevealText>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude API", "MCP Servers", "n8n", "GitHub Actions", "Docker", "Pact.io", "axe-core", "Allure"].map((t) => (
                <span key={t} className="rounded-lg border border-[#1A1A1A] px-3 py-1 font-[var(--font-mono)] text-[10px] text-[#444] transition hover:border-[#326BFF]/20 hover:text-[#666]">{t}</span>
              ))}
            </div>
          </RevealText>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealText>
            <div className="mb-3 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[#326BFF]" />
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#326BFF]">Contact</span>
              <div className="h-px w-8 bg-[#326BFF]" />
            </div>
          </RevealText>
          <RevealText>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-tight md:text-5xl">
              Let&apos;s build something<br /><span className="text-gradient">that doesn&apos;t break.</span>
            </h2>
          </RevealText>
          <RevealText>
            <p className="mt-4 text-[#666]">Available for QA automation, AI enablement, and org-level transformation.</p>
          </RevealText>
          <RevealText>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="rounded-lg bg-[#326BFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4A7FFF] hover:shadow-[0_0_20px_rgba(50,107,255,0.3)] hover:scale-[1.02]">
                Hire on Upwork
              </a>
              <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="rounded-lg border border-[#262626] px-6 py-3 text-sm font-medium text-[#A1A1A1] transition hover:border-[#444] hover:text-white hover:scale-[1.02]">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/mustafahameed1" target="_blank" rel="noopener" className="rounded-lg border border-[#262626] px-6 py-3 text-sm font-medium text-[#A1A1A1] transition hover:border-[#444] hover:text-white hover:scale-[1.02]">
                LinkedIn
              </a>
            </div>
          </RevealText>
        </div>
      </section>

      <footer className="border-t border-[#1A1A1A] py-8 text-center font-[var(--font-mono)] text-[11px] text-[#333]">
        Built by Muhammad Mustafa · <a href="https://quvantic.com" className="text-[#326BFF]/40 transition hover:text-[#326BFF]">Quvantic</a>
      </footer>
    </>
  );
}
