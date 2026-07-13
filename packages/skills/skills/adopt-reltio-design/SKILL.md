---
name: adopt-reltio-design
description: Migrate a Reltio application's UI primitives to the standardized @reltio/design components. Use when asked to "adopt @reltio/design", "migrate to Reltio Design", "replace MUI components", "standardize UI primitives", or to swap ad-hoc buttons/inputs/dialogs/etc. for the endorsed Reltio components.
---

# Adopt Reltio Design components

This skill guides you (any agent — Cursor, Claude, Codex) through replacing a
consumer application's ad-hoc UI primitives with the standardized, endorsed
components from `@reltio/design`. The source of the primitive does not matter —
MUI of any version, a bespoke in-house component, another library, or raw HTML.
If it is a button, an input, a dialog, a table, etc., it should become the
matching `@reltio/design/components` component.

This skill is **application-independent**: it never assumes a particular app's
structure. It relies on the installed `@reltio/design` package as the live source
of truth, so it always matches the exact version that app uses.

## Core principles

- **The installed package is the source of truth.** Discover what exists and its
  exact API from `@reltio/design` itself — do not guess prop names or rely on a
  hand-maintained mapping table.
- **Everything comes from `@reltio/design`.** Import components, charts, hooks,
  utils, and icons only from `@reltio/design/*` (`/components`, `/charts`,
  `/hooks`, `/utils`, `/icons/sap`, `/icons/reltio`) — never directly from
  `@ui5/*` or `@sap/*`. Always use the subpath; the bare `@reltio/design`
  specifier does not resolve. Icons are imported **by name** and passed to the
  `icon` prop (`import saveIcon from "@reltio/design/icons/sap/save"` →
  `<Button icon={saveIcon} />`) — there is no `@ui5/*` icon exception. See the
  playbook for details.
- **Semantic matching.** Classify each primitive by its UI intent ("this is a
  button"), then find the standardized component with that intent.
- **No fabrication.** If there is no clear standardized equivalent, mark it for
  manual review and move on. Never invent a component or prop.
- **Small, reviewable changes** (see the guardrail below).

## Discovery (how to learn what exists and how to use it)

Run these in the consumer repo (the package is already installed):

```bash
npx @reltio/design components          # list every endorsed component + one-liner
npx @reltio/design components Button   # show one component's resolved props + defaults
```

For richer narrative (when to use which variant, accessibility notes, gotchas),
optionally use the **Reltio Design MCP** at `https://reltio.design/mcp`
(`get-documentation`), or fall back to fetching the matching page on
`https://reltio.design`. These are optional — inventory and props always come
from the installed package, offline.

If a component has no bundled schema, read its props from the package types
(`node_modules/@reltio/design/**/*.d.ts`) or the MCP.

## Workflow

Follow these steps in order. Read `playbook.md` (next to this file) for the
detailed conversion rules referenced here.

1. **Inventory** — In the target set of files (a *small* scope — see guardrail),
   find candidate primitives: imports from `@mui/*` or other UI libs, local
   primitive components, and raw HTML controls (`<button>`, `<input>`, …).
2. **Match** — For each candidate, classify by intent and look it up via
   discovery. Build a short mapping for this batch. Anything without a clear
   equivalent → mark **manual review**, do not migrate it.
3. **Deep-dive** — For each component you will actually migrate, get its exact
   props/defaults (`components <Name>`; MCP for narrative).
4. **Migrate** — Apply the conversions from `playbook.md`: imports →
   `@reltio/design/components`, props, events, styling (`sx`/theme → CSS + SAP
   tokens), icons. Keep each change minimal and focused.
5. **Verify** — Type-check, lint, and run the consumer's tests. Each increment
   must compile and pass before you continue.

## Guardrail — small, iterative PRs (MANDATORY)

Large migrations are unreviewable. Enforce this hard:

- **One PR = one component family or one screen/module.** Not "all of MUI at once".
- **Upper bound ≈ 1000 changed lines per PR.** If a requested migration would
  exceed that, **stop** and propose an incremental split plan instead of producing
  one giant change.
- **Propose the split plan and get confirmation before any bulk replacement.**
- **Every increment compiles and passes tests** before moving on.

When in doubt, do less per change. Smaller is always better for review.
