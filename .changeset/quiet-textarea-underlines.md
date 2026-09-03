---
"@reltio/design": patch
---

Redraw the TextArea field surface as a bottom edge, matching the design

`TextArea` is a Reltio component rather than a UI5 wrapper — a native
`<textarea>` chosen so it works inside `<form>`, forwards refs and auto-grows —
but its README commits it to SAP Horizon visuals, and the field surface had
drifted from them. It drew a full 1px box in every state where the design draws
a fill plus a bottom edge only.

What changed, all through existing `--sapField_*` tokens:

- **Rest** — the box becomes a 1px bottom edge in `sapField_BorderColor`.
- **Hover** — new state, previously absent: `sapField_Hover_Background` with a
  1px `sapField_Hover_BorderColor` edge.
- **Focus** — a 2px `sapField_Active_BorderColor` box replaces the edge, on the
  resting fill. This is the focus indicator on its own; the former 1px
  `sapField_Focus_BorderColor` border plus inset `sapContent_FocusColor` ring is
  gone, because the design shows a single 2px border.
- **Value states** — state fill plus a bottom edge instead of a coloured box.
  Weights follow the design: 2px for error, warning and information, 1px for
  success.
- **Read-only** — a solid 1px `sapField_ReadOnly_BorderColor` box, replacing a
  dashed border the design does not use. Read-only is focusable and the design
  has no variant for it, so its box recolours on focus rather than gaining a
  second treatment.
- **Disabled** — keeps the resting fill and edge at 0.4 opacity, matching the
  design's variant. It previously swapped in the read-only fill.

Consumers see a visibly different control: no box at rest, and a hover state
where there was none. No API change.
