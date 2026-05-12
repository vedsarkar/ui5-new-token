---
name: add-changeset
description: Author or update a Changesets release-intent file for the current PR in the Reltio Design Platform monorepo. Use when the user asks to "add a changeset", "prepare release notes", "what bump type is this", or when CI fails with a missing-changeset error. Inspects the git diff against origin/main, classifies the bump (patch/minor/major), drafts the markdown, writes the file under .changeset/, and explains the choice.
license: MIT
metadata:
  author: reltio-coe
  version: "1.0"
---

# Add a changeset

This skill walks an AI agent through producing a high-quality `.changeset/*.md` file for the current pull request. The goal is to remove the friction of "what bump type should this be?" and "what should I write in the summary?" so contributors can focus on the code change itself.

## When to use this skill

Trigger words and intents:

- "Add a changeset" / "I need a changeset for this PR"
- "What bump type is this change?"
- "Prepare release notes for this branch"
- "CI is failing on changeset:check — fix it"
- The agent is about to open a PR and realises no changeset is present

If the user is asking about how the release process works at a conceptual level, point them at `CONTRIBUTING.md` and the `Guides/Release Process` Storybook page instead — that is documentation, not a task this skill solves.

## Prerequisites

This skill assumes:

- The user is working in a clone of `reltio-design-platform`.
- The branch is up to date with `origin/main`.
- The agent has shell access to run `git`, `npm`, and read files.

If the user is mid-conversation and asks for a changeset, do **not** ask permission to inspect the diff — just inspect it. The skill is read-and-write but read-only by default until step 5 ("Write the changeset file").

## Steps

### 1. Verify the repo and base ref

Confirm the current working directory is a Reltio Design Platform clone and that `origin/main` is fetched.

```bash
git rev-parse --show-toplevel
git fetch origin main --quiet
git diff --name-only origin/main...HEAD
```

If the diff against `origin/main` is empty, tell the user there is nothing to changeset and stop. They may be on `main` itself.

### 2. Determine whether a changeset is required

Apply the same heuristic as `scripts/check-changeset.mjs`:

- A changeset **is required** if any file under `packages/*/` changed, excluding:
  - `package.json` (metadata)
  - `package-lock.json`
  - `tsconfig.json`
  - `README.md`
  - `CHANGELOG.md`
  - Any dotfile

- A changeset **is not required** if changes are limited to `.storybook/`, `guides/`, `scripts/`, `components/` (only when those components are not yet published — verify they are not re-exported from `packages/design/components.ts`), or root-level config.

If not required, ask the user whether they still want an explicit empty changeset for documentation purposes (`npm run changeset -- --empty`). Default to "no".

### 3. Inspect the diff to classify the bump

Read the actual diff for files under `packages/*/`, `components/`, `charts/`, `utils/`, and `hooks/` — these end up in `@reltio/design`. Classify by looking for these signals:

| Signal in diff | Bump |
|---|---|
| New file exported from `components/index.ts` / `charts/index.ts` / `utils/index.ts` | `minor` |
| New named export from an existing public module | `minor` |
| New prop added (optional) | `minor` |
| New variant of an enum-like prop | `minor` |
| Bug fix that restores documented behaviour | `patch` |
| Internal refactor with no public-surface change | `patch` |
| Test or comment changes only inside a published file | `patch` (often, but consider `--empty`) |
| Removed export, removed prop, renamed export | `major` |
| Required prop added | `major` |
| Behaviour change that would surprise an existing consumer | `major` |
| Bumped a peer dependency major (e.g. `react: 18 → 19`) | `major` |
| Bumped a regular dependency major that is re-exported (`@ui5/webcomponents-react`) | `major` |

**Tie-breaking rules.**

- If multiple files mix bump types, take the **highest** — a single `major` change in the PR makes the whole PR `major`.
- If unsure between `patch` and `minor`, ask the user: "I see a new optional prop `<name>` on `<component>` — is this a new public capability (minor) or an internal-only knob (patch)?"
- If unsure between `minor` and `major`, default to `major` and ask the user to confirm. Better to over-warn than to ship a hidden breaking change.

### 4. Draft the summary

The summary is the text that ends up in `CHANGELOG.md`. Follow these rules:

- **Audience: the consumer** — someone integrating `@reltio/design` into their app. Not a maintainer of this repo.
- **First line is the one-liner.** Imperative voice ("Add streaming support to `Chat` component."), present tense, no period if it ends with a colon list, period otherwise.
- **Then optional bullets** describing each user-visible aspect of the change. Wrap component / prop / function names in backticks.
- **`major` always includes a migration block.** Format:
  ```md
  **Migration:** <one-line description of what consumers must change>.
  ```
  Include a link to a guide if one exists, or note that one will be added.
- Do **not** mention internal implementation details, refactors, or commit-level information. Those belong in the commit message, not the changelog.

Three good examples:

```md
---
"@reltio/design": patch
---

Fix `Avatar` focus ring overlap with adjacent elements in dense layouts.
```

```md
---
"@reltio/design": minor
---

Add `Chat` component with streaming message support.

- New `messages` prop accepts an async iterator
- New `<Chat.Composer />` subcomponent for the input area
- Backwards-compatible with the existing static-array message shape
```

```md
---
"@reltio/design": major
---

Rename `Button` `kind` prop to `design` to align with UI5 naming.

**Migration:** rename every `<Button kind="…">` to `<Button design="…">`.
Codemod: `npx @reltio/codemods button-design-rename`.
See [the migration guide](https://reltio.design/?path=/docs/guides-migrations-button-design--docs).
```

Three bad examples (and why):

```md
---
"@reltio/design": minor
---

Refactor Chat internals
```
**Why bad.** Refactoring is not a user-visible change — should be `patch`, and the summary should describe consumer impact, not the internal refactor.

```md
---
"@reltio/design": major
---

Bumped echarts from 5 to 6.
```
**Why bad.** Missing migration note. A consumer reading this has no idea what to change. Add a `**Migration:**` paragraph linking to ECharts 6 release notes and the affected `@reltio/design/charts` APIs.

```md
---
"@reltio/design": patch
---

WIP
```
**Why bad.** Empty content. If there's no consumer-visible impact, use `npm run changeset -- --empty` instead.

### 5. Write the changeset file

Use `npm run changeset` to invoke the official CLI with the answers pre-resolved — but the CLI is interactive. The reliable way for an agent is to write the file directly:

1. Generate a random kebab-case name (e.g. `npx human-id` style — two-three words). If you can't generate one, use `auto-<timestamp>-<short-sha>`.
2. Write the file to `.changeset/<name>.md` with the markdown drafted in step 4.
3. Show the user the file path and a preview of the content.

Do **not** run `git add` or commit — leave that to the user. They'll bundle it with their existing PR commits.

### 6. Verify and explain

After writing, run:

```bash
npm run changeset:check
```

Show the output. If green, summarise:

- Bump type chosen and why (one sentence)
- Summary text in a quoted block
- Reminder: "Commit `.changeset/<name>.md` and push. CI will pick it up."

If red, the diff likely changed underneath you — re-run from step 1.

## Edge cases

### Multiple packages in the same PR

Once the repo has more than one publishable package, a single changeset can list multiple bumps. Inspect the diff to figure out which packages are affected, list each in the frontmatter with its own bump type:

```md
---
"@reltio/design": minor
"@reltio/charts": patch
---

…
```

A package only appears in the frontmatter if its source files (under that package's own directory _or_ in the relevant root-level barrel like `charts/`) changed.

### The user already has a changeset and wants to update it

- If they want to **change the bump type**: edit the existing `.changeset/*.md` frontmatter in place.
- If they want to **add another bullet to the summary**: edit the existing body. Don't create a second file.
- If they want a **truly separate concern** in the same PR: that's fine — multiple changeset files in one PR are valid and produce multiple CHANGELOG entries.

### The user wants to opt out

If the user insists there's no consumer impact:

1. Confirm the heuristic from step 2 actually flagged this PR.
2. Suggest `npm run changeset -- --empty`.
3. Write the empty file yourself if asked.

Don't push back too hard — empty changesets exist exactly for this case.

### CI is failing on `changeset:check`

This is the most common entry point for the skill. Run step 2 to confirm a changeset is required, then go through steps 3–5 to add one.

## Guardrails

- **Never bump versions yourself.** That's `npm run version-packages`, run by a maintainer in a separate flow. Changesets are intent only.
- **Never delete existing `.changeset/*.md` files.** They are owned by the PRs that introduced them.
- **Never commit on the user's behalf.** Show the file, let the user commit when they push.
- **Always read `.changeset/config.json`** before assuming defaults — the config could change (different changelog generator, prerelease mode, etc.).
- **If the diff is enormous (more than 50 files)**, suggest splitting the PR before writing one giant changeset. A "ten simple changes are better than one complex change" rule from the spec-driven development guide applies here too.

## References

- [`CONTRIBUTING.md`](../../../CONTRIBUTING.md) — full development + release flow
- [`.changeset/README.md`](../../../.changeset/README.md) — local conventions
- [Changesets official docs](https://github.com/changesets/changesets)
- [Storybook → Guides → Release Process](https://reltio.design/?path=/docs/guides-release-process--docs)
