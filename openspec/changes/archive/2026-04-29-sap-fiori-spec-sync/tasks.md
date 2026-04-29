## 1. Form controls — shared `FormControlBase` / `ValueState` pattern

- [x] 1.1 Rewrite `openspec/specs/textfield-component/spec.md` — replace `error: boolean` with `valueState` (None/Error/Warning/Success/Information), replace `supportingText` with `valueStateMessage`, replace `showClearIcon` with `clearable`, add `startContent`/`endContent` slots, replace all `--reltio-color-*` with actual `--sapField_*` tokens, remove Material Design 3 references
- [x] 1.2 Rewrite `openspec/specs/textarea-component/spec.md` — same `valueState` migration as TextField, add `toolbar` slot, document `field-sizing: content` auto-expand, document grid layout, replace all `--reltio-textarea-*` and `--reltio-color-*` with actual `--sapField_*` tokens
- [x] 1.3 Rewrite `openspec/specs/checkbox-component/spec.md` — add `indeterminate` prop, replace `error` with `valueState` (Error/Warning), document custom indicator with check/dash SVG icons, replace `--reltio-color-*` with `--sapField_BorderColor`, `--sapBrandColor`, `--sapNegativeElementColor`, etc.
- [x] 1.4 Rewrite `openspec/specs/radio-component/spec.md` — replace `error` with `valueState`, document custom circular indicator with scale transform, replace `--reltio-color-*` with `--sapField_BorderColor`, `--sapBrandColor`, `--sapHighlightColor`, `--sapNegativeElementColor`, etc.
- [x] 1.5 Rewrite `openspec/specs/switch-component/spec.md` — token swap only (`--reltio-color-*` → `--sapField_BorderColor`, `--sapBrandColor`, `--sapHighlightColor`, `--sapField_Background`, `--sapContent_FocusColor`), document animated track + handle with translateX

## 2. Action components — `design` prop pattern

- [x] 2.1 Rewrite `openspec/specs/button-component/spec.md` — replace `variant`/`color` with `design` prop (default/emphasized/ghost/transparent/positive/negative/attention), replace `--reltio-button-*` with `--sapButton_*` tokens, document polymorphic button/anchor via `href`
- [x] 2.2 Rewrite `openspec/specs/button-icon-only/spec.md` — align with updated button-component spec, reference current icon-only mode implementation
- [x] 2.3 Rewrite `openspec/specs/banner-component/spec.md` — replace `color` with `design` prop (information/positive/critical/negative), document default icons per design, replace `--reltio-color-*` with `--sapInformationBackground`, `--sapSuccessBackground`, `--sapWarningBackground`, `--sapErrorBackground` and matching border/element color tokens
- [x] 2.4 Rewrite `openspec/specs/dialog-component/spec.md` — document native `<dialog>` with `showModal()`/`close()`, `header`/`footer` slots, scale/fade animation, replace `--reltio-color-*` with `--sapBackgroundColor`, `--sapContent_Shadow2`, `--sapBlockLayer_Background`, etc.

## 3. Display components — unique structures

- [x] 3.1 Rewrite `openspec/specs/avatar-component/spec.md` — update sizes to xs/s/m/l/xl (rem-based: 2/3/4/5/7rem), add `colorScheme` 1-10 with `--sapAvatar_{N}_*` tokens, document 3-level fallback (image → children → default icon), replace `--reltio-color-*` with `--sapAvatar_*` tokens
- [x] 3.2 Rewrite `openspec/specs/slider-component/spec.md` — full rewrite reflecting SAP slider: custom handle (rounded rect 32x24px with arrows), dual-layer track (inactive + active), end dots (8x8px), tickmarks with labels, tooltip, `showTooltip`/`showTickmarks`/`labelInterval` props, all `--sapSlider_*` tokens
- [x] 3.3 Rewrite `openspec/specs/tabs-component/spec.md` — rewrite as SAP Icon Tab Bar: `items` array API with `TabItem` type, `value`/`onValueChange`, 3px selection bar with `--sapTab_ForegroundColor`, `--sapTab_*` tokens, `--sapFontHeaderFamily`, bold 700 weight

## 4. Utility components — simple, quick

- [x] 4.1 Rewrite `openspec/specs/badge-component/spec.md` — replace `--reltio-color-*` with `--sapBrandColor` (primary), `--sapNegativeElementColor` (error), `--sapContent_ContrastTextColor` (text), document dot variant (no content = 8px circle) and max count
- [x] 4.2 Rewrite `openspec/specs/divider-component/spec.md` — replace `--reltio-color-*` with `--sapNeutralBackground` (line), `--sapContent_LabelColor` (label), document align prop and pseudo-element line technique
- [x] 4.3 Rewrite `openspec/specs/details-component/spec.md` — replace `--reltio-details-*` with `--sapGroup_ContentBackground`, `--sapBackgroundColor`, `--sapField_BorderColor`, `--sapTextColor`, `--sapBrandColor`, document native details/summary with custom chevron
- [x] 4.4 Rewrite `openspec/specs/skeleton-component/spec.md` — replace `--reltio-skeleton-*` with `--sapBackgroundColor` (base), `--sapNeutralBackground` (shimmer), document rows/size props and shimmer animation
- [x] 4.5 Rewrite `openspec/specs/popover-component/spec.md` — replace `--reltio-color-*` with `--sapGroup_ContentBackground`, `--sapField_BorderColor`, `--sapContent_Shadow1`, `--sapTextColor`, document CSS Anchor Positioning, header/footer slots, `positionArea` prop
- [x] 4.6 Rewrite `openspec/specs/error-message-component/spec.md` — replace `--reltio-error-message-*` with `--sapErrorBackground`, `--sapNegativeElementColor`, `--sapNegativeTextColor`, document icon + text layout
- [x] 4.7 Rewrite `openspec/specs/error-boundary-component/spec.md` — align with current class component API (children, fallback, onError), no token changes needed

## 5. Special components — unique structures

- [x] 5.1 Rewrite `openspec/specs/icon-library/spec.md` — replace Material Design 3 source with SAP `theming-base-content` repo, update `build-icons` script reference (was `generate-icons`), update sizes (small/medium/large/xlarge = 16/24/32/48px), update colors (inherited/primary/secondary/success/warning/error using `--sapBrandColor`, `--sapNeutralColor`, `--sapPositiveColor`, `--sapCriticalColor`, `--sapNegativeColor`), remove `--reltio-icon-*` CSS custom properties section, update Storybook stories structure
- [x] 5.2 Rewrite `openspec/specs/chip-component/spec.md` — document current API as-is (variant: filled/outlined, color: default/primary/success/warning/error, size: small/medium, icon, onRemove, onClick, disabled), replace `--reltio-chip-*` with actual `--sap*` tokens used, add note that future change will align to SAP Token component
- [x] 5.3 Rewrite `openspec/specs/treelist-component/spec.md` — document current rc-tree wrapper API (data/LabelComponent/expandedKeys/onExpand), note minimal SAP token usage (`--sapTextColor` only), update design.md alongside spec

## 6. Validation

- [x] 6.1 Verify by grep that no spec under `openspec/specs/` references `--reltio-color-`, `--reltio-button-`, `--reltio-tabs-`, `--reltio-chip-`, `--reltio-icon-`, `--reltio-textarea-`, `--reltio-details-`, `--reltio-skeleton-`, `--reltio-error-message-`, `--reltio-tree-list-`, or `Material Design 3` (excluding chat/assistant-loader/app-selector specs which are out of scope)
- [x] 6.2 Run `openspec validate sap-fiori-spec-sync --strict` and resolve any reported issues
