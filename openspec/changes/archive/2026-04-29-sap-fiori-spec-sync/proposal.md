## Why

All existing component specifications reference the legacy `--reltio-color-*` CSS token namespace and pre-SAP prop naming conventions (`variant`, `color`, `error: boolean`). The actual implementations have already been migrated to SAP Fiori naming (`design`, `valueState`, `colorScheme`) and `--sap*` Horizon tokens as part of the `adopt-sap-horizon-tokens` change and subsequent Phase 0B component audits.

The specs are now misleading — they describe APIs and tokens that no longer exist in the code. Any AI agent or developer reading the specs will get incorrect guidance about component APIs, token names, and design system references. Some specs even reference Material Design 3, which is no longer the visual foundation.

This change brings all existing component specifications into alignment with the current SAP Fiori-based implementations. No code is modified — this is a documentation-only change.

## What Changes

Rewrite 21 component specifications to match their current implementations:

**Group A — Phase 0B migrated components (code already uses SAP naming + `--sap*` tokens, specs outdated):**
- Button (spec: `variant`/`color` → code: `design` prop with 7 SAP values)
- Button Icon-Only (spec: references old button API)
- Avatar (spec: `size: "sm"/"md"` → code: `size: "xs"/"s"/"m"/"l"/"xl"`, `colorScheme` 1-10)
- TextField (spec: `error: boolean`, "Material Design 3" → code: `valueState`, SAP field tokens)
- TextArea (spec: `error`/`supportingText` → code: `valueState`/`valueStateMessage`, `toolbar` slot)
- Checkbox (spec: `checked`, `--reltio-color-*` → code: `valueState`, `indeterminate`, `--sap*`)
- Radio (spec: `value`, `--reltio-color-*` → code: `checked`, `valueState`, `--sap*`)
- Switch (spec: `--reltio-color-*` → code: `--sap*`)
- Banner (spec: `color` → code: `design` prop with 4 semantic values)
- Dialog (spec: `--reltio-color-*` → code: `--sap*`, native `<dialog>`)
- Slider (spec: basic → code: full SAP rewrite with handle, tickmarks, tooltip)
- Tabs (spec: `--reltio-tabs-*` → code: SAP Icon Tab Bar with `--sapTab_*`)
- Icon Library (spec: Material Design 3 source → code: SAP icon set from `theming-base-content`)

**Group B — Utility components (code already uses `--sap*` tokens, specs outdated):**
- Badge (`--reltio-color-*` → `--sapBrandColor`, `--sapNegativeElementColor`)
- Divider (`--reltio-color-*` → `--sapNeutralBackground`, `--sapContent_LabelColor`)
- Details (`--reltio-details-*` → `--sapGroup_ContentBackground`, `--sapField_BorderColor`)
- Skeleton (`--reltio-skeleton-*` → `--sapBackgroundColor`, `--sapNeutralBackground`)
- Popover (`--reltio-color-*` → `--sapContent_Shadow1`, CSS Anchor Positioning)
- ErrorMessage (`--reltio-error-message-*` → `--sapErrorBackground`, `--sapNegativeElementColor`)
- ErrorBoundary (no token changes, but spec needs alignment with current API)
- Chip (`--reltio-chip-*` → `--sap*` semantic tokens)

**For each spec, the rewrite includes:**
- Replace all `--reltio-*` token references with actual `--sap*` tokens used in the CSS
- Update prop names and types to match current `.types.ts`
- Remove Material Design 3 references; add SAP Fiori / Horizon references where relevant
- Update scenarios to reflect current behavior
- Remove CSS Custom Properties sections that describe `--reltio-*` component-level variables (per project convention: no component-level CSS custom properties)

## Capabilities

### Modified Capabilities
All 21 components listed above have existing specs under `openspec/specs/`. Each spec is rewritten to reflect the SAP Fiori implementation already in place.

No new capabilities are introduced.

### Unchanged Capabilities (explicitly out of scope)
- `chat-component`, `assistant-loader-component`, `app-selector-component` — Reltio-specific, not part of SAP migration
- All chart specs (`chart-core`, `line-chart`, `bar-chart`, etc.) — separate migration track
- `typography-foundation`, `use-text-stream`, `diagram-*` — no changes needed
- `treelist-component` design.md — structural document, not a token-dependent spec

## Impact

- **Affected code**: None. This is a documentation-only change.
- **Affected artifacts**: 21 spec files under `openspec/specs/`
- **Affected systems**: AI agents consuming specs for implementation guidance will now get accurate API descriptions
- **Dependencies**: Depends on `adopt-sap-horizon-tokens` being complete (it is: 70/77 tasks done, remaining 7 are manual verification)
- **Risk**: Low. Specs are descriptive, not prescriptive — they document what exists. Incorrect spec rewrites would be caught when specs are used for future implementation work.

## Out of scope

- Chip → SAP Token component rename and API change (separate change)
- TreeList → SAP Tree alignment (separate change)
- Breadcrumbs → useOverflow behavior (separate change)
- Phase 1-5 new component specs (separate changes, one per component)
- Chart component specs migration
- Code changes of any kind
