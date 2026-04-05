"use client";

import { useState, useEffect, useRef } from "react";
import { projects, categories, categoryColors, type Category } from "@/data/projects";

/* ── Stat Counter Hook ─────────────────────────────── */
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ── Stat Card ─────────────────────────────────────── */
function StatCard({ target, label, suffix, color }: { target: number; label: string; suffix: string; color: string }) {
  const { count, ref } = useCountUp(target);
  const colorMap: Record<string, string> = {
    purple: "text-purple-400 border-purple-400/30 bg-purple-400/8",
    blue: "text-blue-400 border-blue-400/30 bg-blue-400/8",
    green: "text-emerald-400 border-emerald-400/30 bg-emerald-400/8",
    orange: "text-orange-400 border-orange-400/30 bg-orange-400/8",
  };
  return (
    <div ref={ref} className={`rounded-xl border p-5 text-center ${colorMap[color]}`}>
      <div className="text-3xl font-extrabold">{count}{suffix}</div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-slate-400">{label}</div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState<Category | "all">("all");

  const filtered = activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <>
      {/* ── Nav ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0f0c29]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="text-lg font-bold">MM<span className="text-purple-400">.</span></a>
          <div className="hidden gap-6 text-sm text-slate-400 md:flex">
            <a href="#what" className="hover:text-white transition">What I Do</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#stack" className="hover:text-white transition">Stack</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
          <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="rounded-full bg-purple-500 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-600 transition">
            Hire Me
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Orbs */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500 opacity-10 blur-[100px]" style={{ animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-blue-500 opacity-10 blur-[100px]" style={{ animation: "float 10s ease-in-out infinite 2s" }} />

        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          {/* Left */}
          <div>
            <div className="mb-4 inline-block rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-1.5 text-[11px] uppercase tracking-[3px] text-purple-300">
              Founder, Quvantic
            </div>
            <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
              Muhammad<br /><span className="gradient-text">Mustafa</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">QA Automation Lead & AI Enablement Engineer</p>
            <p className="mt-2 text-sm text-slate-500">I transform how entire organizations ship quality.</p>
            <div className="mt-8 flex gap-3">
              <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:bg-purple-600 transition">
                Hire on Upwork
              </a>
              <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="rounded-full border border-purple-400/30 px-6 py-3 text-sm font-semibold text-purple-300 hover:bg-purple-400/10 transition">
                View GitHub
              </a>
            </div>
          </div>

          {/* Right — Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard target={44} suffix="+" label="Repos" color="purple" />
            <StatCard target={6} suffix="" label="Languages" color="blue" />
            <StatCard target={160} suffix="+" label="PRs Merged" color="green" />
            <StatCard target={100} suffix="%" label="Job Success" color="orange" />
          </div>
        </div>
      </section>

      {/* ── What I Do ── */}
      <section id="what" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold">What I <span className="gradient-text">Do</span></h2>
          <p className="mb-12 text-center text-slate-400">Not just testing — I enable AI across entire organizations.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🧪", title: "QA Test Automation", desc: "E2E, API, performance, visual, accessibility across Playwright, Cypress, Selenium, Appium, Maestro" },
              { icon: "🧠", title: "AI Enablement", desc: "Claude API, MCP servers, AI test generation, self-healing orchestration, n8n workflows" },
              { icon: "💻", title: "Multi-Language", desc: "Production frameworks in TypeScript, Java, C#, Python, Rust — not just one stack" },
              { icon: "🚀", title: "Org Transformation", desc: "Enable entire engineering teams to adopt AI-powered workflows, from manual to automated" },
            ].map((card) => (
              <div key={card.title} className="glass rounded-2xl p-6 hover:border-purple-400/30 transition">
                <div className="mb-4 text-3xl">{card.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 text-center text-3xl font-bold">Open <span className="gradient-text">Source</span></h2>
          <p className="mb-10 text-center text-slate-400">44+ production-grade repos across 6 languages</p>

          {/* Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  activeTab === cat.key
                    ? "border-purple-400/50 bg-purple-400/20 text-purple-300"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat.label} <span className="ml-1 text-[10px] opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <a
                key={project.repo}
                href={`https://github.com/mustafaautomation/${project.repo}`}
                target="_blank"
                rel="noopener"
                className={`glass rounded-xl border-l-[3px] p-5 transition hover:border-purple-400/30 hover:translate-y-[-2px] ${categoryColors[project.category]}`}
              >
                <h3 className="mb-1 text-sm font-semibold text-white">{project.name}</h3>
                <p className="mb-3 text-xs leading-relaxed text-slate-400">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="text-sm text-purple-400 hover:text-purple-300 transition">
              View all repos on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section id="stack" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">Tech <span className="gradient-text">Stack</span></h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { lang: "TypeScript", frameworks: "Playwright, Vitest, Express", color: "text-blue-400" },
              { lang: "Java", frameworks: "Selenium, REST Assured, TestNG", color: "text-orange-400" },
              { lang: "C#", frameworks: "Playwright .NET, SpecFlow, NUnit", color: "text-purple-400" },
              { lang: "Python", frameworks: "Robot Framework, pytest", color: "text-emerald-400" },
              { lang: "Rust", frameworks: "Tokio, reqwest, clap", color: "text-orange-300" },
              { lang: "JavaScript", frameworks: "k6, Node.js, Express", color: "text-yellow-400" },
            ].map((item) => (
              <div key={item.lang} className="glass rounded-xl p-5">
                <div className={`text-lg font-bold ${item.color}`}>{item.lang}</div>
                <div className="mt-1 text-xs text-slate-400">{item.frameworks}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["Claude API", "MCP Servers", "n8n", "GitHub Actions", "Docker", "Pact.io", "axe-core", "Allure"].map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-400">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">Let&apos;s build something<br /><span className="gradient-text">that doesn&apos;t break.</span></h2>
          <p className="mb-10 text-slate-400">Available for QA automation, AI enablement, and org-level transformation.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:bg-purple-600 transition">
              Hire on Upwork
            </a>
            <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 transition">
              GitHub Profile
            </a>
            <a href="https://www.linkedin.com/in/mustafahameed1" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 transition">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-500">
        Built by Muhammad Mustafa · <a href="https://quvantic.com" className="text-purple-400 hover:text-purple-300">Quvantic</a>
      </footer>
    </>
  );
}
