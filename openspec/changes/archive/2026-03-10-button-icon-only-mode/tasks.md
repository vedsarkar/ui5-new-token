## 1. CSS Styles

- [x] 1.1 Add `.iconOnly` class to `Button.module.css` with `aspect-ratio: 1` and `padding: 0`

## 2. Component Logic

- [x] 2.1 Add icon-only detection logic to `Button.tsx` (`React.Children.count`, `isValidElement`, `typeof type !== "string"`)
- [x] 2.2 Include `styles.iconOnly` in `classNames` composition when icon-only mode is detected

## 3. Storybook Stories

- [x] 3.1 Add `IconOnly` story (filled + inherited) to `Button.stories.tsx`
- [x] 3.2 Add `IconOnlyFilledPrimary` story
- [x] 3.3 Add `IconOnlyOutlinedPrimary` story
- [x] 3.4 Add `IconOnlyTextPrimary` story
- [x] 3.5 Add `IconOnlyDisabled` story

## 4. Specs Sync

- [x] 4.1 Verify implementation matches spec scenarios (icon-only detection, circular layout, variant preservation)

## 5. Quality

- [x] 5.1 Run `npm run format` and `npm run lint`
