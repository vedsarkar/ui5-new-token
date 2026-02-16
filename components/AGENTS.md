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

### CSS Custom Properties

All component styling MUST use CSS custom properties defined on `.root` with the `--reltio-{component}-` prefix. These variables serve as the **public API** for external customization.

**State management:** Public variables are reassigned directly in state selectors (`:focus-within`, `[data-error]`, `[data-disabled]`, etc.) on `.root`. Do NOT create private/internal variables (e.g. `--_border-color`) — they add unnecessary indirection.

**Pattern:**

```css
.root {
  /* Public API — default values */
  --reltio-button-color-border: var(--reltio-color-border, #79747e);
  --reltio-button-color-border-focus: var(--reltio-color-primary, #6750a4);
  --reltio-button-color-error: var(--reltio-color-error, #b3261e);
}

/* State switches reassign public variables directly */
.root:focus-within {
  --reltio-button-color-border: var(--reltio-button-color-border-focus);
}

.root[data-error="true"] {
  --reltio-button-color-border: var(--reltio-button-color-error);
}

/* Child elements consume public variables — no private aliases */
.inner {
  outline: 1px solid var(--reltio-button-color-border);
}
```

**Why:** Each state has its own public variable (`*-border`, `*-border-focus`, `*-error`). Consumers override the specific state they need. No hidden internal layer is required.

## Creating a New Component

1. Start with `/opsx:new` to create a change and build artifacts step by step
2. Use `/opsx:continue` to create each artifact (proposal → specs → design → tasks)
3. Review each artifact before proceeding to the next
4. Run `/opsx:apply` to implement the component following all standards
5. Use the mandatory folder structure above
6. Create comprehensive [Storybook stories](/?path=/docs/guides-writing-storybook-stories--docs)
7. Run `npm run format` and ensure `npm run lint` passes
8. Export only the public API through `index.ts`
9. Archive the change with `/opsx:archive` after deployment

> See full development workflow: [Spec-Driven Development Guide](/?path=/docs/guides-spec-driven-development--docs)
