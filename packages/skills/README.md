# @reltio/skills

Installable **AI-agent skills** for the Reltio Design Platform. The skills teach
any agent (Cursor, Claude, Codex) how to work with Reltio — starting with
adopting the endorsed [`@reltio/design`](https://www.npmjs.com/package/@reltio/design)
components in an existing application.

Skills are distributed as a tiny CLI: nothing is compiled, and installing a
skill just writes its files into your repo following the
[Agent Skills](https://github.com/vercel-labs/skills) standard.

## CLI

Run from your application's repository root.

```bash
# List the bundled skills
npx @reltio/skills list

# Install every bundled skill
npx @reltio/skills install

# Install specific skills by name
npx @reltio/skills install adopt-reltio-design
```

Passing several names installs a subset; an unknown name prints the available
skills and exits without changes.

### What `install` does

For each selected skill it:

- writes the skill into `.agents/skills/<name>/` (the canonical Agent Skills location), and
- links `.claude/skills/<name>` to it so Claude Code picks it up too.

It is **non-destructive**: it never deletes or recurses into content it does not
own, and it never edits your `AGENTS.md` / `CLAUDE.md` — it prints a suggested
pointer line you can add manually. Re-running is safe and cleanly updates an
existing install (files removed in a newer version are dropped). On platforms
without symlink support it copies the files into `.claude/skills/<name>` instead.

Pass `--force` to replace a conflicting `.claude/skills/<name>` entry.

## Bundled skills

### `adopt-reltio-design`

Guides an agent through migrating an existing Reltio application from ad-hoc UI
primitives (MUI of any version, bespoke components, raw HTML) to the endorsed
`@reltio/design` surface — with semantic component matching, web-component
ergonomics, `--sap*` token theming, and small, reviewable pull requests.

It pairs with `@reltio/design`'s self-describing discovery CLI
(`npx @reltio/design components`) so the agent always reads the exact component
inventory and props of the version your app uses.

### `container-vuln-check`

Guides an agent from a container/app name through finding the freshest scanned
image, listing its open vulnerabilities, classifying them (app Node.js deps vs
base-image npm vs OS packages), verifying the Node.js findings against the
repository, and remediating (dependency bumps, parent-subtree refresh, override
cleanup).

The security scanner is a pluggable "source adapter" — everything after fetching
(classify → verify → remediate → report) is tool-independent. The **Wiz**
adapter (via the `user-wiz` MCP) is the one implemented today.
