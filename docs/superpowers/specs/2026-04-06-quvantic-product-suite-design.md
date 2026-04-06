# Quvantic Product Suite + Business Website — Design Spec

## Goal

Build a product suite of 4 web apps + 1 business website that showcases Quvantic's QA Automation and AI Enablement capabilities through live, working products — not just code repos.

## Projects (5 separate repos, same stack)

| # | App | Subdomain | Purpose |
|---|-----|-----------|---------|
| 1 | Quvantic Website | quvantic.com | Full business site: landing, services, products, case studies, blog, contact |
| 2 | QA Dashboard | qa-dashboard.quvantic.com | Upload test results (JUnit/Playwright/Jest), view metrics, trends, flakiness |
| 3 | AI Test Generator | testgen.quvantic.com | Paste URL/spec/PRD, generate Playwright/Jest tests |
| 4 | Repo Health Scanner | reposcan.quvantic.com | Paste GitHub URL, analyze CI/tests/security/health |
| 5 | Portfolio | portfolio.quvantic.com | Existing portfolio site (fix 404, add subdomain) |

## Shared Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Fonts:** Space Grotesk (headings) + Inter (body) + JetBrains Mono (code)
- **Palette:** Signal Blue #326BFF, Violet #8F42EC, Dark #0A0A0A
- **Deploy:** Vercel (auto-deploy from GitHub)
- **Branding:** Quvantic logo, consistent nav, dark mode, grain texture

## App 1: Quvantic Website (quvantic.com)

### Pages

**Home**
- Hero: "We build QA infrastructure that doesn't break" tagline
- Stats: 44+ repos, 100% job success, 6 languages, 585+ tests written
- Product cards linking to QA Dashboard, AI TestGen, Repo Scanner
- Client logos or Upwork badge
- CTA: "Hire Us on Upwork" + "Explore Products"

**Services**
- QA Automation: E2E, API, performance, visual, a11y testing across 6 languages
- AI Enablement: Claude API, MCP servers, n8n workflows, self-healing pipelines
- Org-Level Transform: Take teams from manual to AI-powered workflows
- Each service: description, deliverables, technologies, CTA

**Products**
- Cards for each of the 3 apps with screenshots and "Try it" CTAs
- Brief description of what each does

**Case Studies**
- 3-4 anonymized stories from Upwork work
- Format: Challenge > Solution > Results > Tech Used
- Metrics: "Reduced test time by X%", "Achieved 100% CI green"

**Blog**
- MDX-based technical articles
- Categories: QA, AI, Tools, Tutorials
- Initial articles: "How I Built 44 Production-Grade Repos", "Self-Healing Tests with Claude API"

**Contact**
- Upwork CTA (primary)
- LinkedIn link
- Email contact form (Formspree or similar)
- "Available for hire" badge

### Technical Details
- Static generation (SSG) for all pages except blog
- MDX for blog posts with code highlighting
- SEO metadata per page
- Sitemap + robots.txt

## App 2: QA Dashboard (qa-dashboard.quvantic.com)

### Features

**Upload & Parse**
- Drag-and-drop file upload zone
- Supported formats: JUnit XML, Playwright JSON, Jest JSON, k6 JSON, generic CSV
- Auto-detect format from file structure
- Parses using logic from `test-reporting-aggregator` and `test-observability-platform`

**Dashboard View**
- Summary cards: total tests, pass rate, failed, skipped, duration
- Pass rate trend chart (last 10 uploads)
- Framework breakdown (pie/bar chart)
- Flakiness detection: flag tests that flip between pass/fail across uploads
- Top failures list with occurrence count

**Release Readiness**
- Score (A-F grade) based on `test-observability-platform` readiness logic
- Blockers list (e.g., "E2E pass rate below 90%")
- Signal breakdown by test type (e2e, unit, security, performance)

### Technical Details
- File upload via API route (no external storage — in-memory for demo)
- Charts: lightweight library (Recharts or Chart.js)
- No auth required — demo-friendly
- Sample data pre-loaded for first-time visitors
- Export report as JSON

## App 3: AI Test Generator (testgen.quvantic.com)

### Features

**Input Modes**
1. **URL mode:** Paste a web URL, app crawls key elements, generates E2E tests
2. **OpenAPI mode:** Paste/upload OpenAPI YAML/JSON, generates API tests
3. **PRD mode:** Paste requirements text, generates test cases (not code)

**Generation**
- Uses `ai-testgen` parser logic for OpenAPI and PRD
- Uses `ai-requirements-analyzer` for PRD → structured test cases
- Mock mode (default): generates using templates without LLM call
- Real mode (optional): user provides their own Anthropic/OpenAI API key

**Output**
- Generated test code displayed with syntax highlighting
- Download as .spec.ts file
- Copy to clipboard button
- Test count + coverage summary

### Technical Details
- API routes for parsing and generation
- Monaco editor or Shiki for code display
- No server-side LLM calls by default (templates only)
- Optional: user enters their API key in browser (stored in localStorage only)

## App 4: Repo Health Scanner (reposcan.quvantic.com)

### Features

**Input**
- Text field: paste any public GitHub repo URL
- "Scan" button

**Analysis (via GitHub public API)**
- CI Status: latest workflow run conclusion (pass/fail)
- Test Count: count test files by pattern (*.test.*, *.spec.*)
- Dependencies: count deps, check for known vulnerability patterns
- Code Quality: file count, language breakdown, README existence
- Activity: last commit date, commit frequency, open issues/PRs

**Report**
- Health score (0-100) with letter grade
- Category breakdown with icons
- Recommendations list ("Add CI", "Update dependencies", etc.)
- Compare with Quvantic repos (benchmark)

### Technical Details
- GitHub REST API (unauthenticated for public repos — 60 req/hr limit)
- Cache results for 1 hour to avoid rate limits
- No auth required for scanning
- Loading state with progress indicators

## App 5: Portfolio (portfolio.quvantic.com)

### What Needs Fixing
- Current Vercel deployment returning 404 — needs redeploy
- Connect to portfolio.quvantic.com subdomain
- Already built with Signal Blue design — no code changes needed
- Just deployment + DNS config

## Build Order

| Phase | Project | Estimated Scope |
|-------|---------|-----------------|
| 1 | Fix Portfolio (404) | Redeploy, verify |
| 2 | Quvantic Website | Full business site, 6 pages |
| 3 | QA Dashboard | Upload, parse, dashboard, charts |
| 4 | AI Test Generator | 3 input modes, template generation |
| 5 | Repo Scanner | GitHub API integration, scoring |

Each phase is independent — deploy and ship before starting the next.

## Shared Components

A `quvantic-ui` package or shared directory with:
- `<Nav />` — consistent navigation across all apps
- `<Footer />` — Quvantic branding, links
- `<Card />`, `<Badge />`, `<Button />` — design system atoms
- Color tokens, font config, grain/grid CSS

This can be a simple npm package or just copy-paste for MVP speed.

## Domain Strategy

- quvantic.com → main website
- qa-dashboard.quvantic.com → QA Dashboard
- testgen.quvantic.com → AI Test Generator
- reposcan.quvantic.com → Repo Scanner
- portfolio.quvantic.com → Portfolio

All deployed on Vercel, DNS via Cloudflare or Vercel domains.

## Success Criteria

1. All 5 sites live and accessible
2. Each app functional end-to-end (upload → result)
3. Quvantic.com has all 6 pages with real content
4. Shared branding consistent across all apps
5. Mobile responsive
6. SEO basics: meta tags, sitemap, OG images
7. Each app links back to quvantic.com
