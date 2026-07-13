/**
 * `update` subcommand — refresh the platform-managed files of an app that was
 * scaffolded with `npx @reltio/app create`, in place.
 *
 * PLANNED — not yet implemented. Most improvements to a generated app already
 * arrive transitively through `@reltio/design` / `@reltio/auth` version bumps;
 * `update` is for the thin layer the template owns but a bump can't reach —
 * the auth wiring and config (`proxy.ts`, `lib/auth.ts`, `lib/session.ts`,
 * `next.config.mjs`, ...).
 *
 * The safe design (mirroring how `@reltio/skills install` re-syncs its own
 * files) is:
 *   - the template marks a curated set of files as "platform-managed" and
 *     records the template version they came from (e.g. a `.reltio-app` file),
 *   - `update` overlays newer versions of ONLY those managed files, never
 *     touching user-owned pages/components, and warns on local edits to a
 *     managed file instead of clobbering them.
 *
 * Until that contract lands, this command is a no-op that explains the plan so
 * the dispatcher surface (`create` / `update`) is stable for consumers.
 */

export async function update(_args) {
	console.log(
		[
			"`@reltio/app update` is not available yet.",
			"",
			"For now, pick up improvements by upgrading the platform packages:",
			"",
			"  npm install @reltio/design@latest @reltio/auth@latest",
			"",
			"In-place refresh of the template-owned files (proxy.ts, lib/auth.ts,",
			"lib/session.ts, next.config.mjs, ...) is planned. Track it at",
			"https://reltio.design.",
		].join("\n"),
	);
}
