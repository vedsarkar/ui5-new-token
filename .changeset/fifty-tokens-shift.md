---
"@reltio/design": patch
---

Re-sync the interactive blue and muted grey — 55 light tokens moved in Figma

The Figma library changed **two days after** the previous full sync, and it moved
whole colour families rather than individual values. Caught while checking the
Busy Indicator: its dot resolved `#3254ec` where our `sapContent_BusyColor` still
held `#4563ed`.

Checking every token that shared those values showed a systematic shift, all
light-mode only — Evening Horizon is untouched throughout:

<table>
	<thead>
		<tr><th>Family</th><th>Tokens</th><th>Was</th><th>Now</th></tr>
	</thead>
	<tbody>
		<tr><td>Primary interactive blue</td><td>40</td><td><code>#4563ed</code></td><td><code>#3254ec</code></td></tr>
		<tr><td>Muted grey</td><td>10</td><td><code>#646e97</code></td><td><code>#5d6892</code></td></tr>
		<tr><td>Link</td><td>4</td><td><code>#2350ed</code></td><td><code>#3e63ea</code> / <code>#3a5ddf</code> / <code>#335ae6</code> / <code>#3d5fdb</code></td></tr>
		<tr><td>Tile text</td><td>1</td><td><code>#646e97</code></td><td><code>#5d6892</code></td></tr>
	</tbody>
</table>

The blue family covers button text, icons and active borders, field hover and
active borders, tab foreground and selection, slider and scrollbar accents, list
selection borders and shell navigation. The grey covers field borders and
placeholders, the object-header subtitle and tile icons. The four link tokens
each took a slightly different value rather than one shared hue.

**This invalidated colours previously verified as matching** on components
already reviewed — the Breadcrumb link, the Card subtitle, and Lite button text.
All three now match again.

**Busy Indicator, verified in the same pass**

Its dot colour, dot count and size ramp match the design: `8 / 16 / 32` for
Small / Medium / Large, against the design's largest dot at each size. The
container is 54px wide where the design's Medium frame is 48. That is not a
defect — the design's frame is one step of a wave animation (dots at 8, 12 and 16
with 6px gaps), while UI5 sizes its container to hold three full-size dots plus
gaps (`3 x 16 + 2 x 3`). The two animation models cannot produce the same static
box, so no correction is warranted.

**Worth knowing**

The token surface is drifting on a timescale of days: 4 of 16 tokens in a spot
check had moved within 48 hours. One-off value fixes will keep going stale.
A Figma personal access token plus a sync script that can run in CI would make
this checkable on every build instead of by hand through the MCP.
