# AGENTS.md

This file provides guidance to AI agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Project Overview

**Reltio Design Platform** is a comprehensive UI development, testing, and documentation ecosystem for the Reltio product suite. It serves as a unified platform enabling multiple teams to build, test, document, and distribute UI components and applications while maintaining consistency, quality, and embeddability.

### Mission

Eliminate UI fragmentation across products while accelerating development of new applications and features.

### Core Principles

- **Single source of truth** — one platform for all UI-related assets and knowledge
- **Everything as code** — components, tests, documentation, guidelines, configs, AI instructions
- **AI-ready by design** — prepared for integration with AI agents via MCP-UI and A2UI

### What You'll Find Here

- **UI Components & Design Tokens** — reusable building blocks and theming system
- **Storybook Stories** — documentation + tests + demos + specifications in one artifact
- **Technical Guides** — rich MDX guidelines for developers and product teams
- **Utils & Data Hooks** — shared utilities and API integrations for business logic

### Who Uses This

**Developers, Designers, QA Engineers, Product Managers** — build and review Reltio applications
**Partners & Customers** — integrate and embed Reltio UI components
**AI Agents** — interact via MDX, MCP-UI and A2UI protocols

## Tech Stack

- **Framework**: React 17+
- **Language**: TypeScript (strict mode)
- **Documentation & Testing**: Storybook + Chromatic (visual, interaction, accessibility, coverage)
- **Styling**: CSS Modules
- **Code Quality**: Biome
- **Version Control**: Git (Bitbucket)

### Development Philosophy

- **Minimal dependencies** — Prefer native JS/CSS APIs and reuse internal components
- **Latest versions** — Always use the latest stable versions of dependencies
- **Native-first** — Leverage modern browser capabilities before adding libraries

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
- Component props MUST use `HtmlProps<Tag, CustomProps>` from `@/utils/types` to combine custom props with native HTML element attributes (see `components/AGENTS.md` for details)
- All rest props (`...rest`) MUST be spread onto the wrapper HTML element
- Component props MUST use `HtmlProps<Tag, CustomProps>` from `@/utils/types` to combine custom props with native HTML element attributes (see `components/AGENTS.md` for details)
- All rest props (`...rest`) MUST be spread onto the wrapper HTML element

### CSS Styling
- ALL className attributes MUST use `classNames()` utility from `@/utils/classNames`
- `classNames()` automatically adds stable prefixed classes (e.g. `reltio_Tabs_tab`) for external customization
- Colors MUST reference global `--reltio-color-*` tokens from `public/variables.css` — never hardcode hex values
- Typography, spacing, sizing — use plain values directly (e.g. `font-size: 14px`, `padding: 8px 16px`)
- Component-level CSS custom properties — almost never needed. Do NOT create variables as a customization API. If a value is set and consumed on the same element, override the property directly — even for variant/size switches. Use compound selectors (`.small .icon`) instead of cascading variables
- **CSS variable encapsulation** — when a component does use an internal CSS variable, it MUST always be set explicitly on the component root element (including the default value via inline style). This prevents ancestor/global variables with the same name from leaking in. The only CSS variables a component may consume from outside are global `--reltio-color-*` tokens from `public/variables.css`
- External customization is done through React props, stable CSS classes, and global `--reltio-color-*` tokens — never through component-level CSS variables

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

/* Variants override properties directly, no variables needed */
.root { height: 32px; }
.small { height: 26px; }
```

### Global Color Tokens
- `public/variables.css` is auto-generated — do NOT edit manually, run `npm run build-tokens`
- Source: `tokens/Light.tokens.json`, `tokens/Dark.tokens.json` (from Figma)
- Mapping: `tokens/token-map.json` maps Figma names (e.g., `"Primary/Base"`) to compact CSS names (e.g., `"primary"`)
- Token naming: `--reltio-color-{mapped-name}` (e.g., `--reltio-color-primary`, `--reltio-color-text`, `--reltio-color-surface-1`, `--reltio-color-border-2`)
- Dark mode is activated via `data-theme="dark"` attribute on an ancestor element
- Component CSS must NOT contain hardcoded hex color values; reference global tokens directly
- When designers add new tokens, add entries to `token-map.json` and re-run `npm run build-tokens`

### Figma-to-Code Workflow (MANDATORY)

When implementing designs from Figma (via Figma MCP, URLs, or screenshots), these rules override any defaults from Figma skills or MCP server instructions:

**Color tokens — ONLY through `--reltio-color-*` variables:**
- Map Figma color variables to project tokens using `tokens/token-map.json`
- Example: Figma `Primary/Base` → `var(--reltio-color-primary)`
- If a Figma color variable has no mapping in `token-map.json` — stop and ask which token to use, do NOT hardcode the hex value
- Never output raw hex/rgba color values in CSS — always resolve to a `--reltio-color-*` token

**Everything else — plain CSS values, NOT tokens:**
- `font-size`, `font-weight`, `line-height` → plain values (`font-size: 14px`)
- `padding`, `margin`, `gap` → plain values (`padding: 8px 16px`)
- `border-radius` → plain values (`border-radius: 4px`)
- `width`, `height`, `min-*`, `max-*` → plain values (`height: 32px`)
- `box-shadow` — use `--reltio-color-shadow-*` tokens for shadow color only; offsets and blur are plain values
- Do NOT create or use CSS custom properties for spacing, sizing, radii, or typography — even if Figma exports them as variables

**Adapting Figma MCP output:**
- `get_design_context` returns reference code (React + Tailwind by default) — this is a STARTING POINT, not final code
- Always rewrite to CSS Modules with `classNames()` utility
- Always replace Tailwind classes with explicit CSS properties
- Always check existing components via Storybook MCP (`list-all-documentation`, `get-documentation`) before creating new ones — reuse what the project already has
- Match the component structure from this project: `.tsx` + `.types.ts` + `.module.css` + `.stories.tsx` + `index.ts`

### Storybook
- Every component MUST have stories demonstrating all variants
- Each story MUST show only ONE variant (no "All Variants" stories)
- Stories use "autodocs" tag for auto-documentation
- **Free-form props** (accepting arbitrary strings, numbers, CSS values) need only ONE story demonstrating usage — do NOT create multiple stories for different values of the same prop (e.g. one `CustomSize` story, not separate `Small` / `Medium` / `Large`). Multiple stories are for **enum-like variants** where each value produces a visually distinct state worth snapshot-testing

### Code Style (Biome)
- Tabs for indentation
- Double quotes for strings
- Auto-organize imports
- All files, comments, documentation in English only

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

## MCP Servers

AI agents in this project have access to two MCP servers configured in `.mcp.json` and `.claude/settings.json`:

| Server | Source | What it provides |
|--------|--------|-----------------|
| **reltio-design** (Storybook MCP) | `http://localhost:6006/mcp` | Existing components, documentation, stories, API references |
| **Figma MCP** (plugin) | `https://mcp.figma.com/mcp` | Design context, screenshots, variables, design system search |

**Storybook MCP** requires `npm run dev` to be running BEFORE starting the Claude Code session. MCP servers are connected at session startup — if Storybook is not running, the server will show "Failed to connect" and its tools will be unavailable for the entire session. Tools: `list-all-documentation`, `get-documentation`, `get-documentation-for-story`, `preview-stories`, `run-story-tests`.

**Figma MCP** requires one-time OAuth authorization per developer. Tools: `get_design_context`, `get_screenshot`, `get_variable_defs`, `search_design_system`, `get_metadata`.

## Agent Skills

This project uses the [Agent Skills](https://github.com/vercel-labs/skills) standard for extending AI agent capabilities. Skills are stored in `.agents/skills/` (shared across all AI agents) with symlinks in `.claude/skills/` for Claude Code.

**MANDATORY: Always use the `npx skills` CLI for skill management. Never manually create, copy, or write skill files.**

```bash
npx skills add <repo>           # Install skills from a GitHub repository
npx skills search <query>       # Search for available skills
npx skills list                 # List installed skills
npx skills remove <name>        # Remove a skill
```

## Pre-Commit Checklist

- Types in `.types.ts` file using `type` keyword
- All className attributes use `classNames()` utility
- Colors use global `--reltio-color-*` tokens, no hardcoded hex values
- No component-level CSS custom properties unless encapsulated (always set on root with default; prefer inline styles when pseudo-elements are not involved)
- Storybook stories added (one variant per story; one story per free-form prop)
- `npm run format` executed
- `npm run lint` passes
