## 1. Types

- [ ] 1.1 Add `appSelector?: ReactElement` to `ShellBarProps` in `components/ShellBar/ShellBar.types.ts`, with JSDoc explaining it is the canonical Reltio app-navigator slot and pointing to `<AppSelector>` as the recommended fill.

## 2. Implementation

- [ ] 2.1 In `components/ShellBar/ShellBar.tsx`, extract `appSelector` from props alongside the existing `logo`, `className`, `...rest`.
- [ ] 2.2 Merge the `appSelector` element with any explicit `children` and pass the resulting children array to the underlying UI5 `ShellBar`. Render `appSelector` AFTER explicit children.
- [ ] 2.3 Confirm that when `appSelector` is omitted, the children passed to the underlying UI5 ShellBar are untouched (no empty fragments, no `null` placeholders that UI5 might mis-handle as slot children).

## 3. Documentation

- [ ] 3.1 Update `components/ShellBar/README.md` with a new `### App selector slot` section: when to use the slot prop vs raw children, the precedence rule (slot renders last), and a note that passing both `<AppSelector>` in children AND in the slot prop is discouraged.
- [ ] 3.2 Add a `WithAppSelector` story to `components/ShellBar/ShellBar.stories.tsx` using the existing `AppSelector` demo apps payload.

## 4. Build and verify

- [ ] 4.1 Run `npm run build-component-docs` to regenerate `ShellBar.story.mdx` and `ShellBar.schema.json` with the new prop.
- [ ] 4.2 Run `npm run format && npm run lint` — both must pass with no errors.
- [ ] 4.3 Visually verify in Storybook (`npm run dev`): the new story renders, the app-selector grid icon appears in the right cluster, clicking it opens the ProductSwitch popover.

## 5. Release

- [ ] 5.1 Add a changeset under `.changeset/` (minor bump of `@reltio/design`) noting the new `appSelector` slot prop and the recommended migration from `children` to the slot prop.
