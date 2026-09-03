---
"@reltio/design": patch
---

Re-sync `sapField_SuccessColor` and cover the checkbox value states

`sapField_SuccessColor` moved from `#3b9564` to `#30915c` in Figma, light mode
only. Found by reading the design's Positive checkbox variant, whose 1px stroke
did not match what we rendered.

Unlike today's earlier drifts this one is **isolated, not a family shift**: 17
other tokens still hold `#3b9564` — the Accept and Success button colours, the
positive progress and tab colours, `sapChart_Good` — and all were confirmed
unchanged in Figma. Only the field variant moved.

With it applied, all 37 `sapField*` tokens match, and every checkbox value state
lines up with the design at 22x22 and radius 4:

<table>
	<thead>
		<tr><th>State</th><th>Fill</th><th>Border</th></tr>
	</thead>
	<tbody>
		<tr><td>None</td><td><code>#f0f5f9</code></td><td>1px <code>#5d6892</code></td></tr>
		<tr><td>Information</td><td><code>#e3faff</code></td><td>2px <code>#0000cc</code></td></tr>
		<tr><td>Positive</td><td><code>#f7ffe5</code></td><td>1px <code>#30915c</code></td></tr>
		<tr><td>Critical</td><td><code>#fff5cc</code></td><td>2px <code>#e66409</code></td></tr>
		<tr><td>Negative</td><td><code>#ffe5f3</code></td><td>2px <code>#ec2525</code></td></tr>
	</tbody>
</table>

**New stories: `Information` and `Success`**

The design covers five value states; the stories covered only Critical and
Negative. Information and Positive were never rendered, which is why the drift
went unnoticed — the same gap that hid the carousel's on-bar arrows. Both are now
stories, one state each per the story conventions.

**Everything else on the page already matched**

The 22x22 Cozy box at radius 4, the `sapField_Background` fill and 1px
`sapField_BorderColor` stroke, the 16x16 checkmark and the 12x12 tristate mark
(both `#0000cc`), the `sapField_ReadOnly_Background` read-only fill, and the
disabled state's 0.4 opacity — which UI5 applies to `.ui5-checkbox-root` rather
than the host, matching the design's component-level opacity.
