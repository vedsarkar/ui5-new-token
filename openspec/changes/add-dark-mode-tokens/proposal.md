## Why

Components hardcode ~25 unique color values across 13 CSS files with no centralized token system, making theming impossible. The Storybook dark mode toggle (`data-theme="dark"`) is already configured but has no component-level overrides, so switching themes does nothing. Extracting tokens and adding dark overrides unblocks dark mode for all consumers of the design system.

## What Changes

- Define all shared color tokens as `:root` CSS custom properties in `public/variables.css`, organized by semantic role (text, surface, border, primary, error, secondary)
- Add a `[data-theme="dark"]` block with dark mode overrides for every token
- Replace all hardcoded hex/rgb values in 13 component `.module.css` files with references to global tokens
- Consolidate inconsistent duplicates (e.g. `#0e0e25` / `#1a1a1a` / `#1d1b20` all representing dark text)

## Capabilities

### New Capabilities
- `color-tokens`: Centralized color token system in `public/variables.css` with `:root` light defaults and `[data-theme="dark"]` overrides, covering text, surface, border, primary, error, and secondary semantic categories

### Modified Capabilities
- `button-component`: CSS updated to use global color tokens; renders correctly in both themes
- `assistant-loader-component`: CSS updated to use global color tokens; renders correctly in both themes
- `chat-component`: CSS updated to use global color tokens; renders correctly in both themes
- `details-component`: CSS updated to use global color tokens; renders correctly in both themes
- `error-message-component`: CSS updated to use global color tokens; renders correctly in both themes
- `markdown-renderer-component`: CSS updated to use global color tokens; renders correctly in both themes
- `skeleton-component`: CSS updated to use global color tokens; renders correctly in both themes
- `textarea-component`: CSS updated to use global color tokens; renders correctly in both themes
- `treelist-component`: CSS updated to use global color tokens; renders correctly in both themes

## Impact

- **CSS files**: 13 component `.module.css` files + `public/variables.css`
- **No API/prop changes**: Component TypeScript interfaces are unchanged
- **Storybook**: Existing `data-theme` toggle will start working for all components
- **Chromatic**: New dark theme snapshots needed for visual regression coverage
- **Consumers**: Apps importing `public/variables.css` gain theming for free; no migration needed since existing `--reltio-{component}-` fallback values continue to work
