# Button Component Design

## Context

The Button is a foundational UI element in the Reltio Design Platform, now aligned with SAP Fiori design system. It supports 7 design variants, polymorphic rendering (button/anchor), icon-only mode, and full keyboard accessibility.

**Key Constraints:**
- SAP Fiori design system compliance (SAP Horizon tokens)
- Polymorphic rendering based on `href` prop
- WCAG 2.1 Level AA accessibility
- Modern evergreen browsers only

## Decisions

### Decision: Polymorphic Button vs Anchor Rendering

**Choice:** Conditional rendering based on `href` prop — `<a>` when href is present, `<button>` otherwise.

**Rationale:** Semantic HTML (links for navigation, buttons for actions), better accessibility, native browser behaviors (right-click, cmd+click on links).

### Decision: Design Variants via SAP Tokens

**Choice:** 7 design variants using `--sapButton_*` token families: default, emphasized, ghost, transparent, positive, negative, attention.

**Rationale:** Direct mapping to SAP Fiori button types. Each variant has its own Background/BorderColor/TextColor token set with Hover and Active states.

### Decision: Automatic Icon-Only Detection

**Choice:** Detect icon-only mode when children is a single React component element.

**Rationale:** Eliminates the need for a separate IconButton component. The detection logic (`React.Children.count === 1 && isValidElement && typeof type !== "string"`) reliably identifies icon-only usage.

### Decision: Automatic Focus Removal on Disable

**Choice:** `useEffect` blurs button when it becomes disabled while focused.

**Rationale:** Better UX and accessibility — prevents keyboard users from being stuck on a disabled element.

### Decision: Single Variant Per Storybook Story

**Choice:** Each story shows ONE variant.

**Rationale:** Better visual regression testing isolation, clearer documentation.
