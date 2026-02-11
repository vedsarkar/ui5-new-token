## 1. Component Structure

- [ ] 1.1 Create `components/Chip/` directory
- [ ] 1.2 Create `Chip.types.ts` with type definitions
- [ ] 1.3 Create `Chip.tsx` with component implementation
- [ ] 1.4 Create `Chip.module.css` with CSS variables on `.root`
- [ ] 1.5 Create `Chip.stories.tsx` with one story per variant
- [ ] 1.6 Create `index.ts` with public exports

## 2. Core Implementation

- [ ] 2.1 Implement Chip with label and optional close button
- [ ] 2.2 Use `classNames()` utility for all className attributes
- [ ] 2.3 Support `onRemove` callback for close button
- [ ] 2.4 Support `disabled` state
- [ ] 2.5 Use `Close` icon from icon library

## 3. Styling

- [ ] 3.1 Define all CSS variables on `.root` with `--reltio-chip-` prefix
- [ ] 3.2 Include fallback values for all CSS variables
- [ ] 3.3 Internal elements reference only CSS variables
- [ ] 3.4 Support focus-visible state for accessibility

## 4. Documentation

- [ ] 4.1 Create Default story
- [ ] 4.2 Create Removable story (with onRemove)
- [ ] 4.3 Create Disabled story
- [ ] 4.4 Create CustomStyled story (CSS variable overrides)

## 5. Verification

- [ ] 5.1 Run `npm run format`
- [ ] 5.2 Run `npm run lint` — must pass
