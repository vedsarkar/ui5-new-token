## ADDED Requirements

### Requirement: Form applies id and ARIA attributes to the native form element
The `Form` component SHALL accept an optional `id` and ARIA attributes (`aria-label`, `aria-labelledby`, `aria-describedby`, and other `aria-*` attributes) and SHALL apply them to the outer native `<form>` element. Those attributes SHALL NOT be forwarded to the inner UI5 Form as a substitute for naming the native form. UI5 Form props (including UI5 accessibility props such as `accessibleMode` and `headerText`) SHALL continue to be forwarded only to the inner UI5 Form.

#### Scenario: id and aria-label land on the native form
- **WHEN** a `Form` is rendered with `id="contact-form"` and `aria-label="Contact details"`
- **THEN** the outer native `<form>` element has `id="contact-form"` and `aria-label="Contact details"`
- **AND** the inner UI5 Form does not receive those props as HTML attributes meant for the native form wrapper

#### Scenario: aria-labelledby associates an external heading
- **WHEN** a `Form` is rendered with `id="contact-form"` and `aria-labelledby` referencing an external heading id
- **THEN** the outer native `<form>` element exposes that `aria-labelledby` value
- **AND** submitting the form and forwarding UI5 layout props continue to behave as today

#### Scenario: UI5 props remain on the inner Form
- **WHEN** a `Form` is rendered with UI5 props such as `layout`, `labelSpan`, `headerText`, and `accessibleMode` together with `id` and an ARIA attribute
- **THEN** the UI5 props are applied to the inner UI5 Form
- **AND** `id` and the ARIA attribute are applied only to the outer native `<form>`
