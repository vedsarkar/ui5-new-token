<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0 (added English language requirement principle)
Modified principles: N/A
Added sections: Principle VII - English Language Requirement
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section references constitution (no changes needed)
  ✅ spec-template.md - No direct constitution references, but aligns with principles (no changes needed)
  ✅ tasks-template.md - Task organization aligns with component-first principle (no changes needed)
Follow-up TODOs: None
-->

# Reltio Design Constitution

## Core Principles

### I. Component-First Architecture
All functionality MUST be delivered as self-contained, reusable React components. Components MUST be independently testable, documented, and exportable. Each component MUST have a clear, single responsibility. Components MUST be organized in their own directories with associated styles, stories, and tests. No component should depend on application-specific logic or context.

### II. TypeScript Strict Mode (NON-NEGOTIABLE)
All code MUST be written in TypeScript with strict mode enabled. Type safety is mandatory - no `any` types without explicit justification. All component props MUST be fully typed. Public APIs MUST export TypeScript types. Type definitions MUST be kept in sync with implementation.

### III. Storybook Documentation (NON-NEGOTIABLE)
Every component MUST have a corresponding Storybook story file. Stories MUST demonstrate all component variants, states, and use cases. Stories serve as both documentation and visual regression testing. All interactive examples MUST be functional and representative of real-world usage.

### IV. CSS Modules for Styling
Component styles MUST use CSS Modules for scoped styling. Each component MUST have its own `.module.css` file. Global styles MUST be avoided unless explicitly justified. CSS Modules provide automatic scoping and prevent style conflicts across components.

### V. Code Quality Standards
All code MUST pass Biome linting and formatting checks before commit. Code formatting MUST follow Biome configuration (tabs for indentation, double quotes for strings). Unused imports, variables, and parameters MUST be removed. Code reviews MUST verify linting compliance.

### VI. Versioning & Breaking Changes
Versioning MUST follow semantic versioning (MAJOR.MINOR.PATCH). Breaking changes to component APIs, prop interfaces, or public exports require MAJOR version bump. New features without breaking changes require MINOR version bump. Bug fixes and non-breaking improvements require PATCH version bump. All breaking changes MUST be documented in changelog with migration guide.

### VII. English Language Requirement (NON-NEGOTIABLE)
All files in the repository MUST use English language exclusively. This includes but is not limited to: source code, comments, documentation, commit messages, pull request descriptions, configuration files, and all written content. Code comments, function names, variable names, documentation strings, README files, and any other text content MUST be written in English. This ensures consistency, maintainability, and accessibility for all team members and contributors regardless of their native language.

## Code Quality Standards

**Linting**: Biome MUST be used for all linting and formatting. Configuration is defined in `biome.json` and MUST be consistent across the project.

**Type Safety**: TypeScript strict mode MUST be enabled. All `tsconfig.json` strict flags MUST remain enabled. No disabling of type checking without explicit justification.

**Component Structure**: Each component MUST follow the established pattern:
- `ComponentName.tsx` - Component implementation
- `ComponentName.module.css` - Component styles
- `ComponentName.stories.ts` - Storybook stories
- `index.ts` - Public exports

## Development Workflow

**Component Creation**: New components MUST be created in the `components/` directory following the established structure. Each component MUST include TypeScript types, CSS Modules, and Storybook stories before being considered complete.

**Code Review**: All changes MUST be reviewed for constitution compliance. Reviewers MUST verify:
- TypeScript strict mode compliance
- Storybook story completeness
- CSS Modules usage
- Biome linting/formatting compliance
- Component self-containment
- English language usage in all files, comments, and documentation

**Testing**: Components MUST be visually tested in Storybook. Visual regression testing via Chromatic is required before deployment. All component variants and states MUST be verified.

## Governance

This constitution supersedes all other development practices and guidelines. Amendments to this constitution require:
1. Documentation of the proposed change and rationale
2. Review and approval by the team
3. Update to version number following semantic versioning
4. Propagation of changes to all dependent templates and documentation
5. Update to this Sync Impact Report

All pull requests and code reviews MUST verify compliance with constitution principles. Any violation of constitution principles MUST be justified in the Complexity Tracking section of implementation plans, or the violation MUST be resolved before merge.

**Version**: 1.1.0 | **Ratified**: 2025-01-20 | **Last Amended**: 2025-01-20
