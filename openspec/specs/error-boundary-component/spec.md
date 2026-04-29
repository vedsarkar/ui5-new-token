# error-boundary-component Specification

## Purpose

ErrorBoundary — a React class component that catches render-time errors in its subtree and displays a fallback UI. Provides an `onError` callback for error reporting.

No SAP equivalent (React error handling pattern).

## Requirements

### Requirement: Error Catching

#### Scenario: Render error caught
- **WHEN** a descendant component throws during render
- **THEN** the error is caught by `componentDidCatch`
- **AND** the error is stored in component state
- **AND** `onError(error, errorInfo)` is called if provided

#### Scenario: Fallback rendering
- **WHEN** an error has been caught
- **THEN** `fallback` content renders instead of `children`

#### Scenario: Normal rendering
- **WHEN** no error has occurred
- **THEN** `children` renders normally

### Requirement: Props

- `children: React.ReactNode` — wrapped components
- `fallback: React.ReactNode` — UI to show on error
- `onError?: (error: Error, info: React.ErrorInfo) => void` — optional error callback

### Requirement: Implementation

The ErrorBoundary SHALL be a class component (required by React's error boundary API). No CSS module — renders no markup of its own.

### Requirement: TypeScript Types

Props SHALL be defined in `ErrorBoundary.tsx` (no separate `.types.ts` since it's a class component with inline state/prop types).
