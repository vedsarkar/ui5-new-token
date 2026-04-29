## MODIFIED Requirements

### Requirement: Class Component API

The ErrorBoundary component SHALL be aligned with the current React class component API, maintaining `componentDidCatch` and `getDerivedStateFromError` lifecycle methods.

#### Scenario: Aligned class component implementation

- **WHEN** the ErrorBoundary component catches a rendering error
- **THEN** it uses `getDerivedStateFromError` to update state
- **AND** `componentDidCatch` to invoke the optional `onError` callback
- **AND** the API matches the current class component implementation without wrapper HOCs
