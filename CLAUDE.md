
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Reltio Design System is a React 17+ component library with TypeScript, documented in Storybook 10 and visually tested with Chromatic.

## Commands

```bash
npm run dev               # Start Storybook dev server (port 6006)
npm run build-storybook   # Build Storybook for production
npm run build-tokens      # Generate public/variables.css from tokens/*.tokens.json
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
- `classNames()` automatically adds stable prefixed classes (e.g. `reltio_Tabs_tab`) for external customization
- Colors MUST reference global `--reltio-color-*` tokens from `public/variables.css` — never hardcode hex values
- Typography, spacing, sizing — use plain values directly (e.g. `font-size: 14px`, `padding: 8px 16px`)
- Component-level CSS custom properties (`--reltio-{component}-*`) — use ONLY when a value is reassigned across multiple selectors (variant switching, state management). Do NOT create variables that are used only once
- External customization is done through stable CSS classes, NOT through component-level CSS variables

Example pattern:
```css
/* Use global tokens for colors, plain values for everything else */
.tab {
  color: var(--reltio-color-text-secondary);
  font-size: 14px;
  padding: 8px 16px;
}

.active {
  color: var(--reltio-color-primary);
}
```

### Global Color Tokens
- `public/variables.css` is auto-generated — do NOT edit manually, run `npm run build-tokens`
- Source: `tokens/Light.tokens.json`, `tokens/Dark.tokens.json` (from Figma)
- Mapping: `tokens/token-map.json` maps Figma names (e.g., `"Primary/Base"`) to compact CSS names (e.g., `"primary"`)
- Token naming: `--reltio-color-{mapped-name}` (e.g., `--reltio-color-primary`, `--reltio-color-text`, `--reltio-color-surface-1`, `--reltio-color-border-2`)
- Dark mode is activated via `data-theme="dark"` attribute on an ancestor element
- Component CSS must NOT contain hardcoded hex color values; reference global tokens directly
- When designers add new tokens, add entries to `token-map.json` and re-run `npm run build-tokens`

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

The `classNames()` utility at `utils/classNames.ts` processes CSS Module hashed classes and adds stable prefixed classes for external customization:
```ts
classNames('Tabs_tab__x1y2z') // returns 'reltio_Tabs_tab Tabs_tab__x1y2z'
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
- Colors use global `--reltio-color-*` tokens, no hardcoded hex values
- CSS custom properties only where values are reassigned across selectors
- Storybook stories added (one variant per story)
- `npm run format` executed
- `npm run lint` passes
