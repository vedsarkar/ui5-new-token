## 1. Implementation

- [x] 1.1 Add `searchField?: ReactElement` to `ShellBarProps` and drop it from the `Omit` list
- [x] 1.2 Forward the slot and derive `showSearchField` in `ShellBar.tsx`
- [x] 1.3 Document the slot in the component's type JSDoc

## 2. Verification

- [x] 2.1 Render a shell bar with a search field and confirm it appears expanded
- [x] 2.2 `npm run lint` and the Storybook suite pass
- [x] 2.3 Changeset (`minor` — additive prop)
