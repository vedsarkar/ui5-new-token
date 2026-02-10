# Change: Add Loading Component

## Why

The chat system requires a standardized, reusable component for displaying loading states while waiting for assistant responses. A dedicated Loading component will provide consistent loading indicators, styling, and accessibility patterns that can be reused across the application, including in chat interfaces and other contexts where loading states are needed.

## What Changes

- **ADDED** `Loading` component for displaying standardized loading states
- **ADDED** Support for different sizes (small, medium, large)
- **ADDED** Loading GIF indicator
- **ADDED** TypeScript types following project conventions (Loading.types.ts)
- **ADDED** CSS Modules styling with CSS custom properties
- **ADDED** Comprehensive Storybook stories demonstrating loading states
- **ADDED** Accessibility features (aria-busy, aria-label)

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/Loading/` - new component folder
- Breaking changes: None
- Migration: N/A (new component)
