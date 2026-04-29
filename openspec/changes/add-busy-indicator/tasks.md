## 1. Types

- [x] 1.1 Create `components/BusyIndicator/BusyIndicator.types.ts` with `BusyIndicatorSize = "S" | "M" | "L"` and `BusyIndicatorProps = HtmlProps<"div", { active?, delay?, size?, text?, children? }>`

## 2. Styles

- [x] 2.1 Create `components/BusyIndicator/BusyIndicator.module.css` with root, dot, text, overlay, size variant, and animation classes — using `--sapContent_BusyColor`, `--sapContent_DisabledOpacity`, `--sapContent_FocusColor`, `--sapContent_LabelColor` tokens
- [x] 2.2 Define `@keyframes grow` animation: `scale(0.5)` → `scale(1)` → `scale(0.5)` with `1.6s cubic-bezier(0.32, 0.06, 0.85, 1.11) infinite` and 200ms stagger between dots
- [x] 2.3 Run `npm run build-css` to generate `.module.css.ts` declarations

## 3. Component

- [x] 3.1 Create `components/BusyIndicator/BusyIndicator.tsx` implementing: delay timer via `useState`/`useEffect`, three animated dots, optional text label, overlay mode with dimmed children, ARIA attributes (`role="progressbar"`, `aria-valuetext="Busy"`, `title="Please wait"`)

## 4. Stories

- [x] 4.1 Create `components/BusyIndicator/BusyIndicator.stories.tsx` with stories: Default, SizeSmall, SizeLarge, WithText, OverlayMode, WithDelay, Inactive

## 5. Exports

- [x] 5.1 Create `components/BusyIndicator/index.ts` exporting component and types
- [x] 5.2 Add BusyIndicator to `components/index.ts` barrel export

## 6. Validation

- [x] 6.1 Run `npm run format && npm run lint` and fix any issues
- [ ] 6.2 Verify in Storybook (`npm run dev`) that all stories render correctly — **deferred to user** (requires interactive browser)
- [x] 6.3 Run `openspec validate add-busy-indicator --strict` and resolve any issues
