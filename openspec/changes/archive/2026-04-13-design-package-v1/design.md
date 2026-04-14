# Design: Design Package v1 — Batch 1 (TextField, Checkbox, Radio, Switch)

## Context

First implementation batch of L1 atomic components. These are form primitives that unlock L2/L3 components (Search, Menu, FilterPanel, Table). All four wrap native HTML form elements inside `<label>` for implicit association. All are controlled-only.

**Constraints:**
- React 17+ compatibility (forwardRef for ref support)
- CSS Modules + classNames() utility (constitution requirement)
- Global --reltio-color-* tokens for all colors
- No new npm dependencies
- Material Design 3 as default visual style

## Goals / Non-Goals

**Goals:**
- Implement 4 form primitives with minimal, forward-compatible API
- Establish patterns (label wrapping, error prop, rest props, startContent/endContent) reusable by future components
- Default MD3 look, with HTML structure that supports future CSS-only theming (SAP Fiori)

**Non-Goals:**
- Multiple themes (v1 ships MD3 only)
- Content density modes (Cozy/Compact/Condensed)
- valueState enum (v1 uses simple `error` boolean)
- Uncontrolled mode
- Size variants for TextField (Medium only)

## Decisions

### Decision: `<label>` wrapping instead of htmlFor/id

**Choice:** All form components wrap `<input>` inside `<label>`.

**Rationale:**
- No need for generated IDs — simpler, less code
- Click-to-focus works automatically via HTML spec
- Fewer props to manage and test
- Works identically across all browsers

**Trade-off:** Cannot place label and input in separate DOM locations. Acceptable for our use cases.

### Decision: Controlled-only components

**Choice:** No defaultValue/defaultChecked. Only value/checked + onChange.

**Rationale:**
- Simpler implementation and testing
- Explicit data flow — easier to debug
- Most real-world usage in Reltio apps is controlled (form libraries, state management)
- Can add uncontrolled support later without breaking changes

### Decision: `error` boolean instead of valueState enum

**Choice:** Single `error` boolean prop for validation feedback.

**Rationale:**
- Developer-friendly: `error` is universally understood
- Minimal API for v1 — covers 90%+ of real use cases
- Future expansion path: add `warning`/`success`/`info` booleans, or a `status` enum — neither breaks existing usage
- SAP's valueState naming (Positive/Critical/Negative) is enterprise-specific and unfamiliar to most React developers

### Decision: `...rest` forwarding to native element

**Choice:** All unrecognized props forwarded to the underlying native element.

**Rationale:**
- No need to explicitly define every HTML attribute (type, name, maxLength, pattern, aria-*, data-*, etc.)
- Developers get full native element API automatically
- Storybook stories demonstrate common HTML attribute patterns
- Keeps TypeScript types clean via HtmlProps utility

### Decision: `startContent`/`endContent` slot naming

**Choice:** Use `startContent`/`endContent` for content slots (TextField for now, pattern for future components).

**Rationale:**
- Directional-agnostic (works with RTL)
- Clear and descriptive
- Consistent naming pattern across all components that need content slots

### Decision: RadioGroup manages selection, not individual Radios

**Choice:** Radio has `value` + `children` + `disabled`. No `checked`/`onChange`. RadioGroup owns selection via `value` + `onChange`.

**Rationale:**
- Enforces mutual exclusion at the group level
- Simpler mental model for developers
- Matches native radio behavior (name-based grouping)
- RadioGroup generates shared `name` internally via `useId`

### Decision: CSS-only theming architecture

**Choice:** Component renders semantic HTML. All visual styling via CSS Modules. Theme switching = different CSS file.

**Rationale:**
- No theme prop, no ThemeProvider, no JS-level theming
- Same React component code works with MD3, SAP Fiori, or any future theme
- Stable CSS classes (via classNames utility) provide theming hooks
- Aligns with project principle "everything as code"

**Example:** TextField label is positioned above input in MD3 CSS. Future SAP CSS could move it to float inside the input border — same HTML, different stylesheet.

### Decision: forwardRef for React 17/18 compat

**Choice:** Use forwardRef in implementation for ref support.

**Rationale:**
- React 17/18 need forwardRef for consumers to access native input
- React 19 treats ref as regular prop (forwardRef deprecated but still works)
- Form libraries (react-hook-form) need ref to native input
- When we drop React 17/18, simply remove the forwardRef wrapper

## Risks / Trade-offs

**Risk:** Label-wrapping pattern limits layout flexibility.
→ Acceptable: all current designs have label adjacent to input. If a future design requires separated layout, we can add a `renderLabel` slot.

**Risk:** Controlled-only may frustrate developers wanting quick prototyping.
→ Acceptable: Reltio apps always use state management. Quick prototyping isn't the primary use case.

**Risk:** `error` boolean may be insufficient for complex form validation.
→ Mitigated: `helperText` prop shows custom error messages. Future `status` prop can extend without breaking changes.
