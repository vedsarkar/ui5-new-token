## Context

`Form` already renders a native `<form>` around the UI5 Form floorplan for `onSubmit` serialization and ref forwarding (`components/Form/Form.tsx`). `FormProps` is built from UI5 `ComponentPropsWithoutRef`, and `...rest` is spread onto `<Ui5Form>`. Native form identity (`id`) and ARIA naming attributes therefore do not land on the element that actually owns submission — or they may incorrectly target the layout web component.

Consumers need standard HTML form labelling (`id`, `aria-label`, `aria-labelledby`, `aria-describedby`, other `aria-*`) for accessibility and for associating external headings / helper text with the form region.

## Goals / Non-Goals

**Goals:**
- Apply `id` and ARIA attributes to the outer native `<form>`.
- Keep UI5 layout/accessibility props (`headerText`, `accessibleMode`, `layout`, `labelSpan`, …) on the inner UI5 Form only.
- Type the public API so TypeScript accepts these attributes.
- Document and demonstrate usage in README + Storybook.

**Non-Goals:**
- No change to submit serialization, layout defaults, or `FormGroup` / `FormItem`.
- No new Reltio-specific ARIA prop names (use native `aria-*`).
- No form-level validation, live region announcements, or error-summary patterns in this change.
- Not required to re-plumb every native `<form>` attribute (e.g. `action`, `method`, `novalidate`) unless already needed — focus is `id` + ARIA. Optionally merge `className` onto the outer form when splitting props if it currently leaks to Ui5Form.

## Decisions

### D1 — Native attrs on `<form>`, UI5 props on `<Ui5Form>`
Destructure (or partition) `id` and `aria-*` from props and set them on the outer `<form>`. Forward remaining UI5 props via `...rest` to `<Ui5Form>`.

*Why:* matches HTML semantics — the form control that submits should carry the accessible name. *Alternatives considered:* (a) also set the same attrs on Ui5Form — risk of duplicate/conflicting names; (b) only document passing attrs via a new `formProps` bag — worse DX than native attribute names.

### D2 — Type via `AriaAttributes` + `id`, keep UI5 prop intersection
Extend `FormProps` with React `AriaAttributes` and optional `id?: string` (or an equivalent `Pick` from `ComponentPropsWithoutRef<"form">`). Do not switch the whole type to bare `HtmlProps<"form", …>` without careful `Omit` of colliding keys with UI5 Form props.

*Why:* minimal, additive typing that covers the ticket without rewriting the UI5 prop surface. Full `HtmlProps<"form", …>` remains a future option if more native form attrs are needed.

### D3 — One Storybook story for free-form a11y props
Add a single story (e.g. `WithAriaLabel` or `WithFormIdentity`) showing `id` + `aria-labelledby` or `aria-label`. Per Storybook conventions, free-form props need only one demonstrating story.

## Risks / Trade-offs

- **[Risk] Remaining `aria-*` keys left in `...rest` still reach Ui5Form** → Mitigation: either explicitly destructure common ARIA props *and* strip any remaining `aria-*` keys before spreading to Ui5Form, or document that only listed attrs are supported and strip those. Prefer stripping all `key.startsWith("aria-")` when partitioning so undocumented ARIA attrs also land on `<form>`.
- **[Risk] UI5 Form already has accessibility-related props (e.g. `accessibleName*`)** → Mitigation: leave those on Ui5Form; they name the layout region, not the native form. README clarifies the split.
- **[Risk] Consumers already pass `id` expecting it on Ui5Form** → Mitigation: unlikely / ineffective for native form labelling today; moving `id` to `<form>` is the correct accessible target (additive fix).

## Migration Plan

- Additive; no consumer migration required.
- Ship with existing minor changeset (`.changeset/support-form-id-aria.md`).
- Rollback: revert the Form prop-split commit.

## Open Questions

- None blocking. Optional stretch: apply consumer `className` to the outer `<form>` via `classNames(styles.root, className)` while implementing the split (documented if done).
