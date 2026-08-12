---
"@reltio/design": patch
---

Fix `TenantSelector` rendering only a fraction of the dialog viewport on first open when the tenant list is large enough to virtualize. UI5's `TableVirtualizer` measured its `clientHeight` in `onTableAfterRendering`, which fired before the Dialog's flex layout had settled — the reading came back as ~0 and the virtualizer emitted a range wide enough only for overscan (~11 rows), leaving the lower half of the viewport blank until the user scrolled. Now the virtualizer is reset from the Dialog's `open` event (fired after `renderFinished`), so it re-measures against the stable, final viewport and emits a range that fills it (RP-194945).
