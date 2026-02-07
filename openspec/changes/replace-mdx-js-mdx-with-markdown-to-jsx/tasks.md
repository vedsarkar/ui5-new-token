# Tasks: Replace @mdx-js/mdx with markdown-to-jsx

## 1. Analysis

- [x] 1.1 Document all components and call sites that use @mdx-js/mdx (e.g. MDXRenderer compilation path, imports, options).
- [x] 1.2 Document all components and call sites that use markdown-to-jsx (e.g. MarkdownRenderer, createBaseMarkdownComponents, overrides shape).
- [x] 1.3 List the set of tag-to-component overrides and React components currently used for rendering (from both paths) so the unified component can support them.
- [x] 1.4 Identify all imports and exports of MarkdownRenderer and MDXRenderer so they can be updated to the single remaining component.

## 2. Implementation

- [x] 2.1 Implement the unified rendering path: single implementation that accepts content and optional components prop, and renders with the full set of overrides (headings, lists, code, blockquote, links, tables, details→MarkdownDetails, etc.) and supports rendering with React components.
- [x] 2.2 Ensure the unified component supports all expected React components for rendering (same tag-to-class and tag-to-component mappings as today) and exposes the optional components prop where applicable.
- [x] 2.3 Remove or replace existing components so only one remains: either retain MarkdownRenderer as the unified component (extend with components prop) and remove MDXRenderer, or replace both with one component; remove the other component folder and all its files.
- [x] 2.4 Update MarkdownComponents / createBaseMarkdownComponents so they are the single source of overrides for the unified implementation; remove any usage tied to the removed component(s).
- [x] 2.5 Remove @mdx-js/mdx and dependencies used only by it from package.json; run install and fix any broken imports or references.
- [x] 2.6 Update package and root exports so only the unified component is exported (remove MDXRenderer from exports if removed); update all internal and external imports to use the unified component.

## 3. Specs, types, and stories

- [x] 3.1 Apply spec deltas: markdown-renderer-component (unified single component), mdx-renderer-component (removed; behavior in unified component).
- [x] 3.2 Update types to match the unified component (single component props including optional components); remove or archive types for the removed component(s).
- [x] 3.3 Consolidate Storybook stories into the unified component; remove stories for the removed component(s).

## 4. Validation

- [x] 4.1 Run Storybook for the unified component; confirm all variants (Markdown, React components, error handling, customization) render correctly and no regressions.
<!-- - [ ] 4.2 Run `npm run lint` and `npm run format`; fix any issues. -->
- [x] 4.3 Run `npx openspec validate replace-mdx-js-mdx-with-markdown-to-jsx --strict` and resolve any validation failures.
