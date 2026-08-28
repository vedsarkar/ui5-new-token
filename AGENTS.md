# AGENTS.md

This file provides guidance to AI agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Project Overview

**Reltio Design Platform** is a comprehensive UI development, testing, and documentation ecosystem for the Reltio product suite. It serves as a unified platform enabling multiple teams to build, test, document, and distribute Reltio product experiences while maintaining consistency, quality, and embeddability across the SAP ecosystem.

### Product Positioning

Reltio is broader than a traditional MDM platform. The current product direction should be described as **Context Intelligence and Unified Data**. MDM remains an important domain and source of examples, but agents must not frame Reltio Design Platform as MDM-only unless the specific component, API, or workflow is explicitly MDM-specific.

When writing documentation, technical guides, component READMEs, examples, Storybook copy, specs, or release notes:

- Prefer broad language such as **Reltio applications**, **Reltio product experiences**, **Reltio business components**, **data stewardship**, **Context Intelligence**, and **Unified Data**
- Use **MDM** only when the exact feature or domain concept is actually MDM-specific (for example match groups, survivorship, entity merge/unmerge, source priority)
- Avoid headlines, taglines, and overview copy that imply the platform is only for MDM apps
- Treat Reltio Design Platform as a cross-product foundation for SAP-aligned UI, API-first product contracts, and AI-native delivery through Reltio Design MCP

### Mission

Eliminate UI fragmentation across products while accelerating development of new applications and features by composing on top of the SAP Fiori design system, themed with SAP Horizon.

### Core Principles

- **Single source of truth** — one platform for all UI-related assets and knowledge
- **Everything as code** — components, tests, documentation, guidelines, configs, AI instructions
- **AI-ready by design** — prepared for integration with AI agents via MCP-UI and A2UI
- **Compose, don't reinvent** — UI5 Web Components React is the foundation; Reltio Design adds only what UI5 lacks

### What You'll Find Here

- **Reltio Business Components** — product-specific components and primitives built on top of UI5
- **Charts** — ECharts-based visualizations
- **Design Tokens & Fonts** — SAP Horizon tokens and SAP 72 fonts shipped as static CSS
- **Storybook Stories** — documentation + tests + demos + specifications in one artifact
- **Technical Guides** — rich MDX guidelines for developers and product teams
- **Hooks & API utilities** — shared utilities and Reltio API integrations

### Who Uses This

**Developers, Designers, QA Engineers, Product Managers** — build and review Reltio applications
**Partners & Customers** — integrate and embed Reltio UI components
**AI Agents** — interact via MDX, MCP-UI and A2UI protocols

## Application Context (`apps/`)

The `apps/` directory holds **platform-owned context files** for Reltio product applications — story MDX, migration status, review checklists, PRDs — managed by the UI CoE. Each subdirectory groups the documentation for one app.

```
apps/<app-name>/
├── <app-name>.story.mdx   # Storybook entry describing the app
├── CLAUDE.md              # Platform-owned context for AI agents (when present)
├── migration-status.md    # Migration tracking (MUI→UI5, auth, etc.)
└── ...                    # Any other platform-owned documentation
```

Application **source code is no longer tracked here**. Each app lives in its own Bitbucket repository and is owned by its own team. Git submodules were removed — they caused too much friction (stale pointers, accidental commits, slow clones). To work across the platform repo and one or more app repos, use **VSCode multi-root workspaces**: clone each app independently and add it to a `.code-workspace` file alongside `reltio-design`.

If you do clone an app into `apps/<name>/src/` for local cross-app analysis, the `apps/*/src/` pattern in `.gitignore` keeps those files untracked — they will never be committed back into reltio-design.

### How AI agents should use apps/

When asked to analyze, compare, review, or plan migrations across applications:
1. Read platform-owned context from `apps/<name>/` (story.mdx, CLAUDE.md, migration status, PRDs, etc.) — this is the canonical, in-repo material.
2. If you need application source code, ask the user to add the relevant app repos to a VSCode workspace, or to clone them into `apps/<name>/src/` locally — those checkouts stay untracked.
3. Reference Reltio Design Platform standards (this CLAUDE.md) as the target state.
4. Propose changes that respect each application's existing architecture and conventions; deliver them as PRs in the app's own repository, not here.

Do NOT apply Reltio Design Platform conventions (Biome, CSS Modules, `type` keyword, etc.) when analyzing or suggesting changes to application code — each app has its own standards. Platform conventions apply only to code inside this repository.

## Tech Stack

- **Framework**: React 18+
- **Single distribution package**: [`@reltio/design`](packages/design/) — the only thing a Reltio app installs. Re-exports an endorsed subset of SAP Fiori (UI5) components plus all Reltio business components, charts, hooks, and utilities. Pinned to an exact UI5 version that the UI Center of Excellence has tested.
- **UI foundation (transitive, pinned)**: [`@ui5/webcomponents-react`](https://sap.github.io/ui5-webcomponents-react/) — bundled with `@reltio/design` at an exact version (currently `2.21.3`). Apps never install it directly.
- **Icons**: [`@ui5/webcomponents-icons`](https://sap.github.io/ui5-webcomponents/) — SAP Fiori icon set. Apps never import `@ui5/webcomponents-icons` directly; the package comes transitively via `@reltio/design`. Register each icon by importing its name from `@reltio/design/icons/sap/<kebab-name>` (`import saveIcon from "@reltio/design/icons/sap/save"`) and pass the binding to an `icon` prop or `<Icon name={saveIcon} />`. The import registers the icon; because JS modules are tree-shakable (`sideEffects` lists only `./variables.css` and `./fonts.css`), a bare `import "@reltio/design/icons/sap/save"` is dropped by the bundler.
- **Design tokens & fonts**: repo-local token files (`utils/sap_horizon.tokens.json`, `utils/sap_horizon_dark.tokens.json`) that mirror the SAP Horizon ([`@sap-theming/theming-base-content`](https://github.com/SAP/theming-base-content)) key surface 1:1 with Reltio-customised values — `npm run build-tokens` generates `public/variables.css` and `npm run build-fonts` generates `public/fonts.css`; the SAP 72 `public/fonts/*.woff2` binaries are vendored in the repo
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

Toolchain: **Node ≥ 22** (pinned via `.nvmrc`) and **npm ≥ 10**. The repo is an npm-workspaces monorepo — `pnpm`/`yarn` are not supported; `scripts/release.mjs` and `bitbucket-pipelines.yml` assume npm's lockfile and `--workspace=` flag.

```bash
nvm use                   # pick the Node version from .nvmrc
npm install               # installs all workspaces in one pass
npm run dev               # Start Storybook dev server (port 6006) — also serves the Reltio Design MCP at /mcp
npm run build-storybook   # Build Storybook for production
npm run build-tokens      # Generate public/variables.css from utils/*.tokens.json
npm run build-fonts       # Generate public/fonts.css (SAP 72 @font-face rules; .woff2 vendored in public/fonts)
npm run lint              # Check code with Biome (no auto-fix)
npm run format            # Format code with Biome (auto-fix)
npm run deploy            # Deploy to Chromatic for visual testing
npm run test              # Run Vitest tests
npm run coverage          # Run tests with coverage
npm run changeset         # Author a release-intent file under .changeset/ (see Release & PR workflow)
```

Run a single Vitest file or test name:

```bash
npx vitest run components/Chat/Chat.test.tsx        # one file
npx vitest run -t "renders streaming messages"      # by test-name pattern
```

## Release & PR workflow

Releases are driven by [Changesets](https://github.com/changesets/changesets). The contributor's only release responsibility is to ship a changeset with the PR; a CoE maintainer cuts the actual release later.

- **Branch from `main`** (the only long-lived branch), one topic per branch, **squash-merge**.
- **PR title**: `<type>: <imperative summary>` — e.g. `feat: add Chat composer`, `fix: align Avatar focus ring`, `docs: update token guide`.
- **Required CI checks** in the `pull-requests` pipeline: `test` and `chromatic`.
- **Changeset by convention** for every PR that changes source of a published package. The CI guard currently only inspects `packages/*` and misses changes under root-level `components/`, `charts/`, `hooks/`, `utils/` (which reach `@reltio/design` via the re-export layer in `packages/design/*.ts`). Add changesets manually for those paths so release notes stay accurate.
- **Bump-type heuristic** when running `npm run changeset`:

| Bump | Use when |
|---|---|
| `patch` | Bug fix, perf fix, internal refactor, doc-only `.tsx` change — no public-API impact |
| `minor` | New component, new prop, new variant, additional types — anything **additive** that is safe to upgrade into |
| `major` | Renamed/removed export, behaviour change, restructured API — anything a consumer must read a migration note for. Include the migration snippet in the changeset summary |

- **Skip a changeset** when the PR only touches `*.story.mdx`/guides/READMEs/comments, `.storybook/`, `scripts/`, root `biome.json`/`tsconfig.json`, or dev-only `package.json` deps. Use `npm run changeset -- --empty` to record an intentional no-bump.
- **Releases are not automatic on merge.** Merging a feature PR never publishes. A maintainer triggers the `version @reltio packages` custom pipeline, which opens a release/version PR that — once merged into `main` — triggers the publish.
- **Sharing a PR build** with a consumer app: ask a maintainer to run `snapshot @reltio packages`; the consumer installs `@reltio/design@pr-<id>` (does not affect `latest`).
- **Adding a new publishable package**: under `packages/<name>/` with `"license": "Apache-2.0"`, `"publishConfig": { "access": "public" }`, a `dist/` build output, and a `postbuild` step that copies the manifest, `README.md`, and the root `LICENSE` + `NOTICE` into `dist/`. The release pipeline picks it up automatically.

Detailed mechanics live in `CONTRIBUTING.md` and the in-Storybook **Guides → Release Process**.

## UI Architecture

The platform exposes a **single distribution package** to apps — `@reltio/design` — that bundles every UI surface they need: Reltio business components, Reltio primitives, charts, hooks, and a curated set of endorsed SAP Fiori (UI5) components. UI5 React itself is a transitive dependency at a pinned version.

```
┌──────────────────────────────────────────────────────────────┐
│  Reltio apps & partners                                      │
│   import { Button, Chat, MessageStrip, ... }                 │
│     from "@reltio/design/components";                        │
└──────────────────────────────────────────────────────────────┘
                              ▲
┌─────────────────────────────┴────────────────────────────────┐
│  @reltio/design (this repo) — the single endorsed entry point│
│   • Reltio business components (Chat, AppSelector, Details)  │
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
| Reltio app code, hooks | `@reltio/design/hooks` | `import { useTextStream } from "@reltio/design/hooks"` |
| Reltio app code, utilities | `@reltio/design/utils` | `import { classNames } from "@reltio/design/utils"` |
| Reltio component author (this repo, building wrappers) | Direct UI5 imports allowed inside `components/` to wrap UI5 with Reltio product logic | `import { Button } from "@ui5/webcomponents-react/Button"` (only inside `components/SaveEntityButton/SaveEntityButton.tsx` etc.) |
| Stories / docs (READMEs, MDX, snippets) | `@reltio/design/components` (MCP rewrites snippets to this path automatically) | `import { Button } from "@reltio/design/components"` |

> **Why you import via the `/components` subpath.** Platform packages **intentionally ship without an `exports` map**, so the full built file tree is importable at any depth (see [Open package surface](#open-package-surface-no-exports-lock) below) — nothing blocks a deep import like `@reltio/design/components/SideNavigation`. The **recommended** entry is still the curated subpath barrels (`./components`, `./charts`, `./hooks`, `./utils`, `./icons`), which is what every snippet and doc uses. What does **not** work is the bare package name: `import { X } from "@reltio/design"` has no root entry (no `main`) and fails, so always include a subpath. Storybook MCP and the Manifest Debugger automatically rewrite generated snippets to the subpath via `.storybook/reltioManifestPreset.ts`, so AI agents always see the correct path. This is a platform-wide rule — see [Module Conventions](#module-conventions-mandatory-for-packages-code) below; every `@reltio/*` package follows it.

### When to use an endorsed UI5 component vs. build a Reltio component

| Situation | What to do |
|-----------|-----------|
| `@reltio/design` re-exports a UI5 component that fits the design as-is | Import from `@reltio/design`. Do not wrap. |
| You need a UI5 component that's not yet re-exported | Open an issue with the CoE so a documentation-only directory + endorsement is added. Do **not** install `@ui5/webcomponents-react` directly. |
| You need to compose several UI5 components with Reltio product logic (entity profile, relationship view, source priority, context intelligence workflow, ...) | Build a Reltio **business component** under `components/`. |
| You need a primitive that UI5 does not provide and that is product-agnostic | Build a Reltio **primitive** under `components/`. |
| You need to restyle a UI5 component | Use `--sap*` tokens (preferred) or UI5's CSS Parts (`::part()`). Do not wrap just for styling. |

### Theming

Theming is driven by static CSS:

1. The consumer loads `https://reltio.design/variables.css` and `https://reltio.design/fonts.css` in `<head>` (or self-hosts the files generated by `npm run build-tokens`).
2. Any ancestor element carries `data-theme="sap-reltio-light"` or `data-theme="sap-reltio-dark"` (legacy `horizon-*` values still accepted).
3. UI5 web components inherit `--sap*` CSS variables through Shadow DOM automatically.
4. Reltio CSS Modules consume the same `--sap*` tokens through the normal cascade.

Nested theming works: a `[data-theme]` on a child element scopes that theme to its subtree.

## Component Structure (MANDATORY for Reltio components)

This rule applies to **Reltio** components under `components/` — i.e. business components and primitives we author. It does **not** apply to bare re-exports or thin pass-throughs of UI5 components.

> See [`components/AGENTS.md`](components/AGENTS.md) for the canonical component-author rules — props typing with `HtmlProps<Tag, CustomProps>`, rest-prop spreading onto the wrapper element, ref forwarding, and the documentation-only directory pattern.

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

## Module Conventions (MANDATORY for `packages/*` code)

Rules for TypeScript code inside any `packages/*` workspace and the repository-root code folders (`charts/`, `hooks/`, `utils/`, `openApi/`) that ship through them. React component layout is covered separately in the [Component Structure](#component-structure-mandatory-for-reltio-components) section above; everything else follows this section.

### File naming

File names predict their contents. Two patterns are allowed:

| Pattern | When to use | Example |
|---|---|---|
| `<exportName>.ts` (camelCase, or PascalCase matching a class) | The file exports exactly one function, class, or value (plus tightly bound type guards) | `getBasicToken.ts` exports `getBasicToken` · `createNextAuth.ts` exports `createNextAuth` |
| `<topic>.ts` (camelCase) | The file exports several related items forming a coherent topic | `cookies.ts` exports `parseCookies`, `serializeCookie`, `STATE_COOKIE`, ... · `state.ts` exports `generateState` and `validateState` |

**Anti-pattern:** a file whose name does not match its primary export. `oauth.ts` exporting a single `createOAuthClient` is misleading and must be renamed to `createOAuthClient.ts`.

### Barrel pattern (MANDATORY)

Every module that contributes to a workspace's public surface has its own `index.ts` that **curates** what is publicly visible:

```ts
// packages/auth/src/utils/index.ts
export * from "./getAccessToken";
export * from "./getBasicToken";
export * from "./getRefreshToken";
// cookies.ts, state.ts, readHeader.ts, validateRedirectUrl.ts are
// intentionally absent — they stay out of the recommended (barrelled)
// surface. See "Open package surface" below: this is curation by
// convention, not a hard import lock.
```

Subpath entry files at the workspace root (e.g. `packages/design/components.ts`, `packages/auth/src/<sub>/index.ts`) are thin `export *` pass-throughs:

```ts
// packages/design/components.ts
export * from "@/components";
```

Files NOT listed in any `index.ts` along the chain stay out of the **recommended** (barrelled) surface. This is how `@reltio/auth` keeps `createOAuthClient` out of its public API. Note this is a curation / intent signal, **not** a hard boundary — because packages ship without an `exports` lock (see below), a determined consumer can still deep-import a non-barrelled file. To make something genuinely hard to reach, nest it deeper and leave it out of every `index.ts`.

### Open package surface (no `exports` lock)

Platform packages **intentionally ship without an `exports` map**. The entire built file tree is importable at any nesting depth — `@reltio/design/components/SideNavigation`, `@reltio/design/utils/classNames`, deeper still. This is a deliberate honesty-with-consumers choice: a bundler resolves any file or folder (directory imports fall back to `index.js`), so nobody has to invent workarounds to reach a nested file. Empirically, adding a wildcard `exports` map (`"./*": "./*"`) would *break* that directory→`index` resolution, so we do not add one.

Keep these consequences in mind:

- **Recommended entry = the curated subpath barrels** — `@reltio/design/components`, `./charts`, `./hooks`, `./utils`, `./icons`. Import from those unless you have a concrete reason to reach a nested file. MCP snippets and docs always use them.
- **Bare package name fails** — there is no root entry (no `main`), so `import { X } from "@reltio/design"` does not resolve. Always include a subpath. The same holds for every platform package (e.g. `@reltio/auth/next`, not bare `@reltio/auth`).
- **Privacy is by convention, not enforced** — the `index.ts` barrels curate the recommended surface, but nothing physically prevents a deep import of a non-barrelled file. To keep something out of reach, nest it deeper (e.g. `components/MyTable/internals/…`) and leave it out of every `index.ts`; treat this as intent, not a lock.
- **Consumption is bundler-first** (webpack/Vite/Next). The raw Node ESM resolver will not load these files directly — the emitted code uses extensionless relative imports and CSS-module imports that only a bundler resolves. Consumers running SSR or tooling paths outside the bundler must transpile the package (e.g. Next `transpilePackages: ["@reltio/design"]`).

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

### Global Design Tokens (SAP Reltio themes)
- The platform ships two SAP-branded themes — **SAP Reltio** (light) and **SAP Reltio Dark** — a Reltio-branded customisation of SAP Horizon. The `data-theme` attribute values are `sap-reltio-light` / `sap-reltio-dark` (brand-explicit); the legacy `horizon-light` / `horizon-dark` values remain a **deprecated alias** that resolves to the same tokens. This is separate from UI5's own `sapSapThemeId` (`sap_horizon` / `sap_horizon_dark`), which UI5 manages internally; official SAP registration of a dedicated Reltio `themeId` is planned.
- The platform mirrors SAP Horizon's design-token **key surface** 1:1 from [SAP/theming-base-content](https://github.com/SAP/theming-base-content) — names and casing (camelCase) are preserved verbatim. **Values** are Reltio-customised for selected tokens; every SAP Horizon key stays present.
- Generated CSS lives at `public/variables.css` — under `[data-theme="sap-reltio-light"]` and `[data-theme="sap-reltio-dark"]` blocks (each block also lists the legacy `horizon-*` alias and a `:root[data-theme]` form). The UI5 web components inject only their **active** theme at runtime (always the stock **light** set — UI5 doesn't read `data-theme`), so `build-tokens` omits only the tokens that equal stock light in **both** themes and emits every other token for **both** themes (both blocks share the same key set, so nested/sibling theming re-applies correctly). It computes this by diffing the token files against UI5's stock light bundle. Auto-generated — do NOT edit manually, run `npm run build-tokens`.
- Sources: repo-local token files `utils/sap_horizon.tokens.json` (light) and `utils/sap_horizon_dark.tokens.json` (dark). Each carries the full SAP Horizon key set in upstream order with Reltio-tuned values. The SAP 72 typography `.woff2` binaries are vendored under `public/fonts/`. To customise tokens: edit the `utils/*.tokens.json` files, then re-run `npm run build-tokens` and commit the regenerated `public/variables.css`. The `@font-face` stylesheet `public/fonts.css` is generated separately by `npm run build-fonts`.
- Token naming: `--sap{Group}*` or `--sap{Group}_{Detail}` (camelCase + underscore separators). Examples: `--sapBrandColor`, `--sapTextColor`, `--sapElement_BorderCornerRadius`, `--sapContent_FocusColor`, `--sapContent_Shadow0`, `--sapButton_Background`, `--sapField_BorderColor`.
- Theme activation: the consumer loads `variables.css` in `<head>` and sets `data-theme="sap-reltio-light"` or `data-theme="sap-reltio-dark"` (legacy `horizon-*` still accepted) on an ancestor element. `data-theme` is **required** — because `variables.css` ships only the Reltio delta, an element without a `data-theme` ancestor renders with UI5's stock SAP Horizon values, not the Reltio palette. Nested theming is supported — a `[data-theme]` on a child element scopes that theme to its subtree. Each theme is emitted under both `:root[data-theme="…"]` and `[data-theme="…"]` so the attribute works whether it sits on `<html>` or a nested element, out-ranking UI5's runtime-injected `:root` sheet.
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

### MDX in `*.story.mdx` files (MANDATORY)
- **Tables MUST use HTML, not Markdown.** Storybook's MDX renderer does not reliably parse Markdown table syntax (`| col1 | col2 |`) — pipe-separated tables render as raw text in production builds. Always write `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` directly.

```mdx
{/* BAD — pipe-separated Markdown table renders as plain text */}
| Endpoint | Method |
|---|---|
| /login | GET |

{/* GOOD — HTML table renders correctly */}
<table>
  <thead><tr><th>Endpoint</th><th>Method</th></tr></thead>
  <tbody>
    <tr><td><code>/login</code></td><td>GET</td></tr>
  </tbody>
</table>
```

- Wrap content that contains JSX-conflicting characters (`<`, `>`, `{`, `}`) in either `<code>{` `}</code>` template literals or escape them. The `{` `}` form is preferred for any inline code that contains generic-looking syntax (`<mount>/login`, `Response<T>`, JSX examples).
- Use the same HTML approach for any other content where Markdown might be ambiguous in MDX context (nested lists with code blocks, complex blockquotes).

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

AI agents in this project have access to MCP servers configured in `.mcp.json` (Claude Code) and `.cursor/mcp.json` (Cursor):

| Server | Source | What it provides |
|--------|--------|-----------------|
| **reltio-design-local** (Reltio Design MCP, powered by Storybook MCP) | `http://localhost:6006/mcp` | Existing components, documentation, stories, API references, story-authoring conventions, story tests |
| **Atlassian MCP** | `https://mcp.atlassian.com/v1/mcp/authv2` | Jira and Confluence access |
| **Figma MCP** (plugin) | `https://mcp.figma.com/mcp` | Design context, screenshots, variables, design system search |

**Reltio Design MCP** is served by the Storybook dev server, so it requires `npm run dev` to be running BEFORE starting the agent session. MCP servers are connected at session startup — if Storybook is not running, the server will show "Failed to connect" and its tools will be unavailable for the entire session.

The local dev server and the published endpoint (`https://reltio.design/mcp`, which consumer repos connect to as `reltio-design`) do **not** expose the same tools. Both serve the three documentation tools — `list-all-documentation`, `get-documentation`, `get-documentation-for-story`. Only the dev server adds `get-storybook-story-instructions`, `preview-stories`, and `run-story-tests`, because those need a live runtime (preview iframe and Vitest runner). Any task that depends on those three must run against `npm run dev`.

**Figma MCP** requires one-time OAuth authorization per developer. Tools: `get_design_context`, `get_screenshot`, `get_variable_defs`, `search_design_system`, `get_metadata`.

**Atlassian MCP** requires OAuth authorization per developer on first use.

### Reltio Design MCP usage rules (MANDATORY)

When working on UI components, query the Reltio Design MCP for Storybook's component and documentation knowledge BEFORE answering or changing code.

- **Never invent component props.** Before using ANY prop on a design-system component — including plausible-sounding ones like `shadow`, `size`, or `variant` — confirm it exists via `get-documentation`. Prop names from other component libraries do not transfer.
- Call `list-all-documentation` for the component catalogue, then `get-documentation` on the specific component to read its documented props and examples.
- Use only props that are explicitly documented or demonstrated in an example story. If a prop is not documented, stop and ask the user instead of assuming it exists.
- **A story name is not evidence of a prop name.** Verify every prop against the documentation payload, never against the story title.
- Call `get-storybook-story-instructions` before creating or updating stories so you follow the current conventions.
- Check your work with `run-story-tests`.

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

- UI5 components used directly when possible; Reltio wrappers only for real Reltio product value
- Types in `.types.ts` file using `type` keyword
- All className attributes use `classNames()` utility
- Colors use SAP Horizon `--sap*` tokens, no hardcoded hex values
- No component-level CSS custom properties unless encapsulated (always set on root with default; prefer inline styles when pseudo-elements are not involved)
- Storybook stories added (one variant per story; one story per free-form prop)
- `npm run format` executed
- `npm run lint` passes
