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

**Responsive / media queries** — do NOT add `@media` queries or mobile-specific styles to component CSS. Responsive design guidelines will be developed separately. For now, components target desktop viewports only.

### TypeScript Types (`.types.ts`)

**Base type:** Use `React.ComponentPropsWithoutRef<"tag">` as the standard generic for native element props. It resolves the correct attributes type from the tag name — no need for verbose `React.DetailsHTMLAttributes<HTMLDetailsElement>`.

**Structure:** Custom props first, base HTML type second in the intersection. Do NOT redeclare props that already exist in the base type with the same type — `className`, `children`, `style`, event handlers etc. are inherited automatically:

```typescript
export type ChipProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
};
```

**`Omit`** — use to remove props the component doesn't support, or to redeclare a native prop that must appear in Storybook docs:

```typescript
/* Remove unsupported prop */
export type LoaderProps = Omit<React.ComponentPropsWithoutRef<"div">, "children">;

/* Non-standard children type */
export type MessageProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  children: string;
};

/* Native prop redeclared for Storybook docgen visibility */
export type DetailsProps = Omit<React.ComponentPropsWithoutRef<"details">, "open"> & {
  /** @default false */
  open?: boolean;
};
```

> **Why `Omit` for native props?** Storybook docgen filters out native HTML attributes from the Props table. If a component only re-uses native props (like `open` on `<details>`), they won't appear in docs unless explicitly `Omit`-ed from the base and redeclared in the custom type.

**Polymorphic components** (e.g. Button renders as `<button>` or `<a>`) use a discriminated union with separate base types:

```typescript
type ButtonBase = {
  variant?: "filled" | "outlined";
};

type AsButton = {
  href?: never;
  type?: "button" | "submit" | "reset";
} & React.ComponentPropsWithoutRef<"button">;

type AsAnchor = {
  href: string;
} & React.ComponentPropsWithoutRef<"a">;

export type ButtonProps = ButtonBase & (AsButton | AsAnchor);
```

### Storybook Stories

Every component's stories file MUST import the CSS module and pass it via `parameters.cssClasses`. This enables the CSS Classes documentation table on the component's docs page.

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
