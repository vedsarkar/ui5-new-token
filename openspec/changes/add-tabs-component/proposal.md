# Change: Add Tabs Component

## Why

The Reltio MDM from Databricks application requires a consistent tabbed navigation pattern for organizing content at page, panel, and form levels (DESIGN-40). The Figma designs reference tabs extensively for switching between content areas such as "DATA SHARE" / "ZERO COPY" (page-level), "SUMMARY" / "MAPPING" (panel-level), and "Attributes" / "Crosswalks" (form-level). No Tabs component currently exists in the design system.

## What Changes

- Add new `components/Tabs/` directory with full component structure:
  - `Tabs.tsx` - Component implementation with tab list and tab items
  - `Tabs.types.ts` - TypeScript type definitions using `type` keyword
  - `Tabs.module.css` - CSS Modules styles with `--reltio-tabs-` custom properties on `.root`
  - `Tabs.stories.tsx` - Storybook stories (one variant per story)
  - `Spec.story.mdx` - Links to OpenSpec specification
  - `index.ts` - Public exports
- Add new capability spec `openspec/specs/tabs-component/spec.md` (via delta)

## Impact

- Affected specs: new capability `tabs-component`
- Affected code: `components/Tabs/` (new directory)
- No breaking changes to existing components
- No dependencies on other design system components
