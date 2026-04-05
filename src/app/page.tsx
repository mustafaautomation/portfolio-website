"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { projects, categories, type Category } from "@/data/projects";

/* ── Fade-in wrapper ─────────────────────────────────── */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Count-up ────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / 1200, 1);
          setVal(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Section heading ─────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className="h-px w-8 bg-[#00E599]" />
      <span className="font-[var(--font-mono)] text-xs uppercase tracking-[3px] text-[#00E599]">{label}</span>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */
export default function Home() {
  const [tab, setTab] = useState<Category | "all">("all");
  const filtered = tab === "all" ? projects : projects.filter((p) => p.category === tab);

  return (
    <>
      {/* ── Nav ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#1F1F1F] bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#" className="font-[var(--font-mono)] text-sm font-medium tracking-wider">
            MM<span className="text-[#00E599]">.</span>
          </a>
          <div className="hidden items-center gap-8 text-[13px] text-[#888] md:flex">
            {["About", "Work", "Stack", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="link-slide transition hover:text-white">{l}</a>
            ))}
          </div>
          <a
            href="https://www.upwork.com/agencies/1485310266795913216/"
            target="_blank" rel="noopener"
            className="rounded-md border border-[#00E599]/30 bg-[#00E599]/10 px-4 py-1.5 text-xs font-medium text-[#00E599] transition hover:bg-[#00E599]/20"
          >
            Available for hire
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center pt-14">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <Reveal>
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[4px] text-[#555]">
                Founder, Quvantic
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-4 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
                Muhammad<br />
                <span className="text-[#00E599]">Mustafa</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#888]">
                QA Automation & AI Enablement Engineer.
                I build testing infrastructure and enable AI across entire organizations.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex gap-3">
                <a
                  href="https://www.upwork.com/agencies/1485310266795913216/"
                  target="_blank" rel="noopener"
                  className="rounded-md bg-[#00E599] px-5 py-2.5 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#00CC88]"
                >
                  Hire on Upwork
                </a>
                <a
                  href="https://github.com/mustafaautomation"
                  target="_blank" rel="noopener"
                  className="rounded-md border border-[#1F1F1F] px-5 py-2.5 text-sm font-medium text-[#888] transition hover:border-[#333] hover:text-white"
                >
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>

          {/* Stats */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: 44, s: "+", l: "Open Source Repos", c: "#00E599" },
                { n: 6, s: "", l: "Languages", c: "#EDEDED" },
                { n: 160, s: "+", l: "PRs Merged", c: "#00E599" },
                { n: 100, s: "%", l: "Job Success", c: "#EDEDED" },
              ].map((stat) => (
                <div
                  key={stat.l}
                  className="rounded-lg border border-[#1F1F1F] bg-[#141414] p-5 transition hover:border-[#00E599]/20"
                >
                  <div className="font-[var(--font-mono)] text-3xl font-bold" style={{ color: stat.c }}>
                    <Counter target={stat.n} suffix={stat.s} />
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-widest text-[#555]">{stat.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><SectionLabel label="What I do" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Not just testing —<br />I enable <span className="text-[#00E599]">AI at org level</span>.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "QA Automation", desc: "E2E, API, performance, visual, accessibility — Playwright, Cypress, Selenium, Appium, Maestro", icon: "→" },
              { title: "AI Enablement", desc: "Claude API, MCP servers, AI test generation, self-healing pipelines, n8n automation", icon: "⚡" },
              { title: "6 Languages", desc: "TypeScript, Java, C#, Python, Rust, JavaScript — production frameworks in each", icon: "◆" },
              { title: "Org Transformation", desc: "Take entire engineering teams from manual to AI-powered workflows", icon: "▲" },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="group rounded-lg border border-[#1F1F1F] bg-[#141414] p-6 transition hover:border-[#00E599]/20">
                  <div className="mb-4 font-[var(--font-mono)] text-lg text-[#00E599]">{card.icon}</div>
                  <h3 className="mb-2 text-sm font-semibold">{card.title}</h3>
                  <p className="text-[13px] leading-relaxed text-[#555]">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work / Projects ── */}
      <section id="work" className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><SectionLabel label="Open Source" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              44+ production-grade <span className="text-[#00E599]">repos</span>
            </h2>
            <p className="mt-3 text-[#555]">Every repo has tests, CI, docs, and works when you clone it.</p>
          </Reveal>

          {/* Tabs */}
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setTab(cat.key)}
                  className={`rounded-md px-3 py-1.5 font-[var(--font-mono)] text-[11px] uppercase tracking-wider transition ${
                    tab === cat.key
                      ? "bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30"
                      : "text-[#555] border border-[#1F1F1F] hover:text-[#888] hover:border-[#333]"
                  }`}
                >
                  {cat.label} <span className="ml-1 opacity-50">{cat.count}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <motion.a
                key={project.repo}
                href={`https://github.com/mustafaautomation/${project.repo}`}
                target="_blank" rel="noopener"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group rounded-lg border border-[#1F1F1F] bg-[#141414] p-5 transition hover:border-[#00E599]/20"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold transition group-hover:text-[#00E599]">{project.name}</h3>
                  <span className="text-[10px] text-[#333] transition group-hover:text-[#555]">↗</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[#555]">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded border border-[#1F1F1F] px-2 py-0.5 font-[var(--font-mono)] text-[10px] text-[#444]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-8">
            <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener" className="link-slide text-sm text-[#555] transition hover:text-[#00E599]">
              View all repos on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><SectionLabel label="Tech Stack" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Tools I ship <span className="text-[#00E599]">production</span> with
            </h2>
          </Reveal>

          {/* Bento grid */}
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { lang: "TypeScript", tools: "Playwright · Vitest · Express", accent: true },
              { lang: "Java", tools: "Selenium · REST Assured · TestNG", accent: false },
              { lang: "C#", tools: "Playwright .NET · SpecFlow · NUnit", accent: false },
              { lang: "Python", tools: "Robot Framework · pytest", accent: false },
              { lang: "Rust", tools: "Tokio · reqwest · clap", accent: false },
              { lang: "JavaScript", tools: "k6 · Node.js · Express", accent: false },
            ].map((item, i) => (
              <Reveal key={item.lang} delay={i * 0.05}>
                <div className="rounded-lg border border-[#1F1F1F] bg-[#141414] p-5 transition hover:border-[#00E599]/20">
                  <div className={`font-[var(--font-mono)] text-sm font-bold ${item.accent ? "text-[#00E599]" : "text-[#EDEDED]"}`}>
                    {item.lang}
                  </div>
                  <div className="mt-1 text-[12px] text-[#555]">{item.tools}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tool pills */}
          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Claude API", "MCP Servers", "n8n", "GitHub Actions", "Docker", "Pact.io", "axe-core", "Allure", "Framer Motion"].map((t) => (
                <span key={t} className="rounded border border-[#1F1F1F] px-3 py-1 font-[var(--font-mono)] text-[10px] text-[#444] transition hover:border-[#333] hover:text-[#666]">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal><SectionLabel label="Contact" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Let&apos;s build something<br />
              <span className="text-[#00E599]">that doesn&apos;t break.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[#555]">
              Available for QA automation, AI enablement, and org-level transformation.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="https://www.upwork.com/agencies/1485310266795913216/" target="_blank" rel="noopener"
                className="rounded-md bg-[#00E599] px-6 py-2.5 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#00CC88]">
                Hire on Upwork
              </a>
              <a href="https://github.com/mustafaautomation" target="_blank" rel="noopener"
                className="rounded-md border border-[#1F1F1F] px-6 py-2.5 text-sm font-medium text-[#888] transition hover:border-[#333] hover:text-white">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/mustafahameed1" target="_blank" rel="noopener"
                className="rounded-md border border-[#1F1F1F] px-6 py-2.5 text-sm font-medium text-[#888] transition hover:border-[#333] hover:text-white">
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1F1F1F] py-8 text-center font-[var(--font-mono)] text-[11px] text-[#333]">
        Built by Muhammad Mustafa · <a href="https://quvantic.com" className="text-[#00E599]/50 transition hover:text-[#00E599]">Quvantic</a>
      </footer>
    </>
  );
}
