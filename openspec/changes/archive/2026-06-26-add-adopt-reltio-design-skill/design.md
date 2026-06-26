## Context

Reltio applications live in their own repositories (mostly on Bitbucket) and
install `@reltio/design` as their only UI distribution package. Many still use
MUI (various versions), bespoke primitives, or raw HTML for buttons, inputs,
dialogs, etc. There is no standard way for an AI agent working inside a consumer
repo to (a) know which endorsed component replaces a given primitive, (b) learn
that component's exact, version-matched API, and (c) perform the migration safely
and reviewably.

Constraints discovered in the platform repo:

- The endorsed surface is `@reltio/design/components` — both Reltio primitives
  (Chat, Details, Markdown, …) and ~50 doc-only UI5 re-exports (Button, Input,
  Dialog, Table, Select, …). Imports MUST use the `/components` subpath.
- Rich docs (README narrative, variant guidance, prop tables) are generated into
  `*.story.mdx` + `*.schema.json` by `build-component-docs` and exposed via the
  Reltio Design MCP (`https://reltio.design/mcp`) and hosted Storybook.
- The published npm package currently ships only compiled JS + `.d.ts` and a few
  static assets (`postbuild` copies `package.json`, `README.md`, licenses,
  `variables.css`, `fonts.css`). It does **not** ship the per-component schemas.
- UI5 re-export prop types resolve transitively into `@ui5/webcomponents-react`
  `.d.ts` generics — hard for an LLM to read directly (this is exactly why the
  repo built a TS-compiler-API extractor for the manifest).
- Skills follow the Agent Skills standard: `.agents/skills/<name>/SKILL.md` with a
  symlink under `.claude/skills/`. They are plain markdown, so they work across
  Cursor, Claude, and Codex.

## Goals / Non-Goals

**Goals:**
- A portable, agent-agnostic skill that drives primitive → `@reltio/design`
  adoption with a repeatable, app-independent workflow.
- Make the installed package self-describing so discovery is live and
  version-matched, with zero separately maintained catalog.
- Frictionless distribution riding the existing npm channel.
- Enforce small, iterative, reviewable PRs.

**Non-Goals:**
- A hand-curated MUI→Reltio mapping table (agent matches semantically instead).
- Automated/codemod rewriting of consumer code (the skill guides an agent; it is
  not a transform tool).
- Publishing to a GitHub `npx skills add` registry (npm package is the channel;
  a GitHub mirror is a possible later addition).
- Changing any component runtime API.

## Decisions

### D1. Distribution via a dedicated `@reltio/skills` npm package (not `npx skills add`)
Skills ship in their own published package, `@reltio/skills`, installed with
`npx @reltio/skills install [name...]`. Chosen over a GitHub repo + `npx skills add`
because the code is on Bitbucket and npm is the established channel. A dedicated
package (rather than bundling the skill inside `@reltio/design`) lets skills evolve
and version independently of the component library, and gives a clean home for
future skills under one `skills install` command. Component **discovery** still
lives in `@reltio/design` (`npx @reltio/design components`, D2/D3) so inventory and
props stay version-matched to the installed components; the skill text points at
that CLI. A GitHub mirror remains possible later without rework.

### D2. No maintained catalog — the installed package is the source of truth
Drop a shipped/curated `catalog.json`. Instead, enrich `postbuild` to copy the
already-generated `*.schema.json` into `dist/` plus a generated flat index
(`components.index.json`: name → import path → one-liner → `hasSchema` flag; the
schema resolves by convention at `schemas/<Name>.schema.json`). These
are byproducts of the existing docs pipeline, so there is no new content to
maintain. Agents read inventory + resolved props live from `node_modules`,
offline and version-matched. Chosen over (a) parsing `.d.ts` generics (LLM-hostile)
and (b) a hand-maintained table (drifts from components).

### D3. `components` bin as the deterministic discovery entrypoint
`npx @reltio/design components` prints the inventory; `… components <Name>` prints
one component's props — both read the bundled index/schemas. This gives every
agent (Cursor/Claude/Codex) one stable command instead of each reinventing
node_modules globbing. Narrative docs stay optional via MCP/WebFetch.

### D4. Semantic matching, generic across primitive sources
The skill instructs the agent to classify a primitive by intent ("this is a
button / text field / dialog"), look it up in the live inventory, then fetch the
exact API. No source-specific (MUI-only) logic — the same flow handles custom
components and raw HTML.

### D5. Iterative-PR guardrail baked into the skill
SKILL.md states an upper bound of ≈1000 changed lines per PR; beyond that the
agent MUST stop and propose a split (per component or per screen/module). Each
increment must compile and pass tests; the agent proposes a split plan before any
bulk replacement.

### D6. Discovery vs. narrative split
- Inventory + props → installed package (D2/D3), authoritative & version-matched.
- Usage narrative, variant choice, gotchas → remote MCP `https://reltio.design/mcp`,
  fallback WebFetch on `reltio.design`. Optional, never required for a migration.

### D7. Skill source as a package asset, inactive in the platform repo
The skill is authored under `packages/skills/skills/adopt-reltio-design/` (in the
`@reltio/skills` package), NOT under the platform repo's `.agents/skills/` (or
`.claude/skills/`). Agent runtimes only auto-register skills found in those
well-known directories, so keeping the source as a plain package asset means
platform developers never get `adopt-reltio-design` as an active skill — it cannot
interfere with work on `reltio-design` itself. The same files are copied into
`dist/skills/` at build time and become active only after a consumer runs
`npx @reltio/skills install`. Chosen over authoring in `.agents/skills/` (would
activate here).

### D8. Storybook how-to guide renders the single source (no copy-paste)
A Storybook guide page (`guides/adopt-reltio-design.story.mdx`, platform-owned like
the `guides/auth/` pages so the published `@reltio/skills` package stays free of
Storybook machinery) raw-imports the skill `SKILL.md` / `playbook.md` from
`packages/skills/skills/` (Vite `?raw`) and
renders them with the Reltio `Markdown` component, wrapped with consumer-onboarding
prose (install step, `components` discovery, workflow). One source of truth for both
the shipped skill and its human documentation; editing the skill updates the guide
automatically. Chosen over duplicating the text in MDX (drifts) or generating MDX in
a build step (more machinery for the same result).

### Resolved open questions
- **`@reltio/skills install` & consumer config:** drop the skill files + symlink and
  *print* a suggested `AGENTS.md`/`CLAUDE.md` pointer line; do not auto-edit consumer config.
- **GitHub `npx skills add` mirror:** deferred. npm is the channel; a mirror can be
  added later without reworking this design.

## Risks / Trade-offs

- [Bundled schemas grow the published package size] → Schemas are small JSON; copy
  only `components/**/<Name>.schema.json` + a single index, not stories/MDX.
- [Schema shape coupling: consumer agents depend on the schema/index format] →
  Treat `components.index.json` as a documented, versioned contract; changes go
  through a changeset.
- [`.d.ts` and bundled schema could disagree] → Both derive from the same
  `*.types.ts`; the docs pipeline already reconciles them, and `components` bin
  reads the schema (the curated one) as the answer.
- [Agent ignores the PR-size guardrail] → Make it a hard, early, repeated rule in
  SKILL.md and require an explicit split plan before bulk edits.
- [MCP/Storybook unavailable in a locked-down consumer env] → Discovery still works
  fully offline from the package; only narrative deep-dives degrade.
- [Skill not auto-discovered by an agent in a consumer repo] → `npx @reltio/skills install`
  places it in `.agents/skills/` + `.claude/skills/`; document the one-liner in the
  package READMEs.

## Migration Plan

1. Add discovery scripts + `bin` + enriched `postbuild` to `@reltio/design`; verify
   `dist/` contains schemas, index, and the `components` bin after `npm run build`.
2. Author the skill as a package asset under
   `packages/skills/skills/adopt-reltio-design/` in the new `@reltio/skills` package
   (NOT under the platform repo's `.agents/skills/`, per D7) so it stays inactive
   here and is bundled into `dist/skills/` at build time.
3. Ship via normal releases (changesets, minor bumps — additive): `@reltio/design`
   gains the discovery CLI, `@reltio/skills` is published new.
4. Consumers run `npx @reltio/skills install` once; thereafter agents use
   `npx @reltio/design components` for discovery.
Rollback: revert the package releases; bins and bundled files simply disappear from
the next install. No consumer runtime impact.

## Open Questions

- None blocking. (Prior open questions resolved above under "Resolved open
  questions".)
