---
title: "MDX tables must be HTML in *.story.mdx files"
date: 2026-05-19
---

# MDX tables must be HTML in *.story.mdx files

Storybook's MDX renderer does not reliably parse pipe-separated Markdown tables — they render as raw text in production builds, even though they look fine in editor previews. Every `*.story.mdx` file in `apps/` and `guides/` must use HTML (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`) instead.

The convention is now baked into `AGENTS.md` and applied across all 16 application story pages. This is a recurring trap for new contributors — flag it in code review and in any AGENTS.md generated for new app submodules.
