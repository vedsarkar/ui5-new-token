---
successMeasure: "@reltio/design exposes the full SAP Fiori component surface"
metric: "Endorsed SAP Fiori components in @reltio/design"
unit: Number
owner: UI Center of Excellence
---

# @reltio/design exposes the full SAP Fiori component surface

Start value, target value, and target date are maintained **only in Atlassian Goals** (on the linked metric). This file defines what we count — not the numbers. Point-in-time values live in `updates/`.

## What we measure

The number of **endorsed** SAP Fiori (UI5) components re-exported from `@reltio/design/components` — the curated surface every Reltio application is allowed to import instead of installing `@ui5/webcomponents-react` directly.

Each endorsed component is documented in Storybook (README, types, stories, JSON Schema) and listed in `components/index.ts`, which is the single source of truth forwarded by `packages/design/components.ts`.

## Definition of “endorsed”

A UI5 Web Components React export counts as **one** when all of the following are true:

- Named export added to `components/index.ts` from `@ui5/webcomponents-react/<ComponentName>`
- Documentation-only directory under `components/<Name>/` (or full Reltio wrapper when product logic is required)
- Published through `@reltio/design` after CoE review (Chromatic visual / interaction / a11y on stories)
- Apps consume it only via `import { … } from "@reltio/design/components"`

Sub-components that exist only as children of a parent (for example `ComboBoxItem` alongside `ComboBox`) each count as **one** export when they are separately re-exported in `components/index.ts`.

## How the metric target is defined

The target is the number of public component exports in the **pinned** `@ui5/webcomponents-react` version bundled with `@reltio/design` (see `packages/design/package.json`), minus components intentionally excluded from the endorsed app surface:

- `ProductSwitch` / `ProductSwitchItem` — superseded by the Reltio `AppSelector` business component
- `ThemeProvider` / `Modals` — infrastructure utilities, not product UI building blocks

When UI5 is upgraded in `@reltio/design`, re-count the upstream catalogue and adjust the Atlassian metric target if the public surface changed.

## Why this matters

Until the endorsed surface is complete, migrating apps hit gaps and fall back to direct `@ui5/*` imports or legacy MUI — breaking the single-distribution-package contract and bypassing CoE-tested versions. Growing this count is the platform prerequisite for the companion success measure “all apps on `@reltio/design` v1”.

## How to verify the current value

```bash
grep -c '^export { .* } from "@ui5/webcomponents-react/' components/index.ts
```

Canonical list: `components/index.ts` in [reltio-design](https://bitbucket.org/reltio-ondemand/reltio-design).

## Cadence

Log the current count in an Atlassian update whenever new UI5 components are endorsed and released in `@reltio/design` (typically with a Changesets release). Reference DESIGN issues labelled `fiori-migration` and the package CHANGELOG.
