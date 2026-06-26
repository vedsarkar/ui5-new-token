# @reltio/skills

## 1.1.0

### Minor Changes

- 113126e: Add a self-describing component-discovery CLI to `@reltio/design`, and ship the agent skill for adopting those components in the new standalone `@reltio/skills` package.

  - **`npx @reltio/design components [Name]`** — list the endorsed component inventory, or print one component's resolved props and defaults. Reads a bundled `components.index.json` + per-component JSON-Schema prop tables shipped in the package, so discovery is offline and version-matched (no MCP or network required). The published `@reltio/design` package now bundles per-component `*.schema.json`, `components.index.json`, and the CLI under `dist/`.
  - **`@reltio/skills`** (new package) — a tiny CLI that installs portable agent skills:
    - `npx @reltio/skills list` — list the bundled skills.
    - `npx @reltio/skills install [name...]` — install all bundled skills, or only the named ones, into a consumer repo (`.agents/skills/` + `.claude/skills/` link). Non-destructive (never deletes unowned content, never edits `AGENTS.md`/`CLAUDE.md`; `--force` only to replace a conflicting link); cleanly updates an existing install; copy fallback where symlinks are unavailable.
  - The **adopt-reltio-design** skill (Cursor/Claude/Codex) guides replacing ad-hoc UI primitives (MUI of any version, bespoke components, raw HTML) with the standardized components via semantic matching, generic web-component/styling rules, the `@reltio/design/components` subpath, and a small-iterative-PR guardrail. It pairs with the `@reltio/design components` discovery CLI.

  Additive only — no change to component runtime APIs.
