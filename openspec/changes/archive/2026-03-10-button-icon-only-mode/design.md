## Context

The Button component currently accepts `children: ReactNode` and renders all content uniformly inside a `<button>` or `<a>` element. There is no distinction between text-only, icon+text, and icon-only usage. Designs require circular icon-only buttons without a separate IconButton component.

All icons in the project render as bare `<svg>` elements (via the `icons/` library). They are always React function components, never native HTML element strings.

## Goals / Non-Goals

**Goals:**

- Automatically detect icon-only usage from children composition
- Apply circular layout via a CSS class (no new props)
- Support all existing variants, colors, and sizes in icon-only mode
- Keep the detection logic simple and maintainable

**Non-Goals:**

- Structured icon API (`startIcon` / `endIcon` props) — icons are composed via children
- Separate IconButton component
- Strict icon type validation (`.isIcon` marker or displayName checks)
- New color variants (tinted, ghost) — deferred pending designer clarification

## Decisions

### Detection logic: `React.Children.count` + `isValidElement` + `typeof type`

The component determines icon-only mode by checking:

```ts
const isIconOnly =
  React.Children.count(children) === 1
  && React.isValidElement(children)
  && typeof children.type !== "string";
```

This returns `true` when children is a single React component (function or class) — not a string, not a native HTML element.

**Alternatives considered:**

- **CSS-only with `:has()` and text wrapping** — requires wrapping all text children in `<span>` elements (DOM mutation), relies on `:has()` browser support (93%), implicit/magical behavior harder to debug. Rejected for complexity.
- **Explicit `iconOnly` prop** — simple but redundant; the information is already in children composition. Rejected to keep API minimal.
- **`.isIcon` static property on icon components** — strict but requires marking all 260+ icons, maintenance burden. Rejected as over-engineering for current needs.

### CSS class approach: `styles.iconOnly`

When `isIconOnly` is true, an `iconOnly` CSS class is added to the root element. This class:

- Sets `aspect-ratio: 1` to make the button square (which becomes a circle with existing `border-radius: 9999px`)
- Resets padding to `0` so the circle diameter equals `min-height` from the size class
- Centers content with existing `align-items: center` and `justify-content: center`

Circle diameters per size: small=32px, medium=40px, large=48px (matching existing `min-height` values).

### No text wrapping of children

Children are rendered as-is without any transformation. The component does not wrap strings in `<span>` elements — it only inspects children to determine the CSS class.

## Risks / Trade-offs

- **False positive on single non-icon component** — `<Button><Spinner /></Button>` would trigger icon-only mode. This is acceptable: such usage is rare, and circular shape is reasonable for any single-element button content. Users can override with explicit `className` if needed.
- **Fragment children** — `<Button><>{icon}</></Button>` wrapping a single icon in a Fragment would have `children.type === React.Fragment`, which is not a string, so it would trigger icon-only. In practice nobody wraps a single icon in a Fragment.
