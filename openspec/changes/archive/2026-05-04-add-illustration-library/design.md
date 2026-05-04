# Design: Illustration Library Architecture

## Context

The Reltio Design System already ships an [icon library](../../specs/icon-library/spec.md) that follows a generator-driven pipeline: source SVGs land in `public/icons/`, a Node.js script (`scripts/build-icons.mjs`) emits a TSX component per icon, a single `Icon.module.css` carries shared styles, and the Storybook block `.storybook/blocks/IconLibrary.tsx` renders the catalog with copy-to-clipboard. Icons inline their SVG body inside the component because each icon is monochromatic and ~100 bytes of `<path>` data; icons also expose a public CDN URL because the fill is `currentColor` and renders consistently in any context.

Illustrations break two of those assumptions:

- They are **multi-color**, with every fill keyed to a SAP `var(--sapContent_Illustrative_Color*)` CSS variable
- They come in three size-specific art crops (Spot 128×128, Dialog 240×160, Scene 320×220), each crafted as a separate piece — not a CSS scale

The upstream [`SAP/ui5-webcomponents`](https://github.com/SAP/ui5-webcomponents/tree/main/packages/fiori/src/illustrations) repository ships 72 illustration names × 4 sizes (Dot/Spot/Dialog/Scene) as flat SVG files under Apache 2.0. The fills are exclusively `var(--sapContent_Illustrative_Color*)` references — there is no separate dark-theme file. Theme switching is achieved by overriding the `--sapContent_Illustrative_*` tokens in the host CSS cascade — the same tokens our `tokens/sap_horizon*.tokens.json` already mirror (31 tokens in light, 31 in dark, all present in `public/variables.css`).

This means **the SVG fills resolve only when the SVG is inlined into a host DOM that loads `public/variables.css`**. Any out-of-context render — opening the raw `.svg` file directly in a browser, an `<img src>` tag, a CSS `background-image`, an `<object>`, an `<iframe>`, or a cross-document `<svg><use>` — runs the SVG in an isolated render context where the CSS variables do not cascade and the artwork appears blank. Offering a public URL would therefore expose an asset that doesn't actually render anywhere outside our own React tree, creating a confusing API.

This design treats the React component as the **single canonical access path** and keeps raw SVGs as private build artifacts only.

## Goals / Non-Goals

**Goals:**

- Mirror the icon-library file structure for the generated React surface (so contributors recognize the pattern), while diverging on the source-asset location since SVGs here are not public assets
- Use SAP/ui5-webcomponents as the upstream source of truth, mirroring assets verbatim (the same philosophy already applied to `tokens/`)
- Distribute illustrations exclusively as tree-shakable React components, one per illustration
- Support `size`, `title`, `description` props with sensible defaults
- Theme-switch between light and dark purely through the existing SAP `--sapContent_Illustrative_*` token cascade — no extra dark assets, no React state
- Generation is a single-command operation: `npm run build-illustrations` downloads from upstream, validates the inventory, and emits all derived files

**Non-Goals:**

- Public CDN URL for raw illustration SVGs (rejected: the SAP variable references make standalone rendering impossible, so a public URL would be a misleading API surface)
- Manual export from Figma (rejected: we now use the upstream SAP source)
- Pre-rendered light/dark SVG pairs (rejected: SAP's tokenized SVGs make this redundant)
- Pre-rendered "flat-color" baked variants for non-React consumers (out of scope; can be a follow-up change if a real consumer use case appears)
- TNT (Tools, Networking, Tracking) illustration set — initial scope is a curated 32-name subset of the upstream `sapIllus` set; TNT can be a follow-up change
- The `Dot` size variant — SAP includes it for very tight inline contexts (≤ 260 px). We start with `Spot`/`Dialog`/`Scene` and can extend later
- Animation, lottie, or video illustrations
- Illustration editor or design tooling
- Custom illustration palette overrides via JS API (consumers can already do this by overriding `--sapContent_Illustrative_*` in their own CSS)

## Decisions

### Decision 1: Folder Structure

```text
illustrations/                               # All illustration code & assets
├── _source/                                 # Build artifacts: raw SVGs from SAP
│   ├── no-data-spot.svg                     #   32 approved names × 3 sizes = 96 files
│   ├── no-data-dialog.svg
│   ├── no-data-scene.svg
│   ├── ...
├── manifest.json                            # Hand-curated default copy
├── Illustration.tsx                         # Shared core component
├── Illustration.types.ts                    # IllustrationProps, IllustrationSize
├── Illustration.module.css                  # Shared sizes + size-class show/hide
├── IllustrationDoc.tsx                      # Type-only doc component for Storybook
├── IllustrationStories.module.css           # Shared story layout
├── NoData.tsx                               # Generated wrapper containing inlined SVG bodies
├── EmptyList.tsx
├── BalloonSky.tsx
├── ...                                      # 32 wrappers (one per approved name)
├── Illustrations.stories.tsx                # Unified stories file
└── index.ts                                 # Barrel exports + illustrationMap

scripts/build-illustrations.mjs              # Generator (HTTP fetch + inline SVG)

.storybook/blocks/IllustrationLibrary.tsx    # Catalog block (preview + import only)
.storybook/blocks/IllustrationLibrary.module.css

guides/illustration-library.story.mdx        # Documentation guide
```

**Rationale:**

- `illustrations/_source/` lives alongside the components so the relationship is obvious. The leading underscore signals "build artifact, not part of the public surface"; `package.json` exports only match `*.tsx`, so consumers cannot accidentally import these files
- Critically, the SVG sources are NOT in `public/`. Storybook (and the deployed CDN) does not serve them. They exist only to feed the build script and to make PR diffs readable when bumping `SAP_REF`
- `illustrations/manifest.json` lives at the root of the package surface because it's a hand-curated configuration file, not a build artifact

**Alternatives considered:**

- `public/illustrations/` (initial draft). Rejected once we accepted that public-URL access is unsupportable for this asset class — keeping SVGs in `public/` would suggest they are reachable via CDN, which is misleading
- `node_modules/.cache/illustrations/` (gitignored). Rejected because we want PR diffs to surface upstream changes; tracking the SVGs in git makes upstream syncs reviewable

### Decision 2: Source — Upstream SAP/ui5-webcomponents (Curated)

Mirror **a curated subset** of the 72 illustrations from [`SAP/ui5-webcomponents/packages/fiori/src/illustrations`](https://github.com/SAP/ui5-webcomponents/tree/main/packages/fiori/src/illustrations) verbatim, fetched at build time from the GitHub raw endpoint:

```text
https://raw.githubusercontent.com/UI5/webcomponents/<ref>/packages/fiori/src/illustrations/sapIllus-<Size>-<Name>.svg
```

The `<ref>` is pinned to a specific git tag (e.g. `v2.21.1`) for reproducibility. Filename normalization converts SAP's `sapIllus-Dialog-NoData.svg` to our kebab-case convention `no-data-dialog.svg` at fetch time.

**Rationale:**

- This is the same philosophy already applied to design tokens — `tokens/sap_horizon*.tokens.json` is a verbatim copy of the SAP source. Illustrations become a natural extension.
- Apache 2.0 license (consistent with our existing dependencies).
- Authoritative source: SAP designs and maintains these illustrations as part of the Fiori design system; the kit linked from Figma is the canvas representation of the same set.
- No manual export step — fully automated and reproducible.

### Decision 2.1: Curation Policy

Not every SAP-shipped illustration matches the current SAP Horizon Figma kit that the Reltio Design Platform aligns with. Some upstream SVGs are visually outdated (older art crops, deprecated `_v1` variants, stylistic regressions in palette / line weight / perspective). Shipping all 72 verbatim would dilute the brand consistency of consumers' UIs.

The build script enforces curation through a single explicit allowlist: `ILLUSTRATION_NAMES`. Anything not in the list is simply not built. There is no parallel rejected-list — names that don't pass design review are just absent from `ILLUSTRATION_NAMES`, and the rationale for why a particular name was never added (or was removed) lives in commit history rather than as dead code.

Adding a new illustration is a single, reviewable diff:

1. Validate the candidate against the current SAP Horizon Figma kit
2. Get design review approval
3. Add the name to `ILLUSTRATION_NAMES`
4. Add a default `title` and `description` to `illustrations/manifest.json`
5. Run `npm run build-illustrations`

**Reconcile pass:** when a name is removed from `ILLUSTRATION_NAMES` (or when the build script renames artifacts), the reconcile pass at the start of every build deletes orphan `_source/<name>-<size>.svg` and `<PascalName>.tsx` files automatically. No manual cleanup required.

**Alternatives considered:**

- Allowlist + blocklist with sanity check. Rejected: blocklist adds maintenance overhead (must be synced with each SAP_REF bump), the rationale was identical for every entry so the audit-trail value was illusory, and an allowlist alone provides the same effective gate (any addition to it is just as visible in PR review). Occam's razor.
- Single blocklist (download all, filter at build time). Rejected: silently picks up new SAP illustrations on `SAP_REF` bump without review. The allowlist forces an explicit decision per name.
- ESLint / TS rule. Rejected: adds tooling complexity for the same outcome the allowlist provides cleanly.

### Decision 3: Single Access Path — React Component Only

Each illustration is exposed exclusively as a React component imported from `@reltio/design/illustrations`. There is no public URL, no `<img src>` pattern, and no CDN endpoint.

**Why no public URL:**

The SAP source SVGs use `var(--sapContent_Illustrative_Color*)` for every fill. Browsers render embedded SVG (via `<img>`, `background-image`, `<object>`, `<iframe>`, cross-document `<use>`, or direct file viewing) in an isolated context that does NOT inherit CSS custom properties from the host document. The artwork therefore renders blank in every direct-URL scenario, even when the host page loads `public/variables.css`. The only render path that propagates the variables is **inlining the SVG into the host DOM**, which is exactly what the React component does.

Offering a public URL would expose an asset that fails to render in any consumer-facing scenario. We avoid that confusion by removing the URL surface entirely and keeping raw SVGs in `illustrations/_source/` as private build artifacts.

If a future use case demands non-React consumption (email templates, marketing pages, partner integrations), we can add a baked-color variant in a follow-up change.

### Decision 4: Delivery Strategy — Inline SVG

Each generated wrapper component embeds the SVG bodies for all three sizes inline in the React tree. CSS hides the inactive sizes via classes. The shared `Illustration` core renders a `<div role="img">` plus the inline `<svg>` markup.

**Implementation sketch:**

```tsx
// illustrations/Illustration.tsx — single shared core
import { classNames } from "@/utils/classNames";
import styles from "./Illustration.module.css";
import type { IllustrationCoreProps } from "./Illustration.types";

export const Illustration = ({
	size = "dialog",
	title,
	description,
	className,
	children,
	...rest
}: IllustrationCoreProps) => {
	const isHidden = title === "";
	const a11yProps = isHidden
		? { "aria-hidden": true as const }
		: { role: "img", "aria-label": title };
	return (
		<div className={classNames(styles.root, styles[size], className)} {...a11yProps} {...rest}>
			{children}
			{description ? <span className={classNames(styles.srOnly)}>{description}</span> : null}
		</div>
	);
};
```

```tsx
// illustrations/NoData.tsx — generated, contains inlined SVG bodies
import { classNames } from "@/utils/classNames";
import { Illustration } from "./Illustration";
import styles from "./Illustration.module.css";
import type { IllustrationProps } from "./Illustration.types";

export const NoData = ({
	size = "dialog",
	title = "No data",
	description = "There is nothing to display here yet.",
	...rest
}: IllustrationProps) => (
	<Illustration size={size} title={title} description={description} {...rest}>
		<svg className={classNames(styles.svg, styles.svgSpot)} viewBox="0 0 128 128" aria-hidden="true">{/* spot body */}</svg>
		<svg className={classNames(styles.svg, styles.svgDialog)} viewBox="0 0 160 160" aria-hidden="true">{/* dialog body */}</svg>
		<svg className={classNames(styles.svg, styles.svgScene)} viewBox="0 0 320 220" aria-hidden="true">{/* scene body */}</svg>
	</Illustration>
);
```

```css
/* illustrations/Illustration.module.css */
.root { display: inline-block; position: relative; flex-shrink: 0; }

.spot   { width: 128px; height: 128px; }
.dialog { width: 240px; height: 160px; }
.scene  { width: 320px; height: 220px; }

.svg { display: none; width: 100%; height: 100%; }

.spot   .svgSpot,
.dialog .svgDialog,
.scene  .svgScene { display: block; }

.srOnly {
	position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
	overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
```

The inactive `<svg>` elements stay in the DOM but `display: none` — browsers skip painting and decoding them. They contribute to JS bundle size but not to runtime cost.

### Decision 5: Theme-Switching Strategy — SAP Token Cascade

Theme switching uses the platform's existing mechanism: an ancestor element with `data-theme="horizon-dark"` (or future dark-theme aliases) overrides the values of `--sapContent_Illustrative_Color1` … `--sapContent_Illustrative_Color20` (and friends) in the CSS cascade. Because every illustration's `<svg>` is inlined into the same DOM, the SAP variables resolve directly inside each `fill="var(--sapContent_Illustrative_Color*)"` attribute and the artwork repaints automatically.

**No additional code is needed in the illustration components** — themability is a property of the upstream SAP SVGs combined with our existing token pipeline.

### Decision 6: Per-Illustration Wrapper Components

Each generated `<Name>.tsx` is a thin wrapper that fixes the inline SVG content and supplies default `title` / `description`. The shared `Illustration` core handles layout, ARIA, and prop pass-through.

**Rationale:**

- One component per illustration → tree-shakable imports identical to icons (`import { NoData } from "@reltio/design/illustrations"`)
- Default `title` / `description` baked into the wrapper at generation time, fully overridable per usage via props
- The shared `Illustration` core stays single-implementation
- Consumers can also import the core directly (`<Illustration><svg>...</svg></Illustration>`) for advanced cases such as bringing their own art

### Decision 7: Component Props

```typescript
// illustrations/Illustration.types.ts
import type { HtmlProps } from "@/utils/types";

export type IllustrationSize = "spot" | "dialog" | "scene";

export type IllustrationProps = HtmlProps<
	"div",
	{
		size?: IllustrationSize;
		title?: string;
		description?: string;
	}
>;

export type IllustrationCoreProps = IllustrationProps & {
	children?: React.ReactNode;
};
```

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `size` | `"spot" \| "dialog" \| "scene"` | `"dialog"` | Selects the SAP-native art crop and physical dimensions |
| `title` | `string` | per-illustration default from manifest | Sets `aria-label` on the root; visible to assistive tech |
| `description` | `string` | per-illustration default from manifest | Rendered into a screen-reader-only span |
| `className` | `string` | — | Custom class merged via `classNames()` utility |
| `style` | `CSSProperties` | — | Passed through to the root |
| `...rest` | `HTMLDivElement` | — | All native `<div>` attributes pass through to the root |

### Decision 8: Generator Script (`scripts/build-illustrations.mjs`)

Adapted from `scripts/build-icons.mjs` with these changes:

1. **Curation allowlist** — `ILLUSTRATION_NAMES` (32 names, currently). See Decision 2.1.
2. **Pinned upstream ref** — `SAP_REF` constant (e.g. `v2.21.1`) controls reproducibility
3. **Reconcile pass** — before downloading, remove `_source/*.svg` and `illustrations/*.tsx` files that are no longer in `ILLUSTRATION_NAMES` (handles removals, renames, upstream drops)
4. **HTTP fetch** — for every listed `(name, size)` pair, fetch from GitHub raw with concurrency 8 and exponential-backoff retries
5. **Filename normalization** — write to `illustrations/_source/<name>-<size>.svg` in kebab-case
6. **Inventory validation** — every listed base name must yield exactly three SVGs (spot, dialog, scene)
7. **Variable validation** — every fetched SVG must reference only `--sap*` variables present in `public/variables.css`
8. **Manifest read** — load `illustrations/manifest.json` (optional). For each illustration, look up `title` and `description`. Fall back to a humanized name and an empty description.
9. **Wrapper generation** — parse the three SVG files, extract inner content and `viewBox`, emit `illustrations/<PascalName>.tsx` with inlined SVG bodies and manifest defaults
10. **Index generation** — emit barrel exports plus `illustrationMap` for the Storybook catalog
11. **Stories generation** — emit a unified `Illustrations.stories.tsx` with one Storybook story per illustration showing all three sizes side-by-side
12. **Format pass** — invoke `npm run format` at the end

The script never modifies SVG content (no fill rewriting, no theme patching) — illustrations are inlined verbatim.

### Decision 9: Manifest for Default Copy

```json
// illustrations/manifest.json
{
	"no-data": {
		"title": "No data",
		"description": "There is nothing to display here yet."
	},
	"empty-list": {
		"title": "Empty list",
		"description": "This list has no items. Add the first one to get started."
	}
}
```

**Rationale:**

- Co-located with the React components and types so it's easy to discover and edit
- JSON diffs cleanly in PRs
- Missing entries fall back to a humanized name + empty description

### Decision 10: Storybook Docs Page Uses Standard Autodocs

The Docs page for the `Illustrations` group uses Storybook's built-in autodocs template — no custom block. The unified `Illustrations.stories.tsx` sets `meta.component` to `IllustrationDoc` (a documentation surrogate carrying the JSDoc and prop types) and lets Storybook render Title, Description, props table, and a list of all stories with previews automatically.

To make autodocs pick up the prop types, `illustrations/**/*.tsx` is added to `reactDocgenTypescriptOptions.include` in `.storybook/main.ts`.

**Alternatives considered:**

- Custom catalog block with copy-to-clipboard for imports (mirrors the icon library). Rejected because the standard autodocs page already lists every illustration with a live preview and the props table — a custom block would duplicate that surface and add maintenance overhead with no extra value. The user-facing experience (browse the sidebar → see all stories on the Docs page → click a name to see all three sizes) is well served by the default.

### Decision 11: Per-Story Theme × Size Matrix

Every per-illustration Story renders a 2 × 3 matrix: light-theme row (Spot, Dialog, Scene) over dark-theme row (Spot, Dialog, Scene). Both rows wrap their content in explicit `data-theme="horizon-light"` / `data-theme="horizon-dark"` so the snapshot is deterministic regardless of the active toolbar theme.

```tsx
export const NoData: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Illustrations.NoData size="spot" />
				<Illustrations.NoData size="dialog" />
				<Illustrations.NoData size="scene" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Illustrations.NoData size="spot" />
				<Illustrations.NoData size="dialog" />
				<Illustrations.NoData size="scene" />
			</div>
		</div>
	),
};
```

Each row also sets `background: var(--sapBackgroundColor)` so the theme context is visually obvious — a light-grey panel for the light row, a near-black panel for the dark row.

**Why this matters:** every Storybook story doubles as a Chromatic visual regression case. Without an explicit matrix, only the active toolbar theme is captured at snapshot time, leaving the other theme uncovered. With the matrix, a single snapshot per illustration covers both themes — twice the regression coverage for the same number of snapshots.

**Alternatives considered:**

- Two stories per illustration (`Light`, `Dark`). Rejected because it doubles the sidebar to 64 entries and worsens cross-theme comparison (designers have to toggle to compare).
- Chromatic `parameters.chromatic.modes`. Rejected for v1 because it couples theme regression coverage to a Chromatic-specific config and the project hasn't yet adopted modes anywhere else. The inline matrix achieves the same effect without service coupling and offers better in-Storybook review UX (both themes visible without toggling). Modes remain a clean migration path if a third theme appears.

**Determinism caveat:** the global Storybook decorator wraps every story in `<div data-theme={selection}>`. The two `data-theme` wrappers inside the story override the outer one for the CSS variable cascade in their subtrees, so swapping the toolbar theme has no effect on the rendered matrix. This is intentional.

### Decision 11: Package Exports

```json
{
	"exports": {
		".": "./index.ts",
		"./icons": "./icons/index.ts",
		"./icons/*": "./icons/*.tsx",
		"./illustrations": "./illustrations/index.ts",
		"./illustrations/*": "./illustrations/*.tsx"
	}
}
```

The wildcard pattern matches only `*.tsx`, which excludes `_source/*.svg` and `manifest.json` from the public import surface.

### Decision 12: Accessibility

- The root `<div>` carries `role="img"` plus `aria-label={title}`. When `title` is empty (consumer explicitly clears it), the root falls back to `aria-hidden="true"`.
- Optional `description` is rendered into a visually hidden span using a screen-reader-only utility class. Assistive tech reads it after the label.
- The inline `<svg>` elements receive `aria-hidden="true"` to avoid double-announcing — labels live on the parent `<div>`.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| Inline SVG inflates the JS bundle | ~30–80 KB per illustration after tree-shaking | Acceptable; tree-shaking limits cost to actually-used illustrations; consumers can code-split if many are needed |
| Upstream SAP repository moves or removes assets | Build break when bumping `SAP_REF` | Pin a specific tag; review upstream release notes before bumping; SVGs are checked in for offline reproducibility |
| GitHub raw rate limiting during build | Build fails sporadically | Concurrency limit (≤ 8 parallel); retry with backoff; SVGs are committed so most builds do not re-fetch |
| SAP introduces new tokens we have not mirrored | New illustrations reference unknown variables | Validation step: scan downloaded SVGs for `var(--sap...)` references; fail the build if any are not present in `public/variables.css` |
| Manifest copy drifts from SAP semantics | Default title/description go stale | Manual review in PRs; long-term hook into `@ui5/webcomponents-fiori` i18n bundles |
| Designers want to customize palette | SAP token override may not match brand | Document how to override `--sapContent_Illustrative_*` in the consumer's CSS scope |
| Apache 2.0 license requires attribution | Legal compliance | Include SAP attribution in the guide and project metadata |
| Non-React consumers want raw SVG access | Cannot use library at all | Acknowledge as out of scope; revisit with a baked-color generator if a real use case appears |

## Migration Plan

This is purely additive; no migration is required.

1. **Phase 1** — land infrastructure (folders, types, CSS, generator, package exports, guide)
2. **Phase 2** — run `npm run build-illustrations` to download the 32 curated illustrations from SAP, populate `manifest.json` with default copy
3. **Phase 3** — verify Storybook catalog and theme switching end-to-end
4. **Phase 4** — announce availability via the guide

## Open Questions

1. **TNT illustrations** — SAP's `tnt/` subfolder contains a parallel set for technical/network/operational dashboards (≈ 30 names, similar size matrix). Defer to a follow-up change once the core flow is proven.
2. **`Dot` size variant** — XS-tier illustrations (≤ 260 px contexts). Not in scope; can be added with a single `size` enum extension and one extra inline SVG per wrapper.
3. **Auto-bump from upstream** — could be wired into a scheduled job that re-runs `build-illustrations` against the latest SAP tag and opens a PR with the diff. Out of scope here.
4. **Translated default copy** — `manifest.json` is English-only. Future hook into the platform's i18n stack can supply localized defaults.
5. **Baked-color variants for non-React consumers** — if/when a real consumer (email template, marketing landing, partner export) needs raw SVG with concrete fills, add a second generator pass and a separate distribution channel.
