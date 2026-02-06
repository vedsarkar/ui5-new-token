# Change: Add Reusable React ErrorBoundary Component

## Why

The design system needs a reusable React Error Boundary to catch render-time errors from descendant components and display a fallback UI instead of crashing. Error handling is implemented via the new local ErrorBoundary component, which aligns with project conventions (TypeScript, CSS Modules, Storybook) and provides a single source of truth for error boundary behavior across Reltio products.

## What Changes

- **ADDED** `ErrorBoundary` component implemented as a React class component (required by React's error boundary API)
- **ADDED** Props: `children` (React.ReactNode), `fallback` (React.ReactNode), `onError?` (error: Error, info: React.ErrorInfo) => void
- **ADDED** Behavior: catch render-time errors from descendants, render `fallback` on error, call `onError` in `componentDidCatch`
- **ADDED** TypeScript types in `ErrorBoundary.types.ts`, CSS Modules styling, Storybook stories
- **ADDED** No external dependencies; TypeScript compatible with strict mode

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/ErrorBoundary/` — new component folder
- Breaking changes: None
- Migration: N/A (new component)
- Dependencies: None (React only). Error handling is implemented via the new ErrorBoundary component.
