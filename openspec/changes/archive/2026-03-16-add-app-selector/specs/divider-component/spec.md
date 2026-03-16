## MODIFIED Requirements

### Requirement: Horizontal Rendering

The Divider component SHALL render as a `<div>` element with `role="separator"` to provide semantic meaning as a thematic break between content sections. When no `children` are provided, it SHALL display as a single horizontal line. When `children` are provided, it SHALL display the children with lines on either side according to the `align` prop.

#### Scenario: Default divider renders as horizontal line

- **WHEN** the Divider component is rendered without children
- **THEN** it displays a horizontal line spanning the full width of its container
- **AND** it renders as a `<div>` element with `role="separator"`

#### Scenario: Divider fills container width

- **WHEN** the Divider component is placed inside a container
- **THEN** its width is 100% of the parent container

### Requirement: Labeled Divider

The Divider component SHALL accept optional `children` to render a labeled divider. When children are provided, the component SHALL display the label text with horizontal lines positioned according to the `align` prop.

#### Scenario: Labeled divider with start alignment

- **WHEN** the Divider is rendered with `children="Section"` and `align="start"` (or default)
- **THEN** the label text "Section" appears on the left
- **AND** a horizontal line extends from after the text to the right edge

#### Scenario: Labeled divider with center alignment

- **WHEN** the Divider is rendered with `children="Section"` and `align="center"`
- **THEN** the label text "Section" appears centered
- **AND** horizontal lines extend on both sides of the text

#### Scenario: Labeled divider with end alignment

- **WHEN** the Divider is rendered with `children="Section"` and `align="end"`
- **THEN** the label text "Section" appears on the right
- **AND** a horizontal line extends from the left edge to before the text

### Requirement: Align Prop

The Divider component SHALL accept an optional `align` prop with values `"start"`, `"center"`, or `"end"`. The default value SHALL be `"start"`. This prop controls the position of the label when `children` are provided.

#### Scenario: Default alignment is start

- **WHEN** the Divider is rendered with children but no `align` prop
- **THEN** the label is positioned at the start (left) with the line on the right

### Requirement: Accessibility

The Divider component SHALL use `role="separator"` on the root `<div>` element to communicate its purpose to assistive technologies.

#### Scenario: Separator role is set

- **WHEN** the Divider component is rendered
- **THEN** it has `role="separator"` attribute
- **AND** screen readers announce it as a separator

#### Scenario: Decorative divider is hidden from screen readers

- **WHEN** the Divider component is rendered with `aria-hidden="true"`
- **THEN** screen readers skip the divider element
- **AND** it serves as purely visual decoration

### Requirement: CSS Custom Properties

The Divider component SHALL NOT use component-level CSS custom properties. Colors SHALL reference global `--reltio-color-*` tokens. Spacing and sizing SHALL use plain values.

#### Scenario: Line color uses global token

- **WHEN** the Divider component is rendered
- **THEN** the line color uses a global `--reltio-color-border-*` token
- **AND** no component-level CSS variables are defined

### Requirement: Storybook Documentation

The Divider component SHALL have Storybook stories demonstrating all variants. Each story SHALL show only ONE variant.

#### Scenario: Default story shows plain divider

- **WHEN** viewing the Default story in Storybook
- **THEN** a horizontal divider is displayed with default styling

#### Scenario: Labeled story shows divider with text

- **WHEN** viewing a Labeled story in Storybook
- **THEN** a divider with label text is displayed

#### Scenario: Alignment stories show each align option

- **WHEN** viewing alignment variant stories
- **THEN** each story demonstrates one alignment option (start, center, end)
