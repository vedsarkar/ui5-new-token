---
"@reltio/design": patch
---

Align the carousel navigation bar and active dot with the design

Two corrections, plus a story for the design's primary arrow placement.

**Active dot colour** — the design fills it with `sapTextColor` (`#111727`), a
near-black that reads as "you are here". UI5 binds it to
`sapContent_Selected_ForegroundColor`, which renders brand blue (`#0000cc`). The
border is set alongside the background because UI5 draws the dot with border-box
sizing and a 1px border from the same token, so leaving the border blue would
ring the near-black fill.

**Navigation bar height** — the design's bar is 56px; UI5 hardcodes `2.75rem`
(44) on the wrapper with no variable behind it, so neither a token nor a document
rule reaches it. Corrected through `addCustomCSS` in
`utils/applyComponentCorrections.ts`.

**Everything else already matched.** All nine tokens the carousel binds, the
`sapPageFooter_Background` bar fill (`#fcfeff80`), the inactive dot at
`sapContent_ForegroundBorderColor`, both dot sizes (8px active, 4px inactive)
sitting in the design's 16px slots, and the 36x36 fully-round arrow buttons
filled `#fcfeff`.

**New story: `ArrowsOnNavigation`**

The design's default variant places the arrows on the bar ("Buttons Position=On
Bar"); UI5's default `arrowsPlacement` is `Content`, which is the design's "On
Image" variant. The stories only covered the default, so the design's primary
layout was never rendered. The new story sets `arrowsPlacement="Navigation"` and
was used to verify the on-bar arrows land in the 56px bar alongside the dots.

One behavioural difference is left as-is: UI5 reveals the arrows on hover, where
the design shows them persistently. UI5 also hides the back arrow on the first
slide when the carousel is not cyclic, which is correct behaviour rather than a
divergence.
