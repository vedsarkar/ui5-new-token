# SAP Fiori for Web — Migration Progress

## Context

Reltio Design Platform migrates to SAP Fiori for Web design system. Native React implementation — no `@ui5/webcomponents` wrapper. Library is v0, backward compatibility not required.

**Decisions:**
- API naming: SAP Fiori terminology (`design`, `valueState`, `colorScheme`)
- Reference: Figma UI Kit (visual) + UI5 Web Components GitHub (behavioral) + SAP design guidelines (UX)
- Controlled-only components (no defaultValue/uncontrolled)
- Figma UI Kit: `https://www.figma.com/design/Aggl8tUjJlAolRvnoSJOxo/SAP-Fiori-for-Web-UI-Kit--Community-`

**Important:** After changing `.module.css` files, run `npm run build-css` to regenerate `.module.css.ts` declarations, then restart Storybook.

---

## Phase 0: Infrastructure & Existing Component Audit

### 0A. Shared Infrastructure — DONE

| File | Purpose |
|------|---------|
| `utils/valueState.ts` | `ValueState` type + `getValueStateConfig()` — maps states to SAP tokens and ARIA |
| `utils/formTypes.ts` | `FormControlBase` shared type for all form controls |
| `hooks/useId.ts` | Unique ID generator (React 17 polyfill for `useId`) |
| `hooks/useKeyboardNavigation.ts` | Roving tabindex for lists, menus, tabs |
| `hooks/useOverflow.ts` | Overflow detection for "More" button pattern |

### 0B. Component Audits

| Component | Status | Key Changes |
|-----------|--------|-------------|
| **Button** | DONE | `variant`/`color` → `design` prop (default/emphasized/ghost/transparent/positive/negative/attention). SAP tokens: `--sapButton_*`. Border-radius: `--sapButton_BorderCornerRadius`. All consumers updated. |
| **Avatar** | DONE | Sizes: XS=2rem, S=3rem, M=4rem, L=5rem, XL=7rem. Added `colorScheme` (1-10) with `--sapAvatar_*` tokens. Size names: `xs/s/m/l/xl`. |
| **TextField** | DONE | `error` boolean → `valueState` + `valueStateMessage`. All 4 states (Error/Warning/Success/Information) with proper `--sapField_*` tokens. Border-radius: `--sapField_BorderCornerRadius`. |
| **TextArea** | DONE | Migrated to `HtmlProps` pattern. `supportingText`/`error` → `valueState`/`valueStateMessage`. Label changed from MUI floating style to simple label above field (consistent with TextField). |
| **Checkbox** | DONE | `error` → `valueState` prop with Error/Warning support |
| **Radio** | DONE | `error` → `valueState` prop with Error/Warning support |
| **Switch** | DONE | Minor — no breaking changes needed |
| **Banner** | DONE | `color` → `design` prop (information/positive/critical/negative). SAP naming. |
| **Dialog** | DONE | Minor — no breaking changes needed |
| **Slider** | DONE | Full rewrite from Figma spec. Handle: rounded rect 32×24px with `<>` arrows (not circle). Track: 4px bar + 2px active + 8×8px end dots. Tickmarks with semantic coloring. `--sapSlider_*` tokens. New props: `showTooltip`, `showTickmarks`, `labelInterval`. |
| **Tabs** | DONE | Rewritten to SAP Icon Tab Bar (Inline Mode). `--sapTab_*` tokens. Selection bar: 3px, `--sapTab_ForegroundColor`. Bold 700 weight. Header shadow. Rich stories: semantic colors, icon only, icon+text, badges, process tabs, filter tabs semantic. |
| **Breadcrumbs** | PENDING | Need overflow collapsing behavior via `useOverflow` |

---

## Phase 1: Core Primitives — IN PROGRESS

3 components (Icon already done, remaining built sequentially):

| Component | SAP Equivalent | Key Props | Status |
|-----------|---------------|-----------|--------|
| **Icon** | ui5-icon | `size`, `color` | DONE |
| **BusyIndicator** | ui5-busy-indicator | `active`, `size` (S/M/L), `text` | PENDING |
| **ProgressIndicator** | ui5-progress-indicator | `value`, `valueState`, `displayValue` | PENDING |
| **Token** | ui5-token (Chip→Token) | `text`, `readOnly`, `selected`, `onDelete` | PENDING |

**Removed from Phase 1:** Label, Title, Link (too primitive, CSS-only), ObjectStatus (no clear Fiori equivalent), RatingIndicator (unused in Reltio apps), Bar (too simple).

---

## Phase 2: Form Controls & Selection — PENDING

10 components. Depend on Phase 0 + Phase 1.

| Component | Dependencies |
|-----------|-------------|
| **Select** | Popover, Icon, Label |
| **List / ListItem** | Icon, BusyIndicator |
| **Menu / MenuItem** | Popover, List, Icon |
| **StepInput** | TextField, Icon |
| **SegmentedButton** | Icon |
| **ComboBox** | TextField, Popover, List, Icon |
| **MultiComboBox** | ComboBox, Token |
| **RadioGroup** | Radio |
| **SplitButton** | Button, Menu |
| **MenuButton** | Button, Menu |

---

## Phase 3: Navigation & Overlay — PENDING

Toast, Tooltip, Card, Panel, Toolbar, SideNavigation, Pagination, AvatarGroup, FileUploader, IllustratedMessage

## Phase 4: Data Display — PENDING

Table, Calendar, DatePicker, TimePicker, Carousel, Wizard, ColorPicker, TokenInput

## Phase 5: Layout & Page — PENDING

Page, DynamicPage, FlexibleColumnLayout, FilterBar, ShellBar

---

## Per-Component Workflow

1. **Figma MCP** → `get_design_context` / `get_screenshot` for visual spec
2. **UI5 source** (`packages/main/src/`) → extract props, events, keyboard, ARIA
3. **Implement**: `.types.ts` → `.module.css` → `.tsx` → `.stories.tsx` → `index.ts`
4. **Run** `npm run build-css` after CSS changes
5. **Run** `npm run format && npm run lint`
6. **Verify** in Storybook (restart after build-css)

## Key Figma References

- Slider: `node-id=19-2025`
- Tab Container (Icon Tab Bar): `node-id=24850-11169`
- Slider Handle: `node-id=104879-14509`
- Filter Tabs Semantic Cozy XL: `node-id=367426-8352`
