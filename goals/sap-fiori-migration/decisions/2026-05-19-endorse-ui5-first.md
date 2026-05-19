---
title: "Endorse UI5 first, wrap only for Reltio product logic"
date: 2026-05-19
---

# Endorse UI5 first, wrap only for Reltio product logic

When a UI5 component fits the design as-is, we **endorse** it (documentation-only directory + re-export) and apps import it directly from `@reltio/design/components`. We only build a Reltio wrapper when there is real product logic to add — composing several UI5 components for an MDM workflow (entity profile, source priority, match group review) or filling a primitive gap UI5 does not cover.

**Restyling is not a reason to wrap.** Visual customization is done through `--sap*` design tokens (preferred — UI5 reads them through Shadow DOM automatically) or CSS Parts (`::part(...)`) for fine-grained tweaks no token covers.

## Rationale

- **Wrappers create maintenance debt.** Every wrapper is code we have to keep in sync with UI5 upgrades. With 163 UI5 components in scope, wrapping each one would have made the platform unmaintainable.
- **Wrappers slow UI5 upgrades.** A pinned UI5 version with no wrappers can be bumped in one CoE release. A version bump with 40+ wrappers requires touching every wrapper, even when the change is purely additive in UI5.
- **Tokens already solve the styling case.** SAP Horizon's `--sap*` token system covers the entire design surface. Restyling a component in CSS is faster, cheaper, and lower-risk than wrapping it.
- **The decision is reversible.** A documentation-only endorsement can graduate to a full Reltio component later if real product logic emerges. The reverse (deleting a wrapper) is much harder once apps depend on it.
