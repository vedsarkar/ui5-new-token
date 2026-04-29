# banner-component Specification

## Purpose

SAP Fiori MessageStrip — an inline notification banner with 4 semantic design variants, default icons, optional dismissibility, and custom icon support.

SAP equivalent: `ui5-message-strip`. Reference: https://experience.sap.com/fiori-design-web/message-strip/

## Requirements

### Requirement: Design Variants

The Banner SHALL support a `design` prop with 4 semantic variants: `"information"` | `"positive"` | `"critical"` | `"negative"`. Default: `"information"`.

#### Scenario: Information design
- **WHEN** `design` is `"information"` or not provided
- **THEN** uses `--sapInformationBackground`, `--sapInformationBorderColor`
- **AND** icon and title use `--sapInformativeColor`
- **AND** default icon: Info

#### Scenario: Positive design
- **WHEN** `design` is `"positive"`
- **THEN** uses `--sapSuccessBackground`, `--sapSuccessBorderColor`
- **AND** icon and title use `--sapPositiveElementColor`
- **AND** default icon: CheckCircle

#### Scenario: Critical design
- **WHEN** `design` is `"critical"`
- **THEN** uses `--sapWarningBackground`, `--sapWarningBorderColor`
- **AND** icon and title use `--sapCriticalElementColor`
- **AND** default icon: Warning

#### Scenario: Negative design
- **WHEN** `design` is `"negative"`
- **THEN** uses `--sapErrorBackground`, `--sapErrorBorderColor`
- **AND** icon and title use `--sapNegativeElementColor`
- **AND** default icon: ErrorCircle

### Requirement: Content

The Banner SHALL support `title` (heading text) and `children` (description content).

#### Scenario: Title and description
- **WHEN** both `title` and `children` are provided
- **THEN** title renders at 14px / 600 weight in the design's semantic color
- **AND** description renders at 14px / 400 weight in `--sapTextColor`

### Requirement: Icon

The Banner SHALL show a default icon per design variant. The `icon` prop can override or hide the icon.

#### Scenario: Custom icon
- **WHEN** `icon` is a ReactNode
- **THEN** the custom icon renders instead of the default

#### Scenario: Hidden icon
- **WHEN** `icon` is `null`
- **THEN** no icon is rendered

### Requirement: Dismissibility

#### Scenario: Dismissible banner
- **WHEN** `dismissible` is `true`
- **THEN** a close button renders in the top-right area
- **AND** clicking it calls `onDismiss`
- **AND** close button has `aria-label="Dismiss"`

### Requirement: Accessibility

#### Scenario: Alert role
- **WHEN** the banner renders
- **THEN** the root element has `role="alert"`

### Requirement: TypeScript Types

Props SHALL be defined as `BannerProps = HtmlProps<"div", { title, children, design, dismissible, onDismiss, icon }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapElement_BorderCornerRadius`, `--sapTextColor`, `--sapContent_LabelColor`, `--sapContent_FocusColor`, `--sapInformationBackground`, `--sapInformationBorderColor`, `--sapInformativeColor`, `--sapSuccessBackground`, `--sapSuccessBorderColor`, `--sapPositiveElementColor`, `--sapWarningBackground`, `--sapWarningBorderColor`, `--sapCriticalElementColor`, `--sapErrorBackground`, `--sapErrorBorderColor`, `--sapNegativeElementColor`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Information, Positive, Critical, Negative
- Dismissible
- CustomIcon, NoIcon
