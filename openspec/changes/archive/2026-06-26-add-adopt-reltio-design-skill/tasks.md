## 1. Self-describing package (component-discovery)

- [x] 1.1 Add `scripts/build-component-index.mjs` that scans `components/**/<Name>.schema.json` + `components/index.ts` exports and emits `components.index.json` (name → import path → one-line description → schema path)
- [x] 1.2 Wire the index build into the docs pipeline (`predev` / `prebuild-storybook` / `build-component-docs`) so it stays current
- [x] 1.3 Enrich `packages/design` build so `dist/` includes every `*.schema.json` and the generated `components.index.json` (extend `postbuild` or add a copy step) — via `scripts/bundle-design-assets.mjs`
- [x] 1.4 Verify `npm pack --dry-run` for `@reltio/design` lists the schemas + index in the payload

## 2. Discovery CLI (`components` bin)

- [x] 2.1 Implement a single CLI dispatcher (`packages/design/bin/cli.mjs`, so it ships in `dist/`) with a `components` subcommand: no name prints inventory from `components.index.json`; `<Name>` prints resolved props from the bundled schema; unknown name exits non-zero
- [x] 2.2 Register one `bin` keyed `design` (so `npx @reltio/design <subcommand>` resolves) in `packages/design/package.json`; ensure it resolves the bundled files relative to the installed package
- [x] 2.3 Smoke-test `npx @reltio/design components` and `npx @reltio/design components Button` (ran the CLI from the real `npm run build` `dist/`; `npm pack --dry-run` confirms 71 schemas + index + bin in the payload)

## 3. The skill (design-adoption-skill) — package asset, not active here

- [x] 3.1 Author `packages/skills/skills/adopt-reltio-design/SKILL.md` (frontmatter `name` + trigger `description`; principles; the inventory→match→deep-dive→migrate→verify workflow; the ~1000-line iterative-PR guardrail and split-plan requirement)
- [x] 3.2 Author `packages/skills/skills/adopt-reltio-design/playbook.md` (semantic matching guidance; generic web-component rules; `sx`/theme → CSS Modules + `--sap*` tokens; icons; canonical `/components` subpath; "no equivalent → stop")
- [x] 3.3 Document the discovery contract in the skill: inventory + props from `npx @reltio/design components`; optional narrative via remote MCP `https://reltio.design/mcp` with `reltio.design` WebFetch fallback
- [x] 3.4 Confirm the skill is NOT placed in this repo's `.agents/skills/` or `.claude/skills/` (so it stays inactive for platform developers) — it lives under `packages/skills/skills/`

## 4. Skill distribution (new `@reltio/skills` package)

- [x] 4.1 Scaffold `packages/skills` (`@reltio/skills`): `package.json` with `publishConfig.access=public` and a `bin` keyed `skills`; `scripts/build.mjs` assembling a self-contained `dist/` (bin + skills + staged `package.json`); README; LICENSE/NOTICE copied in `postbuild`
- [x] 4.2 Add an `install [name...]` subcommand: copy bundled skill(s) into consumer `.agents/skills/<name>/`, create missing parent dirs, create `.claude/skills/<name>` symlink; clean update via mirror; non-destructive on conflicts (foreign real dir / foreign symlink → warn + require `--force`); symlink-unavailable → copy fallback; print a suggested `AGENTS.md`/`CLAUDE.md` pointer line WITHOUT editing consumer config. Add a `list` subcommand printing skills + descriptions
- [x] 4.3 Bundle the `adopt-reltio-design` skill files into the `@reltio/skills` `dist/skills/` payload via `build.mjs`
- [x] 4.4 Smoke-test `npx @reltio/skills install` / `install <name>` / `list`: fresh install, idempotent re-run, conflicting `.claude/skills/<name>` directory (must not be clobbered), `--force`, unknown name, and confirm config files are untouched

## 5. Storybook how-to guide (single source)

- [x] 5.1 Add `guides/adopt-reltio-design.story.mdx` (platform-owned, like `guides/auth/`) that raw-imports (`?raw`) the skill `SKILL.md` + `playbook.md` from `packages/skills/skills/` and renders them via the Reltio `Markdown` component — keeps the published `@reltio/skills` package free of Storybook machinery
- [x] 5.2 Wrap the rendered skill body with consumer-onboarding prose: `npx @reltio/skills install` step, `npx @reltio/design components` discovery command, and the migration workflow overview
- [x] 5.3 Verify the guide renders in `npm run dev` and updates when the skill source changes (Storybook globs `**/*.story.mdx`, so the guide is picked up from `packages/skills/`)

## 6. Docs, release, and validation

- [x] 6.1 Update `packages/design/README.md` (component-discovery CLI + pointer to `@reltio/skills`) and add `packages/skills/README.md` (`install`/`list` usage)
- [x] 6.2 Add a Changesets entry (minor — additive: `@reltio/design` discovery CLI + new `@reltio/skills` package)
- [x] 6.3 `npm run format && npm run lint` clean for all new/changed files
- [x] 6.4 `openspec validate add-adopt-reltio-design-skill --strict` passes
