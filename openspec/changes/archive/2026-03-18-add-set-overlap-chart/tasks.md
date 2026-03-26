## 1. Component Structure

- [x] 1.1 Create `charts/SetOverlapChart/` directory with component, types, styles, stories, constants, helpers, sizing hook, and index files
- [x] 1.2 Create sub-component directories: `IntersectionsChart/`, `IntersectionsMatrix/`, `SetsChart/`, `IntersectionsChartAxis/`, `SetsChartAxis/`
- [x] 1.3 Export `SetOverlapChart` and all public types from `charts/SetOverlapChart/index.ts`
- [x] 1.4 Re-export all public symbols from `charts/index.ts` barrel

## 2. Types and Props API

- [x] 2.1 Define `SetOverlapChartProps` using `HtmlProps<"div", CustomProps>` with JSDoc on every prop
- [x] 2.2 Define `Intersection`, `DataSet`, `SetOverlapChartMode` enum, and `SetOverlapChartOptions` types with JSDoc
- [x] 2.3 Add `className`, `style`, and `...rest` forwarding to root `<div>`

## 3. Core Implementation

- [x] 3.1 Implement `SetOverlapChart` root component with d3-scale band/linear scales, container sizing, and hover state management
- [x] 3.2 Implement `useSetOverlapChartSizes` hook for responsive layout computation
- [x] 3.3 Implement `IntersectionsChart` sub-component with vertical bars, value labels, and mode-specific hover logic
- [x] 3.4 Implement `IntersectionsMatrix` sub-component with dot grid and connecting lines
- [x] 3.5 Implement `SetsChart` sub-component with horizontal bars and mode-specific hover logic (element-level filtering for INTERSECTION, structural matching for DISTINCT_INTERSECTION)
- [x] 3.6 Implement `IntersectionsChartAxis` and `SetsChartAxis` sub-components
- [x] 3.7 Implement label truncation in `helpers.ts`

## 4. Styling

- [x] 4.1 Create CSS Modules for root component and all sub-components
- [x] 4.2 Add 0.3s ease-in-out CSS transitions for hover animations on bars, circles, and lines
- [x] 4.3 Add `:focus-visible` styles matching `:hover` on interactive hover rects
- [x] 4.4 Implement color customization via CSS custom properties (`--reltio-color-brand-blue` override, `--secondary-color`)

## 5. Accessibility

- [x] 5.1 Add `role="img"` and dynamic `aria-label` to root `<svg>`
- [x] 5.2 Add `tabIndex={0}`, `role="button"`, and `aria-label` to intersection hover rects
- [x] 5.3 Add `tabIndex={0}`, `role="button"`, and `aria-label` to set hover rects
- [x] 5.4 Add `onFocus`/`onBlur` handlers mirroring `onMouseEnter`/`onMouseLeave`

## 6. classNames() Utility

- [x] 6.1 Apply `classNames()` to all `className` attributes in `SetOverlapChart.tsx`
- [x] 6.2 Apply `classNames()` to all `className` attributes in `IntersectionsChart`, `SetsChart`, `IntersectionsChartAxis`, `SetsChartAxis`
- [x] 6.3 Verify `IntersectionsMatrix` already uses `classNames()` correctly

## 7. Storybook Stories

- [x] 7.1 Add `Default` story (4-set INTERSECTION mode)
- [x] 7.2 Add `InteractionMode` story (5-set INTERSECTION mode)
- [x] 7.3 Add `DistinctIntersectionMode` story (large-scale data)
- [x] 7.4 Add `HorizontalScrolling` story (6 sets, 31 intersections)
- [x] 7.5 Add `WithAxisLabels` story
- [x] 7.6 Add `Empty` story

## 8. Documentation

- [x] 8.1 Add component-level JSDoc with `@example` to `SetOverlapChart.tsx`
- [x] 8.2 Add detailed JSDoc to all props, types, and enum values in `SetOverlapChart.types.ts`
- [x] 8.3 Create OpenSpec specification at `openspec/specs/set-overlap-chart/spec.md`

## 9. Quality

- [x] 9.1 Run `npm run format` and `npm run lint` — all passing
