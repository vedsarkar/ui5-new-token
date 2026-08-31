---
"@reltio/design": patch
---

Re-sync the token surface with Figma — three light-mode button backgrounds

Dumped all 953 `sap*`-named variables from the Figma **Horizon** collection
(Morning Horizon / Evening Horizon modes) through the Plugin API and diffed both
token files against them. The surface is essentially in sync: three values had
drifted, all light-mode button backgrounds, and the dark theme matched
throughout.

<table>
	<thead>
		<tr><th>Token</th><th>Was</th><th>Now</th></tr>
	</thead>
	<tbody>
		<tr><td><code>sapButton_Background</code></td><td><code>#fcfeff80</code></td><td><code>#fcfeff</code></td></tr>
		<tr><td><code>sapButton_Active_Background</code></td><td><code>#fcfeff80</code></td><td><code>#fcfeff</code></td></tr>
		<tr><td><code>sapButton_Selected_Hover_Background</code></td><td><code>#dee8f9</code></td><td><code>#dee9fb</code></td></tr>
	</tbody>
</table>

The first two reverse part of the previous sync's translucency pass: buttons are
opaque again, so a standard button no longer lets the page tint bleed through its
fill. The third is a small hue correction on the selected-hover state.

**Deliberately not changed**

- **36 Figma variables still have no UI5 counterpart** and stay unmapped, as
  before — `sapHC_*` (14), `sapPrimary1`–`7`, `sapList_Background_Dark` /
  `_Light`, `sapList_HighlightColor`, `sapBackgroundColorDefault`,
  `sapBaseColor_Background`, `sapGroup_ContentBackground_Surface`,
  `sapField_BorderCornerRadius_Max`, `sapBlockLayer_BackgroundBlur`,
  `sapContent_LineHeight_*`, `sapContent_TextShadowColor*`, and
  `sapShell_BackgroundPatternColor`.
- **Font-family variables** remain excluded: Figma stores a style name
  (`Semibold Duplex`) where the token files carry a full CSS font stack.
- **Opacity variables** (`sapBackgroundImageOpacity`, `sapContent_DisabledOpacity`,
  `sapShell_BackgroundImageOpacity`) differ only by scale — Figma models them
  0–100, the token files 0–1. Same value, different unit.
- **`sapBlockLayer_Opacity`** is left alone: two Figma variables share that leaf
  name (a colour `#00000033` and a float `20`) against our single `0.6`, so the
  intended mapping is ambiguous and needs a design decision rather than a guess.
