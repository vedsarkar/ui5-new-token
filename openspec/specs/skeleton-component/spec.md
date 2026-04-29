# skeleton-component Specification

## Purpose

Skeleton — a loading placeholder with animated shimmer effect, used to indicate content that is being loaded.

No direct SAP equivalent (custom component using SAP Horizon tokens).

## Requirements

### Requirement: Row-based Layout

#### Scenario: Multiple rows
- **WHEN** `rows` is set (default: 3)
- **THEN** renders that many horizontal bars in a flex column with 12px gap

#### Scenario: Custom row height
- **WHEN** `size` is set (default: `"16px"`)
- **THEN** each row bar has that height

### Requirement: Shimmer Animation

#### Scenario: Animated shimmer
- **THEN** each row has a dual `::before`/`::after` pseudo-element animation
- **AND** uses `--sapBackgroundColor` as base and `--sapNeutralBackground` as shimmer color
- **AND** total animation cycle: 2.1s with staggered keyframes

### Requirement: TypeScript Types

Props SHALL be defined as `SkeletonProps = HtmlProps<"div", Omit<{ rows, size }, "children">>` — no children allowed.

### Requirement: CSS Styling

**SAP tokens used:** `--sapBackgroundColor`, `--sapNeutralBackground`.
