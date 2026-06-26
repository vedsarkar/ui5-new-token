## Why

Teams migrating third-party Reltio applications (most on MUI, but also on bespoke
primitives or raw HTML) have no standard, agent-driven path to adopt the endorsed
`@reltio/design/components` surface. Today an AI agent in a consumer repo cannot
reliably answer "which standardized component replaces this primitive, and what is
its exact, version-matched API?" — the rich docs live only behind the Reltio Design
MCP / Storybook, and the published npm package exposes prop types only as
hard-to-resolve transitive `.d.ts` generics. We need a portable, cross-agent
(Cursor / Claude / Codex) skill plus a self-describing package so any consumer
agent can discover and adopt our components safely and incrementally.

## What Changes

- Add a portable agent skill `adopt-reltio-design` (`SKILL.md` + `playbook.md`)
  that guides an agent through replacing ad-hoc UI primitives (MUI / custom / raw
  HTML / other libs) with `@reltio/design/components`, using semantic matching
  (no hand-curated mapping table).
- Author the skill as **package assets** under `packages/skills/skills/` (the
  single source of truth) in a dedicated, separately published `@reltio/skills`
  package — NOT under the platform repo's `.agents/skills/` — so it ships to
  external consumers but never activates for platform developers.
- Add a Storybook **how-to guide** page for external consumers that renders the
  skill body from the same source files (no copy-paste) and documents the
  install + discovery + migration flow.
- The skill mandates **small, iterative PRs** (≈ up to 1000 changed lines as a
  ceiling; stop and split beyond that), each step compiling and passing tests,
  with the agent proposing a split plan before any bulk replacement.
- Make the installed `@reltio/design` package **self-describing for discovery**:
  ship the already-generated per-component `*.schema.json` (and a flat index) into
  `dist/` so consumer agents read inventory + resolved props live, version-matched,
  offline — no separately maintained catalog.
- Add a package bin `@reltio/design components [Name]` that prints the component
  inventory / a single component's props from the bundled schemas.
- Add a new `@reltio/skills` package with a bin (keyed `skills`) whose
  `install [name...]` subcommand copies the bundled skill(s) into a consumer repo's
  `.agents/skills/` (and symlinks `.claude/skills/`), and a `list` subcommand. It
  does not edit the consumer's `AGENTS.md`/`CLAUDE.md`; it prints a suggested
  pointer line instead.
- Discovery contract for the skill: inventory + props come from the installed
  package; narrative usage / variant guidance / gotchas come optionally from the
  remote Reltio Design MCP (`https://reltio.design/mcp`) with a `reltio.design`
  web fallback.

## Capabilities

### New Capabilities
- `design-adoption-skill`: the portable, cross-agent skill that defines triggers,
  the migration workflow, generic web-component/styling rules, and the
  iterative-PR guardrails for adopting `@reltio/design/components`.
- `component-discovery`: the installed package self-describes its component
  inventory and resolved prop schemas (bundled `*.schema.json` + `components` bin)
  so agents enumerate "what exists and how to use it" live and version-matched.
- `skill-distribution`: shipping the skill in a dedicated `@reltio/skills` package,
  keeping it inactive for platform developers, an `install` CLI subcommand that
  places it into a consumer repo for any agent, and a Storybook how-to guide
  rendered from the same skill source.

### Modified Capabilities
<!-- None: no existing spec's requirements change. -->

## Impact

- `packages/design/package.json` — a single `bin` (keyed `design`) for the
  `components` subcommand, enriched `postbuild` (copy `*.schema.json` + generated
  index into `dist/`), new build/bin scripts.
- New `@reltio/skills` package under `packages/skills/` — its own `bin` (keyed
  `skills`) with `install` / `list` subcommands, a `build.mjs` that assembles a
  self-contained `dist/`, README, and the skill source assets under
  `packages/skills/skills/adopt-reltio-design/` (deliberately NOT under the
  platform repo's `.agents/skills/`).
- New Storybook guide (`guides/adopt-reltio-design.story.mdx`, platform-owned like
  `guides/auth/`) that raw-imports and renders the skill source from
  `packages/skills/skills/`.
- New script(s) under `scripts/` to assemble the bundled component index and back
  the `components` bin.
- No change to component runtime APIs; no breaking change for existing consumers.
- Consumers gain two CLIs (`npx @reltio/design components`,
  `npx @reltio/skills install`); the published `@reltio/design` payload grows by
  the bundled schemas + index, and the skill ships in the separate `@reltio/skills`
  package.
