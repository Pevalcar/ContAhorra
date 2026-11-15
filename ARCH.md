# ContAhorra — Architecture & Constitution

> Last updated: 2025-01-15
> Branch: `ai-mcp-integration`

---

## 📜 Constitution

These principles are **binding**. Any change that violates them must be rejected or refactored before merging.

### C1 — Offline-First, Always
Data writes go to SQLite local first, period. Remote sync via Supabase is best-effort only. Every repository method MUST succeed when offline. The `uptodataBase` flag on every entity tracks whether it has been uploaded. Never throw an error because there's no network — queue it for later.

**Rule:** If a use-case can fail due to network, wrap it in try/catch and log, never bubble up.

### C2 — Domain Purity
Entities in `lib/domain/entities/` know nothing about databases, networks, HTTP, or UI frameworks. Use-cases in `lib/domain/usecases/` contain zero framework imports — they call repository interfaces, not implementations. If adding a feature requires importing `expo-sqlite` inside a use-case, you've broken the boundary. Move the DB call to the repository.

**Rule:** `domain/` imports nothing from `lib/`, `components/`, or `app/`.

### C3 — Store Simplicity
Zustand stores in `lib/store/` hold only two things: (1) UI-derived state (loading flags, active filters, selected tabs), and (2) orchestration of use-cases through the DI container. Stores must NEVER import repositories directly. Keep each store under 200 lines; if it grows larger, extract sub-stores.

**Rule:** A store action calls `Container.useCase.execute()`, not `repository.method()`.

### C4 — Component Contracts
Every component declares its props as a named interface (`interface Props { ... }`). No inline prop types. Components receive data via props or custom hooks — never direct store access (`useTransaccionesStore()` inside a presentational component is forbidden). Business logic belongs in `lib/Hooks/`.

**Rule:** If a component needs to fetch data, it uses a hook from `lib/Hooks/`, not a store directly.

### C5 — Navigation by File Convention
Routes are defined purely by file location under `app/`. Layout nesting follows Expo Router conventions: parentheses groups `(drawer)` and `(tabs)` are resolved automatically. Adding a new page means creating one `.tsx` file — no router config edits needed. Drawer items are declared in `CustomDrawer.tsx`.

**Rule:** New screens go in `app/`. New tab/drawer items go in the respective layout group + CustomDrawer.

### C6 — i18n from Day One
All user-visible text flows through `useTranslation()` from `react-i18next`. Translation keys live in `i18n/locales/en.json` and `es.json`. When adding a new string, add it to BOTH files. The app defaults to `es-CO` (Colombian Spanish) and falls back to English.

**Rule:** Zero hardcoded Spanish or English strings in components.

### C7 — AI Augments, Never Decides
AI features (OpenAI/Ollama) provide **suggestions only** — categorization recommendations, spending insights, anomaly alerts. They never auto-write data, never overwrite categories without confirmation, and never make financial decisions. The human approves everything. AI results are always labeled "Suggested" in the UI.

**Rule:** No AI write path exists. All AI outputs flow through a confirmation step.

### C8 — Dependency Gate
Adding an npm package requires justification: (1) solves a problem no existing dependency can solve, (2) adds less than 5KB gzipped, (3) is tree-shakeable or has small bundles. Prefer React Native built-ins, expo modules, or existing packages before introducing new ones.

**Rule:** PRs adding dependencies require a one-line justification comment in package.json.

---

## 🏛️ Architectural Decisions

### ADR-001: SQLite Local + Supabase Remote (Pending Sync)
**Decision:** Use expo-sqlite as the single source of truth for writes. Supabase is configured but sync is not yet implemented.

**Context:** Small business users need reliability offline. Data loss from network issues is unacceptable.

**Consequence:** The `uptodataBase` boolean on every entity tracks sync state. Future work will implement push-based sync when connectivity is detected.

**Status:** Active. Sync implementation is the highest-priority pending task.

---

### ADR-002: Zustand for State Management
**Decision:** Use Zustand (not Redux, not Context API) for all global state.

**Context:** The project has ~9 stores managing transactions, categories, accounts, profiles, themes, session, notifications. Zustand provides minimal boilerplate with good TypeScript support.

**Consequence:** Stores are simple `create<T>()` calls. No middleware needed. Action patterns are consistent across all stores.

**Status:** Active. Pattern is well-established in the codebase.

---

### ADR-003: Gluestack-UI + NativeWind for Styling
**Decision:** Gluestack-UI provides semantic components (Button, Modal, Toast, etc.) while NativeWind maps Tailwind classes to React Native styles.

**Context:** Gluestack-UI handles accessibility, focus states, and platform differences. NativeWind enables rapid styling with familiar CSS-like syntax.

**Consequence:** ~50 base UI primitives available. Color tokens use CSS variables (`--color-primary-500`) mapped in `tailwind.config.js`. Dark mode toggles the `mode` prop on `GluestackUIProvider`.

**Status:** Active. Well-used across all screens.

---

### ADR-004: DI Container for Use-Case Wiring
**Decision:** All use-cases are instantiated once in `lib/core/di/Container.ts` and exported as singleton instances.

**Context:** Use-cases depend on repositories (local + remote). Creating them per-call would duplicate repository instances and break singleton expectations.

**Consequence:** New use-cases must be added to Container.ts and re-exported. Stores import from the container, not from individual use-case files.

**Status:** Active. All 20+ use-cases wired here.

---

### ADR-005: OpenSpec for Change Management
**Decision:** Use OpenSpec (spec-driven schema) to manage feature changes through proposals, designs, and tasks — not informal branching.

**Context:** Multiple parallel features (AI, charts, sync, wallet) need structured tracking. Ad-hoc branches lead to drift and forgotten work.

**Consequence:** Each feature starts as `openspec new change "<name>"`, gets a proposal, design, and task list before implementation begins.

**Status:** Initialized. No changes created yet. Skills installed at `.agents/skills/`.

---

### ADR-006: MCP Tools for Financial Data Access
**Decision:** Expose transaction data, category analysis, and budget tools via Model Context Protocol servers so AI agents can query the app's data.

**Context:** The Pi agent needs read-only access to understand what's in the database without parsing code. MCP provides standardized tool discovery.

**Consequence:** `scripts/create-mcp-server.js` runs as a stdio server. `lib/skills/mcp-tools/` defines the tool schemas. Connected via `.pi/mcp.json`.

**Status:** Infrastructure complete. Server implementation pending full database integration.

---

## 🗺️ Current State Map

```
                    ┌──────────────────────────────┐
                    │         EXPO + RN            │
                    │    (SDK 51 / RN 0.74)        │
                    └──────────────┬───────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              v                    v                    v
    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │   APP LAYER     │  │  COMPONENTS     │  │    ROUTES       │
    │  (expo-router)  │  │ (Gluestack+NW)  │  │  (file-based)   │
    │                 │  │                 │  │                 │
    │ • Dashboard     │  │ • AddTransaction│  │ • /(tabs)/      │
    │ • Editor        │  │ • Cuentas       │  │ • login         │
    │ • Bolsillo      │  │ • Login         │  │ • add_*.tsx     │
    │ • Reports       │  │ • Editor/*      │  │ • config        │
    │ • Config        │  │ • ui/* (~50)    │  │ • bolsillo      │
    └────────┬────────┘  └─────────────────┘  └─────────────────┘
             │
             v
    ┌──────────────────────────────┐
    │        HOOKS LAYER           │
    │   lib/Hooks/*.ts             │
    │   • useLogin                 │
    │   • useCalculadora           │
    │   • useProfile               │
    │   • useToast                 │
    └────────────────┬─────────────┘
                     │
         ┌───────────┼───────────┐
         v           v           v
  ┌────────────┐ ┌──────────┐ ┌────────────┐
  │   STORES   │ │  DOMAIN   │ │   AI/MCP   │
  │  (Zustand) │ │ (pure)   │ │ (new)      │
  │            │ │          │ │            │
  │ Transaccio-│ │ Entities │ │ OpenAI     │
  │ nesStore   │ │ UseCases │ │ Provider   │
  │ Categoria  │ │ Repos I  │ │ Analysis   │
  │ Store      │ │          │ │ Service    │
  │ Cuenta     │ │          │ │ MCP Tools  │
  │ Store      │ │          │ │ Extension  │
  │ Sesion     │ │          │ │            │
  │ Theme      │ │          │ │            │
  │ Store      │ │          │ │            │
  └─────┬──────┘ └────┬─────┘ └─────┬──────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
                      v
            ┌───────────────────────┐
            │    DATA LAYER         │
            │                       │
            │  Local: expo-sqlite   │
            │  Remote: Supabase     │
            │  Auth: Supabase Auth  │
            └───────────────────────┘
```

---

## 🚦 Health Indicators

| Signal | Status | Notes |
|--------|--------|-------|
| TypeScript errors | ✅ Clean | Strict mode, no `.d.ts` hacks needed |
| ESLint violations | ✅ Clean | Standard Expo config + Prettier |
| Store size (>200 lines) | ⚠️ Watch | `TransaccionesStore.ts` at ~180 lines |
| Entity framework coupling | ✅ Clean | All entities are plain classes |
| Test coverage | 🔴 Low | 1 test file for entire codebase |
| Sync implementation | 🔴 Not started | Highest priority remaining work |
| Charts screen | 🔴 Stub | `grafics.tsx` is empty |
| AI integration | 🟡 Partial | Providers done, UI hooks pending |
