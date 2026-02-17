# Dark Mode Tokens - Follow-up Items

Items identified during review that are safe to address after the initial merge. All are single-file changes in `public/variables.css` unless noted.

---

## Missing Tokens

### Surface subtle
Brand guidelines define subtle backgrounds (`#EDEDED`, `#F2F2F2`) distinct from Warm White (`#EEEEEE`). Currently only `surface` and `surface-raised` exist. Add when a component needs this distinction.

```css
--reltio-color-surface-subtle: #f2f2f2;  /* light */
--reltio-color-surface-subtle: #0a0a40;  /* dark - between surface and surface-raised */
```

### Dark surfaces in light mode
Brand uses Reltio Blue (`#000066`) and Midnight (`#000033`) for hero sections and dark cards in light mode. No tokens exist for this pattern.

```css
--reltio-color-surface-dark: #000066;
--reltio-color-surface-darkest: #000033;
```

### Data visualization chart colors
Brand defines 8 colors for charts and product UI. Add when chart components are built.

| Name | Light | Dark (adjusted for contrast) |
|------|-------|-----|
| Purple | `#6611CC` | `#BB55FF` |
| Violet | `#BB55FF` | `#BB55FF` |
| Red | `#EE3333` | `#EE3333` |
| Magenta | `#FF44AA` | `#FF44AA` |
| Orange | `#EE6611` | `#FF9944` |
| Tangerine | `#FF9944` | `#FF9944` |
| Emerald | `#449977` | `#449977` |
| Lime | `#CCFF55` | `#CCFF55` |

### Brand gradient
Aqua-to-Cobalt gradient (`linear-gradient(45deg, #00FFFF 0%, #0000CC 80%)`). Add as a token when a component needs it.

### Dark cobalt tint
Brand specifies `#0326CC` as a dark mode subtle background. Currently `surface-raised` (`#000066`) covers this role but the tint is different.

---

## Dark Mode Brand Deviations (Intentional)

These values diverge from `docs/brand-guidelines.md` because the brand-specified dark values fail WCAG contrast requirements on Midnight (`#000033`) surfaces.

| Token | Brand value | Implemented | Reason |
|-------|-----------|-------------|--------|
| `primary` | `#0000CC` | `#6666ff` | Brand value = ~1.6:1 contrast on `#000033` (fails AA) |
| `primary-hover` | `#000066` | `#8888ff` | Brand value = ~1.2:1 contrast on `#000033` (invisible) |
| `border` | `#000066` | `#333399` | Brand value = ~1.2:1 contrast on `#000033` (invisible) |

These should be revisited if brand guidelines are updated with accessible dark mode values.

---

## Component-Level Dark Overrides

Three components have `:global([data-theme="dark"])` selectors for structural changes that can't be solved by color token swaps alone:

1. **Button** (`Button.module.css`) - `.filled.inherited` gets a border in dark mode. Without it, the inherited-color button is invisible against dark surfaces.

2. **UserMessage** (`UserMessage.module.css`) - Gets a border in dark mode. The message bubble blends into the dark background without a visible edge.

3. **Details** (`Details.module.css`) - Background switches to `surface-raised` and code blocks get a custom mixed background. Needed because Details as a container should feel elevated in dark mode.

These are acceptable edge cases. If more accumulate, consider adding structural tokens like `--reltio-color-surface-container` to handle them globally.

---

## Secondary Token Redundancy

`--reltio-color-secondary` equals `--reltio-color-primary` (`#0000cc`) in light mode. No component currently distinguishes them. Revisit when a component needs a visually distinct secondary action color. Brand guidelines map secondary to Cobalt (same as primary/interactive), so this is technically correct.
