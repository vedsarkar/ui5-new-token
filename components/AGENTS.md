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

**CSS custom properties** — use them ONLY for internal mechanics when a value needs to be reassigned across multiple selectors (e.g. variant switching, state management). Do NOT create component-level variables as a customization API.

**When to use component-level CSS variables:**

```css
/* ✅ GOOD — variable is reassigned by variants/states */
.root {
  --chip-bg: var(--reltio-color-bg-transparent-1);
}
.small { --chip-bg: var(--reltio-color-surface-2); }
.filled.primary { --chip-bg: var(--reltio-color-primary-transparent-mild); }
.inner { background: var(--chip-bg); }
```

**When NOT to use component-level CSS variables:**

```css
/* ❌ BAD — variable used once, just an alias */
.root {
  --tabs-font-size: 14px;
}
.tab { font-size: var(--tabs-font-size); }

/* ✅ GOOD — use the value directly */
.tab { font-size: 14px; }
```

**Rule of thumb:** If a CSS variable is never reassigned in another selector, remove it and use the value directly.

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
