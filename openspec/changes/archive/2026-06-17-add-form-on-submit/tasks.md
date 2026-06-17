## 1. Types

- [x] 1.1 Update `components/Form/Form.types.ts`: define `FormProps` as the wrapper prop type — `ComponentPropsWithoutRef<typeof Ui5Form>` plus `onSubmit?: (data: FormData, event: React.FormEvent<HTMLFormElement>) => void`, and `ref?: React.Ref<HTMLFormElement>`. Use `Omit` to drop the native `<form>`/UI5 `onSubmit` collision. Keep `FormGroupProps`/`FormItemProps` as the existing 1:1 re-exports with their JSDoc.

## 2. Implementation

- [x] 2.1 Create `components/Form/Form.tsx`: thin wrapper rendering `<form>` around the UI5 `Form`. On submit, call `event.preventDefault()`, build `new FormData(event.currentTarget)`, invoke `onSubmit?.(data, event)`. Spread `...rest` onto the inner UI5 `Form`; forward `ref` to the native `<form>`; one-line action-oriented JSDoc above the export.
- [x] 2.2 Decide and apply the wrapper element styling: native `<form>` with no layout box (e.g. `display: contents`) so the existing Form layout/DOM expectations are preserved. Add `Form.module.css` only if needed; use `classNames()` and forward `className` to the `<form>`.
- [x] 2.3 Create/confirm `components/Form/index.ts` exporting `Form` (wrapper) and re-exporting `FormGroup`/`FormItem` + their types.
- [x] 2.4 Update `components/index.ts` so `Form` resolves to the new wrapper while `FormGroup`/`FormItem` stay 1:1 re-exports.

## 3. Stories & docs

- [x] 3.1 Add a `WithSubmit` story to `components/Form/Form.stories.tsx` demonstrating `name` on each field, a `Button type="Submit"`, and an `onSubmit` (via `fn()`) that reads `FormData`. Keep existing layout stories.
- [x] 3.2 Update `components/Form/README.md`: document the curated divergence from UI5 (Form is now a wrapper), the `onSubmit`/`FormData` pattern, the `name`-per-field requirement, "don't nest in another `<form>`", and the non-goals (no validation/state/async).
- [x] 3.3 Run `npm run build-component-docs` to regenerate `Form.story.mdx` + `Form.schema.json`; verify the `## Props` block includes `onSubmit`.

## 4. Validation

- [x] 4.1 `npm run format && npm run lint` clean.
- [x] 4.2 Verify in `npm run dev` (or via Reltio Design MCP `preview-stories`) that the submit story serializes named fields and that layout-only stories are visually unchanged in both themes.
- [x] 4.3 Add a changeset (`minor`) describing the new `onSubmit` prop and the divergence from the UI5 re-export.
- [x] 4.4 `npx --yes openspec validate add-form-on-submit --strict` passes.
