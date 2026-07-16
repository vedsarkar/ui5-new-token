# `@reltio/app` — agent notes

`@reltio/app` is the **Reltio application CLI**: it scaffolds a runnable Next.js
App Router app (`npx @reltio/app create`). This directory contains two things
that look like separate packages but ship as one — read this before touching
either, or authoring a changeset.

## The two `package.json` files

<table>
	<thead>
		<tr><th>Path</th><th>Name</th><th>Role</th></tr>
	</thead>
	<tbody>
		<tr>
			<td><code>packages/app/package.json</code></td>
			<td><code>@reltio/app</code></td>
			<td>The <strong>published</strong> package — the CLI (<code>bin/</code>) plus its build.</td>
		</tr>
		<tr>
			<td><code>packages/app/app-template/package.json</code></td>
			<td><code>app-template</code> (private)</td>
			<td>The <strong>payload</strong> the CLI emits: a standalone, runnable Next.js app. Not published on its own.</td>
		</tr>
	</tbody>
</table>

`app-template/` is a real, runnable app (its own deps, lockfile, and dev server)
so it can be developed and previewed in isolation — but it reaches consumers
**only** bundled inside `@reltio/app`.

## Build & publish flow

`scripts/build.mjs` copies `app-template/` into `dist/app-template/` (skipping
dev artifacts, renaming dotfiles to publish-safe placeholders). The CLI resolves
the template as a sibling of `bin/` in both layouts —
`packages/app/app-template` in-repo, `dist/app-template` when published — so
there is a single resolution path. Only `dist/` is published (see the `files`
field), so the raw `app-template/` source never leaks into the tarball.

## Rules for agents

- **Changeset target is always `@reltio/app`.** Any change under
  `packages/app/**` — including `app-template/` — ships through `@reltio/app`.
  There is no separate `app-template` release. Bump additively (`minor`) for new
  template features, `patch` for fixes, `major` only for a breaking CLI/template
  contract change (with a migration note).
- **Run the template locally** with `npm run app-template` from the repo root
  (it installs and starts `packages/app/app-template`), or directly via
  `npm --prefix packages/app/app-template run dev`.
- **`app-template/` is excluded from the repo's Biome and root `tsconfig`** — it
  is a standalone app with its own toolchain, not part of the platform's lint /
  type surface. Don't apply platform component conventions to it.
