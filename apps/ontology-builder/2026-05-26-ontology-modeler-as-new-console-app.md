---
title: "Ontology Modeler — a new Reltio Console application for data model exploration"
date: 2026-05-26
---

# Ontology Modeler — a new Reltio Console application for data model exploration

**To:** Product Management (cc: Gaurav, Praveen Groover)
**From:** Andrew Borovin (UI CoE)
**Date:** 2026-05-26
**Status:** Alternative proposal — for decision alongside [`2026-05-26-ontology-viewer-in-data-modeler.md`](./2026-05-26-ontology-viewer-in-data-modeler.md)

> This document presents an alternative to the companion proposal that recommends migrating Data Modeler to SAP UI5 and embedding the visualizer there. Both documents should be read together; leadership is asked to make an explicit choice between the two paths rather than approving both in parallel.

## TL;DR

Fork the existing Ontology Builder frontend into a second deployment that lives inside Reltio Console as a new application — provisionally named **Ontology Modeler**. Reuse the Ontology Builder codebase, swap the data layer from the Velocity Pack / Mapping API to the Reltio Configuration API, swap the auth flow Reltio SSO, and strip the AI-mapping-specific UI. Ship as a new Console application in **~2-3 months calendar time**.

This path delivers the visualizer to customers faster, leaves the legacy Data Modeler untouched (zero regression risk), and starts on a current-generation stack from day 1. It accepts three explicit trade-offs in return: legacy Data Modeler continues to ship for admin/configuration features for the foreseeable future; a 17th application is added to the portfolio (and inherits the SAP UI5 migration debt from day 1, alongside the existing 16); and PRD's "click-to-edit hand-off" becomes a cross-app navigation in Console rather than an in-app route.

Compared to the migration path (~6 months, modernises a strategic app), this is half the calendar at the cost of leaving Data Modeler's tech debt untouched. We need a leadership decision on which path to fund.

## Context

PRD `Data_Model_Visualizer_PRD.docx` asks for a data model visualizer inside Reltio Console. The companion proposal [`2026-05-26-ontology-viewer-in-data-modeler.md`](./2026-05-26-ontology-viewer-in-data-modeler.md) recommends migrating Data Modeler to SAP UI5 (~5–6 months) and embedding the visualizer there (~1 month), using the Visualizer feature as the funding catalyst for an overdue strategic-app modernization.

This document presents a different option: do not touch the legacy Data Modeler. Ship the visualizer as a new, separate Reltio Console application, forked from the existing Ontology Builder codebase. Faster, less coupled, but does not solve Data Modeler's tech debt and adds a new application to the portfolio.

## The proposal

Fork Ontology Builder's frontend repository into a new repository. The new repository targets Reltio Console as an internal/customer-facing application. The existing public-facing Ontology Builder stays at its current deployment for migration prospects.

One codebase lineage, two distinct deployments:

- **Public Ontology Builder** (existing) — unchanged. Session-cookie auth, Java backend, AI-mapping use case for migration prospects.
- **Ontology Modeler** (new) — Reltio Console application. `@reltio/auth` for authentication and RBAC. Reltio Configuration API for data. AI-mapping UI removed. Key editing capabilities added incrementally for the features customers actually use.

The work needed to turn the forked codebase into Ontology Modeler:

- **Auth flow swap.** Session-cookie + Java backend → `@reltio/auth`. The library is already in active development across the portfolio; Console SSO integration is a known pattern. Manageable.
- **Data layer swap.** `VelocityPackDetails` + `MappingResult` types → Reltio L3 types from the Configuration API. This is the largest single piece of work in the project, because Velocity-Pack-shaped types are referenced throughout the codebase (components, hooks, render conditions, useMemo dependencies). Honest about this in the calendar.
- **Strip AI-mapping UI.** Confidence chips, custom-entity overlays, source schema columns, AI classification flow, mapping-in-progress states — all removed. These are dead weight in the Console use case.
- **Add key editing capabilities.** Attribute editor as MVP — the single capability customers reach for most often when reviewing their tenant model. Other editors (relationship type, source priority, match rules) added iteratively if and when customer demand justifies them. Full feature parity with legacy Data Modeler is explicitly **not** a deliverable.
- **Console embedding.** Navigation surface, deployment artifacts, OAuth callback wiring, in-Console branding.

## What this approach is good at

1. **Speed.** ~2-3 months instead of ~6. No blocking Phase 0 modernization. Work starts from day 1 with no prerequisite.

2. **Zero regression risk to the existing Data Modeler.** The legacy application keeps shipping unchanged. No customer workflow disruption while Ontology Modeler is being built.

3. **Modern stack from day 1.** Engineers ship onto a current-generation React + TypeScript + modern testing + modern build pipeline. No legacy paradigm tax during development.

4. **Visible customer-facing modernization immediately.** Customers see polished, current-generation UI in Console as soon as MVP ships — not "wait 6 months for the migration to be done first, then we'll start the feature."

5. **Natural strangler-fig path forward.** Each feature added to Ontology Modeler becomes a reason for customers to use it instead of the legacy Data Modeler. The shift happens organically over time. Whichever features never get re-implemented in Ontology Modeler are the features that, in practice, customers don't need from the legacy app — and we learn this from usage data, not from planning meetings.

6. **Smaller dedicated team.** ~1 UI engineer + 1 QA engineer for the duration, instead of 2 UI + 2 QA for the migration plan.

## What we accept by choosing this path

These are explicit trade-offs, not unknowns. Leadership should approve this path with all of them in view.

1. **Legacy Data Modeler stays in production indefinitely.** Customers needing the full configuration surface — match rules editor, JSON editor, validation function editor, import dialog, source priority, grouping rules — continue using the legacy app. Two Data-Modeler-ish surfaces in Console for an undefined time horizon. Customer Success messaging needs to clarify which app to use for what.

2. **No tech-debt resolution on legacy Data Modeler.** Phase 0 of the migration plan ceases to exist. Data Modeler's SAP Fiori migration stays unscheduled, and its React 16 / MUI v4 / Create React App / LESS / JavaScript stack remains the platform's largest single block of frontend technical debt. This is an explicit deferral, not a solution.

3. **A 17th application is added to the portfolio, on MUI v7.** In SAP Fiori migration terms, the portfolio goes from "0 of 16 applications migrated" to "0 of 17 applications migrated." Ontology Modeler inherits the UI5 migration debt from day 1, alongside the existing 16. It will need its own UI5 migration in due course, on the same schedule as the rest of the portfolio.

4. **Cross-app navigation for click-to-edit.** PRD requires "click-to-edit hand-off into existing Data Modeler pages." With this approach, that hand-off crosses an application boundary in Reltio Console (Ontology Modeler → legacy Data Modeler). Console SSO makes this functional, but it is less elegant than in-app routing, and context preservation across the navigation (selection, filters, layout, zoom) is harder across apps than within one.

5. **Feature parity with legacy Data Modeler is not a deliverable.** We are explicitly **not** promising to replace the legacy app. We are shipping a customer-valuable subset (visualization + attribute editor as MVP) and accepting that the long tail of configuration features stays in the legacy app indefinitely.

## Cost / calendar / headcount

- **Calendar time:** ~2-3 months with a dedicated squad, with 5 months as a realistic upper bound.
- **Headcount:** 1 senior UI engineers (full time) + 1 QA engineer (partial time). Auth Next Gen adoption is absorbed by the platform team running in parallel, not Ontology-Modeler-squad work.
- **Indicative phase shape** (overlapping where possible, not strictly sequential):
  - Fork repo + Console embedding + auth flow swap: ~2-3 weeks
  - Data layer swap (Velocity Pack → Reltio L3 types): ~3–5 weeks
  - Strip AI-mapping UI + Console theme adjustments: ~2–3 weeks
  - Attribute editor (MVP): ~2–3 weeks
  - PRD compliance + click-to-edit cross-app navigation + QA cycle: ~2-3 weeks
- **External dependencies:**
  - Auth Next Gen adoption schedule — already in flight, compatible with this calendar.
  - Console app registration / deployment slot — operational, not blocking.
  - Reltio Configuration API — already in use by Data Modeler; no new surface required.

## Open questions for leadership

To finalise the plan we need answers on the following:

1. **Confirm the name — "Ontology Modeler".** Two reasonable options were considered:
   - **"Ontology Modeler"** (recommended) — distinct from "Ontology Builder", signals the different use case ("model existing tenant data" vs. "build greenfield ontology from AI suggestions"). Avoids customer confusion about which "Ontology Builder" is which.
   - **"Ontology Builder" (Console edition)** — leverages existing brand recognition. Cost: two products with the same name (public-facing vs. Console-internal) is messy for support documentation, customer onboarding, and sales conversations.

   We recommend "Ontology Modeler" for clarity, but this is a leadership / marketing call.

2. **What is the long-term plan for legacy Data Modeler?** This decision does not gate this proposal, but it determines whether we are investing in two long-lived applications or in a transitional configuration. Three honest possibilities:
   - **Indefinite cohabitation** — both applications live forever, each owns its surface area.
   - **Strangler-fig deprecation** — Ontology Modeler grows; legacy Data Modeler shrinks; legacy is removed in N years once usage drops below threshold.
   - **Modernize legacy later anyway** — defer Data Modeler's SAP UI5 migration to a future goal cycle, but commit to it (this is essentially the migration proposal, just delayed and uncoupled from the Visualizer ask).

3. **What features beyond visualization does Ontology Modeler need at MVP?** The proposal assumes attribute editing is the only editor needed at MVP. If relationship editor, source priority, match rules editor, or others are required at MVP, the calendar extends accordingly (each editor is roughly 2–4 weeks of additional work).

4. **Who owns Ontology Modeler operationally?** Per the May 20 reorg, legacy Data Modeler is in UI CoE. The public-facing Ontology Builder is currently in a separate team. Where does Ontology Modeler live — UI CoE, the Ontology Builder team, or a new team? This decision affects squad composition and ongoing maintenance.

## How this compares to the migration proposal

| Dimension | Migration path (companion doc) | This proposal (Ontology Modeler) |
|---|---|---|
| Calendar to Visualizer in customer hands | ~6 months (8 upper bound) | ~2-3 months (5 upper bound) |
| Headcount | 2 UI + 2 QA + IDP team support | 1 UI + 1 QA + IDP team support |
| Data Modeler tech debt | Resolved — SAP UI5 migration completed | Untouched — deferred to a future goal cycle |
| Portfolio app count | 16 (no change) | 17 (one new app added) |
| SAP Fiori migration progress | +1 strategic app migrated | 0 net change; new app inherits the same UI5 debt |
| Regression risk on legacy Data Modeler | Managed via QA squad + e2e tests during migration | None — legacy is untouched |
| PRD "click-to-edit" UX | In-app routing, full context preservation | Cross-app navigation in Console, partial context preservation |
| Feature parity | Maintained — all Data Modeler features migrate (minus planned deprecations) | Not promised — attribute editor MVP, other editors iterative |
| Long-term Console UX | One unified application | Two applications side by side, possibly indefinitely |
| Reversibility | High — migration is forward-only but predictable | Lower — once a second app exists in customer hands, retiring it has its own cost |
