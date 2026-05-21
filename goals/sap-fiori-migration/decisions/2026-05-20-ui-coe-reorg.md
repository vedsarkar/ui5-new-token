---
title: "Distribute UI application ownership to product teams"
date: 2026-05-20
---

# Proposal: Distributing UI Application Ownership to Product Teams

**To:** Praveen Groover (SVP, Engineering)
**From:** Andrew Borovin (UI CoE)
**Date:** 2026-05-20
**Status:** For approval

## TL;DR

To accelerate the SAP Fiori migration of 16 Reltio UI applications, I propose transferring **7 applications, 5 Admin Tools sub-apps, and 4 UI engineers** from UI CoE into the product teams that already own the corresponding backend services. UI CoE keeps the Reltio Design Platform (`@reltio/design`, Reltio Design MCP, SAP Horizon theming) and ~6 strategic UI applications and backend services (HUB UI, Data Modeler, Configuration Service, UI Modeler, Notifications Page/Service). A new **UI Guild** — a cross-team community of UI engineers — preserves consistency, knowledge sharing, and coordinated migration progress across the org.

Most of these moves formalise the de-facto reality: the engineers already work to the receiving team's backlog and the receiving team already owns the corresponding API service. The reorganisation removes the "on paper only" reporting line, eliminates UI CoE as a coordination bottleneck, and enables parallel migration tracks per product line.

## Why now

The SAP Fiori migration goal is on-track on the platform side (`@reltio/design 1.0` shipped May 12; 42 of ~163 UI5 components endorsed; remote MCP live at reltio.design/mcp), but **0 of 16 applications are migrated**. With the current structure, almost every application migration runs through a single UI CoE queue, which doesn't scale to 16 parallel tracks. Distributing ownership lets each product team sequence the migration alongside its own roadmap, while UI CoE focuses on unblocking via the platform and the Guild.

## Proposed transfers

### 1. Workflow team — Yury Timofeev (Manager, Software Engineering)

- **App:** Export UI (`apps/ui-export`)
- **Engineer:** Yuriy Kaygorodov (Sr. UI Engineer)
- **Why:** The Workflow team already owns BPMN Modeler, Dataloader UI, Workflow UI, External Match UI, and the **Export API Service**. Moving Export UI consolidates the product end-to-end inside one cross-functional team.

### 2. Agentflow / Unstructured team — Anupam Das (Director, Engineering)

- **App:** Agentflow Unstructured (`apps/agentflow-unstructured`)
- **Engineer:** Nallaparaju Amaresh Varma (UI Engineer)
- **Why:** Already de-facto. Amaresh is 100% dedicated to this app, the FE and BE backlog is owned by Anupam's team, and Amaresh reports to me only on paper. Formalising removes the disconnect.

### 3. RDM team — Anupam Das (Director, Engineering)

- **App:** RDM React (`apps/rdm-react`)
- **Engineer:** — (no transfer; RDM team will use existing UI capacity)
- **Why:** RDM is a relatively isolated, autonomous service. Co-locating the React app with the RDM backend team gives end-to-end product ownership in one place.

### 4. Data Out team — Srihari Narasimhan (Sr. Director, Software Development)

- **App:** Data Out (`apps/data-out`)
- **Engineer:** — (Srihari already has UI engineers and can hire more; UI CoE will support hiring and onboarding)
- **Why:** The Data Out API service is built inside Srihari's org. Moving the FE there gives the team full end-to-end ownership.

### 5. IDP team — Shivaputrappa Patil (Manager, Engineering)

- **Apps:** Login Page (`apps/login-page`), User Management UI (`apps/user-management-ui`), and four Admin Tools sub-apps — Account Settings, Client Credentials, SSO, Shield Encryption (all under `apps/admin-tools/src/apps/`)
- **Engineer:** Sumit Kumar (Sr. UI Developer)
- **Why:** Consolidates all Auth-related (IDP) products in one place. The IDP team owns every Auth API these apps consume, so co-locating FE + BE should materially accelerate development and modernisation of the auth surface.

### 6. Environment & Usage team — Olga Kunina (Staff Software Engineer)

- **Apps:** Env Management (`apps/env-management`), Monitoring (`apps/admin-tools/src/apps/monitoring`)
- **Engineer:** — (Olga's team already has UI capacity working on related apps)
- **Why:** Olga's team has already shipped several large features for Env Management and owns Usage Reporting UI and Platform Management UI, which significantly overlap in scope. Consolidating eliminates duplication and creates one coherent environment / usage / monitoring surface.

### 7. Hierarchy Management team — Daniil Klyuev (Manager, Engineering)

- **App:** — (no app transfer; Hierarchy Management is already in Daniil's team)
- **Engineer:** Olga Vakulenko (UI Engineer)
- **Why:** Already de-facto. Daniil assigns Olga's work; she reports to me only on paper. Formalising the reporting line removes the discrepancy.

---

**Total moving:** 7 standalone apps + 5 Admin Tools sub-apps + 4 UI engineers across 7 receiving teams.

## What stays in UI CoE

- **Reltio Design Platform** — `@reltio/design` (single distribution package built on SAP UI5 Web Components React), SAP Horizon design tokens & fonts, the Reltio Design MCP at reltio.design/mcp, and all platform documentation in Storybook.
- **Reltio API specs** — UI CoE owns the canonical OpenAPI specs for the Reltio public API surface. Each API namespace ships as a JSON spec, an interactive Storybook story, and an MDX guide, all published through the Reltio Design MCP for both human and AI consumers. API-first is a foundational principle at Reltio: every product contract is designed, reviewed, and versioned in the spec before the UI consumes it.
- **~6 strategic applications**, including HUB UI and Data Modeler — the largest, most complex apps in the Reltio portfolio, with the broadest cross-product footprint.
- **Localization platform** — libraries, tooling, and process for translating Reltio applications. Localization is a critical and complex requirement for SAP standards compliance: separate from visual styling, but with a major impact on UX. UI CoE builds and maintains the shared libraries and translation pipeline, and trains and coordinates product teams on adopting them.
- **UI Guild facilitation** — running the community, shared rituals, and cross-team migration tracking.
- **Migration support** — playbooks, MUI → UI5 mapping, code-mod assistance, Chromatic baselines, and pairing on the first migrated screens of each app.
- **Hiring and onboarding partnership** — for any product team that needs to grow its UI capacity (notably Data Out and IDP).

## UI Guild — the coordination model

A formal community of all UI engineers across Reltio, regardless of reporting line. The Guild:

- Maintains design and engineering consistency across distributed teams.
- Shares migration patterns, reusable components, and lessons learned.
- Provides a low-friction escalation path back to UI CoE for platform needs.
- Tracks SAP Fiori migration progress per app and surfaces blockers early.
- Hosts office hours, code reviews, and a shared Slack channel.

The Guild replaces direct reporting as the mechanism that keeps the distributed UI engineers aligned with the platform standard.

## Transition support from UI CoE

For every transferred app, UI CoE will provide:

1. A **migration playbook** specific to the app's current stack (MUI v4 / v5 / custom) and target (`@reltio/design` v1).
2. **Pairing support** on the first 1–2 migrated screens to validate the approach with the receiving team.
3. **Onboarding** for the transferring engineer into the new team and for any net-new UI hire the receiving team brings on.
4. **Hand-off documentation** captured under `apps/<name>/` in the reltio-design repo (CLAUDE.md, migration status, review checklists).

## Expected outcomes

- **Parallelised migration** — 7 product teams can sequence SAP Fiori migration against their own roadmaps instead of queuing behind UI CoE.
- **End-to-end product ownership** — every transferred app sits next to its backend service inside one team, with one backlog and one accountable manager.
- **Faster IDP and Workflow modernisation** — the two transfers with the tightest FE/BE coupling (auth surface, workflow surface) should see the largest immediate velocity gains.
- **UI CoE focus** — platform investment, strategic apps (HUB UI, Data Modeler), and Guild enablement, instead of acting as a single coordination queue for all 16 apps.
- **Honest org chart** — engineers who already work to another team's backlog start reporting to that team's manager.

## Risks and mitigations

**1. Design drift across distributed teams.**
*Mitigation:* UI Guild + the single `@reltio/design` entry point + Chromatic visual baselines on every story keep the platform standard enforceable.

**2. Receiving teams under-prioritise migration.**
*Mitigation:* Migration progress tracked publicly per app via the Guild; UI CoE owns the goal-level dashboard so leadership has visibility.

**3. Transferred engineers lose connection to platform context.**
*Mitigation:* Guild rituals (weekly sync, shared channel, office hours) plus continued access to the Reltio Design MCP keep them current.

**4. Receiving teams without UI capacity (Data Out, IDP overflow).**
*Mitigation:* UI CoE partners on hiring and onboarding; transitional pairing on first migrations.

## Ask

Approval to:

1. Formally transfer the 7 standalone apps, 5 Admin Tools sub-apps, and 4 UI engineers as outlined above, effective at the next reorg checkpoint.
2. Charter the **UI Guild** as the cross-team UI community, hosted by UI CoE.
3. Confirm UI CoE's continued ownership of the Reltio Design Platform and the ~6 strategic applications retained.

Happy to walk through any of the moves in detail or revise the framing before this goes wider.
