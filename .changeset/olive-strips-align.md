---
"@reltio/design": minor
---

Resync the semantic colour family and give nested buttons the pill radius

**15 light-mode semantic tokens** had drifted from the design. Checking the
Message Strip surfaced six, but the same shift ran through the whole semantic
family, so all 34 semantic variables were re-diffed against Figma rather than
patching one page's worth:

- Message borders: `sapMessage_InformationBorderColor` `#aaceff`→`#6194db`,
  `sapMessage_SuccessBorderColor` `#d7f38c`→`#7b982a`,
  `sapMessage_WarningBorderColor` `#ffe066`→`#ffe770`,
  `sapMessage_ErrorBorderColor` `#ff94cb`→`#db66a3`
- Element colours: `sapPositiveElementColor` `#3b9564`→`#30915c`,
  `sapCriticalElementColor` `#ee6611`→`#b73e0b`,
  `sapNeutralElementColor` and `sapNeutralBorderColor` `#9da6c5`→`#637ac5`
- Status colours: `sapErrorColor`, `sapNegativeColor`, `sapNegativeTextColor`
  `#b40c0c`→`#ad1414`, `sapWarningColor` `#ee6611`→`#b65e0c`,
  `sapCriticalColor` `#f79400`→`#e76500`, `sapCriticalTextColor`
  `#be520e`→`#b44f00`, `sapPositiveTextColor` `#2a6d47`→`#1e663e`

Dark mode matched on all 34, consistent with light being the mode under active
revision. `sapPositiveElementColor` is the same shift already applied to
`sapField_SuccessColor`, which is what suggested the family had been missed.

**Nested buttons now get the design's pill radius.** `variables.css` remaps
`--sapButton_BorderCornerRadius` to the `_Max` value, but as a document
selector it never matches a button UI5 renders inside another component's
shadow root — the Message Strip's close button kept the stock 8px against the
design's pill. `utils/applyComponentCorrections.ts` re-declares it (plus the
two focus-ring radii, which otherwise clip outside the pill) on `:host`, so
nested and top-level buttons agree.

**Fixed a broken story.** `MessageStrip` exported `Warning` with
`design: "Warning"`, which is not in UI5's `MessageStripDesign` enum — it
renamed the value to `Critical` — so that story rendered with no design styling
at all. It is now `Critical`, matching both UI5's API and the design's naming.
