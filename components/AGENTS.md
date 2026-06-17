# Component Development Guidelines

This directory holds **Reltio components** (business components + primitives) built on top of [`@ui5/webcomponents-react`](https://sap.github.io/ui5-webcomponents-react/), plus the **endorsed UI5 surface** as documentation-only directories (e.g. `components/Button/`). These directories are what `@reltio/design` re-exports for app teams.

Reltio is broader than MDM. Frame reusable work around **Context Intelligence and Unified Data**; use MDM language only for genuinely MDM-specific concepts (match groups, survivorship, merge/unmerge, source priority).

## `@reltio/design` is a facade, not a passthrough

UI5 is our **foundation**, but it is not our public API. `@reltio/design` is a facade with two jobs:

1. **Endorse** a pinned, CoE-tested subset of UI5 so apps inherit a single tested version transitively.
2. **Simplify** that surface for consumers — humans and AI agents. Building on UI5 does **not** mean inheriting its legacy or awkward ergonomics. Where a UI5 API is confusing, redundant, or legacy, the facade may **curate** it — rename, alias, collapse multiple components into one, or hide a component — to present the simplest correct API.

Three endorsement modes, in order of preference:

| Mode | When | How |
|---|---|---|
| **1:1 re-export** (default) | UI5's API is already clean and fits the design | Doc-only dir; `types.ts` re-exports the UI5 type unchanged. Stays aligned with SAP docs at zero cost. |
| **Curated re-export** | UI5's surface is awkward/legacy (confusing split, bad name, redundant variants) | Doc-only dir, but rename/alias/collapse the export in `components/index.ts`. **Document the divergence and rationale in the component README.** |
| **Wrapper** | Real Reltio product logic, or a primitive UI5 lacks | Full Reltio component (see structure below). |

**Divergence is deliberate, not casual.** Default to 1:1. Curate only when there is a real ergonomics/legacy problem, and treat it as a **public-API decision**: explain it in the README, ship a changeset, and route non-trivial cases through the CoE / OpenSpec. Restyling is never a reason to diverge or wrap.

> **Example — `ListItem`.** UI5 splits list rows into `ListItemStandard` (typed props) and `ListItemCustom` (empty slot). Reltio collapses this into one entity: `ListItemStandard` is exported as `ListItem`, customised via props + children; `ListItemCustom` is intentionally not endorsed. One obvious row entity instead of "which item wrapper do I use?".

### Import conventions

- **Inside this repo** (component authors): import UI5 directly — `import { Button } from "@ui5/webcomponents-react/Button"`. We are the wrappers.
- **App code & all public examples** (README, MDX, story snippets): `import { Button } from "@reltio/design/components"`.
- **CRITICAL — always include the `/components` subpath.** The published package exposes only subpath entries (`./components`, `./charts`, `./hooks`, `./utils`); bare `@reltio/design` resolves to nothing and breaks at install time. The MCP rewrites generated snippets via [`.storybook/reltioManifestPreset.ts`](../.storybook/reltioManifestPreset.ts).

## Decision tree

```
Does @ui5/webcomponents-react ship a component that fits?
├── Yes → Already endorsed (re-exported from @reltio/design)?
│         ├── Yes → Just import it.
│         └── No  → Add a doc-only dir and endorse it (1:1 or curated — see facade modes).
└── No → Compose several UI5 parts with Reltio product logic?
         ├── Yes → Build a Reltio business component.
         └── No → A product-agnostic primitive UI5 lacks?
                  ├── Yes → Build a Reltio primitive.
                  └── No → You probably don't need a new component.
```

## Component structure

A Reltio (wrapper/primitive) component MUST follow this layout:

```
components/ComponentName/
├── ComponentName.tsx          # Implementation (one-line JSDoc summary above the export)
├── ComponentName.types.ts     # Types (REQUIRED, separate file) — JSDoc on every field
├── ComponentName.module.css   # Scoped CSS Modules
├── ComponentName.stories.tsx  # CSF stories (Chromatic / interaction / a11y)
├── README.md                  # Prose docs (REQUIRED to ship)
├── ComponentName.story.mdx    # AUTO-GENERATED — never edit by hand
└── index.ts                   # Public API
```

### Doc-only directories (endorsed UI5 components)

An endorsed UI5 component is documented **without runtime code**, in two stages:

- **Iterate:** a `*.stories.tsx` alone (importing straight from `@ui5/webcomponents-react`) renders via default autodocs. No other files needed while you pick variants.
- **Ship:** add `README.md` + `<Name>.types.ts` (a `ComponentPropsWithoutRef<typeof UI5Component>` re-export, possibly under a curated name) so the build regenerates `<Name>.story.mdx` + `<Name>.schema.json`. Then add the export to `components/index.ts` (which `packages/design/components.ts` forwards). See `components/Button/` for the canonical 1:1 example, `components/ListItem/` for a curated one.

As soon as custom logic, styles, or props appear, the directory must follow the full structure above.

## Standards

### Public API

Import via each component's `index.ts`. Direct imports of internal files (`.tsx`, `.types.ts`, `.module.css`) from outside the folder are **forbidden** (`import { Chat } from "@/components/Chat"`, never `.../Chat/Chat`).

### TypeScript types (`.types.ts`)

- `type` only, never `interface`. Strict mode; no unjustified `any`.
- Components rendering a native element use `HtmlProps<Tag, CustomProps>` from `@/utils/types` (or bare `React.ComponentPropsWithoutRef<"tag">` for pure pass-through). Use `Omit<...>` to drop unsupported native props.

```typescript
import type { HtmlProps } from "@/utils/types";

export type ChipProps = HtmlProps<"button", {
	variant?: ChipVariant;
	size?: ChipSize;
}>;
```

- All rest props (`...rest`) MUST be spread onto the wrapper element (or onto the root UI5 component when wrapping one).
- Do NOT redeclare native props (`className`, `style`) — they are inherited. Declare a native prop only to change its type/semantics.
- Polymorphic components use a discriminated union with `HtmlProps` per branch.
- **Wrapping a UI5 component:** derive the prop type from the component (`ComponentPropsWithoutRef<typeof Button>`), spread rest onto the UI5 root, and forward `className` via `classNames(styles.root, className)`.

### CSS styling (Reltio components)

- All `className` attributes use the `classNames()` utility from `@/utils/classNames`.
- **Colors:** only SAP Horizon `--sap*` tokens (from `https://reltio.design/variables.css`). Never hardcode hex.
- **Typography, spacing, sizing, radii:** plain values (`font-size: 14px`, `padding: 8px 16px`). No global tokens for these.
- **Box-shadow:** use SAP elevation presets (`--sapContent_Shadow0..3`) when matching SAP elevation; otherwise plain values.
- **No component-level CSS variables as a customization API.** If a value is set and consumed on the same element, override the property directly — even across variants (`.root { height: 32px } .small { height: 26px }`). The only valid variable is a parent value that cascades to multiple children, and even then a compound selector (`.small .icon`) is often simpler.
- **Encapsulation:** if a component does use an internal CSS variable, always set it on the root (including its default, via inline style) so no ancestor/global variable can leak in. If the dynamic value only affects regular DOM (no pseudo-elements), use inline styles and skip the variable.
- **No `@media` queries** — components target desktop viewports for now.
- External customization happens only through React props and `--sap*` overrides — never via hashed CSS Module class names.

### CSS styling (UI5 web components)

UI5 lives in Shadow DOM. Restyle via, in order: (1) **`--sap*` tokens** scoped to a parent class (preferred — re-themes everything beneath), (2) **CSS Parts** (`ui5-button::part(button)`) for tweaks no token covers. Scope overrides to the component's own root so they don't bleed out. Do NOT wrap a UI5 component just to restyle it.

### Storybook stories

- One story per **enum-like** visual variant (worth a snapshot). **Free-form props** (arbitrary strings/numbers/CSS) get ONE demo story, not one per value.
- **Dual-theme is MANDATORY.** The global `DualThemeDecorator` renders every story in `horizon-light` + `horizon-dark`. It is on by default — do NOT disable for visual stories. Use `parameters.dualTheme: { split: "vertical" }` for wide/fullscreen visuals. `dualTheme: false` is a last resort for genuinely non-visual stories (hook/API demos) and needs an inline comment explaining why.
- Callbacks via `fn()` from `storybook/test`.

## Documentation pipeline

Four hand-authored sources feed the auto-generated `ComponentName.story.mdx`:

| Source | Purpose |
|---|---|
| One-line JSDoc above the export | Concise "what it does" → IDE hover, autodocs, MCP description |
| `ComponentName.types.ts` (per-field JSDoc) | Canonical API → `<JsonSchema>` table + MCP `## Props` |
| `README.md` | Narrative → docs page body + MCP `## Docs` |
| `ComponentName.stories.tsx` | Usage examples → `<Stories>` + MCP `## Stories` |

`scripts/build-component-docs.mjs` reads these and writes the static MDX + `<Name>.schema.json`. It is **opt-in by `README.md` presence**: the script globs `components/*` and `charts/*` and picks up any dir with `README.md` + `<Name>.types.ts` + `<Name>.stories.tsx`. Wired into `predev`/`prebuild-storybook`; run `npm run build-component-docs` manually after editing a source while the dev server runs. Never edit `.story.mdx` by hand.

While iterating (no `README.md` yet) the component renders via the simpler default autodocs page — enough to verify visuals and a11y. Opt into the static pipeline when the API is stable and you want remote MCP consumers to receive the rich payload.

### Why the manifest, not inlined comments

Storybook MCP returns the MDX as plain text, so JSX like `<JsonSchema />` / `<Stories />` arrives as raw tags. The detailed payload comes from the **components manifest** (`## Stories`, `## Props`); the README prose comes through verbatim as `## Docs`. Do NOT smuggle data into the MDX via hidden comments.

The `## Props` block needs help: default `react-docgen` can't resolve our `HtmlProps<…>` generic and errors on UI5 re-exports. [`.storybook/reltioManifestPreset.ts`](../.storybook/reltioManifestPreset.ts) fixes this by running the TS Compiler API extractor ([`scripts/extractTypeApi.mjs`](../scripts/extractTypeApi.mjs)) against `<Name>.types.ts` → `<Name>Props`. If `## Props` is empty/single-prop, that extraction failed — confirm `<Name>.types.ts` exports `<Name>Props` and check the dev log for a `[reltio-manifest]` warning.

### JSDoc convention

A single-line, action-oriented summary above `export const ComponentName` — describes WHAT it does, does not duplicate the README, does not describe internals. Lands in IDE hover, autodocs, and MCP `get-documentation`.

### `README.md` conventions

- Start with `# ComponentName` (one H1). **No import code-fence** — the build script injects the canonical `@reltio/design/...` import after the H1 (and strips any stale one).
- One intro paragraph (the WHY), then `###` subsections only (no H2). End with `### See also`.
- **Compact:** don't duplicate prop descriptions (`.types.ts`) or code examples (`.stories.tsx`). Cover only what isn't elsewhere — rationale, conventions, **any curation/divergence from UI5 and why**, edge cases.

### `.types.ts` per-field JSDoc

Put JSDoc on **every top-level prop** — it reaches both the `<JsonSchema>` table and MCP `## Props` (with `@default`, `@deprecated`). Nested object types are rendered by name only, so describe nested shapes in the parent prop's JSDoc or the README.

## Creating a new component

> **TL;DR for AI agents:** invoke `Skill add-design-component` (`<Name> trajectory=thin|wrapper`). It walks both trajectories, composes `openspec-propose` (wrappers) + `add-changeset`, and stops at a review-ready commit.

1. **Confirm the gap** — check UI5 docs and Reltio Design MCP `list-all-documentation`.
2. **Iterate** — create the structure files; verify visually via default autodocs (`npm run dev`); `npm run format && npm run lint` as you go.
3. **Ship** — write `README.md` (opts in automatically), `npm run build-component-docs`, format + lint, visual check, and for non-trivial nested types verify the MCP payload. Commit `README.md` + the generated `.story.mdx` together.

For new business components, breaking changes, or curated divergences from UI5, drive it through **OpenSpec** (`/opsx:new` → `/opsx:continue` → `/opsx:apply` → `/opsx:archive`). See the [Spec-Driven Development guide](/?path=/docs/guides-spec-driven-development--docs).
