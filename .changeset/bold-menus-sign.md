---
"@reltio/design": patch
---

Correct the User Menu's account name weight and Sign Out radius

Two corrections in `utils/applyComponentCorrections.ts`:

- **Account name** — Bold in the design, `sapFontSemiboldDuplexFamily` in UI5.
  The size was already right (`sapFontLargeSize`, 16px), so only the family
  moves. As with the Time Picker's clock numbers, the SAP 72 weights ship as
  separate families rather than weights of one family, so `font-weight` would
  have done nothing.
- **Sign Out** — a pill in the design, rendered at the stock 0.5rem. This is the
  fourth place the nested-button radius has come up, after the Message Strip
  close button, the Time Picker and the Toolbar.

The Sign Out fix is scoped to that one button rather than every button in the
User Menu's shadow root, and deliberately so: the design pills the footer action
but keeps in-content actions at 8px — "Manage Accounts" and the Other Accounts
panel buttons are all 8px — so a blanket rule would be wrong even within this
one component.

Everything else already matched: the 320px popover at a 16px radius with no
shadow, the 80px round avatar, the 14px `sapContent_LabelColor` subline, and the
menu rows at 304×40 with 14px `sapList_TextColor` titles and
`sapContent_NonInteractiveIconColor` leading icons.

Not addressed, because they are API scope rather than styling: the design's
"Manage Accounts" action and its collapsible "Other Accounts" panel of 72px
account rows have no counterpart in this wrapper, which deliberately takes a
single `user`. Adding multi-account switching is a product decision.
