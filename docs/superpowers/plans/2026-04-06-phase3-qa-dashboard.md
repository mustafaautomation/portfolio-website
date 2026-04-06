# Phase 3: QA Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a live QA Dashboard web app where users upload JUnit/Playwright/Jest/k6 test results and see aggregated metrics, trends, flakiness detection, and release readiness scoring.

**Architecture:** New Next.js 16 repo (`quvantic-qa-dashboard`) with App Router. File upload via API route, in-memory storage for demo, Recharts for charts. No auth required. Sample data pre-loaded.

**Tech Stack:** Next.js 16, Tailwind CSS v4, Recharts, fast-xml-parser (JUnit), Vercel

---

## File Structure

```
quvantic-qa-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (shared design system)
│   │   ├── globals.css          # Signal Blue tokens (copy from quvantic-website)
│   │   ├── page.tsx             # Dashboard page (main UI)
│   │   └── api/
│   │       ├── upload/route.ts  # POST — upload and parse test results
│   │       ├── results/route.ts # GET — retrieve all parsed results
│   │       └── export/route.ts  # GET — export as JSON
│   ├── components/
│   │   ├── Nav.tsx              # Minimal nav (Quvantic logo + back link)
│   │   ├── UploadZone.tsx       # Drag-and-drop file upload
│   │   ├── SummaryCards.tsx     # Total, passed, failed, skipped, duration, pass rate
│   │   ├── TrendChart.tsx       # Pass rate trend line chart (Recharts)
│   │   ├── FrameworkBreakdown.tsx # Framework pie/bar chart
│   │   ├── FlakyTests.tsx       # Flaky test detection list
│   │   ├── TopFailures.tsx      # Most common failures
│   │   ├── ReadinessScore.tsx   # Release readiness grade (A-F)
│   │   └── ExportButton.tsx     # Download report as JSON
│   ├── lib/
│   │   ├── store.ts             # In-memory result store (server-side)
│   │   ├── parsers/
│   │   │   ├── index.ts         # Auto-detect and route to correct parser
│   │   │   ├── junit.ts         # JUnit XML parser
│   │   │   ├── playwright.ts    # Playwright JSON parser
│   │   │   ├── jest.ts          # Jest JSON parser
│   │   │   └── k6.ts            # k6 JSON parser
│   │   ├── aggregator.ts        # Aggregate results across frameworks
│   │   ├── flakiness.ts         # Detect flaky tests across uploads
│   │   └── readiness.ts         # Release readiness scoring (A-F)
│   └── data/
│       └── sample.ts            # Pre-loaded sample data for first visit
├── public/
│   └── favicon.ico
├── next.config.ts
├── package.json
└── .github/workflows/ci.yml
```

---

### Task 1: Scaffold + Design System

**Files:**
- Create: entire project scaffold

- [ ] **Step 1: Create Next.js project**

```bash
cd /tmp
npx create-next-app@latest quvantic-qa-dashboard --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

- [ ] **Step 2: Install dependencies**

```bash
cd /tmp/quvantic-qa-dashboard
npm install recharts fast-xml-parser
```

- [ ] **Step 3: Copy globals.css from quvantic-website**

Copy the Signal Blue design system (same @theme inline, .text-gradient, .grain, .grid-bg, etc.) from /tmp/quvantic-website/src/app/globals.css

- [ ] **Step 4: Write layout.tsx**

Root layout with Space Grotesk + Inter + JetBrains Mono fonts. Metadata: "QA Dashboard — Quvantic". Body with grain grid-bg classes. Import a minimal Nav component.

- [ ] **Step 5: Write minimal Nav.tsx**

Simple nav with "Quvantic" logo linking to https://quvantic.com, "QA Dashboard" title, and dark border bottom.

- [ ] **Step 6: Build and commit**

```bash
npx next build
git init && git add -A
git commit -m "feat: scaffold QA Dashboard with Signal Blue design system"
gh repo create mustafaautomation/quvantic-qa-dashboard --public --source=. --push
```

---

### Task 2: Parsers — JUnit, Playwright, Jest, k6

**Files:**
- Create: `src/lib/parsers/junit.ts`
- Create: `src/lib/parsers/playwright.ts`
- Create: `src/lib/parsers/jest.ts`
- Create: `src/lib/parsers/k6.ts`
- Create: `src/lib/parsers/index.ts`

- [ ] **Step 1: Define shared types**

```typescript
// src/lib/types.ts
export interface TestResult {
  name: string;
  suite: string;
  framework: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
  error?: string;
}

export interface ParsedUpload {
  id: string;
  filename: string;
  framework: string;
  timestamp: string;
  tests: TestResult[];
  summary: { total: number; passed: number; failed: number; skipped: number; duration: number; passRate: number };
}
```

- [ ] **Step 2: Write JUnit parser**

Parse XML using fast-xml-parser. Extract testcase elements. Map failure/error/skipped elements to status. Return TestResult[].

- [ ] **Step 3: Write Playwright parser**

Parse JSON with suites[].tests[] structure. Recursively extract from nested suites. Map status (expected→passed, unexpected→failed).

- [ ] **Step 4: Write Jest parser**

Parse JSON with numTotalTests + testResults[].testResults[] structure. Map ancestorTitles to suite.

- [ ] **Step 5: Write k6 parser**

Parse JSON with metrics.*.thresholds structure. Map ok→passed, !ok→failed.

- [ ] **Step 6: Write auto-detect index**

```typescript
// src/lib/parsers/index.ts
export function parseFile(content: string, filename: string): TestResult[] {
  if (filename.endsWith(".xml")) return parseJunit(content);
  const data = JSON.parse(content);
  if (data.suites) return parsePlaywright(data);
  if (data.numTotalTests !== undefined) return parseJest(data);
  if (data.metrics && data.root_group) return parseK6(data);
  if (Array.isArray(data)) return parseGeneric(data);
  return [];
}
```

- [ ] **Step 7: Build and commit**

```bash
npx next build
git add src/lib/ && git commit -m "feat: add test result parsers (JUnit, Playwright, Jest, k6)"
git push origin main
```

---

### Task 3: In-Memory Store + API Routes

**Files:**
- Create: `src/lib/store.ts`
- Create: `src/app/api/upload/route.ts`
- Create: `src/app/api/results/route.ts`
- Create: `src/app/api/export/route.ts`
- Create: `src/data/sample.ts`

- [ ] **Step 1: Write in-memory store**

Server-side singleton that stores ParsedUpload[]. Methods: addUpload(), getAll(), clear(). Pre-load with sample data on first access.

- [ ] **Step 2: Write sample data**

Realistic sample with 3 uploads: Playwright (15 tests, 1 failed), Jest (20 tests, all pass), JUnit (10 tests, 2 failed, 1 skipped). Include variety of suites and durations.

- [ ] **Step 3: Write upload API route**

POST /api/upload — accepts multipart form data with file. Read file content, detect format, parse, store. Return parsed summary.

- [ ] **Step 4: Write results API route**

GET /api/results — return all stored uploads with summaries.

- [ ] **Step 5: Write export API route**

GET /api/export — return full data as downloadable JSON file.

- [ ] **Step 6: Build and commit**

```bash
npx next build
git add src/ && git commit -m "feat: add in-memory store, API routes, and sample data"
git push origin main
```

---

### Task 4: Aggregator + Flakiness + Readiness Logic

**Files:**
- Create: `src/lib/aggregator.ts`
- Create: `src/lib/flakiness.ts`
- Create: `src/lib/readiness.ts`

- [ ] **Step 1: Write aggregator**

Takes ParsedUpload[], returns: total tests across all uploads, per-framework breakdown (framework name, total, passed, failed, passRate), overall pass rate, total duration.

- [ ] **Step 2: Write flakiness detector**

Compare test names across uploads. A test is flaky if it has both "passed" and "failed" across different uploads. Return list with: test name, flip count, last status.

- [ ] **Step 3: Write readiness scorer**

Score 0-100 based on: E2E pass rate (weight 25%), unit pass rate (15%), no critical failures (30%), flaky count below threshold (15%), total coverage (15%). Grade: A=90+, B=80+, C=70+, D=60+, F=below 60. Return score, grade, blockers[].

- [ ] **Step 4: Build and commit**

```bash
npx next build
git add src/lib/ && git commit -m "feat: add aggregator, flakiness detection, and readiness scoring"
git push origin main
```

---

### Task 5: Upload Zone Component

**Files:**
- Create: `src/components/UploadZone.tsx`

- [ ] **Step 1: Write drag-and-drop upload component**

"use client" component with:
- Drag-and-drop zone with dashed border
- File input (hidden) triggered by click
- Accept: .xml, .json
- On drop/select: read file, POST to /api/upload, call onUpload callback
- States: idle, dragging (border blue), uploading (spinner), done (checkmark)
- Text: "Drop JUnit XML, Playwright JSON, or Jest JSON here"

- [ ] **Step 2: Build and commit**

```bash
npx next build
git add src/components/UploadZone.tsx && git commit -m "feat: add drag-and-drop upload zone"
git push origin main
```

---

### Task 6: Dashboard UI — Summary Cards + Charts

**Files:**
- Create: `src/components/SummaryCards.tsx`
- Create: `src/components/TrendChart.tsx`
- Create: `src/components/FrameworkBreakdown.tsx`
- Create: `src/components/TopFailures.tsx`
- Create: `src/components/FlakyTests.tsx`
- Create: `src/components/ReadinessScore.tsx`
- Create: `src/components/ExportButton.tsx`

- [ ] **Step 1: Write SummaryCards**

6 cards in a grid: Total Tests, Pass Rate (with color), Passed (green), Failed (red), Skipped (yellow), Duration (formatted).

- [ ] **Step 2: Write TrendChart**

Recharts LineChart showing pass rate per upload (x = upload timestamp, y = pass rate %). Blue line, dark background, minimal axis.

- [ ] **Step 3: Write FrameworkBreakdown**

Recharts BarChart showing tests per framework. Stacked bars: passed (green), failed (red), skipped (yellow).

- [ ] **Step 4: Write TopFailures**

List of most-failed tests across all uploads. Show: test name, failure count, last error snippet. Max 10.

- [ ] **Step 5: Write FlakyTests**

List of tests that flip between pass/fail. Show: test name, flip count, current status. Warning icon.

- [ ] **Step 6: Write ReadinessScore**

Big grade letter (A-F) with color. Score percentage. Blockers list. Green/red styling based on ready/not ready.

- [ ] **Step 7: Write ExportButton**

Button that fetches /api/export and triggers JSON download.

- [ ] **Step 8: Build and commit**

```bash
npx next build
git add src/components/ && git commit -m "feat: add dashboard UI components with charts"
git push origin main
```

---

### Task 7: Main Dashboard Page — Wire Everything Together

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write dashboard page**

"use client" page that:
1. On mount: fetch /api/results, compute aggregated stats
2. Layout: UploadZone at top, then SummaryCards, then 2-column grid (TrendChart + FrameworkBreakdown), then ReadinessScore, then TopFailures + FlakyTests side by side, ExportButton at bottom
3. On upload success: refetch /api/results and recompute
4. Loading state while fetching

- [ ] **Step 2: Build and verify end-to-end**

```bash
npx next build
npm run dev  # verify manually: upload a file, see dashboard update
```

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx && git commit -m "feat: wire dashboard page with all components"
git push origin main
```

---

### Task 8: CI + Deploy to Vercel

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write CI workflow**

Same as quvantic-website: checkout, setup node 20, npm ci, npx next build.

- [ ] **Step 2: Deploy**

```bash
npx vercel --prod --yes
```

- [ ] **Step 3: Verify and commit**

```bash
curl -s -o /dev/null -w "%{http_code}" <URL>  # expect 200
git add .github/ && git commit -m "feat: add CI and deploy to Vercel"
git push origin main
```

---

## Self-Review

**Spec coverage:**
- Upload & Parse (JUnit, Playwright, Jest, k6): Tasks 2, 3, 5
- Dashboard view (summary, trends, framework, flakiness, top failures): Task 6
- Release readiness (score, grade, blockers): Tasks 4, 6
- In-memory storage, sample data: Task 3
- Export as JSON: Tasks 3, 6
- No auth: confirmed (no auth anywhere)
- CI + Deploy: Task 8

**No gaps. All spec requirements covered.**
