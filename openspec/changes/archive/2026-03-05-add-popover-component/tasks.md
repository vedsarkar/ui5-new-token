## 1. Types

- [x] 1.1 Create `Popover.types.ts` with `PopoverProps`: `trigger` (ReactElement), `positionArea` (string), `onToggle`, `children`, plus rest div attributes

## 2. Component

- [x] 2.1 Create `Popover.tsx` with wrapper `<span>`, `onClick` → `ref.togglePopover()`, popover content `<div popover="auto">`
- [x] 2.2 Forward `onToggle` to the native `toggle` event on the popover content element
- [x] 2.3 Apply `positionArea` via inline style on the popover content element (default: `"bottom"`)
- [x] 2.4 Spread rest props and compose `className` via `classNames()`
- [x] 2.5 Add JSDoc documentation with usage example

## 3. Styles

- [x] 3.1 Create `Popover.module.css` — wrapper with `anchor-scope`, `anchor-name`, `display: inline-flex`
- [x] 3.2 Style popover content: `position-anchor`, background, border, border-radius, padding, box-shadow using global color tokens
- [x] 3.3 Reset default popover styles (border, margin, inset)

## 4. Public API

- [x] 4.1 Create `index.ts` exporting `Popover` component and `PopoverProps` type

## 5. Stories

- [x] 5.1 Create `Popover.stories.tsx` with meta, `cssClasses` parameter, and default story (trigger button + text content)
- [x] 5.2 Add story with menu-like content (list of action items)
- [x] 5.3 Add story demonstrating custom `positionArea` (e.g., `"top"` or `"bottom end"`)

## 6. Quality

- [x] 6.1 Run `npm run format` and verify `npm run lint` passes
