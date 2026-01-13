# Change: Add Shared Icon and Graphics Library

## Why

The design system currently lacks a centralized icon and graphics library. Components that need icons (like TreeList's ChevronIcon) define them inline, leading to inconsistent implementations and duplication. A shared icon library will:
- Provide consistent iconography across all Reltio products
- Enable reuse through both direct URL access and React component imports
- Support empty states, error states, and welcome graphics alongside standard icons
- Offer discoverable icons through Storybook with search and copy functionality

## What Changes

- **ADDED** `public/icons/` folder for source SVG files (manually uploaded)
- **ADDED** `icons/` folder with auto-generated React icon components
- **ADDED** npm script `generate-icons` to convert SVGs to React components
- **ADDED** Icon component wrapper with size/color customization support
- **ADDED** Storybook page "Icon Library" with search, copy URL/import, and links to individual icon stories
- **ADDED** Individual Storybook stories for each icon with size/color variations
- **ADDED** Type definitions for icon components following project conventions
- **ADDED** Package exports for `@reltio/design/icons/IconName` import pattern

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `public/icons/` - new folder for source SVGs
  - `icons/` - new folder for generated React components
  - `package.json` - new npm script
  - `.storybook/` - icon library documentation page
- Breaking changes: None
- Migration: Existing inline icons (like ChevronIcon) can optionally be migrated to use the new library
