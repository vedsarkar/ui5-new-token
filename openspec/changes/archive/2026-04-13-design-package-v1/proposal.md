# Change: Design Package v1 — Base Component Library

## Why

The `@reltio/design` package currently exports only 10 components, Icons, and Color Tokens. Internal teams (Hub, Console, AgentFlow) need a comprehensive, stable base component library to build product UIs without reinventing primitives. The Figma Design System 3.1 (LTS) defines 38 UI components across 6 categories, but only a fraction has been implemented in code. This change establishes the v1 baseline — a set of foundational components that unblocks development of higher-level features across all Reltio applications, with a guaranteed backward-compatible API going forward.

## Context

### Current State

**Already implemented and exported (10):** Button, TextArea, Skeleton, ErrorBoundary, ErrorMessage, Markdown, TreeList, AppSelector, AssistantLoader, Chat

**Implemented but NOT exported (5):** Chip, Tabs, Dialog, Divider, Popover

**Not implemented (23+):** TextField, Checkbox, Radio, Switch, Avatar, Badge, Title, Slider, SegmentedButton, Banners, Accordion, Breadcrumbs, Tooltip, Search, Snackbar, Stepper, UploadBoxes, AppBar, Menu, SideNav, Profile, Metrics, DatePickers, Table, and more.

### Design References

The Figma Design System 3.1 (LTS) is used as directional guidance — not as a pixel-perfect specification. The Figma kit has known gaps, errors, and missing variants. Components MUST follow industry best practices from established design systems, in this priority order:

1. **SAP Fiori / UI5 Web Components** (primary) — Enterprise-grade, closest to Reltio's domain. Planned SAP integration makes API compatibility important. Reference: https://ui5.github.io/webcomponents/
2. **Material Design 3** (secondary) — Comprehensive specs, strong accessibility patterns.
3. **Ant Design / Shadcn/ui** (tertiary) — React-specific API patterns and developer ergonomics.

Components MUST include additional variants, states, and props beyond what Figma defines where industry standards expect them.

### Key SAP Fiori Patterns to Adopt

| Pattern | Description | Impact |
|---------|-------------|--------|
| **Value States** | Positive/Critical/Negative/Information/None | Use for all form components instead of success/warning/error |
| **Content Density** | Cozy/Compact/Condensed size modes | Consider for v1.1; v1 implements Medium (≈Cozy) only |
| **Title size/level independence** | Visual size and semantic heading level are separate props | Apply to Title component |
| **displayOnly state** | Distinct from disabled and readonly; for form review mode | Consider for form components |
| **valueStateMessage** | Structured validation messages as component slot/prop | Apply to TextField, Checkbox, Radio, etc. |
| **wrappingType** | Explicit text overflow control (None/Normal) | Apply to Checkbox, Radio, Tag/Chip, Title |

### Dependency Graph

Components form a directed acyclic graph where higher-level components depend on lower-level ones. This determines implementation order.

```
LEVEL 0 — Foundation (exists)
├── Color Tokens (variables.css)
├── Icons (200+)
├── classNames utility
└── HtmlProps type utility

LEVEL 1 — Atomic Primitives (v1.0 — this change implements these)
├── TextField          ← Icons
├── Checkbox           ← Icons
├── Radio              ← (none)
├── Switch             ← (none)
├── Avatar             ← Icons (fallback)
├── Badge              ← (none)
├── Title              ← (none)
├── Slider             ← (none)
├── SegmentedButton    ← (none)
├── Banners            ← Icons, Button
├── Accordion          ← Icons (chevron)
└── Breadcrumbs        ← Icons (separator)

LEVEL 2 — Composed (v1.1 — unlocked by L1)
├── Tooltip            ← Popover
├── Search             ← TextField, Button
├── Snackbar           ← Button, Icons
├── Stepper            ← Button, Badge, Divider
├── UploadBoxes        ← Button, Icons
└── AppBar             ← Button, Avatar

LEVEL 3 — Complex Compositions (v1.2 — unlocked by L1+L2)
├── Menu               ← Popover, Button, Checkbox, Radio, Divider
├── SideNav            ← Button, Badge, Tooltip, Divider
├── Profile            ← Avatar, Badge, Chip
├── Metrics            ← Title, Badge, Charts
└── DatePickers        ← TextField, Button, Popover

LEVEL 4 — Systems (v2+ — massive scope)
├── Table              ← Checkbox, Button, Pagination, Divider
├── FilterPanel        ← Checkbox, TextField, Menu, Button
├── Pagination         ← Button, Icons
├── Progress           ← (none)
├── Card               ← Divider, Button
├── RightPanel         ← Button, Divider
├── Toolbar            ← Button, Divider
├── RightNavigation    ← Button
├── ActivityLog        ← Avatar, Title, Divider
└── Condition          ← TextField, Menu, Button
```

## What Changes

### 1. Export 5 existing components (Wave 0)

Add Chip, Tabs, Dialog, Divider, Popover to `components/index.ts` so they become part of the public `@reltio/design` API.

### 2. Implement 9 new Level 1 components (Wave 1)

Each component follows the mandatory structure: `.tsx` + `.types.ts` + `.module.css` + `.stories.tsx` + `index.ts`.

| Component | Figma Page | Description |
|-----------|-----------|-------------|
| TextField | Text field | Single-line input with label, helper text, error state, startContent/endContent slots, clearable. Medium size only. |
| Checkbox | Selectors | Checkbox with label, indeterminate state, error state. Controlled-only. |
| Radio | Selectors | Radio button with label, error state. Controlled-only. Grouping is consumer responsibility. |
| Switch | Selectors | Binary on/off toggle with label. Minimal API. |
| Avatar | Avatar | User avatar with image → initials → icon fallback chain. 5 sizes, circle/square shape. |
| Badge | Badge | Wrapper component with count or dot indicator at top-right of children. |
| Banner | Banners | Inline notification strip with title, description, 4 color variants, dismissible. |
| Slider | Slider | Range input wrapping native `<input type="range">`. Reltio DS visual style. |
| Breadcrumbs | Breadcrumbs | Navigation breadcrumb trail with ChevronRight separator and Breadcrumb subcomponent. |

### 3. Update package exports

Update `components/index.ts` to include all 5 existing + 9 new components.

## Scope

### In scope
- 5 existing components added to package exports (Chip, Tabs, Dialog, Divider, Popover)
- 9 new L1 components with full implementation, stories, interaction tests, and specs
- Package version bump to 1.0.0

### Out of scope
- L2-L4 component implementation (separate proposals)
- Title, Accordion, SegmentedButton (deferred — need UX clarification or not needed for v1)
- Content Density system (v1 implements Medium only)
- Migration guides for existing consumers
- Visual regression test baseline setup
- Figma Code Connect mappings
- SAP theming/token compatibility layer

## Impact

- **Affected specs:** 33 new capability specs created
- **Affected code:**
  - `components/` — 12 new component directories
  - `components/index.ts` — updated exports (add 17 components: 5 existing + 12 new)
  - `packages/design/package.json` — version bump to 1.0.0
- **Dependencies:** No new npm dependencies. All components use native HTML, CSS Modules, and existing utilities (classNames, Icons).
- **Breaking changes:** None. This is purely additive.

## Design Principles for v1

1. **SAP Fiori as primary reference** — Follow SAP UI5 Web Components patterns for component API shape, value states, and enterprise-specific features (displayOnly, wrappingType). Adapt web component patterns to React idioms.
2. **Figma as direction, not spec** — Add missing variants/states/props that SAP and Material Design define. Don't block on Figma completeness.
3. **Minimal dependencies** — Use native HTML elements and CSS. No third-party component libraries.
4. **Forward-compatible API** — Design props with L2/L3 consumption in mind. E.g., TextField must support `icon`/`endContent` because Search will need it. Checkbox must support `indeterminate` because Table/Menu will need it.
5. **Accessible by default** — WCAG 2.1 AA compliance. Follow SAP's accessibility property patterns (`accessibleName`, `accessibleDescription`).
6. **Value State consistency** — All form components use a unified `valueState` prop with values: `None`, `Information`, `Positive`, `Critical`, `Negative` (aligned with SAP Fiori naming).

## Risks

- **Figma incompleteness:** TextField Small variant, and potentially other variants, are missing from Figma. Implement based on SAP/MD3 specs; align with design team later.
- **Spec drift:** L2/L3 specs may need revision once L1 components are built and real integration begins. This is expected and acceptable.
- **Scope creep:** 12 components is significant. Strict adherence to L1 boundary prevents scope expansion.
- **SAP alignment depth:** Full SAP Fiori compatibility may require deeper token/theming work in future versions. v1 adopts API patterns but uses Reltio's own token system.
