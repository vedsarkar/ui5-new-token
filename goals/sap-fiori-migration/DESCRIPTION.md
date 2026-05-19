---
name: "Migrate Reltio UI apps to the SAP Fiori Design System"
goalId: ""
jiraJql: "project = DESIGN AND labels = fiori-migration"
gitPaths:
  - components/
  - packages/design/
  - apps/
storybookAreas:
  - Components
  - Guides
metrics:
  - Apps migrated
  - Apps in progress
  - Components in @reltio/design
---

# Migrate Reltio UI apps to the SAP Fiori Design System

Transition all Reltio UI applications from legacy component libraries (Material-UI v4/v5, @reltio/components) to the SAP Fiori Design System, delivered through `@reltio/design` — the single distribution package built on SAP UI5 Web Components React, themed with SAP Horizon.

## Why

Reltio products are part of the SAP ecosystem. A unified design system eliminates UI fragmentation across products, ensures visual consistency with SAP Fiori guidelines, and accelerates development by providing a single, tested, documented component library. Applications currently use a mix of MUI v4, MUI v5, and internal component libraries — creating maintenance burden, inconsistent UX, and duplicated effort.

## Application Inventory

16 Reltio UI applications — all require migration to @reltio/design v1. Grouped by current UI stack:

### MUI v5 (9 apps)

- **Admin Tools** — Next.js 15, React 18
- **BPMN Modeler** — React 17, Webpack 5
- **Data Out** — Next.js 15, React 18
- **Dataloader UI** — React 17, Webpack 5
- **External Match UI** — Next.js 15, React 18
- **Login Page** — Next.js 14, React 18 (SSO gateway for all Reltio products)
- **RDM** — React 17, Recharts
- **Usage Reporting UI** — Next.js 15, MUI X Data Grid
- **Workflow UI** — React 17

### MUI v4 (3 apps)

- **Data Modeller** — React 16, CRACO
- **Export UI** — React 16, class components
- **Env Management** — React 17

### @reltio/design v0 + custom components (2 apps)

- **Agent Flow UI** — Next.js 15, React 19; has @reltio/design as dependency but uses custom components and styles alongside it
- **HUB UI (reltio-react-ui)** — mixed @reltio/components and @reltio/design v0; migration to v1 not started

### @reltio/components (2 apps)

- **UI Config Tool** — React 17, React Router 5

## Approach

Each application migrates through `@reltio/design`, which pins UI5 Web Components React at a tested version (currently 2.21.3) and provides:

- **40+ endorsed SAP Fiori components** — Button, Input, Dialog, Table, ComboBox, and more
- **Reltio business components** — Chat, AppSelector, Details, Markdown, Skeleton, ErrorBoundary
- **Charts** — 9 ECharts-powered visualizations replacing Recharts
- **Hooks and utilities** — useTextStream, classNames, HtmlProps
- **SAP Horizon design tokens** — `--sap*` CSS variables for theming (light/dark)

Migration is per-app, incremental. Components are replaced one at a time within each application, using the MUI-to-UI5 mapping documented in the platform guides.

## Known Challenges

- **Chart library mismatch** — 5 apps use Recharts; @reltio/design uses ECharts (different API surface)
- **MUI X Data Grid** — Usage Reporting UI depends on it; no direct replacement in @reltio/design yet
- **Legacy build systems** — some apps on Webpack 4, CRACO, or React 16 need framework upgrades first
- **Less styling** — several apps use Less preprocessor, needs CSS Modules refactor

## Success Criteria

- All 16 Reltio UI applications consuming `@reltio/design` v1 as the sole component library
- No direct MUI, @reltio/components, @reltio-lab/react-components, or @reltio/design v0 imports remaining
- All apps rendering with SAP Horizon theming (light and dark mode)
- Migration guide published for each breaking change
- Visual regression coverage via Chromatic for all migrated components
