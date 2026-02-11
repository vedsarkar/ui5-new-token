## 1. Component Structure

- [x] 1.1 Create `components/Chip/` directory
- [x] 1.2 Create `Chip.types.ts` with type definitions
- [x] 1.3 Create `Chip.tsx` with component implementation
- [x] 1.4 Create `Chip.module.css` with CSS variables on `.root`
- [x] 1.5 Create `Chip.stories.tsx` with one story per variant
- [x] 1.6 Create `index.ts` with public exports

## 2. Core Implementation

- [x] 2.1 Implement Chip with label and optional close button
- [x] 2.2 Use `classNames()` utility for all className attributes
- [x] 2.3 Support `onRemove` callback for close button
- [x] 2.4 Support `disabled` state
- [x] 2.5 Use `Close` icon from icon library

## 3. Styling

- [x] 3.1 Define all CSS variables on `.root` with `--reltio-chip-` prefix
- [x] 3.2 Include fallback values for all CSS variables
- [x] 3.3 Internal elements reference only CSS variables
- [x] 3.4 Support focus-visible state for accessibility

## 4. Documentation

- [x] 4.1 Create Default story
- [x] 4.2 Create Removable story (with onRemove)
- [x] 4.3 Create Disabled story
- [x] 4.4 Create CustomStyled story (CSS variable overrides)

## 5. Verification

- [x] 5.1 Run `npm run format`
- [x] 5.2 Run `npm run lint` — Chip files pass clean
