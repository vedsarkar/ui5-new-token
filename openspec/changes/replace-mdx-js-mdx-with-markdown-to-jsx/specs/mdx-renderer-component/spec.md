## REMOVED Requirements

### Requirement: MDX Rendering

**Reason:** The MDXRenderer component is removed. A single unified component (see markdown-renderer-component) replaces both MarkdownRenderer and MDXRenderer and provides all Markdown features, raw HTML rendering, and rendering with React components.

**Migration:** Use the unified component for all content. It supports the same Markdown and React component behavior; use its optional components prop where the former components prop was used.

### Requirement: Security and Sanitization

**Reason:** The MDXRenderer component is removed. The unified component (markdown-renderer-component) specifies sanitization behavior for all rendered content.

**Migration:** No change; the unified component sanitizes content the same way.

### Requirement: Component Security

**Reason:** The MDXRenderer component is removed. The unified component (markdown-renderer-component) provides an optional components prop to restrict or extend which React components can be used.

**Migration:** Use the unified component’s optional components prop for the same behavior.

### Requirement: Error Handling

**Reason:** The MDXRenderer component is removed. The unified component (markdown-renderer-component) specifies error handling for all rendered content.

**Migration:** No change; the unified component handles errors the same way.

### Requirement: CSS Custom Properties Customization

**Reason:** The MDXRenderer component is removed. The unified component (markdown-renderer-component) defines CSS custom properties for customization.

**Migration:** Use the unified component’s style and className props for customization.

### Requirement: className Utility Usage

**Reason:** The MDXRenderer component is removed. The unified component follows the same classNames utility usage.

**Migration:** No change when using the unified component.

### Requirement: TypeScript Type Safety

**Reason:** The MDXRenderer component is removed. The unified component (markdown-renderer-component) is fully typed.

**Migration:** Use the unified component’s exported types.

### Requirement: Storybook Documentation

**Reason:** The MDXRenderer component is removed. The unified component has consolidated Storybook documentation.

**Migration:** Use the unified component’s stories in Storybook.
