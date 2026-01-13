# Tasks: Add Icon Library

## 1. Infrastructure Setup

- [ ] 1.1 Create `public/icons/` folder structure for source SVG files
- [ ] 1.2 Create `icons/` folder structure for generated React components
- [ ] 1.3 Add sample SVG icons for testing (e.g., chevron, close, search, info, warning, error)

## 2. Icon Generation Script

- [ ] 2.1 Create `scripts/generate-icons.mjs` script to convert SVGs to React components
- [ ] 2.2 Implement SVG parsing and React component generation logic
- [ ] 2.3 Generate TypeScript types for each icon component
- [ ] 2.4 Generate index.ts barrel file for icon exports
- [ ] 2.5 Add `generate-icons` npm script to package.json
- [ ] 2.6 Document script usage in README or script header

## 3. Icon Component Architecture

- [ ] 3.1 Create `icons/Icon.types.ts` with shared icon prop types (size, color, className, etc.)
- [ ] 3.2 Create `icons/Icon.module.css` with base icon styles and CSS custom properties
- [ ] 3.3 Implement icon component template with size/color support in generator script
- [ ] 3.4 Ensure generated components use classNames utility
- [ ] 3.5 Ensure all CSS custom properties follow `--reltio-icon-` prefix convention

## 4. Package Exports

- [ ] 4.1 Configure package.json exports for `@reltio/design/icons/*` pattern
- [ ] 4.2 Verify icons are accessible via direct public URL (`/icons/icon-name.svg`)
- [ ] 4.3 Verify icons are importable as React components

## 5. Storybook Icon Library Page

- [ ] 5.1 Create `icons/IconLibrary.story.mdx` documentation page
- [ ] 5.2 Implement icon grid display with all available icons
- [ ] 5.3 Add search/filter functionality by icon name
- [ ] 5.4 Add "Copy URL" button for each icon (copies public SVG URL)
- [ ] 5.5 Add "Copy Import" button for each icon (copies React import statement)
- [ ] 5.6 Make each icon a link to its individual Storybook story

## 6. Individual Icon Stories

- [ ] 6.1 Create story template in generator script for each icon
- [ ] 6.2 Generate stories with size variations (small, medium, large)
- [ ] 6.3 Generate stories with color variations (inherited, primary, custom)
- [ ] 6.4 Ensure each story shows ONE variant (per project conventions)

## 7. Validation and Testing

- [ ] 7.1 Run `npm run format` and fix any formatting issues
- [ ] 7.2 Run `npm run lint` and fix any linting errors
- [ ] 7.3 Verify icon generation script works correctly
- [ ] 7.4 Verify Storybook displays Icon Library page correctly
- [ ] 7.5 Verify search functionality works
- [ ] 7.6 Verify copy URL/import functionality works
- [ ] 7.7 Test icon components for accessibility (a11y addon)

## 8. Documentation

- [ ] 8.1 Add icon contribution guidelines to AGENTS.md or README
- [ ] 8.2 Document icon naming conventions
- [ ] 8.3 Document how to add new icons (upload SVG → run script)
