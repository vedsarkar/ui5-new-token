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
**AI Agents** — interact via MCP-UI and A2UI protocols

## Architecture & Standards

1. **TypeScript** - Strict mode, `type` over `interface`, separate `.types.ts` files
2. **Styling** - CSS Modules, `classNames` utility, CSS custom properties on `.root` with `--reltio-{component}-` prefix
3. **Documentation** - Storybook stories for all variants, one variant per story
4. **Code Style** - Biome formatting (tabs, double quotes, organized imports)
5. **English Language** - All files, comments, documentation in English only
6. **Path Aliases** - Always use `@/*` instead of relative paths (e.g., `import { classNames } from "@/utils/classNames"`)

## Essential Commands

### Development
```bash
npm run dev               # Start Storybook dev server on port 6006
npm run build-storybook   # Build Storybook for production
```

### Code Quality
```bash
npm run lint              # Check code with Biome (no auto-fix)
npm run format            # Format code with Biome (auto-fix)
npm test                  # Run tests
npm run coverage          # Run tests with coverage report
```

## Tech Stack

- **Framework**: React 17+
- **Language**: TypeScript (strict mode)
- **Documentation & Testing**: Storybook + Chromatic (visual, interaction, accessibility, coverage)
- **Styling**: CSS Modules
- **Code Quality**: Biome
- **Version Control**: Git (Bitbucket)

### Development Philosophy

- **Minimal dependencies** - Prefer native JS/CSS APIs and reuse internal components
- **Latest versions** - Always use the latest stable versions of dependencies
- **Native-first** - Leverage modern browser capabilities before adding libraries
