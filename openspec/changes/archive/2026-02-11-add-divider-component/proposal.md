# Change: Add Divider Component

## Why

The Reltio Design System needs a Divider component for consistent horizontal separators between content sections. This is referenced in the DESIGN-38 Jira ticket and Figma designs for the "Reltio MDM from Databricks" application, where dividers are used throughout detail panels to visually separate content groups.

## What Changes

- Create `components/Divider/Divider.tsx` - Component implementation rendering a horizontal separator with `role="separator"` and `aria-orientation="horizontal"`
- Create `components/Divider/Divider.types.ts` - TypeScript type definitions using `type` keyword only
- Create `components/Divider/Divider.module.css` - CSS Modules styles with all custom properties on `.root` using `--reltio-divider-` prefix
- Create `components/Divider/Divider.stories.tsx` - Storybook stories with one variant per story (Default, CustomColor, CustomSpacing, CustomThickness)
- Create `components/Divider/index.ts` - Public exports for component and types

## Impact

- Affected specs: New capability `divider-component`
- Affected code: `components/Divider/` (new directory with 5 files)
