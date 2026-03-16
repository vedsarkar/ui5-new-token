## 1. Catalog Data Update

- [x] 1.1 Rename category `"AI"` → `"Agentflow"` in `public/apps/catalog.json`
- [x] 1.2 Rename category `"Applications"` → `"Data Cloud"` in `public/apps/catalog.json`

## 2. Divider Enhancement

- [x] 2.1 Change `Divider.types.ts` — replace `<hr>` props with `HtmlProps<"div", { align?: "start" | "center" | "end"; children?: React.ReactNode }>`
- [x] 2.2 Rewrite `Divider.tsx` — render `<div role="separator">`, support children with `::before`/`::after` lines, apply `align` class
- [x] 2.3 Update `Divider.module.css` — add `.labeled`, `.start`, `.center`, `.end` classes with flexbox line layout, remove CSS custom properties
- [x] 2.4 Update `Divider.stories.tsx` — add Labeled, CenterAligned, EndAligned stories; update Default story for new `<div>` rendering
- [x] 2.5 Update `Divider/index.ts` exports if needed

## 3. AppSelector Component

- [x] 3.1 Create `AppSelector.types.ts` — define `AppName` type from catalog import, `AppEntry` type `{ name: AppName; uri: string }`, `AppSelectorProps` with `HtmlProps<"div", { apps: AppEntry[] }>`
- [x] 3.2 Create `AppSelector.module.css` — styles for root, grid (3-col), app item (flex column, centered), appIcon (48×48), hover state, group label, error area
- [x] 3.3 Create `AppSelector.tsx` — implement component: trigger button with applications icon, Popover integration, onToggle-driven fetch, module-level cache, Skeleton loading, ErrorMessage with auto-retry, category grouping, app grid with `<a>` elements
- [x] 3.4 Create `AppSelector.stories.tsx` — Default story with sample apps prop, pass cssClasses parameter
- [x] 3.5 Create `AppSelector/index.ts` — export component and types

## 4. Finalize

- [x] 4.1 Add AppSelector export to `components/index.ts`
- [x] 4.2 Run `npm run format` and `npm run lint`
- [x] 4.3 Verify Storybook renders correctly with `npm run dev`
