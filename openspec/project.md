# Project Context

## Purpose

Reltio Design Platform provides a library of reusable React components and tools for building consistent user interfaces across Reltio products. The system emphasizes:
- **Reusability** - Self-contained, independently testable components
- **Type Safety** - Full TypeScript coverage with strict mode
- **Accessibility** - WCAG-compliant, keyboard-navigable components
- **Documentation** - Interactive Storybook documentation for all components
- **Visual Consistency** - Unified style and behavior via CSS Modules and design tokens

## Tech Stack

- **React 19** - Component library framework
- **TypeScript** - Strict mode enabled, all code fully typed
- **Storybook 10** - Interactive component documentation and development environment
- **Next.js** - Storybook framework adapter
- **CSS Modules** - Scoped component styling
- **Biome 2.3.4** - Linting and code formatting
- **Chromatic** - Visual regression testing and component review
- **Git/Bitbucket** - Version control and repository hosting

## Project Conventions

### Code Style

**Formatting (Biome):**
- Tabs for indentation (not spaces)
- Double quotes for strings
- Automatic import organization
- No unused imports, variables, or parameters
- Run `npm run format` before committing
- All checks must pass `npm run lint`

**TypeScript:**
- Use `type` keyword exclusively (NEVER `interface`)
- All types in separate `.types.ts` files (e.g., `Button.types.ts`)
- No `any` types without explicit justification
- Export all component prop types alongside components

**Naming:**
- Components: PascalCase (e.g., `Button`, `TextField`)
- Files: Match component name (e.g., `Button.tsx`, `Button.module.css`)
- CSS classes: BEM-like naming with CSS Modules (e.g., `.root`, `.button__icon`)
- CSS variables: `--reltio-{component-name}-{property}` (e.g., `--reltio-button-height`)
- Test IDs: kebab-case with component prefix (e.g., `data-testid="button-submit"`)

**Language:**
- All files, comments, documentation, and commit messages MUST be in English
- No exceptions - this ensures consistency for all team members

### Architecture Patterns

**Component Structure (Mandatory):**
```
components/ComponentName/
├── ComponentName.tsx          # Implementation
├── ComponentName.types.ts     # TypeScript type definitions (REQUIRED)
├── ComponentName.module.css   # CSS Modules styles
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                   # Public exports
```

**Styling Pattern:**
- ALL components use CSS Modules for scoped styles
- ALL className attributes MUST use `classNames()` utility from `utils/classNames.ts`
- ALL CSS custom properties defined on `.root` class with `--reltio-{component}-` prefix
- Internal elements use ONLY CSS variables, never direct values
- CSS variables MUST include fallback values: `var(--reltio-button-height, 36px)`
- This enables external customization: `<Button style={{ "--reltio-button-color": "red" }}>`

**Component Design:**
- Single responsibility - one clear purpose per component
- Self-contained - no application-specific logic or context dependencies
- Composable - components can be combined to build complex UIs
- Polymorphic when needed - support `as` prop for semantic HTML flexibility

**Path Aliases:**
- `@/*` maps to repository root (configured in `tsconfig.json`)
- Always use aliases for internal imports: `import { classNames } from "@/utils/classNames"`

### Testing Strategy

**Visual Testing (Primary):**
- Storybook stories serve as visual tests
- Every component MUST have stories for all variants and states
- Each story MUST show only ONE variant (no "All Variants" stories)
- Chromatic automatically runs visual regression tests on every deployment
- Stories must be functional and representative of real-world usage

**Accessibility Testing:**
- Storybook a11y addon enabled for all stories
- Components must pass WCAG 2.1 Level AA standards
- Test keyboard navigation (Tab, Enter, Space, Escape)
- Verify screen reader compatibility with proper ARIA attributes

**Manual Testing Checklist:**
- Normal state (default appearance)
- Hover state (mouse interaction)
- Focus state (keyboard navigation)
- Disabled state (inactive appearance and behavior)
- Responsive behavior (different screen sizes)

### Git Workflow

**Branch Strategy:**
- `main` - Production-ready code
- Feature branches: `UC-{number}` or descriptive names (e.g., `add-button-component`)
- Branch from `main`, merge back to `main` via pull request

**Commit Messages:**
- Write in imperative mood: "Add button component" (not "Added" or "Adds")
- First line: brief summary (50 chars or less)
- Optionally add detailed description after blank line
- Reference issue/ticket numbers when applicable

**Pull Request Process:**
1. Create feature branch from `main`
2. Implement changes following all constitution principles
3. Run `npm run format` and `npm run lint`
4. Verify all stories work in Storybook (`npm run dev`)
5. Create PR with description of changes
6. Deploy to Chromatic for visual review (`npm run deploy`)
7. Address review feedback
8. Merge after approval

## Domain Context

**Design System Philosophy:**
The Reltio Design Platform follows a constitutional governance model with strict, non-negotiable principles documented in `docs/Constitution.mdx`. These principles supersede all other guidelines and must be followed without exception. The constitution covers:
- Component-first architecture
- TypeScript strict mode (using `type`, not `interface`)
- Mandatory Storybook documentation
- CSS Modules and custom properties
- classNames utility usage
- English-only language requirement

**Component Lifecycle:**
1. **Planning** - Create OpenSpec proposal for new components or breaking changes
2. **Implementation** - Build following component structure and constitution
3. **Documentation** - Write comprehensive Storybook stories
4. **Review** - Visual testing via Chromatic, code review for constitution compliance
5. **Deployment** - Merge to main, publish to package registry
6. **Archive** - Archive OpenSpec change after deployment

**Customization Model:**
Components are designed for external customization via:
- CSS custom properties (style props pattern)
- Stable base class names (via `classNames` utility)
- Prop-based variants (variant, size, color, etc.)

## Important Constraints

**Non-Negotiable Requirements (Constitution):**
1. All types use `type` keyword, NEVER `interface`
2. All types defined in separate `.types.ts` files
3. All className attributes use `classNames()` utility
4. All CSS custom properties on `.root` class, used exclusively
5. Each Storybook story shows only ONE variant
6. All text in English only
7. TypeScript strict mode, no `any` without justification
8. Biome formatting must pass before commit

**Breaking Changes:**
- Require MAJOR version bump (semantic versioning)
- Must be documented in changelog with migration guide
- Require OpenSpec proposal before implementation
- Must be reviewed and approved before merging

**Browser Support:**
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features supported
- CSS custom properties required (no IE11 support)

**Accessibility Requirements:**
- WCAG 2.1 Level AA compliance mandatory
- Keyboard navigation support required
- Screen reader compatibility required
- Proper ARIA attributes required

## External Dependencies

**Chromatic:**
- Visual regression testing service
- Automatically runs on `npm run deploy`
- Provides component review and collaboration
- Required before merging changes that affect component appearance

**Storybook:**
- Primary development and documentation environment
- Runs locally on port 6006 (`npm run dev`)
- Builds for production deployment (`npm run build-storybook`)
- Includes addons: docs, a11y, chromatic

**Biome:**
- Linting and formatting tool (replaces ESLint + Prettier)
- Configuration in `biome.json`
- Enforces consistent code style across project
- Must pass before committing

**Bitbucket:**
- Repository hosting and code review
- Issue tracking for bugs and feature requests
- CI/CD pipeline integration (if configured)

**No Runtime Dependencies:**
- Components only depend on React and React DOM
- No UI framework dependencies (Material-UI, Ant Design, etc.)
- Keeps bundle size minimal and reduces conflicts
