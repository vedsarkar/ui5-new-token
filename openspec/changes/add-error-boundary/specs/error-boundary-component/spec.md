# ErrorBoundary Component Specification

## Purpose

The ErrorBoundary component is a reusable React class component that catches JavaScript errors in descendant components during rendering, displays a fallback UI when an error occurs, and optionally notifies the consumer via an onError callback. It has no external dependencies and is fully TypeScript compatible, following Reltio Design Platform conventions.

## ADDED Requirements

### Requirement: Error Boundary Props

The ErrorBoundary component SHALL accept props: `children` (React.ReactNode), `fallback` (React.ReactNode), and optionally `onError` with signature (error: Error, info: React.ErrorInfo) => void.

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
- **THEN** the callback is invoked in componentDidCatch with the error and React.ErrorInfo

### Requirement: Catch Render-Time Errors

The ErrorBoundary component SHALL catch JavaScript errors that occur during rendering, in lifecycle methods, or in constructors of descendant components.

#### Scenario: Error in descendant render is caught
- **WHEN** a descendant component throws an error during render
- **THEN** the error is caught by the ErrorBoundary
- **AND** the ErrorBoundary does not unmount the entire tree
- **AND** the fallback UI is rendered in place of the failed subtree

#### Scenario: No error renders children
- **WHEN** no error occurs in descendants
- **THEN** ErrorBoundary renders its children normally
- **AND** the fallback is not shown

### Requirement: Fallback Rendering

The ErrorBoundary component SHALL render the `fallback` prop when an error has been caught.

#### Scenario: Fallback displayed on error
- **WHEN** an error is caught from a descendant
- **THEN** the ErrorBoundary renders the `fallback` prop instead of the failed children
- **AND** the fallback receives no error props from ErrorBoundary (consumer may pass custom fallback component that accepts props elsewhere if desired)

#### Scenario: Fallback is React.ReactNode
- **WHEN** fallback is provided as a string, element, or component
- **THEN** it is rendered as-is when an error occurs
- **AND** no transformation or wrapping is applied beyond the component's root wrapper

### Requirement: onError Callback

The ErrorBoundary component SHALL call the optional `onError` callback from componentDidCatch with the caught error and the React.ErrorInfo object when an error is caught.

#### Scenario: onError invoked with error and info
- **WHEN** an error is caught and `onError` prop is provided
- **THEN** `onError(error, info)` is called from componentDidCatch
- **AND** the first argument is the caught Error instance
- **AND** the second argument is React.ErrorInfo (componentStack)

#### Scenario: onError not required
- **WHEN** `onError` is not provided
- **THEN** the component still catches errors and renders fallback
- **AND** no callback is invoked

### Requirement: Class Component Implementation

The ErrorBoundary component SHALL be implemented as a React class component, using getDerivedStateFromError and componentDidCatch, with no external error-boundary dependencies.

#### Scenario: Uses React error boundary API
- **WHEN** ErrorBoundary is implemented
- **THEN** it extends React.Component (or React.PureComponent)
- **AND** it defines getDerivedStateFromError to set state with the error
- **AND** it defines componentDidCatch to call onError when provided
- **AND** it does not depend on any third-party error-boundary library

### Requirement: TypeScript Compatibility

The ErrorBoundary component SHALL be fully typed with TypeScript in strict mode, with all prop types defined in a separate ErrorBoundary.types.ts file using the `type` keyword.

#### Scenario: Props fully typed
- **WHEN** a developer uses ErrorBoundary
- **THEN** children and fallback are typed as React.ReactNode
- **AND** onError is typed as (error: Error, info: React.ErrorInfo) => void
- **AND** types are exported from ErrorBoundary.types.ts
- **AND** no `any` is used without justification

#### Scenario: Types exported alongside component
- **WHEN** developer imports ErrorBoundary from the component index
- **THEN** ErrorBoundaryProps (or equivalent) type can be imported
- **AND** TypeScript provides autocomplete and compile-time checks

### Requirement: No External Dependencies

The ErrorBoundary component SHALL not introduce any new runtime or type-only dependencies beyond React and React DOM (and existing project type definitions).

#### Scenario: No new package dependencies
- **WHEN** ErrorBoundary is added to the project
- **THEN** no new entries are required in package.json dependencies for this component
- **AND** only React and React DOM (and @types/react if used for ErrorInfo) are used
- **AND** no external error-boundary or error-handling library is used

### Requirement: Component Structure and Styling

The ErrorBoundary component SHALL follow the mandatory component structure: implementation file, separate .types.ts file, CSS Modules file, Storybook stories, and index.ts; and SHALL use the classNames utility and CSS custom properties on .root with --reltio-error-boundary- prefix.

#### Scenario: Mandatory file structure
- **WHEN** ErrorBoundary is delivered
- **THEN** components/ErrorBoundary/ contains ErrorBoundary.tsx, ErrorBoundary.types.ts, ErrorBoundary.module.css, ErrorBoundary.stories.tsx, and index.ts
- **AND** all className attributes use the classNames() utility from @/utils/classNames

#### Scenario: CSS custom properties on root
- **WHEN** ErrorBoundary is styled
- **THEN** CSS custom properties are defined on .root with --reltio-error-boundary- prefix
- **AND** variables include fallback values
- **AND** internal elements use only CSS variables where applicable

### Requirement: Storybook Documentation

The ErrorBoundary component SHALL have Storybook stories demonstrating normal render, fallback on error, and onError callback, with each story showing only ONE variant.

#### Scenario: Stories for core behavior
- **WHEN** viewing Storybook
- **THEN** a story exists for normal render (children render without error)
- **AND** a story exists for fallback on error (child throws, fallback is shown)
- **AND** a story exists for onError callback (callback invoked with error and info)
- **AND** each story shows only one variant per project conventions
- **AND** stories use "autodocs" tag for auto-documentation
