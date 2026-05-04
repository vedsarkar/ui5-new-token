# assistant-loader-component Specification

## Purpose

Displays a standardized loading indicator for assistant responses, providing visual and accessible feedback while the AI assistant is generating a response.

## Requirements

### Requirement: Loading GIF Indicator

The AssistantLoader component SHALL display a loading GIF animation that clearly communicates the assistant is processing a response.

#### Scenario: Loading GIF displays correctly
- **WHEN** AssistantLoader component is rendered
- **THEN** a loading GIF image is displayed from `/assistant-loader/loading.gif`
- **AND** the GIF plays continuously
- **AND** the GIF image has an empty `alt` attribute (decorative)
- **AND** the GIF image is marked `aria-hidden="true"`

#### Scenario: Dot flashing animation accompanies GIF
- **WHEN** AssistantLoader component is rendered
- **THEN** a dot-flashing CSS animation element is displayed alongside the GIF
- **AND** the dot-flashing element is marked `aria-hidden="true"` (decorative)

### Requirement: Size Customization via CSS Variable

The AssistantLoader component SHALL support size customization through the `--reltio-assistant-loader-size` CSS custom property, with a default of 32px.

#### Scenario: Default size applied
- **WHEN** AssistantLoader is rendered without style overrides
- **THEN** the component displays at the default size (32px)
- **AND** the GIF and container scale according to the default

#### Scenario: Custom size via CSS variable
- **WHEN** developer provides `style={{ "--reltio-assistant-loader-size": "48px" }}`
- **THEN** the component scales to the specified size
- **AND** all internal elements (GIF, dot-flashing) scale proportionally

### Requirement: Accessibility

The AssistantLoader component SHALL be fully accessible, ensuring the loading state is announced to screen readers and properly identified as a status indicator.

#### Scenario: Loading state announced to screen readers
- **WHEN** AssistantLoader component is rendered
- **THEN** the root element has `role="status"`
- **AND** the root element has `aria-busy="true"`
- **AND** the root element has `aria-label="thinking"` (default label)

#### Scenario: Decorative elements hidden from assistive technologies
- **WHEN** AssistantLoader component is rendered
- **THEN** the GIF image has `aria-hidden="true"`
- **AND** the dot-flashing element has `aria-hidden="true"`
- **AND** only the root element's `aria-label` conveys meaning to screen readers

### Requirement: CSS Custom Properties Customization

The AssistantLoader component SHALL define design tokens as CSS custom properties on the root element with the `--reltio-assistant-loader-` prefix, enabling external customization.

#### Scenario: All CSS variables defined on root
- **WHEN** AssistantLoader component is rendered
- **THEN** CSS custom properties are defined on `.root` class
- **AND** variables use `--reltio-assistant-loader-` prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** AssistantLoader applies custom values
- **AND** maintains all other styling and behavior

### Requirement: className Utility Usage

The AssistantLoader component SHALL use the `classNames` utility from `utils/classNames.ts` for all className composition.

#### Scenario: classNames utility composes CSS modules
- **WHEN** AssistantLoader component is rendered
- **THEN** `classNames` utility combines root CSS module class with any custom className
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are appended to the root element
- **AND** CSS module classes are preserved

### Requirement: Props Passthrough

The AssistantLoader component SHALL accept and pass through standard div HTML attributes (excluding `children`, `className`, and `style` which are handled explicitly) to the root element.

#### Scenario: Additional HTML attributes passed through
- **WHEN** developer provides additional HTML attributes (e.g., `id`, `data-testid`)
- **THEN** attributes are spread onto the root `<div>` element
- **AND** component-specific attributes (`aria-busy`, `aria-label`, `role`) are preserved

### Requirement: TypeScript Type Safety

The AssistantLoader component SHALL be fully typed with TypeScript in strict mode, with all types defined in a separate `AssistantLoader.types.ts` file using the `type` keyword.

#### Scenario: Component props fully typed
- **WHEN** developer uses AssistantLoader component
- **THEN** all props have proper TypeScript types
- **AND** `className` is typed as optional string
- **AND** `style` is typed as `React.CSSProperties & { "--reltio-assistant-loader-size"?: string }`
- **AND** additional div attributes are typed via `Omit<React.ComponentPropsWithoutRef<"div">, "children" | "className" | "style">`

#### Scenario: Types exported alongside component
- **WHEN** developer imports AssistantLoader
- **THEN** `AssistantLoaderProps` type can be imported from the same entry
- **AND** types are in `AssistantLoader.types.ts`

### Requirement: Storybook Documentation

The AssistantLoader component SHALL have Storybook stories demonstrating the loading indicator, with each story showing only ONE variant.

#### Scenario: Default story
- **WHEN** viewing Storybook
- **THEN** a story exists showing the default AssistantLoader
- **AND** the GIF animation and dot-flashing are clearly visible
- **AND** the story uses "autodocs" tag for auto-documentation
