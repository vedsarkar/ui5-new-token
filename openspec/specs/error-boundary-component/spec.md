# error-boundary-component Specification

## Purpose

Provides a reusable React Error Boundary that catches render-time errors from descendant components, renders fallback UI, and optionally notifies via a callback.

## Requirements

### Requirement: Error Boundary Props

The ErrorBoundary component SHALL accept props: `children` (React.ReactNode), `fallback` (React.ReactNode), and optionally `onError` with signature `(error: Error, info: React.ErrorInfo) => void`.

#### Scenario: Children and fallback are required
- **WHEN** ErrorBoundary is used
- **THEN** `children` and `fallback` props are required
- **AND** `children` is the content to render when no error occurs
- **AND** `fallback` is the content to render when an error is caught

#### Scenario: onError is optional
- **WHEN** ErrorBoundary is used without an `onError` prop
- **THEN** the component still catches errors and renders the fallback
- **AND** no callback is invoked
- **WHEN** ErrorBoundary is used with an `onError` prop
- **THEN** the callback is invoked in `componentDidCatch` with the error and React.ErrorInfo

### Requirement: Catch Render-Time Errors

The ErrorBoundary component SHALL catch JavaScript errors during rendering, lifecycle methods, or constructors of descendant components.

#### Scenario: Error in descendant render is caught
- **WHEN** a descendant component throws an error during render
- **THEN** the error is caught by the ErrorBoundary
- **AND** the fallback UI is rendered in place of the failed subtree

#### Scenario: No error renders children
- **WHEN** no error occurs in descendants
- **THEN** ErrorBoundary renders its children normally
- **AND** the fallback is not shown

### Requirement: Fallback Rendering

The ErrorBoundary component SHALL render the `fallback` prop when an error has been caught. The error state is tracked via `{ hasError: boolean; error: Error | null }`.

#### Scenario: Fallback displayed on error
- **WHEN** an error is caught from a descendant
- **THEN** `getDerivedStateFromError` sets `{ hasError: true, error }` in state
- **AND** the `render` method returns the `fallback` prop when `state.error` is truthy

#### Scenario: Fallback is React.ReactNode
- **WHEN** fallback is provided as a string, element, or component
- **THEN** it is rendered as-is when an error occurs

### Requirement: onError Callback

The ErrorBoundary component SHALL call the optional `onError` callback from `componentDidCatch` with the caught error and React.ErrorInfo.

#### Scenario: onError invoked with error and info
- **WHEN** an error is caught and `onError` prop is provided
- **THEN** `this.props.onError?.(error, info)` is called in `componentDidCatch`
- **AND** the first argument is the caught Error instance
- **AND** the second argument is React.ErrorInfo (componentStack)

#### Scenario: onError not required
- **WHEN** `onError` is not provided
- **THEN** the component still catches errors and renders fallback

### Requirement: Class Component Implementation

The ErrorBoundary component SHALL be implemented as a React class component extending `React.Component`, using `getDerivedStateFromError` and `componentDidCatch`, with no external dependencies.

#### Scenario: Uses React error boundary API
- **WHEN** ErrorBoundary is implemented
- **THEN** it extends `React.Component<ErrorBoundaryProps, ErrorBoundaryState>`
- **AND** it defines static `getDerivedStateFromError` to set error state
- **AND** it defines `componentDidCatch` to call `onError` when provided
- **AND** it does not depend on any third-party error-boundary library

#### Scenario: No CSS styling
- **WHEN** ErrorBoundary is rendered
- **THEN** no CSS Modules or CSS custom properties are used
- **AND** the component is a pure logic boundary with no visual output of its own

### Requirement: TypeScript Type Safety

The ErrorBoundary component SHALL be fully typed with TypeScript in strict mode, with all types in a separate `ErrorBoundary.types.ts` file using the `type` keyword.

#### Scenario: Props fully typed
- **WHEN** a developer uses ErrorBoundary
- **THEN** `children` is typed as `React.ReactNode`
- **AND** `fallback` is typed as `React.ReactNode`
- **AND** `onError` is typed as optional `(error: Error, info: React.ErrorInfo) => void`
- **AND** `ErrorBoundaryState` is typed as `{ hasError: boolean; error: Error | null }`

#### Scenario: Types exported alongside component
- **WHEN** developer imports ErrorBoundary
- **THEN** `ErrorBoundaryProps` and `ErrorBoundaryState` types can be imported
- **AND** types are in `ErrorBoundary.types.ts`

### Requirement: No External Dependencies

The ErrorBoundary component SHALL not introduce any runtime dependencies beyond React and React DOM.

#### Scenario: No new package dependencies
- **WHEN** ErrorBoundary is added to the project
- **THEN** no new entries are required in `package.json`
- **AND** only React APIs are used

### Requirement: Storybook Documentation

The ErrorBoundary component SHALL have Storybook stories demonstrating normal render, fallback on error, and onError callback, with each story showing only ONE variant.

#### Scenario: Stories for core behavior
- **WHEN** viewing Storybook
- **THEN** a story exists for normal render (children render without error)
- **AND** a story exists for fallback on error (child throws, fallback is shown)
- **AND** a story exists for onError callback behavior
- **AND** stories use "autodocs" tag
