# Component Development Guidelines

This directory contains all UI components for the Reltio Design Platform.

## Component Structure

Every component MUST follow this mandatory pattern:

```
components/ComponentName/
├── ComponentName.tsx          # React component implementation
├── ComponentName.types.ts     # TypeScript types (REQUIRED)
├── ComponentName.module.css   # Scoped styles
├── ComponentName.stories.tsx  # Documentation & tests
└── index.ts                   # Public API
```

## Component Standards

### Public API (CRITICAL)

Always import components via their `index.ts` (Public API). Direct imports of internal files (`.tsx`, `.types.ts`, `.module.css`) from outside the component folder are **strictly forbidden**.

**Good:**
```typescript
import { Button } from "@/components/Button";
```

**Bad:**
```typescript
import { Button } from "@/components/Button/Button";
import type { ButtonProps } from "@/components/Button/Button.types";
```

### CSS Styling

**External customization** is done through stable CSS classes (e.g. `.reltio_Tabs_tab`), NOT through component-level CSS custom properties. The `classNames()` utility automatically generates these stable, prefixed selectors on every rendered element. See the [Component Customization guide](/?path=/docs/guides-component-customization--docs) for details.

**Colors** — always reference global `--reltio-color-*` tokens from `public/variables.css`. Never hardcode hex color values in component CSS.

**Typography, spacing, sizing** — use plain values directly (e.g. `font-size: 14px`, `padding: 8px 16px`). There are no global tokens for these yet.

**CSS custom properties** — almost never needed in component CSS. Do NOT create component-level variables as a customization API. Prefer direct CSS property overrides.

**When a variable seems useful but isn't:** If the variable is set and consumed on the **same element**, a property override is always simpler — even when variants reassign it:

```css
/* ❌ BAD — variable adds indirection for no benefit */
.root { --chip-height: 32px; height: var(--chip-height); }
.small { --chip-height: 26px; }

/* ✅ GOOD — direct property override */
.root { height: 32px; }
.small { height: 26px; }
```

```css
/* ❌ BAD — background variable set and consumed on .root */
.root { --chip-bg: var(--reltio-color-bg-transparent-1); background: var(--chip-bg); }
.filled.primary { --chip-bg: var(--reltio-color-primary-transparent-mild); }

/* ✅ GOOD — variants override the property directly */
.root { background: var(--reltio-color-bg-transparent-1); }
.filled.primary { background: var(--reltio-color-primary-transparent-mild); }
```

**The only valid case** for a CSS variable is when a parent sets a value that **cascades to multiple child elements** via the DOM:

```css
/* ✅ GOOD — parent value cascades to two different children */
.root { --icon-size: 18px; }
.small { --icon-size: 16px; }
.leadingIcon { width: var(--icon-size); height: var(--icon-size); }
.removeButton { width: var(--icon-size); height: var(--icon-size); }
```

Even then, consider whether compound selectors (`.small .leadingIcon`) are simpler:

```css
/* Also fine — explicit and easy to understand */
.leadingIcon { width: 18px; height: 18px; }
.small .leadingIcon { width: 16px; height: 16px; }
.removeButton { width: 18px; height: 18px; }
.small .removeButton { width: 16px; height: 16px; }
```

**Rule of thumb:** Default to no variables. Only introduce one when it demonstrably reduces repetition across multiple child selectors and the direct approach is clearly worse.

**Encapsulation — internal CSS variables must never leak:**

When a component uses an internal CSS variable (e.g. for a dynamic prop that cascades to pseudo-elements), the component MUST always set that variable explicitly on its root element — including the default value. This creates a hard boundary that prevents any ancestor or global variable with the same name from leaking in.

The only CSS variables a component may consume from outside are the global `--reltio-color-*` tokens defined in `public/variables.css`. All other customization goes through **React props** and **stable CSS classes**.

```tsx
/* ✅ GOOD — variable always set on root, no external leak possible */
const rootStyle = {
  ...style,
  "--size": size ?? "32px",
} as React.CSSProperties;

<div style={rootStyle}>...</div>
```

```tsx
/* ❌ BAD — variable set only when prop is provided; fallback in CSS can pick up ancestor values */
const rootStyle = size
  ? { ...style, "--size": size }
  : style;
```

If the dynamic value only affects regular DOM elements (no pseudo-elements), prefer inline styles directly — no CSS variable needed at all:

```tsx
/* ✅ GOOD — inline style, fully encapsulated, no variable */
<div style={size ? { height: size } : undefined} />
```

**Responsive / media queries** — do NOT add `@media` queries or mobile-specific styles to component CSS. Responsive design guidelines will be developed separately. For now, components target desktop viewports only.

### TypeScript Types (`.types.ts`)

**`HtmlProps<Tag, CustomProps>` utility** — the standard way to type component props. Import from `@/utils/types`. It combines custom props with native HTML element attributes, automatically omitting native props that overlap with custom ones. This ensures custom props appear in Storybook's Props table without manual `Omit`:

```typescript
import type { HtmlProps } from "@/utils/types";

export type ChipProps = HtmlProps<"button", {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  onClick?: () => void;
}>;
```

**Rules:**
1. Every component with a wrapper HTML element MUST use `HtmlProps<Tag, CustomProps>` (or bare `React.ComponentPropsWithoutRef<"tag">` for pure pass-through with no custom props)
2. All rest props (`...rest`) MUST be spread onto the wrapper HTML element
3. Do NOT redeclare native props (`className`, `style`, etc.) in custom props — they are inherited automatically
4. Only declare a native prop in custom props when the component changes its type or semantics (e.g. `children: string` instead of `ReactNode`, or `open?: boolean` that needs Storybook visibility)
5. Use `React.ComponentPropsWithoutRef` (not `ComponentProps`) — refs are handled via `React.forwardRef` when needed

**Removing native props** the component doesn't support — wrap with `Omit`:

```typescript
export type SkeletonProps = Omit<HtmlProps<"div", {
  rows?: number;
  size?: string;
}>, "children">;
```

**Polymorphic components** (e.g. Button renders as `<button>` or `<a>`) use a discriminated union with `HtmlProps` per branch:

```typescript
type ButtonBase = {
  variant?: "filled" | "outlined";
  size?: ButtonSize;
};

type AsButton = HtmlProps<"button", ButtonBase & {
  href?: never;
  type?: "button" | "submit" | "reset";
}>;

type AsAnchor = HtmlProps<"a", ButtonBase & {
  href: string;
}>;

export type ButtonProps = AsButton | AsAnchor;
```

### Storybook Stories

Every component's stories file MUST import the CSS module and pass it via `parameters.cssClasses`. This enables the CSS Classes documentation table on the component's docs page.

**Free-form props** (arbitrary strings, numbers, CSS values) need only ONE story demonstrating usage — do NOT create multiple stories for different values of the same prop. Multiple stories are for **enum-like variants** where each value is a distinct visual state worth snapshot-testing.

```tsx
import cssClasses from "./MyComponent.module.css";

const meta = preview.meta({
  component: MyComponent,
  parameters: {
    cssClasses,
  },
});
```

## Creating a New Component

1. Start with `/opsx:new` to create a change and build artifacts step by step
2. Use `/opsx:continue` to create each artifact (proposal → specs → design → tasks)
3. Review each artifact before proceeding to the next
4. Run `/opsx:apply` to implement the component following all standards
5. Use the mandatory folder structure above
6. Create comprehensive [Storybook stories](/?path=/docs/guides-writing-storybook-stories--docs) with `cssClasses` parameter
7. Run `npm run format` and ensure `npm run lint` passes
8. Export only the public API through `index.ts`
9. Archive the change with `/opsx:archive` after deployment

> See full development workflow: [Spec-Driven Development Guide](/?path=/docs/guides-spec-driven-development--docs)
