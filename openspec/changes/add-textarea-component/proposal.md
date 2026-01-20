# Change: Add Unified TextArea Component

## Why

The Reltio Design System currently lacks a multiline text input component. Users need a consistent, accessible way to input multiline text values in forms, chat interfaces, feedback forms, and other use cases across Reltio applications. A shared TextArea component ensures visual consistency and reduces code duplication across apps.

## Design Approach

This component follows **Material Design 3 (M3)** guidelines for text field styling and behavior. The implementation is custom CSS (no MUI or other React component library dependencies), ensuring:
- Lightweight bundle size
- Full control over styling via CSS custom properties
- Consistency with Reltio Design System patterns

## What Changes

- **ADDED**: New `TextArea` component with the following features:
  - Material Design 3 styling (outlined text field variant)
  - Form-agnostic controlled component (value/onChange pattern)
  - Floating label with M3-style animation
  - Leading and trailing icon slots
  - Toolbar slot for action buttons (attachments, formatting, etc.)
  - Submit-on-Enter behavior for chat/feedback use cases
  - Error state with supporting text
  - Disabled state
  - Auto-resize based on content (field-sizing: content)
  - Responsive padding adjustments
  - Full CSS custom property support for theming
  - Keyboard accessibility
  - Screen reader support

## Impact

- Affected specs: New `textarea-component` capability
- Affected code:
  - `components/TextArea/TextArea.tsx` - Main component
  - `components/TextArea/TextArea.types.ts` - TypeScript types
  - `components/TextArea/TextArea.module.css` - Styles
  - `components/TextArea/TextArea.stories.tsx` - Storybook stories
  - `components/TextArea/index.ts` - Public exports
  - `components/index.ts` - Add TextArea to public exports
