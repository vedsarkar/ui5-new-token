---
title: "Embedding Ontology Builder visualization into Data Modeler — feasibility & path"
date: 2026-05-26
---

# Embedding Ontology Builder visualization into Data Modeler

**To:** Product Management (cc: Gaurav, Praveen Groover)
**From:** Andrew Borovin (UI CoE)
**Date:** 2026-05-26
**Status:** For decision

## TL;DR

**We agree with the goal — Data Modeler needs a model visualizer, and the Ontology Builder code is the right starting point.** What we cannot do is take that code and "just expose it" inside Data Modeler today.

The real blocker is **not the visualizer code itself — it is the Data Modeler shell.** Data Modeler runs on a software stack that is **three major versions behind** Ontology Builder on the two most critical libraries (React and Material UI). Three major versions is not a "compatibility issue" — it is six to seven years of accumulated breaking changes between the two stacks, and they cannot interoperate inside one application without substantial modernization of Data Modeler first.

The recommended path: **fully modernize the Data Modeler application onto the SAP Fiori migration target — React 16 → 18+, Material UI v4 → SAP UI5 Web Components React, JavaScript → TypeScript, Create React App → modern build pipeline — and then port the visualizer code from Ontology Builder into the modernized application and wire it to Reltio's Configuration API.** Estimated end-to-end: **~6 months calendar time, with 8 months as a realistic upper bound**, the bulk of which is the foundational modernization; the visualizer itself adds roughly 6 weeks on top. This pace assumes AI-augmented engineering throughout, a dedicated QA squad running existing e2e tests in parallel, planned deprecation of part of Data Modeler's surface area, and `@reltio/auth` absorbing the auth/RBAC migration — see "What makes this pace achievable" below.

The bulk of the work — and the bulk of the calendar time — is the **Data Modeler modernization, not the visualizer**. The visualizer code is, broadly, ready to be ported once it has somewhere modern to live. We are deliberately **not** proposing any kind of "modern subtree inside a legacy app" shortcut — running two major versions of React or Material UI side-by-side in one application is exactly the kind of architectural decision that produces hard-to-diagnose visual and behavioral regressions in a strategic production app. For Data Modeler, regressions are not an acceptable trade-off for a shorter timeline. Data Modeler is one of our strategic applications, and its modernization is overdue; the Visualizer feature is the right catalyst to start that investment now, with concrete customer-facing value delivered alongside it.

We need a decision on whether to fund this path.

## What was asked

> **"Team — We need to add the ontology viewer visualisation in Data Modeler. It will allow customers to show their data model visually. We have already built this for Reltio Ontology Builder. Just needs to be exposed via Data Modeler. @andrew.borovin the code is all done — Gaurav can share. Let's expose this via Data Modeler immediately."**

The request makes two assumptions:

1. *The code is all done* — i.e. the visualizer exists as a self-contained, reusable component.
2. *Just needs to be exposed* — i.e. inserting it into Data Modeler is a configuration/wiring task, measured in days.

Both assumptions are understandable from a product perspective — the visualizer **does** exist and **does** work in Ontology Builder. The reason "expose it immediately" doesn't translate to engineering effort is not about the visualizer; it is about the application it has to live inside. We explain that below.

## What "the code is all done" actually means today

Ontology Builder was built in ~6 weeks as a **customer-facing standalone product** for AI-assisted legacy-MDM migration. It was not built with reuse or embedding as a requirement. Two specific consequences for the Data Modeler ask:

**1. The visualization is welded to Ontology Builder's business domain.** The graph component (`VelocityPackDiagram`) expects data shaped as a *Velocity Pack* (a Reltio L3 template used by Ontology Builder to suggest a starting model) plus an *AI mapping result* (source-schema → Reltio mapping with confidence scores, custom-entity overlays). These concepts do not exist in Data Modeler. Data Modeler reads the tenant's actual L3 configuration from the Reltio Configuration API. The data layer has to be re-pointed before any UI work.

**2. The detail panel duplicates Data Modeler functionality.** Clicking a node in Ontology Builder opens a `DetailPanel` with embedded tabs for *Match*, *Survivorship*, *Cleansers*, and *Validation* rules. Data Modeler **already has dedicated edit pages for every one of these concerns**. The PRD for the Visualizer (see `Data_Model_Visualizer_PRD.docx`) explicitly says the visualizer must be **read-only** and route edit intent into Data Modeler's existing pages via "click-to-edit hand-off" — so a significant portion of what Ontology Builder's panel does is out of scope for Data Modeler's MVP and needs to be removed.

In product terms: **about 30% of the Ontology Builder UI is genuinely reusable for this use case** (the graph canvas, the layout/filter controls, a read-only summary). The other 70% is either domain-specific to legacy migration or duplicates functionality Data Modeler already ships.

But this is the smaller half of the problem. The larger half is the application Data Modeler itself.

## The real blocker: Data Modeler is three major versions behind

Data Modeler was first built in 2018 and has not been substantively modernized since. Ontology Builder was built in late 2025 / early 2026 on a current stack. Between them sit roughly six to seven years of major-version upgrades across the two libraries that define how a React application runs.

| Library | Data Modeler runs | Ontology Builder runs | Major versions apart |
|---|---|---|---|
| **React** (the UI engine) | v16 (Aug 2017) | v19 (Dec 2024) | **3 majors, ~7 years** |
| **Material UI** (UI component library) | v4 (Aug 2019) | v7 (May 2025) | **3 majors, ~6 years** |
| Build & routing tool | Create React App + craco | Next.js 16 | Different generation |
| Language | JavaScript | TypeScript | Different language |
| Styling system | LESS files | CSS Modules + Emotion | Different paradigm |
| State management | Redux + thunk (2018-era) | Hooks + local state | Different generation |
| Backend integration | Own Node/Express server | Java backend via Next proxy | Different APIs |

Three major versions apart on **both** of the two libraries that define how a React application renders is not a "version mismatch". It is two fundamentally different runtimes that happen to share a name.

### What "three major versions of React apart" means

Each React major release ships **deliberate breaking changes** to fundamental rendering semantics. Between v16 and v19 the React team has shipped:

- A new JSX runtime (v17).
- **Concurrent rendering**, Suspense for data fetching, automatic batching of state updates (v18). These are not opt-in features — they change how every component re-renders, how effects fire, and how event handlers batch.
- The new `useTransition` / `useDeferredValue` / `useSyncExternalStore` hooks (v18).
- The `use()` hook, `ref` as a regular prop, the Actions API, and compiler-friendly memo semantics (v19).

The Ontology Builder visualizer code is written against React 18/19 idioms. Its memoization assumptions, its effect timing, its ref handling, and its data-fetching patterns all assume modern React semantics. Running this code on React 16 doesn't just require import-path changes — it requires rewriting the parts that rely on concurrent rendering, the new ref model, and modern Suspense behavior.

### What "three major versions of Material UI apart" means

MUI's three-major-version sequence is, if anything, **more disruptive** than React's:

- **v4 → v5** was effectively a rewrite. Every import path changed (`@material-ui/core` → `@mui/material`), the entire styling engine moved from JSS to Emotion, the theme object structure changed, the `makeStyles` API was deprecated, and the official migration codemod has documented limitations on every non-trivial component. This single upgrade is the migration that most MUI v4 apps still have not finished.
- **v5 → v6** reworked the slot and customization system; many component overrides written for v5 stop working.
- **v6 → v7** changed default styling behavior, several component prop APIs, and the package layout.

The two MUI versions **cannot share a theme provider, cannot share a style cache, and routinely fight each other when loaded into the same page** — components from one version inherit broken or mis-cascading styles from the other, in ways that are expensive to reproduce and debug. Loading both MUI v4 and MUI v7 inside one application is not a "doubled bundle size" problem (it is that, too, at roughly ~600KB additional gzipped) — it is a visual-correctness problem that surfaces across the whole application, not just the new tab.

### What "different build tool" means

Create React App (which Data Modeler uses) was **officially deprecated by the React team in 2023** and receives no React 18 / 19 support, no modern bundler features, and no new lifecycle improvements. Ontology Builder is on Next.js 16, which is a fundamentally different build and routing system: file-based routes, server components, a different plugin model, a different proxy/middleware layer. Code does not move between the two by copy-paste — the routing and data-fetching assumptions are baked into the file structure.

### What "different data source" means

Ontology Builder talks to a **custom Java backend** designed for the legacy-migration product, returning Velocity Packs and AI mapping results. Data Modeler talks to the **Reltio Configuration API**, returning tenant L3 configurations. The PRD requires the Data Modeler visualizer to read the **tenant's actual model**, not a Velocity Pack — so the data layer has to be rewritten end-to-end regardless of which UI we pick.

### Bottom line on Data Modeler's stack lag

The Visualizer feature is the latest in a series of features that have been **slowed down or worked around** because Data Modeler's stack is so far behind the rest of the Reltio portfolio. Most newer Reltio applications already run on React 18+, TypeScript, and modern Material UI. Data Modeler's modernization has been deferred for years, and the cost of that deferral is now visible: **any modern code we want to bring into Data Modeler bounces off the same wall**.

Until the shell is modernized, the question is not "can we add the visualizer". It is "can we add **any** modern feature". The honest answer today is no.

## Recommended path: modernize Data Modeler, then port the visualizer

The path is sequenced as three phases. **The first phase is about Data Modeler, not about the visualizer** — and it is the longest. The visualizer work happens after Data Modeler can host modern code at all.

### Phase 0 — Migrate Data Modeler to SAP UI5 (~5–6 months)

The longest and most important phase. Data Modeler completes its SAP Fiori migration in this pass — moving directly to the long-term target stack instead of taking an interim step. No hybrid runtime, no two-version coexistence, no in-page mixing of React or UI component versions. One app, one stack.

The work in this phase covers:
- Upgrading React 16 → React 18+ across the remaining application.
- Replacing Material UI v4 with SAP UI5 Web Components React — the SAP Fiori migration target. Every page, form, dialog, and navigation surface re-implemented on UI5 against the Horizon theme.
- Converting JavaScript to TypeScript, completed (not parked at "incremental coverage").
- Replacing LESS with CSS Modules backed by SAP Horizon design tokens.
- Replacing Create React App + craco with a modern build pipeline.
- Refactoring class components to functional components where it unlocks modern React patterns.
- Replacing Enzyme (incompatible with React 18+) with React Testing Library; bringing test coverage forward.
- Adopting `@reltio/auth` for authentication and RBAC — this absorbs a substantial portion of what would otherwise be in-app integration work and is owned by a separate platform team running in parallel with the migration.
- Running the existing e2e test suite continuously via a dedicated QA squad as the migration progresses. Because the e2e tests are black-box and stack-independent, they catch regressions without needing to be rewritten alongside the UI.

**Outcome:** Data Modeler runs entirely on the SAP Fiori target stack. Its SAP Fiori migration is done in the same pass — not deferred to a second project — and it is ready to host new features cleanly, including the visualizer.

### Phase 1 — Port the visualizer into Data Modeler (~3–4 weeks)

Once Data Modeler runs on a modern stack, the Ontology Builder visualizer code becomes portable. The work in this phase:

- Copy the visualizer components into Data Modeler (graph canvas, layout selector, filter panel, edge routing, side panel).
- Strip out migration-specific pieces that are out of PRD scope: AI mapping result, confidence chips, custom-entity overlay, embedded Match / Survivorship / Cleansers / Validation tabs.
- Replace the Velocity Pack data layer with an adapter onto the Reltio Configuration API. Data Modeler already calls this API; reuse the existing services rather than adding a new client.
- Replace Ontology Builder's hardcoded colors and custom theme with the SAP Horizon design tokens Data Modeler now uses.

A pragmatic trade-off worth surfacing: we are deliberately **copying** the visualizer code into Data Modeler, not extracting it into a shared library that both applications consume. Two copies is the right choice for now — it avoids adding a coordination dependency, keeps the calendar predictable, and Ontology Builder keeps shipping unchanged. Note that Ontology Builder itself is on Material UI v7 and will need its own SAP UI5 migration in due course as part of the portfolio-wide SAP Fiori migration — that effort is separate from this proposal. The natural moment to extract the visualizer into a shared library is once both applications have completed their UI5 migrations and the duplication starts to cost more than the coordination overhead would.

### Phase 2 — PRD compliance (~2–3 weeks)

The visualizer is running. This phase brings it to PRD spec:

- Click-to-edit hand-off: clicking an entity / relationship / source routes the user into the existing Data Modeler edit page for that object, with context preserved on return.
- Filter, layout, and edge controls per PRD.
- Read-only summary panel with deep-link CTAs (no embedded rules editing — that stays on the existing Data Modeler pages, as the PRD requires).
- RBAC parity: entities hidden by Data Modeler's permission model must be hidden in the visualizer. Because Data Modeler now uses `@reltio/auth`, this reduces to applying the standard RBAC primitives the library exposes, not a bespoke integration.

Performance tuning against the largest production tenants (~180 entity types, ~4,300 attributes per the PRD) is intentionally deferred — initial customer adoption is on tenants well below that scale, and performance work is best done with real telemetry from live usage rather than synthetic load testing during MVP.

**Outcome:** PRD-compliant Visualizer tab, live in Data Modeler.

### Total cost

- **Calendar time:** ~6 months with a dedicated squad, with 8 months as a realistic upper bound. Phases run sequentially because each builds on the previous; Phase 0 is the long pole.
- **Headcount needed:** 2 senior UI engineers on Data Modeler for the full duration of Phase 0 (the migration is parallelizable across page domains — Entities, Relationships, Sources, Grouping, Match Rules, and so on — and benefits significantly from a second pair of hands). Phases 1–2 can drop to 1–2 engineers. **Plus** 2 QA engineers running the existing e2e test suite continuously throughout, **plus** standard pull on the `@reltio/auth` platform team for the auth/RBAC adoption. Total Data Modeler-dedicated squad: 4 engineers (2 UI + 2 QA), with auth absorbed by a separate platform team.
- **External dependencies:** none gating the work. The visualizer code is in our hands. The Reltio Configuration API is already in use by Data Modeler. SAP UI5 Web Components React is an established, generally-available library. `@reltio/auth` is already in active development and its adoption schedule is compatible with Phase 0.

### What makes this pace achievable

A typical 6-year-old React 16 + Material UI v4 application migration to UI5 would take 12+ months of calendar time. We are recommending half that, and the reasons are not optimism — they are five specific, organizationally-real accelerators stacked on top of each other.

**1. Planned scope reduction.** Not all of Data Modeler is migrating. Parts of the current application surface are slated for deprecation or for relocation into separate applications. Excluding them from the migration up front, rather than rewriting them only to deprecate later, is the largest single accelerator. The exact scope cut needs to be confirmed before Phase 0 starts.

**2. AI-augmented engineering throughout the migration.** Modern AI tooling — code-aware assistants, the Reltio Design MCP serving live UI5 component documentation and examples, codemod-driven mechanical conversions for JS → TS and MUI v4 import-path rewrites — materially compresses the parts of the work that are pattern-driven. We do not assume AI handles architectural decisions or regression review, but the mechanical parts of a migration this size are a large fraction of total effort, and AI shortens them substantially.

**3. SAP UI5 Web Components React, not raw Web Components.** The official React wrapper already solves the React-to-Shadow-DOM integration: events propagate as React expects, refs and forms behave normally, and the developer experience is essentially "MUI-shaped, themed by UI5." This removes most of the paradigm-shift tax we would otherwise budget for in a UI5 migration.

**4. Black-box e2e regression coverage by a dedicated QA squad.** Data Modeler's existing e2e test suite is stack-independent — it drives the application through the UI, not through React internals. Two QA engineers running these tests continuously throughout the migration catches regressions in parallel with development, instead of bottlenecking on UI engineers' own manual QA cycles. This is the single biggest reason "no regressions accepted" does not translate into a months-longer calendar.

**5. Auth and RBAC absorbed by `@reltio/auth`.** A meaningful portion of any large legacy app migration is reworking authentication, session handling, and RBAC integration. Because `@reltio/auth` is being adopted across the Reltio portfolio with a separate team owning it, Data Modeler's migration consumes the library rather than re-implementing the integration in-app. This is parallelized work, not Data Modeler-squad work.

**Phase 1** is fast for a separate reason: the visualizer code is good code, and the work is pattern-driven adaptation (Velocity Pack types → Reltio L3 types, hardcoded colors → SAP Horizon tokens, MUI v7 imports → UI5 imports). The graph layout, the elkjs integration, the edge-routing logic, and the filter-panel UX all port over. AI-assisted adaptation on this kind of work is straightforward.

**What we are still not doing** — and want to be explicit about — is the dual-runtime shortcut. Even at this accelerated pace, we are not running two React versions side-by-side, not mixing MUI v4 and UI5 in one page, and not "strangler-fig-ing" routes between old and new shells. The pace comes from working faster on the right plan, not from cutting the regression-safety corner.

Phase 2 is largely glue: API adapter, click-to-edit routing, RBAC wiring, performance tuning at scale. It is the smallest phase by effort because both the host and the component already exist by then.

### What this buys us beyond the Visualizer

Phase 0 is the part to underline for leadership. By the end of it, **Data Modeler can host modern code**. Every future modernization of Data Modeler — including its eventual SAP Fiori migration — builds on the same foundation. The Visualizer ask becomes the forcing function that pays for an investment Data Modeler will need anyway.

In SAP Fiori migration terms (per the May 20 reorg proposal: *"0 of 16 applications migrated"*), Phase 0 moves Data Modeler from "untouched" to "ready for the migration to start". The Visualizer feature stops being a distraction from the migration goal and becomes the first concrete piece of forward progress on one of the strategic apps.

## What we are explicitly **not** recommending

- **Pasting Ontology Builder components into Data Modeler as-is.** It will not compile, and even if forced to compile, the runtime behavior will be broken in subtle, expensive-to-debug ways. We estimate 2–3 weeks of dead-end work before this becomes obvious to everyone. The three-major-version gap on React and MUI is a hard wall, not a soft warning.
- **Running two React or Material UI versions side-by-side in Data Modeler.** Patterns like mounting a React 18 subtree inside the React 16 shell via `createRoot`, or loading MUI v7 components into pages that already render MUI v4, look like attractive shortcuts on paper but consistently produce hard-to-diagnose regressions in production: event delegation conflicts, theme cascade leaks across version boundaries, focus management bugs, doubled style-cache footprints, and subtle layout shifts that pass code review but fail at customer scale. For a strategic app like Data Modeler, where every page is in active customer use, this trade is not acceptable. One app, one React version, one MUI version.
- **Forking Ontology Builder's repo and downgrading it to React 16 / MUI 4.** The downgrade work is comparable in size to Phase 0 + Phase 1 combined, and the output is a fork that diverges from both applications forever. Not worth doing.
- **A "quick prototype" while we plan in parallel.** Every engineering hour spent on a throwaway integration is an hour not spent on Phase 0, which is the foundation everything else depends on. We have seen this pattern before across the Reltio portfolio: the prototype becomes the de facto solution, the real plan stalls, and the modernization never happens. We are not going to repeat that here.

Happy to walk through any of this in detail. If it helps, we can also bring Gaurav in to review the component-by-component reusability analysis behind this document — there is a concrete file-level breakdown of what ports across from Ontology Builder vs. what has to be rebuilt, which I have omitted here to keep this readable but can share on request.
