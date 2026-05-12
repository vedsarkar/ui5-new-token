# Changesets

This directory holds **release intents** — small markdown files describing how each pull request should affect package versions and `CHANGELOG.md` entries. Versions and the changelog are **not** updated in feature PRs; they are aggregated by a maintainer in a single _Version Packages_ PR (see [`CONTRIBUTING.md`](../CONTRIBUTING.md#release-process)).

## Adding a changeset

Run from the repository root:

```bash
npm run changeset
```

The CLI will ask three questions:

1. **Which packages should bump?** Use space to toggle, enter to confirm. Only `@reltio/design` exists today; in the future the list will grow.
2. **What kind of bump for each?**
   - `patch` — bug fixes, documentation, internal refactors with no API impact
   - `minor` — new components, new props, new variants, anything additive
   - `major` — breaking change in the public API of a package
3. **Summary** — a short description of the change (this becomes a bullet in the next `CHANGELOG.md`)

A file `.changeset/<random-name>.md` is created. Commit it as part of your PR.

> **AI-assisted authoring.** This repository ships an agent skill that walks AI assistants (Cursor, Claude Code, Copilot CLI, …) through the same prompts and writes the changeset file directly. See [`.agents/skills/add-changeset/SKILL.md`](../.agents/skills/add-changeset/SKILL.md) — most agents pick it up automatically when you say _"add a changeset"_ or _"prepare a release note"_.

## Format

A changeset is a markdown file with a YAML frontmatter listing the packages to bump and the bump type, followed by the summary in markdown:

```md
---
"@reltio/design": minor
---

Add `Chat` component with streaming message support.

- Streams partial messages from any async iterator
- Supports markdown rendering via `markdown-to-jsx`
- New `<Chat.Composer />` subcomponent for the input area
```

The summary supports full markdown (bullet lists, links, inline code). Keep it focused on **user-visible impact** — what changed from the consumer's perspective. Implementation details belong in commit messages.

## When _not_ to add a changeset

Skip changesets for:

- Documentation-only changes that don't ship in the package (`*.story.mdx`, README, comments)
- CI / tooling / lint config changes that don't affect published code
- Changes inside `.storybook/`, `guides/`, `scripts/`, top-level dev-only tooling

Adding a changeset for source changes is a convention today, not a CI-enforced gate (a previous guard had blind spots and was removed pending a redesign — see the Release Process guide for details). If you want to record an intentional "no version bump for this PR", add an empty changeset:

```bash
npm run changeset -- --empty
```

This produces a `.changeset/*.md` file with only frontmatter — the next `version @reltio packages` run consumes and deletes it without bumping anything.

## Useful commands

| Command | Purpose |
|---|---|
| `npm run changeset` | Interactive prompt — add a changeset for the current PR |
| `npm run changeset:status` | List pending changesets and what they would bump |
| `npm run version-packages` | Maintainer-only — consume all pending changesets, bump versions, write `CHANGELOG.md` |
| `npm run release` | CI-only — publish to npm + create git tags for unpublished versions |
| `npm run release:snapshot -- --tag pr-123` | CI-only — publish a one-off snapshot for a PR under `pr-123` dist-tag |

## Learn more

- [Changesets official docs](https://github.com/changesets/changesets)
- [Reltio Design — Release Process guide](https://reltio.design/?path=/docs/guides-release-process--docs)
- [`CONTRIBUTING.md`](../CONTRIBUTING.md) — the full developer workflow
