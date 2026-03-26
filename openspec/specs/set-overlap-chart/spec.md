# SetOverlapChart Component Specification

## Purpose

The SetOverlapChart component is an UpSet-style set overlap visualization that shows how records are distributed across multiple sets (source systems) and their intersections. It renders three coordinated SVG sub-charts — vertical intersection bars, a dot matrix, and horizontal set bars — built entirely with custom SVG and d3-scale (no ECharts). It supports two combination modes: `INTERSECTION` (overlapping counts with element-level hover filtering) and `DISTINCT_INTERSECTION` (mutually exclusive counts with structural hover matching optimized for large datasets). The component follows Reltio Design Platform conventions including CSS Modules, `classNames()` utility, `HtmlProps` typing, rest props forwarding, and keyboard/ARIA accessibility.

## Requirements

### Requirement: SVG-based UpSet plot visualization
The `SetOverlapChart` component SHALL render an UpSet-style set overlap visualization composed of three coordinated sub-charts rendered as a single SVG: an **IntersectionsChart** (vertical bars at the top showing intersection sizes), an **IntersectionsMatrix** (dot matrix in the middle showing which sets participate in each intersection), and a **SetsChart** (horizontal bars on the left showing set sizes). The component SHALL NOT use ECharts — it is a custom SVG implementation using d3-scale for axis calculations.

#### Scenario: All three sub-charts render together

- **WHEN** the `SetOverlapChart` receives valid `sets` and `intersections` data
- **THEN** the component renders a single `<svg>` containing vertical intersection bars at the top, a dot matrix below them, and horizontal set bars on the left

### Requirement: Data model — sets
The `SetOverlapChart` SHALL accept a `sets` prop (array of `DataSet`). Each `DataSet` has an `index` (number), `name` (string), `size` (number), and `elements` (string array of record identifiers). Sets represent the source systems whose overlaps are being visualized.

#### Scenario: Sets define matrix rows

- **WHEN** `sets` contains entries for "SAP", "Oracle", and "LegacyMDM"
- **THEN** the matrix displays three rows, one per set, with labels showing each set's name

### Requirement: Data model — intersections
The `SetOverlapChart` SHALL accept an `intersections` prop (array of `Intersection`). Each `Intersection` has an `index` (number), `sets` (string array of participating set names), `size` (number), and `elements` (string array of record identifiers). Intersections represent the columns of the UpSet plot.

#### Scenario: Single-set intersections

- **WHEN** an intersection has `sets: ["SAP"]` and `size: 6`
- **THEN** a vertical bar of height proportional to 6 is rendered, and the matrix column shows a single filled dot on the SAP row

#### Scenario: Multi-set intersections

- **WHEN** an intersection has `sets: ["SAP", "Oracle"]` and `size: 2`
- **THEN** a vertical bar of height proportional to 2 is rendered, and the matrix column shows filled dots on both SAP and Oracle rows connected by a vertical line

### Requirement: Display modes — combination semantics
The `SetOverlapChart` SHALL accept a `mode` prop of type `SetOverlapChartMode` with values `INTERSECTION` (default) and `DISTINCT_INTERSECTION`. The mode determines the semantics of each intersection column's data and how hover highlighting is computed. A third mode (`union`) is NOT supported.

Each intersection column represents a combination mask over all sets. For a mask that selects sets S₁ and S₂ from sets [S₁, S₂, S₃]:

- **`INTERSECTION`** — counts all elements in ⋂{selected sets}, ignoring non-selected sets. Formula: `intersection(selected) = ⋂ selectedSets`. An element may be counted in multiple columns (overlapping semantics). Note: this does NOT mean "exactly these sets only" — that behavior belongs to `DISTINCT_INTERSECTION`.
- **`DISTINCT_INTERSECTION`** — counts elements in ⋂{selected sets} that are NOT in any non-selected set. Formula: `distinctIntersection(selected) = (⋂ selectedSets) \ (⋃ nonSelectedSets)`. Every element belongs to exactly one column (mutually exclusive partitioning).

**Worked example** — sets A, B, C with elements: e1∈{A}, e2∈{A,B}, e3∈{A,B,C}, e4∈{B}, e5∈{C}. For the combination mask selecting A and B:
- `INTERSECTION` → {e2, e3} (in A AND B, regardless of C)
- `DISTINCT_INTERSECTION` → {e2} (in A AND B, but NOT in C)

The mode also governs hover highlighting behavior, computation strategy, and data requirements (see mode-specific data, hover interaction, and hover computation requirements).

#### Scenario: Intersection mode — overlapping counts

- **WHEN** `mode` is `SetOverlapChartMode.INTERSECTION` and sets are [A, B, C]
- **THEN** an element in A∩B∩C is counted in the A+B intersection column AND the A+B+C intersection column (sizes can overlap)

#### Scenario: Distinct intersection mode — mutually exclusive counts

- **WHEN** `mode` is `SetOverlapChartMode.DISTINCT_INTERSECTION` and sets are [A, B, C]
- **THEN** an element in A∩B∩C is counted ONLY in the A+B+C column, not in the A+B column (each element appears in exactly one column)

### Requirement: Mode-specific data requirements
Although both modes share the same `DataSet` and `Intersection` TypeScript types, each mode relies on different fields for hover computation. The two modes are NOT interchangeable with the same data — each mode requires data shaped specifically for its computation strategy.

**`INTERSECTION` mode** requires populated `elements` arrays on both `DataSet` and `Intersection` objects. Hover highlighting computes overlap by filtering individual element identifiers across sets and intersections. Without populated `elements`, all hover overlap counts resolve to 0 and the chart appears unresponsive to hover.

**`DISTINCT_INTERSECTION` mode** does NOT use `elements` arrays — they SHOULD be empty (`[]`). Hover highlighting uses only the `sets` array (set name membership) and `index` (column identity) fields. This design was driven by the requirement to support large-scale datasets (hundreds of thousands of records) where enumerating individual elements would be impractical.

#### Scenario: INTERSECTION mode data — elements populated

- **WHEN** `mode` is `INTERSECTION`
- **THEN** every `DataSet.elements` contains the full list of record identifiers belonging to that set, and every `Intersection.elements` contains the full list of record identifiers in that intersection

#### Scenario: DISTINCT_INTERSECTION mode data — elements empty

- **WHEN** `mode` is `DISTINCT_INTERSECTION`
- **THEN** `DataSet.elements` and `Intersection.elements` are empty arrays (`[]`), and hover computation relies solely on `Intersection.sets` and `Intersection.index`

#### Scenario: Modes are not interchangeable with opposite data

- **WHEN** DISTINCT_INTERSECTION data (empty `elements`) is used with `INTERSECTION` mode
- **THEN** hover interactions produce no visible highlighting (all element overlap counts are 0)

### Requirement: Sizing — explicit width and height
The `SetOverlapChart` SHALL accept optional `width` and `height` props (numbers, default `0`). When the component mounts, it measures its container element's `clientWidth` and `clientHeight` and uses those if larger than the provided values.

#### Scenario: Explicit dimensions

- **WHEN** `width={900}` and `height={500}` are provided
- **THEN** the chart uses those dimensions for layout calculations

#### Scenario: Container auto-detection

- **WHEN** `width` and `height` are `0` (default) and the container has `clientWidth=800` and `clientHeight=400`
- **THEN** the chart uses 800×400 for layout calculations

### Requirement: Responsive sub-chart sizing
The component SHALL use the `useSetOverlapChartSizes` hook to compute layout dimensions. The matrix width is derived from the number of intersections times a minimum column width (28px × 1.2). The sets chart width is clamped between 100px and 200px. The intersections chart height has a minimum of 120px. Labels are truncated to fit available space.

#### Scenario: Many intersections cause horizontal scrolling

- **WHEN** the number of intersections exceeds what fits in the available width
- **THEN** the SVG width exceeds the container width and the container scrolls horizontally (via `overflow: auto`)

#### Scenario: Few sets produce a compact matrix

- **WHEN** `sets` contains 2 entries
- **THEN** the matrix height is 2 × 29px (row height) = 58px

### Requirement: Intersection bar chart
The `IntersectionsChart` sub-component SHALL render vertical bars at the top of the SVG, one per intersection. Bar height is proportional to the intersection's `size`, scaled linearly from 0 to the maximum intersection size. Each bar displays its numeric value above it as a text label. The Y-axis SHALL display only integer tick values (fractional ticks are filtered out). Vertical grid lines appear at each column center, and horizontal grid lines at each Y-axis tick.

Each intersection column renders two layered rectangles: a background bar at reduced opacity (showing the full size) and a foreground bar at full opacity (showing the highlighted portion on hover). On hover, bar heights animate with a 0.3s ease-in-out CSS transition.

#### Scenario: Bar heights are proportional

- **WHEN** intersections have sizes [6, 5, 4, 2]
- **THEN** the tallest bar (size 6) fills the full chart height, and other bars are proportionally shorter

#### Scenario: Value labels above bars

- **WHEN** an intersection has `size: 34200`
- **THEN** a text label "34200" appears above the corresponding bar

#### Scenario: Y-axis shows integer ticks only

- **WHEN** the maximum intersection size is 7
- **THEN** the Y-axis ticks show integers (0, 1, 2, ..., 7) with no fractional values

### Requirement: Intersection matrix
The `IntersectionsMatrix` sub-component SHALL render a grid of circles (dots) at the intersection of each column (intersection) and row (set). A filled/active circle (in primary color) indicates the set participates in that intersection; inactive circles appear in a neutral color. When an intersection involves multiple sets, a vertical line (in primary color) connects the active circles in that column. Circle fills and line strokes transition with a 0.3s ease-in-out animation. When a column is dimmed (due to another column being hovered), its active circles and connecting lines switch to the secondary color.

#### Scenario: Active circles for participating sets

- **WHEN** an intersection has `sets: ["SAP", "LegacyMDM"]`
- **THEN** the matrix column shows filled circles on the SAP and LegacyMDM rows, with inactive circles on all other rows

#### Scenario: Connecting lines between active circles

- **WHEN** an intersection involves sets that are not adjacent in the matrix
- **THEN** a vertical line connects the topmost and bottommost active circles in that column

### Requirement: Set bar chart
The `SetsChart` sub-component SHALL render horizontal bars on the left, one per set. Bar width is proportional to the set's `size`, scaled linearly from 0 to the maximum set size. Bars grow from right to left. The axis shows percentage labels: "100%" at the left edge (representing the largest set's full size) and "0%" at the right edge. Set labels appear to the right of the bars (between the bars and the matrix).

Each set bar renders three layered rectangles: a background track at low opacity (full chart width), a dimmed bar at secondary color (showing the set's total size), and a foreground bar at primary color (showing the highlighted portion on hover). This layering creates the dimmed-behind-highlighted visual effect. On hover, bar widths animate with a 0.3s ease-in-out CSS transition.

#### Scenario: Bar widths are proportional

- **WHEN** sets have sizes [355300, 255200, 209100]
- **THEN** the widest bar (size 355300) fills the full sets chart width, and other bars are proportionally narrower

#### Scenario: Percentage axis labels

- **WHEN** the sets chart renders
- **THEN** a "100%" label appears at the left edge and a "0%" label at the right edge, indicating proportional scale relative to the largest set

#### Scenario: Grid lines between rows

- **WHEN** multiple sets are rendered
- **THEN** horizontal grid lines separate each set row, except after the last row

### Requirement: Hover interaction — intersection hover
When the user hovers over an intersection column, the `SetOverlapChart` SHALL highlight that intersection's bar and dim all other intersection columns in the matrix. The hover target area spans the full column height — from the top of the intersection bar through the corresponding matrix column — creating a unified hover zone. A stroke border outline appears around the hovered area on mouse enter and fades on mouse leave (0.3s ease-in-out). On the sets chart, horizontal bars adjust based on the active mode.

#### Scenario: Intersection hover highlights column

- **WHEN** the user hovers over the intersection column for `["SAP", "Oracle"]`
- **THEN** that column's matrix circles remain fully opaque while all other columns' circles are dimmed, and a border outline appears around the hovered column

#### Scenario: Intersection hover adjusts set bars — INTERSECTION mode

- **WHEN** the user hovers over an intersection with `elements: ["record_1", "record_5"]` in `INTERSECTION` mode
- **THEN** each set's horizontal bar shrinks to show only the count of its elements that appear in `["record_1", "record_5"]` (element-level filtering)

#### Scenario: Intersection hover adjusts set bars — DISTINCT_INTERSECTION mode

- **WHEN** the user hovers over an intersection with `sets: ["SAP", "Oracle"]` in `DISTINCT_INTERSECTION` mode
- **THEN** each set's bar shows the hovered intersection's size if that set is in the intersection's `sets` array, or 0 otherwise (set-name-level membership, not element-level)

### Requirement: Hover interaction — set hover
When the user hovers over a set row, the `SetOverlapChart` SHALL highlight intersection bars to show overlap, with behavior depending on the active mode. The hover target area spans the full chart width for each row, and a stroke border outline appears around the hovered row.

#### Scenario: Set hover in INTERSECTION mode

- **WHEN** the user hovers over the "SAP" set row in `INTERSECTION` mode
- **THEN** each intersection bar shows a highlighted portion proportional to how many of that intersection's `elements` also appear in SAP's `elements` (element-level overlap)

#### Scenario: Set hover in DISTINCT_INTERSECTION mode

- **WHEN** the user hovers over the "SAP" set row in `DISTINCT_INTERSECTION` mode
- **THEN** each intersection bar fills fully if "SAP" is in that intersection's `sets` array, and shows empty otherwise. Set bars show aggregated sizes from all intersection columns where both the hovered set and the bar's set participate (column-level overlap via index matching)

### Requirement: Hover computation strategies and performance
The two modes use fundamentally different algorithms for hover highlighting, with significant performance implications.

**`INTERSECTION` mode** uses element-level filtering. On each hover event, every intersection bar and set bar computes its highlighted size by filtering its `elements` array against the hovered entity's `elements` array using `Array.includes()`. This has O(E_i × E_h) time complexity per bar, where E_i is the element count of the bar's intersection/set and E_h is the element count of the hovered entity. For large datasets, this can cause visible UI lag during hover because the computation runs synchronously on every mouse enter/leave event across all bars.

**`DISTINCT_INTERSECTION` mode** uses structural matching. Intersection bars check whether the hovered set's `name` appears in the intersection's `sets` array — an O(S) check where S is the number of sets in the combination (typically ≤ 10). Set bars use a precomputed `setOverlappingColumns` lookup (mapping each set name to its participating intersection columns by `index`) to aggregate sizes via index matching — O(I) where I is the number of intersections. No individual element identifiers are iterated, making hover response time independent of dataset scale.

#### Scenario: INTERSECTION mode performance with large data

- **WHEN** `INTERSECTION` mode is used with sets containing tens of thousands of elements each
- **THEN** hover interactions MAY exhibit visible lag due to O(E_i × E_h) element filtering per bar on each hover event

#### Scenario: DISTINCT_INTERSECTION mode performance with large data

- **WHEN** `DISTINCT_INTERSECTION` mode is used with sets containing hundreds of thousands of records
- **THEN** hover interactions remain responsive because computation uses only set-name and index matching, independent of individual element counts

### Requirement: Color customization via options
The `SetOverlapChart` SHALL accept an `options` prop of type `SetOverlapChartOptions` with optional `primaryColor`, `secondaryColor`, and `secondaryColorOpacity` properties. The primary color overrides `--reltio-color-brand-blue` on the chart root. The secondary color and opacity control the background/dimmed bar appearance.

#### Scenario: Custom primary color

- **WHEN** `options={{ primaryColor: "#FF5733" }}` is provided
- **THEN** the active intersection bars and set bars use `#FF5733` instead of the default brand color

#### Scenario: Default secondary color

- **WHEN** no `secondaryColor` is specified in `options`
- **THEN** the secondary (background) bars use `#CCCCE0` with full opacity

### Requirement: Axis labels via options
The `SetOverlapChart` SHALL accept optional `intersectionChartAxisLabel` and `setsChartAxisLabel` properties in the `options` prop. When provided, these labels appear alongside the respective chart axes.

#### Scenario: Intersection chart axis label

- **WHEN** `options={{ intersectionChartAxisLabel: "Profile count" }}` is provided
- **THEN** the text "Profile count" appears as a label on the intersection chart's Y-axis

#### Scenario: Sets chart axis label

- **WHEN** `options={{ setsChartAxisLabel: "Set Size" }}` is provided
- **THEN** the text "Set Size" appears as a label on the sets chart's X-axis

### Requirement: Label truncation
The `SetOverlapChart` SHALL truncate set labels that exceed the available space. Labels longer than 20 characters are clipped with "..." appended. When space is further constrained, labels are progressively shortened down to a minimum of 8 characters. Label width is measured dynamically using a temporary SVG text element.

#### Scenario: Long label is truncated

- **WHEN** a set name is "VeryLongSourceSystemName" (23 characters)
- **THEN** the displayed label is "VeryLongSourceSystemNa..." or shorter depending on available width

#### Scenario: Short label is preserved

- **WHEN** a set name is "SAP" (3 characters)
- **THEN** the displayed label is "SAP" without truncation

### Requirement: Empty state
When both `sets` and `intersections` arrays are empty, the `SetOverlapChart` SHALL render the container and SVG elements but SHALL NOT render any sub-chart content (no bars, no matrix, no labels).

#### Scenario: No data renders empty container

- **WHEN** `sets=[]` and `intersections=[]`
- **THEN** the component renders a `<div>` with an empty `<svg>` and no visual chart content

### Requirement: Tooltip title
The `SetOverlapChart` SHALL set the SVG `<title>` element to the hovered intersection's set names joined by " ∩ " (intersection symbol). When no intersection is hovered, the title is the raw `tooltipTitle` value (which is `undefined`), rendering an empty `<title>` element.

#### Scenario: Tooltip shows intersection sets

- **WHEN** the user hovers over an intersection with `sets: ["SAP", "Oracle"]`
- **THEN** the SVG title is "SAP ∩ Oracle"

#### Scenario: No tooltip when not hovering

- **WHEN** no intersection is hovered
- **THEN** the SVG `<title>` element is empty

### Requirement: className prop and rest props forwarding
The `SetOverlapChart` SHALL accept an optional `className` prop and forward all remaining HTML attributes onto the root `<div>` element via `...rest` spread. The component's props type SHALL use `HtmlProps<"div", CustomProps>` from `@/utils/types` to combine custom chart props with native `<div>` attributes. Consumer-provided `style` is merged with the component's internal CSS custom properties.

#### Scenario: Custom className is applied

- **WHEN** a consumer renders `<SetOverlapChart className="my-chart" />`
- **THEN** the root `<div>` has both the component's own CSS Module class and `"my-chart"` combined via `classNames()`

#### Scenario: Rest props are forwarded

- **WHEN** a consumer renders `<SetOverlapChart data-testid="overlap-chart" id="chart-1" />`
- **THEN** `data-testid="overlap-chart"` and `id="chart-1"` appear on the root `<div>` element

#### Scenario: Consumer style merges with internal style

- **WHEN** a consumer passes `style={{ border: "1px solid red" }}`
- **THEN** the border style is merged with the component's internal CSS custom properties (e.g., `--secondary-color`)

### Requirement: classNames() utility usage
ALL `className` attributes across the root component and all sub-components SHALL use the `classNames()` utility from `@/utils/classNames`. This ensures stable prefixed classes (e.g., `reltio_SetOverlapChart_root`) are generated alongside CSS Module hashed classes for external customization.

#### Scenario: Root element uses classNames()

- **WHEN** the `SetOverlapChart` renders its root `<div>`
- **THEN** the `className` is set via `classNames(styles.root, className)`, producing both the CSS Module hash and a stable `reltio_SetOverlapChart_root` prefix

#### Scenario: Sub-component elements use classNames()

- **WHEN** any sub-component (`IntersectionsChart`, `SetsChart`, `IntersectionsMatrix`, `IntersectionsChartAxis`, `SetsChartAxis`) renders elements with CSS classes
- **THEN** every `className` attribute uses the `classNames()` utility

### Requirement: Keyboard accessibility
Interactive hover targets in the chart SHALL be keyboard-accessible. Intersection hover rects and set hover rects SHALL have `tabIndex={0}` to make them focusable. They SHALL trigger the same hover state on `onFocus` as they do on `onMouseEnter`, and clear it on `onBlur` as they do on `onMouseLeave`. CSS focus-visible styles SHALL match hover styles so keyboard users see the same visual feedback.

#### Scenario: Tab navigates to intersection columns

- **WHEN** a keyboard user presses Tab
- **THEN** focus moves through intersection hover areas sequentially, and each focused intersection shows the same highlighting as a mouse hover

#### Scenario: Tab navigates to set rows

- **WHEN** a keyboard user presses Tab past all intersection columns
- **THEN** focus moves through set row hover areas, and each focused set shows the same highlighting as a mouse hover

#### Scenario: Focus-visible matches hover style

- **WHEN** an intersection or set hover area receives keyboard focus
- **THEN** the stroke border outline becomes visible via `:focus-visible` CSS, matching the `:hover` appearance

### Requirement: ARIA attributes
The `SetOverlapChart` SHALL provide ARIA attributes for screen reader accessibility. The root `<svg>` element SHALL have `role="img"` and an `aria-label` describing the chart (e.g., "Set overlap chart showing overlaps across N sets and M intersections"). Interactive hover rects SHALL have `role="button"` and descriptive `aria-label` attributes (e.g., "Intersection: SAP ∩ Oracle, size: 42" or "Set: SAP, size: 355300").

#### Scenario: SVG has accessible role and label

- **WHEN** the chart renders with 3 sets and 7 intersections
- **THEN** the `<svg>` has `role="img"` and `aria-label="Set overlap chart showing overlaps across 3 sets and 7 intersections"`

#### Scenario: Intersection hover areas have accessible labels

- **WHEN** an intersection column has `sets: ["SAP", "Oracle"]` and `size: 42`
- **THEN** the hover rect has `role="button"` and `aria-label="Intersection: SAP ∩ Oracle, size: 42"`

#### Scenario: Set hover areas have accessible labels

- **WHEN** a set has `name: "SAP"` and `size: 355300`
- **THEN** the hover rect has `role="button"` and `aria-label="Set: SAP, size: 355300"`

#### Scenario: Empty chart has descriptive label

- **WHEN** the chart renders with no valid data
- **THEN** the `<svg>` has `aria-label="Empty set overlap chart"`

### Requirement: Public export
The `SetOverlapChart` component, `SetOverlapChartProps`, `DataSet`, `Intersection`, `SetOverlapChartMode`, and `SetOverlapChartOptions` types SHALL be exported from `charts/SetOverlapChart/index.ts`. The `charts/index.ts` SHALL re-export all public symbols from `SetOverlapChart` as part of the unified charts API.

#### Scenario: SetOverlapChart is importable from chart module

- **WHEN** a consumer imports from `@/charts/SetOverlapChart`
- **THEN** `SetOverlapChart`, `SetOverlapChartProps`, `DataSet`, `Intersection`, `SetOverlapChartMode`, and `SetOverlapChartOptions` are available

#### Scenario: SetOverlapChart is importable from charts barrel

- **WHEN** a consumer imports from `@/charts`
- **THEN** `SetOverlapChart` and all its public types are available alongside other chart components

### Requirement: Storybook stories
The `SetOverlapChart` SHALL have Storybook stories under the title `"Charts/SetOverlapChart"` demonstrating all variants and states, one variant per story.

#### Scenario: Stories exist for all variants

- **WHEN** the Storybook sidebar is opened under "Charts/SetOverlapChart"
- **THEN** the following stories are available: Default, InteractionMode, DistinctIntersectionMode, HorizontalScrolling, WithAxisLabels, Empty

### Requirement: Component file structure
The `SetOverlapChart` files SHALL be located at `charts/SetOverlapChart/` with sub-components in `charts/SetOverlapChart/components/`.

#### Scenario: Files exist at expected paths

- **WHEN** the SetOverlapChart implementation is complete
- **THEN** the following files exist: `charts/SetOverlapChart/SetOverlapChart.tsx`, `charts/SetOverlapChart/SetOverlapChart.types.ts`, `charts/SetOverlapChart/SetOverlapChart.module.css`, `charts/SetOverlapChart/SetOverlapChart.stories.tsx`, `charts/SetOverlapChart/index.ts`, `charts/SetOverlapChart/constants.ts`, `charts/SetOverlapChart/helpers.ts`, `charts/SetOverlapChart/useSetOverlapChartSizes.ts`

#### Scenario: Sub-components exist

- **WHEN** the SetOverlapChart implementation is complete
- **THEN** the following sub-component directories exist: `components/IntersectionsChart/`, `components/IntersectionsMatrix/`, `components/SetsChart/`, `components/IntersectionsChartAxis/`, `components/SetsChartAxis/`

## Technical Implementation

### Component Structure
- `SetOverlapChart.tsx` — Component implementation
- `SetOverlapChart.types.ts` — TypeScript type definitions (using `type` keyword and `HtmlProps`)
- `SetOverlapChart.module.css` — CSS Modules styles
- `SetOverlapChart.stories.tsx` — Storybook stories (one variant per story)
- `index.ts` — Public exports
- `constants.ts` — Sizing, gap, and default color constants
- `helpers.ts` — Label truncation utility
- `useSetOverlapChartSizes.ts` — Custom hook for responsive layout calculation
- `components/IntersectionsChart/` — Vertical bar sub-chart
- `components/IntersectionsMatrix/` — Dot matrix sub-chart
- `components/SetsChart/` — Horizontal bar sub-chart
- `components/IntersectionsChartAxis/` — Y-axis for intersection chart
- `components/SetsChartAxis/` — X-axis for set chart

### Dependencies
- React 17+
- TypeScript (strict mode)
- d3-scale (band and linear scales for axis calculations)
- CSS Modules
- classNames utility from `utils/classNames.ts`

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS custom properties required (no IE11)

### Accessibility Standards
- SVG `role="img"` with dynamic `aria-label`
- Interactive elements have `role="button"` and descriptive `aria-label`
- Keyboard navigable via `tabIndex={0}` with `onFocus`/`onBlur` handlers
- CSS `:focus-visible` styles for keyboard focus indicators
- SVG `<title>` element for native tooltip
