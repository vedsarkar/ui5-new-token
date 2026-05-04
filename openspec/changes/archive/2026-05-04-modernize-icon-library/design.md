# Design: Modernize Icon Library

## Context

The Reltio Design System ships two SVG-based asset libraries: [icons](../../specs/icon-library/spec.md) and [illustrations](../../specs/illustration-library/spec.md). The illustration library was added later than the icon library, learned from the icon library's experience, and made one deliberate departure: it ships as a **single-access-path** library (React component only) rather than a dual-access library (React component + public URL).

The original icon library design preserved both access paths because:

1. Icons use `fill="currentColor"`, so the SVG renders correctly when loaded via `<img src>` — the host's `color` cascade still applies to the root element.
2. Icons are ubiquitous and small (~100–200 bytes of `<path>` data), so a CDN endpoint felt low-risk.
3. The original use case included external tools and embeddable widgets that might want raw SVG access.

In practice, no internal product uses the `/icons/*.svg` endpoint, no external consumer has been documented to depend on it, and the illustration library's experience demonstrated that a single React-component access path is simpler to maintain. Maintaining two parallel access surfaces costs documentation effort, complicates the build script, and adds confusion to the Storybook catalog (consumers see two columns of "ways to use" and have to choose).

This change unifies the two libraries on the **single access path** philosophy. The TypeScript / React import remains the canonical surface; raw SVGs become private build artifacts under `icons/_source/`, mirroring `illustrations/_source/`.

It also brings per-icon Storybook stories up to the same standard as illustration stories: every story renders a 2-row matrix that exercises both light and dark themes simultaneously, so a single Chromatic snapshot per icon covers both themes.

## Goals / Non-Goals

**Goals:**

- Drop the `https://reltio.design/icons/<name>.svg` public URL surface.
- Move SVG sources from `public/icons/` (publicly served) to `icons/_source/` (private build artifact) — same convention as `illustrations/_source/`.
- Update `scripts/build-icons.mjs` to read from the new sources location and emit stories with a deterministic 2-theme matrix.
- Update the Storybook catalog block (`IconLibrary`) to drop the URL column, leaving the icon preview and the import snippet only.
- Update the documentation guide and spec to reflect the new single-access-path API.
- Keep the React component import API (`import { Search } from "@reltio/design/icons"`) unchanged.

**Non-Goals:**

- Changing icon names, prop signatures, sizes, or color tokens.
- Introducing multi-color or semantically themed icons (out of scope for this change; future work).
- Migrating the SAP icon source provenance (icons continue to come from `SAP/theming-base-content` via the existing manual sync).
- Providing a baked-fill SVG distribution channel for non-React consumers (out of scope; can be revisited if a real consumer use case appears).
- Updating other components that internally reference icons — they all use the React component import already.

## Decisions

### Decision 1: Move SVG sources to `icons/_source/`

The 700+ SVG files currently in `public/icons/` move to `icons/_source/`. The new path matches the convention introduced by `illustrations/_source/` (leading underscore signals "build artifact, not part of the public surface"). The `package.json` exports field already restricts the public icon import surface to `*.tsx`, so no exports change is needed.

**Rationale:**

- Co-locating sources next to the generated React components (the same pattern as illustrations) makes the relationship visually obvious.
- Files under `icons/_source/` are NOT served by Storybook (its `staticDirs` only mounts `public/`), so the public URL surface disappears automatically without additional plumbing.
- PR diffs continue to surface upstream changes when re-syncing icons from SAP.

**Alternatives considered:**

- Keep sources in `public/icons/` but configure the deployment to 404 those paths. Rejected: brittle, server-specific, and leaves the misleading folder structure intact.
- `node_modules/.cache/icons/` (gitignored). Rejected: tracking the SVGs in git makes upstream syncs reviewable.

### Decision 2: Update `scripts/build-icons.mjs`

Two changes:

1. **`ICONS_SOURCE_DIR`** changes from `public/icons` to `icons/_source`. The `mkdir -p` step ensures the new folder exists on first run after migration.
2. **Story generator** emits a 2-row matrix per icon. Each row is wrapped in an explicit `data-theme="horizon-light"` / `data-theme="horizon-dark"` div with `background: var(--sapBackgroundColor)`. Within each row, the existing three previews (small/success, medium/inherited, large/error) are preserved so the matrix still covers all the size and color variants the previous stories did.

```tsx
// Generated per-icon story shape:
export const Search: Story = {
	render: () => (
		<div className={styles.story}>
			<div data-theme="horizon-light" className={styles.row}>
				<Icons.Search size="small" color="success" />
				<Icons.Search />
				<Icons.Search size="large" color="error" />
			</div>
			<div data-theme="horizon-dark" className={styles.row}>
				<Icons.Search size="small" color="success" />
				<Icons.Search />
				<Icons.Search size="large" color="error" />
			</div>
		</div>
	),
};
```

**Rationale:**

- Mirrors the illustration story shape so the two libraries feel consistent.
- A single Chromatic snapshot per icon covers both themes — twice the visual regression coverage for the same number of stories.
- Determinism: the inline `data-theme` wrappers override the Storybook toolbar selection, so re-running the same story always produces the same DOM.

### Decision 3: Update `IconStories.module.css`

Add a `.row` class with the same shape as `illustrations/IllustrationStories.module.css`:

```css
.story {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.row {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 24px;
	background: var(--sapBackgroundColor);
	border-radius: 12px;
}
```

The existing `.story` class is repurposed from a horizontal flex into a vertical container that stacks the two rows; horizontal alignment moves into `.row`. Padding and rounded corners make each theme panel visually distinct.

### Decision 4: Simplify `IconLibrary.tsx` catalog block

Drop the URL cell and the `path` field on each icon entry. The remaining table has two columns: the icon preview and the import-snippet copy cell. The `IconLibrary.module.css` retains only `.iconCell`, `.copyCell`, `.codeCopied` — the `path` / URL formatting styles are removed.

The `data-toc` anchor stays on the icon name inside the import snippet so the table-of-contents in the Docs page continues to work.

### Decision 5: Update the documentation guide

`guides/icon-library.story.mdx` is rewritten to:

- Describe the React component as the single supported access path (matching the illustration guide's tone).
- Drop the **Direct URL Access (CDN)** section.
- Drop the "Dual Access" benefit row in the principles table.
- Add a short rationale paragraph explaining why the URL surface was retired (consistency with illustrations, simpler API, no internal consumers).
- Keep the rest of the content (props, sizing, color, accessibility, contribution workflow) intact.

The guide-writing instructions in `guides/AGENTS.md` recommend a Sources and References section and a research pass; for this revision the research is internal — the prior icon library spec, the illustration library spec, and the illustration guide — so the Sources section links to those.

### Decision 6: Update the spec

`openspec/specs/icon-library/spec.md` changes:

- **Requirement: SVG Source Management** — change the scenario references from `public/icons/` to `icons/_source/`. Drop the "accessible via direct URL at `/icons/{filename}.svg`" clause.
- **Requirement: Dual Access Patterns** — REMOVED. Replaced by a new **Requirement: React component as the single access path** modeled on the illustration spec.
- **Requirement: Storybook Icon Library Page** — keep, but the success criteria drop the URL copy column.
- **Requirement: Per-icon stories render the full theme × variant matrix** — ADDED. Mirrors the corresponding illustration requirement.
- **Requirement: SAP Icon Set** — unchanged.
- **Requirement: React Component Generation** — unchanged except for the source-folder reference.
- **Requirement: Icon Component Props / Accessibility / TypeScript Types / CSS Styling** — unchanged.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| External consumers depend on `https://reltio.design/icons/<name>.svg` | Hard breakage on production | Announce in changelog; advise migration to React component imports; offer a follow-up change that introduces a baked-fill SVG distribution if a real use case appears |
| Internal consumers use the URL path without our knowledge | Same as above | grep / repo audit before rollout; the icon names did not change, so any usage is easy to discover |
| Storybook's `staticDirs` config changes break the migration | Sources stop being readable by the build script | The build script reads from the filesystem directly, not via Storybook — so `staticDirs` is irrelevant to the build path |
| Existing dynamic story matrix doubles the per-canvas DOM size | Slightly heavier Storybook canvas | Negligible — icons are tiny SVGs; the same pattern works fine for illustrations |
| `data-theme` wrappers conflict with the Storybook theme toolbar | Toolbar appears non-functional inside per-icon stories | Document this in the guide (toolbar still affects the Docs page background and any non-icon story); illustrations made the same trade-off |

## Migration Plan

This is a **breaking change** for any consumer using the public URL surface. There is no known internal consumer.

1. **Phase 1 — Move sources.** `git mv public/icons icons/_source/`. Verify the build script still reads them after retargeting `ICONS_SOURCE_DIR`.
2. **Phase 2 — Update the build script.** Story generator emits the 2-row matrix; sources path retargets.
3. **Phase 3 — Run `npm run build-icons`.** Stories regenerate with the new matrix shape; the existing 935 icon component files are overwritten with identical content (since the SVG sources didn't change), so the diff for component files should be empty after format.
4. **Phase 4 — Update `IconLibrary.tsx`.** Drop the URL column and styles.
5. **Phase 5 — Update CSS module.** Add `.row` and reshape `.story`.
6. **Phase 6 — Update the guide.** Remove URL references and add the rationale paragraph.
7. **Phase 7 — Update the spec.** Drop dual-access requirement; add single-access-path and matrix-story requirements; retarget `SVG Source Management` paths.
8. **Phase 8 — Validate.** `npm run lint`, `npm run format`, `npm run dev` and visually verify the Icons Storybook page.

## Open Questions

1. **Do any external consumers depend on the URL path?** Check Reltio Confluence and the design platform user list before merging.
2. **Should we add a Sources and References section to the guide?** Yes — link to the illustration guide and the upstream SAP icon repository for parity.
3. **Should we offer a redirect / 404 page?** Probably not — the path simply 404s after the public folder is removed, which is the standard behavior for missing assets. A custom redirect would suggest the URL is supported, which it isn't.
