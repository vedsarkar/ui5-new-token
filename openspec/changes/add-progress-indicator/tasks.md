## 1. Types

- [x] 1.1 Create `components/ProgressIndicator/ProgressIndicator.types.ts` with `ProgressIndicatorProps = HtmlProps<"div", { value?, valueState?, displayValue?, hideValue? }>`

## 2. Styles

- [x] 2.1 Create `components/ProgressIndicator/ProgressIndicator.module.css` with Horizon "pill on rail" layout: track (6px, `--sapProgress_Background`), bar (10px, `--sapProgress_Value_Background`), side dots (4x4px), value text above bar, state icon right of track. Five value state classes with corresponding `--sapProgress_*` token pairs.
- [x] 2.2 Run `npm run build-css` to generate `.module.css.ts` declarations

## 3. Component

- [x] 3.1 Create `components/ProgressIndicator/ProgressIndicator.tsx` implementing: value clamping (0-100), value state mapping via `getValueStateConfig`, text positioning (above bar when >50%, in remaining area when <=50%), proportional animated transitions (`|prev-next| * 20ms`), state icons, ARIA attributes (`role="progressbar"`, `aria-valuenow`, `aria-valuetext`)

## 4. Stories

- [x] 4.1 Create `components/ProgressIndicator/ProgressIndicator.stories.tsx` with stories: Default (50%), Empty (0%), Full (100%), ValueStateError, ValueStateWarning, ValueStateSuccess, ValueStateInformation, CustomDisplayValue, HiddenValue

## 5. Exports

- [x] 5.1 Create `components/ProgressIndicator/index.ts` exporting component and types
- [x] 5.2 Add ProgressIndicator to `components/index.ts` barrel export

## 6. Validation

- [x] 6.1 Run `npm run format && npm run lint` and fix any issues
- [ ] 6.2 Verify in Storybook (`npm run dev`) that all stories render correctly — **deferred to user**
- [x] 6.3 Run `openspec validate add-progress-indicator --strict` and resolve any issues
