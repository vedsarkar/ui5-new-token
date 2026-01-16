## Project Overview

**Reltio Design Platform** is a comprehensive UI development, testing, and documentation ecosystem for the Reltio product suite. It serves as a unified platform enabling multiple teams to build, test, document, and distribute UI components and applications while maintaining consistency, quality, and embeddability.

**Key capabilities:**
- React component library with strict TypeScript
- Application-specific component testing and documentation
- Client SDK with business domain utilities and data hooks
- Visual regression testing (Chromatic)
- Spec-driven development (OpenSpec)
- AI-assisted development
- CSS custom properties for theming and customer embedding

**Target users:** Component maintainers, product developers, designers, QA engineers, product managers, enterprise customers (future), and AI agents (future via MCP-UI/A2UI).

**Vision:** Single source of truth for all UI development at Reltio, enabling rapid product development, consistent experiences, seamless customer embedding, and AI-powered UI generation.

See @Overview.mdx for complete platform vision and architecture.

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
```

### Deployment
```bash
npm run deploy            # Deploy to Chromatic for visual testing
```

## Architecture

### Component Structure (STRICT)
Every component follows this mandatory pattern:
```
components/ComponentName/
├── ComponentName.tsx          # Implementation (uses classNames utility)
├── ComponentName.types.ts     # TypeScript type definitions (REQUIRED)
├── ComponentName.module.css   # CSS Modules styles
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                   # Public exports
```

### Key Architectural Patterns

**TypeScript Requirements:**
- All types MUST use `type` keyword, NEVER `interface`
- All types MUST be in separate `.types.ts` files
- Strict mode enabled - no `any` without justification
- All component props MUST be fully typed

**Styling System:**
- CSS Modules for all component styles
- ALL className attributes MUST use `classNames` utility from [utils/classNames.ts](utils/classNames.ts)
- ALL CSS custom properties MUST be defined on `.root` class with `--reltio-{component-name}-` prefix
- Internal elements MUST use ONLY CSS variables, never direct values
- CSS variables MUST include fallback values: `var(--reltio-button-height, 36px)`
- This enables external customization via inline styles: `<Button style={{ "--reltio-button-color-primary": "red" }}>`

**Storybook Requirements:**
- Every component MUST have stories demonstrating all variants and states
- Each story MUST show only ONE variant (no "All Variants" stories)
- Stories serve as documentation AND visual regression tests
- Auto-documentation enabled via "autodocs" tag

**Code Style (Biome):**
- Tabs for indentation
- Double quotes for strings
- Auto-organize imports
- No unused imports/variables/parameters

### Path Aliases
- `@/*` maps to repository root (configured in [tsconfig.json](tsconfig.json))
- Import example: `import { classNames } from "@/utils/classNames"`

### Utilities
- [utils/classNames.ts](utils/classNames.ts) - BEM-like class name utility that automatically adds base classes for elements with `__` suffix

## Design Constitution (NON-NEGOTIABLE)

The project has strict design principles defined in [docs/Constitution.mdx](docs/Constitution.mdx). Key requirements:

1. **Component-First Architecture** - All functionality as self-contained React components
2. **TypeScript Strict Mode** - No exceptions, use `type` not `interface`, types in `.types.ts` files
3. **Storybook Documentation** - Every component, all variants, one variant per story
4. **CSS Modules** - Scoped styles with custom properties on root element
5. **classNames Utility** - Required for all className attributes
6. **CSS Custom Properties** - All design tokens as CSS variables on `.root` with `--reltio-{component}-` prefix
7. **English Language** - All files, comments, documentation in English only
8. **Biome Code Quality** - Must pass linting and formatting

See full constitution for complete details and rationale.

## OpenSpec Workflow

This project uses OpenSpec for spec-driven development. See [openspec/AGENTS.md](openspec/AGENTS.md) for full instructions.

**Quick Reference:**
```bash
openspec list                    # View active changes
openspec list --specs            # View existing capabilities
openspec show [item]             # Display details
openspec validate [item] --strict # Validate changes
openspec archive <change-id>     # Archive completed changes
```

**When to create a proposal:**
- New features or capabilities
- Breaking changes (API, schema, architecture)
- Performance optimizations that change behavior
- Security pattern changes

**Skip proposals for:**
- Bug fixes (restoring spec behavior)
- Typos, formatting, comments
- Non-breaking dependency updates
- Configuration changes

## Pre-Commit Checklist

Before committing any code changes:
- [ ] Code follows component structure (including `.types.ts` file)
- [ ] All types use `type` keyword (not `interface`)
- [ ] All className attributes use `classNames()` utility
- [ ] CSS custom properties defined on `.root` and used exclusively
- [ ] Storybook stories added/updated (one variant per story)
- [ ] Component works in all states (normal, hover, focus, disabled)
- [ ] `npm run format` executed
- [ ] `npm run lint` passes without errors
- [ ] All text in English

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript (strict mode)
- **Build Tool**: Storybook 10 with Next.js framework
- **Styling**: CSS Modules
- **Code Quality**: Biome 2.3.4
- **Visual Testing**: Chromatic
- **Version Control**: Git (Bitbucket)
