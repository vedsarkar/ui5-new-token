# Design: Typography Foundation — SAP 72 as Default Font

## Context

The platform claims to use Inter but renders OS defaults inconsistently. Adopting SAP 72 aligns the visual output with the SAP Fiori reference baseline declared in `design-package-v1`. SAP distributes 72 as a webfont package containing 10 weights × 2 character coverage subsets × 2 file formats. We need to choose what to ship and how to load it.

**Constraints:**
- React 17+, Storybook served from Vite (`public/` is the static asset root).
- Project rule (`AGENTS.md`): typography uses *plain CSS values, not custom properties*. Only colors are tokenized.
- No new npm dependencies allowed.
- Must work in self-hosted Storybook and in any consumer that imports `@reltio/design` CSS.

## Goals / Non-Goals

**Goals:**
- One default font everywhere with zero per-component overrides.
- Smallest possible payload for typical Latin UI without breaking non-Latin content.
- No third-party CDN dependency.
- Forward-compatible with future SAP UI5 visual alignment.

**Non-Goals:**
- Type scale tokens (size/weight/line-height as variables).
- Multiple themes / theme switching.
- Bundling fonts inside the published npm package (separate change).
- Variable font support (SAP 72 is shipped as static fonts).

## Decisions

### Decision: Self-host instead of CDN

**Choice:** Ship `.woff2` files from `public/fonts/` and load them via `@font-face`.

**Rationale:**
- Removes the runtime dependency on Google Fonts (`fonts.gstatic.com`) and the privacy/latency concerns that come with it.
- SAP does not provide an official 72 CDN.
- Storybook already serves `public/` statically.
- Consumers that import the design system's CSS get fonts from the same origin as their app (after they copy or proxy the `fonts/` directory) — no cross-origin font issues.

**Trade-off:** Consumers of the npm package must arrange to serve the font files themselves. This is acceptable for v1; a packaged solution is a follow-up change.

### Decision: Hybrid `unicode-range` (Latin subset + extended `-full` subset)

**Choice:** Declare each weight twice — once with `unicode-range` covering Latin (the SAP "W01-subset" file, e.g. `72-Regular.woff2`), once with `unicode-range` covering everything else (the SAP "W05-full" file, e.g. `72-Regular-full.woff2`).

**Rationale:**
- Typical Storybook page is Latin-only → browser fetches only the Latin subset (≈50 KB/weight).
- A page that happens to render Cyrillic/CJK/Arabic data triggers the `-full` file for that range only.
- Same family name (`"72"`) — the application sees a single logical font.
- The browser's font matching algorithm (CSS Fonts L4 §5) handles per-glyph selection automatically.

**Alternatives considered:**
- *Latin only.* Smallest payload but non-Latin data falls back to system fonts mid-paragraph (visible style break). Reltio handles enterprise data with international content — unacceptable.
- *Full only.* Simplest config but ~5× the bytes for the common case (~250 KB/weight × 6 weights = 1.5 MB).

**Trade-off:** Twice as many `@font-face` declarations to maintain. Acceptable given a single source file.

### Decision: Six weights only

**Choice:** Ship Light (300), Regular (400), Italic (400i), Semibold (600), Bold (700), BoldItalic (700i).

**Rationale:**
- Covers everything the existing components and Welcome story need (no usage of weights ≥800 or condensed widths today).
- Each additional weight × 2 (subset + full) doubles the `@font-face` count and increases worst-case payload.
- SAP also ships Black, Condensed, CondensedBold, SemiboldDuplex. None are referenced by current designs and they target specialized use cases (CJK metric matching, narrow column titles).

**Trade-off:** Designers requesting Black/Condensed in future will need a follow-up change to add a weight. Cheap to do.

### Decision: Drop `.woff` assets

**Choice:** Ship only `.woff2`.

**Rationale:**
- `.woff2` is supported by 96%+ of global browsers (caniuse, 2025) and 100% of browsers Reltio targets.
- `.woff2` is 30%+ smaller than `.woff`.
- Halves the size of the `public/fonts/` directory in git.

### Decision: Drop Inter from Google Fonts

**Choice:** Remove `<link>` to `fonts.googleapis.com` from `.storybook/preview-head.html`.

**Rationale:**
- `:root` no longer references Inter, so the request would download an unused font.
- Eliminates a third-party DNS/connection on every Storybook page load.

### Decision: Components SHALL NOT declare `font-family`

**Choice:** Remove `font-family` from all 15 affected component CSS files. Add a constitution-style requirement to the `typography-foundation` spec.

**Rationale:**
- Today's overrides reference fonts that are not loaded — they are bugs disguised as styles.
- Inheriting from `:root` guarantees the entire UI uses the same font with no exceptions.
- Future theme swaps require touching one file (`global.css`), not 15.

**Exception:** Form controls (`<input>`, `<textarea>`) need explicit `font-family: inherit` because user agents reset to a platform default. This is the only allowed `font-family` declaration in component CSS.

**Exception:** Monospace contexts (Markdown code, Details JSON viewer, Fetcher response block) MUST set `font-family: "72 Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace`. The fallback chain ensures graceful degradation if 72 Mono fails to load.

### Decision: `font-display: swap`

**Choice:** All `@font-face` declarations use `font-display: swap`.

**Rationale:**
- Avoids FOIT (Flash of Invisible Text) — content is readable from first paint with the system fallback, then swaps to 72 when ready.
- Standard behaviour for self-hosted webfonts; matches user expectations.

**Alternative considered:** `font-display: optional` would skip the swap if the font isn't loaded by first paint, eliminating layout shift. Rejected because consistent SAP-styled rendering is the explicit goal of this change.

## Risks / Trade-offs

**Risk:** Consumers of `@reltio/design` may not have the `public/fonts/` files on their server.
→ Mitigated by documenting the requirement in `guides/typography.story.mdx`. A packaged solution is tracked as a follow-up change.

**Risk:** Removing per-component `font-family` may cause visual regressions in apps that relied on the current (broken) behaviour.
→ Acceptable. The current behaviour is unintentional, depends on whichever OS is used, and contradicts the documented Inter default. This change normalizes rendering across all environments.

**Risk:** SAP 72 license terms may restrict redistribution.
→ The proposal flags this for the project owner to verify before publishing the design package. The fonts are already on disk in this repo from a SAP source, so adding them to git is consistent with current practice.

**Risk:** Layout shift (CLS) when 72 swaps in.
→ SAP 72 has metrics close to common system sans-serif fonts (Segoe UI, San Francisco). Visible shift expected to be minimal. Can be tuned in a follow-up using `size-adjust` / `ascent-override` if needed.
