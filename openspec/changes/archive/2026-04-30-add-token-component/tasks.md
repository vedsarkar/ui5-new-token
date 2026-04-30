## 1. Remove Chip

- [x] 1.1 Delete `components/Chip/` directory entirely (Chip.tsx, Chip.types.ts, Chip.module.css, Chip.stories.tsx, index.ts)
- [x] 1.2 Remove `export * from "./Chip"` from `components/index.ts`
- [x] 1.3 Delete `openspec/specs/chip-component/` directory

## 2. Types

- [x] 2.1 Create `components/Token/Token.types.ts` with `TokenProps = HtmlProps<"div", { text, selected?, readOnly?, disabled?, onSelect?, onDelete? }>`

## 3. Styles

- [x] 3.1 Create `components/Token/Token.module.css` — root (26px height, 6px radius, `--sapButton_TokenBackground`, `--sapButton_TokenBorderColor`), selected state (`--sapButton_Selected_*`, `--sapFontSemiboldDuplexFamily`), readonly state (`--sapField_ReadOnly_BorderColor`, `--sapContent_LabelColor`), hover states, disabled (0.4 opacity), close icon (12px), focus ring (`--sapContent_FocusColor`)
- [x] 3.2 Run `npm run build-css` to generate `.module.css.ts` declarations

## 4. Component

- [x] 4.1 Create `components/Token/Token.tsx` implementing: text display, selected/readOnly/disabled states, close icon (hidden when readOnly), `onSelect` on click/Space, `onDelete` on close icon click and Delete/Backspace keys, `role="option"`, `aria-selected`, focus ring

## 5. Stories

- [x] 5.1 Create `components/Token/Token.stories.tsx` with stories: Default, Selected, ReadOnly, ReadOnlySelected, WithDeleteButton, Disabled

## 6. Exports

- [x] 6.1 Create `components/Token/index.ts` exporting component and types
- [x] 6.2 Add `export * from "./Token"` to `components/index.ts` (replacing Chip export)

## 7. Spec

- [x] 7.1 Create `openspec/specs/token-component/spec.md` as the new base spec (copy from change delta spec, convert ADDED headers to plain Requirements)

## 8. Validation

- [x] 8.1 Run `npm run format && npm run lint` and fix any issues
- [ ] 8.2 Verify in Storybook (`npm run dev`) that all Token stories render correctly — **deferred to user** Verify in Storybook (`npm run dev`) that all Token stories render correctly
- [x] 8.3 Run `openspec validate add-token-component --strict` and resolve any issues
