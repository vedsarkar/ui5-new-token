## Approach

Each spec rewrite follows a mechanical process: read the current implementation (`.types.ts`, `.module.css`, `.tsx`, `.stories.tsx`), then rewrite the spec to describe what exists. No design decisions are being made — only documentation is being corrected.

## Spec Rewrite Rules

### Token References
- Replace every `--reltio-color-*` and `--reltio-{component}-*` reference with the actual `--sap*` token used in the component's `.module.css`
- Do not invent token mappings — only document tokens that appear in the current CSS
- Group tokens by purpose (e.g., "border colors", "background colors", "text colors") rather than listing them flat

### Prop APIs
- Match prop names, types, and defaults exactly to the current `.types.ts`
- Use the actual TypeScript type unions (e.g., `"default" | "emphasized" | "ghost" | "transparent" | "positive" | "negative" | "attention"`)
- Document `HtmlProps<Tag, CustomProps>` pattern where used
- Note which props come from shared types (`FormControlBase`, `ValueState`)

### CSS Custom Properties Sections
- Remove entirely. Per project convention (`AGENTS.md`), components do not expose CSS custom properties as a customization API. External customization is done through React props, stable CSS classes, and `--sap*` tokens.
- Exception: if a component genuinely uses an internal CSS variable (set and consumed on same element), document it as an implementation detail, not a public API.

### Design System References
- Remove all "Material Design 3" references
- Add "SAP Fiori for Web" or "SAP Horizon" references where the component has a direct SAP equivalent
- Reference SAP component names: ui5-button, ui5-avatar, ui5-input, ui5-textarea, ui5-checkbox, ui5-radio-button, ui5-switch, ui5-message-strip, ui5-dialog, ui5-slider, ui5-tabcontainer, ui5-icon
- Do not reference SAP for utility components without a direct SAP equivalent (Badge, Divider, Details, Skeleton, ErrorMessage, ErrorBoundary)

### Scenarios
- Update scenarios to reflect current behavior (e.g., `valueState="Error"` not `error={true}`)
- Remove scenarios for features that don't exist in current code
- Add scenarios for features that exist in code but are missing from spec
- Keep accessibility scenarios (ARIA, keyboard) — update token/prop names within them

### Stories
- Update story names and descriptions to match current `.stories.tsx`
- Ensure story list matches the one-variant-per-story convention

## Component-Specific Notes

| Component | Key Changes in Spec |
|-----------|-------------------|
| **Button** | `variant`/`color` → `design` (7 values). Polymorphic button/anchor via `href`. Icon-only mode. |
| **Avatar** | Sizes xs/s/m/l/xl (rem-based). `colorScheme` 1-10 with `--sapAvatar_*` tokens. 3-level fallback (image → children → default icon). |
| **TextField** | `error: boolean` → `valueState` (5 states via `FormControlBase`). `supportingText` → `valueStateMessage`. `showClearIcon` → `clearable`. `startContent`/`endContent` slots. |
| **TextArea** | Same valueState migration as TextField. New `toolbar` slot. `field-sizing: content` for auto-expand. Grid layout. |
| **Checkbox** | Add `indeterminate` prop. `valueState` for error/warning. Custom indicator with check/dash SVG icons. |
| **Radio** | `valueState` for error/warning. Custom circular indicator. |
| **Switch** | Minimal changes — token swap only. Animated track + handle. |
| **Banner** | `color` → `design` (information/positive/critical/negative). Default icon per design. `dismissible` + `onDismiss`. |
| **Dialog** | Native `<dialog>` with `showModal()`. `header`/`footer` slots. Scale/fade animation. `--sapContent_Shadow2`. |
| **Slider** | Full rewrite: custom handle (rounded rect), dual-layer track, tickmarks with labels, tooltip, semantic slider tokens (`--sapSlider_*`). |
| **Tabs** | SAP Icon Tab Bar pattern. `items` array API. `--sapTab_*` tokens. 3px selection bar. `--sapFontHeaderFamily`. |
| **Icon Library** | SVG source: SAP `theming-base-content` repo. `build-icons` script. Sizes: small/medium/large/xlarge. Colors: inherited/primary/secondary/success/warning/error using `--sap*` semantic tokens. |
| **Chip** | Document current API as-is (variant/color/size/onRemove). Note: future change will align to SAP Token component. |
| **TreeList** | Document current rc-tree wrapper API. Minimal SAP tokens (only `--sapTextColor`). |

## Ordering

Specs can be rewritten in any order — there are no dependencies between them. For efficiency, batch by similarity:
1. Form controls (TextField, TextArea, Checkbox, Radio, Switch) — share `FormControlBase`/`ValueState` patterns
2. Action components (Button, Banner, Dialog) — share `design` prop pattern
3. Display components (Avatar, Slider, Tabs) — each unique
4. Utility components (Badge, Divider, Details, Skeleton, Popover, ErrorMessage, ErrorBoundary) — simple, quick
5. Special (Icon Library, Chip, TreeList) — unique structures
