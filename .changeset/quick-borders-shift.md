---
"@reltio/design": patch
---

Re-sync the button border greys — four more light tokens moved in Figma

Found while re-reviewing the Buttons page. The four tokens that shared
`#d1d4df` have all moved, and the new values are no longer a single shared hue:

<table>
	<thead>
		<tr><th>Token</th><th>Was</th><th>Now</th></tr>
	</thead>
	<tbody>
		<tr><td><code>sapButton_BorderColor</code></td><td><code>#d1d4df</code></td><td><code>#7e8bc4</code></td></tr>
		<tr><td><code>sapButton_Hover_BorderColor</code></td><td><code>#d1d4df</code></td><td><code>#82889b</code></td></tr>
		<tr><td><code>sapButton_Lite_Hover_BorderColor</code></td><td><code>#d1d4df</code></td><td><code>#82889b</code></td></tr>
		<tr><td><code>sapButton_TokenBorderColor</code></td><td><code>#d1d4df</code></td><td><code>#82889b</code></td></tr>
	</tbody>
</table>

Light mode only; Evening Horizon is unchanged. The visible effect is that a
secondary button's edge goes from a neutral light grey to a muted blue-purple,
which is a clear difference at rest.

**The rest of the Buttons page already matches.** All six design types — Primary,
Secondary, Tertiary, Accept, Reject and Attention, mapping to UI5's `Emphasized`,
`Default`, `Transparent`, `Positive`, `Negative` and `Attention` — render at the
design's Cozy height of 36px with the 32px pill radius, correct fills, borders
and text colours, and the right font face per type (`72-Bold` for Primary,
`72-SemiboldDuplex` for the others, matching the design's
`sapButton_Emphasized_FontFamily` / `sapButton_FontFamily` bindings). Resting and
hover states were both checked against the design's `Regular` and `Hover`
variants. Of the 38 button tokens compared, only the four above had drifted.
