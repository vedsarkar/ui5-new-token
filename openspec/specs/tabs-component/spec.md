# tabs-component Specification

## Purpose

SAP Fiori Tab Bar (Icon Tab Bar, Inline Mode) — horizontal tab navigation with a 3px selection indicator bar. Supports text tabs, icon-only tabs, icon+text tabs, badges, semantic colors, and process/filter tab patterns.

SAP equivalent: `ui5-tabcontainer`. Reference: https://www.sap.com/design-system/fiori-design-web/ui-elements/tab-bar-web-component/

## Requirements

### Requirement: Items Array API

The Tabs SHALL accept an `items` array of `TabItem` objects, each with `value` (unique string), `label` (ReactNode), and optional `disabled`.

#### Scenario: Tab rendering
- **WHEN** `items` is provided
- **THEN** each item renders as a `<button role="tab">` inside a `<div role="tablist">`
- **AND** `aria-selected` is set on the active tab

### Requirement: Controlled Selection

#### Scenario: Controlled value
- **WHEN** `value` matches a tab's value
- **THEN** that tab is visually active with `--sapTab_Selected_TextColor`
- **AND** a 3px selection bar in `--sapTab_ForegroundColor` renders at the bottom

#### Scenario: Selection callback
- **WHEN** the user clicks a tab
- **THEN** `onValueChange(tabValue)` is called

### Requirement: Disabled Tabs

#### Scenario: Disabled tab
- **WHEN** a tab item has `disabled: true`
- **THEN** `opacity: 0.4`, `cursor: not-allowed`, `pointer-events: none`
- **AND** the native `<button>` has `disabled` attribute

### Requirement: Visual Design

#### Scenario: Tab bar background
- **THEN** uses `--sapObjectHeader_Background` with fallback to `--sapTab_Background`
- **AND** header shadow: `0 2px 2px 0 rgba(34, 53, 72, 0.05), inset 0 -1px 0 0 #d9d9d9`

#### Scenario: Tab typography
- **THEN** font-family: `--sapFontHeaderFamily` with fallback `--sapFontFamily`
- **AND** font-size: 14px, font-weight: 700

#### Scenario: Tab hover
- **WHEN** hovering an inactive tab
- **THEN** color changes to `--sapTab_Selected_TextColor`

#### Scenario: Focus visible
- **WHEN** a tab receives keyboard focus
- **THEN** 2px outline in `--sapContent_FocusColor` with -2px offset

### Requirement: Flexible Label Content

The `label` prop accepts ReactNode, enabling:
- Text only: `label: "Overview"`
- Icon only: `label: <Home />`
- Icon + text: `label: <><Home /> Overview</>`
- Badge: `label: <>Label <Badge content={5} /></>`

### Requirement: TypeScript Types

Props SHALL be defined as `TabsProps = HtmlProps<"div", { items, value, onValueChange }>`. Exported type: `TabItem = { value, label, disabled }`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapObjectHeader_Background`, `--sapTab_Background`, `--sapTab_TextColor`, `--sapTab_Selected_TextColor`, `--sapTab_ForegroundColor`, `--sapContent_FocusColor`, `--sapFontHeaderFamily`, `--sapFontFamily`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default, WithSelectedTab, WithDisabledTab, ManyTabs
- SemanticColors, IconOnly, IconAndText, WithBadges
- ProcessTabs, FilterTabs, FilterTabsSemantic
