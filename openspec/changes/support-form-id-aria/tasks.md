## 1. Types

- [x] 1.1 Update `components/Form/Form.types.ts`: extend `FormProps` with optional `id` and React `AriaAttributes` (or equivalent pick from native form props). Document in JSDoc that these apply to the outer native `<form>`, not the UI5 Form.

## 2. Implementation

- [x] 2.1 Update `components/Form/Form.tsx`: partition `id` and `aria-*` onto the outer `<form>`; keep UI5 props on `<Ui5Form>`. Prefer stripping all `aria-*` keys from the rest object so they never reach Ui5Form.
- [x] 2.2 Optionally apply consumer `className` to the outer `<form>` via `classNames(styles.root, className)` if it currently leaks into `...rest`.

## 3. Stories & docs

- [x] 3.1 Add one Storybook story (e.g. `WithAriaLabel`) demonstrating `id` plus `aria-label` or `aria-labelledby` on `Form`.
- [x] 3.2 Update `components/Form/README.md` to document that `id` / `aria-*` land on the native `<form>`, distinct from UI5 accessibility props (`accessibleMode`, `headerText`).
- [x] 3.3 Confirm `.changeset/support-form-id-aria.md` exists and accurately describes the additive minor change (create or adjust if missing).

## 4. Validation

- [x] 4.1 Run `npm run format` and `npm run lint`.
- [x] 4.2 Spot-check in Storybook that the new story’s DOM has `id` / ARIA on `<form>` and that existing Form stories still work.
- [x] 4.3 Run `npx openspec validate support-form-id-aria --strict`.
