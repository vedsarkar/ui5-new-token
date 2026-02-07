## ADDED Requirements

### Requirement: Single Markdown Rendering Solution

The design system SHALL use only one markdown rendering solution and expose only one public component for rendering markdown-formatted content and content that includes React components. That component SHALL support all tag-to-component overrides (headings, lists, code, links, tables, details→MarkdownDetails, etc.) and rendering with React components. It SHALL accept an optional components prop to extend or restrict which React components can be used when rendering content. No other markdown rendering library and no separate second renderer component SHALL be used.

#### Scenario: One component for all content
- **WHEN** a consumer needs to render markdown or content with React components
- **THEN** only one public component is available for that purpose
- **AND** that component supports all tag-to-component overrides and rendering with React components
- **AND** the component accepts content and an optional components prop

#### Scenario: No separate MDX or Markdown-only component
- **WHEN** the design system is used
- **THEN** there is no separate MDXRenderer or second markdown renderer component
- **AND** the unified component provides the combined behavior previously offered by separate components

### Requirement: Rendering with React Components

The unified markdown renderer component SHALL support rendering content that includes embedded React components. It SHALL accept an optional components prop that extends or restricts which React components can be used when rendering content. Default allowed components MAY include design system components (e.g. Button).

#### Scenario: React components in content render correctly
- **WHEN** content contains embedded React components
- **THEN** React components are rendered and functional
- **AND** component props are passed correctly
- **AND** components can be nested within Markdown structure

#### Scenario: Optional components prop
- **WHEN** the developer provides the optional components prop
- **THEN** the custom component set is used when rendering content
- **AND** the default set is extended or replaced as specified
- **AND** configuration is type-safe
