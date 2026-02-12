# Change: Add Skeleton Loading Component

## Why

Applications need a reusable loading placeholder that indicates content is loading while preserving layout. A Skeleton component provides rectangular placeholders with a shimmer animation, giving users clear visual feedback and reducing perceived wait time. It complements the existing Loading component (which shows an animated indicator) by filling content areas with placeholder shapes.

## What Changes

- **ADDED** `Skeleton` component for loading placeholders
- **ADDED** `rows` prop to control the number of rectangular placeholder bars
- **ADDED** `size` prop (number) passed to styles to affect line height and line gap
- **ADDED** Shimmer (moving gradient) animation on each placeholder
- **ADDED** Full-width layout (Skeleton width 100%)
- **ADDED** TypeScript types in `Skeleton.types.ts`, CSS Modules with custom properties, Storybook stories
- **ADDED** Accessibility (e.g. aria-busy, aria-label for loading placeholder)

## Impact

- Affected specs: None (new capability)
- Affected code: `components/Skeleton/` (new component folder)
- Breaking changes: None
- Migration: N/A (new component)
