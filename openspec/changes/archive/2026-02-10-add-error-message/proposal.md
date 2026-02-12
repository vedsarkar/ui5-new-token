# Change: Add ErrorMessage Component

## Why

The application requires a standardized, reusable component for displaying error states across different contexts. Currently, error handling is implemented inconsistently across components (e.g., AssistantMessage has its own error state). A dedicated ErrorMessage component will provide consistent error messaging, styling, and accessibility patterns throughout the application.

## What Changes

- **ADDED** `ErrorMessage` component for displaying standardized error states
- **ADDED** Support for custom error messages and default error messages
- **ADDED** Optional error icon integration (ErrorCircle from icon library)
- **ADDED** TypeScript types following project conventions (ErrorMessage.types.ts)
- **ADDED** CSS Modules styling with CSS custom properties
- **ADDED** Comprehensive Storybook stories demonstrating error message display
- **ADDED** Accessibility features (role="alert", aria-live)

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/ErrorMessage/` - new component folder
  - Uses existing ErrorCircle icon from icon library
- Breaking changes: None
- Migration: N/A (new component)
