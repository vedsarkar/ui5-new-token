# AGENTS.md

This file provides guidance to AI agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Project Overview

**Reltio Design Platform** is a comprehensive UI development, testing, and documentation ecosystem for the Reltio product suite. It serves as a unified platform enabling multiple teams to build, test, document, and distribute MDM-specific UI components and applications while maintaining consistency, quality, and embeddability across the SAP ecosystem.

### Mission

Eliminate UI fragmentation across products while accelerating development of new applications and features by composing on top of the SAP Fiori design system, themed with SAP Horizon.

### Core Principles

- **Single source of truth** — one platform for all UI-related assets and knowledge
- **Everything as code** — components, tests, documentation, guidelines, configs, AI instructions
- **AI-ready by design** — prepared for integration with AI agents via MCP-UI and A2UI
- **Compose, don't reinvent** — UI5 Web Components React is the foundation; Reltio Design adds only what UI5 lacks

### What You'll Find Here

- **Reltio MDM Components** — business components and primitives built on top of UI5
- **Charts** — ECharts-based visualizations
- **Design Tokens & Fonts** — SAP Horizon tokens and SAP 72 fonts shipped as static CSS
- **Storybook Stories** — documentation + tests + demos + specifications in one artifact
- **Technical Guides** — rich MDX guidelines for developers and product teams
- **Hooks & API utilities** — shared utilities and Reltio API integrations

### Who Uses This

**Developers, Designers, QA Engineers, Product Managers** — build and review Reltio applications
**Partners & Customers** — integrate and embed Reltio UI components
**AI Agents** — interact via MDX, MCP-UI and A2UI protocols

## Tech Stack

- **Framework**: React 18+
- **Single distribution package**: [`@reltio/design`](packages/design/) — the only thing a Reltio app installs. Re-exports an endorsed subset of SAP Fiori (UI5) components plus all Reltio MDM components, charts, hooks, and utilities. Pinned to an exact UI5 version that the UI Center of Excellence has tested.
- **UI foundation (transitive, pinned)**: [`@ui5/webcomponents-react`](https://sap.github.io/ui5-webcomponents-react/) — bundled with `@reltio/design` at an exact version (currently `2.21.3`). Apps never install it directly.
- **Icons**: [`@ui5/webcomponents-icons`](https://sap.github.io/ui5-webcomponents/) — SAP Fiori icon set. Apps load icons as side-effect imports (`import "@ui5/webcomponents-icons/dist/save.js"`); the package itself comes transitively via `@reltio/design`.
- **Design tokens & fonts**: [`@sap-theming/theming-base-content`](https://github.com/SAP/theming-base-content) — generated into static `public/variables.css`, `public/fonts.css`, `public/fonts/*.woff2`
- **Charts**: [ECharts](https://echarts.apache.org/) — see `charts/`
- **Language**: TypeScript (strict mode)
- **Documentation & Testing**: Storybook + Chromatic (visual, interaction, accessibility, coverage)
- **Styling (Reltio components)**: CSS Modules
- **Code Quality**: Biome
- **Version Control**: Git (Bitbucket)

### Development Philosophy

- **`@reltio/design` is the only entry point** — apps import everything from `@reltio/design`, never from `@ui5/*` packages directly. The dependency-graph contract gives apps protection from upstream breaking changes (CoE pins UI5, runs Chromatic + a11y + interaction tests on every story, ships a new `@reltio/design` release with a migration MDX) and gives AI agents a single import path to generate. See [UI Architecture](guides/ui-architecture.story.mdx) for the full rationale.
- **Endorsed UI5 first** — if `@reltio/design` re-exports a UI5 component that fits the design, use it as-is. Do not wrap.
- **Minimal dependencies** — Prefer native JS/CSS APIs and reuse internal components
- **Pinned versions** — exact version pins for `@ui5/*` packages. CoE controls upgrades. Apps follow.
- **Native-first** — Leverage modern browser capabilities before adding libraries

## Commands

```bash
npm run dev               # Start Storybook dev server (port 6006)
npm run build-storybook   # Build Storybook for production
npm run build-tokens      # Generate public/variables.css, public/fonts.css and copy public/fonts/*.woff2 from the @sap-theming/theming-base-content npm package
npm run lint              # Check code with Biome (no auto-fix)
npm run format            # Format code with Biome (auto-fix)
npm run deploy            # Deploy to Chromatic for visual testing
npm run test              # Run Vitest tests
npm run coverage          # Run tests with coverage
```

## UI Architecture

The platform exposes a **single distribution package** to apps — `@reltio/design` — that bundles every UI surface they need: Reltio MDM components, Reltio primitives, charts, hooks, and a curated set of endorsed SAP Fiori (UI5) components. UI5 React itself is a transitive dependency at a pinned version.

```
┌──────────────────────────────────────────────────────────────┐
│  Reltio MDM apps & partners                                  │
│   import { Button, Chat, MessageStrip, ... }                 │
│     from "@reltio/design/components";                        │
└──────────────────────────────────────────────────────────────┘
                              ▲
┌─────────────────────────────┴────────────────────────────────┐
│  @reltio/design (this repo) — the single endorsed entry point│
│   • Reltio MDM components (Chat, AppSelector, Details, ...)  │
│   • Reltio primitives (Markdown, Skeleton, ErrorBoundary)    │
│   • Charts (ECharts)                                         │
│   • Hooks & Reltio API utilities                             │
│   • Re-exports of endorsed UI5 components, pinned version    │
└─────────────────────────────┬────────────────────────────────┘
                              ▲
┌─────────────────────────────┴────────────────────────────────┐
│  @ui5/webcomponents-react @ 2.21.3 (pinned, transitive)      │
│   Apps never install this directly. CoE upgrades via         │
│   `@reltio/design` releases after Chromatic + a11y tests.    │
└─────────────────────────────┬────────────────────────────────┘
                              ▲
┌─────────────────────────────┴────────────────────────────────┐
│  SAP Horizon foundation (shared by both layers)              │
│   https://reltio.design/variables.css                        │
│   https://reltio.design/fonts.css                            │
│   data-theme attribute                                       │
└──────────────────────────────────────────────────────────────┘
```

### Where to import from

| Context | Import path | Example |
|---|---|---|
| Reltio app code (consumer) | **`@reltio/design/components`** — always include the subpath, never bare `@reltio/design` | `import { Button } from "@reltio/design/components"` |
| Reltio app code, charts | `@reltio/design/charts` | `import { LineChart } from "@reltio/design/charts"` |
| Reltio app code, utilities | `@reltio/design/utils` | `import { classNames } from "@reltio/design/utils"` |
| Reltio component author (this repo, building wrappers) | Direct UI5 imports allowed inside `components/` to wrap UI5 with MDM logic | `import { Button } from "@ui5/webcomponents-react/Button"` (only inside `components/SaveEntityButton/SaveEntityButton.tsx` etc.) |
| Stories / docs (READMEs, MDX, snippets) | `@reltio/design/components` (MCP rewrites snippets to this path automatically) | `import { Button } from "@reltio/design/components"` |

> **Why the `/components` subpath is mandatory.** The published `packages/design/package.json` exposes only subpath entries (`./components`, `./charts`, `./utils`) — there is no `main`/`exports` target for the bare package name. A `import { X } from "@reltio/design"` resolves to nothing and breaks at install time. Storybook MCP and the Manifest Debugger automatically rewrite generated snippets to the subpath via `.storybook/reltioManifestPreset.ts`, so AI agents always see the correct path.

### When to use an endorsed UI5 component vs. build a Reltio component

| Situation | What to do |
|-----------|-----------|
| `@reltio/design` re-exports a UI5 component that fits the design as-is | Import from `@reltio/design`. Do not wrap. |
| You need a UI5 component that's not yet re-exported | Open an issue with the CoE so a documentation-only directory + endorsement is added. Do **not** install `@ui5/webcomponents-react` directly. |
| You need to compose several UI5 components with MDM business logic (entity profile, match group, source priority, ...) | Build a Reltio **business component** under `components/`. |
| You need a primitive that UI5 does not provide and that is product-agnostic | Build a Reltio **primitive** under `components/`. |
| You need to restyle a UI5 component | Use `--sap*` tokens (preferred) or UI5's CSS Parts (`::part()`). Do not wrap just for styling. |

### Theming

Theming is driven by static CSS:

1. The consumer loads `https://reltio.design/variables.css` and `https://reltio.design/fonts.css` in `<head>` (or self-hosts the files generated by `npm run build-tokens`).
2. Any ancestor element carries `data-theme="horizon-light"` or `data-theme="horizon-dark"`.
3. UI5 web components inherit `--sap*` CSS variables through Shadow DOM automatically.
4. Reltio CSS Modules consume the same `--sap*` tokens through the normal cascade.

Nested theming works: a `[data-theme]` on a child element scopes that theme to its subtree.

## Component Structure (MANDATORY for Reltio components)

This rule applies to **Reltio** components under `components/` — i.e. business components and primitives we author. It does **not** apply to bare re-exports or thin pass-throughs of UI5 components.

```
components/ComponentName/
├── ComponentName.tsx          # Implementation
├── ComponentName.types.ts     # Type definitions (REQUIRED - separate file)
├── ComponentName.module.css   # CSS Modules styles
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                   # Public exports
```

### Documentation-only directories (exception)

A directory under `components/` may contain **only** a `*.stories.tsx` file (no `.tsx`, `.types.ts`, `.module.css`, or `index.ts`) when its sole purpose is to document the recommended way to consume a native UI5 component directly — without authoring any Reltio code. In this case the stories file imports the component straight from `@ui5/webcomponents-react`, and the directory name simply provides a stable Storybook navigation path.

Use this exception only for documentation. As soon as any custom logic, types, or styles are introduced, the directory must follow the full structure above.

## Architectural Requirements

### TypeScript
- Use `type` keyword ONLY, never `interface`
- All types MUST be in separate `.types.ts` files
- Strict mode enabled, no `any` without justification
- Component props MUST use `HtmlProps<Tag, CustomProps>` from `@/utils/types` to combine custom props with native HTML element attributes (see `components/AGENTS.md` for details)
- All rest props (`...rest`) MUST be spread onto the wrapper HTML element (or onto the root UI5 component when wrapping one)

### CSS Styling

#### Reltio components

- ALL `className` attributes MUST use the `classNames()` utility from `@/utils/classNames`
- Colors MUST reference SAP Horizon `--sap*` tokens from `https://reltio.design/variables.css` — never hardcode hex values
- Typography, spacing, sizing — use plain values directly (e.g. `font-size: 14px`, `padding: 8px 16px`)
- Component-level CSS custom properties — almost never needed. Do NOT create variables as a customization API. If a value is set and consumed on the same element, override the property directly — even for variant/size switches. Use compound selectors (`.small .icon`) instead of cascading variables
- **CSS variable encapsulation** — when a component does use an internal CSS variable, it MUST always be set explicitly on the component root element (including the default value via inline style). This prevents ancestor/global variables with the same name from leaking in. The only CSS variables a component may consume from outside are SAP Horizon `--sap*` tokens from `https://reltio.design/variables.css`
- External customization is done through **React props** and `--sap*` token overrides only — components do NOT expose internal CSS classes as a styling API, and consumers MUST NOT target hashed CSS Module classes

Example pattern:
```css
/* Use SAP tokens for colors, plain values for everything else */
.tab {
  color: var(--sapContent_LabelColor);
  font-size: 14px;
  padding: 8px 16px;
}

.active {
  color: var(--sapBrandColor);
}

/* Variants override properties directly, no variables needed */
.root { height: 32px; }
.small { height: 26px; }
```

#### UI5 web components

UI5 components live in Shadow DOM, so regular CSS selectors do not reach their internals. Two mechanisms are available:

1. **`--sap*` design tokens** — UI5 reads them directly from the document `:root` and the active `[data-theme]` subtree. Changing a token at any level re-themes every UI5 component beneath it. This is the **preferred** way to restyle UI5.
2. **CSS Parts (`::part()`)** — UI5 components expose a stable set of named parts (e.g. `ui5-button::part(button)`). Use them for fine-grained tweaks that no token covers.

```css
/* Preferred — token override scoped to a subtree */
.toolbar {
  --sapButton_Background: var(--sapButton_Lite_Background);
}

/* Fallback — CSS Part for a specific tweak */
.toolbar ui5-button::part(button) {
  border-radius: 999px;
}
```

Do NOT wrap a UI5 component in a Reltio component just to restyle it. Wrap only when there is real business logic to add.

### Global Design Tokens (SAP Horizon)
- The platform mirrors SAP Horizon design tokens 1:1 from [SAP/theming-base-content](https://github.com/SAP/theming-base-content). Names, casing (camelCase), and values are preserved verbatim.
- Generated CSS lives at `public/variables.css` — a single file with all `--sap*` tokens on `:root` (light defaults) and `[data-theme]` overrides for theme-specific values. Auto-generated — do NOT edit manually, run `npm run build-tokens`.
- Sources: the `@sap-theming/theming-base-content` npm package, which ships SAP Horizon's light (`content/Base/baseLib/sap_horizon/variables.json`), dark (`content/Base/baseLib/sap_horizon_dark/variables.json`), and the typography `.woff2` font binaries under `content/Base/baseLib/baseTheme/fonts/`. The version is pinned via `package-lock.json`. To upgrade: `npm update @sap-theming/theming-base-content` (or bump the version in `package.json` and run `npm install`), then re-run `npm run build-tokens` and commit the regenerated artifacts together with the lockfile bump.
- Token naming: `--sap{Group}*` or `--sap{Group}_{Detail}` (camelCase + underscore separators). Examples: `--sapBrandColor`, `--sapTextColor`, `--sapElement_BorderCornerRadius`, `--sapContent_FocusColor`, `--sapContent_Shadow0`, `--sapButton_Background`, `--sapField_BorderColor`.
- Theme activation: the consumer loads `variables.css` in `<head>` and sets `data-theme="horizon-light"` or `data-theme="horizon-dark"` on any ancestor element. Without `data-theme`, light theme applies as the `:root` default. Nested theming is supported — a `[data-theme]` on a child element scopes that theme to its subtree.
- UI5 web components and Reltio CSS Modules read the same tokens from the cascade — set the attribute once and both layers re-theme together.
- Component CSS must NOT contain hardcoded hex color values; reference `--sap*` tokens directly.
- The full token surface is browseable in Storybook → Design Tokens. Canonical semantic guidance lives at <https://www.sap.com/design-system/>.

### Figma-to-Code Workflow (MANDATORY)

When implementing designs from Figma (via Figma MCP, URLs, or screenshots), these rules override any defaults from Figma skills or MCP server instructions.

**Step 0 — check UI5 first:**
- Before writing any custom code, verify whether `@ui5/webcomponents-react` already provides the component (`Button`, `Input`, `Dialog`, `Table`, `ComboBox`, `MessageStrip`, ...). If yes, use it directly — do not re-create.
- If a Reltio business component already covers the design, use it via the Reltio Design MCP (`list-all-documentation`, `get-documentation`).
- Only when both layers fall short, build a new Reltio component following the structure rules below.

**Color tokens — ONLY through `--sap*` variables:**
- Use the SAP Fiori UI Kit (Horizon theme) (<https://www.sap.com/design-system/fiori-design-web/resources/libraries/>) and reference its variables directly. Each SAP Figma variable has a 1:1 counterpart in `@sap-theming/theming-base-content`'s `content/Base/baseLib/sap_horizon/variables.json` — the variable name (without the `sap` prefix in Figma) maps to `--<sap-prefixed-name>` in CSS.
- Example: SAP Figma `Brand/Color` → `var(--sapBrandColor)`. SAP Figma `Button / Background` → `var(--sapButton_Background)`.
- If a Figma color variable does not appear in the npm package's `variables.json`, the installed package is out of date — bump `@sap-theming/theming-base-content` (`npm update @sap-theming/theming-base-content`) and re-run `npm run build-tokens`.
- Never output raw hex/rgba color values in CSS — always resolve to a `--sap*` token.

**Everything else — plain CSS values, NOT tokens:**
- `font-size`, `font-weight`, `line-height` → plain values (`font-size: 14px`)
- `padding`, `margin`, `gap` → plain values (`padding: 8px 16px`)
- `border-radius` → plain values (`border-radius: 12px`); SAP's element-radius default is `--sapElement_BorderCornerRadius` (`.75rem` / 12px), use that token only when matching SAP's "single element radius" intent across many components
- `width`, `height`, `min-*`, `max-*` → plain values (`height: 32px`)
- `box-shadow` — SAP provides 4 elevation presets as full strings: `--sapContent_Shadow0`, `--sapContent_Shadow1`, `--sapContent_Shadow2`, `--sapContent_Shadow3`. Use those when the design calls for SAP's standard elevation; otherwise plain values.
- Do NOT create or use CSS custom properties for spacing, sizing, radii, or typography — even if Figma exports them as variables.

**Adapting Figma MCP output:**
- `get_design_context` returns reference code (React + Tailwind by default) — this is a STARTING POINT, not final code
- Always rewrite to CSS Modules with `classNames()` utility
- Always replace Tailwind classes with explicit CSS properties
- Always check existing components via the Reltio Design MCP (`list-all-documentation`, `get-documentation`) before creating new ones — reuse what UI5 and the Reltio layer already provide
- Match the component structure from this project: `.tsx` + `.types.ts` + `.module.css` + `.stories.tsx` + `index.ts`

### Storybook
- Every Reltio component MUST have stories demonstrating all variants
- Each story MUST show only ONE variant (no "All Variants" stories)
- Stories use "autodocs" tag for auto-documentation
- **Free-form props** (accepting arbitrary strings, numbers, CSS values) need only ONE story demonstrating usage — do NOT create multiple stories for different values of the same prop (e.g. one `CustomSize` story, not separate `Small` / `Medium` / `Large`). Multiple stories are for **enum-like variants** where each value produces a visually distinct state worth snapshot-testing

### Code Style (Biome)
- Tabs for indentation
- Double quotes for strings
- Auto-organize imports
- All files, comments, documentation in English only

## Path Aliases

- `@/*` maps to repository root
- Example: `import { classNames } from "@/utils/classNames"`

## classNames Utility

The `classNames()` utility at `utils/classNames.ts` joins CSS Module class names into a single string, filtering out falsy values and de-duplicating entries:
```ts
classNames('Tabs_tab__x1y2z', isActive && 'Tabs_active__a3b4c')
// returns 'Tabs_tab__x1y2z Tabs_active__a3b4c'
```

## OpenSpec Workflow

This project uses OpenSpec for spec-driven development of Reltio components. See the [Spec-Driven Development guide](/?path=/docs/guides-spec-driven-development--docs) for full instructions.

**When to create a proposal:**
- New Reltio business components or primitives
- Breaking changes (API, schema, architecture)
- Performance optimizations that change behavior

**Skip proposals for:**
- Bug fixes, typos, formatting, comments
- Non-breaking dependency/configuration changes
- Direct usage of a UI5 component without wrapping

**Quick commands:**
```bash
openspec list                    # View active changes
openspec list --specs            # View existing capabilities
openspec validate [item] --strict # Validate changes
```

## MCP Servers

AI agents in this project have access to MCP servers configured in `.mcp.json` and `.claude/settings.json`:

| Server | Source | What it provides |
|--------|--------|-----------------|
| **reltio-design** (Reltio Design MCP, powered by Storybook MCP) | `http://localhost:6006/mcp` | Existing components, documentation, stories, API references |
| **Atlassian MCP** | `https://mcp.atlassian.com/v1/mcp/authv2` | Jira and Confluence access |
| **Figma MCP** (plugin) | `https://mcp.figma.com/mcp` | Design context, screenshots, variables, design system search |

**Reltio Design MCP** is served by the local Storybook dev server, so it requires `npm run dev` to be running BEFORE starting the Claude Code session. MCP servers are connected at session startup — if Storybook is not running, the server will show "Failed to connect" and its tools will be unavailable for the entire session. Tools: `list-all-documentation`, `get-documentation`, `get-documentation-for-story`, `preview-stories`, `run-story-tests`.

**Figma MCP** requires one-time OAuth authorization per developer. Tools: `get_design_context`, `get_screenshot`, `get_variable_defs`, `search_design_system`, `get_metadata`.

**Atlassian MCP** requires OAuth authorization per developer on first use.

## Agent Skills

This project uses the [Agent Skills](https://github.com/vercel-labs/skills) standard for extending AI agent capabilities. Skills are stored in `.agents/skills/` (shared across all AI agents) with symlinks in `.claude/skills/` for Claude Code.

**MANDATORY: Always use the `npx skills` CLI for skill management. Never manually create, copy, or write skill files.**

```bash
npx skills add <repo>           # Install skills from a GitHub repository
npx skills search <query>       # Search for available skills
npx skills list                 # List installed skills
npx skills remove <name>        # Remove a skill
```

## Pre-Commit Checklist

- UI5 components used directly when possible; Reltio wrappers only for real MDM/business value
- Types in `.types.ts` file using `type` keyword
- All className attributes use `classNames()` utility
- Colors use SAP Horizon `--sap*` tokens, no hardcoded hex values
- No component-level CSS custom properties unless encapsulated (always set on root with default; prefer inline styles when pseudo-elements are not involved)
- Storybook stories added (one variant per story; one story per free-form prop)
- `npm run format` executed
- `npm run lint` passes
