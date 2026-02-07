# mdx-renderer-component Specification

## Purpose
TBD - created by archiving change add-mdx-renderer. Update Purpose after archive.
## Requirements
### Requirement: Capability Retired

The MDXRenderer capability SHALL be considered retired. The component has been removed in favor of the unified markdown-renderer-component, which provides all Markdown features, raw HTML, and React component rendering. New and existing usage SHALL use the markdown-renderer-component.

#### Scenario: No standalone MDXRenderer
- **WHEN** documentation or code references an MDXRenderer component
- **THEN** the reference is historical or migrated
- **AND** the markdown-renderer-component is the single supported implementation for Markdown and React component content

