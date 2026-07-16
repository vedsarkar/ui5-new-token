#!/usr/bin/env node
/**
 * `@reltio/app` CLI — a single dispatcher so `npx @reltio/app <subcommand>`
 * resolves (the bin is keyed to the package's unscoped name `app`).
 *
 * Subcommands:
 *   create [name]   Scaffold a new Reltio application (Next.js App Router,
 *                   wired to @reltio/design + @reltio/auth) into ./<name>.
 *   update          Update the platform-managed files of an existing app in
 *                   place (planned — see bin/update.mjs).
 *
 * The template it scaffolds from (`app-template/`) sits next to this file in
 * both layouts — `packages/app/app-template` in the source monorepo (the one
 * `npm run app-template` serves) and `dist/app-template` in the published
 * package — so `create` is offline and self-contained.
 */

const HELP = `@reltio/app CLI

Usage:
  npx @reltio/app create [name]   Scaffold a new Reltio app into ./<name>
  npx @reltio/app update          Update platform-managed files in an existing app (planned)

Run \`create\` from the directory that should contain the new app; run \`update\`
from inside an existing app's root.`;

const main = async () => {
	const [, , subcommand, ...rest] = process.argv;
	switch (subcommand) {
		case "create": {
			const { create } = await import("./create.mjs");
			await create(rest);
			break;
		}
		case "update": {
			const { update } = await import("./update.mjs");
			await update(rest);
			break;
		}
		case undefined:
		case "-h":
		case "--help":
			console.log(HELP);
			break;
		default:
			console.error(`Unknown command "${subcommand}".\n\n${HELP}`);
			process.exit(1);
	}
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
