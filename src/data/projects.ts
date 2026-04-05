export type Category = "e2e" | "api" | "ai" | "perf" | "tools" | "infra" | "dash";

export interface Project {
  name: string;
  repo: string;
  description: string;
  tags: string[];
  category: Category;
}

export const categories: { key: Category | "all"; label: string; count: number }[] = [
  { key: "all", label: "All", count: 44 },
  { key: "e2e", label: "E2E & Mobile", count: 8 },
  { key: "api", label: "API Testing", count: 5 },
  { key: "ai", label: "AI & Claude", count: 7 },
  { key: "perf", label: "Performance", count: 2 },
  { key: "tools", label: "QA Tools", count: 8 },
  { key: "infra", label: "Infrastructure", count: 7 },
  { key: "dash", label: "Dashboards", count: 4 },
];

export const projects: Project[] = [
  // E2E & Mobile
  { name: "Playwright Enterprise Framework", repo: "playwright-enterprise-framework", description: "54 tests, POM, test.step(), faker, Allure, Docker", tags: ["Playwright", "TypeScript", "v2.0.0"], category: "e2e" },
  { name: "Cypress BDD Starter", repo: "cypress-bdd-starter", description: "19 BDD scenarios, Cucumber, Gherkin, Page Objects", tags: ["Cypress", "Cucumber", "BDD"], category: "e2e" },
  { name: "Selenium Java Framework", repo: "selenium-java-framework", description: "13 tests, TestNG, Allure, ThreadLocal POM, parallel", tags: ["Selenium 4", "Java", "TestNG"], category: "e2e" },
  { name: "Playwright .NET Framework", repo: "dotnet-playwright-framework", description: "13 tests, NUnit, FluentAssertions, parallel execution", tags: ["Playwright .NET", "C#", "NUnit"], category: "e2e" },
  { name: "SpecFlow BDD Framework", repo: "specflow-bdd-framework", description: "12 Gherkin scenarios, SpecFlow, Selenium, LivingDoc", tags: ["SpecFlow", "C#", "Gherkin"], category: "e2e" },
  { name: "Robot Framework Enterprise", repo: "robot-framework-enterprise", description: "20 tests, SeleniumLibrary + RequestsLibrary, POM", tags: ["Robot Framework", "Python"], category: "e2e" },
  { name: "Appium Mobile Framework", repo: "appium-mobile-framework", description: "7 tests, Android/iOS, gesture helpers, cross-platform POM", tags: ["Appium 2.0", "Java", "TestNG"], category: "e2e" },
  { name: "Maestro Mobile Testing", repo: "maestro-mobile-testing", description: "7 YAML flows, modern mobile testing for Android/iOS", tags: ["Maestro", "YAML", "Mobile"], category: "e2e" },

  // API
  { name: "API Testing Suite", repo: "api-testing-suite", description: "41 tests, factory pattern, retry, request logging", tags: ["SuperTest", "TypeScript", "v2.0.0"], category: "api" },
  { name: "REST Assured API Testing", repo: "restassured-api-testing", description: "12 tests, POJO, schema validation, Allure", tags: ["REST Assured", "Java", "JUnit 5"], category: "api" },
  { name: "GraphQL Testing Suite", repo: "graphql-testing-suite", description: "22 tests, schema validation, response assertions", tags: ["GraphQL", "TypeScript"], category: "api" },
  { name: "Contract Testing Pact", repo: "contract-testing-pact", description: "Consumer + provider verification, PactV4", tags: ["Pact.io", "TypeScript", "Express"], category: "api" },
  { name: "Playwright API Testing", repo: "playwright-api-testing", description: "14 tests, API testing without browser", tags: ["Playwright", "APIRequestContext"], category: "api" },

  // AI & Claude
  { name: "AI Test Orchestrator", repo: "ai-test-orchestrator", description: "5-stage pipeline: generate → validate → execute → analyze → self-heal", tags: ["AI Pipeline", "Self-Healing"], category: "ai" },
  { name: "AI Code Reviewer", repo: "ai-code-reviewer", description: "Claude API reviews PRs, posts severity-rated findings", tags: ["Claude API", "GitHub Webhooks"], category: "ai" },
  { name: "MCP Server Toolkit", repo: "mcp-server-toolkit", description: "4 MCP servers (GitHub, Jira, PostgreSQL, Slack), 13 tools", tags: ["MCP SDK", "Claude"], category: "ai" },
  { name: "Claude Code Skills", repo: "claude-code-skills", description: "6 enterprise skills: PR review, test gen, docs, migration", tags: ["Claude Code", "Enterprise"], category: "ai" },
  { name: "Agentic Test Runner", repo: "agentic-test-runner", description: "Natural language → Playwright tests via LLM", tags: ["AI", "Playwright", "LLM"], category: "ai" },
  { name: "AI Requirements Analyzer", repo: "ai-requirements-analyzer", description: "PRDs → structured test cases with coverage analysis", tags: ["AI", "Requirements", "CLI"], category: "ai" },
  { name: "n8n Enterprise Workflows", repo: "n8n-enterprise-workflows", description: "7 AI-powered workflows: CI alerts, PR review, standup bot", tags: ["n8n", "Claude API", "Slack"], category: "ai" },

  // Performance
  { name: "Performance Testing k6", repo: "performance-testing-k6", description: "5 test suites: smoke, load, stress, spike, soak", tags: ["k6", "JavaScript", "v2.0.0"], category: "perf" },
  { name: "Rust Load Tester", repo: "rust-load-tester", description: "Async load testing CLI, Tokio, percentiles", tags: ["Rust", "Tokio", "reqwest"], category: "perf" },

  // QA Tools
  { name: "Flaky Test Detective", repo: "flaky-test-detective", description: "60 tests, pattern analysis, quarantine", tags: ["TypeScript", "SQLite", "v2.0.0"], category: "tools" },
  { name: "Test Retry Analyzer", repo: "test-retry-analyzer", description: "Classify retries: bug vs flaky vs infra", tags: ["TypeScript", "CLI"], category: "tools" },
  { name: "Test Impact Analyzer", repo: "test-impact-analyzer", description: "Git diff → run only affected tests, save 50-80% CI time", tags: ["TypeScript", "Git"], category: "tools" },
  { name: "Test Data Factory", repo: "test-data-factory", description: "28 tests, traits, sequences, associations, faker", tags: ["TypeScript", "faker"], category: "tools" },
  { name: "Visual Regression Toolkit", repo: "visual-regression-toolkit", description: "11 tests, pixel comparison, HTML reports", tags: ["pixelmatch", "TypeScript"], category: "tools" },
  { name: "A11y Audit Engine", repo: "a11y-audit-engine", description: "18 tests, WCAG 2.2, axe-core scoring", tags: ["axe-core", "Playwright"], category: "tools" },
  { name: "Security Testing Pipeline", repo: "security-testing-pipeline", description: "17 tests, SAST, dependency audit, secret detection", tags: ["Semgrep", "npm audit"], category: "tools" },
  { name: "Schema Drift Detector", repo: "schema-drift-detector", description: "11 tests, breaking change detection for APIs", tags: ["TypeScript", "OpenAPI"], category: "tools" },

  // Infrastructure
  { name: "CI Pipeline Templates", repo: "ci-pipeline-templates", description: "7 templates: Node, Python, Java, .NET, Rust, Playwright", tags: ["GitHub Actions", "Multi-stack"], category: "infra" },
  { name: "Docker Test Environments", repo: "docker-test-environments", description: "4 environments: Postgres, full-stack, Redis, MongoDB", tags: ["Docker Compose"], category: "infra" },
  { name: "API Mock Server", repo: "api-mock-server", description: "18 tests, JSON config, dynamic responses, replay", tags: ["Express", "TypeScript", "Docker"], category: "infra" },
  { name: "Webhook Tester", repo: "webhook-tester", description: "14 tests, capture, inspect, replay webhooks", tags: ["Express", "TypeScript"], category: "infra" },
  { name: "HTTP Status Checker", repo: "http-status-checker", description: "11 tests, parallel health checks, CI exit codes", tags: ["TypeScript", "CLI"], category: "infra" },
  { name: "Env Config Validator", repo: "env-config-validator", description: "20 tests, .env schema validation, 7 types", tags: ["TypeScript", "CLI"], category: "infra" },
  { name: "Log Analyzer CLI", repo: "log-analyzer-cli", description: "15 tests, error grouping, pattern detection", tags: ["TypeScript", "CLI"], category: "infra" },

  // Dashboards
  { name: "QA Dash", repo: "qa-dash", description: "44 tests, aggregate results from 6 frameworks", tags: ["TypeScript", "CLI", "v2.0.0"], category: "dash" },
  { name: "QA Metrics Dashboard", repo: "qa-metrics-dashboard", description: "Real-time metrics, pass rate trends, coverage", tags: ["Express", "Chart.js"], category: "dash" },
  { name: "Test Observability Platform", repo: "test-observability-platform", description: "10 tests, release readiness scoring, flakiness detection", tags: ["TypeScript", "Multi-Framework"], category: "dash" },
  { name: "Test Reporting Aggregator", repo: "test-reporting-aggregator", description: "7 tests, merge Playwright/Jest/JUnit results", tags: ["TypeScript", "CLI"], category: "dash" },
];

export const categoryColors: Record<Category, string> = {
  e2e: "border-l-purple-400",
  api: "border-l-blue-400",
  ai: "border-l-orange-400",
  perf: "border-l-emerald-400",
  tools: "border-l-cyan-400",
  infra: "border-l-violet-400",
  dash: "border-l-pink-400",
};
