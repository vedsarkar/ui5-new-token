## ADDED Requirements

### Requirement: Form renders a native form element
The endorsed `Form` component SHALL render a native HTML `<form>` element that wraps the UI5 Form layout floorplan, so that form-associated UI5 fields placed inside participate in native form submission.

#### Scenario: Native form wrapper is present
- **WHEN** a `Form` is rendered with `FormItem` children
- **THEN** the rendered output contains a native `<form>` element as the wrapper around the UI5 Form layout
- **AND** the UI5 Form layout (`layout`, `labelSpan`, `accessibleMode`, `headerText`) and children render unchanged inside it

### Requirement: Form forwards UI5 Form props and children
The `Form` component SHALL pass through all UI5 Form props, slots, and children unchanged, so that it is behaviorally equivalent to the prior re-export aside from the native `<form>` wrapper.

#### Scenario: UI5 props pass through
- **WHEN** a `Form` is rendered with UI5 props such as `layout="S1 M2 L2 XL2"` and `accessibleMode="Edit"`
- **THEN** the inner UI5 Form receives those props and applies the responsive column layout and edit semantics as before

#### Scenario: No onSubmit provided
- **WHEN** a `Form` is rendered without an `onSubmit` prop
- **THEN** the component renders normally and submitting the form does not throw

### Requirement: Form exposes an onSubmit callback with a serialized JSON object
The `Form` component SHALL accept an optional `onSubmit` prop of shape `(values: FormValues, event: React.FormEvent<HTMLFormElement>) => void`, where `FormValues` is a flat object keyed by field `name`. On native form submission the component SHALL call `event.preventDefault()`, build `FormData` from the form element, serialize it to a flat JSON object, and invoke `onSubmit` with that object and the event.

#### Scenario: Submit serializes named fields to JSON
- **WHEN** a `Form` contains UI5 input fields with `name` attributes and a `Button` with `type="Submit"`, and the user activates the submit button
- **THEN** `onSubmit` is called with a plain object whose keys are the field `name`s and whose values are the fields' current values
- **AND** the browser does not perform a full-page navigation/reload

#### Scenario: Repeated field names become arrays
- **WHEN** the submitted form contains more than one field sharing the same `name`
- **THEN** that key's value in the JSON object is an array of all submitted values for that `name`
- **AND** a `name` submitted exactly once maps to a single (non-array) value

#### Scenario: Event escape hatch is provided
- **WHEN** `onSubmit` is invoked
- **THEN** the second argument is the native React form submit event, allowing access to `currentTarget` (e.g. to build raw `FormData` for `File` fields) and further event control

#### Scenario: Multiple forms submit independently
- **WHEN** two `Form` instances with separate `onSubmit` handlers are rendered on the same page and one of them is submitted
- **THEN** only that form's `onSubmit` is called, with a JSON object containing only that form's named fields
- **AND** the other form's `onSubmit` is not called

### Requirement: Form forwards ref to the native form element
The `Form` component SHALL forward its `ref` to the native `<form>` element so consumers can programmatically submit or reset it.

#### Scenario: Ref points to the form element
- **WHEN** a consumer attaches a `ref` to `Form` and reads `ref.current`
- **THEN** `ref.current` is the native `HTMLFormElement` wrapper
- **AND** calling `ref.current.requestSubmit()` triggers the `onSubmit` callback

### Requirement: Form defaults to single column with labels on top
The `Form` component SHALL default `layout` to `"S1 M1 L1 XL1"` (one column on every breakpoint) and `labelSpan` to `"S12 M12 L12 XL12"` (labels on top of fields), diverging from the UI5 defaults. Both props SHALL remain overridable by the consumer.

#### Scenario: Default layout is single column with labels on top
- **WHEN** a `Form` is rendered without `layout` or `labelSpan` props
- **THEN** the form lays out its items in a single column on every breakpoint
- **AND** each item's label is positioned on top of its field

#### Scenario: Defaults are overridable
- **WHEN** a `Form` is rendered with `layout="S1 M2 L2 XL2"` and `labelSpan="S12 M4 L4 XL4"`
- **THEN** the provided values take effect instead of the Reltio defaults

### Requirement: FormGroup and FormItem remain 1:1 UI5 re-exports
The change SHALL NOT alter `FormGroup` and `FormItem`; they remain documentation-only 1:1 re-exports of the corresponding UI5 components.

#### Scenario: Grouped layout still works
- **WHEN** a `Form` contains `FormGroup` sections with `FormItem` rows
- **THEN** the grouped layout renders identically to the prior re-export behavior
