## Context

The design system has a two-level CSS variable architecture already in place:

1. **Global tokens** in `public/variables.css` — currently only `--reltio-color-primary: #00c`
2. **Component tokens** on `.root` — e.g. `--reltio-button-color-text: var(--reltio-color-text, #0e0e25)`

Components already reference global tokens with hardcoded fallbacks, so the wiring exists — but `variables.css` doesn't define those globals yet, meaning fallbacks always win. There are ~25 unique colors across 13 CSS files, with several semantic duplicates (e.g. three dark-text variants).

Storybook has `data-theme="dark"` toggle configured via `@storybook/addon-themes`. `public/global.css` has a minimal `[data-theme="dark"]` block (just background + text color) but no component-level overrides.

Static assets are served from `public/` via Storybook's `staticDirs` config, and `variables.css` is loaded in `.storybook/preview-head.html`.

## Goals / Non-Goals

**Goals:**
- Define a complete set of semantic color tokens in `public/variables.css` covering all colors currently hardcoded in components
- Provide `[data-theme="dark"]` overrides for every token
- Migrate all 13 component CSS files to reference global tokens, eliminating hardcoded hex fallbacks
- Consolidate duplicate/inconsistent color values into canonical tokens

**Non-Goals:**
- Spacing, typography, or sizing tokens (future work)
- Runtime theme switching API or JS-based theming
- Per-component dark mode overrides (all theming via global tokens)
- Supporting themes beyond light/dark

## Decisions

### 1. Token naming: `--reltio-color-{role}` semantic scheme

Tokens use semantic role names, not visual descriptions:

| Token | Light | Dark | Replaces |
|-------|-------|------|----------|
| `--reltio-color-text` | `#0e0e25` | `#e8e8f0` | `#0e0e25`, `#1a1a1a`, `#1d1b20` |
| `--reltio-color-text-secondary` | `#5f6368` | `#a0a0b8` | `#5f6368`, `#79747e`, `#49454f`, `#666` |
| `--reltio-color-text-muted` | `#595972` | `#8888a0` | `#595972` |
| `--reltio-color-surface` | `#ffffff` | `#1a1a2e` | `#ffffff`, `#fff` |
| `--reltio-color-surface-raised` | `#f5f5fa` | `#252540` | `#f5f5fa`, `#f5f5f5`, `#f1f3f4` |
| `--reltio-color-border` | `#e3e3f2` | `#3a3a55` | `#e3e3f2`, `#ddd` |
| `--reltio-color-primary` | `#0000cc` | `#6b6bff` | `#0000cc`, `#00c` |
| `--reltio-color-primary-hover` | `#000066` | `#8585ff` | `#006` |
| `--reltio-color-primary-focus` | `#1a73e8` | `#8585ff` | `#1a73e8`, `#6750a4` |
| `--reltio-color-on-primary` | `#ffffff` | `#ffffff` | `#ffffff` (on primary bg) |
| `--reltio-color-error` | `#dc2626` | `#f87171` | `#dc2626` |
| `--reltio-color-error-text` | `#b91c1c` | `#fca5a5` | `#b91c1c` |
| `--reltio-color-error-surface` | `#fef2f2` | `#3b1a1a` | `#fef2f2` |
| `--reltio-color-error-border` | `#fecaca` | `#7f1d1d` | `#fecaca` |
| `--reltio-color-accent` | `#8d8dc8` | `#a0a0e0` | `#8d8dc8` |
| `--reltio-color-overlay` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |
| `--reltio-color-shadow` | `rgba(0,0,0,0.15)` | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.15)` |

**Why semantic over primitive**: Components shouldn't know what "blue-600" means — they need "primary". This also makes dark mode natural: swap the value behind the role, not the reference.

**Alternative considered**: Primitive + semantic two-tier (e.g. `--reltio-blue-600` → `--reltio-color-primary`). Rejected as over-engineering for current scope — 17 tokens don't justify an abstraction layer.

### 2. Single file for all tokens (`public/variables.css`)

All tokens live in one file with `:root` light values and `[data-theme="dark"]` overrides.

**Why**: Simple to reason about, one place to see the full palette, matches existing setup. Components already import nothing — they just use `var()` references that resolve when `variables.css` is loaded globally.

**Alternative considered**: Separate `tokens-light.css` / `tokens-dark.css` files. Rejected — adds loading complexity for no benefit at this scale.

### 3. Migration strategy: replace fallback values, keep component variable layer

Current:
```css
.root {
  --reltio-button-color-text: var(--reltio-color-text, #0e0e25);
}
```

After:
```css
.root {
  --reltio-button-color-text: var(--reltio-color-text);
}
```

The hardcoded fallback is removed because `--reltio-color-text` is now guaranteed to be defined in `variables.css`. The component-level `--reltio-button-color-text` variable is preserved so consumers can still override individual components.

For components that inline colors without a global token reference (e.g. `background-color: #fef2f2`), replace with `var(--reltio-color-error-surface)` through the component-level variable.

### 4. Move dark body styles from `global.css` to `variables.css`

The existing `[data-theme="dark"]` block in `global.css` sets `background-color` and `color` directly. These move to `variables.css` as token definitions — `global.css` dark block references the tokens instead.

## Risks / Trade-offs

**Color consolidation may cause subtle visual shifts** → The three dark-text variants (`#0e0e25`, `#1a1a1a`, `#1d1b20`) are being unified to one token. Chromatic snapshots will catch any regressions.

**Removing fallback values creates a hard dependency on `variables.css`** → Any consumer not loading `variables.css` will lose all colors. Acceptable because `variables.css` is already required (it defines `--reltio-color-primary` which components use today). Document this requirement.

**Dark mode color choices are subjective** → Initial dark palette is a best-effort starting point. Chromatic visual review provides the feedback loop for adjustment.
