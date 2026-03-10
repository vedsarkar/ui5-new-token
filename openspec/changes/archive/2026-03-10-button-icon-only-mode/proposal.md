## Why

The Button component currently renders all children uniformly — there is no built-in support for icon-only buttons. Designs require circular icon-only buttons (same variants, colors, sizes) without introducing a separate IconButton component. The Button should automatically detect when it contains a single icon element and switch to a circular layout.

## What Changes

- Button component gains automatic icon-only detection: when `children` is a single React component (not a native HTML element or string), Button applies an `iconOnly` CSS class
- In icon-only mode the button renders as a circle (same diameter as the regular button height for the given size) with centered content and no horizontal padding
- No new props — the behavior is derived from children composition
- No API breaking changes — existing usage is unaffected

## Capabilities

### New Capabilities

- `button-icon-only`: Automatic icon-only mode detection and circular rendering for the Button component

### Modified Capabilities

- `button-component`: Adding icon-only mode CSS class to the component, extending className composition logic

## Impact

- `components/Button/Button.tsx` — add children inspection logic and `iconOnly` class
- `components/Button/Button.module.css` — add `.iconOnly` styles (aspect-ratio, padding reset)
- `components/Button/Button.stories.tsx` — add icon-only stories for each variant/color
- `openspec/specs/button-component/spec.md` — extend with icon-only requirements
