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

## Creating a New Component

1. Follow the OpenSpec workflow - create a proposal first
2. Use the mandatory folder structure above
3. Implement the component following all standards
4. Create comprehensive Storybook stories
5. Run `npm run format` and ensure `npm run lint` passes
6. Export only the public API through `index.ts`

> See full development workflow: [@guides/spec-driven-development.story.mdx](/?path=/docs/guides-spec-driven-development--overview)
