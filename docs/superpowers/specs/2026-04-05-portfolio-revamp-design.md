# Portfolio Website Revamp — Design Spec

## Overview

Complete visual overhaul of https://portfolio-website-j5z7.onrender.com to match the evolved identity: QA Automation Lead + AI Enablement Engineer with 44+ repos across 6 languages.

**Tech:** Static HTML/CSS/JS (no framework). Deployed on Render.

## Design Decisions

| Decision | Choice |
|----------|--------|
| Visual direction | **Bold & Gradient** — dark theme, gradient backgrounds, glowing accents, pill badges |
| Hero layout | **Split Hero** — text left (name + title + CTAs) + 4 colored stat cards grid right |
| Projects section | **Tabbed Categories** — filter tabs with repo count per category |
| Page flow | **Work-First** — Hero → What I Do → Projects → Stack → Contact |

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Deep navy gradient | `#0f0c29 → #302b63 → #24243e` |
| Primary accent | Purple | `#a78bfa` |
| Secondary accent | Blue | `#3b82f6` |
| Success/green | Emerald | `#10b981` |
| Warning/orange | Orange | `#f97316` |
| Text primary | White | `#f0f6fc` |
| Text secondary | Slate | `#94a3b8` |
| Text dim | Gray | `#64748b` |
| Surface/card | Dark translucent | `rgba(255,255,255,0.05)` with border `rgba(255,255,255,0.1)` |

## Section 1 — Hero (Split Layout)

**Left side:**
- Badge: "FOUNDER, QUVANTIC" (purple, small caps, letter-spaced)
- Name: "Muhammad Mustafa" (h1, 48px, white, 800 weight. "Mustafa" in gradient text purple→blue)
- Subtitle: "QA Automation Lead & AI Enablement Engineer"
- Sub-line: "I transform how entire organizations ship quality"
- CTAs: "Hire on Upwork" (solid purple button) + "View GitHub" (outline button)

**Right side:**
- 2x2 grid of stat cards, each with:
  - Colored number (large, bold)
  - Label below (small caps, gray)
  - Subtle colored border + background tint matching the number color
- Cards:
  - `44+` REPOS (purple)
  - `6` LANGUAGES (blue)
  - `160+` PRs MERGED (green)
  - `100%` JOB SUCCESS (orange)

**Background:** Full-width gradient with subtle animated orbs (keep from current site).

## Section 2 — What I Do (4 Cards)

Centered section title: "What I Do"

4 cards in a row (2x2 on mobile):

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Test tube | QA Test Automation | E2E, API, performance, visual, accessibility testing across Playwright, Cypress, Selenium, Appium, Maestro |
| 2 | Brain/AI | AI Enablement | Claude API integration, MCP servers, AI test generation, self-healing orchestration, n8n workflows |
| 3 | Code | Multi-Language | Production frameworks in TypeScript, Java, C#, Python, Rust — not just one stack |
| 4 | Rocket | Org Transformation | Enable entire engineering teams to adopt AI-powered workflows, from manual to automated |

Each card: glass-morphism background, subtle border, icon on top, title, 1-2 line description.

## Section 3 — Projects (Tabbed Categories)

Section title: "Open Source" with subtitle "44+ production-grade repos"

**Tab bar:** Horizontal pills with count badges:
- All (44)
- E2E & Mobile (7)
- API Testing (5)
- AI & Claude (6)
- Performance (2)
- QA Tools (8)
- Infrastructure (5)
- Dashboards (3)

**Default tab:** "All" showing first 9 repos, with "View all on GitHub →" link below.

**Each repo card:**
- Repo name (h3, linked to GitHub)
- One-line description
- Tags as pills (framework, language)
- Subtle colored left border based on category

**Tab contents:**

### E2E & Mobile (7)
- playwright-enterprise-framework (Playwright, TypeScript, v2.0.0)
- cypress-bdd-starter (Cypress, Cucumber, BDD)
- selenium-java-framework (Selenium 4, Java, TestNG)
- dotnet-playwright-framework (Playwright .NET, C#, NUnit)
- specflow-bdd-framework (SpecFlow, C#, Gherkin)
- robot-framework-enterprise (Robot Framework, Python)
- appium-mobile-framework (Appium 2.0, Java)
- maestro-mobile-testing (Maestro, YAML)

### API Testing (5)
- api-testing-suite (SuperTest, TypeScript)
- restassured-api-testing (REST Assured, Java)
- graphql-testing-suite (GraphQL, TypeScript)
- contract-testing-pact (Pact.io, TypeScript)
- playwright-api-testing (Playwright API, TypeScript)

### AI & Claude (6)
- ai-test-orchestrator (5-stage pipeline, self-healing)
- ai-code-reviewer (Claude API, GitHub webhooks)
- mcp-server-toolkit (4 MCP servers, 13 tools)
- claude-code-skills (6 enterprise skills)
- agentic-test-runner (LLM test generation)
- ai-requirements-analyzer (PRD → test cases)
- n8n-enterprise-workflows (7 AI-powered workflows)

### Performance (2)
- performance-testing-k6 (k6, 5 test suites)
- rust-load-tester (Rust, Tokio, async)

### QA Tools (8)
- flaky-test-detective (pattern analysis, quarantine)
- test-retry-analyzer (bug/flaky/infra classification)
- test-impact-analyzer (git-based test selection)
- test-data-factory (traits, sequences, faker)
- visual-regression-toolkit (pixelmatch, CLI)
- a11y-audit-engine (axe-core, WCAG 2.2)
- security-testing-pipeline (SAST, deps, secrets)
- schema-drift-detector (breaking change detection)

### Infrastructure (5)
- ci-pipeline-templates (7 workflow templates)
- docker-test-environments (4 Docker Compose envs)
- api-mock-server (configurable mock, Docker)
- webhook-tester (capture, inspect, replay)
- http-status-checker (parallel health checks)
- env-config-validator (.env schema validation)
- log-analyzer-cli (error grouping, patterns)

### Dashboards (3)
- qa-dash (unified aggregator, 44 tests)
- qa-metrics-dashboard (real-time metrics)
- test-observability-platform (release readiness)
- test-reporting-aggregator (multi-framework merge)

## Section 4 — Tech Stack

Section title: "Tech Stack"

6 language cards in a row, each showing:
- Language icon/logo
- Language name
- Frameworks below

| Language | Frameworks |
|----------|-----------|
| TypeScript | Playwright, Vitest, Express |
| Java | Selenium, REST Assured, TestNG |
| C# | Playwright .NET, SpecFlow, NUnit |
| Python | Robot Framework, pytest |
| Rust | Tokio, reqwest, clap |
| JavaScript | k6, Node.js, Express |

Below: Tool badges row — Claude API, MCP, n8n, GitHub Actions, Docker, Pact, axe-core

## Section 5 — Contact

Dark gradient section. Centered.

Title: "Let's build something that doesn't break."
Subtitle: "Available for QA automation, AI enablement, and org-level transformation."

3 CTA buttons:
- "Hire on Upwork" (solid purple, Upwork icon)
- "GitHub Profile" (outline, GitHub icon)
- "LinkedIn" (outline, LinkedIn icon)

Footer: "Built by Muhammad Mustafa · Quvantic"

## Responsive Behavior

- **Desktop (>1024px):** Full split hero, 4-col What I Do, tab bar horizontal, 3-col project grid
- **Tablet (768-1024px):** Hero stacks (text above stats), 2-col cards, tabs scroll horizontal
- **Mobile (<768px):** Single column everything, tabs become horizontal scroll pills, project cards full-width

## Animations

- Hero stat numbers: count-up animation on scroll into view
- Cards: subtle fade-in-up on scroll (staggered, 100ms delay between cards)
- Tab switch: crossfade content (200ms)
- No parallax, no heavy animations — fast and clean

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Complete rewrite — new sections, new structure |
| `css/style.css` | Complete rewrite — new design system |
| `js/main.js` | Rewrite — tab switching, count-up, scroll animations |
| `render.yaml` | No change (static site config stays same) |

## Success Criteria

1. Lighthouse Performance score > 90
2. All 44 repos visible and categorized
3. Mobile responsive — looks great on iPhone/Android
4. First meaningful paint < 1.5s
5. No JavaScript frameworks — pure HTML/CSS/JS for speed
6. Deployed on Render, same URL works
