## 1. Types

- [x] 1.1 Create `Dialog.types.ts` with `DialogProps` using `HtmlProps<"dialog">`, custom props: `open`, `onClose`, `header`, `footer`

## 2. Component

- [x] 2.1 Create `Dialog.tsx` with native `<dialog>` element, `useEffect` bridge for `open` → `showModal()`/`close()` with redundancy guards
- [x] 2.2 Render header slot (conditional `<div>` with border-bottom) and footer slot (conditional `<div>` with border-top)
- [x] 2.3 Wire native `onClose` event to the `onClose` prop callback
- [x] 2.4 Set `closedby="any"` on the `<dialog>` element
- [x] 2.5 Spread rest props and compose `className` via `classNames()`

## 3. Styles

- [x] 3.1 Create `Dialog.module.css` — dialog root: background, border-radius, padding, max-width/max-height, global color tokens
- [x] 3.2 Style `::backdrop` with semi-transparent overlay using global tokens
- [x] 3.3 Style header container (padding, border-bottom separator)
- [x] 3.4 Style footer container (padding, border-top separator)
- [x] 3.5 Style body area with overflow-y scroll and flex layout to keep header/footer fixed
- [x] 3.6 Add open/close CSS transitions using `@starting-style` + `allow-discrete` with graceful degradation

## 4. Public API

- [x] 4.1 Create `index.ts` exporting `Dialog` component and `DialogProps` type

## 5. Stories

- [x] 5.1 Create `Dialog.stories.tsx` with meta, `cssClasses` parameter, and default story (body content + trigger button)
- [x] 5.2 Add story with header and footer props
- [x] 5.3 Add story with scrollable body content overflow

## 6. Quality

- [x] 6.1 Run `npm run format` and verify `npm run lint` passes
