
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Reltio Design System is a React 19 component library with TypeScript, documented in Storybook 10 and visually tested with Chromatic.

## Commands

```bash
npm run dev               # Start Storybook dev server (port 6006)
npm run build-storybook   # Build Storybook for production
npm run lint              # Check code with Biome (no auto-fix)
npm run format            # Format code with Biome (auto-fix)
npm run deploy            # Deploy to Chromatic for visual testing
npm run test              # Run Vitest tests
npm run coverage          # Run tests with coverage
```

## Component Structure (MANDATORY)

Every component MUST follow this structure:
```
components/ComponentName/
├── ComponentName.tsx          # Implementation
├── ComponentName.types.ts     # Type definitions (REQUIRED - separate file)
├── ComponentName.module.css   # CSS Modules styles
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                   # Public exports
```

## Architectural Requirements

### TypeScript
- Use `type` keyword ONLY, never `interface`
- All types MUST be in separate `.types.ts` files
- Strict mode enabled, no `any` without justification

### CSS Styling
- ALL className attributes MUST use `classNames()` utility from `@/utils/classNames`
- ALL CSS custom properties MUST be defined on `.root` class with `--reltio-{component-name}-` prefix
- Internal elements MUST use ONLY CSS variables, never direct values
- Color CSS variables MUST reference global `--reltio-color-*` tokens from `public/variables.css` without fallback values
- Non-color CSS variables (spacing, typography, sizing) MUST include fallback values: `var(--reltio-button-height, 36px)`

Example pattern:
```css
.root {
  --reltio-button-height: 36px;
  --reltio-button-bg: var(--reltio-color-primary);
  height: var(--reltio-button-height);
  background: var(--reltio-button-bg);
}
```

### Global Color Tokens
- All color values MUST use semantic tokens defined in `public/variables.css`
- Token naming convention: `--reltio-color-{role}` (e.g., `--reltio-color-text`, `--reltio-color-surface`)
- Dark mode is activated via `data-theme="dark"` attribute on an ancestor element
- Component CSS must NOT contain hardcoded hex color values; use global tokens through component-level variables
- Token categories: text, surface, border, primary, error, accent, secondary, success, warning, effects

### Storybook
- Every component MUST have stories demonstrating all variants
- Each story MUST show only ONE variant (no "All Variants" stories)
- Stories use "autodocs" tag for auto-documentation

### Code Style (Biome)
- Tabs for indentation
- Double quotes for strings
- Auto-organize imports

## Path Aliases

- `@/*` maps to repository root
- Example: `import { classNames } from "@/utils/classNames"`

## classNames Utility

The `classNames()` utility at `utils/classNames.ts` handles BEM-like naming. For classes with `__` suffix, it automatically adds the base class:
```ts
classNames('a__b', 'c__d') // returns 'a a__b c c__d'
```

## OpenSpec Workflow

This project uses OpenSpec for spec-driven development. See `openspec/AGENTS.md` for full instructions.

**When to create a proposal:**
- New features or capabilities
- Breaking changes (API, schema, architecture)
- Performance optimizations that change behavior

**Skip proposals for:**
- Bug fixes, typos, formatting, comments
- Non-breaking dependency/configuration changes

**Quick commands:**
```bash
openspec list                    # View active changes
openspec list --specs            # View existing capabilities
openspec validate [item] --strict # Validate changes
```

## Pre-Commit Checklist

- Types in `.types.ts` file using `type` keyword
- All className attributes use `classNames()` utility
- CSS custom properties on `.root` with `--reltio-{component}-` prefix
- Storybook stories added (one variant per story)
- `npm run format` executed
- `npm run lint` passes
